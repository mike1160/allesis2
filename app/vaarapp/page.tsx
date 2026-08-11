import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Landmark, MapPinned, Ship, TriangleAlert, Smartphone } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  // Absolute: voorkomt dubbele "| Allesis.nl" via layout-template
  title: {
    absolute: "VaarApp — Gratis downloaden in de App Store | Allesis",
  },
  description:
    "Download de VaarApp gratis in de Apple App Store. Bruggen, sluizen & havens — bedieningstijden en meer. Beschikbaar voor iPhone en iPad.",
  alternates: pageAlternates("/vaarapp"),
  openGraph: {
    title: "VaarApp — Gratis downloaden in de App Store | Allesis",
    description:
      "Download de VaarApp gratis in de Apple App Store. Bruggen, sluizen & havens — bedieningstijden en meer. Beschikbaar voor iPhone en iPad.",
    url: `${SITE_URL}/vaarapp`,
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/vaarapp/banner.png`,
        alt: "VaarApp — Bruggen, sluizen & havens",
      },
    ],
  },
};

const APP_STORE_URL = "https://apps.apple.com/nl/app/vaarapp/id6799596805";

const features = [
  {
    icon: Landmark,
    title: "Bruggen",
    description:
      "Vind bruggen op de kaart en bekijk status en bedieningstijden — open of gesloten in één oogopslag.",
  },
  {
    icon: Ship,
    title: "Sluizen",
    description:
      "Bekijk sluizen langs uw route, inclusief geplande openingen en praktische details.",
  },
  {
    icon: MapPinned,
    title: "Havens",
    description:
      "Ontdek jachthavens en aanlegplaatsen in de buurt — handig bij het plannen van uw tocht.",
  },
  {
    icon: TriangleAlert,
    title: "Stremmingen",
    description:
      "Blijf op de hoogte van stremmingen en verstoringen op het water, zodat u niet voor verrassingen komt.",
  },
];

function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[52px] items-center gap-3 rounded-xl bg-neutral-dark px-6 py-3 text-white transition hover:bg-neutral-dark/90 ${className}`}
      aria-label="Download VaarApp in de App Store"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="shrink-0"
      >
        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.97 2.93 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="font-lato block text-[10px] font-medium uppercase tracking-wide text-white/70">
          Download in de
        </span>
        <span className="font-sora block text-lg font-bold tracking-tight">App Store</span>
      </span>
    </a>
  );
}

