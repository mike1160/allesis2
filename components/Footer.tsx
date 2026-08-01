import Image from "next/image";
import Link from "next/link";
import {
  siNextdotjs,
  siCloudflare,
  siResend,
  siTailwindcss,
  siSupabase,
  siVercel,
  siTypescript,
  siGooglegemini,
  siAnthropic,
  siPerplexity,
  siMeta,
  type SimpleIcon,
} from "simple-icons";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";

const BUILT_WITH = [
  { icon: siNextdotjs, color: "#000000", naam: "Next.js" },
  { icon: siCloudflare, color: "#F97316", naam: "Cloudflare" },
  { icon: siResend, color: "#000000", naam: "Resend" },
  { icon: siTailwindcss, color: "#06B6D4", naam: "Tailwind" },
  { icon: siSupabase, color: "#3ECF8E", naam: "Supabase" },
  { icon: siVercel, color: "#000000", naam: "Vercel" },
  { icon: siTypescript, color: "#3178C6", naam: "TypeScript" },
] as const;

type AiItem =
  | { kind: "svg"; icon: SimpleIcon; color: string; naam: string }
  | { kind: "emoji"; emoji: string; naam: string };

const AI_ITEMS: AiItem[] = [
  { kind: "emoji", emoji: "💬", naam: "ChatGPT" },
  { kind: "svg", icon: siGooglegemini, color: "#4285F4", naam: "Gemini" },
  { kind: "svg", icon: siAnthropic, color: "#D4A27F", naam: "Claude" },
  { kind: "svg", icon: siPerplexity, color: "#20808D", naam: "Perplexity" },
  { kind: "svg", icon: siMeta, color: "#0866FF", naam: "Meta AI" },
  { kind: "emoji", emoji: "🤖", naam: "Copilot" },
];

const TRUST_BADGES = [
  { emoji: "🔒", naam: "SSL/TLS" },
  { emoji: "📧", naam: "DKIM & SPF" },
  { emoji: "🛡️", naam: "WAF" },
  { emoji: "✅", naam: "AVG/GDPR" },
  { emoji: "⚡", naam: "CDN" },
  { emoji: "📊", naam: "Core Web Vitals" },
  { emoji: "🖼️", naam: "WebP" },
  { emoji: "♿", naam: "WCAG" },
  { emoji: "🔍", naam: "Schema.org" },
  { emoji: "🤖", naam: "llms.txt" },
  { emoji: "🗺️", naam: "Sitemap XML" },
  { emoji: "📈", naam: "Open Graph" },
] as const;

const branchLinks: [string, string][] = [
  ["Horeca", "/horeca"],
  ["Beauty", "/beauty"],
  ["Bouw", "/bouw"],
  ["Zorg & coaches", "/zorg"],
  ["ZZP'ers", "/zzp"],
  ["Non-profit", "/non-profit"],
  ["Webshops", "/webshop"],
  ["Tandartsen", "/tandarts"],
  ["Vastgoed", "/vastgoed"],
  ["Sport", "/sport"],
  ["Advocaten", "/advocaat"],
  ["Thaise ondernemers", "/thai"],
  ["Phuket & Thailand · ไทย 🇹🇭", "/th"],
];

const dienstLinks: [string, string][] = [
  ["Webdesign", "/webdesign"],
  ["WordPress migratie", "/wordpress-naar-nextjs"],
  ["Migratie aanvragen", "/migratie-aanvragen"],
  ["Hosting", "/hosting"],
  ["SEO", "/seo"],
  ["Domeinen", "/domeinen"],
  ["Vertaling", "/vertaling"],
  ["Thaise webdiensten", "/thai"],
  ["Gratis one-pager*", "/gratis-website"],
];

const avgLinks: [string, string][] = [
  ["AVG-compliance", "/avg"],
  ["AVG Regelgeving", "/avg-regelgeving"],
  ["AVG Boetes", "/avg-boetes"],
  ["Gratis AVG Check", "/avg-check"],
  ["Disclaimer", "/disclaimer"],
  ["Privacyverklaring", "/privacy"],
  ["Voorwaarden*", "/voorwaarden"],
];

