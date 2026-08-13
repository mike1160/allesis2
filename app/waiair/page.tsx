import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bell, Globe, Plane, Ticket, Smartphone } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: {
    absolute: "WaiAir — Gratis downloaden in de App Store | Allesis",
  },
  description:
    "Download WaiAir gratis in de Apple App Store. Live vluchten, gates, vertragingen en radar — gebouwd voor Zuidoost-Azië, klaar voor de wereld. Beschikbaar voor iPhone en iPad.",
  alternates: pageAlternates("/waiair"),
  openGraph: {
    title: "WaiAir — Gratis downloaden in de App Store | Allesis",
    description:
      "Download WaiAir gratis in de Apple App Store. Live vluchten, gates, vertragingen en radar — gebouwd voor Zuidoost-Azië, klaar voor de wereld.",
    url: `${SITE_URL}/waiair`,
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/waiair/banner.png`,
        alt: "WaiAir — Live vluchten & radar",
      },
    ],
  },
};

const APP_STORE_URL = "https://apps.apple.com/nl/app/waiair/id6798072839";
const ORANGE = "#F6821F";
const ORANGE_SOFT = "#FF9A4A";

const features = [
  {
    icon: Plane,
    title: "Live aankomst & vertrek",
    description:
      "Gates, vertragingen en status in één oogopslag — op hubs als Bangkok, Phuket, Singapore en Bali.",
  },
  {
    icon: Bell,
    title: "Delay-alerts",
    description:
      "Pushmeldingen zodra uw vlucht wijzigt: gate, boarding of vertraging — vaak eerder dan het bord.",
  },
  {
    icon: Globe,
    title: "Live radar",
    description:
      "Zie vliegtuigen boven Zuidoost-Azië in realtime. Volg uw toestel tot aan de gate.",
  },
  {
    icon: Ticket,
    title: "Boardingpass & overstap",
    description:
      "Scan uw boardingpass om direct te tracken. Check of u uw overstap haalt — plus Grab, taxi en trein bij landing.",
  },
];

const screenshots = [
  {
    src: "/waiair/screenshot-arrivals.png",
    alt: "WaiAir: live aankomsten op Bangkok (BKK) met gates en status",
  },
  {
    src: "/waiair/screenshot-flight.png",
    alt: "WaiAir: vluchtdetails met status, gate en tracking",
  },
  {
    src: "/waiair/screenshot-connection.png",
    alt: "WaiAir: overstapcheck — haalt u uw aansluiting?",
  },
  {
    src: "/waiair/screenshot-transport.png",
    alt: "WaiAir: transport ter plaatse — Grab, taxi en trein",
  },
];

function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[52px] items-center gap-3 rounded-xl bg-neutral-dark px-6 py-3 text-white transition hover:bg-neutral-dark/90 ${className}`}
      aria-label="Download WaiAir in de App Store"
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

