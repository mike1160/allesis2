import { NextRequest, NextResponse } from "next/server";
import { sendAllesisEmail } from "@/lib/allesis-email";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { PRIVACY_CONSENT_ERROR, parseNieuwsbrief, parsePrivacyAccepted } from "@/lib/form-consent";
import { fetchRenderedHtml } from "@/lib/scan-with-browser";
import { getClientIp, validateTurnstile } from "@/lib/validate-turnstile";

// ─── Types ────────────────────────────────────────────────────────────────────

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

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ─── Rate limiting ─────────────────────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Ruim verlopen entries op (voorkomt geheugengroei op drukke servers)
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "") // strip pad
    .replace(/:[0-9]+$/, "") // strip poortnummer
    .replace(/\.$/, ""); // strip trailing punt
}

/** Haal de homepage HTML op.
 *  - null  → netwerk/TLS-fout (site onbereikbaar)
 *  - ""    → site bereikbaar maar geen leesbare HTML (4xx/5xx of binary)
 *  - string → HTML-inhoud
 */
async function fetchHtml(url: string, timeoutMs = 10_000): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AVGChecker/1.0; +https://allesis.nl)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(timeoutMs),
      redirect: "follow",
    });
    // 4xx/5xx → site is bereikbaar (TLS werkt), maar geef lege string
    if (!res.ok) return "";
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("text/html") && !ct.includes("text/plain") && ct !== "") {
      return ""; // binary, maar bereikbaar
    }
    return await res.text();
  } catch {
    // Netwerk/TLS-fout → null
    return null;
  }
}

// ─── SSL ──────────────────────────────────────────────────────────────────────
//
// Leid SSL af uit het fetchHtml resultaat:
//  null  → netwerk/TLS-fout → false
//  ""    → site bereikbaar, TLS werkt (4xx/5xx) → true
//  string → HTML opgehaald over HTTPS → true
//
// Geen aparte fetch nodig — scheelt een volledige GET request.

function checkSSL(homepageHtml: string | null): boolean {
  // null betekent dat fetch() een exception gooide (TLS-fout of DNS-fout)
  return homepageHtml !== null;
}

// ─── Privacy pagina ───────────────────────────────────────────────────────────
//
// Uitgebreider dan voorheen:
//  1. Controleer bekende URL-paden via HEAD
//  2. Controleer ankerlinks in de homepage HTML (footer-links)
//  3. Zoek op tekstinhoud in de homepage (als laatste vangnet)

const PRIVACY_PATHS = [
  "/privacy",
  "/privacybeleid",
  "/privacy-policy",
  "/privacyverklaring",
  "/privacystatement",
  "/disclaimer",
  "/cookiebeleid",
  "/gdpr",
  "/avg",
];

