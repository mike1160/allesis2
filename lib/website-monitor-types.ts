export type CheckStatus = "ok" | "warn" | "error" | "skip";

export interface CheckItem {
  status: CheckStatus;
  detail: string;
}

export interface WebsiteCheckResult {
  online: CheckItem;
  https: CheckItem;
  loadtime: CheckItem;
  error_pages: CheckItem;
  dead_links: CheckItem;
  buttons: CheckItem;
  contact_form: CheckItem;
  donation: CheckItem;
}

export type CheckKey = keyof WebsiteCheckResult;

export const CHECK_LABELS: Record<CheckKey, string> = {
  online: "Online status",
  https: "HTTPS / SSL",
  loadtime: "Laadtijd",
  error_pages: "404 / Foutpagina's",
  dead_links: "Dode links",
  buttons: "Buttons",
  contact_form: "Contactformulier",
  donation: "Donatie-button",
};

export const CHECK_ICONS: Record<CheckKey, string> = {
  online: "🌐",
  https: "🔒",
  loadtime: "⏱️",
  error_pages: "⚠️",
  dead_links: "🔗",
  buttons: "🔘",
  contact_form: "📋",
  donation: "💳",
};

export interface MonitorHistoryEntry {
  id: string;
  timestamp: string;
  urls: string[];
  results: Record<string, WebsiteCheckResult>;
}

export const HISTORY_STORAGE_KEY = "allesis_monitor_history";
export const LOCAL_TOTAL_CHECKS_KEY = "allesis_monitor_total_checks";
export const KV_TOTAL_CHECKS_KEY = "monitor_total_checks";
export const MONITOR_COUNTER_SINCE = "30 mei 2026";
export const MAX_HISTORY_ENTRIES = 50;
export const MAX_URLS_PER_REQUEST = 10;

export type OverallStatus = "ok" | "warn" | "error";

export function getOverallStatus(checks: WebsiteCheckResult): OverallStatus {
  const values = Object.values(checks);
  if (values.some((c) => c.status === "error")) return "error";
  if (values.some((c) => c.status === "warn")) return "warn";
  return "ok";
}

export function getOverallLabel(status: OverallStatus): string {
  switch (status) {
    case "ok":
      return "Alles in orde";
    case "warn":
      return "Aandacht nodig";
    case "error":
      return "Problemen gevonden";
  }
}

export function getEntryOverallStatus(entry: MonitorHistoryEntry): OverallStatus {
  const statuses = Object.values(entry.results).map(getOverallStatus);
  if (statuses.some((s) => s === "error")) return "error";
  if (statuses.some((s) => s === "warn")) return "warn";
  return "ok";
}
