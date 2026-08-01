import Link from "next/link";
import ThaiLangSwitcher from "@/components/ThaiLangSwitcher";
import { ui, LINE_URL, LINE_QR, WHATSAPP_URL, type Lang } from "@/lib/translations";
import {
  resolveServiceLink,
  uniquifyServiceImages,
} from "@/lib/branch-service-defaults";

interface Service {
  icon: string;
  label: string;
  sub: string;
  img?: string;
  href?: string;
}
interface Package {
  name: string;
  price: string;
  eur: string;
  features: readonly string[];
  highlight: boolean;
}
export interface BranchData {
  eyebrow: string;
  h1_main: string;
  h1_sub: string;
  hero_desc: string;
  mid_h2: string;
  mid_p: string;
  services: readonly Service[];
  packages: readonly Package[];
}
interface Props {
  lang: Lang;
  data: BranchData;
  heroImg: string;
  midImg: string;
  ctaImg: string;
  gradientFrom: string;
}

export default function BranchPageLayout({
  lang,
  data,
  heroImg,
  midImg,
  ctaImg,
  gradientFrom,
}: Props) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="relative flex h-screen min-h-[640px] flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroImg}')` }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${gradientFrom} via-zinc-950/60 to-zinc-950/10`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-5 pt-24 md:pt-5">
          <Link
            href={`/th?lang=${lang}`}
            className="text-sm text-zinc-400 transition-colors hover:text-amber-400"
          >
            {ui.nav_back[lang]}
          </Link>
          <div className="flex items-center gap-3">
            <ThaiLangSwitcher current={lang} />
            <span className="hidden rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur md:block">
              {ui.badge[lang]}
            </span>
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
            {data.eyebrow}
          </p>
          <h1 className="mb-6 text-5xl font-black leading-none tracking-tight md:text-7xl">
            <span className="text-amber-400">{data.h1_main}</span>
            <br />
            <span className="text-3xl font-light text-zinc-300 md:text-4xl">{data.h1_sub}</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-300">{data.hero_desc}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={LINE_URL}
              className="inline-flex items-center justify-center rounded-xl bg-green-500 px-8 py-4 text-lg font-black text-white transition-all hover:scale-105 hover:bg-green-400"
            >
              {ui.line_cta[lang]}
            </a>
            <a
              href={WHATSAPP_URL}
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-8 py-4 text-lg font-black text-zinc-900 transition-all hover:scale-105 hover:bg-amber-300"
            >
              {ui.whatsapp_cta[lang]}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-400">
            {ui.why_website[lang]}
          </p>
          <h2 className="mb-6 text-4xl font-black leading-tight">{data.mid_h2}</h2>
          <p className="leading-relaxed text-zinc-400">{data.mid_p}</p>
        </div>
        <div className="group relative h-72 overflow-hidden rounded-2xl md:h-96">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${midImg}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/60 to-transparent" />
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920&q=70')",
          }}
        />
        <div className="absolute inset-0 bg-zinc-950/55" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-widest text-amber-400">
            {ui.what_you_get[lang]}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {uniquifyServiceImages(data.services).map((raw) => {
              const s = {
                ...raw,
                href: resolveServiceLink(raw.icon, lang, raw.href),
              };
              const className =
                "group relative block h-44 overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all hover:scale-[1.02] hover:border-amber-400/60";

              const inner = (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="mb-1 text-2xl drop-shadow">{s.icon}</span>
                    <p className="text-sm font-bold text-white transition-colors group-hover:text-amber-400">
                      {s.label}
                    </p>
                    <p className="mt-0.5 text-xs text-white/70">{s.sub}</p>
                  </div>
                </>
              );

              const external = s.href.startsWith("http");
              if (external) {
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {inner}
                  </a>
                );
              }
              return (
                <Link key={s.label} href={s.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-amber-400">
          {ui.pricing[lang]}
        </p>
        <h2 className="mb-12 text-center text-4xl font-black">{ui.no_hidden[lang]}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {data.packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl border-2 p-6 transition-all hover:scale-105 ${
                pkg.highlight
                  ? "border-amber-400 bg-zinc-900"
                  : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600"
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-black uppercase tracking-wide text-zinc-900">
                  {ui.recommended[lang]}
                </span>
              )}
              <p className="text-sm font-medium text-zinc-400">{pkg.name}</p>
              <p className="mt-2 text-4xl font-black text-white">{pkg.price}</p>
              <p className="text-xs text-zinc-500">{pkg.eur}</p>
              <ul className="mt-6 space-y-2">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="font-bold text-amber-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={LINE_URL}
                className={`mt-6 block rounded-xl py-3 text-center text-sm font-bold transition-all ${
                  pkg.highlight
                    ? "bg-amber-400 text-zinc-900 hover:bg-amber-300"
                    : "bg-zinc-700 text-white hover:bg-zinc-600"
                }`}
              >
                {ui.line_cta[lang]}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${ctaImg}')` }}
        />
        <div className="absolute inset-0 bg-zinc-950/85" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-amber-400">
            {ui.contact_cta[lang]}
          </p>
          <h2 className="mb-4 text-6xl font-black">{ui.ready[lang]}</h2>
          <p className="mb-10 text-lg text-zinc-400">{ui.free_consult[lang]}</p>
          <div className="mb-10 flex flex-wrap items-start justify-center gap-6">
            <a href={LINE_URL} className="inline-block rounded-2xl bg-white p-3 shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LINE_QR} alt="LINE QR — Allesis" width={140} height={140} className="h-[140px] w-[140px]" />
            </a>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={LINE_URL}
              className="rounded-xl bg-green-500 px-10 py-5 text-xl font-black text-white transition-all hover:scale-105 hover:bg-green-400"
            >
              {ui.line_cta[lang]}
            </a>
            <a
              href={WHATSAPP_URL}
              className="rounded-xl bg-amber-400 px-10 py-5 text-xl font-black text-zinc-900 transition-all hover:scale-105 hover:bg-amber-300"
            >
              {ui.whatsapp_cta[lang]}
            </a>
            <a
              href="mailto:info@allesis.nl"
              className="rounded-xl border border-zinc-600 bg-zinc-800 px-10 py-5 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-zinc-700"
            >
              {ui.email_cta[lang]}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
