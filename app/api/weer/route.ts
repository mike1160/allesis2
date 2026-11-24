import { NextResponse } from "next/server";
import { effectUitWeercode, seizoenEffect, weerInfo } from "@/lib/weer";

/** Actueel weer in Haarlem (Spaarndamseweg) via Open-Meteo. Gecachet voor 15 minuten. */
const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.39&longitude=4.64&current=temperature_2m,weather_code,is_day&timezone=Europe%2FAmsterdam";

export const revalidate = 900;

export async function GET() {
  try {
    const res = await fetch(URL, { next: { revalidate: 900 }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
    const data = (await res.json()) as { current?: { temperature_2m?: number; weather_code?: number; is_day?: number } };
    const c = data.current ?? {};
    const effect = effectUitWeercode(c.weather_code ?? 3, c.is_day !== 0);
    const temp = typeof c.temperature_2m === "number" ? Math.round(c.temperature_2m) : null;
    return NextResponse.json(weerInfo(effect, temp), {
      headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" },
    });
  } catch {
    return NextResponse.json(weerInfo(seizoenEffect(), null), {
      headers: { "Cache-Control": "public, s-maxage=300" },
    });
  }
}
