import { NextRequest, NextResponse } from "next/server";
import { analyzePageSpeed } from "@/lib/pagespeed-insights";
import { validateDomain } from "@/lib/normalize-domain";
import { isToolRateLimited } from "@/lib/tool-rate-limit";
import { getClientIp } from "@/lib/validate-turnstile";

export type PageSpeedCheckResponse = {
  domain: string;
  generatedAt: string;
  mobile: {
    score: number;
    vitals: { lcp: string; cls: string; inp: string };
  };
  desktop: {
    score: number;
    vitals: { lcp: string; cls: string; inp: string };
  };
  improvements: Array<{
    title: string;
    explanation: string;
    impact: "hoog" | "gemiddeld" | "laag";
  }>;
};

export async function POST(req: NextRequest) {
  const ip = getClientIp(req) ?? "unknown";
  if (isToolRateLimited(ip, 8, "pagespeed-check")) {
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
    const { mobile, desktop, improvements } = await analyzePageSpeed(validated.domain);

    const result: PageSpeedCheckResponse = {
      domain: validated.domain,
      generatedAt: new Date().toISOString(),
      mobile,
      desktop,
      improvements,
    };

    return NextResponse.json(result);
  } catch (err) {
    const code = err instanceof Error ? err.message : "UNKNOWN";

    if (code === "API_LIMIT") {
      return NextResponse.json(
        {
          error:
            "De PageSpeed API is tijdelijk overbelast of het daglimiet is bereikt. Probeer het later opnieuw of neem contact op via info@allesis.nl.",
        },
        { status: 429 },
      );
    }

    if (code === "INVALID_URL") {
      return NextResponse.json(
        { error: "Dit domein kon niet worden bereikt of is ongeldig. Controleer de spelling en of de site online staat." },
        { status: 400 },
      );
    }

    console.error("[api/pagespeed-check]", err);
    return NextResponse.json(
      {
        error:
          "De snelheidstest kon niet worden uitgevoerd. Controleer of het domein bereikbaar is via HTTPS en probeer het opnieuw.",
      },
      { status: 502 },
    );
  }
}
