"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CookieConsent from "@/components/CookieConsent";
import FAQGrid from "@/components/FAQGrid";
import GratisVoorwaardenNote from "@/components/GratisVoorwaardenNote";
import SSFMissie from "@/components/SSFMissie";
import { HOME_FAQ_GRID } from "@/lib/faq-data";
import {
  siWordpress,
  siWix,
  siShopify,
  siSquarespace,
  siWebflow,
  siJoomla,
  siGooglegemini,
  siClaude,
  siPerplexity,
  siGithubcopilot,
} from "simple-icons";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";

const easeOut = "easeOut" as const;
const transitionSnappy = { duration: 0.45, ease: easeOut };

type SimpleIcon = { path: string; title: string; slug: string };

/** OpenAI-pad uit simple-icons (niet meer in huidige package-export) */
const siOpenai = {
  title: "OpenAI",
  slug: "openai",
  path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
} as const;

const AI_STRIP_ITEMS: {
  naam: string;
  icon: { path: string };
  color: string;
  variant?: "circle" | "gradient";
}[] = [
  { naam: "ChatGPT", icon: siOpenai, color: "#ffffff", variant: "circle" },
  { naam: "Gemini", icon: siGooglegemini, color: `#${siGooglegemini.hex}` },
  { naam: "Perplexity", icon: siPerplexity, color: `#${siPerplexity.hex}` },
  { naam: "Claude", icon: siClaude, color: `#${siClaude.hex}` },
  { naam: "Copilot", icon: siGithubcopilot, color: "#00A4EF", variant: "gradient" },
];

const MIGRATION_LOGO_COLORS: Record<string, string> = {
  wordpress: "#21759B",
  wix: "#FAAD00",
  shopify: "#96BF48",
  squarespace: "#888888",
  webflow: "#4353FF",
  joomla: "#F4A818",
};

const MIGRATION_LOGO_ROW_1 = [siWordpress, siWix, siShopify, siSquarespace, siWebflow, siJoomla];
const MIGRATION_LOGO_ROW_2 = [siShopify, siWordpress, siJoomla, siWix, siSquarespace, siWebflow];

type Dienst = {
  naam: string;
  beschrijving: string;
  href: string;
  foto: string;
  gradient: string;
  emoji: string;
};

const DIENSTEN: Dienst[] = [
  {
    naam: "Webdesign",
    beschrijving: "Online binnen 24 uur** mogelijk. Modern, snel en mobielvriendelijk. Maatwerk in 4 weken.",
    href: "/webdesign",
    foto: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=70",
    gradient: "from-blue-900/80 to-blue-600/40",
    emoji: "🎨",
  },
  {
    naam: "AVG & Compliance",
    beschrijving: "Wij leveren elke website AVG-compliant op. Privacybeleid, cookiebanner, SSL.",
    href: "/avg",
    foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=70",
    gradient: "from-green-900/80 to-green-600/40",
    emoji: "🔒",
  },
  {
    naam: "Hosting & Domeinen",
    beschrijving: "Nederlandse hosting met 99,9% uptime. Alles onder één dak.",
    href: "/hosting",
    foto: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=70",
    gradient: "from-slate-900/80 to-slate-600/40",
    emoji: "⚡",
  },
  {
    naam: "Thaise webdiensten",
    beschrijving: "Websites in Thai, NL en EN. Vertaling en tolkdiensten.",
    href: "/thai",
    foto: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=70",
    gradient: "from-orange-900/80 to-orange-500/40",
    emoji: "🇹🇭",
  },
];

