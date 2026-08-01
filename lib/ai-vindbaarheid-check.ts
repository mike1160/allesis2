export type AiBotName =
  | "GPTBot"
  | "ClaudeBot"
  | "PerplexityBot"
  | "Google-Extended"
  | "OAI-SearchBot"
  | "Applebot-Extended";

export const AI_BOTS: AiBotName[] = [
  "GPTBot",
  "OAI-SearchBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export type AiCheckResult = {
  id: string;
  ok: boolean;
  label: string;
  why: string;
  advice: string;
};

type RobotsGroup = {
  agents: string[];
  allow: string[];
  disallow: string[];
};

const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; AllesisTool/1.0; +https://allesis.nl)",
  Accept: "text/html,application/xhtml+xml,text/plain,*/*",
};

function parseRobotsGroups(content: string): RobotsGroup[] {
  const groups: RobotsGroup[] = [];
  let current: RobotsGroup | null = null;

  for (const rawLine of content.split("\n")) {
    const line = rawLine.split("#")[0]?.trim();
    if (!line) continue;

    const colon = line.indexOf(":");
    if (colon === -1) continue;

    const key = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (key === "user-agent") {
      if (!current || current.allow.length > 0 || current.disallow.length > 0) {
        current = { agents: [], allow: [], disallow: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if (current && key === "allow") {
      current.allow.push(value);
    } else if (current && key === "disallow") {
      current.disallow.push(value);
    }
  }

  return groups;
}

function isRootBlocked(group: RobotsGroup): boolean {
  const blocksAll = group.disallow.some((d) => d === "/" || d === "/*");
  const allowsRoot = group.allow.some((a) => a === "/" || a === "/*");
  return blocksAll && !allowsRoot;
}

export function isBotAllowedInRobots(robotsTxt: string | null, bot: AiBotName): boolean {
  if (!robotsTxt?.trim()) return true;

  const groups = parseRobotsGroups(robotsTxt);
  const botLower = bot.toLowerCase();
  const specific = groups.filter((g) => g.agents.includes(botLower));
  const wildcard = groups.filter((g) => g.agents.includes("*"));
  const effective = specific.length > 0 ? specific : wildcard;

  if (effective.length === 0) return true;

  return !effective.some(isRootBlocked);
}

async function fetchText(url: string, timeoutMs = 12_000): Promise<{ ok: boolean; text: string; status: number }> {
  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      signal: AbortSignal.timeout(timeoutMs),
      redirect: "follow",
    });
    const ct = res.headers.get("content-type") ?? "";
    if (!res.ok) return { ok: false, text: "", status: res.status };
    if (!ct.includes("text") && !ct.includes("json") && ct !== "") {
      return { ok: false, text: "", status: res.status };
    }
    return { ok: true, text: await res.text(), status: res.status };
  } catch {
    return { ok: false, text: "", status: 0 };
  }
}

function collectJsonLdTypes(value: unknown, types: Set<string>): void {
  if (!value || typeof value !== "object") return;

  if (Array.isArray(value)) {
    for (const item of value) collectJsonLdTypes(item, types);
    return;
  }

  const obj = value as Record<string, unknown>;
  const typeField = obj["@type"];

  if (typeof typeField === "string") {
    types.add(typeField.toLowerCase());
  } else if (Array.isArray(typeField)) {
    for (const t of typeField) {
      if (typeof t === "string") types.add(t.toLowerCase());
    }
  }

  if (Array.isArray(obj["@graph"])) {
    collectJsonLdTypes(obj["@graph"], types);
  }

  for (const v of Object.values(obj)) {
    if (v && typeof v === "object") collectJsonLdTypes(v, types);
  }
}

export function homepageHasOrganizationSchema(html: string): boolean {
  const scripts = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (!scripts) return false;

  const wanted = new Set(["organization", "localbusiness", "professionalservice"]);

  for (const block of scripts) {
    const match = block.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    if (!match?.[1]) continue;

    try {
      const parsed = JSON.parse(match[1].trim()) as unknown;
      const types = new Set<string>();
      collectJsonLdTypes(parsed, types);
      if ([...types].some((t) => wanted.has(t) || t.includes("organization") || t.includes("localbusiness"))) {
        return true;
      }
    } catch {
      /* ongeldige JSON-LD negeren */
    }
  }

  return false;
}

