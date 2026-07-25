import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

const HERO_IMG = "/images/nene-royal-hero.jpg";
const ACCENT = "#3B6D11";

const h2Style = {
  color: ACCENT,
  fontSize: 26,
  marginTop: 56,
  marginBottom: 16,
  borderBottom: "2px solid #EAF3DE",
  paddingBottom: 8,
} as const;

export const metadata: Metadata = {
  title: "Nene Royal — Thaise rockster | Website voor muzikanten | Allesis",
  description:
    "Nene Royal live @ Naka Market Phuket. Hoe een sterke website een artiest internationaal vindbaar maakt. Allesis bouwt websites voor muzikanten en artiesten.",
  keywords: [
    "Nene Royal",
    "Nene Royal website",
    "NeneRoyal",
    "Naka Market Phuket",
    "NakaMarket",
    "live muziek Phuket",
    "Thaise rockster",
    "Thai rock singer",
    "website muzikant",
    "website artiest",
    "website band",
    "muziek website laten maken",
    "concert Phuket",
    "Phuket live music",
    "Thailand rockster",
    "website laten maken muzikant",
    "artiest website Nederland",
  ],
  alternates: pageAlternates("/muziek"),
  openGraph: {
    title: "Nene Royal — de Thaise rockster die de wereld verovert",
    description:
      "Live @ Naka Market Phuket. Hoe online aanwezigheid een artiest internationaal vindbaar maakt.",
    url: `${SITE_URL}/muziek`,
    locale: "nl_NL",
    type: "article",
    images: [{ url: `${SITE_URL}/nene-royal-hero.jpg` }],
  },
};

const FEATURES = [
  "Professionele biografie en perskit pagina",
  "Concertagenda met automatische updates",
  "Embedded YouTube en Spotify speler",
  "Presskit downloadpagina voor boekingsbureaus",
  "Meertalig: Nederlands, Engels én Thai",
  "AVG-compliant contactformulier voor boekingen",
  "AI-vindbaar: gevonden in ChatGPT en Perplexity",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nene Royal — de Thaise rockster die de wereld verovert",
  description:
    "Hoe een sterke online aanwezigheid een artiest internationaal vindbaar maakt",
  image: `${SITE_URL}/nene-royal-hero.jpg`,
  author: {
    "@type": "Organization",
    name: "Allesis",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Allesis",
    url: SITE_URL,
  },
  datePublished: "2026-07-25",
  about: {
    "@type": "MusicEvent",
    name: "Nene Royal Live @ Naka Market",
    location: {
      "@type": "Place",
      name: "Naka Market Phuket",
      address: "Phuket, Thailand",
    },
    performer: {
      "@type": "MusicGroup",
      name: "Nene Royal",
    },
    startDate: "2026-07-18",
  },
};