export default function VaarAppPage() {
  return (
    <>
      {/* Hero — full-bleed banner */}
      <section className="relative overflow-hidden bg-neutral-dark">
        <div className="relative w-full aspect-[21/9] min-h-[220px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[420px]">
          <Image
            src="/vaarapp/banner.png"
            alt="VaarApp banner: app-icoon met ophaalbrug en tekst Bruggen, sluizen & havens — Gratis"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
          <p className="font-lato mb-4 text-xs font-bold uppercase tracking-widest text-[#C8FF00]">
            App · iOS · Gratis
          </p>
          <h1 className="font-sora mb-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            vaarapp
            <br />
            <span className="text-[#C8FF00]">Bruggen, sluizen &amp; havens</span>
          </h1>
          <p className="font-lato mb-8 max-w-xl text-lg leading-relaxed text-white/75">
            Bedieningstijden en meer — de handige navigatie-app voor watersporters. Zoek bruggen,
            sluizen en havens op de kaart, bekijk status en weer. Gratis voor iPhone en iPad.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AppStoreBadge />
            <p className="font-lato text-sm text-white/60">
              Beschikbaar voor iPhone &amp; iPad
            </p>
          </div>
        </div>
      </section>

      {/* App Store-schermafbeelding */}
      <Reveal className="bg-neutral-light/40 px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-sora text-center text-2xl font-bold text-neutral-dark md:text-3xl">
            Zo ziet VaarApp eruit
          </h2>
          <p className="font-lato mx-auto mt-3 max-w-2xl text-center text-neutral-mid">
            Interactieve kaart met bruggen, sluizen, havens en stremmingen — plus bedieningstijden en
            praktische info.
          </p>
          <div className="relative mx-auto mt-10 aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-light/90 bg-white shadow-[0_12px_40px_-12px_rgba(10,15,30,0.12)]">
            <Image
              src="/vaarapp/app-store.png"
              alt="VaarApp in de App Store: schermafbeeldingen van de kaart met bruggen, sluizen en havens"
              fill
              className="object-contain object-center p-2 sm:p-4"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      </Reveal>

      {/* Algemene info */}
      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <PremiumCard>
              <h2 className="font-sora text-2xl font-bold text-neutral-dark">Wat is de VaarApp?</h2>
              <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
                VaarApp is de navigatie-app van Allesis voor watersporters. Op één kaart ziet u
                bruggen, sluizen en havens, inclusief bedieningstijden, status (open/gesloten) en
                stremmingen — met actueel weer erbij.
              </p>
              <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
                Minder zoeken, meer varen: de informatie die u onderweg nodig heeft, binnen
                handbereik op uw iPhone of iPad.
              </p>
            </PremiumCard>

            <PremiumCard>
              <h2 className="font-sora text-2xl font-bold text-neutral-dark">Voor wie is de app?</h2>
              <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
                Voor iedereen die in Nederland op het water vaart — of u nu zeilt, met een motorboot
                vaart, of recreatief onderweg bent.
              </p>
              <ul className="font-lato mt-5 space-y-2.5 text-sm text-neutral-mid">
                {[
                  "Zeilers en kajuitjachten",
                  "Motorbootvaarders",
                  "Watersporters & recreatievaarders",
                  "Jachthavenbezoekers en weekendzeilers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 font-bold text-primary" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </PremiumCard>
          </div>

          {/* Features */}
          <section className="mt-16" aria-labelledby="vaarapp-features">
            <h2
              id="vaarapp-features"
              className="font-sora text-center text-2xl font-bold text-neutral-dark md:text-3xl"
            >
              Belangrijkste functies
            </h2>
            <p className="font-lato mx-auto mt-3 max-w-2xl text-center text-neutral-mid">
              Filter op de kaart en zoom in voor details — overzichtelijk in één app.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <PremiumCard key={feature.title} className="h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="font-sora text-lg font-bold text-neutral-dark">{feature.title}</h3>
                    <p className="font-lato mt-2 text-sm leading-relaxed text-neutral-mid">
                      {feature.description}
                    </p>
                  </PremiumCard>
                );
              })}
            </div>
          </section>

          {/* Beschikbaarheid */}
          <section className="mt-16" aria-labelledby="vaarapp-beschikbaarheid">
            <PremiumCard>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Smartphone className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <h2
                    id="vaarapp-beschikbaarheid"
                    className="font-sora text-xl font-bold text-neutral-dark md:text-2xl"
                  >
                    Beschikbaarheid
                  </h2>
                  <p className="font-lato mt-2 leading-relaxed text-neutral-mid">
                    VaarApp is beschikbaar voor{" "}
                    <strong className="font-semibold text-neutral-dark">iOS</strong> via de Apple
                    App Store — geschikt voor iPhone en iPad. Download is gratis.
                  </p>
                </div>
              </div>
            </PremiumCard>
          </section>
        </div>
      </Reveal>

      {/* Download sectie */}
      <section
        className="border-t px-6 py-16 md:px-10 md:py-20"
        style={{ borderColor: "#EAF3DE", backgroundColor: "#F4F8EC" }}
        aria-labelledby="vaarapp-download"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="relative mb-8 h-24 w-24 overflow-hidden rounded-[22%] shadow-lg">
            <Image
              src="/vaarapp/banner.png"
              alt="VaarApp app-icoon"
              fill
              className="object-cover object-left"
              sizes="96px"
            />
          </div>
          <h2
            id="vaarapp-download"
            className="font-sora text-3xl font-black text-neutral-dark md:text-4xl"
          >
            Download VaarApp gratis
          </h2>
          <p className="font-lato mx-auto mt-4 max-w-xl text-neutral-mid">
            Haal de app vandaag nog in de App Store. Bruggen, sluizen &amp; havens — klaar voor uw
            volgende tocht.
          </p>

          <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-3">
              <AppStoreBadge />
              <p className="font-lato text-xs text-neutral-mid">
                Beschikbaar in de Apple App Store
              </p>
            </div>

            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-40 flex-col items-center gap-2 rounded-2xl border border-primary/20 bg-white p-3 shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <Image
                src="/vaarapp/app-store-qr.png"
                alt="QR-code: scan om VaarApp te downloaden in de App Store"
                width={160}
                height={160}
                className="h-auto w-full"
              />
              <p className="font-lato text-center text-xs font-medium text-neutral-mid">
                Scan om te downloaden
              </p>
            </a>
          </div>

          <p className="font-lato mt-10 text-sm text-neutral-mid">
            Vragen over VaarApp?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              Neem contact op
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