const BRANCHES = [
  {
    naam: "Horeca",
    beschrijving: "Online menu, reserveringen & reviews.",
    href: "/horeca",
    foto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70",
    gradient: "from-orange-900/90 via-orange-800/70 to-transparent",
    icon: "🍽️",
  },
  {
    naam: "Beauty",
    beschrijving: "Online afspraken & behandelmenu.",
    href: "/beauty",
    foto: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=70",
    gradient: "from-pink-900/90 via-pink-800/70 to-transparent",
    icon: "💆",
  },
  {
    naam: "Bouw",
    beschrijving: "Portfolio, offerte-aanvraag & werkgebied.",
    href: "/bouw",
    foto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=70",
    gradient: "from-amber-900/90 via-amber-800/70 to-transparent",
    icon: "🔨",
  },
  {
    naam: "Zorg",
    beschrijving: "Afspraken & vertrouwenwekkend design.",
    href: "/zorg",
    foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=70",
    gradient: "from-cyan-900/90 via-cyan-800/70 to-transparent",
    icon: "🏥",
  },
  {
    naam: "ZZP",
    beschrijving: "Online in een dag, gratis mogelijk.*",
    href: "/zzp",
    foto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=70",
    gradient: "from-blue-900/90 via-blue-800/70 to-transparent",
    icon: "💼",
  },
  {
    naam: "Non-profit",
    beschrijving: "Donaties, vrijwilligers & impact tonen.",
    href: "/non-profit",
    foto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=70",
    gradient: "from-green-900/90 via-green-800/70 to-transparent",
    icon: "❤️",
  },
  {
    naam: "Webshop",
    beschrijving: "Producten, betalen & SEO.",
    href: "/webshop",
    foto: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=70",
    gradient: "from-violet-900/90 via-violet-800/70 to-transparent",
    icon: "🛒",
  },
  {
    naam: "Tandarts",
    beschrijving: "Afspraken & praktijkpresentatie.",
    href: "/tandarts",
    foto: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=70",
    gradient: "from-sky-900/90 via-sky-800/70 to-transparent",
    icon: "🦷",
  },
  {
    naam: "Vastgoed",
    beschrijving: "Panden presenteren & leads genereren.",
    href: "/vastgoed",
    foto: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=70",
    gradient: "from-stone-900/90 via-stone-800/70 to-transparent",
    icon: "🏠",
  },
  {
    naam: "Sport",
    beschrijving: "Ledenwerving, schema's & online inschrijven.",
    href: "/sport",
    foto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=70",
    gradient: "from-lime-900/90 via-lime-800/70 to-transparent",
    icon: "⚽",
  },
  {
    naam: "Advocaat",
    beschrijving: "Professioneel, betrouwbaar & AVG-compliant.",
    href: "/advocaat",
    foto: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=70",
    gradient: "from-slate-900/90 via-slate-800/70 to-transparent",
    icon: "⚖️",
  },
  {
    naam: "Thais",
    beschrijving: "Meertalig: Thai, Nederlands & Engels.",
    href: "/thai",
    foto: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=70",
    gradient: "from-red-900/90 via-red-800/70 to-transparent",
    icon: "🇹🇭",
  },
];

const PAKKETTEN = [
  {
    badge: "🐾 Steunt SSF",
    badgeKleur: "text-orange-500",
    naam: "Gratis one-pager*",
    prijs: "€ 0",
    prijsDetail: "eenmalig · hosting vanaf €8,95/mnd",
    foto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=70",
    gradient: "from-slate-900/80 via-slate-800/65 to-slate-700/45",
    featured: false,
    features: [
      "Professionele one-pager",
      "Online binnen 24 uur**",
      "Mobielvriendelijk & AVG-compliant",
      "SSL-certificaat & contactformulier",
      "Bevat SSF-link & Allesis-branding",
    ],
    cta: "Gratis aanvragen →",
    ctaHref: "/gratis-website",
    ctaStijl: "bg-[#C8FF00] text-gray-900",
  },
  {
    badge: "Meest gekozen",
    badgeKleur: "text-white",
    naam: "Starter",
    prijs: "€ 299",
    prijsDetail: "eenmalig · zonder verplichte branding",
    foto: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=70",
    gradient: "from-blue-900/95 via-blue-800/90 to-blue-700/70",
    featured: true,
    features: [
      "Meerdere pagina's",
      "Eigen huisstijl & design",
      "SEO-basis inbegrepen",
      "Google Analytics koppeling",
      "Geen verplichte SSF/branding",
    ],
    cta: "Starter aanvragen →",
    ctaHref: "/contact?pakket=starter",
    ctaStijl: "bg-white text-[#3B6D11]",
  },
  {
    badge: "Zonder branding",
    badgeKleur: "text-white/60",
    naam: "Maatwerk",
    prijs: "Op maat",
    prijsDetail: "offerte op basis van wensen",
    foto: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=70",
    gradient: "from-gray-900/80 via-gray-800/65 to-gray-700/45",
    featured: false,
    features: [
      "Volledig maatwerk in Next.js",
      "Boekingen, webshop of integraties",
      "Meertalig mogelijk",
      "Uitgebreide SEO & performance",
      "Persoonlijke begeleiding",
    ],
    cta: "Offerte aanvragen →",
    ctaHref: "/contact?pakket=maatwerk",
    ctaStijl: "bg-[#C8FF00] text-gray-900",
  },
];

