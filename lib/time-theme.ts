/**
 * Automatisch thema op basis van de **lokale klok van de browser** (niet UTC, niet server).
 * Licht: 07:00–19:59 | Donker: 20:00–06:59
 */
export const THEME_LIGHT_HOUR_START = 7;
export const THEME_DARK_HOUR_START = 20;

export function shouldUseDarkTheme(at: Date = new Date()): boolean {
  const h = at.getHours();
  return h >= THEME_DARK_HOUR_START || h < THEME_LIGHT_HOUR_START;
}

export function applyTimeThemeToDocument(at: Date = new Date()): void {
  const dark = shouldUseDarkTheme(at);
  document.documentElement.classList.toggle("dark", dark);
}

export function getTimeThemeDebugInfo(at: Date = new Date()) {
  const hour = at.getHours();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utcOffsetMinutes = -at.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(utcOffsetMinutes) / 60);
  const offsetMins = Math.abs(utcOffsetMinutes) % 60;
  const offsetSign = utcOffsetMinutes >= 0 ? "+" : "-";
  const offsetLabel = `GMT${offsetSign}${offsetHours}${offsetMins ? `:${String(offsetMins).padStart(2, "0")}` : ""}`;
  const dark = shouldUseDarkTheme(at);
  return {
    localHour: hour,
    timeZone,
    offsetLabel,
    mode: dark ? ("dark" as const) : ("light" as const),
  };
}