const PRIVACY_LINK_RE =
  /href=["'][^"']*(?:privacy|privacybeleid|privacyverklaring|cookie(?:beleid)?|gdpr|avg|disclaimer)[^"']*["']/i;

async function checkPrivacyPage(domain: string, html: string | null): Promise<boolean> {
  // 1. Bekende paden parallel via HEAD (was sequentieel — tot 54s wachten)
  const headChecks = PRIVACY_PATHS.map((path) =>
    fetch(`https://${domain}${path}`, {
      method: "HEAD",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AVGChecker/1.0; +https://allesis.nl)" },
      signal: AbortSignal.timeout(5_000),
      redirect: "follow",
    })
      .then((r) => r.ok)
      .catch(() => false),
  );
  const headResults = await Promise.all(headChecks);
  if (headResults.some(Boolean)) return true;

  // 2. Ankerlinks in de homepage HTML
  if (html && PRIVACY_LINK_RE.test(html)) return true;

  // 3. Tekstinhoud fallback
  if (html) {
    const lower = html.toLowerCase();
    const hits = [
      "privacybeleid",
      "privacyverklaring",
      "privacy policy",
      "cookiebeleid",
      "persoonsgegevens",
    ].filter((kw) => lower.includes(kw));
    if (hits.length >= 1) return true;
  }

  return false;
}

// ─── Cookie banner ────────────────────────────────────────────────────────────
//
// Drie lagen:
//  A. Bekende CMP class/id namen (uitgebreid)
//  B. Script-src URL patronen voor bekende CMP-leveranciers
//  C. Generieke "consent" patronen in HTML

const CMP_KEYWORDS = [
  // Bekende CMP-tools
  "cookiebot",
  "onetrust",
  "one-trust",
  "trustarc",
  "truste",
  "cookiepro",
  "klaro",
  "tarteaucitron",
  "cookiefirst",
  "usercentrics",
  "consentmanager",
  "didomi",
  "quantcast",
  "cookieinformation",
  "cookie-information",
  "borlabs-cookie",
  "complianz",
  "cmplz", // Complianz WordPress plugin
  "wp-gdpr",
  "gdpr-cookie",
  "real-cookie-banner",
  // Generieke klasse/id namen
  "cookie-consent",
  "cookieconsent",
  "cookie-banner",
  "cookiebanner",
  "cookie-notice",
  "cookienotice",
  "cookie-bar",
  "cookiebar",
  "cookie-popup",
  "cookie-overlay",
  "cookie-wall",
  "gdpr-banner",
  "gdpr-notice",
  "gdpr-popup",
  "privacy-banner",
  "consent-banner",
  "consent-popup",
  "consent-notice",
  "cc-banner",
  "cc-window",
  "cc-dialog",
  // Taalvarianten NL
  "cookiemelding",
  "cookiewaarschuwing",
  "cookie-melding",
];

const CMP_SCRIPT_PATTERNS = [
  "cookiebot.com",
  "onetrust.com",
  "trustarc.com",
  "cookiefirst.com",
  "usercentrics.eu",
  "consentmanager.net",
  "didomi.io",
  "quantcast.mgr",
  "cookieinformation.com",
  "tagcommander.com",
  "cdn.cookie-script.com",
  "cookie-script.com",
  "insites.eu", // CookieConsent by Insites (meest gebruikte open source)
  "cookieconsent.insites",
];

async function checkCookieBanner(html: string | null): Promise<boolean> {
  if (!html) return false;

  const lower = html.toLowerCase();

  // A. CMP keyword in HTML (class, id, data-*, tekst)
  if (CMP_KEYWORDS.some((kw) => lower.includes(kw))) return true;

  // B. CMP script-src URL
  if (CMP_SCRIPT_PATTERNS.some((pattern) => lower.includes(pattern))) return true;

  // C. Generieke consent-indicatoren (combinatie vereist om false positives te vermijden)
  const consentIndicators = [
    "toestemming",
    "accepteer cookies",
    "accept cookies",
    "cookies accepteren",
    "cookie instellingen",
    "cookie settings",
    "beheer cookies",
    "manage cookies",
    "alle cookies",
    "necessary cookies",
    "functionele cookies",
    "analytische cookies",
    "weiger cookies",
    "reject cookies",
  ];
  const hits = consentIndicators.filter((kw) => lower.includes(kw));
  // Minimaal 2 indicatoren voor een betrouwbaar signaal
  if (hits.length >= 2) return true;

  return false;
}

// ─── GA / GTM Consent ─────────────────────────────────────────────────────────
//
// Controleert of tracking aanwezig is. Als tracking aanwezig is ZONDER
// cookie consent, is dit een overtreding.

const TRACKING_PATTERNS = [
  "google-analytics.com/analytics.js",
  "google-analytics.com/ga.js",
  "googletagmanager.com/gtm.js",
  "googletagmanager.com/gtag/js",
  "gtag('config",
  'gtag("config',
  "ga('send",
  'ga("send',
  // Meta Pixel
  "connect.facebook.net",
  "fbq('init",
  'fbq("init',
  // Hotjar
  "static.hotjar.com",
  // LinkedIn Insight
  "snap.licdn.com",
  // TikTok
  "analytics.tiktok.com",
];

async function checkGAConsent(html: string | null, cookieOk: boolean): Promise<boolean> {
  if (!html) return true; // Kunnen het niet bepalen → geen straf geven

  const lower = html.toLowerCase();
  const hasTracking = TRACKING_PATTERNS.some((p) => lower.includes(p.toLowerCase()));

  if (!hasTracking) return true; // Geen tracking → geen probleem

  // Tracking aanwezig: alleen ok als er ook een consent-mechanisme is
  return cookieOk;
}

// ─── HTTPS redirect ───────────────────────────────────────────────────────────
//
// Volg HTTP → kijk of eindURL HTTPS is. Gebruik GET want veel servers
// antwoorden niet op HEAD. Controleer ook de Location-header bij 301/302.

async function checkHttpsRedirect(domain: string): Promise<boolean> {
  // HEAD met manual redirect: kijk of de eerste Location-header naar https:// wijst.
  // Gebruik geen redirect:"follow" want dan zien we de eindURL maar niet de tussenstappe.
  try {
    const res = await fetch(`http://${domain}`, {
      method: "HEAD",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AVGChecker/1.0; +https://allesis.nl)",
      },
      redirect: "manual", // onderschep 301/302 zelf
      signal: AbortSignal.timeout(8_000),
    });
    // redirect: "manual" geeft status 0 + type "opaqueredirect" bij een redirect
    // De Location-header bevat de doelURL
    const location = res.headers.get("location") ?? "";
    if (location.startsWith("https://")) return true;
    // Sommige servers geven direct 200 op http:// zonder redirect → niet ok
    if (res.status === 200) return false;
    // Andere statussen (4xx op http): probeer of https:// wél werkt
    return false;
  } catch {
    // http:// helemaal niet bereikbaar → kijk of https:// wél luistert
    try {
      await fetch(`https://${domain}`, {
        method: "HEAD",
        headers: { "User-Agent": "Mozilla/5.0 (compatible; AVGChecker/1.0; +https://allesis.nl)" },
        signal: AbortSignal.timeout(6_000),
      });
      return true; // server luistert alleen op 443, dat is acceptabel
    } catch {
      return false;
    }
  }
}