const BOT_WHY: Record<AiBotName, string> = {
  GPTBot:
    "OpenAI gebruikt GPTBot om sites te indexeren voor ChatGPT-zoekresultaten. Geblokkeerde sites worden minder snel geciteerd.",
  "OAI-SearchBot":
    "OAI-SearchBot voedt ChatGPT Search. Expliciete Allow in robots.txt verbetert kans op bronvermelding in AI-zoekresultaten.",
  ClaudeBot:
    "Anthropic gebruikt ClaudeBot voor Claude-zoekfuncties. Toegang vergroot de kans dat uw content in antwoorden verschijnt.",
  PerplexityBot:
    "Perplexity crawlt met PerplexityBot voor AI-antwoorden met bronvermelding. Blokkade beperkt zichtbaarheid in Perplexity.",
  "Google-Extended":
    "Google-Extended bepaalt of content mag worden gebruikt voor Google AI Overviews en Gemini-training. Toegang ondersteunt AI-vindbaarheid.",
  "Applebot-Extended":
    "Applebot-Extended bepaalt of content gebruikt mag worden voor Apple Intelligence / AI-functies naast klassieke Applebot-indexatie.",
};

const BOT_ADVICE_BLOCKED =
  "Voeg in robots.txt een expliciete Allow: / regel toe voor deze bot, of verwijder Disallow: / onder de bot-sectie.";

const BOT_ADVICE_ALLOWED =
  "Deze bot mag crawlen. Houd content duidelijk, feitelijk en gestructureerd zodat AI-systemen u kunnen citeren.";

export async function analyzeAiVindbaarheid(domain: string): Promise<{ checks: AiCheckResult[]; score: number }> {
  const base = `https://${domain}`;
  const [robotsRes, llmsRes, homeRes] = await Promise.all([
    fetchText(`${base}/robots.txt`),
    fetchText(`${base}/llms.txt`),
    fetchText(base),
  ]);

  const checks: AiCheckResult[] = [];

  for (const bot of AI_BOTS) {
    const allowed = robotsRes.ok ? isBotAllowedInRobots(robotsRes.text, bot) : true;
    checks.push({
      id: `bot-${bot.toLowerCase()}`,
      ok: allowed,
      label: `${bot} in robots.txt`,
      why: BOT_WHY[bot],
      advice: allowed ? BOT_ADVICE_ALLOWED : BOT_ADVICE_BLOCKED,
    });
  }

  const hasLlms = llmsRes.ok && llmsRes.text.trim().length > 20;
  checks.push({
    id: "llms-txt",
    ok: hasLlms,
    label: "llms.txt aanwezig",
    why: "llms.txt geeft AI-systemen een kort, gestructureerd overzicht van uw bedrijf en diensten — vergelijkbaar met een sitemap voor LLM's.",
    advice: hasLlms
      ? "llms.txt is gevonden. Houd het bestand kort, feitelijk en up-to-date met links naar belangrijke pagina's."
      : "Publiceer een llms.txt in de root van uw domein (https://uwbedrijf.nl/llms.txt) met bedrijfsinfo, diensten en contact.",
  });

  const reachable = homeRes.ok;
  const hasSchema = reachable ? homepageHasOrganizationSchema(homeRes.text) : false;

  checks.push({
    id: "schema-org",
    ok: hasSchema,
    label: "Organization/LocalBusiness schema op homepage",
    why: "JSON-LD structured data helpt zoekmachines en AI om uw bedrijfsnaam, locatie en diensten betrouwbaar te herkennen.",
    advice: hasSchema
      ? "Schema markup is gevonden. Controleer of naam, URL, logo en contactgegevens kloppen."
      : reachable
        ? "Voeg JSON-LD toe met Organization of LocalBusiness (naam, logo, adres, contact) in de HTML van uw homepage."
        : "De homepage kon niet worden opgehaald. Controleer of het domein bereikbaar is via HTTPS.",
  });

  if (!reachable) {
    checks.push({
      id: "homepage-reachability",
      ok: false,
      label: "Homepage bereikbaar via HTTPS",
      why: "AI-crawlers moeten uw homepage kunnen ophalen om content en metadata te lezen.",
      advice: "Zorg dat https://" + domain + " bereikbaar is, met geldig SSL-certificaat en zonder login-wall op de homepage.",
    });
  }

  const passed = checks.filter((c) => c.ok).length;
  const score = checks.length > 0 ? Math.round((passed / checks.length) * 100) : 0;

  return { checks, score };
}
