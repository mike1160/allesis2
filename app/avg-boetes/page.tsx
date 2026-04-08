import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Shield } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "AVG-boetes — risico’s voor ondernemers",
  description:
    "Wat u riskeert bij AVG-overtredingen en hoe u uw site compliant maakt. Allesis: scan, beleid en techniek — vanaf €69,99 ex btw.",
  alternates: pageAlternates("/avg-boetes"),
  openGraph: {
    title: "AVG boetes | Allesis",
    description: "Inzicht in handhaving en stappen naar compliance.",
    url: `${SITE_URL}/avg-boetes`,
    locale: "nl_NL",
    type: "website",
  },
};

const bedragen = [
  "Lichte overtredingen: tot €10 miljoen of 2% jaaromzet",
  "Zware overtredingen: tot €20 miljoen of 4% jaaromzet",
  "Informele handhaving (waarschuwing, last onder dwangsom) is ook mogelijk",
];

const overtredingen = [
  "Geen of onvolledig privacybeleid",
  "Cookiebanner die geen echte keuze biedt",
  "Google Analytics zonder correcte configuratie",
  "Contactformulieren zonder vermelding van gegevensverwerking",
];

const voorkomen = [
  "Laat uw website controleren op AVG-compliance",
  "Allesis levert bij elke nieuwe website een volledig compliant pakket",
];

export default function AvgBoetesPage() {
  return (
    <>
      <SubpageHero
        eyebrow="AVG-handhaving"
        title="AVG-boetes: wat riskeert u als ondernemer?"
        subtitle="Inzicht in maxima, veelgemaakte fouten op websites en hoe u risico beperkt."
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl">
          <PremiumCard>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
              <AlertTriangle className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Hoeveel kan een AVG-boete bedragen?</h2>
            <ul className="font-lato mt-6 space-y-3.5 text-neutral-mid">
              {bedragen.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="shrink-0 font-bold text-red-600" aria-hidden>
                    €
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PremiumCard>
        </div>
      </Reveal>

      <Reveal className="bg-neutral-light/50 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl">
          <PremiumCard>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Meest voorkomende overtredingen op websites</h2>
            <ul className="font-lato mt-6 space-y-3.5">
              {overtredingen.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-neutral-mid">
                  <span className="font-sora shrink-0 font-bold text-primary" aria-hidden>
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PremiumCard>
        </div>
      </Reveal>

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl">
          <PremiumCard>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Hoe voorkomt u een boete?</h2>
            <ul className="font-lato mt-6 space-y-3.5 text-neutral-mid">
              {voorkomen.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="font-sora shrink-0 font-bold text-primary" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-lato mt-6 text-sm text-neutral-mid">
              Zie ook:{" "}
              <Link href="/avg-regelgeving" className="font-semibold text-primary hover:underline">
                AVG-regelgeving voor websites
              </Link>
              .
            </p>
          </PremiumCard>

          <PremiumCard className="mt-8 border-2 border-primary/25 bg-neutral-light/30 !p-6">
            <p className="font-lato font-bold text-neutral-dark">Check uw eigen website direct:</p>
            <form action="/avg-check" method="get" className="mt-4 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="avg-boetes-domein" className="sr-only">
                Domeinnaam
              </label>
              <input
                id="avg-boetes-domein"
                name="domein"
                type="text"
                placeholder="uwbedrijf.nl"
                className="font-lato min-h-[48px] flex-1 rounded-xl border border-neutral-light bg-white px-4 text-neutral-dark outline-none ring-primary/20 focus:ring-2"
              />
              <button
                type="submit"
                className="font-lato min-h-[48px] shrink-0 rounded-xl bg-primary px-6 font-bold text-white transition hover:bg-primary-dark"
              >
                Check gratis →
              </button>
            </form>
          </PremiumCard>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-dark"
            >
              Vraag een AVG-check aan →
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
