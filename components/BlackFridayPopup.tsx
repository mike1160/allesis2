"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BLACK_FRIDAY_EINDE } from "@/lib/black-friday";

/** Actie loopt t/m 31 december 2026 (23:59:59 Nederlandse tijd). */
const EINDE_ACTIE = BLACK_FRIDAY_EINDE;
const STORAGE_KEY = "bf2026-popup-gesloten";
/** Na sluiten blijft de pop-up 3 dagen weg. */
const OPNIEUW_NA_MS = 3 * 24 * 60 * 60 * 1000;
const VERBORGEN_OP = ["/admin", "/dashboard", "/login", "/registreren", "/contact", "/voorwaarden", "/opzeggen"];

const OFFERTE_HREF = `/contact?pakket=${encodeURIComponent("Black Friday — hosting €20/mnd + gratis website")}#offerte`;
const GEEL = "#FFD400";

type Taal = "nl" | "en";

const TEKST = {
  nl: {
    tape: "GRATIS WEBSITE",
    kop: "Gratis website.",
    sub: "Stap over naar onze hosting en wij bouwen uw nieuwe website. Zonder gedoe.",
    website: "Website",
    hosting: "Hosting",
    pm: "p/m ex btw",
    punten: ["Complete website met contactformulier", "Veilig: SSL, geen PHP, geen plug-in-lekken", "Snel, vindbaar en AVG-proof"],
    cta: "Ik stap over",
    sluiten: "Nee, bedankt",
    dagen: (d: number) => (d === 1 ? "Nog 1 dag" : `Nog ${d} dagen`),
    geldig: "t/m 31 december",
    kleine: "*Bij minimaal 1 jaar hosting à €20 p/m ex btw. Webshops, betaalkoppelingen en maatwerk niet inbegrepen.",
    voorwaarden: "Voorwaarden",
    badge: "Gratis website*",
    badgeLabel: "Bekijk de Black Friday-deal",
  },
  en: {
    tape: "FREE WEBSITE",
    kop: "Free website.",
    sub: "Move your hosting to us and we'll build your new website. Hassle-free.",
    website: "Website",
    hosting: "Hosting",
    pm: "p/m excl. VAT",
    punten: ["Complete website with contact form", "Secure: SSL, no PHP, no plug-in leaks", "Fast, findable and GDPR-proof"],
    cta: "I'm switching",
    sluiten: "No, thanks",
    dagen: (d: number) => (d === 1 ? "1 day left" : `${d} days left`),
    geldig: "until 31 December",
    kleine: "*With a minimum 1-year hosting plan at €20 p/m excl. VAT. Webshops, payment integrations and custom work not included.",
    voorwaarden: "Terms",
    badge: "Free website*",
    badgeLabel: "View the Black Friday deal",
  },
} as const;

