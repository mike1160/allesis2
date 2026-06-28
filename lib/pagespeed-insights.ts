export type Strategy = "mobile" | "desktop";

export type CoreWebVitals = {
  lcp: string;
  cls: string;
  inp: string;
};

export type StrategyResult = {
  score: number;
  vitals: CoreWebVitals;
};

export type Improvement = {
  title: string;
  explanation: string;
  impact: "hoog" | "gemiddeld" | "laag";
};

type PsiAudit = {
  id?: string;
  title?: string;
  description?: string;
  score?: number | null;
  displayValue?: string;
  details?: { type?: string };
};

type PsiResponse = {
  error?: { code?: number; message?: string; errors?: { message?: string }[] };
  lighthouseResult?: {
    categories?: { performance?: { score?: number | null } };
    audits?: Record<string, PsiAudit>;
  };
};

const IMPROVEMENT_EXPLANATIONS: Record<string, { title: string; explanation: string }> = {
  "render-blocking-resources": {
    title: "Bestanden blokkeren het eerste scherm",
    explanation:
      "CSS en JavaScript worden te vroeg geladen, waardoor bezoekers langer een leeg scherm zien. Door kritieke code te verkleinen of uit te stellen verschijnt de pagina sneller.",
  },
  "unused-javascript": {
    title: "Ongebruikte JavaScript",
    explanation:
      "Er wordt JavaScript gedownload dat niet direct nodig is. Minder code betekent sneller laden, vooral op mobiel.",
  },
  "unused-css-rules": {
    title: "Ongebruikte CSS",
    explanation:
      "Stylesheets bevatten regels die niet op de pagina worden gebruikt. Door CSS te verkleinen laadt de site lichter.",
  },
  "modern-image-formats": {
    title: "Afbeeldingen niet geoptimaliseerd",
    explanation:
      "Afbeeldingen staan in zware formaten (zoals PNG of JPEG) terwijl WebP of AVIF kleiner kan zijn zonder zichtbaar kwaliteitsverlies.",
  },
  "uses-optimized-images": {
    title: "Afbeeldingen kunnen kleiner",
    explanation:
      "Foto's zijn groter dan nodig voor het scherm. Comprimeren en juiste afmetingen verbeteren laadtijd en LCP (grootste zichtbare element).",
  },
  "uses-text-compression": {
    title: "Geen compressie van tekstbestanden",
    explanation:
      "HTML, CSS en JavaScript worden niet gecomprimeerd (gzip/brotli). Compressie verkleint downloads aanzienlijk.",
  },
  "server-response-time": {
    title: "Trage serverreactie",
    explanation:
      "De server doet er lang over om te antwoorden (TTFB). Snellere hosting of caching helpt bezoekers sneller content te zien.",
  },
  "total-byte-weight": {
    title: "Pagina is te zwaar",
    explanation:
      "De totale downloadgrootte is hoog. Minder scripts, fonts en grote media maken de site merkbaar sneller.",
  },
  "unsized-images": {
    title: "Afbeeldingen zonder vaste afmetingen",
    explanation:
      "Afbeeldingen hebben geen width/height, waardoor de layout kan verschuiven tijdens laden (CLS — layout shift).",
  },
  "largest-contentful-paint-element": {
    title: "Grootste element laadt traag",
    explanation:
      "Het hoofdbeeld of grote tekstblok (LCP) verschijnt te laat. Optimaliseer hero-afbeeldingen, fonts en serverreactie.",
  },
  "uses-responsive-images": {
    title: "Geen responsive afbeeldingen",
    explanation:
      "Mobiele bezoekers downloaden te grote afbeeldingen bedoeld voor desktop. srcset/sizes levert passende formaten per scherm.",
  },
  "efficient-animated-content": {
    title: "Zware animaties of GIFs",
    explanation:
      "Grote geanimeerde bestanden vertragen laden. Video of geoptimaliseerde animaties presteren beter.",
  },
  "legacy-javascript": {
    title: "Verouderde JavaScript voor moderne browsers",
    explanation:
      "Er wordt extra code meegeleverd voor oude browsers. Moderne bundels verkleinen het pakket voor huidige bezoekers.",
  },
  "dom-size": {
    title: "HTML-structuur is te groot",
    explanation:
      "Te veel DOM-elementen maken renderen trager. Eenvoudigere markup verbetert interactie en laadtijd.",
  },
};

