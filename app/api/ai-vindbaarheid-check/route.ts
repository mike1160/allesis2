import { NextRequest, NextResponse } from "next/server";
import { analyzeAiVindbaarheid, type AiCheckResult } from "@/lib/ai-vindbaarheid-check";
import { validateDomain } from "@/lib/normalize-domain";
import { isToolRateLimited } from "@/lib/tool-rate-limit";
import { getClientIp } from "@/lib/validate-turnstile";

export type AiVindbaarheidCheckResponse = {
  domain: string;
  generatedAt: string;
  score: number;
  checks: AiCheckResult[];
};

export async function POST(req: NextRequest) {
  const ip = getClientIp(req) ?? "unknown";
  if (isToolRateLimited(ip, 15, "ai-vindbaarheid-check")) {
    return NextResponse.json(
      { error: "U heeft het uurlijkse maximum bereikt. Probeer het over een uur opnieuw." },
      { status: 429 },
    );
  }

  let body: { domain?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  if (typeof body.domain !== "string" || !body.domain.trim()) {
    return NextResponse.json({ error: "Voer een domeinnaam in." }, { status: 400 });
  }

  const validated = validateDomain(body.domain);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    const { checks, score } = await analyzeAiVindbaarheid(validated.domain);

    const result: AiVindbaarheidCheckResponse = {
      domain: validated.domain,
      generatedAt: new Date().toISOString(),
      score,
      checks,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/ai-vindbaarheid-check]", err);
    return NextResponse.json(
      { error: "De controle kon niet worden uitgevoerd. Probeer het later opnieuw." },
      { status: 502 },
    );
  }
}
