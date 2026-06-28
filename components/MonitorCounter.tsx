"use client";

import CountUp from "react-countup";
import { useCallback, useEffect, useState } from "react";
import { getLocalCheckCount, MONITOR_COUNTER_SINCE } from "@/lib/monitor-counter";

type CounterSource = "global" | "local";

export default function MonitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [source, setSource] = useState<CounterSource>("global");

  const loadCount = useCallback(async () => {
    try {
      const res = await fetch("/api/check-count");
      const data = (await res.json()) as { count?: number; available?: boolean };

      if (res.ok && data.available !== false && typeof data.count === "number") {
        setCount(data.count);
        setSource("global");
        return;
      }
    } catch {
      /* fallback naar localStorage */
    }

    setCount(getLocalCheckCount());
    setSource("local");
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      void loadCount();
    });
    return () => cancelAnimationFrame(frame);
  }, [loadCount]);

  useEffect(() => {
    const onUpdate = () => {
      if (source === "local") {
        setCount(getLocalCheckCount());
      } else {
        void loadCount();
      }
    };

    window.addEventListener("monitor-checks-updated", onUpdate);
    return () => window.removeEventListener("monitor-checks-updated", onUpdate);
  }, [loadCount, source]);

  if (count === null) return null;

  return (
    <div className="mb-7 text-center">
      <span
        className="font-lato inline-block rounded-full border border-[#334155] bg-[#1e293b] px-5 py-2 text-[15px] text-[#94a3b8]"
        aria-live="polite"
        aria-label={`${count.toLocaleString("nl-NL")} checks uitgevoerd sinds ${MONITOR_COUNTER_SINCE}`}
      >
        🔍{" "}
        <strong className="text-[#f1f5f9]">
          <CountUp end={count} duration={1.5} separator="." preserveValue />
        </strong>{" "}
        checks uitgevoerd sinds {MONITOR_COUNTER_SINCE}
        {source === "local" && (
          <span className="sr-only"> (lokaal op dit apparaat)</span>
        )}
      </span>
    </div>
  );
}
