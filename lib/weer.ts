/** Weereffect voor de homepage-hero, op basis van het actuele weer in Haarlem. */
export type WeerEffect = "herfst" | "regen" | "sneeuw" | "zon" | "mist" | "sterren" | "bloesem";

export const WEER_EFFECTEN: WeerEffect[] = ["herfst", "regen", "sneeuw", "zon", "mist", "sterren", "bloesem"];

export type WeerInfo = {
  effect: WeerEffect;
  label: string;
  emoji: string;
  temp: number | null;
};

const LABELS: Record<WeerEffect, { label: string; emoji: string }> = {
  herfst: { label: "Herfst in Haarlem", emoji: "🍂" },
  regen: { label: "Regen in Haarlem", emoji: "🌧️" },
  sneeuw: { label: "Sneeuw in Haarlem", emoji: "❄️" },
  zon: { label: "Zon in Haarlem", emoji: "☀️" },
  mist: { label: "Mist in Haarlem", emoji: "🌫️" },
  sterren: { label: "Heldere nacht in Haarlem", emoji: "✨" },
  bloesem: { label: "Lente in Haarlem", emoji: "🌸" },
};

/** Seizoenseffect voor bewolkt weer. */
export function seizoenEffect(d = new Date()): WeerEffect {
  const m = d.getMonth() + 1;
  const dag = d.getDate();
  const md = m * 100 + dag;
  if (md >= 321 && md < 621) return "bloesem";
  if (md >= 621 && md < 923) return "zon";
  if (md >= 923 && md < 1221) return "herfst";
  return "mist";
}

/** Vertaalt een WMO-weercode (Open-Meteo) naar een effect. */
export function effectUitWeercode(code: number, isDag: boolean, d = new Date()): WeerEffect {
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "sneeuw";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return "regen";
  if (code === 45 || code === 48) return "mist";
  if (code <= 1) return isDag ? "zon" : "sterren";
  return seizoenEffect(d);
}

export function weerInfo(effect: WeerEffect, temp: number | null): WeerInfo {
  return { effect, temp, ...LABELS[effect] };
}
