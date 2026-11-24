"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { blackFridayActief } from "@/lib/black-friday";

/**
 * Toont tijdens de Black Friday-actie de normale prijs doorgestreept met daaronder € 0,00*.
 * Na afloop (31-12-2026) verschijnt automatisch weer alleen de normale prijs.
 */
const abonneerNiets = () => () => {};

export default function BlackFridayPrijs({
  prijs,
  className = "text-4xl",
  licht = true,
}: {
  prijs: string;
  className?: string;
  /** true = witte tekst op donkere kaart */
  licht?: boolean;
}) {
  // Server rendert de actieprijs; in de browser telt de echte datum.
  const actief = useSyncExternalStore(
    abonneerNiets,
    () => blackFridayActief(),
    () => true,
  );

  if (!actief) return <p className={`mb-1 font-black tracking-tight ${className}`}>{prijs}</p>;

  return (
    <div className="mb-1">
      <p className={`font-black tracking-tight line-through decoration-[3px] opacity-60 ${className}`} style={{ textDecorationColor: "#FFD400" }}>
        <span className="sr-only">Normaal </span>
        {prijs}
      </p>
      <p className="mt-1 flex flex-wrap items-center gap-2">
        <span className="rounded bg-black px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-[#FFD400] ring-1 ring-[#FFD400]">
          Black Friday
        </span>
        <span className={`font-sora text-2xl font-black ${licht ? "text-[#FFD400]" : "text-neutral-dark"}`}>
          € 0,00
          <Link href="/voorwaarden#black-friday" className="align-super text-sm hover:underline" aria-label="Actievoorwaarden">
            *
          </Link>
        </span>
      </p>
      <p className={`mt-1 text-[11px] ${licht ? "text-white/60" : "text-gray-500"}`}>
        Bij overstap naar onze hosting (€20 p/m, min. 1 jaar) · t/m 31 december
      </p>
    </div>
  );
}
