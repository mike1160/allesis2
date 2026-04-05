import Image from "next/image";
import Link from "next/link";
import CookieConsent from "@/components/CookieConsent";

const pakketten = [
  {
    naam: "Lite",
    prijs: "8,95",
    features: ["1.000 MB schijfruimte", "20 GB dataverkeer", "5 e-mailaccounts", "1 MySQL database", "SSL certificaat", "Helpdesk"],
    disclaimer: "Prijzen excl. BTW. Jaarlijks gefactureerd.",
  },
  {
    naam: "Start Up",
    prijs: "12,95",
    highlight: true,
    features: ["4.000 MB schijfruimte", "80 GB dataverkeer", "10 e-mailaccounts", "2 MySQL databases", "SSL certificaat", "Helpdesk"],
    disclaimer: "Prijzen excl. BTW. Jaarlijks gefactureerd.",
  },
  {
    naam: "Plus",
    prijs: "17,95",
    features: ["8.000 MB schijfruimte", "320 GB dataverkeer", "50 e-mailaccounts", "2 MySQL databases", "SSL certificaat", "Helpdesk"],
    disclaimer: "Prijzen excl. BTW. Jaarlijks gefactureerd.",
  },
];

const diensten = [
  {
    icon: "🎨",
    titel: "Webdesign",
    tekst: "Van idee tot live website in 4 weken. Modern, snel en mobielvriendelijk.",
    href: "/webdesign",
  },
  {
    icon: "🔒",
    titel: "AVG & Compliance",
    tekst: "Wij leveren elke website AVG-compliant op. Privacybeleid, cookiebanner, SSL.",
    href: "/avg-regelgeving",
  },
  {
    icon: "🌐",
    titel: "Hosting & Domeinen",
    tekst: "Snelle Nederlandse hosting vanaf €8,95/mnd. Alles onder één dak.",
    href: "/hosting",
  },
  {
    icon: "🔎",
    titel: "SEO & Vindbaarheid",
    tekst: "Gevonden worden in Google én door AI-assistenten zoals ChatGPT en Perplexity.",
    href: "/webdesign",
  },
];

const reviews = [
  {
    quote: "Dankzij Allesis staat mijn website al jaren bij de eerste 3 zoekresultaten van Google — zonder Google Adwords.",
    naam: "M. Kleinjans",
    bedrijf: "Snelontruiming",
  },
  {
    quote: "Mijn website werd geredesignd met mooie foto's, goed vindbaar op Google en alle sociale netwerken werden ook bijgehouden.",
    naam: "Runee",
    bedrijf: "Bangkokwellness",
  },
];

const renJiTags = ["Next.js", "Tailwind CSS", "AVG-compliant", "Online Boeking", "SEO"];

