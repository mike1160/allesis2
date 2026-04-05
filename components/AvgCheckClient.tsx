"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AVGHelpPopup from "@/components/AVGHelpPopup";

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

export default function AvgCheckClient() {
  const searchParams = useSearchParams();
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AVGCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupSent, setPopupSent] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [popupLoading, setPopupLoading] = useState(false);

  useEffect(() => {
    const fromUrl = searchParams.get("domain") ?? searchParams.get("domein") ?? "";
    if (fromUrl) setDomain(fromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (!result || result.score >= 80) return;
    const t = window.setTimeout(() => setShowPopup(true), 3000);
    return () => window.clearTimeout(t);
  }, [result]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setShowPopup(false);
    setPopupSent(false);

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
      setError("Kon de server niet bereiken. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result?.scanId || result.scanId === "unknown") {
      setShowPopup(false);
      return;
    }
    setPopupLoading(true);
    try {
      const res = await fetch("/api/avg-check", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scanId: result.scanId,
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
        }),
      });
      if (res.ok) {
        setPopupSent(true);
      } else {
        setShowPopup(false);
      }
    } catch {
      setShowPopup(false);
    } finally {
      setPopupLoading(false);
    }
  };

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const scoreColor =
    result && result.score >= 80 ? "#22c55e" : result && result.score >= 50 ? "#f59e0b" : "#ef4444";

  const checkEntries = result ? (Object.entries(result.checks) as [string, CheckResult][]) : [];

  return (
    <div className="min-h-screen bg-[#0a0f1e] pb-20 pt-24">
      <section className="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-sora text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Is uw website AVG-compliant?
          </h1>
          <p className="font-lato mx-auto mt-5 max-w-lg text-lg font-light text-white/70">
            Vul uw domeinnaam in en ontvang direct een gratis rapport.
          </p>

          <form onSubmit={handleScan} className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label htmlFor="avg-domain" className="sr-only">
              Domeinnaam
            </label>
            <input
              id="avg-domain"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="bijv. uwbedrijf.nl"
              className="font-lato min-h-[56px] flex-1 rounded-xl border-2 border-white/10 bg-white/5 px-5 text-lg text-white placeholder:text-white/40 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
            <button
              type="submit"
              disabled={loading || !domain.trim()}
              className="font-lato min-h-[56px] rounded-xl bg-accent px-8 text-lg font-bold text-[#0a0f1e] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Controleer nu →
            </button>
          </form>

          {loading ? (
            <div className="font-lato mt-10 flex flex-col items-center gap-3 text-white/80">
              <div className="border-accent h-10 w-10 rounded-full border-2 border-t-transparent spinner" />
              <p>Uw website wordt gecontroleerd…</p>
            </div>
          ) : null}

          {error ? (
            <p className="font-lato mt-8 rounded-xl bg-red-500/15 px-4 py-3 text-red-200" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </section>

      {result ? (
        <section className="border-t border-white/10 bg-[#0a0f1e] px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <div
                className="font-sora flex h-40 w-40 items-center justify-center rounded-full border-4 text-4xl font-black text-white"
                style={{ borderColor: scoreColor }}
              >
                {result.score}
              </div>
              <p className="font-lato text-lg text-white/70">
                Score voor <span className="font-semibold text-white">{result.domain}</span>
              </p>
              <p className="font-sora text-xl font-bold text-white">{riskBadge[result.riskLevel]}</p>
              <p className="font-lato text-sm text-white/50">
                Rapport gegenereerd: {new Date(result.generatedAt).toLocaleString("nl-NL")}
              </p>
            </div>

            <ul className="mt-14 flex flex-col gap-4">
              {checkEntries.map(([key, check]) => (
                <li
                  key={key}
                  className={`font-lato rounded-2xl border-2 p-5 text-left ${
                    check.ok ? "border-green-500/30 bg-green-500/10" : "border-amber-500/35 bg-amber-500/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl leading-none" aria-hidden>
                      {check.ok ? "✅" : "❌"}
                    </span>
                    <div>
                      <p className="font-sora font-bold text-white">{check.label}</p>
                      <p className="mt-2 text-base leading-relaxed text-white/75">{check.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {result.score < 80 ? (
              <div className="font-lato mt-12 rounded-2xl bg-primary p-8 text-center text-white shadow-lg">
                <p className="font-sora text-xl font-bold">Allesis lost dit voor u op</p>
                <p className="mt-2 text-white/80">Van privacybeleid tot cookiebanner — wij maken uw site compliant.</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-8 font-bold text-primary transition hover:bg-neutral-light"
                >
                  Neem contact op
                </Link>
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
        />
      ) : null}
    </div>
  );
}