// ─── Sitemap ──────────────────────────────────────────────────────────────────
//
// Controleer sitemap.xml én robots.txt (die kan naar sitemap verwijzen).

async function checkSitemap(domain: string): Promise<boolean> {
  // 1. Directe sitemap.xml
  try {
    const res = await fetch(`https://${domain}/sitemap.xml`, {
      method: "HEAD",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AVGChecker/1.0; +https://allesis.nl)",
      },
      signal: AbortSignal.timeout(6_000),
    });
    if (res.ok) return true;
  } catch {
    /* probeer robots.txt */
  }

  // 2. robots.txt → Sitemap: directive
  try {
    const res = await fetch(`https://${domain}/robots.txt`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AVGChecker/1.0; +https://allesis.nl)",
      },
      signal: AbortSignal.timeout(6_000),
    });
    if (res.ok) {
      const text = await res.text();
      if (text.toLowerCase().includes("sitemap:")) return true;
    }
  } catch {
    /* geen robots.txt */
  }

  return false;
}

// ─── Score & risico ───────────────────────────────────────────────────────────

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

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = getClientIp(req) ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Te veel verzoeken. Probeer het later opnieuw." }, { status: 429 });
  }

  let body: { domain?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  if (typeof body.domain !== "string" || !body.domain.trim()) {
    return NextResponse.json({ error: "Domeinnaam ontbreekt." }, { status: 400 });
  }

  const domain = normalizeDomain(body.domain);
  if (!domain || domain.length < 3 || !domain.includes(".")) {
    return NextResponse.json({ error: "Ongeldige domeinnaam." }, { status: 400 });
  }

  // Haal homepage HTML éénmalig op — hergebruik in alle checks.
  // null = TLS/netwerk fout, "" = bereikbaar maar geen HTML, string = HTML
  const homepageHtml =
    (await fetchRenderedHtml(`https://${domain}`)) ?? (await fetchHtml(`https://${domain}`));

  // SSL afgeleid uit fetchHtml (null = onbereikbaar/TLS-fout)
  const ssl = checkSSL(homepageHtml);

  // Resterende checks parallel
  const [privacy, cookie, httpsRedirect, sitemap] = await Promise.all([
    checkPrivacyPage(domain, homepageHtml),
    checkCookieBanner(homepageHtml),
    checkHttpsRedirect(domain),
    checkSitemap(domain),
  ]);

  // GA consent hangt af van cookie resultaat
  const gaConsent = await checkGAConsent(homepageHtml, cookie);

  const score = calculateScore({ ssl, privacy, cookie, gaConsent, httpsRedirect, sitemap });
  const riskLevel = getRiskLevel(score);

  const result: Omit<AVGCheckResponse, "scanId"> = {
    domain,
    score,
    riskLevel,
    checks: {
      ssl: {
        ok: ssl,
        label: "SSL-certificaat",
        detail: ssl
          ? "Uw website heeft een geldig SSL-certificaat en is bereikbaar via HTTPS."
          : "Geen geldig SSL-certificaat gevonden. Bezoekers zien een beveiligingswaarschuwing.",
      },
      privacy: {
        ok: privacy,
        label: "Privacybeleid",
        detail: privacy
          ? "Er is een privacybeleid of -pagina aangetroffen op uw website."
          : "Geen privacybeleid gevonden. Dit is verplicht onder de AVG.",
      },
      cookie: {
        ok: cookie,
        label: "Cookiebanner",
        detail: cookie
          ? "Er is een cookiebanner of consent-tool gevonden op uw website."
          : "Geen cookiebanner gevonden. Zonder toestemming mogen geen tracking-cookies worden geplaatst.",
      },
      gaConsent: {
        ok: gaConsent,
        label: "Tracking & toestemming",
        detail: gaConsent
          ? "Tracking is aanwezig en er is een consent-mechanisme gevonden, of er is geen tracking actief."
          : "Tracking (bijv. Google Analytics, Meta Pixel) gevonden zónder zichtbare cookieconsent. Dit is een AVG-overtreding.",
      },
      httpsRedirect: {
        ok: httpsRedirect,
        label: "HTTPS-doorverwijzing",
        detail: httpsRedirect
          ? "HTTP-verkeer wordt correct doorgestuurd naar HTTPS."
          : "HTTP wordt niet automatisch doorgestuurd naar HTTPS. Bezoekers kunnen onbeveiligd verbinding maken.",
      },
      sitemap: {
        ok: sitemap,
        label: "Sitemap",
        detail: sitemap
          ? "Er is een sitemap.xml gevonden (of een verwijzing in robots.txt)."
          : "Geen sitemap.xml gevonden. Dit is geen AVG-verplichting, maar helpt bij vindbaarheid.",
      },
    },
    generatedAt: new Date().toISOString(),
  };

  // Supabase opslaan
  let scanId = "unknown";
  const admin = getSupabaseAdmin();
  if (admin) {
    const { data, error } = await admin
      .from("avg_scans")
      .insert({
        domain,
        score,
        risk_level: riskLevel,
        ssl_ok: ssl,
        privacy_ok: privacy,
        cookie_ok: cookie,
        ga_consent_ok: gaConsent,
        https_redirect_ok: httpsRedirect,
        sitemap_ok: sitemap,
        created_at: result.generatedAt,
      })
      .select("id")
      .single();
    if (!error && data?.id) scanId = data.id;
  }

  return NextResponse.json({ ...result, scanId });
}

// ─── PATCH ────────────────────────────────────────────────────────────────────

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

  if (!body.domain || String(body.domain).trim() === "") {
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

  try {
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
  } catch (err) {
    console.error("[api/avg-check] onverwachte fout bij e-mail", err);
    return NextResponse.json({ error: "E-mail verzenden mislukt." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
