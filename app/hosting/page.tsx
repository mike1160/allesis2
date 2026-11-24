import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import HostingOrderForm from "@/components/HostingOrderForm";
import FaqSection from "@/components/seo/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { HOSTING_FAQ } from "@/lib/faq-data";
import { buildFaqPageSchema, buildServiceSchema } from "@/lib/json-ld";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Zorgeloze hosting — €20 p/m incl. e-mail & SSL",
  description:
    "Zorgeloze hosting voor het MKB: €20 per maand ex btw, inclusief aparte mailhosting, SSL, back-ups en persoonlijke helpdesk. Allesis Haarlem.",
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
  const inbegrepen = [
    { titel: "Snelle websitehosting", tekst: "Uw website razendsnel online, ook op mobiel." },
    { titel: "Aparte mailhosting", tekst: "Zakelijke e-mail op uw eigen domein, los van uw website. Ligt de site even plat, dan werkt uw mail gewoon door." },
    { titel: "SSL-certificaat", tekst: "Het slotje in de browser, automatisch verlengd. U hoeft er nooit meer aan te denken." },
    { titel: "Dagelijkse back-ups", tekst: "Gaat er iets mis, dan zetten wij het terug." },
    { titel: "Beveiliging & updates", tekst: "Geen PHP, geen plug-ins: minder lekken en geen update-stress." },
    { titel: "Persoonlijke helpdesk", tekst: "Eén vast aanspreekpunt dat uw site kent. Geen ticketnummers." },
  ];

  return (
    <>
      <JsonLd data={[serviceSchema, buildFaqPageSchema(HOSTING_FAQ)]} />

      <SubpageHero
        eyebrow="Hosting"
        title="Zorgeloos online"
        subtitle="Website, e-mail en beveiliging in één vast pakket van €20 per maand. Wij regelen de techniek, u doet zaken."
        backgroundImage="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg"
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-neutral-dark text-white shadow-2xl md:grid md:grid-cols-[1fr_1.35fr]">
            <div className="flex flex-col justify-between gap-8 bg-primary p-8 md:p-10">
              <div>
                <p className="font-lato text-xs font-bold uppercase tracking-[0.16em] text-white/70">Allesis Zorgeloos</p>
                <h2 className="font-sora mt-3 text-3xl font-extrabold leading-tight">Eén prijs. Alles geregeld.</h2>
                <p className="font-lato mt-4 text-white/85">
                  Website, e-mail en beveiliging in één vast pakket. U hoeft nergens meer naar om te kijken.
                </p>
              </div>
              <div>
                <p className="font-sora text-6xl font-black leading-none">€20</p>
                <p className="font-lato mt-2 text-sm text-white/75">per maand · exclusief btw</p>
                <Link
                  href="/hosting?pakket=Zorgeloos#hosting-bestellen"
                  className="font-lato mt-6 flex min-h-[48px] items-center justify-center rounded-xl bg-white px-6 font-bold text-primary transition hover:bg-neutral-light"
                >
                  Zorgeloos overstappen →
                </Link>
                <p className="font-lato mt-3 text-xs text-white/60">Wij verhuizen uw website en e-mail kosteloos.</p>
              </div>
            </div>
            <ul className="grid gap-6 p-8 sm:grid-cols-2 md:p-10">
              {inbegrepen.map((i) => (
                <li key={i.titel}>
                  <p className="font-sora flex items-center gap-2 font-bold">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs" aria-hidden>
                      ✓
                    </span>
                    {i.titel}
                  </p>
                  <p className="font-lato mt-1.5 text-sm leading-relaxed text-white/70">{i.tekst}</p>
                </li>
              ))}
            </ul>
          </div>
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
