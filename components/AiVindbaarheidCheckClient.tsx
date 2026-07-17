"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FreeToolShell, { scoreColor, ToolReportSection } from "@/components/tools/FreeToolShell";
import ToolReportCta from "@/components/tools/ToolReportCta";
import type { AiVindbaarheidCheckResponse } from "@/app/api/ai-vindbaarheid-check/route";

const LOADING_STEPS = [
  "Domein controleren…",
  "robots.txt ophalen…",
  "llms.txt zoeken…",
  "Schema markup scannen…",
  "Rapport opstellen…",
] as const;

const NETWORK_ERROR = "Kon de server niet bereiken. Probeer het opnieuw.";

export default function AiVindbaarheidCheckClient() {
  const searchParams = useSearchParams();
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [result, setResult] = useState<AiVindbaarheidCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayedScore, setDisplayedScore] = useState(0);

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
    }, 1800);
    return () => window.clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (!result) {
      setDisplayedScore(0);
      return;
    }
    let cancelled = false;
    let raf = 0;
    const target = result.score;
    const start = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / 900);
      setDisplayedScore(Math.round(target * t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [result]);

  const performScan = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai-vindbaarheid-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Er ging iets mis.");
        return;
      }
      setResult(data as AiVindbaarheidCheckResponse);
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
      eyebrow="Gratis AI-check"
      title="Wordt u gevonden"
      titleAccent="door AI?"
      subtitle="Controleer of uw site toegankelijk is voor AI-crawlers (ChatGPT, Claude, Perplexity, Google AI) — direct resultaat, geen registratie."
      domain={domain}
      onDomainChange={setDomain}
      onSubmit={handleSubmit}
      loading={loading}
      loadingSteps={LOADING_STEPS}
      loadingStepIndex={loadingStepIndex}
      error={error}
      onRetry={error === NETWORK_ERROR ? () => void performScan() : undefined}
      inputId="ai-vindbaarheid-domain"
      submitLabel="Controleer AI-vindbaarheid →"
    >
      {result ? (
        <ToolReportSection onReset={() => setResult(null)}>
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className="font-sora flex h-36 w-36 items-center justify-center rounded-full border-4 text-4xl font-black text-neutral-dark"
              style={{ borderColor: scoreColor(result.score) }}
            >
              {displayedScore}%
            </div>
            <p className="font-lato text-lg text-gray-500">
              AI-vindbaarheid voor <span className="font-semibold text-neutral-dark">{result.domain}</span>
            </p>
            <p className="font-lato text-sm text-gray-400">
              {result.checks.filter((c) => c.ok).length} van {result.checks.length} checks geslaagd ·{" "}
              {new Date(result.generatedAt).toLocaleString("nl-NL")}
            </p>
          </div>

          <ul className="mt-12 flex flex-col gap-4">
            {result.checks.map((check) => (
              <li
                key={check.id}
                className={`font-lato rounded-2xl border-2 p-5 text-left ${
                  check.ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none" aria-hidden>
                    {check.ok ? "✅" : "❌"}
                  </span>
                  <div>
                    <p className="font-sora font-bold text-neutral-dark">{check.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      <span className="font-semibold text-gray-700">Waarom belangrijk: </span>
                      {check.why}
                    </p>
                    {!check.ok ? (
                      <p className="mt-3 text-base leading-relaxed text-gray-700">
                        <span className="font-semibold text-neutral-dark">Actie: </span>
                        {check.advice}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">{check.advice}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <ToolReportCta description="Allesis helpt met robots.txt, llms.txt, schema markup en contentstructuur — zodat AI-systemen uw bedrijf correct vinden en citeren." />
        </ToolReportSection>
      ) : null}
    </FreeToolShell>
  );
}
