import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppWindow, Rocket, Smartphone, Store } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "App-ontwerp & distributie — Apple & Android",
  description:
    "Allesis ontwerpt, bouwt en publiceert apps voor Apple en Android. Van UX tot App Store & Google Play. Bekijk VaarApp als voorbeeld — of vraag een gesprek aan.",
  alternates: pageAlternates("/app-ontwerp"),
  openGraph: {
    title: "App-ontwerp & distributie | Allesis",
    description:
      "Van idee tot store: ontwerp, ontwikkeling en publicatie van apps voor Apple en Android. Inclusief case study VaarApp.",
    url: `${SITE_URL}/app-ontwerp`,
    locale: "nl_NL",
    type: "website",
  },
};

const steps = [
  {
    icon: AppWindow,
    title: "Concept & UX",
    description:
      "We vertalen uw idee naar een heldere gebruikerservaring: flows, schermen en prioriteiten die écht werken op iPhone en iPad.",
  },
  {
    icon: Smartphone,
    title: "Ontwerp & bouw",
    description:
      "Modern UI-ontwerp en native of hybride ontwikkeling. Snel, stabiel en klaar voor Apple’s richtlijnen.",
  },
  {
    icon: Store,
    title: "App Store & Play Store",
    description:
      "Accountsetup, metadata, screenshots, review-proces en publicatie op Apple App Store én Google Play. Wij begeleiden tot uw app live staat.",
  },
  {
    icon: Rocket,
    title: "Updates & groei",
    description:
      "Na lancering: verbeteringen, nieuwe features en onderhoud — zodat uw app blijft meegroeien met uw gebruikers.",
  },
];

export default function AppOntwerpPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Nieuw · Apps"
        title="App-ontwerp"
        titleAccent="& distributie"
        backgroundImage="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"
        subtitle="Van eerste schets tot live in de App Store of Google Play. Allesis begeleidt het volledige traject — ontwerp, ontwikkeling én publicatie voor Apple én Android."
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/contact#offerte"
            className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-7 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            App bespreken →
          </Link>
          <Link
            href="/vaarapp"
            className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl border border-neutral-dark/15 bg-white px-7 text-sm font-bold text-neutral-dark transition hover:border-primary/40"
          >
            Bekijk VaarApp
          </Link>
        </div>
      </SubpageHero>

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-sora text-center text-2xl font-bold text-neutral-dark md:text-3xl">
            Wat wij voor u doen
          </h2>
          <p className="font-lato mx-auto mt-3 max-w-2xl text-center text-neutral-mid">
            Niet alleen een mooi scherm — een complete route van idee naar downloadbare app.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <PremiumCard key={step.title} className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="font-sora text-lg font-bold text-neutral-dark">{step.title}</h3>
                  <p className="font-lato mt-2 text-sm leading-relaxed text-neutral-mid">
                    {step.description}
                  </p>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Case: VaarApp */}
      <section
        className="px-6 py-16 md:px-10 md:py-20"
        style={{ backgroundColor: "#F4F8EC" }}
        aria-labelledby="case-vaarapp"
      >
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-lg">
            <Image
              src="/vaarapp/banner.png"
              alt="VaarApp — Bruggen, sluizen & havens"
              fill
              className="object-contain object-center p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="font-lato text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Case study · Live in de App Store
            </p>
            <h2 id="case-vaarapp" className="font-sora mt-3 text-3xl font-black text-neutral-dark">
              vaarapp
            </h2>
            <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
              Onze eigen navigatie-app voor watersporters: bruggen, sluizen, havens en stremmingen
              op één kaart — inclusief bedieningstijden. Ontworpen, gebouwd én gedistribueerd via
              de Apple App Store door Allesis.
            </p>
            <ul className="font-lato mt-5 space-y-2 text-sm text-neutral-mid">
              {[
                "iOS · iPhone & iPad",
                "App Store-listing & QR-download",
                "Kaart, filters en statusinformatie",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-primary" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/vaarapp"
              className="font-lato mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-7 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Naar de VaarApp-pagina →
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-t px-6 py-16 text-center md:px-10"
        style={{ borderColor: "#EAF3DE", backgroundColor: "#fff" }}
      >
        <h2 className="font-sora text-3xl font-black text-neutral-dark">Zelf een app laten maken?</h2>
        <p className="font-lato mx-auto mt-4 max-w-xl text-neutral-mid">
          Vertel ons uw idee. Wij adviseren over scope, planning en App Store-publicatie — zonder
          jargon, met een helder voorstel.
        </p>
        <Link
          href="/contact#offerte"
          className="font-lato mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white transition hover:bg-primary-dark"
        >
          Offerte of gesprek aanvragen
        </Link>
      </section>
    </>
  );
}
