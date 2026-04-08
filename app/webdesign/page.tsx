import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import CheckMarkList from "@/components/subpage/CheckMarkList";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
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

const watKrijgJe = [
  "Professioneel design op maat",
  "Mobielvriendelijk (responsive)",
  "SEO-geoptimaliseerd vanaf dag één",
  "AVG-compliant — privacybeleid, cookiebanner, verwerkersregister",
  "SSL-certificaat inbegrepen",
  "Koppeling met Google Analytics / Search Console",
];

export default function WebdesignPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Webdesign Haarlem"
        title="Nieuwe website laten maken?"
        subtitle="Wij bouwen snelle, moderne websites voor het MKB — inclusief SEO, hosting en AVG-compliant privacybeleid."
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sora text-center text-2xl font-bold text-neutral-dark md:text-3xl">Wat krijg je?</h2>
          <PremiumCard className="mt-10">
            <CheckMarkList items={watKrijgJe} />
          </PremiumCard>
        </div>
      </Reveal>

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
    </>
  );
}
