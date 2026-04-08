import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Anchor, FileText, Globe, Mic, PenLine, Subtitles } from "lucide-react";
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

const diensten = [
  {
    icon: Mic,
    titel: "Tolkdiensten voor bedrijven",
    tekst: "Zakelijke bijeenkomsten, seminars, persoonlijk gesprek, trainingen en offshore safety. Wij leveren naar internationale standaard.",
  },
  {
    icon: FileText,
    titel: "Documentvertaling",
    tekst: "Zakelijke documenten, huwelijkse voorwaarden, arbeidsovereenkomst, commerciële flyers, menu's en meer. Thais–Nederlands–Engels.",
  },
  {
    icon: Subtitles,
    titel: "Ondertiteling & Transcriptie",
    tekst: "Ondertiteling voor Nederlandse televisie en video content. Transcriptie van audio- en videomateriaal.",
  },
  {
    icon: Anchor,
    titel: "Offshore & Technisch",
    tekst: "Specialist als tolk bij BOSIET en andere offshore safety trainingen. Ervaring met technische en maritieme terminologie.",
  },
  {
    icon: PenLine,
    titel: "Officiële documenten",
    tekst: "Persoonlijke en officiële documenten: financiën, boekhouding, juridische stukken. In HTML, MS Word, Excel en PDF.",
  },
  {
    icon: Globe,
    titel: "Wereldwijd",
    tekst: "Gevestigd in Haarlem maar actief in Nederland en internationaal. Native speakers in de doeltaal voor elk project.",
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
              className="font-lato mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-10 text-base font-bold text-primary transition hover:bg-neutral-light"
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

      <Reveal className="bg-neutral-light/50 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-sora text-center text-2xl font-bold text-neutral-dark md:text-3xl">Onze vertaal- en tolkdiensten</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diensten.map((d) => (
              <PremiumCard key={d.titel}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <d.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="font-sora text-base font-bold text-neutral-dark">{d.titel}</h3>
                <p className="font-lato mt-2 text-sm leading-relaxed text-neutral-mid">{d.tekst}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </Reveal>

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
