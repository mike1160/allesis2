import Image from "next/image";
import Link from "next/link";
import BrowserMockup from "@/components/BrowserMockup";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqPageSchema, buildServiceSchema } from "@/lib/json-ld";
import type { Sector } from "@/lib/sector-branches";
import { SITE_URL } from "@/lib/seo-config";

const GROEN = "#3B6D11";

const STAPPEN = [
  { n: "1", titel: "Kort gesprek", tekst: "15 minuten bellen of langskomen. U vertelt, wij luisteren." },
  { n: "2", titel: "Wij maken alles", tekst: "Ontwerp, teksten, foto's, domein, e-mail en Google-profiel." },
  { n: "3", titel: "U keurt goed", tekst: "U ziet de site vooraf en geeft uw wijzigingen door." },
  { n: "4", titel: "Live & zorgeloos", tekst: "Wij hosten, beveiligen en houden alles up-to-date." },
];

const AI_PUNTEN = [
  "Een aparte pagina voor elke dienst en vraag van uw klanten",
  "Structured data (schema.org) die Google en AI-assistenten direct begrijpen",
  "Snelle laadtijd en perfect op mobiel: belangrijke rankingfactoren",
  "Uw Google Bedrijfsprofiel ingericht en gekoppeld",
];

export default function SectorLayout({ sector: s }: { sector: Sector }) {
  const url = `${SITE_URL}/${s.slug}`;
  const v = s.voorbeeld;

  return (
    <div>
      <JsonLd
        data={[
          buildServiceSchema({
            id: `${url}#service`,
            name: `Website laten maken voor ${s.label.toLowerCase()}`,
            description: s.intro,
            url,
          }),
          buildFaqPageSchema(s.faq),
        ]}
      />

      {/* HERO */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden px-6 pb-20 pt-32 md:px-16">
        <Image src={s.heroFoto} alt="" fill priority className="object-cover" sizes="100vw" aria-hidden />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, rgba(10,12,18,0.88) 0%, rgba(10,12,18,0.62) 55%, rgba(10,12,18,0.25) 100%)" }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p className="font-lato inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur">
            <span aria-hidden>{s.icon}</span> Website voor {s.label.toLowerCase()}
          </p>
          <h1 className="font-sora mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[1.04] tracking-[-0.03em] text-white">
            {s.h1}{" "}
            <span className="text-accent">{s.h1Accent}</span>
          </h1>
          <p className="font-lato mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">{s.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={`/contact?branche=${s.slug}#offerte`}
              className="font-lato inline-flex min-h-[52px] items-center rounded-xl bg-accent px-7 font-bold text-neutral-dark transition hover:brightness-95"
            >
              Gratis kennismaking →
            </Link>
            <a
              href="#voorbeeld"
              className="font-lato inline-flex min-h-[52px] items-center rounded-xl border-2 border-white/70 px-7 font-bold text-white transition hover:bg-white/10"
            >
              Bekijk een voorbeeld
            </a>
          </div>
          <ul className="font-lato mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            {["Wij regelen alles", "Vaste prijs", "Gevonden in Google én AI", "Hosting €20 p/m incl. e-mail"].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <span className="text-accent" aria-hidden>✓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WAAROM HET BETER KAN */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Waarom het beter kan</p>
          <h2 className="font-sora mt-3 max-w-3xl text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-tight tracking-tight text-neutral-dark">
            De meeste websites in uw branche laten kansen liggen.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
            <div className="rounded-3xl border border-red-100 bg-red-50/60 p-7 md:p-8">
              <p className="font-sora text-lg font-bold text-neutral-dark">Zo gaat het nu vaak</p>
              <ul className="mt-5 space-y-4">
                {s.problemen.map((p) => (
                  <li key={p} className="font-lato flex gap-3 text-[15px] leading-relaxed text-gray-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-black text-red-600" aria-hidden>
                      ✕
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl p-7 text-white md:p-8" style={{ backgroundColor: s.accent }}>
              <p className="font-sora text-lg font-bold">Zo regelen wij het voor u</p>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                {s.oplossingen.map((o) => (
                  <li key={o.titel}>
                    <p className="font-sora flex items-center gap-2 font-bold">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs" aria-hidden>
                        ✓
                      </span>
                      {o.titel}
                    </p>
                    <p className="font-lato mt-1 text-sm leading-relaxed text-white/80">{o.tekst}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VOORBEELD */}
      <section id="voorbeeld" className="scroll-mt-24 bg-neutral-light px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Voorbeeld</p>
            <h2 className="font-sora mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold tracking-tight text-neutral-dark">
              Zo kan uw website eruitzien
            </h2>
            <p className="font-lato mx-auto mt-3 max-w-2xl text-gray-500">
              Een voorbeeldontwerp voor een fictief bedrijf. Uw site krijgt uw eigen naam, kleuren, foto&apos;s en teksten.
            </p>
          </div>

          <BrowserMockup url={`www.${v.domein}`} className="mx-auto mt-12 max-w-5xl">
            <div className="-m-4 overflow-hidden bg-white">
              {/* nav */}
              <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-3.5 md:px-8">
                <span className="font-sora flex items-center gap-2 text-sm font-black md:text-base" style={{ color: s.accent }}>
                  <span aria-hidden>{s.icon}</span> {v.naam}
                </span>
                <span className="font-lato hidden gap-5 text-xs text-gray-500 md:flex">
                  {v.nav.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </span>
                <span className="font-lato rounded-full px-3.5 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: s.accent }}>
                  {v.cta}
                </span>
              </div>
              {/* hero */}
              <div className="relative min-h-[300px] md:min-h-[360px]">
                <Image src={s.voorbeeldFoto} alt={`Voorbeeldwebsite ${v.naam}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1000px" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" aria-hidden />
                <div className="relative flex min-h-[300px] max-w-lg flex-col justify-center p-6 md:min-h-[360px] md:p-10">
                  <p className="font-lato text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">{v.tagline}</p>
                  <p className="font-sora mt-3 text-2xl font-black leading-tight text-white md:text-4xl">{v.kop}</p>
                  <p className="font-lato mt-3 text-sm text-white/85 md:text-base">{v.sub}</p>
                  <span className="font-lato mt-5 inline-flex w-fit rounded-lg px-5 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: s.accent }}>
                    {v.cta} →
                  </span>
                </div>
              </div>
              {/* blokken */}
              <div className="grid gap-px bg-gray-100 sm:grid-cols-3">
                {v.blokken.map((b) => (
                  <div key={b.titel} className="bg-white p-5 md:p-6">
                    <p className="font-sora text-sm font-bold" style={{ color: s.accent }}>
                      {b.titel}
                    </p>
                    <p className="font-lato mt-1 text-sm text-gray-600">{b.tekst}</p>
                  </div>
                ))}
              </div>
            </div>
          </BrowserMockup>
        </div>
      </section>

      {/* AI & GOOGLE */}
      <section className="bg-neutral-dark px-6 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-accent">Gevonden in Google én AI</p>
            <h2 className="font-sora mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-tight tracking-tight">
              Uw klant vraagt het steeds vaker aan ChatGPT.
            </h2>
            <p className="font-lato mt-4 text-white/75">
              Niet alleen Google, ook ChatGPT, Gemini en Perplexity geven antwoord met concrete namen. Die noemen alleen
              bedrijven waarvan ze de informatie goed kunnen lezen. Daar bouwen wij uw site op.
            </p>
            <ul className="mt-6 space-y-3">
              {AI_PUNTEN.map((p) => (
                <li key={p} className="font-lato flex gap-3 text-sm text-white/85">
                  <span className="text-accent" aria-hidden>✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3" aria-label="Voorbeeldvragen van klanten">
            {s.vragen.map((q, i) => (
              <div
                key={q}
                className={`font-lato max-w-md rounded-2xl px-5 py-4 text-[15px] shadow-lg ${
                  i % 2 ? "ml-auto rounded-br-md bg-white text-neutral-dark" : "rounded-bl-md bg-white/10 text-white backdrop-blur"
                }`}
              >
                “{q}”
              </div>
            ))}
            <div className="ml-auto max-w-md rounded-2xl rounded-br-md bg-accent px-5 py-4 text-[15px] font-semibold text-neutral-dark shadow-lg">
              …en dan wilt u dat uw bedrijf genoemd wordt.
            </div>
          </div>
        </div>
      </section>

      {/* HASSLE-FREE */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Zonder gedoe</p>
            <h2 className="font-sora mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold tracking-tight text-neutral-dark">
              U runt uw bedrijf. Wij regelen de website.
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STAPPEN.map((st) => (
              <li key={st.n} className="rounded-2xl border border-gray-100 bg-neutral-light p-6">
                <span className="font-sora flex h-10 w-10 items-center justify-center rounded-full text-lg font-black text-white" style={{ backgroundColor: GROEN }}>
                  {st.n}
                </span>
                <p className="font-sora mt-4 font-bold text-neutral-dark">{st.titel}</p>
                <p className="font-lato mt-1.5 text-sm leading-relaxed text-gray-600">{st.tekst}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-4 rounded-3xl bg-neutral-dark p-7 text-white md:grid-cols-3 md:p-9">
            <div>
              <p className="font-lato text-xs font-bold uppercase tracking-widest text-white/50">Website</p>
              <p className="font-sora mt-1 text-2xl font-black">Vanaf €299</p>
              <p className="font-lato text-sm text-white/60">eenmalig · of gratis one-pager*</p>
            </div>
            <div>
              <p className="font-lato text-xs font-bold uppercase tracking-widest text-white/50">Hosting</p>
              <p className="font-sora mt-1 text-2xl font-black">€20 p/m</p>
              <p className="font-lato text-sm text-white/60">ex btw · incl. aparte mail &amp; SSL</p>
            </div>
            <div className="flex items-center md:justify-end">
              <Link
                href={`/contact?branche=${s.slug}#offerte`}
                className="font-lato inline-flex min-h-[52px] items-center rounded-xl bg-accent px-7 font-bold text-neutral-dark transition hover:brightness-95"
              >
                Vraag een voorstel aan →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-light px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-sora text-center text-[clamp(1.8rem,3.2vw,2.5rem)] font-extrabold tracking-tight text-neutral-dark">
            Veelgestelde vragen
          </h2>
          <div className="mt-10 space-y-3">
            {s.faq.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-gray-200 bg-white p-5 open:shadow-sm">
                <summary className="font-sora flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-neutral-dark">
                  {f.question}
                  <span className="text-xl text-primary transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="font-lato mt-3 leading-relaxed text-gray-600">{f.answer}</p>
              </details>
            ))}
          </div>
          <p className="font-lato mt-8 text-center text-xs text-gray-400">
            * Zie de{" "}
            <Link href="/voorwaarden" className="underline">
              voorwaarden
            </Link>
            . Voorbeeldbedrijven op deze pagina zijn fictief.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:px-10" style={{ backgroundColor: GROEN }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sora text-[clamp(1.9rem,3.6vw,2.8rem)] font-black leading-tight text-white">
            Klaar voor een website die voor u werkt?
          </h2>
          <p className="font-lato mt-4 text-white/80">Bel of mail ons. We reageren binnen één werkdag.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={`/contact?branche=${s.slug}#offerte`}
              className="font-lato inline-flex min-h-[52px] items-center rounded-xl bg-white px-8 font-bold transition hover:bg-gray-100"
              style={{ color: GROEN }}
            >
              Gratis kennismaking →
            </Link>
            <Link
              href="/branches"
              className="font-lato inline-flex min-h-[52px] items-center rounded-xl border-2 border-white/60 px-8 font-bold text-white transition hover:bg-white/10"
            >
              Andere branches
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