const WERKWIJZE = [
  {
    nummer: "01",
    titel: "Kennismaking",
    beschrijving: "We bespreken uw wensen, doelen en doelgroep — vrijblijvend.",
    foto: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=70",
  },
  {
    nummer: "02",
    titel: "Ontwerp",
    beschrijving: "U ontvangt een ontwerp op maat en denkt mee over de richting.",
    foto: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=70",
  },
  {
    nummer: "03",
    titel: "Bouw",
    beschrijving: "Wij bouwen uw snelle, AVG-compliant website in Next.js.",
    foto: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=70",
  },
  {
    nummer: "04",
    titel: "Live & groei",
    beschrijving: "We gaan live, meten resultaten en optimaliseren voor Google.",
    foto: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=70",
  },
];

const REVIEWS = [
  {
    sterren: 5,
    tekst: "Dankzij Allesis staat mijn website al jaren bij de eerste 3 zoekresultaten van Google — zonder Google Adwords.",
    naam: "M. Kleinjans",
    bedrijf: "Snelontruiming",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70",
  },
  {
    sterren: 5,
    tekst: "Mijn website werd geredesignd met mooie foto's, goed vindbaar op Google en alle sociale netwerken werden ook bijgehouden.",
    naam: "Runee",
    bedrijf: "Bangkokwellness",
    foto: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=70",
  },
  {
    sterren: 5,
    tekst: "Snelle, persoonlijke service en een prachtige website die precies bij mijn praktijk past. Een echte aanrader.",
    naam: "Ren Ji Tang",
    bedrijf: "Acupunctuur & TCM",
    foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=70",
  },
];

const REN_JI_TAGS = ["Next.js", "Tailwind CSS", "AVG-compliant", "Online Boeking", "SEO"];

function RevealSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px 0px -64px 0px" }}
      transition={{ duration: 0.52, ease: easeOut }}
    >
      {children}
    </motion.section>
  );
}

function MigrationStatsBackgroundLogo({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-24 w-24 shrink-0 md:h-32 md:w-32"
      style={{ fill: MIGRATION_LOGO_COLORS[icon.slug] ?? "#64748B", opacity: 0.42 }}
      aria-hidden
    >
      <path d={icon.path} />
    </svg>
  );
}

