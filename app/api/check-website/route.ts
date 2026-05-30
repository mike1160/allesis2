import Anthropic from "@anthropic-ai/sdk";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import type { CheckItem, WebsiteCheckResult } from "@/lib/website-monitor-types";
import { KV_TOTAL_CHECKS_KEY } from "@/lib/website-monitor-types";
import { getClientIp } from "@/lib/validate-turnstile";

const CHECK_KEYS = [
  "online",
  "https",
  "loadtime",
  "error_pages",
  "dead_links",
  "buttons",
  "contact_form",
  "donation",
] as const;

const VALID_STATUSES = new Set(["ok", "warn", "error", "skip"]);

// ─── Rate limiting ─────────────────────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 20) return true;
  entry.count++;
  return false;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidUrl(input: string): boolean {
  try {
    const parsed = new URL(input);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function buildPrompt(url: string): string {
  return `You are a website checker. Analyze the website at this URL: ${url}

Use your web search tool to fetch and inspect the website, then return a JSON object with ONLY these keys (no markdown, no explanation, just raw JSON):

{
  "online": { "status": "ok|warn|error", "detail": "..." },
  "https": { "status": "ok|error", "detail": "..." },
  "loadtime": { "status": "ok|warn|error", "detail": "estimated fast/medium/slow" },
  "error_pages": { "status": "ok|warn|error", "detail": "..." },
  "dead_links": { "status": "ok|warn|error", "detail": "number of dead/broken links found" },
  "buttons": { "status": "ok|warn", "detail": "how many buttons/CTAs found" },
  "contact_form": { "status": "ok|warn|error", "detail": "whether a contact form was found" },
  "donation": { "status": "ok|warn|skip", "detail": "whether donation buttons/links were found" }
}

Rules:
- "ok" = good/present, "warn" = partial/uncertain, "error" = bad/missing/broken, "skip" = not applicable
- Be concise in detail (max 10 words)
- Return ONLY the JSON object, nothing else`;
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    /* probeer verder */
  }

  const codeBlock = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) {
    return JSON.parse(codeBlock[1].trim());
  }

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return JSON.parse(trimmed.slice(start, end + 1));
  }

  throw new Error("Geen geldige JSON in API-antwoord.");
}

function normalizeCheckItem(raw: unknown): CheckItem | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const status = typeof item.status === "string" ? item.status : "";
  const detail = typeof item.detail === "string" ? item.detail.trim() : "";
  if (!VALID_STATUSES.has(status)) return null;
  return { status: status as CheckItem["status"], detail: detail || "Geen detail" };
}

function normalizeResult(raw: unknown): WebsiteCheckResult | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const result = {} as WebsiteCheckResult;

  for (const key of CHECK_KEYS) {
    const item = normalizeCheckItem(obj[key]);
    if (!item) return null;
    result[key] = item;
  }

  return result;
}

function getResponseText(content: Anthropic.Message["content"]): string {
  return content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = getClientIp(req) ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Te veel verzoeken. Maximaal 20 per uur. Probeer het later opnieuw." },
      { status: 429 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Websitecontrole tijdelijk niet beschikbaar." }, { status: 503 });
  }

  let body: { url?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  if (typeof body.url !== "string" || !body.url.trim()) {
    return NextResponse.json({ error: "URL ontbreekt." }, { status: 400 });
  }

  const url = body.url.trim();
  if (!isValidUrl(url)) {
    return NextResponse.json(
      { error: "Ongeldige URL. Gebruik http:// of https://." },
      { status: 400 },
    );
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 3,
        },
      ],
      messages: [{ role: "user", content: buildPrompt(url) }],
    });

    const text = getResponseText(response.content);
    if (!text) {
      return NextResponse.json({ error: "Geen resultaat ontvangen van de analyse." }, { status: 502 });
    }

    const parsed = extractJson(text);
    const checks = normalizeResult(parsed);
    if (!checks) {
      return NextResponse.json({ error: "Kon het analyseresultaat niet verwerken." }, { status: 502 });
    }

    try {
      await kv.incr(KV_TOTAL_CHECKS_KEY);
    } catch (err) {
      console.error("[api/check-website] KV incr fout:", err);
    }

    return NextResponse.json({
      url,
      checks,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[api/check-website] fout:", err);
    return NextResponse.json(
      { error: "Websitecontrole mislukt. Probeer het opnieuw." },
      { status: 500 },
    );
  }
}
