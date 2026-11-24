import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TechIcon from "@/components/TechIcon";
import { GROEP_LABEL, TECHNOLOGIE, TECH_SLUGS, getTech, techPerGroep } from "@/lib/technologie";
import { SITE_URL, pageAlternates } from "@/lib/seo-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TECH_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tech = getTech((await params).slug);
  if (!tech) return {};
  const titel = `${tech.naam}: wat is het en wat heeft u eraan?`;
  return {
    title: titel,
    description: `${tech.kort} Uitleg in gewone taal, en hoe Allesis ${tech.naam} inzet voor uw website.`,
    alternates: pageAlternates(`/technologie/${tech.slug}`),
    openGraph: { title: `${titel} | Allesis`, description: tech.kort, url: `${SITE_URL}/technologie/${tech.slug}` },
  };
}

export default async function TechPage({ params }: Props) {
  const tech = getTech((await params).slug);
  if (!tech) notFound();

  const verwant = techPerGroep(tech.groep).filter((t) => t.slug !== tech.slug);
  const index = TECHNOLOGIE.findIndex((t) => t.slug === tech.slug);
  const volgende = TECHNOLOGIE[(index + 1) % TECHNOLOGIE.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${tech.naam} bij Allesis`,
        description: tech.kort,
        url: `${SITE_URL}/technologie/${tech.slug}`,
        about: { "@type": "Thing", name: tech.naam, ...(tech.url ? { sameAs: tech.url } : {}) },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Technologie", item: `${SITE_URL}/technologie` },
          { "@type": "ListItem", position: 3, name: tech.naam, item: `${SITE_URL}/technologie/${tech.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="bg-neutral-light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-neutral-dark px-6 pb-16 pt-28 text-white md:px-10 md:pt-36">
        <div className="mx-auto max-w-4xl">
          <nav className="font-lato text-xs text-white/50" aria-label="Kruimelpad">
            <Link href="/" className="hover:text-white">Home</Link> /{" "}
            <Link href="/technologie" className="hover:text-white">Technologie</Link> /{" "}
            <span className="text-white/80">{tech.naam}</span>
          </nav>
          <div className="mt-8 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
              <TechIcon tech={tech} className="h-8 w-8" />
            </span>
            <span className="font-lato rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/60">
              {GROEP_LABEL[tech.groep]}
            </span>
          </div>
          <h1 className="font-sora mt-6 text-[clamp(2.4rem,6vw,4rem)] font-black leading-[1.05] tracking-tight">
            {tech.naam}
          </h1>
          <p className="font-lato mt-4 max-w-2xl text-xl leading-relaxed text-white/80">{tech.kort}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
        {/* Wat is het */}
        <section>
          <h2 className="font-sora text-2xl font-black text-neutral-dark">Wat is {tech.naam}?</h2>
          <p className="font-lato mt-4 text-lg leading-relaxed text-gray-700">{tech.watIs}</p>
        </section>

        {/* Voordelen */}
        <section className="mt-14">
          <h2 className="font-sora text-2xl font-black text-neutral-dark">Wat heeft u eraan?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {tech.voordelen.map((v) => (
              <div key={v.titel} className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="font-sora font-bold text-neutral-dark">{v.titel}</p>
                <p className="font-lato mt-2 text-sm leading-relaxed text-gray-600">{v.tekst}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bij Allesis */}
        <section className="mt-14 rounded-3xl bg-primary p-8 text-white md:p-10">
          <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-white/70">Zo doen wij het</p>
          <h2 className="font-sora mt-2 text-2xl font-black">{tech.naam} bij Allesis</h2>
          <p className="font-lato mt-4 text-lg leading-relaxed text-white/90">{tech.bijAllesis}</p>
          <p className="font-lato mt-4 text-sm text-white/70">
            Inbegrepen bij elk project. U hoeft er zelf niets voor te regelen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact#offerte"
              className="font-lato rounded-xl bg-accent px-5 py-3 font-bold text-neutral-dark transition hover:brightness-95"
            >
              Gratis kennismaking →
            </Link>
            <Link
              href="/hosting"
              className="font-lato rounded-xl border border-white/30 px-5 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Zorgeloze hosting €20 p/m
            </Link>
          </div>
        </section>

        {tech.url && (
          <p className="font-lato mt-6 text-sm text-gray-500">
            Meer weten?{" "}
            <a href={tech.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
              Officiële website van {tech.naam} ↗
            </a>
          </p>
        )}

        {/* Verwant */}
        <section className="mt-14">
          <h2 className="font-sora text-lg font-bold text-neutral-dark">Ook in {GROEP_LABEL[tech.groep].toLowerCase()}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {verwant.map((t) => (
              <Link
                key={t.slug}
                href={`/technologie/${t.slug}`}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:border-primary hover:text-primary"
              >
                <TechIcon tech={t} className="h-3.5 w-3.5" />
                {t.naam}
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
            <Link href="/technologie" className="font-lato text-sm font-semibold text-gray-500 hover:text-primary">
              ← Alle technologie
            </Link>
            <Link href={`/technologie/${volgende.slug}`} className="font-lato text-sm font-semibold text-primary hover:underline">
              Volgende: {volgende.naam} →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
