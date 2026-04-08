import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Home, Sparkles } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Zakelijke dienstverlening — Allesis",
  description:
    "Zakelijke dienstverlening voor MKB en particulieren: web, hosting en aanverwante digitale ondersteuning. Regio Haarlem, Amsterdam en verder.",
  alternates: pageAlternates("/dienstverlening"),
  openGraph: {
    title: "Dienstverlening | Allesis",
    description: "Digitale diensten voor ondernemers.",
    url: `${SITE_URL}/dienstverlening`,
    locale: "nl_NL",
    type: "website",
  },
};

const cards = [
  {
    icon: Home,
    titel: "Schoonmaak",
    tekst: "Professionele schoonmaakdiensten voor bedrijven en particulieren.",
  },
  {
    icon: Briefcase,
    titel: "Ontruiming",
    tekst: "Snelle en betrouwbare woning- en bedrijfsontruiming.",
  },
  {
    icon: Sparkles,
    titel: "ZZP Inhuur",
    tekst: "Flexibele inzet van vakmensen voor klussen en projecten.",
  },
];

export default function DienstverleningPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Dienstverlening"
        title="Bedrijfsdienstverlening"
        subtitle="Naast web en vertalingen bieden wij ook diverse zakelijke diensten voor het MKB en particulieren in Amsterdam en omgeving."
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {cards.map((d) => (
            <PremiumCard key={d.titel}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <d.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </div>
              <h2 className="font-sora text-xl font-bold text-neutral-dark">{d.titel}</h2>
              <p className="font-lato mt-3 text-sm leading-relaxed text-neutral-mid">{d.tekst}</p>
            </PremiumCard>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <PremiumCard>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Meer weten?</h2>
            <p className="font-lato mt-3 text-neutral-mid">Neem contact op voor een vrijblijvend gesprek over wat wij voor u kunnen betekenen.</p>
            <Link
              href="/contact"
              className="font-lato mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-dark"
            >
              Contact opnemen →
            </Link>
          </PremiumCard>
        </div>
      </Reveal>
    </>
  );
}