export default function BlackFridayPopup() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [taal, setTaal] = useState<Taal>("nl");
  const [dagen, setDagen] = useState(0);
  const [actief, setActief] = useState(false);

  const verborgen = VERBORGEN_OP.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    if (verborgen || Date.now() > EINDE_ACTIE) return;
    const engels =
      pathname.startsWith("/th") || pathname.startsWith("/thai") || !navigator.language?.toLowerCase().startsWith("nl");
    // State pas zetten in een callback (na de eerste paint), niet synchroon in de effect.
    const frame = window.requestAnimationFrame(() => {
      setTaal(engels ? "en" : "nl");
      setDagen(Math.max(1, Math.ceil((EINDE_ACTIE - Date.now()) / 86_400_000)));
      setActief(true);
    });

    const gesloten = Number(localStorage.getItem(STORAGE_KEY) || 0);
    const timer =
      gesloten && Date.now() - gesloten < OPNIEUW_NA_MS ? undefined : window.setTimeout(() => setOpen(true), 2500);
    return () => {
      window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
    };
  }, [pathname, verborgen]);

  function sluit() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && sluit();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const t = TEKST[taal];

  if (!open) {
    if (!actief || verborgen) return null;
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bf-badge font-sora fixed bottom-4 left-4 z-[990] flex items-center gap-2 rounded-full bg-black py-2 pl-2 pr-4 text-sm font-black text-white shadow-2xl transition hover:scale-105"
        style={{ boxShadow: `0 0 0 2px ${GEEL}, 0 10px 30px -5px ${GEEL}80` }}
        aria-label={t.badgeLabel}
      >
        <span className="rounded-full px-2 py-0.5 text-[11px] uppercase tracking-wider text-black" style={{ background: GEEL }}>
          Black Friday
        </span>
        {t.badge}
      </button>
    );
  }
  const tapeTekst = Array.from({ length: 8 }, () => `${t.tape} ✦ BLACK FRIDAY ✦ `).join("");

  return (
    <div
      className="bf-backdrop fixed inset-0 z-[1100] flex items-end justify-center bg-black/75 p-3 backdrop-blur-md sm:items-center sm:p-6"
      onClick={sluit}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bf-titel"
        lang={taal}
        className="bf-card relative max-h-[94vh] w-full max-w-[440px] overflow-y-auto overflow-x-hidden rounded-[28px] bg-black text-white"
        style={{ boxShadow: `0 0 0 1px ${GEEL}55, 0 30px 80px -10px ${GEEL}40, 0 0 120px -30px ${GEEL}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gele gloed */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: GEEL }}
          aria-hidden
        />

        {/* Kopbalk */}
        <div className="relative flex items-center justify-between px-5 pt-5">
          <div className="flex rounded-full border border-white/15 p-0.5 text-[11px] font-black" role="group" aria-label="Taal / Language">
            {(["nl", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setTaal(l)}
                aria-pressed={taal === l}
                className="rounded-full px-3 py-1 uppercase transition"
                style={taal === l ? { background: GEEL, color: "#000" } : { color: "rgba(255,255,255,.55)" }}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={sluit}
            aria-label={taal === "nl" ? "Sluiten" : "Close"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* BLACK FRIDAY */}
        <div className="relative px-6 pt-4">
          <p
            className="font-sora select-none text-[clamp(3.1rem,15vw,4.4rem)] font-black uppercase leading-[0.85] tracking-[-0.04em]"
            aria-hidden
          >
            <span className="block" style={{ color: "transparent", WebkitTextStroke: `1.5px ${GEEL}` }}>
              Black
            </span>
            <span className="block" style={{ color: GEEL }}>
              Friday
            </span>
          </p>
          <span
            className="font-lato absolute right-6 top-6 rotate-6 rounded-md px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-black"
            style={{ background: GEEL }}
          >
            {t.dagen(dagen)}
          </span>
        </div>

        {/* Bewegende tape */}
        <div className="relative my-5 -rotate-2 scale-110 overflow-hidden py-2" style={{ background: GEEL }} aria-hidden>
          <div className="bf-marquee font-sora flex w-max whitespace-nowrap text-sm font-black tracking-wider text-black">
            <span>{tapeTekst}</span>
            <span>{tapeTekst}</span>
          </div>
        </div>

        <div className="relative px-6 pb-6">
          <h2 id="bf-titel" className="font-sora text-[28px] font-black leading-tight">
            {t.kop}
            <span style={{ color: GEEL }}>*</span>
          </h2>
          <p className="font-lato mt-1.5 text-[15px] leading-snug text-white/70">{t.sub}</p>

          {/* Prijsblokken */}
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <div className="rounded-2xl p-4 text-black" style={{ background: GEEL }}>
              <p className="font-lato text-[11px] font-black uppercase tracking-widest opacity-70">{t.website}</p>
              <p className="font-sora mt-1 text-4xl font-black leading-none">€0</p>
            </div>
            <div className="rounded-2xl border border-white/15 p-4">
              <p className="font-lato text-[11px] font-black uppercase tracking-widest text-white/50">{t.hosting}</p>
              <p className="font-sora mt-1 text-4xl font-black leading-none">€20</p>
              <p className="font-lato mt-1 text-[11px] text-white/50">{t.pm}</p>
            </div>
          </div>

          <ul className="font-lato mt-5 space-y-2 text-[14px] text-white/85">
            {t.punten.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-black"
                  style={{ background: GEEL }}
                  aria-hidden
                >
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>

          <Link
            href={OFFERTE_HREF}
            onClick={sluit}
            className="bf-cta font-sora mt-6 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl text-base font-black uppercase tracking-wide text-black transition hover:brightness-110"
            style={{ background: GEEL }}
          >
            {t.cta} <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={sluit}
            className="font-lato mt-2 w-full py-2 text-sm font-semibold text-white/45 transition hover:text-white/80"
          >
            {t.sluiten}
          </button>

          <p className="font-lato mt-3 border-t border-white/10 pt-3 text-[11px] leading-relaxed text-white/45">
            <span className="font-bold text-white/70">{t.geldig}.</span> {t.kleine}{" "}
            <Link href="/voorwaarden#black-friday" onClick={sluit} className="underline underline-offset-2 hover:text-white">
              {t.voorwaarden}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