export default function MuziekPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-28 md:min-h-[75vh] md:px-16 md:pt-36">
        <Image
          src={HERO_IMG}
          alt="Nene Royal live op het podium"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.50)" }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-[760px] text-center md:text-left">
          <p className="font-lato mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
            MUZIEK · CASE STUDY
          </p>
          <h1 className="font-sora mb-6 text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            Nene Royal — de Thaise rockster die de wereld verovert
          </h1>
          <p className="font-lato mx-auto max-w-2xl text-lg leading-relaxed text-white/90 md:mx-0 md:text-xl">
            Hoe een sterke online aanwezigheid een artiest internationaal vindbaar maakt
          </p>
        </div>
      </section>

      {/* ARTIKEL */}
      <article className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[780px]">
          <section>
            <h2
              className="font-sora font-bold tracking-tight"
              style={{ ...h2Style, marginTop: 0 }}
            >
              Wie is Nene Royal?
            </h2>
            <p
              className="font-lato text-[18px] leading-[1.8] text-neutral-700"
              style={{ marginBottom: 24 }}
            >
              Nene Royal is een Thaise rockzangeres die furore maakt op de livescene in Thailand.
              Haar optredens op de iconische Naka Market in Phuket trekken fans van over de hele
              wereld. Met haar krachtige stem en rauwe energie heeft ze een reputatie opgebouwd als
              één van de meest indrukwekkende liveartiesten van Thailand. Fans maakten zelfs een
              bord met de tekst &ldquo;WITH NENE — ROCK IS REBORN&rdquo; — een bewijs van de impact
              die ze heeft op haar publiek.
            </p>

            <blockquote
              className="font-sora"
              style={{
                borderLeft: "4px solid #3B6D11",
                paddingLeft: 24,
                fontSize: 22,
                fontStyle: "italic",
                color: ACCENT,
                margin: "40px 0",
              }}
            >
              <p className="m-0 leading-snug">&ldquo;WITH NENE — ROCK IS REBORN&rdquo;</p>
              <footer
                className="font-lato mt-3 not-italic"
                style={{ fontSize: 15, color: "#5a6b4a" }}
              >
                — Fans bij Naka Market Phuket, 18 juli 2026
              </footer>
            </blockquote>

            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: 12,
                margin: "24px 0 0",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/9LDEYSnRl6M"
                title="Nene Royal Live Naka Market Phuket"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p
              className="font-lato"
              style={{
                fontSize: 13,
                color: "#6b7280",
                textAlign: "center",
                marginTop: 8,
                marginBottom: 24,
              }}
            >
              🎸 Nene Royal Live @ Naka Market Phuket — 18 juli 2026 | Opgenomen door Allesis
            </p>

            <figure style={{ margin: "0 0 24px" }}>
              <Image
                src="/nene-royal-concert.jpg"
                alt="Nene Royal live @ Naka Market Phuket — publiek filmt massaal"
                width={1560}
                height={1040}
                className="h-auto w-full object-cover"
                style={{ borderRadius: 12 }}
                sizes="(max-width: 780px) 100vw, 780px"
              />
              <figcaption className="font-lato mt-3 text-center text-sm leading-relaxed text-neutral-500">
                Het publiek filmt massaal — iedereen heeft een telefoon, niemand heeft een website
                voor haar.
              </figcaption>
            </figure>

            <p
              className="font-lato text-[18px] leading-[1.8] text-neutral-700"
              style={{ marginBottom: 24 }}
            >
              Nene Royal (นีน รอยัล) trad op 18 juli 2026 op bij de iconische Naka Market
              (ตลาดนาคา) in Phuket, Thailand. Het optreden trok honderden fans — Thais,
              Nederlanders en toeristen van over de hele wereld. Iemand uit het publiek maakte een
              bord met de tekst &ldquo;WITH NENE — ROCK IS REBORN&rdquo; — een moment dat viral
              ging op social media. Zoek je naar Nene Royal Naka Market Phuket? Dan ben je hier op
              de juiste plek.
            </p>
          </section>

          <section>
            <h2 className="font-sora font-bold tracking-tight" style={h2Style}>
              De kracht van online vindbaarheid voor artiesten
            </h2>
            <p
              className="font-lato text-[18px] leading-[1.8] text-neutral-700"
              style={{ marginBottom: 24 }}
            >
              In 2025 is een sterke online aanwezigheid geen luxe maar noodzaak — ook voor
              artiesten. Fans zoeken via Google, maar steeds vaker ook via AI-assistenten zoals
              ChatGPT en Perplexity naar muzikanten, concertdata en optredens. Een goed gebouwde
              website zorgt ervoor dat een artiest wereldwijd gevonden wordt — niet alleen lokaal in
              Phuket.
            </p>
          </section>

          <section>
            <h2 className="font-sora font-bold tracking-tight" style={h2Style}>
              Wat kan Allesis betekenen voor muzikanten?
            </h2>
            <p
              className="font-lato text-[18px] leading-[1.8] text-neutral-700"
              style={{ marginBottom: 24 }}
            >
              Allesis bouwt websites voor muzikanten, bands en artiesten die serieus genomen willen
              worden:
            </p>
            <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
              {FEATURES.map((item) => (
                <li
                  key={item}
                  className="font-lato flex items-start gap-3"
                  style={{
                    backgroundColor: "#EAF3DE",
                    borderRadius: 12,
                    padding: "16px 20px",
                    fontSize: 15,
                    color: "#1f2937",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    className="mt-0.5 shrink-0 font-bold"
                    style={{ color: ACCENT }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-sora font-bold tracking-tight" style={h2Style}>
              Live muziek verdient een live website
            </h2>
            <p
              className="font-lato text-[18px] leading-[1.8] text-neutral-700"
              style={{ marginBottom: 24 }}
            >
              Net zoals Nene Royal het publiek meesleurt in haar performance, moet een website een
              bezoeker meeslepen. Snel laden, prachtig design, mobielvriendelijk — want 90% van de
              fans zoekt op hun telefoon.
            </p>
          </section>
        </div>
      </article>

      {/* CTA */}
      <section
        className="px-6 py-20 text-center md:py-24"
        style={{ backgroundColor: ACCENT }}
      >
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-sora mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Website voor uw muziekcarrière?
          </h2>
          <p className="font-lato mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/90">
            Van artiest tot platenlabel — wij bouwen websites die klinken
          </p>
          <Link
            href="/contact"
            className="font-lato inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 text-base font-bold text-neutral-900 no-underline transition hover:bg-white/95"
          >
            Gratis gesprek inplannen →
          </Link>
        </div>
      </section>
    </main>
  );
}