function MigrationStatsBackgroundLogos() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 md:gap-4">
        <div className="flex w-full min-w-[760px] justify-around px-4">
          {MIGRATION_LOGO_ROW_1.map((icon) => (
            <MigrationStatsBackgroundLogo key={icon.slug} icon={icon} />
          ))}
        </div>
        <div className="flex w-full min-w-[760px] translate-x-8 justify-around px-4">
          {MIGRATION_LOGO_ROW_2.map((icon) => (
            <MigrationStatsBackgroundLogo key={`${icon.slug}-stats`} icon={icon} />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gray-900/25 backdrop-blur-[1px]" />
    </div>
  );
}

/* ---------- Hero — centered, accent #3B6D11 ---------- */
const HERO_ACCENT = "#3B6D11";

const HERO_CHECKS = ["AVG-compliant", "SEO & hosting inbegrepen", "Reactie binnen 1 werkdag"];

function OrchidHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundColor: "rgba(255,255,255,0.82)" }}
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-32 text-center md:px-10 md:pb-28 md:pt-36">
        <motion.div
          className="flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <span
            className="font-lato inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em]"
            style={{
              color: HERO_ACCENT,
              borderColor: "rgba(59,109,17,0.25)",
              backgroundColor: "rgba(59,109,17,0.06)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: HERO_ACCENT }} aria-hidden />
            ✦ Persoonlijk · Professioneel · Nederland
          </span>

          <h1 className="font-sora mt-7 text-[clamp(2.4rem,6.5vw,4.25rem)] font-black leading-[1.08] tracking-[-0.03em] text-neutral-dark">
            Een website die{" "}
            <span style={{ color: HERO_ACCENT }}>écht werkt</span>.
          </h1>

          <p className="font-lato mt-6 max-w-xl text-lg leading-relaxed text-gray-600 md:text-xl">
            Allesis bouwt websites die gevonden worden — door mensen én door AI. Hosting, SEO
            en AVG inbegrepen. Persoonlijk contact, vaste prijs.
          </p>

          <form
            action="/contact"
            method="get"
            className="mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <label htmlFor="hero-email" className="sr-only">
              E-mailadres
            </label>
            <input
              id="hero-email"
              name="email"
              type="email"
              required
              placeholder="Wat voor bedrijf heb jij?"
              className="font-lato min-h-[54px] flex-1 rounded-full border border-gray-200 bg-white px-5 text-base text-neutral-dark outline-none placeholder:text-gray-400 focus:border-[#3B6D11] focus:ring-2 focus:ring-[#3B6D11]/20"
            />
            <button
              type="submit"
              className="font-lato inline-flex min-h-[54px] shrink-0 items-center justify-center rounded-full px-7 text-base font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: HERO_ACCENT }}
            >
              Gratis gesprek
            </button>
          </form>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {HERO_CHECKS.map((item) => (
              <li key={item} className="font-lato flex items-center gap-2 text-sm text-gray-600">
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: HERO_ACCENT }}
                  aria-hidden
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePageContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <CookieConsent />

      {/* Sectie 1 — Hero */}
      <OrchidHero />

      {/* Trust badges */}
      <div
        className="flex items-center justify-center bg-white"
        style={{ padding: "16px 32px", borderBottom: "0.5px solid #e5e7eb" }}
      >
        {[
          { icon: "⭐", value: "4.9/5", label: "Google Reviews" },
          { icon: "🔒", value: "Gecertificeerd", label: "AVG Compliant" },
          { icon: "⚡", value: "98/100", label: "PageSpeed" },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center">
            {i > 0 ? (
              <div className="mx-6 h-8 w-px shrink-0 self-center" style={{ backgroundColor: "#e5e7eb" }} aria-hidden />
            ) : null}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5" style={{ fontSize: 18, fontWeight: 600, color: "#111" }}>
                <span aria-hidden>{item.icon}</span>
                <span>{item.value}</span>
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* AI vindbaarheid */}
      <div
        className="flex flex-wrap items-center justify-center gap-3"
        style={{ backgroundColor: "#EAF3DE", padding: "14px 32px" }}
      >
        <span style={{ fontSize: 13, color: "#3B6D11", fontWeight: 500 }}>✦ Jouw website vindbaar via AI</span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {AI_STRIP_ITEMS.map((item) => (
            <span
              key={item.naam}
              className="inline-flex items-center gap-1.5"
              style={{
                height: 32,
                fontSize: 12,
                color: "#3B6D11",
                backgroundColor: "#fff",
                border: "1px solid #C0DD97",
                borderRadius: 20,
                padding: "0 12px",
              }}
            >
              {item.variant === "circle" ? (
                <span
                  className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black"
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" width={10} height={10} style={{ fill: item.color }}>
                    <path d={item.icon.path} />
                  </svg>
                </span>
              ) : item.variant === "gradient" ? (
                <svg viewBox="0 0 24 24" width={16} height={16} className="shrink-0" aria-hidden>
                  <defs>
                    <linearGradient id="copilot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00A4EF" />
                      <stop offset="40%" stopColor="#8764B8" />
                      <stop offset="70%" stopColor="#F25022" />
                      <stop offset="100%" stopColor="#7FBA00" />
                    </linearGradient>
                  </defs>
                  <path d={item.icon.path} fill="url(#copilot-grad)" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  className="shrink-0"
                  style={{ fill: item.color }}
                  aria-hidden
                >
                  <path d={item.icon.path} />
                </svg>
              )}
              {item.naam}
            </span>
          ))}
        </div>
      </div>

      {/* Sectie 2 — Prominente migratie service */}
      <section className="border-y border-gray-100 bg-white px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#3B6D11" }}>
              ⚡ Migratie service
            </p>
            <h2 className="font-sora mb-4 text-4xl font-black text-neutral-dark">Klaar met uw huidige platform?</h2>
            <p className="mx-auto max-w-xl text-gray-500">
              WordPress traag? Wix te duur? Shopify eet uw winst op? Allesis migreert uw site naar Next.js — snel,
              veilig en betaalbaar.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              {
                naam: "WordPress",
                slug: "wordpress",
                icon: siWordpress,
                color: "#21759B",
                pijn: "Traag & onveilig",
                borderKleur: "border-[#C5D9A8] hover:border-[#3B6D11]",
              },
              {
                naam: "Wix",
                slug: "wix",
                icon: siWix,
                color: "#FAAD00",
                pijn: "Niet van u",
                borderKleur: "border-yellow-200 hover:border-yellow-400",
              },
              {
                naam: "Shopify",
                slug: "shopify",
                icon: siShopify,
                color: "#96BF48",
                pijn: "€299/mnd",
                borderKleur: "border-green-200 hover:border-green-400",
              },
              {
                naam: "Squarespace",
                slug: "squarespace",
                icon: siSquarespace,
                color: "#000000",
                pijn: "Beperkt maatwerk",
                borderKleur: "border-gray-300 hover:border-gray-500",
              },
              {
                naam: "Webflow",
                slug: "webflow",
                icon: siWebflow,
                color: "#4353FF",
                pijn: "Te technisch & duur",
                borderKleur: "border-indigo-200 hover:border-indigo-400",
              },
              {
                naam: "Joomla",
                slug: "joomla",
                icon: siJoomla,
                color: "#F4A818",
                pijn: "Verouderd",
                borderKleur: "border-orange-200 hover:border-orange-400",
              },
            ].map((p) => (
              <Link
                key={p.naam}
                href={`/migratie-aanvragen?platform=${p.slug}`}
                className={`rounded-2xl border-2 bg-white p-5 text-center transition-all hover:scale-105 hover:shadow-md ${p.borderKleur}`}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  width={32}
                  height={32}
                  className="mx-auto mb-2"
                  style={{ fill: p.color }}
                  aria-hidden
                >
                  <path d={p.icon.path} />
                </svg>
                <div className="text-sm font-black text-gray-900">{p.naam}</div>
                <div className="mt-1 text-xs font-semibold text-red-500">❌ {p.pijn}</div>
                <div className="mt-1 text-xs font-bold text-green-600">→ Next.js</div>
              </Link>
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:flex-row">
            <MigrationStatsBackgroundLogos />
            <div className="relative z-10 flex flex-wrap justify-center gap-10">
              {[
                { getal: "€299", label: "Vanaf", kleur: "text-[#C8FF00]" },
                { getal: "<3s", label: "Laadtijd", kleur: "text-green-400" },
                { getal: "95+", label: "PageSpeed", kleur: "text-[#3B6D11]" },
                { getal: "100%", label: "SEO behoud", kleur: "text-white" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-3xl font-black ${stat.kleur}`}>{stat.getal}</div>
                  <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="relative z-10 flex-1 md:text-right">
              <Link
                href="/migratie-aanvragen"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C8FF00] px-8 py-4 text-base font-black text-gray-900 transition-colors hover:bg-[#B4EF00]"
              >
                ⚡ Start uw migratie →
              </Link>
              <p className="mt-3 text-xs text-gray-500">Vrijblijvende offerte · Binnen 1 werkdag reactie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectie 4 — Pakketten (Gratis / Starter / Maatwerk) */}
      <RevealSection className="px-6 py-[110px] md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Pakketten</p>
            <h2 className="font-sora mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-neutral-dark">
              Een pakket voor elke ondernemer
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PAKKETTEN.map((pakket) => (
              <div
                key={pakket.naam}
                className={`group relative overflow-hidden rounded-3xl ${
                  pakket.featured ? "scale-105 ring-2 ring-blue-400" : ""
                }`}
                style={{ minHeight: "520px" }}
              >
                <Image
                  src={pakket.foto}
                  alt={pakket.naam}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  priority={false}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${pakket.gradient}`} aria-hidden />
                <div className="absolute inset-0 flex flex-col p-7">
                  <p className={`mb-3 text-xs font-black uppercase tracking-widest ${pakket.badgeKleur}`}>
                    {pakket.badge}
                  </p>
                  <h3 className="font-sora mb-2 text-2xl font-black text-white">{pakket.naam}</h3>
                  <p className="mb-1 text-4xl font-black tracking-tight text-white">{pakket.prijs}</p>
                  <p className="mb-6 text-xs text-white/50">{pakket.prijsDetail}</p>
                  <ul className="flex flex-1 flex-col gap-2">
                    {pakket.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="mt-0.5 flex-shrink-0 font-bold text-green-400" aria-hidden>
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={pakket.ctaHref}
                    className={`mt-6 block rounded-xl px-6 py-3 text-center font-black transition-all hover:scale-105 ${pakket.ctaStijl}`}
                  >
                    {pakket.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <GratisVoorwaardenNote className="mt-10 text-center" />
          <p className="font-lato mt-2 text-center text-xs text-neutral-mid/80">
            ** Online binnen 24 uur geldt bij tijdige aanlevering van content en logo op een werkdag.
          </p>
        </div>
      </RevealSection>

      {/* Sectie 4 — Diensten */}
      <section className="scroll-mt-20 bg-neutral-light px-6 py-[110px] md:px-10">
        <div id="home-diensten-reveal" className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px 0px -64px 0px" }}
            transition={{ duration: 0.52, ease: easeOut }}
          >
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Wat wij doen</p>
            <h2 className="font-sora mt-3 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-neutral-dark">
              Alles voor uw online aanwezigheid
            </h2>
          </motion.div>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {DIENSTEN.map((dienst) => (
              <Link
                key={dienst.naam}
                href={dienst.href}
                className="group relative block h-64 overflow-hidden rounded-2xl"
              >
                <Image
                  src={dienst.foto}
                  alt={dienst.naam}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  priority={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${dienst.gradient}`} />
                <div className="absolute right-0 bottom-0 left-0 p-5">
                  <span className="mb-2 block text-2xl" aria-hidden>
                    {dienst.emoji}
                  </span>
                  <h3 className="font-sora mb-1 text-lg font-black text-white">{dienst.naam}</h3>
                  <p className="font-lato text-sm leading-relaxed text-white/70">{dienst.beschrijving}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-white/90 transition-all group-hover:gap-2">
                    Meer info →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sectie 5 — Branches */}
      <RevealSection className="px-6 py-[110px] md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Voor uw branche</p>
            <h2 className="font-sora mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-neutral-dark">
              Websites die uw vak begrijpen
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {BRANCHES.map((branche, index) => (
              <Link
                key={branche.naam}
                href={branche.href}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={branche.foto}
                  alt={branche.naam}
                  fill
                  loading={index < 6 ? "eager" : "lazy"}
                  priority={false}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${branche.gradient} transition-opacity group-hover:opacity-90`}
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <span className="mb-1 text-xl" aria-hidden>
                    {branche.icon}
                  </span>
                  <h3 className="mb-1 text-sm font-black leading-tight text-white md:text-base">{branche.naam}</h3>
                  <p className="hidden text-xs leading-snug text-white/60 md:block">{branche.beschrijving}</p>
                  <span className="mt-1 text-xs text-white/50 transition-colors group-hover:text-white/90">
                    Bekijk →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Sectie 6 — Portfolio */}
      <RevealSection className="bg-neutral-light px-6 py-[110px] md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Portfolio</p>
            <h2 className="font-sora mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-neutral-dark">
              Recent opgeleverd
            </h2>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Saved Souls Foundation */}
            <article className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-14px_rgba(10,15,30,0.14)] ring-1 ring-black/5">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/savedsouls-screenshot.png"
                  alt="Website van Saved Souls Foundation"
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-8">
                <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-ssf-orange">🐾 Goed doel</p>
                <h3 className="font-sora mt-2 text-xl font-bold text-neutral-dark">Saved Souls Foundation</h3>
                <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
                  Meertalige website voor de dierenopvang in Khon Kaen, Thailand — met donatiemodule en verhalen van
                  geredde dieren.
                </p>
                <a
                  href="https://www.savedsouls-foundation.org/nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-lato mt-5 inline-block font-bold text-primary hover:underline"
                >
                  Bekijk de website →
                </a>
              </div>
            </article>

            {/* Ren Ji Tang */}
            <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-14px_rgba(10,15,30,0.14)] ring-1 ring-black/5">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/portfolio/renjitang.jpg"
                  alt="Ren Ji Tang — Acupunctuur & TCM website"
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  priority={false}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Uitgelicht project</p>
                <h3 className="font-sora mt-2 text-xl font-bold text-neutral-dark">Ren Ji Tang — Acupunctuur &amp; TCM</h3>
                <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
                  Complete Next.js website met online boekingsmodule en Google-reviews. Volledig AVG-compliant. Resultaat:
                  5 sterren op Google.
                </p>
                <ul className="font-lato mt-4 flex flex-wrap gap-2">
                  {REN_JI_TAGS.map((t) => (
                    <li key={t} className="rounded-full border border-neutral-light bg-neutral-light px-3 py-1 text-xs font-medium text-neutral-mid">
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.renjitang.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-lato mt-5 inline-block font-bold text-primary hover:underline"
                >
                  Bekijk de website →
                </a>
              </div>
            </article>
          </div>
        </div>
      </RevealSection>

      {/* Sectie 7 — SSF Missie */}
      <SSFMissie />

      {/* Sectie 8 — Werkwijze */}
      <RevealSection className="px-6 py-[110px] md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Werkwijze</p>
            <h2 className="font-sora mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-neutral-dark">
              Van idee tot live in 4 stappen
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {WERKWIJZE.map((stap) => (
              <div key={stap.nummer} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={stap.foto}
                  alt={stap.titel}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  priority={false}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/60 to-blue-900/20" />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <span className="font-sora text-4xl font-black text-white/20">{stap.nummer}</span>
                  <div>
                    <h3 className="font-sora mb-2 text-lg font-black text-white">{stap.titel}</h3>
                    <p className="font-lato text-sm leading-relaxed text-white/70">{stap.beschrijving}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Sectie 9 — Reviews */}
      <RevealSection className="relative overflow-hidden bg-neutral-light px-6 py-[110px] md:px-10">
        <div className="relative mx-auto max-w-6xl">
          <h2 className="font-sora text-center text-[clamp(2rem,4vw,3rem)] font-extrabold text-neutral-dark">
            Wat klanten zeggen
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <div
                key={review.naam}
                className="group relative min-h-[320px] overflow-hidden rounded-2xl"
              >
                <Image
                  src={review.foto}
                  alt={review.bedrijf}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  priority={false}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/98 via-gray-900/70 to-gray-900/30" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="mb-3 flex gap-1" aria-label={`${review.sterren} van 5 sterren`}>
                    {Array.from({ length: review.sterren }).map((_, i) => (
                      <span key={i} className="text-lg text-amber-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="font-lato mb-4 text-sm italic leading-relaxed text-white/90">
                    &ldquo;{review.tekst}&rdquo;
                  </p>
                  <div className="border-t border-white/20 pt-3">
                    <p className="font-sora text-sm font-black text-white">{review.naam}</p>
                    <p className="font-lato text-xs text-white/50">{review.bedrijf}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Sectie 10 — FAQ */}
      <FAQGrid
        gradient="from-blue-900/95 via-blue-900/80 to-blue-800/60"
        items={HOME_FAQ_GRID}
      />

      {/* Sectie 11 — AVG Check */}
      <RevealSection className="bg-accent px-6 py-[110px] md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sora text-[clamp(1.75rem,3vw,3rem)] font-extrabold tracking-tight text-neutral-dark">
            Weet u of uw website AVG-compliant is?
          </h2>
          <p className="font-lato mx-auto mt-5 max-w-xl text-lg font-light text-neutral-dark/80">
            Voer uw domeinnaam in en ontvang direct een gratis rapport.
          </p>
          <form action="/avg-check" method="get" className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label htmlFor="home-avg-domein" className="sr-only">
              Domeinnaam
            </label>
            <input
              id="home-avg-domein"
              name="domein"
              type="text"
              placeholder="uwbedrijf.nl"
              className="font-lato border-primary-dark/15 focus:border-primary-dark focus:ring-primary-dark/25 min-h-[56px] flex-1 rounded-xl border-2 bg-white px-5 text-lg text-neutral-dark placeholder:text-neutral-mid/70 outline-none focus:ring-2"
            />
            <motion.button
              type="submit"
              className="font-lato bg-neutral-dark hover:bg-primary-dark min-h-[56px] rounded-xl px-8 text-lg font-bold text-white transition-colors"
              whileHover={{ scale: 1.05, transition: transitionSnappy }}
              whileTap={{ scale: 0.98, transition: transitionSnappy }}
            >
              Check nu gratis
            </motion.button>
          </form>
          <p className="font-lato mt-6 text-sm font-light text-neutral-dark/70">
            Geen registratie vereist · Direct resultaat · 100% gratis
          </p>
        </div>
      </RevealSection>

      {/* Sectie 12 — CTA */}
      <RevealSection className="relative overflow-hidden px-6 py-24 md:px-16">
        <Image
          src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=75"
          alt="Thailand achtergrond"
          fill
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0" style={{ backgroundColor: "rgba(47,86,16,0.88)" }} />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
            <Image
              src="/images/logo1024x1024.png"
              alt="Saved Souls Foundation"
              width={24}
              height={24}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority={false}
              className="h-6 w-6 object-contain"
            />
            <span className="font-lato text-xs font-bold text-white/80">
              Elke website steunt Saved Souls Foundation 🐾
            </span>
          </div>

          <h2 className="font-sora mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
            Klaar voor een website
            <br />
            <span className="text-[#C8FF00]">die wél gevonden wordt?</span>
          </h2>

          <p className="font-lato mx-auto mb-10 max-w-xl text-lg text-white/60">
            Neem contact op — we reageren binnen één werkdag.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="font-lato rounded-xl bg-white px-8 py-4 font-black transition-colors hover:bg-gray-100"
              style={{ color: "#3B6D11" }}
            >
              Stuur een bericht →
            </Link>
            <Link
              href="/gratis-website"
              className="font-lato rounded-xl bg-[#C8FF00] px-8 py-4 font-black text-gray-900 transition-colors hover:bg-[#B4EF00]"
            >
              🐾 Gratis one-pager*
            </Link>
          </div>

          <div className="mt-12 flex justify-center gap-12 border-t border-white/15 pt-10">
            <div className="text-center">
              <div className="font-sora text-3xl font-black text-white">50+</div>
              <div className="font-lato mt-1 text-xs text-white/40">Websites opgeleverd</div>
            </div>
            <div className="text-center">
              <div className="font-sora text-3xl font-black text-white">10+</div>
              <div className="font-lato mt-1 text-xs text-white/40">Jaar ervaring</div>
            </div>
            <div className="text-center">
              <div className="font-sora text-3xl font-black text-[#C8FF00]">24u**</div>
              <div className="font-lato mt-1 text-xs text-white/40">Online mogelijk</div>
            </div>
            <div className="text-center">
              <div className="font-sora text-3xl font-black text-green-400">100%</div>
              <div className="font-lato mt-1 text-xs text-white/40">AVG-compliant</div>
            </div>
          </div>

          <p className="font-lato mt-8 text-xs text-white/25">
            * Zie{" "}
            <Link href="/voorwaarden" className="underline hover:text-white/50">
              voorwaarden
            </Link>{" "}
            · ** Bij tijdige aanlevering content en logo
          </p>
        </div>
      </RevealSection>
    </motion.div>
  );
}