export default function Home() {
  return (
    <>
      <CookieConsent />

      {/* Sectie 1 — Hero */}
      <section
        className="grain-dark flex min-h-[100dvh] flex-col justify-center bg-neutral-dark px-6 pb-28 pt-28 md:px-10 md:pb-32 md:pt-32"
        style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
      >
        <Image
          src="/images/allesis-header.webp"
          alt="Allesis webdesign hero"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #0a0f1e 40%, rgba(10,15,30,0.7) 70%, rgba(10,15,30,0.3) 100%)",
          }}
        />
        <div
          className="flex min-h-[100dvh] w-full flex-1 flex-col justify-center"
          style={{ position: "relative", zIndex: 10 }}
        >
          <div className="relative z-[1] mx-auto w-full max-w-6xl">
            <h1
              className="font-sora fu1 max-w-4xl text-[clamp(2.5rem,8vw,6rem)] font-black leading-[1.05] tracking-tight text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Uw nieuwe website. Gevonden. Compliant.
            </h1>
            <p
              className="font-lato fu2 mt-6 max-w-2xl text-xl font-light leading-relaxed text-white/70 md:text-[20px]"
              style={{
                fontWeight: 500,
                maxWidth: "520px",
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              Allesis bouwt snelle websites voor het MKB — inclusief hosting, SEO en AVG-compliance. Gevestigd in Haarlem.
            </p>
            <div
              className="fu3 mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "340px",
              }}
            >
              <Link
                href="/contact"
                className="font-lato inline-flex min-h-[52px] items-center justify-center rounded-xl bg-accent px-8 text-base font-bold text-neutral-dark transition hover:brightness-95"
              >
                Nieuwe website aanvragen
              </Link>
              <Link
                href="/recent-websites"
                className="font-lato inline-flex min-h-[52px] items-center justify-center rounded-xl border-2 border-white/90 bg-transparent px-8 text-base font-bold text-white transition hover:bg-white/10"
              >
                Bekijk ons werk
              </Link>
            </div>
          </div>

          <a
            href="https://www.renjitang.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="fu4 font-lato relative z-[1] mt-14 flex max-w-full items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white/90 shadow-lg backdrop-blur-md transition hover:border-accent/50 hover:bg-white/10 sm:max-w-[280px] md:absolute md:right-10 md:bottom-10 md:mt-0"
          >
            <span className="text-accent mt-0.5 shrink-0 text-lg" aria-hidden>
              ↗
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/50">Laatste project</span>
              <span className="font-sora mt-1 block font-bold text-white">Ren Ji Tang</span>
            </span>
          </a>
        </div>
      </section>

      {/* Sectie 2 — Social proof */}
      <section className="border-b border-black/5 bg-neutral-light px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-12">
          <p className="font-lato text-center text-base font-semibold text-neutral-dark lg:text-left">
            <span className="text-amber-500" aria-hidden>
              ★★★★★
            </span>{" "}
            Beoordeeld door klanten
          </p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-14">
            {[
              { n: "10+", l: "Jaar ervaring" },
              { n: "50+", l: "Websites opgeleverd" },
              { n: "100%", l: "AVG-compliant delivery" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-sora text-3xl font-extrabold text-primary md:text-4xl">{s.n}</div>
                <div className="font-lato mt-1 text-sm font-light text-neutral-mid">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-80 grayscale contrast-125 md:justify-end">
            <Image src="/next.svg" alt="Next.js" width={90} height={22} className="h-5 w-auto brightness-0" />
            <Image src="/vercel.svg" alt="Vercel" width={90} height={22} className="h-4 w-auto brightness-0" />
            <span className="font-sora text-xs font-bold uppercase tracking-wider text-neutral-mid">SSL</span>
            <span className="font-sora text-sm font-bold text-neutral-mid">Google</span>
          </div>
        </div>
      </section>

      {/* Sectie 3 — Diensten */}
      <section className="scroll-mt-20 px-6 py-[120px] md:px-10">
        <div className="relative mx-auto max-w-6xl">
          <span
            className="font-sora pointer-events-none absolute -left-2 top-0 hidden text-[120px] font-black leading-none text-neutral-light select-none xl:-left-4 xl:block"
            aria-hidden
          >
            01
          </span>
          <div className="relative z-[1]">
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Wat wij doen</p>
            <h2 className="font-sora mt-3 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-neutral-dark">
              Alles voor uw online aanwezigheid
            </h2>
            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {diensten.map((d) => (
                <article
                  key={d.titel}
                  className="group rounded-2xl border-2 border-transparent bg-white p-8 shadow-[0_12px_40px_-12px_rgba(10,15,30,0.12)] transition hover:border-primary hover:shadow-[0_20px_50px_-12px_rgba(26,59,204,0.18)]"
                >
                  <div className="text-3xl" aria-hidden>
                    {d.icon}
                  </div>
                  <h3 className="font-sora mt-4 text-[32px] font-bold text-neutral-dark">{d.titel}</h3>
                  <p className="font-lato mt-3 text-lg font-light leading-relaxed text-neutral-mid">{d.tekst}</p>
                  <Link
                    href={d.href}
                    className="font-lato mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary transition group-hover:text-primary-dark"
                  >
                    Meer info <span aria-hidden>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sectie 4 — Ren Ji Tang */}
      <section className="grain-dark relative overflow-hidden bg-neutral-dark px-6 py-[120px] md:px-10">
        <div className="relative z-[1] mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="font-lato text-xs font-bold uppercase tracking-[0.2em] text-accent">Uitgelicht project</p>
            <h2 className="font-sora mt-4 text-[clamp(1.75rem,3vw,3rem)] font-extrabold leading-tight text-white">
              Ren Ji Tang — Acupunctuur &amp; TCM &apos;s-Hertogenbosch
            </h2>
            <p className="font-lato mt-6 text-lg font-light leading-relaxed text-white/70">
              Een complete Next.js website voor een acupunctuurpraktijk. Online boekingsmodule, Google reviews integratie,
              volledig AVG-compliant. Resultaat: 5 sterren op Google.
            </p>
            <ul className="font-lato mt-8 flex flex-wrap gap-2">
              {renJiTags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-medium text-white/85"
                >
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="https://www.renjitang.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-lato mt-10 inline-flex min-h-[48px] items-center font-bold text-accent underline-offset-4 transition hover:underline"
            >
              Bekijk de website →
            </a>
          </div>
          <div className="relative">
            <span
              className="font-sora pointer-events-none absolute -right-4 -top-8 hidden text-[100px] font-black text-white/[0.06] select-none lg:block"
              aria-hidden
            >
              02
            </span>
            <div className="relative overflow-hidden rounded-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
              <Image
                src="/images/renjitang-preview.jpg"
                alt="Screenshot van de website renjitang.nl"
                width={1200}
                height={675}
                className="h-auto w-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sectie 5 — AVG Check */}
      <section className="bg-accent px-6 py-[120px] md:px-10">
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
            <button
              type="submit"
              className="font-lato bg-neutral-dark hover:bg-primary-dark min-h-[56px] rounded-xl px-8 text-lg font-bold text-white transition-colors"
            >
              Check nu gratis
            </button>
          </form>
          <p className="font-lato mt-6 text-sm font-light text-neutral-dark/70">
            Geen registratie vereist · Direct resultaat · 100% gratis
          </p>
        </div>
      </section>

      {/* Sectie 6 — Reviews */}
      <section className="relative overflow-hidden px-6 py-[120px] md:px-10">
        <div className="relative mx-auto max-w-6xl">
          <span
            className="font-sora pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 text-[clamp(100px,28vw,200px)] font-black leading-none text-neutral-light select-none"
            aria-hidden
          >
            “
          </span>
          <h2 className="font-sora relative z-[1] text-center text-[clamp(2rem,4vw,3rem)] font-extrabold text-neutral-dark">
            Wat klanten zeggen
          </h2>
          <div className="relative z-[1] mt-16 grid gap-8 md:grid-cols-2">
            {reviews.map((r) => (
              <article
                key={r.naam}
                className="rounded-2xl bg-neutral-light/80 p-10 shadow-[0_8px_32px_-12px_rgba(10,15,30,0.1)] backdrop-blur-sm"
              >
                <p className="text-amber-500 text-lg" aria-label="5 van 5 sterren">
                  ★★★★★
                </p>
                <p className="font-lato relative z-[1] mt-6 text-lg font-normal leading-relaxed text-neutral-dark">
                  {r.quote}
                </p>
                <footer className="mt-8">
                  <span className="font-sora font-bold text-neutral-dark">{r.naam}</span>
                  <span className="font-lato text-neutral-mid"> · {r.bedrijf}</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sectie 7 — Hosting */}
      <section className="bg-neutral-light px-6 py-[120px] md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Hosting</p>
            <h2 className="font-sora mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold text-neutral-dark">
              Pakketten die meegroeien
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pakketten.map((p) => (
              <div
                key={p.naam}
                className={`flex flex-col rounded-2xl p-8 transition ${
                  p.highlight
                    ? "bg-primary text-white shadow-[0_20px_50px_-12px_rgba(26,59,204,0.45)]"
                    : "border-2 border-transparent bg-white shadow-[0_8px_30px_-10px_rgba(10,15,30,0.08)] hover:border-primary"
                }`}
              >
                {p.highlight ? (
                  <p className="font-lato text-[11px] font-bold uppercase tracking-[0.12em] text-white/70">Meest gekozen</p>
                ) : null}
                <h3 className={`font-sora mt-2 text-xl font-bold ${p.highlight ? "text-white" : "text-neutral-dark"}`}>
                  {p.naam}
                </h3>
                <div className="mt-4">
                  <span className={`font-sora text-4xl font-extrabold ${p.highlight ? "text-white" : "text-primary"}`}>
                    € {p.prijs}
                  </span>
                  <span className={`font-lato ml-1 text-sm ${p.highlight ? "text-white/70" : "text-neutral-mid"}`}>
                    /mnd
                  </span>
                </div>
                <ul className="mt-8 flex flex-1 flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`font-lato flex items-start gap-2 text-sm ${
                        p.highlight ? "text-white/90" : "text-neutral-mid"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0 text-[#16a34a]" aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className={`font-lato mt-6 text-[11px] ${p.highlight ? "text-white/60" : "text-neutral-mid/80"}`}>
                  {p.disclaimer}
                </p>
                <Link
                  href="/contact"
                  className={`font-lato mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl text-center text-sm font-bold transition ${
                    p.highlight
                      ? "bg-white text-primary hover:bg-neutral-light"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  Bestel nu →
                </Link>
              </div>
            ))}
          </div>
          <p className="font-lato mt-10 text-center text-sm text-neutral-mid">
            * Alle prijzen zijn excl. BTW en worden jaarlijks gefactureerd. Zie onze{" "}
            <Link href="/disclaimer" className="font-semibold text-primary hover:underline">
              disclaimer
            </Link>{" "}
            voor volledige voorwaarden.
          </p>
        </div>
      </section>

      {/* Sectie 8 — CTA */}
      <section className="bg-primary px-6 py-[120px] md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-sora text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">
            Klaar voor een website die wél gevonden wordt?
          </h2>
          <p className="font-lato mt-5 text-lg font-light text-white/70">Neem contact op — we reageren binnen één werkdag.</p>
          <Link
            href="/contact"
            className="font-lato mt-10 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-10 text-base font-bold text-primary transition hover:bg-neutral-light"
          >
            Stuur een bericht
          </Link>
        </div>
      </section>
    </>
  );
}
