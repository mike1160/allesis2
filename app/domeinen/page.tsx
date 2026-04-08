import type { Metadata } from "next";
import DomainChecker from "@/components/DomainChecker";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal, RevealItem, RevealStagger } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Domeinnaam checken — .nl .com .eu en meer",
  description:
    "Controleer live beschikbaarheid van uw domein (.nl, .com, .net, .eu, .org, .be). Registratie en begeleiding via Allesis Haarlem.",
  alternates: pageAlternates("/domeinen"),
  openGraph: {
    title: "Domeinen | Allesis",
    description: "Domeincheck en registratie — meerdere extensies tegelijk.",
    url: `${SITE_URL}/domeinen`,
    locale: "nl_NL",
    type: "website",
  },
};

const extensies = [
  { ext: ".nl", prijs: "€ 9,95/jr", omschrijving: "Nederlandstalig publiek" },
  { ext: ".com", prijs: "€ 12,95/jr", omschrijving: "Internationaal bereik" },
  { ext: ".net", prijs: "€ 13,95/jr", omschrijving: "Tech & netwerken" },
  { ext: ".eu", prijs: "€ 8,95/jr", omschrijving: "Europees bereik" },
  { ext: ".org", prijs: "€ 13,95/jr", omschrijving: "Non-profit & organisaties" },
  { ext: ".be", prijs: "€ 9,95/jr", omschrijving: "Belgisch publiek" },
];

export default function DomeinenPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Domeinnamen"
        title="Is uw domeinnaam nog vrij?"
        subtitle="Controleer direct de beschikbaarheid van .nl, .com, .net, .eu, .org en .be tegelijk."
      >
        <div className="mx-auto mt-10 max-w-xl">
          <DomainChecker forDarkBackground />
        </div>
      </SubpageHero>

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <h2 className="font-sora mx-auto mb-10 max-w-4xl text-center text-2xl font-bold text-neutral-dark md:text-3xl">
          Populaire extensies & prijzen
        </h2>
        <RevealStagger className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {extensies.map((d) => (
            <RevealItem key={d.ext}>
              <PremiumCard className="!p-5 text-center">
                <div className="font-sora text-xl font-bold text-primary">{d.ext}</div>
                <div className="font-sora mt-2 text-base font-bold text-neutral-dark">{d.prijs}</div>
                <div className="font-lato mt-2 text-xs text-neutral-mid">{d.omschrijving}</div>
              </PremiumCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </Reveal>
    </>
  );
}
