"use client";

import {
  HISTORY_STORAGE_KEY,
  MAX_HISTORY_ENTRIES,
  type MonitorHistoryEntry,
  type OverallStatus,
  getEntryOverallStatus,
} from "@/lib/website-monitor-types";
import {
  buildHistoryExportRows,
  downloadCsv,
  downloadHistoryPdf,
} from "@/components/MonitorExport";

const STATUS_ICON: Record<OverallStatus, string> = {
  ok: "✅",
  warn: "⚠️",
  error: "❌",
};

function formatEntryDate(iso: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function loadHistory(): MonitorHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MonitorHistoryEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry: MonitorHistoryEntry): MonitorHistoryEntry[] {
  const existing = loadHistory();
  const next = [entry, ...existing].slice(0, MAX_HISTORY_ENTRIES);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
}

interface MonitorHistoryProps {
  entries: MonitorHistoryEntry[];
  onSelect: (entry: MonitorHistoryEntry) => void;
  onClear: () => void;
}

export default function MonitorHistory({ entries, onSelect, onClear }: MonitorHistoryProps) {
  const handleClear = () => {
    if (!window.confirm("Weet u zeker dat u de volledige geschiedenis wilt wissen?")) return;
    clearHistory();
    onClear();
  };

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="font-lato text-white/70">Nog geen eerdere controles opgeslagen.</p>
        <p className="mt-2 font-lato text-sm text-white/50">
          Voltooide controles worden automatisch lokaal opgeslagen (max. {MAX_HISTORY_ENTRIES}).
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-lato text-sm text-white/60">{entries.length} opgeslagen controle(s)</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-label="Exporteer volledige geschiedenis als CSV"
            onClick={() => downloadCsv(buildHistoryExportRows(entries), `website-check-geschiedenis-${new Date().toISOString().slice(0, 10)}.csv`)}
            className="rounded-lg border border-white/20 px-3 py-2 font-lato text-xs font-semibold text-white/90 transition hover:bg-white/10"
          >
            Geschiedenis CSV
          </button>
          <button
            type="button"
            aria-label="Exporteer volledige geschiedenis als PDF"
            onClick={() => downloadHistoryPdf(entries)}
            className="rounded-lg border border-white/20 px-3 py-2 font-lato text-xs font-semibold text-white/90 transition hover:bg-white/10"
          >
            Geschiedenis PDF
          </button>
          <button
            type="button"
            aria-label="Verwijder volledige geschiedenis"
            onClick={handleClear}
            className="rounded-lg border border-red-400/40 px-3 py-2 font-lato text-xs font-semibold text-red-300 transition hover:bg-red-500/10"
          >
            Verwijder geschiedenis
          </button>
        </div>
      </div>

      <ul className="space-y-2" role="list" aria-label="Geschiedenis van websitecontroles">
        {entries.map((entry) => {
          const status = getEntryOverallStatus(entry);
          return (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => onSelect(entry)}
                className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-[#1a3bcc]/60 hover:bg-white/10"
                aria-label={`Controle van ${formatEntryDate(entry.timestamp)} met ${entry.urls.length} URL(s)`}
              >
                <div>
                  <p className="font-sora text-sm font-semibold text-white">
                    {formatEntryDate(entry.timestamp)}
                  </p>
                  <p className="mt-0.5 font-lato text-xs text-white/55">
                    {entry.urls.length} URL{entry.urls.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <span className="text-lg" aria-hidden="true">
                  {STATUS_ICON[status]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
