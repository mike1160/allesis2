import {
  LOCAL_TOTAL_CHECKS_KEY,
  MONITOR_COUNTER_SINCE,
} from "@/lib/website-monitor-types";

export function getLocalCheckCount(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(LOCAL_TOTAL_CHECKS_KEY);
  const parsed = parseInt(raw ?? "0", 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function incrementLocalCheckCount(by: number): number {
  if (typeof window === "undefined" || by <= 0) return getLocalCheckCount();
  const next = getLocalCheckCount() + by;
  localStorage.setItem(LOCAL_TOTAL_CHECKS_KEY, String(next));
  window.dispatchEvent(new CustomEvent("monitor-checks-updated", { detail: { count: next } }));
  return next;
}

export { MONITOR_COUNTER_SINCE };
