import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import FeatureGrid from "@/components/FeatureGrid";
import FaqSection from "@/components/seo/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { WEBDESIGN_FAQ } from "@/lib/faq-data";
import { buildFaqPageSchema, buildServiceSchema } from "@/lib/json-ld";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Webdesign Haarlem — nieuwe website laten maken",
  description:
    "Professioneel webdesign voor het MKB: snel, responsive, SEO en AVG-proof. Next.js-kwaliteit, persoonlijke begeleiding. Offerte aanvragen.",
  alternates: pageAlternates("/webdesign"),
  openGraph: {
    title: "Webdesign & nieuwe website | Allesis",
    description: "Moderne websites voor ondernemers — SEO, AVG en hosting onder één dak.",
    url: `${SITE_URL}/webdesign`,
    locale: "nl_NL",
    type: "website",
  },
};

const watKrijgJeFeatures = [
  {
    icon: "🎨",
    titel: "Professioneel design op maat",
    beschrijving: "Geen templates. Elk ontwerp is uniek en afgestemd op uw merk.",
    foto: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=70",
  },
  {
    icon: "📱",
    titel: "Mobielvriendelijk",
    beschrijving: "Perfect op telefoon, tablet én desktop. Altijd.",
    foto: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=70",
  },
  {
    icon: "🔍",
    titel: "SEO vanaf dag één",
    beschrijving: "Gevonden worden in Google vanaf het moment van lancering.",
    foto: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=70",
  },
  {
    icon: "🔒",
    titel: "AVG-compliant",
    beschrijving: "Privacybeleid, cookiebanner en verwerkersregister standaard inbegrepen.",
    foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
  },
  {
    icon: "⚡",
    titel: "Razendsnel",
    beschrijving: "Next.js geeft PageSpeed scores boven de 95. Geen trage laadtijden.",
    foto: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=70",
  },
  {
    icon: "🛠️",
    titel: "Helpdesk & onderhoud",
    beschrijving: "Na oplevering staan wij klaar voor updates, vragen en kleine aanpassingen.",
    foto: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=70",
  },
];

const serviceSchema = buildServiceSchema({
  id: `${SITE_URL}/webdesign#service`,
  name: "Webdesign & nieuwe website",
  description:
    "Professioneel webdesign voor het MKB in Haarlem: responsive websites met SEO-basis en AVG-compliance.",
  url: `${SITE_URL}/webdesign`,
});

export default function WebdesignPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, buildFaqPageSchema(WEBDESIGN_FAQ)]} />

      <SubpageHero
        eyebrow="Webdesign Haarlem"
        title="Nieuwe website laten maken?"
        subtitle="Allesis bouwt snelle, moderne websites voor het MKB — inclusief SEO, hosting en AVG-compliant privacybeleid."
      />

      <FeatureGrid
        titel="Wat krijgt u bij Allesis?"
        gradient="from-blue-900/90 via-blue-900/50 to-transparent"
        features={watKrijgJeFeatures}
      />

      <Reveal className="bg-neutral-light/50 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <PremiumCard>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <p className="font-lato text-xs font-bold uppercase tracking-[0.12em] text-primary">Laatste project</p>
            <h2 className="font-sora mt-2 text-2xl font-bold text-neutral-dark md:text-[1.65rem]">
              Ren Ji Tang — acupunctuur &apos;s-Hertogenbosch
            </h2>
            <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
              Allesis.nl heeft <strong className="text-neutral-dark">renjitang.nl</strong> gebouwd: een moderne Next.js-website voor een
              acupunctuurpraktijk in &apos;s-Hertogenbosch. Met online boekingsmodule, integratie van Google-reviews, uitgebreide
              behandelingspagina&apos;s en volledige AVG-compliance. Resultaat:{" "}
              <strong className="text-neutral-dark">5 sterren op Google</strong>, volledig mobielvriendelijk en snel ladend.
            </p>
            <Link
              href="https://www.renjitang.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-lato mt-6 inline-block font-bold text-primary hover:underline"
            >
              Bekijk renjitang.nl live →
            </Link>
            <div className="mt-8 border-t border-neutral-light pt-8 text-center">
              <Link
                href="/contact"
                className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-dark"
              >
                Vraag een vrijblijvende offerte aan →
              </Link>
            </div>
          </PremiumCard>
        </div>
      </Reveal>

      <FaqSection items={WEBDESIGN_FAQ} id="webdesign-faq" />
    </>
  );
}
