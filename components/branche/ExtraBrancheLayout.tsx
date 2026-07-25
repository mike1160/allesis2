import Image from "next/image";
import Link from "next/link";
import BrowserMockup from "@/components/BrowserMockup";
import type { ExtraBrancheConfig } from "@/lib/extra-branches";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";

const ACCENT = "#3B6D11";

const PAKKETTEN = [
  {
    badge: "🐾 Steunt SSF",
    naam: "Gratis one-pager*",
    prijs: "€ 0",
    prijsDetail: "eenmalig · hosting vanaf €8,95/mnd",
    features: [
      "Professionele one-pager",
      "Online binnen 24 uur**",
      "Mobielvriendelijk & AVG-compliant",
      "SSL & contactformulier",
      "Bevat SSF-link & Allesis-branding",
    ],
    cta: "Gratis aanvragen →",
    ctaHref: "/gratis-website",
    ctaStijl: "bg-white text-gray-900",
  },
  {
    badge: "Meest gekozen",
    naam: "Starter",
    prijs: "€ 299",
    prijsDetail: "eenmalig · zonder verplichte branding",
    features: [
      "Meerdere pagina's",
      "Eigen huisstijl & design",
      "SEO-basis inbegrepen",
      "Google Analytics koppeling",
      "Geen verplichte SSF/branding",
    ],
    cta: "Starter aanvragen →",
    ctaHref: "/contact?pakket=starter",
    ctaStijl: "bg-white text-gray-900",
  },
  {
    badge: "Zonder branding",
    naam: "Maatwerk",
    prijs: "Op maat",
    prijsDetail: "offerte op basis van wensen",
    features: [
      "Volledig maatwerk in Next.js",
      "Boekingen, webshop of integraties",
      "Meertalig mogelijk",
      "Uitgebreide SEO & performance",
      "Persoonlijke begeleiding",
    ],
    cta: "Offerte aanvragen →",
    ctaHref: "/contact?pakket=maatwerk",
    ctaStijl: "bg-white text-gray-900",
  },
];

export default function ExtraBrancheLayout({ data }: { data: ExtraBrancheConfig }) {
  return (
    <main>
      {/* HERO */}
      <section className="relative flex min-h-[58vh] items-center overflow-hidden px-6 py-28 md:px-16 md:pt-32">
        <Image
          src={data.heroFoto}
          alt=""
          fill
          priority
          loading="eager"
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <p className="font-lato mb-4 text-xs font-bold uppercase tracking-widest text-white/70">
            Branche · {data.label}
          </p>
          <h1 className="font-sora mb-5 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {data.h1}
          </h1>
          <p className="font-lato mb-9 max-w-xl text-lg leading-relaxed text-white/85">{data.stat}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/gratis-website?branche=${data.slug}`}
              className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl px-6 py-3 text-base font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              Gratis one-pager*
            </Link>
            <Link
              href={`/contact?branche=${data.slug}`}
              className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-white bg-transparent px-6 py-3 text-base font-bold text-white transition hover:bg-white/10"
            >
              Website aanvragen →
            </Link>
          </div>
        </div>
      </section>

      {/* WAT KRIJGT U */}
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-sora mb-3 text-3xl font-black text-neutral-dark md:text-4xl">
            Wat krijgt u bij Allesis?
          </h2>
          <p className="font-lato mb-10 text-gray-500">
            Speciaal voor {data.label.toLowerCase()} — alles wat u nodig heeft.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.cards.map((card) => (
              <div key={card.titel} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={card.foto}
                  alt=""
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0" style={{ backgroundColor: "rgba(17,24,39,0.5)" }} aria-hidden />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="mb-2 text-2xl" aria-hidden>
                    {card.icon}
                  </span>
                  <h3 className="font-sora mb-1 text-lg font-bold text-white">{card.titel}</h3>
                  <p className="font-lato text-sm leading-relaxed text-white/75">{card.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOCKUP */}
      <section className="bg-neutral-light px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-sora mb-8 text-center text-2xl font-black text-neutral-dark md:text-3xl">
            Zo kan uw website eruitzien
          </h2>
          <BrowserMockup url={`www.uw${data.slug}.nl`}>
            <div
              className="flex min-h-[280px] flex-col items-center justify-center rounded-xl px-6 py-12 text-center"
              style={{ backgroundColor: ACCENT }}
            >
              <p className="font-lato text-xs font-bold uppercase tracking-widest text-white/60">
                Voorbeeld · {data.label}
              </p>
              <p className="font-sora mt-3 text-2xl font-black text-white md:text-3xl">{data.h1}</p>
              <p className="font-lato mt-3 max-w-md text-sm text-white/80">{data.stat}</p>
              <span className="mt-6 inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold" style={{ color: ACCENT }}>
                Website aanvragen →
              </span>
            </div>
          </BrowserMockup>
        </div>
      </section>

      {/* PAKKETTEN */}
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-sora mb-3 text-center text-3xl font-black text-neutral-dark md:text-4xl">
            Een pakket voor elke {data.label.toLowerCase().split(" ")[0]}
          </h2>
          <p className="font-lato mb-10 text-center text-gray-500">
            Van gratis one-pager tot volledig maatwerk — altijd met SEO, hosting en AVG.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PAKKETTEN.map((pakket) => (
              <div
                key={pakket.naam}
                className="flex flex-col rounded-2xl p-7 text-white"
                style={{ backgroundColor: ACCENT }}
              >
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/60">{pakket.badge}</p>
                <h3 className="font-sora mb-1 text-xl font-black">{pakket.naam}</h3>
                <p className="mb-1 text-3xl font-black">{pakket.prijs}</p>
                <p className="mb-5 text-xs text-white/50">{pakket.prijsDetail}</p>
                <ul className="mb-6 flex flex-1 flex-col gap-2">
                  {pakket.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-white/85">
                      <span aria-hidden>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${pakket.ctaHref}${pakket.ctaHref.includes("?") ? "&" : "?"}branche=${data.slug}`}
                  className={`mt-auto block rounded-xl px-5 py-3 text-center font-bold transition hover:opacity-90 ${pakket.ctaStijl}`}
                >
                  {pakket.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-6 py-16 md:px-10" style={{ backgroundColor: ACCENT }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sora mb-6 text-3xl font-black text-white md:text-4xl">
            Klaar voor uw nieuwe website?
          </h2>
          <Link
            href={`/contact?branche=${data.slug}`}
            className="font-lato inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold transition hover:opacity-90"
            style={{ color: ACCENT }}
          >
            Gratis gesprek inplannen →
          </Link>
        </div>
      </section>
    </main>
  );
}
