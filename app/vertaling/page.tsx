import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FeatureGrid from "@/components/FeatureGrid";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Thais · Nederlands · Engels — vertaling & tolk",
  description:
    "Vertaal- en tolkdiensten Thai ↔ Nederlands ↔ Engels. Zakelijke en persoonlijke opdrachten. Ook BOSIET/offshore-tolken. Haarlem, landelijk en internationaal.",
  alternates: pageAlternates("/vertaling"),
  openGraph: {
    title: "Vertaling & tolkdiensten | Allesis",
    description: "Professionele Thai–Dutch–English translation and interpretation.",
    url: `${SITE_URL}/vertaling`,
    locale: "nl_NL",
    alternateLocale: ["en_US", "th_TH"],
    type: "website",
  },
};

const thaiFeatures = [
  {
    icon: "🌐",
    titel: "Websites voor Thaise ondernemers",
    beschrijving:
      "Restaurants, wellness, retail en ZZP: snelle sites in Thai, Nederlands én Engels — met oog voor cultuur en conversie.",
    foto: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
  },
  {
    icon: "🗣️",
    titel: "Vertaal- en tolkdiensten",
    beschrijving: "Documenten, websites, vergaderingen en persoonlijke trajecten — Thai ↔ Nederlands ↔ Engels.",
    foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    icon: "⭐",
    titel: "Waarom Allesis?",
    beschrijving:
      "Lokaal in Haarlem, persoonlijk contact, technische kwaliteit en AVG-bewuste oplevering. Wij begrijpen beide culturen.",
    foto: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    icon: "🇹🇭",
    titel: "Thai webdesign",
    beschrijving:
      "Snelle websites met ondersteuning voor Thai, Nederlands én Engels — afgestemd op uw doelgroep.",
    foto: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
  },
  {
    icon: "📄",
    titel: "Documentvertaling",
    beschrijving: "Officiële documenten, contracten, certificaten — professioneel vertaald Thai ↔ NL ↔ EN.",
    foto: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  },
  {
    icon: "🤝",
    titel: "Culturele brugfunctie",
    beschrijving:
      "Meer dan vertalen — wij begrijpen de nuances van beide culturen en communiceren dat in uw website.",
    foto: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80",
  },
];

const fotos = [
  { src: "/tolk-bosiet-1.png", titel: "Thais-Ned-Eng Tolk bij offshore survival training BOSIET", locatie: "Falck Safety, Den Oever" },
  { src: "/tolk-bosiet-2.png", titel: "Thais-Ned Tolk bij offshore training BOSIET", locatie: "STC-SAIO, Rotterdam" },
  { src: "/tolk-bosiet-3.png", titel: "Thais-Ned-Engels Tolk bij Safety training", locatie: "Falck Safety / Maasvlakte" },
];

export default function VertaaldPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Vertaling & Tolk"
        title="Thais · Nederlands · Engels"
        subtitle={
          <>
            <p>
              Allesis biedt vertaal- en tolkdiensten voor Thaise, Nederlandse en Engelse diensten voor bedrijven en particulieren in
              Nederland en wereldwijd. Of u nu een multinational vertegenwoordigt of een particulier bent — wij helpen u graag.
            </p>
            <p className="mt-4">
              Allesis vertaalbureau is gevestigd in Haarlem, Nederland. Onze tolkdiensten kunnen u helpen ongeacht waar u zich bevindt.
            </p>
            <Link
              href="/contact"
              className="font-lato mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-10 text-base font-bold text-white transition hover:bg-primary-dark"
            >
              Offerte aanvragen →
            </Link>
          </>
        }
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-lato text-xs font-bold uppercase tracking-[0.1em] text-primary">Specialisme</p>
          <h2 className="font-sora mt-3 text-2xl font-bold text-neutral-dark md:text-3xl">
            Interpreter — Thai · Dutch · English
            <span className="text-primary"> · Offshore Safety Training (BOSIET)</span>
          </h2>
          <p className="font-lato mt-4 max-w-3xl leading-relaxed text-neutral-mid">
            Specialist als tolk bij Basic Offshore Safety Induction and Emergency Training (BOSIET). Wij leveren persoonlijkheden vol
            vertrouwen met het vermogen gedachten duidelijk en beknopt in beide talen te uiten — naar internationale standaard.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fotos.map((foto) => (
              <PremiumCard key={foto.src} className="!p-0 overflow-hidden">
                <div className="relative aspect-[5/3] w-full bg-neutral-light">
                  <Image src={foto.src} alt={foto.titel} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="bg-neutral-light/60 p-4">
                  <p className="font-lato text-sm font-bold text-neutral-dark">— {foto.titel}</p>
                  <p className="font-lato mt-1 text-xs text-neutral-mid">- {foto.locatie}</p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </Reveal>

      <FeatureGrid
        titel="Wat bieden wij aan?"
        gradient="from-red-900/90 via-red-900/50 to-transparent"
        features={thaiFeatures}
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <PremiumCard>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Ervaring & kwaliteit</h2>
            <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
              Allesis heeft jarenlange ervaring en hoge kwaliteit in vertalingen voor redelijke prijzen. Dat is waarom wij het vertrouwen
              genieten van zowel binnenlandse als internationale klanten uit de particuliere en bedrijfssectoren.
            </p>
            <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
              Met een team van native speakers bieden wij vertaaldiensten met behulp van een schat aan woordenboeken en naslagwerken. Onze
              vertalers en tolken zijn native speaker in de doeltaal en ervaren in het onderwerp van uw project. Onze vertaaldienst accepteert
              originele documenten in papiervorm of als elektronisch bestand: HTML, MS Word, MS Excel en PDF.
            </p>
            <Link
              href="/contact"
              className="font-lato mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-dark"
            >
              Neem contact op →
            </Link>
          </PremiumCard>
        </div>
      </Reveal>
    </>
  );
}
