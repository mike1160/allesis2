import { NextRequest, NextResponse } from "next/server";
import { sendAllesisEmail } from "@/lib/allesis-email";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { PRIVACY_CONSENT_ERROR, parseNieuwsbrief, parsePrivacyAccepted } from "@/lib/form-consent";
import { getClientIp, validateTurnstile } from "@/lib/validate-turnstile";

interface CheckResult {
  ok: boolean;
  label: string;
  detail: string;
}

interface AVGCheckResponse {
  scanId: string;
  domain: string;
  score: number;
  riskLevel: "laag" | "gemiddeld" | "hoog";
  checks: {
    ssl: CheckResult;
    privacy: CheckResult;
    cookie: CheckResult;
    gaConsent: CheckResult;
    httpsRedirect: CheckResult;
    sitemap: CheckResult;
  };
  generatedAt: string;
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 });
    return false;
  }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

async function checkSSL(domain: string): Promise<boolean> {
  try {
    const res = await fetch(`https://${domain}`, {
      method: "HEAD",
      signal: AbortSignal.timeout(8000),
    });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function checkPrivacyPage(domain: string): Promise<boolean> {
  const paths = ["/privacy", "/privacybeleid", "/privacy-policy", "/privacyverklaring", "/disclaimer"];
  for (const path of paths) {
    try {
      const res = await fetch(`https://${domain}${path}`, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) return true;
    } catch {
      /* volgende pad */
    }
  }
  try {
    const res = await fetch(`https://${domain}`, {
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();
    return html.toLowerCase().includes("privacy");
  } catch {
    return false;
  }
}

async function checkCookieBanner(domain: string): Promise<boolean> {
  try {
    const res = await fetch(`https://${domain}`, {
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();
    const lower = html.toLowerCase();
    const keywords = [
      "cookieconsent",
      "cookie-consent",
      "cc-banner",
      "cookie-notice",
      "cookiebanner",
      "gdpr-banner",
      "cookiebot",
      "klaro",
      "tarteaucitron",
      "onetrust",
      "cookie-law",
      "cookiepolicy",
    ];
    return keywords.some((kw) => lower.includes(kw));
  } catch {
    return false;
  }
}

async function checkGAConsent(domain: string, cookieOk: boolean): Promise<boolean> {
  try {
    const res = await fetch(`https://${domain}`, {
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();
    const lower = html.toLowerCase();
    const hasGA =
      lower.includes("google-analytics.com") || lower.includes("gtag(") || lower.includes("googletagmanager");
    if (hasGA && !cookieOk) return false;
    return true;
  } catch {
    return true;
  }
}

async function checkHttpsRedirect(domain: string): Promise<boolean> {
  try {
    const res = await fetch(`http://${domain}`, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    return res.url.startsWith("https://");
  } catch {
    return false;
  }
}

async function checkSitemap(domain: string): Promise<boolean> {
  try {
    const res = await fetch(`https://${domain}/sitemap.xml`, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function calculateScore(results: {
  ssl: boolean;
  privacy: boolean;
  cookie: boolean;
  gaConsent: boolean;
  httpsRedirect: boolean;
  sitemap: boolean;
}): number {
  let score = 0;
  if (results.ssl) score += 25;
  if (results.privacy) score += 25;
  if (results.cookie) score += 20;
  if (results.gaConsent) score += 15;
  if (results.httpsRedirect) score += 10;
  if (results.sitemap) score += 5;
  return score;
}

function getRiskLevel(score: number): "laag" | "gemiddeld" | "hoog" {
  if (score >= 80) return "laag";
  if (score >= 50) return "gemiddeld";
  return "hoog";
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Te veel aanvragen. Probeer het over een uur opnieuw." }, { status: 429 });
  }

  let body: { domain: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  const domain = normalizeDomain(body.domain || "");
  if (!domain || domain.length < 3 || !domain.includes(".")) {
    return NextResponse.json({ error: "Vul een geldige domeinnaam in." }, { status: 400 });
  }

  const [ssl, privacy, cookie, httpsRedirect, sitemap] = await Promise.all([
    checkSSL(domain),
    checkPrivacyPage(domain),
    checkCookieBanner(domain),
    checkHttpsRedirect(domain),
    checkSitemap(domain),
  ]);

  const gaConsent = await checkGAConsent(domain, cookie);

  const score = calculateScore({ ssl, privacy, cookie, gaConsent, httpsRedirect, sitemap });
  const riskLevel = getRiskLevel(score);

  let scanId = "unknown";
  const admin = getSupabaseAdmin();
  if (admin) {
    const { data: scanData, error: dbError } = await admin
      .from("avg_scans")
      .insert({
        domain,
        ip_address: ip,
        score,
        risk_level: riskLevel,
        ssl_ok: ssl,
        privacy_ok: privacy,
        cookie_ok: cookie,
        ga_consent_ok: gaConsent,
        https_redirect_ok: httpsRedirect,
        sitemap_ok: sitemap,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
    } else if (scanData?.id) {
      scanId = scanData.id;
    }
  }

  const result: AVGCheckResponse = {
    scanId,
    domain,
    score,
    riskLevel,
    checks: {
      ssl: {
        ok: ssl,
        label: "SSL-certificaat",
        detail: ssl
          ? "Uw website heeft een geldig SSL-certificaat."
          : "Geen SSL gevonden. Dit is verplicht en schaadt uw Google-ranking.",
      },
      privacy: {
        ok: privacy,
        label: "Privacybeleid",
        detail: privacy
          ? "Een privacypagina is aangetroffen op uw website."
          : "Geen privacybeleid gevonden. Dit is wettelijk verplicht bij elk contactformulier of analytics.",
      },
      cookie: {
        ok: cookie,
        label: "Cookiebanner",
        detail: cookie
          ? "Een cookiebanner of consent-systeem is gedetecteerd."
          : "Geen cookiebanner gevonden. Verplicht als u tracking of analytics gebruikt.",
      },
      gaConsent: {
        ok: gaConsent,
        label: "Analytics & toestemming",
        detail: gaConsent
          ? "Geen probleem gevonden met analytics en toestemming."
          : "Google Analytics gevonden zonder cookiebanner. Dit is een AVG-overtreding.",
      },
      httpsRedirect: {
        ok: httpsRedirect,
        label: "HTTPS-redirect",
        detail: httpsRedirect
          ? "HTTP-bezoekers worden automatisch doorgestuurd naar HTTPS."
          : "Geen automatische HTTPS-redirect. Bezoekers op http:// krijgen een onveilige verbinding.",
      },
      sitemap: {
        ok: sitemap,
        label: "Sitemap aanwezig",
        detail: sitemap
          ? "Een sitemap.xml is gevonden — goed voor zoekmachines."
          : "Geen sitemap gevonden. Dit helpt zoekmachines uw site beter te indexeren.",
      },
    },
    generatedAt: new Date().toISOString(),
  };

  return NextResponse.json(result);
}

export async function PATCH(req: NextRequest) {
  let body: {
    scanId: string;
    name: string;
    email: string;
    phone?: string;
    domain?: string;
    score?: number;
    turnstileToken?: string;
    privacyAccepted?: unknown;
    nieuwsbrief?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!token.trim()) {
    return NextResponse.json({ error: "Verificatie mislukt. Probeer het opnieuw." }, { status: 400 });
  }
  const ip = getClientIp(req);
  if (!(await validateTurnstile(token, ip))) {
    return NextResponse.json({ error: "Verificatie mislukt. Probeer het opnieuw." }, { status: 400 });
  }

  const nieuwsbrief = parseNieuwsbrief(body.nieuwsbrief);
  if (!parsePrivacyAccepted(body.privacyAccepted)) {
    return NextResponse.json({ error: PRIVACY_CONSENT_ERROR }, { status: 400 });
  }

  if (!body.scanId || body.scanId === "unknown" || !UUID_RE.test(body.scanId)) {
    return NextResponse.json({ error: "Ongeldige scan." }, { status: 400 });
  }

  if (!body.email?.trim() || !body.name?.trim()) {
    return NextResponse.json({ error: "Naam en e-mailadres zijn verplicht." }, { status: 400 });
  }

  if (body.domain === undefined || body.domain === null || String(body.domain).trim() === "") {
    return NextResponse.json({ error: "Domein ontbreekt." }, { status: 400 });
  }

  if (body.score === undefined || body.score === null || Number.isNaN(Number(body.score))) {
    return NextResponse.json({ error: "Score ontbreekt." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Opslaan tijdelijk niet beschikbaar." }, { status: 503 });
  }

  const { error } = await admin
    .from("avg_scans")
    .update({
      contact_name: body.name,
      contact_email: body.email,
      contact_phone: body.phone || null,
      help_requested: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.scanId);

  if (error) {
    return NextResponse.json({ error: "Opslaan mislukt." }, { status: 500 });
  }

  const mail = await sendAllesisEmail({
    type: "avg_popup",
    naam: body.name.trim(),
    email: body.email.trim(),
    telefoon: body.phone?.trim(),
    domain: String(body.domain).trim(),
    score: Number(body.score),
    scanId: body.scanId,
    nieuwsbrief,
  });

  if (!mail.ok) {
    return NextResponse.json({ error: mail.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
