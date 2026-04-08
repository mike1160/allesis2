import type { Metadata } from "next";
import Link from "next/link";
import { Euro, LineChart, Search } from "lucide-react";
import CheckMarkList from "@/components/subpage/CheckMarkList";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "SEO & vindbaarheid in Google en AI-zoekopdrachten",
  description:
    "SEO bureau Haarlem: technische SEO, content en lokale vindbaarheid. Allesis helpt MKB beter gevonden te worden in Google én AI-assistenten. Vraag een vrijblijvend gesprek aan.",
  alternates: pageAlternates("/seo"),
  openGraph: {
    title: "SEO & vindbaarheid | Allesis Haarlem",
    description:
      "Lokale en nationale SEO voor het MKB — van techniek tot content. Ook toekomstbestendig voor AI-overzichten.",
    url: `${SITE_URL}/seo`,
    locale: "nl_NL",
    type: "website",
  },
};

const checks = [
  "Technische basis: snelheid, Core Web Vitals, indexeerbaarheid",
  "Zoekwoordenonderzoek afgestemd op uw diensten en regio",
  "On-page SEO: titels, structuur, interne links",
  "Lokale SEO: Google Bedrijfsprofiel, NAP-consistentie",
  "Meetplan met Search Console en heldere KPI’s",
  "Richtlijnen voor content die ook door AI-systemen wordt begrepen",
];

export default function SeoPage() {
  return (
    <>
      <SubpageHero
        eyebrow="SEO Haarlem"
        title="SEO die écht iets oplevert"
        subtitle={
          <>
            <p className="text-white/75">
              Geen trucjes, maar een solide strategie: uw site snel, duidelijk voor bezoekers én goed vindbaar — lokaal en landelijk.
            </p>
            <p lang="en" className="mt-4 text-base leading-relaxed text-white/55">
              Search engine optimization that connects your services with the right customers — locally and nationally.
            </p>
          </>
        }
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:items-start">
          <PremiumCard>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Search className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Wat we voor u doen</h2>
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Uw site moet snel zijn, duidelijk voor bezoekers én begrijpelijk voor zoekmachines (en steeds vaker voor AI-antwoorden). Wij
              werken vanuit Haarlem voor bedrijven in heel Nederland.
            </p>
            <CheckMarkList items={checks} />
          </PremiumCard>

          <PremiumCard>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Euro className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Prijzen</h2>
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              SEO is maatwerk. Wij bieden maandelijkse trajecten op basis van uw markt en concurrentie. Concrete prijs na korte intake.
            </p>
            <p lang="en" className="font-lato mt-4 text-sm leading-relaxed text-neutral-mid/90">
              Monthly SEO retainers — tailored after a short intake. We align scope with your market and competition.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-neutral-light/80 p-4">
              <LineChart className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
              <p className="font-lato text-sm text-neutral-mid">
                Maandelijkse SEO-trajecten op maat — concrete prijs na korte intake.
              </p>
            </div>
            <Link
              href="/contact#offerte"
              className="font-lato mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-dark sm:w-auto"
            >
              Offerte aanvragen
            </Link>
          </PremiumCard>
        </div>
      </Reveal>
    </>
  );
}
