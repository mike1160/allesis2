"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Actie loopt t/m 31 december 2026 (23:59:59 Nederlandse tijd). */
const EINDE_ACTIE = new Date("2026-12-31T23:59:59+01:00").getTime();
const STORAGE_KEY = "bf2026-popup-gesloten";
/** Na sluiten blijft de pop-up 3 dagen weg. */
const OPNIEUW_NA_MS = 3 * 24 * 60 * 60 * 1000;
const VERBORGEN_OP = ["/admin", "/dashboard", "/login", "/registreren", "/contact"];

const OFFERTE_HREF = `/contact?pakket=${encodeURIComponent("Black Friday — hosting €20/mnd + gratis website")}#offerte`;

type Taal = "nl" | "en";

const TEKST = {
  nl: {
    label: "Black Friday deal",
    titel: "Stap over naar onze hosting en krijg je website gratis*",
    prijs: "€20",
    perMaand: "per maand ex btw · minimaal 1 jaar",
    punten: [
      "Complete website met meerdere pagina's",
      "Contactformulier, SSL-certificaat en mobielvriendelijk ontwerp",
      "Snelle Nederlandse hosting, basis-SEO en AVG-proof",
    ],
    cta: "Ik wil overstappen",
    sluiten: "Nee, bedankt",
    geldig: "Geldig t/m 31 december 2026",
    voorwaarden:
      "*Gratis website bij overstap naar hosting bij Allesis à €20 per maand ex btw, met een looptijd van minimaal 1 jaar. Inbegrepen is alles wat wij geautomatiseerd kunnen opleveren: een uitgebreide website met contactformulier, SSL en mobielvriendelijk ontwerp. Webshops, betaalintegraties, koppelingen en ander maatwerk blijven betaald; daarvoor ontvangt u vooraf een offerte. Kost een website uitzonderlijk veel werk, dan spreken we vooraf een eerlijke prijs af.",
  },
  en: {
    label: "Black Friday deal",
    titel: "Switch to our hosting and get your website for free*",
    prijs: "€20",
    perMaand: "per month excl. VAT · 1-year minimum",
    punten: [
      "Complete multi-page website",
      "Contact form, SSL certificate and mobile-friendly design",
      "Fast Dutch hosting, basic SEO and GDPR-compliant",
    ],
    cta: "I want to switch",
    sluiten: "No, thanks",
    geldig: "Valid until 31 December 2026",
    voorwaarden:
      "*Free website when you move your hosting to Allesis at €20 per month excl. VAT, with a minimum term of 1 year. Included is everything we can deliver in an automated way: an extensive website with contact form, SSL and mobile-friendly design. Webshops, payment integrations, third-party connections and other custom work remain paid; you will receive a quote in advance. If a website turns out to require an exceptional amount of work, we agree on a fair price beforehand.",
  },
} as const;

export default function BlackFridayPopup() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [taal, setTaal] = useState<Taal>("nl");

  const verborgen = VERBORGEN_OP.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    if (verborgen || Date.now() > EINDE_ACTIE) return;
    const gesloten = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (gesloten && Date.now() - gesloten < OPNIEUW_NA_MS) return;

    const engels =
      pathname.startsWith("/th") || pathname.startsWith("/thai") || !navigator.language?.toLowerCase().startsWith("nl");
    const timer = window.setTimeout(() => {
      setTaal(engels ? "en" : "nl");
      setOpen(true);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [pathname, verborgen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && sluit();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function sluit() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
  }

  if (!open) return null;
  const t = TEKST[taal];

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={sluit}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bf-titel"
        lang={taal}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-[#0b0b0f] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <div className="flex rounded-full border border-white/15 p-0.5 text-xs font-bold" role="group" aria-label="Taal / Language">
            {(["nl", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setTaal(l)}
                aria-pressed={taal === l}
                className={`rounded-full px-3 py-1 uppercase transition ${taal === l ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={sluit}
            aria-label={taal === "nl" ? "Sluiten" : "Close"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="px-6 pb-6 pt-4 sm:px-8">
          <span className="font-lato inline-block rounded-full bg-[#facc15] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            {t.label}
          </span>
          <h2 id="bf-titel" className="font-sora mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
            {t.titel}
          </h2>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-sora text-5xl font-black text-[#facc15]">{t.prijs}</span>
            <span className="font-lato text-sm text-white/70">{t.perMaand}</span>
          </div>

          <ul className="font-lato mt-5 space-y-2 text-sm text-white/85">
            {t.punten.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-[#facc15]" aria-hidden>✓</span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href={OFFERTE_HREF}
              onClick={sluit}
              className="font-lato inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-[#facc15] px-6 text-sm font-black text-black transition hover:bg-[#fde047]"
            >
              {t.cta} →
            </Link>
            <button
              type="button"
              onClick={sluit}
              className="font-lato min-h-[48px] rounded-full px-6 text-sm font-semibold text-white/60 transition hover:text-white"
            >
              {t.sluiten}
            </button>
          </div>

          <p className="font-lato mt-5 text-xs font-bold text-white/70">{t.geldig}</p>
          <p className="font-lato mt-2 text-[11px] leading-relaxed text-white/50">{t.voorwaarden}</p>
        </div>
      </div>
    </div>
  );
}
