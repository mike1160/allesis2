import type { Metadata } from "next";
import Link from "next/link";
import BrancheCTA from "@/components/BrancheCTA";
import BrancheHero from "@/components/BrancheHero";
import FAQGrid from "@/components/FAQGrid";
import FeatureGrid from "@/components/FeatureGrid";
import JsonLd from "@/components/seo/JsonLd";
import { WPtoNextAnimation } from "@/components/WPtoNextAnimation";
import { buildServiceSchema } from "@/lib/json-ld";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Van WordPress naar Next.js | Allesis Haarlem",
  description:
    "Allesis migreert WordPress websites naar Next.js. Behoud van SEO, content en domeinnaam. Laadtijd van 5 seconden naar onder 3 seconden. Vanaf €299.",
  keywords: [
    "wordpress naar nextjs migreren",
    "wordpress migratie next.js",
    "trage wordpress site sneller maken",
    "wordpress vervangen next.js",
    "website migratie haarlem",
  ],
  alternates: pageAlternates("/wordpress-naar-nextjs"),
  openGraph: {
    title: "Van WordPress naar Next.js | Allesis",
    description:
      "Allesis migreert WordPress websites naar Next.js. Behoud van SEO, content en domeinnaam. Vanaf €299.",
    url: `${SITE_URL}/wordpress-naar-nextjs`,
    locale: "nl_NL",
    type: "website",
  },
};

const serviceSchema = buildServiceSchema({
  id: `${SITE_URL}/wordpress-naar-nextjs#service`,
  name: "WordPress naar Next.js migratie",
  description:
    "Allesis migreert WordPress websites naar Next.js. Behoud van SEO, content en domeinnaam. Laadtijd van 5 seconden naar onder 3 seconden. Vanaf €299.",
  url: `${SITE_URL}/wordpress-naar-nextjs`,
});

export default function WordpressNaarNextjsPage() {
  return (
    <main>
      <JsonLd data={serviceSchema} />
      <BrancheHero
        eyebrow="⚡ Migratie · WordPress → Next.js"
        title="Trage WordPress site?"
        titleAccent="Wij fixen het."
        description="Allesis migreert WordPress websites naar Next.js — met behoud van SEO, content en domeinnaam. Laadtijd van 5 seconden naar onder 3 seconden. Vanaf €299."
        foto="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=75"
        gradient="from-gray-900 via-gray-800/80 to-gray-700/20"
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/migratie-aanvragen"
            className="font-lato rounded-xl bg-black px-6 py-3 font-black text-white transition-colors hover:bg-gray-800"
          >
            Migratie aanvragen →
          </Link>
          <Link
            href="/gratis-website"
            className="font-lato rounded-xl bg-[#C8FF00] px-6 py-3 font-black text-gray-900"
          >
            🐾 Gratis one-pager*
          </Link>
        </div>
      </BrancheHero>

      {/* ANIMATIE SECTIE */}
      <section className="bg-white px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <WPtoNextAnimation />
          <h2 className="font-sora mt-6 mb-4 text-3xl font-black">
            Allesis regelt de migratie.
            <br />
            <span className="text-[#3B6D11]">U regelt uw bedrijf.</span>
          </h2>
          <p className="font-lato text-lg leading-relaxed text-gray-500">
            Uw bestaande content, pagina&apos;s en SEO-waarde blijven behouden. Wij bouwen uw site opnieuw op in
            Next.js — sneller, veiliger en beter vindbaar in Google én AI-assistenten.
          </p>
        </div>
      </section>

      {/* VERGELIJKING */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-sora mb-12 text-center text-3xl font-black">WordPress vs Next.js</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* WordPress kolom */}
            <div className="rounded-2xl border-2 border-[#21759B]/30 bg-white p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#21759B] text-sm font-black text-white">
                  W
                </div>
                <h3 className="font-sora text-lg font-black text-[#21759B]">WordPress</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Trage laadtijden (3-8 seconden)",
                  "Constant updates en plugins",
                  "Beveiligingslekken en hacks",
                  "Dure hosting nodig",
                  "PageSpeed score onder 60",
                  "Moeilijk te schalen",
                  "Plugin conflicten",
                ].map((text) => (
                  <li key={text} className="font-lato flex items-start gap-2 text-sm text-gray-600">
                    <span>❌</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next.js kolom */}
            <div className="rounded-2xl border-2 border-black bg-white p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-black text-white">
                  N
                </div>
                <h3 className="font-sora text-lg font-black">Next.js</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Laadt in minder dan 3 seconden",
                  "Geen plugins of updates nodig",
                  "Maximale beveiliging",
                  "Goedkope hosting via Vercel",
                  "PageSpeed score 95-100",
                  "Schaalbaar zonder beperkingen",
                  "Altijd stabiel en snel",
                ].map((text) => (
                  <li key={text} className="font-lato flex items-start gap-2 text-sm text-gray-600">
                    <span>✅</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <FeatureGrid
        titel="Wat doet Allesis tijdens de migratie?"
        gradient="from-gray-900/90 via-gray-900/50 to-transparent"
        features={[
          {
            icon: "📋",
            titel: "Content migratie",
            beschrijving: "Al uw pagina's, berichten en media worden overgezet.",
            foto: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=70",
          },
          {
            icon: "🔍",
            titel: "SEO behouden",
            beschrijving: "URL-structuur, meta tags en SEO-waarde blijven intact.",
            foto: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=70",
          },
          {
            icon: "⚡",
            titel: "Snelheidsoptimalisatie",
            beschrijving: "Laadtijd van 5 seconden naar onder de 3 seconden.",
            foto: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=70",
          },
          {
            icon: "🔒",
            titel: "AVG-compliant",
            beschrijving: "Privacybeleid, cookiebanner en SSL standaard meegenomen.",
            foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
          },
          {
            icon: "🌐",
            titel: "Domein behoud",
            beschrijving: "Uw domeinnaam blijft hetzelfde. Naadloze overgang.",
            foto: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=600&q=70",
          },
          {
            icon: "📞",
            titel: "Persoonlijke begeleiding",
            beschrijving: "Wij begeleiden u stap voor stap. Geen technische kennis nodig.",
            foto: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=70",
          },
        ]}
      />

      {/* FAQ */}
      <FAQGrid
        gradient="from-gray-900/95 via-gray-900/80 to-gray-800/60"
        items={[
          {
            vraag: "Blijft mijn SEO ranking behouden?",
            antwoord:
              "Ja. Wij zorgen voor correcte redirects, behouden URL-structuren en migreren alle meta-data. Uw Google rankings blijven intact.",
            foto: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=70",
          },
          {
            vraag: "Hoe lang duurt een migratie?",
            antwoord:
              "Een gemiddelde WordPress site migreren wij in 2-4 weken. Grote sites met veel content kunnen langer duren.",
            foto: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=70",
          },
          {
            vraag: "Wat gebeurt er met mijn plugins?",
            antwoord:
              "WordPress plugins worden vervangen door snellere, ingebouwde Next.js functionaliteiten. Geen plugin-afhankelijkheid meer.",
            foto: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=70",
          },
          {
            vraag: "Wat kost een WordPress migratie?",
            antwoord:
              "Migraties starten vanaf €299. De exacte prijs hangt af van de grootte van uw site. Vraag een vrijblijvende offerte aan.",
            foto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",
          },
        ]}
      />

      <BrancheCTA branche="wordpress-migratie" />
    </main>
  );
}
