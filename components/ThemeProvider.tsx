"use client";

import { useEffect, type ReactNode } from "react";
import {
  applyTimeThemeToDocument,
  getTimeThemeDebugInfo,
  THEME_DARK_HOUR_START,
  THEME_LIGHT_HOUR_START,
} from "@/lib/time-theme";

const HOUR_MS = 60 * 60 * 1000;

/**
 * Zet `dark` op <html> alleen in de browser via useEffect — `getHours()` draait dus altijd
 * op de lokale tijdzone van de gebruiker (niet op server-/UTC-tijd).
 *
 * Regel: licht 07:00–19:59, donker 20:00–06:59 (lokale browsertijd).
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const now = new Date();
    applyTimeThemeToDocument(now);
    const info = getTimeThemeDebugInfo(now);
    console.log("[Allesis time theme]", {
      localHour: info.localHour,
      timeZone: info.timeZone,
      offsetLabel: info.offsetLabel,
      mode: info.mode,
      rule: `light ${String(THEME_LIGHT_HOUR_START).padStart(2, "0")}:00–${String(THEME_DARK_HOUR_START - 1).padStart(2, "0")}:59, dark ${String(THEME_DARK_HOUR_START).padStart(2, "0")}:00–${String(THEME_LIGHT_HOUR_START - 1).padStart(2, "0")}:59`,
    });

    const id = window.setInterval(() => {
      applyTimeThemeToDocument();
    }, HOUR_MS);
    return () => window.clearInterval(id);
  }, []);

  return <>{children}</>;
}
