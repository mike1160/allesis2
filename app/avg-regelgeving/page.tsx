import type { Metadata } from "next";
import Link from "next/link";
import { Gavel, ListChecks } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "AVG voor websites — wat is verplicht?",
  description:
    "Privacybeleid, cookies, formulieren en verwerkers: de AVG in begrijpelijke taal. Allesis helpt MKB in Haarlem en heel NL compliant te worden.",
  alternates: pageAlternates("/avg-regelgeving"),
  openGraph: {
    title: "AVG regelgeving | Allesis",
    description: "Checklist en ondersteuning voor uw website.",
    url: `${SITE_URL}/avg-regelgeving`,
    locale: "nl_NL",
    type: "website",
  },
};

const verplichtingen = [
  "Privacybeleid (verplicht bij elk contactformulier of analytics)",
  "Cookiebanner met expliciete toestemming",
  "Verwerkersovereenkomst met uw hostingprovider",
  "Recht op inzage, correctie en verwijdering van persoonsgegevens",
  "Beveiligde verbinding (HTTPS/SSL) verplicht",
];

const boetes = [
  "De Autoriteit Persoonsgegevens (AP) kan boetes opleggen tot €20 miljoen of 4% van de wereldwijde jaaromzet",
  "Ook kleine bedrijven en ZZP'ers zijn niet vrijgesteld",
  "In 2023 en 2024 zijn meerdere Nederlandse MKB-bedrijven beboet",
];

export default function AvgRegelgevingPage() {
  return (
    <>
      <SubpageHero
        eyebrow="AVG & compliance"
        title="AVG en uw website — wat bent u verplicht?"
        subtitle="Een duidelijk overzicht van de belangrijkste verplichtingen — en hoe wij u helpen compliant te blijven."
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl">
          <PremiumCard>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ListChecks className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">De belangrijkste AVG-verplichtingen voor websites</h2>
            <ul className="font-lato mt-6 space-y-3.5">
              {verplichtingen.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-neutral-mid">
                  <span className="font-sora shrink-0 font-bold text-primary" aria-hidden>
                    ✓
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
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
              <Gavel className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Wat zijn de boetes?</h2>
            <ul className="font-lato mt-6 space-y-3.5">
              {boetes.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-neutral-mid">
                  <span className="shrink-0 font-bold text-red-600" aria-hidden>
                    !
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-lato mt-6 text-sm text-neutral-mid">
              Meer over tarieven en risico&apos;s? Lees ook onze pagina over{" "}
              <Link href="/avg-boetes" className="font-semibold text-primary hover:underline">
                AVG-boetes
              </Link>
              .
            </p>
          </PremiumCard>
        </div>
      </Reveal>

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <PremiumCard>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Wij regelen het voor u</h2>
            <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
              Allesis levert standaard een AVG-compliant pakket bij elke nieuwe website: privacybeleid, cookiebanner, SSL en
              verwerkersovereenkomst — afgestemd op uw situatie.
            </p>
          </PremiumCard>

          <PremiumCard className="mt-8 border-2 border-primary/25 bg-neutral-light/30 !p-6 text-left">
            <p className="font-lato font-bold text-neutral-dark">Check uw eigen website direct:</p>
            <form action="/avg-check" method="get" className="mt-4 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="avg-reg-domein" className="sr-only">
                Domeinnaam
              </label>
              <input
                id="avg-reg-domein"
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

          <Link
            href="/contact"
            className="font-lato mt-10 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-dark"
          >
            Laat uw huidige website AVG-keuren →
          </Link>
        </div>
      </Reveal>
    </>
  );
}