const bottomLinks: [string, string][] = [
  ["Privacyverklaring", "/privacy"],
  ["Disclaimer", "/disclaimer"],
  ["Voorwaarden", "/voorwaarden"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* SSF BANNER — foto achtergrond */}
      <div className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=75"
          alt="Saved Souls Foundation"
          fill
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-900/85 to-green-800/70" />

        <div className="relative z-10 px-6 py-12 md:px-16">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-8">
            <Image
              src="/images/logo1024x1024.png"
              alt="Saved Souls Foundation"
              width={80}
              height={80}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority={false}
              className="h-20 w-20 flex-shrink-0 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-sora mb-2 text-xl font-black text-white">Saved Souls Foundation</h3>
              <p className="font-lato max-w-xl text-sm leading-relaxed text-white/60">
                Wij redden honden en katten in Thailand — ook verlamde en gehandicapte dieren die andere opvangen
                weigeren. Allesis steunt deze missie actief.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-3">
              <a
                href="https://www.savedsouls-foundation.org/nl/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="font-lato rounded-xl bg-green-500 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-green-400"
              >
                Doneer nu →
              </a>
              <a
                href="https://www.savedsouls-foundation.org/nl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-lato rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60"
              >
                Bezoek website →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER LINKS — lichtgrijs */}
      <div className="border-t border-gray-200 bg-gray-50 px-6 pb-8 pt-14 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-5">
            {/* Brand kolom */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white" style={{ backgroundColor: "#3B6D11" }}>
                  A
                </div>
                <span className="font-sora text-lg font-black text-gray-900">
                  Allesis<span style={{ color: "#3B6D11" }}>.nl</span>
                </span>
              </Link>
              <p className="font-lato mb-4 text-sm leading-relaxed text-gray-500">
                Webdesign, hosting en AVG-compliance voor het MKB — duidelijk, snel en betrouwbaar.
              </p>
              <p className="font-lato text-xs text-gray-400">Gevestigd in Haarlem, Nederland</p>
              <a
                href="mailto:info@allesis.nl"
                className="font-lato mt-3 block text-sm transition-colors hover:opacity-80"
                style={{ color: "#3B6D11" }}
              >
                info@allesis.nl
              </a>
            </div>

            {/* Branches */}
            <div>
              <p className="font-lato mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Branches</p>
              <div className="flex flex-col gap-2">
                {branchLinks.map(([label, href]) => (
                  <Link key={href} href={href} className="font-lato text-sm text-gray-500 transition-colors hover:text-gray-900">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Diensten */}
            <div>
              <p className="font-lato mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Diensten</p>
              <div className="flex flex-col gap-2">
                {dienstLinks.map(([label, href]) => (
                  <Link key={href} href={href} className="font-lato text-sm text-gray-500 transition-colors hover:text-gray-900">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* AVG */}
            <div>
              <p className="font-lato mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">AVG &amp; Juridisch</p>
              <div className="flex flex-col gap-2">
                {avgLinks.map(([label, href]) => (
                  <Link key={href} href={href} className="font-lato text-sm text-gray-500 transition-colors hover:text-gray-900">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="font-lato mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Contact</p>
              <div className="flex flex-col gap-2">
                <a href="mailto:info@allesis.nl" className="font-lato text-sm text-gray-500 transition-colors hover:text-gray-900">
                  info@allesis.nl
                </a>
                <Link href="/contact" className="font-lato text-sm font-bold transition-colors hover:opacity-80" style={{ color: "#3B6D11" }}>
                  Contactpagina →
                </Link>
                <Link
                  href="/gratis-website"
                  className="font-lato mt-2 text-sm font-bold text-green-600 transition-colors hover:text-green-700"
                >
                  🐾 Gratis website*
                </Link>
              </div>

              {/* Google reviews badge */}
              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-1 flex items-center gap-1" aria-label="5 van 5 sterren">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-sm text-amber-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="font-lato text-xs text-gray-500">Beoordeeld door klanten</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges — lichtgrijs */}
      <div className="border-t border-gray-200 bg-gray-100 px-6 py-10 md:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-center italic" style={{ fontSize: 13, color: "#6b7280" }}>
            Meer dan 20 technologieën, standaarden en certificeringen — inbegrepen bij elk project.
          </p>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Gebouwd met</span>
            {BUILT_WITH.map((item) => (
              <div
                key={item.naam}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3 flex-shrink-0" style={{ fill: item.color }} aria-hidden>
                  <path d={item.icon.path} />
                </svg>
                <span className="text-xs font-medium text-gray-500">{item.naam}</span>
              </div>
            ))}
          </div>

          <div className="mb-6 border-t border-gray-200" />

          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Vindbaar in AI</span>
            {AI_ITEMS.map((item) => (
              <div
                key={item.naam}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1"
              >
                {item.kind === "emoji" ? (
                  <span className="text-xs" aria-hidden>
                    {item.emoji}
                  </span>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-3 w-3 flex-shrink-0" style={{ fill: item.color }} aria-hidden>
                    <path d={item.icon.path} />
                  </svg>
                )}
                <span className="text-xs font-medium text-gray-500">{item.naam}</span>
              </div>
            ))}
          </div>

          <div className="mb-6 border-t border-gray-200" />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Gecertificeerd</span>
            {TRUST_BADGES.map((item) => (
              <div
                key={item.naam}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1"
              >
                <span className="text-xs" aria-hidden>
                  {item.emoji}
                </span>
                <span className="text-xs font-medium text-gray-500">{item.naam}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom balk */}
      <div className="border-t border-gray-200 bg-gray-100 px-6 py-5 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Allesis.nl · KvK 52339831 · Haarlem
          </p>
          <div className="flex flex-wrap gap-6">
            {bottomLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-xs text-gray-400 transition-colors hover:text-gray-700">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
