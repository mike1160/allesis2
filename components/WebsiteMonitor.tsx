"use client";

import { useCallback, useEffect, useState } from "react";
import MonitorHistory, { loadHistory, saveHistoryEntry } from "@/components/MonitorHistory";
import { MonitorExportButtons } from "@/components/MonitorExport";
import {
  CHECK_ICONS,
  CHECK_LABELS,
  MAX_URLS_PER_REQUEST,
  type CheckKey,
  type CheckStatus,
  type MonitorHistoryEntry,
  type WebsiteCheckResult,
  getOverallLabel,
  getOverallStatus,
} from "@/lib/website-monitor-types";
import { incrementLocalCheckCount } from "@/lib/monitor-counter";

type SiteState = "pending" | "loading" | "done" | "error";

interface SiteResult {
  url: string;
  state: SiteState;
  checks?: WebsiteCheckResult;
  error?: string;
  checkedAt?: string;
}

const STATUS_STYLES: Record<CheckStatus, { icon: string; bg: string; border: string; text: string }> = {
  ok: { icon: "✅", bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-300" },
  warn: { icon: "⚠️", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-300" },
  error: { icon: "❌", bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-300" },
  skip: { icon: "➖", bg: "bg-white/5", border: "border-white/15", text: "text-white/50" },
};

const OVERALL_BADGE: Record<ReturnType<typeof getOverallStatus>, string> = {
  ok: "border-green-500/40 bg-green-500/10 text-green-300",
  warn: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  error: "border-red-500/40 bg-red-500/10 text-red-300",
};

function parseUrls(input: string): string[] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeUrlInput(raw: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function formatTimestamp(iso: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function ResultCard({ site }: { site: SiteResult }) {
  if (site.state === "loading" || site.state === "pending") {
    return (
      <article
        className="rounded-2xl border border-white/10 bg-white/5 p-6"
        aria-label={`Controle bezig voor ${site.url}`}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#3B6D11]"
            role="status"
            aria-label="Laden"
          />
          <div>
            <h3 className="font-sora text-base font-semibold text-white break-all">{site.url}</h3>
            <p className="mt-1 font-lato text-sm text-white/55">
              {site.state === "pending" ? "Wachten op beurt…" : "Website analyseren…"}
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (site.state === "error") {
    return (
      <article className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
        <h3 className="font-sora text-base font-semibold text-white break-all">{site.url}</h3>
        <p className="mt-2 font-lato text-sm text-red-300">{site.error ?? "Controle mislukt."}</p>
      </article>
    );
  }

  const checks = site.checks!;
  const overall = getOverallStatus(checks);

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <span
            className={`inline-block rounded-full border px-3 py-1 font-lato text-xs font-semibold ${OVERALL_BADGE[overall]}`}
          >
            {getOverallLabel(overall)}
          </span>
          <h3 className="mt-2 font-sora text-base font-semibold text-white break-all">{site.url}</h3>
          {site.checkedAt && (
            <p className="mt-1 font-lato text-xs text-white/50">Gecontroleerd op {formatTimestamp(site.checkedAt)}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(Object.keys(CHECK_LABELS) as CheckKey[]).map((key) => {
          const check = checks[key];
          const style = STATUS_STYLES[check.status];
          return (
            <div
              key={key}
              className={`rounded-xl border p-3 ${style.bg} ${style.border}`}
              role="status"
              aria-label={`${CHECK_LABELS[key]}: ${check.status}, ${check.detail}`}
            >
              <div className="flex items-start gap-2">
                <span aria-hidden="true">{CHECK_ICONS[key]}</span>
                <div className="min-w-0">
                  <p className="font-lato text-xs font-semibold text-white/90">{CHECK_LABELS[key]}</p>
                  <p className={`mt-1 font-lato text-xs ${style.text}`}>
                    {style.icon} {check.detail}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default function WebsiteMonitor({ counter }: { counter?: React.ReactNode }) {
  const [tab, setTab] = useState<"check" | "history">("check");
  const [urlInput, setUrlInput] = useState("");
  const [sites, setSites] = useState<SiteResult[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionTimestamp, setSessionTimestamp] = useState<string | null>(null);
  const [history, setHistory] = useState<MonitorHistoryEntry[]>([]);
  const [viewingHistoryId, setViewingHistoryId] = useState<string | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const completedResults = sites.reduce<Record<string, WebsiteCheckResult>>((acc, site) => {
    if (site.state === "done" && site.checks) acc[site.url] = site.checks;
    return acc;
  }, {});

  const allDone = sites.length > 0 && sites.every((s) => s.state === "done" || s.state === "error");
  const exportTimestamp = sessionTimestamp ?? new Date().toISOString();

  const runChecks = useCallback(async () => {
    const rawUrls = parseUrls(urlInput);
    if (rawUrls.length === 0) {
      setError("Voer minimaal één URL in.");
      return;
    }
    if (rawUrls.length > MAX_URLS_PER_REQUEST) {
      setError(`Maximaal ${MAX_URLS_PER_REQUEST} URLs per controle.`);
      return;
    }

    const urls = rawUrls.map(normalizeUrlInput);
    const invalid = urls.filter((u) => {
      try {
        const parsed = new URL(u);
        return parsed.protocol !== "http:" && parsed.protocol !== "https:";
      } catch {
        return true;
      }
    });
    if (invalid.length > 0) {
      setError(`Ongeldige URL(s): ${invalid.join(", ")}`);
      return;
    }

    setError(null);
    setRunning(true);
    setViewingHistoryId(null);
    setSessionTimestamp(new Date().toISOString());
    setSites(urls.map((url) => ({ url, state: "pending" as const })));

    const results: Record<string, WebsiteCheckResult> = {};

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      setSites((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, state: "loading" } : s)),
      );

      try {
        const res = await fetch("/api/check-website", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const data = await res.json();

        if (!res.ok) {
          setSites((prev) =>
            prev.map((s, idx) =>
              idx === i
                ? { ...s, state: "error", error: data.error ?? "Controle mislukt." }
                : s,
            ),
          );
          continue;
        }

        results[url] = data.checks as WebsiteCheckResult;
        setSites((prev) =>
          prev.map((s, idx) =>
            idx === i
              ? {
                  ...s,
                  state: "done",
                  checks: data.checks,
                  checkedAt: data.checkedAt,
                }
              : s,
          ),
        );
      } catch {
        setSites((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, state: "error", error: "Kon de server niet bereiken." } : s,
          ),
        );
      }
    }

    if (Object.keys(results).length > 0) {
      const entry: MonitorHistoryEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        urls,
        results,
      };
      setHistory(saveHistoryEntry(entry));
      incrementLocalCheckCount(Object.keys(results).length);
    } else {
      window.dispatchEvent(new CustomEvent("monitor-checks-updated"));
    }

    setRunning(false);
  }, [urlInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runChecks();
  };

  const handleHistorySelect = (entry: MonitorHistoryEntry) => {
    setTab("check");
    setViewingHistoryId(entry.id);
    setSessionTimestamp(entry.timestamp);
    setUrlInput(entry.urls.join("\n"));
    setSites(
      entry.urls.map((url) => ({
        url,
        state: entry.results[url] ? ("done" as const) : ("error" as const),
        checks: entry.results[url],
        checkedAt: entry.timestamp,
        error: entry.results[url] ? undefined : "Geen resultaten beschikbaar.",
      })),
    );
    setError(null);
  };

  const handleHistoryClear = () => {
    setHistory([]);
    if (viewingHistoryId) {
      setSites([]);
      setViewingHistoryId(null);
      setSessionTimestamp(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] pb-20 pt-24">
      <section className="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="font-lato text-sm font-semibold uppercase tracking-widest text-[#e8ff47]">
              Gratis tool
            </p>
            <h1 className="font-sora mt-3 text-3xl font-bold text-white md:text-4xl">
              Website Monitor
            </h1>
            <p className="font-lato mx-auto mt-4 max-w-2xl text-base text-white/70">
              Controleer één of meerdere websites op bereikbaarheid, SSL, laadtijd, dode links en meer.
              Resultaten worden lokaal opgeslagen en zijn exporteerbaar.
            </p>
          </div>

          {counter}

          <div
            className="mb-6 flex rounded-xl border border-white/10 bg-white/5 p-1"
            role="tablist"
            aria-label="Website Monitor navigatie"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === "check"}
              onClick={() => setTab("check")}
              className={`flex-1 rounded-lg px-4 py-2.5 font-lato text-sm font-semibold transition ${
                tab === "check" ? "bg-[#3B6D11] text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Controle
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "history"}
              onClick={() => setTab("history")}
              className={`flex-1 rounded-lg px-4 py-2.5 font-lato text-sm font-semibold transition ${
                tab === "history" ? "bg-[#3B6D11] text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Geschiedenis
            </button>
          </div>

          {tab === "check" ? (
            <>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <label htmlFor="monitor-urls" className="font-lato text-sm font-semibold text-white">
                  Website-URL&apos;s (één per regel, max. {MAX_URLS_PER_REQUEST})
                </label>
                <textarea
                  id="monitor-urls"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  rows={5}
                  placeholder={"https://voorbeeld.nl\nhttps://andere-site.com"}
                  disabled={running}
                  className="font-lato mt-3 w-full resize-y rounded-xl border border-white/15 bg-[#0a0f1e] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#3B6D11] disabled:opacity-60"
                />
                {error && (
                  <p className="mt-3 font-lato text-sm text-red-300" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={running || !urlInput.trim()}
                  aria-label="Start websitecontrole"
                  className="font-sora mt-4 w-full rounded-xl bg-[#3B6D11] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#2F5610] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {running ? "Bezig met controleren…" : "Start controle"}
                </button>
              </form>

              {sites.length > 0 && (
                <div className="mt-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-sora text-lg font-semibold text-white">Resultaten</h2>
                    {viewingHistoryId && (
                      <span className="font-lato text-xs text-white/50">Uit geschiedenis geladen</span>
                    )}
                  </div>

                  {sites.map((site) => (
                    <ResultCard key={site.url} site={site} />
                  ))}

                  {allDone && Object.keys(completedResults).length > 0 && (
                    <MonitorExportButtons
                      results={completedResults}
                      timestamp={exportTimestamp}
                      className="pt-2"
                    />
                  )}
                </div>
              )}
            </>
          ) : (
            <MonitorHistory
              entries={history}
              onSelect={handleHistorySelect}
              onClear={handleHistoryClear}
            />
          )}
        </div>
      </section>
    </div>
  );
}