export default function WaiAirPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-dark">
        <div className="relative w-full aspect-[21/9] min-h-[220px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[420px]">
          <Image
            src="/waiair/banner.png"
            alt="WaiAir banner: live vluchten en radar — Gratis"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
          <div className="mb-6 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-[0_0_24px_rgba(246,130,32,0.35)] sm:h-20 sm:w-20">
              <Image
                src="/waiair/icon.png"
                alt="WaiAir logo"
                fill
                priority
                className="object-cover"
                sizes="80px"
              />
            </div>
            <p
              className="font-lato text-xs font-bold uppercase tracking-widest"
              style={{ color: ORANGE_SOFT }}
            >
              App · iOS · Gratis
            </p>
          </div>
          <h1 className="font-sora mb-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            waiair
            <br />
            <span className="waiair-hero-accent">Live vluchten &amp; radar</span>
          </h1>
          <p className="font-lato mb-8 max-w-xl text-lg leading-relaxed text-white/75">
            De flight tracker die overal werkt. Gebouwd voor Azië, klaar voor de wereld. Gates,
            vertragingen en boarding — WaiAir weet het, vaak eerder dan het bord. Gratis voor iPhone
            en iPad.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AppStoreBadge />
            <p className="font-lato text-sm text-white/60">
              Beschikbaar voor iPhone &amp; iPad
            </p>
          </div>
        </div>
      </section>

      <Reveal className="bg-neutral-light/40 px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-sora text-center text-2xl font-bold text-neutral-dark md:text-3xl">
            Zo ziet WaiAir eruit
          </h2>
          <p className="font-lato mx-auto mt-3 max-w-2xl text-center text-neutral-mid">
            Live aankomsten, vluchtdetails, overstapcheck en transport ter plaatse — overzichtelijk
            in één app.
          </p>
          <div className="mt-10 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {screenshots.map((shot) => (
              <div
                key={shot.src}
                className="relative aspect-[9/19.5] w-[220px] shrink-0 overflow-hidden rounded-2xl border border-neutral-light/90 bg-white shadow-[0_12px_40px_-12px_rgba(10,15,30,0.12)] sm:w-auto"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <PremiumCard>
              <h2 className="font-sora text-2xl font-bold text-neutral-dark">Wat is WaiAir?</h2>
              <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
                WaiAir is de flight tracker van Allesis. Live aankomsten en vertrekken, delay-alerts
                en radar — met extra aandacht voor Zuidoost-Azië: Bangkok, Phuket, Singapore, Bali,
                Kuala Lumpur en Manila.
              </p>
              <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
                Meer dan 10.000 luchthavens wereldwijd: van Schiphol tot Dubai en Londen. Scan uw
                boardingpass en track direct.
              </p>
            </PremiumCard>

            <PremiumCard>
              <h2 className="font-sora text-2xl font-bold text-neutral-dark">Voor wie is de app?</h2>
              <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
                Voor iedereen die vliegt of iemand ophaalt — of u nu in Phuket landt, overstapt in
                Singapore, of vanaf Schiphol vertrekt.
              </p>
              <ul className="font-lato mt-5 space-y-2.5 text-sm text-neutral-mid">
                {[
                  "Reizigers in Zuidoost-Azië",
                  "Frequent flyers wereldwijd",
                  "Mensen die iemand van het vliegveld halen",
                  "Overstappers die hun aansluiting willen checken",
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

          <section className="mt-16" aria-labelledby="waiair-features">
            <h2
              id="waiair-features"
              className="font-sora text-center text-2xl font-bold text-neutral-dark md:text-3xl"
            >
              Belangrijkste functies
            </h2>
            <p className="font-lato mx-auto mt-3 max-w-2xl text-center text-neutral-mid">
              Status, gates en radar — plus overstap en transport bij landing.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <PremiumCard key={feature.title} className="h-full">
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "rgba(246,130,32,0.12)", color: ORANGE }}
                    >
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

          <section className="mt-16" aria-labelledby="waiair-beschikbaarheid">
            <PremiumCard>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(246,130,32,0.12)", color: ORANGE }}
                >
                  <Smartphone className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <h2
                    id="waiair-beschikbaarheid"
                    className="font-sora text-xl font-bold text-neutral-dark md:text-2xl"
                  >
                    Beschikbaarheid
                  </h2>
                  <p className="font-lato mt-2 leading-relaxed text-neutral-mid">
                    WaiAir is beschikbaar voor{" "}
                    <strong className="font-semibold text-neutral-dark">iOS</strong> via de Apple
                    App Store — geschikt voor iPhone en iPad. Download is gratis.
                  </p>
                </div>
              </div>
            </PremiumCard>
          </section>
        </div>
      </Reveal>

      <section
        className="border-t px-6 py-16 md:px-10 md:py-20"
        style={{ borderColor: "#F4E6D8", backgroundColor: "#FFF7F0" }}
        aria-labelledby="waiair-download"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="relative mb-8 h-24 w-24 overflow-hidden rounded-[22%] shadow-lg">
            <Image
              src="/waiair/icon.png"
              alt="WaiAir app-icoon"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <h2
            id="waiair-download"
            className="font-sora text-3xl font-black text-neutral-dark md:text-4xl"
          >
            Download WaiAir gratis
          </h2>
          <p className="font-lato mx-auto mt-4 max-w-xl text-neutral-mid">
            Haal de app vandaag nog in de App Store. Live vluchten &amp; radar — klaar voor uw
            volgende vlucht.
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
              className="flex w-40 flex-col items-center gap-2 rounded-2xl border bg-white p-3 shadow-sm transition hover:shadow-md"
              style={{ borderColor: "rgba(255,107,0,0.25)" }}
            >
              <Image
                src="/waiair/app-store-qr.png"
                alt="QR-code: scan om WaiAir te downloaden in de App Store"
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
            Vragen over WaiAir?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              Neem contact op
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
