"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AVGHelpPopup from "@/components/AVGHelpPopup";
import PageHero from "@/components/PageHero";
import { PRIVACY_CONSENT_ERROR } from "@/lib/form-consent";

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

const riskBadge: Record<AVGCheckResponse["riskLevel"], string> = {
  laag: "🟢 Laag risico",
  gemiddeld: "🟠 Gemiddeld risico",
  hoog: "🔴 Hoog risico",
};

const VERIFY_SERVER = "Verificatie mislukt. Probeer het opnieuw.";
const VERIFY_CLIENT = "Verificatie mislukt. Vernieuw de pagina en probeer opnieuw.";

const LOADING_STEPS = [
  "Domein controleren…",
  "SSL-certificaat checken…",
  "Cookiebanner zoeken…",
  "Privacybeleid scannen…",
  "Rapport opstellen…",
] as const;

const NETWORK_ERROR = "Kon de server niet bereiken. Probeer het opnieuw.";

export default function AvgCheckClient() {
  const searchParams = useSearchParams();
  const [domain, setDomain] = useState("");
  const [platform, setPlatform] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [displayedScore, setDisplayedScore] = useState(0);
  const [result, setResult] = useState<AVGCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupSent, setPopupSent] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [popupLoading, setPopupLoading] = useState(false);
  const [popupError, setPopupError] = useState<string | null>(null);
  const [popupTurnstileToken, setPopupTurnstileToken] = useState<string | null>(null);
  const [popupPrivacyAccepted, setPopupPrivacyAccepted] = useState(false);
  const [popupNieuwsbrief, setPopupNieuwsbrief] = useState(false);
  const [popupPrivacyError, setPopupPrivacyError] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const setPopupPrivacy = useCallback((v: boolean) => {
    setPopupPrivacyAccepted(v);
    if (v) setPopupPrivacyError(false);
  }, []);

  useEffect(() => {
    const fromUrl = searchParams.get("domain") ?? searchParams.get("domein") ?? "";
    if (fromUrl) setDomain(fromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (!result || result.score >= 80) return;
    const t = window.setTimeout(() => setShowPopup(true), 3000);
    return () => window.clearTimeout(t);
  }, [result]);

  useEffect(() => {
    if (showPopup) {
      setPopupTurnstileToken(null);
      setPopupError(null);
      setPopupPrivacyAccepted(false);
      setPopupNieuwsbrief(false);
      setPopupPrivacyError(false);
    }
  }, [showPopup]);

  useEffect(() => {
    if (!loading) {
      setLoadingStepIndex(0);
      return;
    }
    const id = window.setInterval(() => {
      setLoadingStepIndex((i) => (i + 1) % LOADING_STEPS.length);
    }, 2000);
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
    const durationMs = 1000;
    const start = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / durationMs);
      setDisplayedScore(Math.round(target * t));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplayedScore(target);
      }
    };
    setDisplayedScore(0);
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
    setShowPopup(false);
    setPopupSent(false);
    setPopupError(null);
    setPopupTurnstileToken(null);
    setPopupPrivacyAccepted(false);
    setPopupNieuwsbrief(false);
    setPopupPrivacyError(false);

    try {
      const res = await fetch("/api/avg-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Er ging iets mis.");
        return;
      }
      setResult(data as AVGCheckResponse);
    } catch {
      setError(NETWORK_ERROR);
    } finally {
      setLoading(false);
    }
  }, [domain]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    void performScan();
  };

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result?.scanId || result.scanId === "unknown") {
      setShowPopup(false);
      return;
    }
    if (!popupPrivacyAccepted) {
      setPopupPrivacyError(true);
      return;
    }
    if (!popupTurnstileToken) return;
    setPopupLoading(true);
    setPopupError(null);
    try {
      const res = await fetch("/api/avg-check", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scanId: result.scanId,
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          domain: result.domain,
          score: result.score,
          platform,
          turnstileToken: popupTurnstileToken,
          privacyAccepted: true,
          nieuwsbrief: popupNieuwsbrief,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setPopupSent(true);
      } else {
        setPopupTurnstileToken(null);
        if (data.error === PRIVACY_CONSENT_ERROR) {
          setPopupPrivacyError(true);
          setPopupError("");
        } else {
          const msg =
            typeof data.error === "string"
              ? data.error === VERIFY_SERVER
                ? VERIFY_CLIENT
                : data.error
              : "Verzenden mislukt. Probeer het opnieuw.";
          setPopupError(msg);
        }
      }
    } catch {
      setPopupTurnstileToken(null);
      setPopupError(NETWORK_ERROR);
    } finally {
      setPopupLoading(false);
    }
  };

  const handleBetalen = async () => {
    if (!result) return;
    setPaymentLoading(true);
    setPaymentError(null);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scanId: result.scanId,
          domain: result.domain,
          platform: platform,
          email: contactEmail,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPaymentError(data.error || "Betaling aanmaken mislukt.");
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setPaymentError("Kon de server niet bereiken. Probeer het opnieuw.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const scoreColor =
    result && result.score >= 80 ? "#22c55e" : result && result.score >= 50 ? "#f59e0b" : "#ef4444";

  const checkEntries = result ? (Object.entries(result.checks) as [string, CheckResult][]) : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHero
        eyebrow="Gratis AVG-check"
        title="Is uw website"
        titleAccent="AVG-compliant?"
        description="Vul uw domeinnaam in en ontvang direct een gratis rapport."
        orchidOpacity={0.2}
        className="pt-28 md:pt-32"
      >
        <form onSubmit={handleScan} className="flex max-w-xl flex-col gap-3">
          <label htmlFor="avg-domain" className="sr-only">
            Domeinnaam
          </label>
          <input
            id="avg-domain"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="bijv. uwbedrijf.nl"
            className="font-lato min-h-[56px] w-full rounded-xl border-2 border-gray-200 bg-white px-5 text-lg text-neutral-dark placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <label htmlFor="avg-platform" className="sr-only">
            Platform
          </label>
          <select
            id="avg-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="font-lato min-h-[56px] w-full rounded-xl border-2 border-gray-200 bg-white px-5 text-lg text-neutral-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Platform (optioneel)</option>
            <option value="WordPress">WordPress</option>
            <option value="Wix">Wix</option>
            <option value="Squarespace">Squarespace</option>
            <option value="Shopify">Shopify</option>
            <option value="Webflow">Webflow</option>
            <option value="Anders">Anders</option>
          </select>
          <button
            type="submit"
            disabled={loading || !domain.trim()}
            className="font-lato min-h-[56px] w-full rounded-xl bg-primary px-8 text-lg font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Controleer nu →
          </button>
        </form>

        {loading ? (
          <p className="font-lato mt-8 text-lg text-gray-500" aria-live="polite">
            {LOADING_STEPS[loadingStepIndex]}
          </p>
        ) : null}

        {error ? (
          <div className="font-lato mt-8 max-w-xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700" role="alert">
            <p>{error}</p>
            {error === NETWORK_ERROR ? (
              <button
                type="button"
                onClick={() => void performScan()}
                className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-red-100 px-4 font-semibold text-red-800 underline-offset-2 hover:underline"
              >
                Opnieuw proberen
              </button>
            ) : null}
            <p className="mt-3 text-sm text-red-600">
              Hulp nodig?{" "}
              <a href="mailto:support@allesis.nl" className="font-semibold underline">
                support@allesis.nl
              </a>
            </p>
          </div>
        ) : null}
      </PageHero>

      {result ? (
        <section className="border-t border-gray-200 bg-white px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <div
                className="font-sora flex h-40 w-40 items-center justify-center rounded-full border-4 text-4xl font-black text-neutral-dark"
                style={{ borderColor: scoreColor }}
              >
                {displayedScore}
              </div>
              <p className="font-lato text-lg text-gray-500">
                Score voor <span className="font-semibold text-neutral-dark">{result.domain}</span>
              </p>
              <p className="font-sora text-xl font-bold text-neutral-dark">{riskBadge[result.riskLevel]}</p>
              <p className="font-lato text-sm text-gray-400">
                Rapport gegenereerd: {new Date(result.generatedAt).toLocaleString("nl-NL")}
              </p>
            </div>

            <ul className="mt-14 flex flex-col gap-4">
              {checkEntries.map(([key, check]) => (
                <li
                  key={key}
                  className={`font-lato rounded-2xl border-2 p-5 text-left ${
                    check.ok ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl leading-none" aria-hidden>
                      {check.ok ? "✅" : "❌"}
                    </span>
                    <div>
                      <p className="font-sora font-bold text-neutral-dark">{check.label}</p>
                      <p className="mt-2 text-base leading-relaxed text-gray-600">{check.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {result.score < 80 ? (
              <div className="font-lato mt-12 rounded-2xl bg-primary p-8 text-center text-white shadow-lg">
                <p className="font-sora text-xl font-bold">Allesis lost dit voor u op</p>
                <p className="mt-2 text-white/80">Van privacybeleid tot cookiebanner — wij maken uw site compliant.</p>
                <div className="mt-6 flex flex-col items-center gap-3">
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Uw e-mailadres voor de documenten"
                    className="font-lato w-full rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                  />
                  <button
                    type="button"
                    onClick={handleBetalen}
                    disabled={paymentLoading}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-8 font-bold text-primary transition hover:bg-neutral-light disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {paymentLoading ? "Bezig…" : "Fix mijn website voor €79 →"}
                  </button>
                  {paymentError ? <p className="text-sm text-red-200">{paymentError}</p> : null}
                  <p className="text-xs text-white/70">Betalen via iDEAL · Binnen 10 minuten uw documenten per mail</p>
                </div>
              </div>
            ) : (
              <div className="font-lato mt-12 rounded-2xl bg-[#166534] p-8 text-center text-white shadow-lg">
                <p className="font-sora text-xl font-bold">Goed bezig!</p>
                <p className="mt-2 text-white/85">Uw site scoort sterk. Blijf hosting en updates door ons laten verzorgen.</p>
                <Link
                  href="/hosting"
                  className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-8 font-bold text-[#166534] transition hover:bg-neutral-light"
                >
                  Bekijk hosting
                </Link>
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setResult(null)}
                className="font-lato min-h-[48px] rounded-xl border-2 border-gray-200 bg-white px-6 font-semibold text-neutral-dark transition hover:border-primary hover:text-primary"
              >
                Scan een andere website
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {showPopup && result && result.score < 80 ? (
        <AVGHelpPopup
          domain={result.domain}
          score={result.score}
          onClose={closePopup}
          onSubmit={handlePopupSubmit}
          name={contactName}
          setName={setContactName}
          email={contactEmail}
          setEmail={setContactEmail}
          phone={contactPhone}
          setPhone={setContactPhone}
          loading={popupLoading}
          sent={popupSent}
          error={popupError}
          turnstileToken={popupTurnstileToken}
          setTurnstileToken={setPopupTurnstileToken}
          onTurnstileFailed={() => setPopupError(VERIFY_CLIENT)}
          privacyAccepted={popupPrivacyAccepted}
          setPrivacyAccepted={setPopupPrivacy}
          nieuwsbrief={popupNieuwsbrief}
          setNieuwsbrief={setPopupNieuwsbrief}
          showPrivacyError={popupPrivacyError}
        />
      ) : null}
    </div>
  );
}