function auditDisplay(audit: PsiAudit | undefined, fallback = "—"): string {
  if (!audit) return fallback;
  return audit.displayValue?.trim() || fallback;
}

function extractVitals(audits: Record<string, PsiAudit> | undefined): CoreWebVitals {
  return {
    lcp: auditDisplay(audits?.["largest-contentful-paint"]),
    cls: auditDisplay(audits?.["cumulative-layout-shift"]),
    inp: auditDisplay(
      audits?.["interaction-to-next-paint"] ?? audits?.["experimental-interaction-to-next-paint"],
    ),
  };
}

function impactFromScore(score: number | null | undefined): Improvement["impact"] {
  if (score == null) return "gemiddeld";
  if (score < 0.5) return "hoog";
  if (score < 0.8) return "gemiddeld";
  return "laag";
}

export function extractImprovements(audits: Record<string, PsiAudit> | undefined): Improvement[] {
  if (!audits) return [];

  const candidates = Object.values(audits)
    .filter((audit) => {
      if (audit.score == null || audit.score >= 0.9) return false;
      const type = audit.details?.type ?? "";
      return type === "opportunity" || type === "diagnostic" || type === "table";
    })
    .sort((a, b) => (a.score ?? 1) - (b.score ?? 1));

  const picked: Improvement[] = [];

  for (const audit of candidates) {
    if (picked.length >= 5) break;
    const mapped = audit.id ? IMPROVEMENT_EXPLANATIONS[audit.id] : undefined;
    const title = mapped?.title ?? audit.title ?? "Performance-verbetering";
    const explanation =
      mapped?.explanation ??
      (audit.description
        ? audit.description.replace(/\[.*?\]\(.*?\)/g, "").slice(0, 280)
        : "Deze meting wijst op ruimte voor snelheidswinst op uw website.");

    if (picked.some((p) => p.title === title)) continue;

    picked.push({
      title,
      explanation,
      impact: impactFromScore(audit.score),
    });
  }

  if (picked.length < 3) {
    picked.push({
      title: "Controleer hosting en caching",
      explanation:
        "Snelle serverreactie en caching (CDN of browsercache) helpen Core Web Vitals structureel te verbeteren.",
      impact: "gemiddeld",
    });
  }

  return picked.slice(0, 5);
}

function parsePsiResponse(data: PsiResponse, resStatus: number): StrategyResult & { audits?: Record<string, PsiAudit> } {
  if (resStatus === 429) throw new Error("API_LIMIT");

  if (resStatus !== 200) {
    const msg = data.error?.message ?? data.error?.errors?.[0]?.message;
    if (resStatus === 400 && msg?.toLowerCase().includes("invalid url")) {
      throw new Error("INVALID_URL");
    }
    if (resStatus === 403 || resStatus === 429) throw new Error("API_LIMIT");
    throw new Error(msg ?? "PAGESPEED_FAILED");
  }

  const scoreRaw = data.lighthouseResult?.categories?.performance?.score;
  const audits = data.lighthouseResult?.audits;

  return {
    score: scoreRaw != null ? Math.round(scoreRaw * 100) : 0,
    vitals: extractVitals(audits),
    audits,
  };
}

async function fetchPageSpeed(url: string, strategy: Strategy) {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY ?? process.env.PAGESPEED_API_KEY ?? "";
  const params = new URLSearchParams({
    url,
    strategy,
    category: "PERFORMANCE",
  });
  if (apiKey) params.set("key", apiKey);

  const res = await fetch(`https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`, {
    signal: AbortSignal.timeout(55_000),
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
  });

  const data = (await res.json()) as PsiResponse;
  return parsePsiResponse(data, res.status);
}

export async function analyzePageSpeed(domain: string) {
  const url = `https://${domain}`;

  const [mobileResult, desktopResult] = await Promise.all([
    fetchPageSpeed(url, "mobile"),
    fetchPageSpeed(url, "desktop"),
  ]);

  return {
    mobile: { score: mobileResult.score, vitals: mobileResult.vitals },
    desktop: { score: desktopResult.score, vitals: desktopResult.vitals },
    improvements: extractImprovements(mobileResult.audits),
  };
}
