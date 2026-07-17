"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BrowserMockup from "@/components/BrowserMockup";
import BrancheCTA from "@/components/BrancheCTA";
import BrancheHero from "@/components/BrancheHero";
import FAQGrid, { type FAQGridItem } from "@/components/FAQGrid";
import FeatureGrid from "@/components/FeatureGrid";
import MiniSitePreview, { type MiniSiteTile } from "@/components/branche/MiniSitePreview";

const easeOut = "easeOut" as const;

export type BrancheFeature = {
  icon: string;
  title: string;
  desc: string;
  /** Optionele Unsplash-foto → fotokaart via FeatureGrid */
  foto?: string;
};

export type BrancheConfig = {
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  intro: string;
  accent: string;
  heroFoto: string;
  heroGradient: string;
  featuresHeading: string;
  featuresSub?: string;
  /** Overlay op feature-fotokaarten, bijv. from-amber-900/90 via-amber-900/50 */
  featuresOverlay?: string;
  features: BrancheFeature[];
  faq?: FAQGridItem[];
  faqGradient?: string;
  ctaTitle: string;
  ctaText: string;
  pakketSlug: string;
  mockup: {
    url: string;
    foto: string;
    kicker: string;
    heading: string;
    sub: string;
    primaryPill: string;
    secondaryPill: string;
    tiles: MiniSiteTile[];
    overlayClass: string;
    mutedClass: string;
    pillClass: string;
  };
};

export default function BranchePageLayout({ config }: { config: BrancheConfig }) {
  const photoFeatures = config.features.filter(
    (f): f is BrancheFeature & { foto: string } => Boolean(f.foto)
  );
  const hasPhotoFeatures = photoFeatures.length > 0;
  const featuresOverlay = config.featuresOverlay ?? "from-black/90 via-black/50";

  return (
    <main>
      <BrancheHero
        eyebrow={config.eyebrow}
        title={config.headlineLead}
        titleAccent={config.headlineAccent}
        description={config.intro}
        foto={config.heroFoto}
        gradient={config.heroGradient}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/gratis-website?branche=${config.pakketSlug}`}
            className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#C8FF00] px-6 py-3 text-base font-black text-gray-900 transition hover:brightness-95"
          >
            🐾 Gratis one-pager*
          </Link>
          <Link
            href={`/contact?pakket=${config.pakketSlug}`}
            className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-bold text-gray-900 transition hover:bg-neutral-light"
          >
            Website aanvragen →
          </Link>
        </div>
      </BrancheHero>

      <section id="voorbeeld" className="scroll-mt-28 bg-neutral-light px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <BrowserMockup url={config.mockup.url}>
              <MiniSitePreview
                foto={config.mockup.foto}
                overlayClass={config.mockup.overlayClass}
                mutedClass={config.mockup.mutedClass}
                pillClass={config.mockup.pillClass}
                kicker={config.mockup.kicker}
                heading={config.mockup.heading}
                sub={config.mockup.sub}
                primaryPill={config.mockup.primaryPill}
                secondaryPill={config.mockup.secondaryPill}
                tiles={config.mockup.tiles}
              />
            </BrowserMockup>
          </motion.div>
        </div>
      </section>

      {hasPhotoFeatures ? (
        <FeatureGrid
          titel={config.featuresHeading}
          ondertitel={config.featuresSub}
          gradient={featuresOverlay}
          features={photoFeatures.map((f) => ({
            icon: f.icon,
            titel: f.title,
            beschrijving: f.desc,
            foto: f.foto,
          }))}
        />
      ) : (
        <section className="bg-white px-6 py-20 md:px-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-sora mb-3 text-4xl font-black text-neutral-dark">{config.featuresHeading}</h2>
            {config.featuresSub ? (
              <p className="font-lato mb-10 text-gray-500">{config.featuresSub}</p>
            ) : (
              <div className="mb-10" />
            )}
            <div className="grid gap-6 sm:grid-cols-2">
              {config.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="rounded-xl border border-neutral-light bg-white p-6 shadow-[0_8px_30px_-14px_rgba(10,15,30,0.1)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: easeOut, delay: i * 0.06 }}
                >
                  <div className="text-2xl" aria-hidden>
                    {f.icon}
                  </div>
                  <h3 className="font-sora mt-3 text-lg font-bold text-neutral-dark">{f.title}</h3>
                  <p className="font-lato mt-2 text-sm leading-relaxed text-neutral-mid">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {config.faq && config.faq.length > 0 ? (
        <FAQGrid
          items={config.faq}
          gradient={config.faqGradient ?? "from-black/95 via-black/80 to-black/60"}
        />
      ) : null}

      <BrancheCTA branche={config.pakketSlug} />
    </main>
  );
}
