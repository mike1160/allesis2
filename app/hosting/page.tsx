import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import HostingOrderForm from "@/components/HostingOrderForm";
import FaqSection from "@/components/seo/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { HOSTING_FAQ } from "@/lib/faq-data";
import { HOSTING_PAKKETTEN } from "@/lib/hosting-pakketten";
import { buildFaqPageSchema, buildServiceSchema } from "@/lib/json-ld";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Hosting vanaf €17,50 p/m — Zorgeloos €20 incl. e-mail & SSL",
  description:
    "Hosting voor het MKB: Basis €17,50, Zorgeloos €20 (incl. aparte mailhosting, SSL, dagelijkse back-ups en helpdesk) of Pro €35 per maand ex btw. Allesis Haarlem.",
  alternates: pageAlternates("/hosting"),
  openGraph: {
    title: "Webhosting pakketten | Allesis",
    description: "Website, aparte mailhosting en SSL in één vast pakket: €20 per maand ex btw.",
    url: `${SITE_URL}/hosting`,
    locale: "nl_NL",
    type: "website",
  },
};

const serviceSchema = buildServiceSchema({
  id: `${SITE_URL}/hosting#service`,
  name: "Webhosting",
  description: "Zorgeloze hosting voor het MKB: website, aparte mailhosting, SSL, back-ups en helpdesk voor €20 per maand ex btw.",
  url: `${SITE_URL}/hosting`,
});

export default function HostingPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, buildFaqPageSchema(HOSTING_FAQ)]} />

      <SubpageHero
        eyebrow="Hosting"
        title="Zorgeloos online"
        subtitle="Website, e-mail en beveiliging in één vast pakket. Wij regelen de techniek, u doet zaken."
        backgroundImage="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg"
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-lato text-xs font-bold uppercase tracking-[0.16em] text-primary">Kies uw pakket</p>
            <h2 className="font-sora mt-3 text-3xl font-extrabold leading-tight text-neutral-dark md:text-4xl">
              Eén vaste prijs. Geen verrassingen.
            </h2>
            <p className="font-lato mt-3 text-neutral-mid">
              Alle prijzen per maand, exclusief btw. Overstappen is gratis: wij verhuizen uw website en e-mail.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-center gap-6 lg:grid-cols-3">
            {HOSTING_PAKKETTEN.map((p) => {
              const top = p.aanbevolen;
              return (
                <div
                  key={p.id}
                  className={
                    top
                      ? "relative order-first rounded-3xl bg-neutral-dark p-8 text-white shadow-2xl ring-4 ring-accent lg:order-none lg:scale-105 lg:py-10"
                      : "rounded-3xl border border-gray-200 bg-white p-7 text-neutral-dark"
                  }
                >
                  {top && (
                    <span className="font-lato absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-xs font-black uppercase tracking-wider text-neutral-dark shadow">
                      ★ Beste keuze
                    </span>
                  )}
                  <p className={`font-sora text-lg font-bold ${top ? "text-accent" : ""}`}>{p.naam}</p>
                  <p className={`font-lato mt-1 text-sm ${top ? "text-white/70" : "text-neutral-mid"}`}>{p.tagline}</p>
                  <p className="mt-6 flex items-end gap-1">
                    <span className={`font-sora font-black leading-none ${top ? "text-6xl" : "text-5xl"}`}>€{p.prijsTekst}</span>
                    <span className={`font-lato pb-1 text-sm ${top ? "text-white/60" : "text-neutral-mid"}`}>/ mnd</span>
                  </p>
                  <p className={`font-lato mt-1 text-xs ${top ? "text-white/50" : "text-gray-400"}`}>exclusief btw</p>
                  {top && (
                    <p className="font-lato mt-4 rounded-xl bg-white/10 px-3 py-2 text-sm text-white/90">
                      Maar <strong className="text-accent">€2,50 meer</strong> dan Basis, mét zakelijke e-mail, dagelijkse
                      back-ups en een persoonlijke helpdesk.
                    </p>
                  )}
                  <ul className="mt-6 space-y-3">
                    {p.kenmerken.map((k) => (
                      <li
                        key={k.tekst}
                        className={`font-lato flex items-start gap-2.5 text-sm ${
                          k.inbegrepen ? "" : top ? "text-white/35 line-through" : "text-gray-400 line-through"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                            k.inbegrepen
                              ? top
                                ? "bg-accent text-neutral-dark"
                                : "bg-primary text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                          aria-hidden
                        >
                          {k.inbegrepen ? "✓" : "–"}
                        </span>
                        <span>
                          <span className="sr-only">{k.inbegrepen ? "Inbegrepen: " : "Niet inbegrepen: "}</span>
                          {k.tekst}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/hosting?pakket=${p.id}#hosting-bestellen`}
                    className={`font-lato mt-8 flex min-h-[48px] items-center justify-center rounded-xl px-6 font-bold transition ${
                      top
                        ? "bg-accent text-neutral-dark hover:brightness-95"
                        : "border border-gray-300 text-neutral-dark hover:border-primary hover:text-primary"
                    }`}
                  >
                    {top ? "Kies Zorgeloos →" : `Kies ${p.naam}`}
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="font-lato mx-auto mt-10 max-w-2xl text-center text-sm text-neutral-mid">
            Wat kost een los e-mailpakket elders? Al snel €5 tot €10 per maand. Bij Zorgeloos zit het er voor €2,50 extra
            gewoon bij. Minimale looptijd 1 jaar, daarna jaarlijks opzegbaar.{" "}
            <Link href="/voorwaarden" className="underline">
              Voorwaarden
            </Link>
          </p>
        </div>

        <Suspense
          fallback={
            <p className="font-lato mt-12 text-center text-neutral-mid">Formulier laden…</p>
          }
        >
          <HostingOrderForm />
        </Suspense>
      </Reveal>

      <FaqSection items={HOSTING_FAQ} id="hosting-faq" />
    </>
  );
}
