"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FreeToolShell, { scoreColor, ToolReportSection } from "@/components/tools/FreeToolShell";
import ToolReportCta from "@/components/tools/ToolReportCta";
import type { PageSpeedCheckResponse } from "@/app/api/pagespeed-check/route";

const LOADING_STEPS = [
  "Domein controleren…",
  "Mobiele snelheid meten…",
  "Desktop snelheid meten…",
  "Core Web Vitals analyseren…",
  "Rapport opstellen…",
] as const;

const NETWORK_ERROR = "Kon de server niet bereiken. Probeer het opnieuw.";

const IMPACT_LABEL: Record<PageSpeedCheckResponse["improvements"][0]["impact"], string> = {
  hoog: "Hoge impact",
  gemiddeld: "Gemiddelde impact",
  laag: "Lage impact",
};

function ScoreRing({ score, label }: { score: number; label: string }) {
  const color = scoreColor(score);
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="font-sora flex h-28 w-28 items-center justify-center rounded-full border-4 text-3xl font-black text-neutral-dark md:h-32 md:w-32 md:text-4xl"
        style={{ borderColor: color }}
      >
        {score}
      </div>
      <p className="font-lato text-sm font-semibold text-gray-500">{label}</p>
    </div>
  );
}

function VitalsTable({ vitals }: { vitals: PageSpeedCheckResponse["mobile"]["vitals"] }) {
  const rows = [
    { key: "LCP", label: "Largest Contentful Paint", value: vitals.lcp, hint: "Hoe snel het grootste zichtbare element laadt." },
    { key: "CLS", label: "Cumulative Layout Shift", value: vitals.cls, hint: "Hoeveel de layout verschuift tijdens laden (layout shift)." },
    { key: "INP", label: "Interaction to Next Paint", value: vitals.inp, hint: "Hoe snel de site reageert op een klik of tik." },
  ];

  return (
    <dl className="mt-6 grid gap-3 sm:grid-cols-3">
      {rows.map((row) => (
        <div key={row.key} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
          <dt className="font-sora text-xs font-bold uppercase tracking-wider text-primary">{row.key}</dt>
          <dd className="font-sora mt-1 text-xl font-bold text-neutral-dark">{row.value}</dd>
          <dd className="font-lato mt-2 text-xs leading-relaxed text-gray-500">{row.hint}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function PageSpeedCheckClient() {
  const searchParams = useSearchParams();
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [result, setResult] = useState<PageSpeedCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fromUrl = searchParams.get("domain") ?? searchParams.get("domein") ?? "";
    if (fromUrl) setDomain(fromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (!loading) {
      setLoadingStepIndex(0);
      return;
    }
    const id = window.setInterval(() => {
      setLoadingStepIndex((i) => (i + 1) % LOADING_STEPS.length);
    }, 2500);
    return () => window.clearInterval(id);
  }, [loading]);

  const performScan = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/pagespeed-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Er ging iets mis.");
        return;
      }
      setResult(data as PageSpeedCheckResponse);
    } catch {
      setError(NETWORK_ERROR);
    } finally {
      setLoading(false);
    }
  }, [domain]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void performScan();
  };

  return (
    <FreeToolShell
      eyebrow="Gratis PageSpeed-check"
      title="Hoe snel is"
      titleAccent="uw website?"
      subtitle="Vul uw domeinnaam in en ontvang direct een rapport met snelheidsscores, Core Web Vitals en verbeterpunten — geen registratie."
      domain={domain}
      onDomainChange={setDomain}
      onSubmit={handleSubmit}
      loading={loading}
      loadingSteps={LOADING_STEPS}
      loadingStepIndex={loadingStepIndex}
      error={error}
      onRetry={error === NETWORK_ERROR ? () => void performScan() : undefined}
      inputId="pagespeed-domain"
      submitLabel="Test snelheid →"
    >
      {result ? (
        <ToolReportSection onReset={() => setResult(null)}>
          <div className="text-center">
            <p className="font-lato text-lg text-gray-500">
              Rapport voor <span className="font-semibold text-neutral-dark">{result.domain}</span>
            </p>
            <p className="font-lato mt-2 text-sm text-gray-400">
              {new Date(result.generatedAt).toLocaleString("nl-NL")} · Google PageSpeed Insights (labdata)
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-10 md:gap-16">
            <ScoreRing score={result.mobile.score} label="Mobiel" />
            <ScoreRing score={result.desktop.score} label="Desktop" />
          </div>

          <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left">
            <h2 className="font-sora text-lg font-bold text-neutral-dark">Core Web Vitals (mobiel)</h2>
            <VitalsTable vitals={result.mobile.vitals} />
            <p className="font-lato mt-4 text-xs text-gray-400">
              Desktop: LCP {result.desktop.vitals.lcp} · CLS {result.desktop.vitals.cls} · INP{" "}
              {result.desktop.vitals.inp}
            </p>
          </div>

          <div className="mt-12">
            <h2 className="font-sora text-center text-xl font-bold text-neutral-dark">Belangrijkste verbeterpunten</h2>
            <ul className="mt-8 flex flex-col gap-4">
              {result.improvements.map((item) => (
                <li key={item.title} className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-sora font-bold text-neutral-dark">{item.title}</p>
                    <span className="font-lato rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                      {IMPACT_LABEL[item.impact]}
                    </span>
                  </div>
                  <p className="font-lato mt-3 leading-relaxed text-gray-600">{item.explanation}</p>
                </li>
              ))}
            </ul>
          </div>

          <ToolReportCta description="Allesis optimaliseert laadtijd, Core Web Vitals en hosting — zodat uw site sneller én beter scoort in Google." />
        </ToolReportSection>
      ) : null}
    </FreeToolShell>
  );
}
