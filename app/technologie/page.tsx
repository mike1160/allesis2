import type { Metadata } from "next";
import Link from "next/link";
import TechIcon from "@/components/TechIcon";
import { GROEP_LABEL, GROEP_TITEL, techPerGroep, type TechGroep } from "@/lib/technologie";
import { pageAlternates } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Technologie en standaarden achter uw website",
  description:
    "Next.js, Cloudflare, SSL, DKIM, Schema.org, llms.txt en meer: in gewone taal uitgelegd. Zo maakt Allesis uw website snel, veilig en vindbaar in Google én AI.",
  alternates: pageAlternates("/technologie"),
};

const GROEPEN: TechGroep[] = ["gebouwd", "ai", "standaard"];

export default function TechnologiePage() {
  return (
    <div className="bg-neutral-light">
      <section className="bg-neutral-dark px-6 pb-16 pt-28 text-white md:px-10 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-accent">Onder de motorkap</p>
          <h1 className="font-sora mt-3 text-[clamp(2.4rem,6vw,4rem)] font-black leading-[1.05] tracking-tight">
            Technologie, <span className="text-accent">zonder vakjargon.</span>
          </h1>
          <p className="font-lato mt-4 max-w-2xl text-lg text-white/75">
            Meer dan 20 technologieën en standaarden, inbegrepen bij elk project. Klik op een onderdeel voor de uitleg:
            wat het is en wat u eraan heeft.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16 md:px-10">
        {GROEPEN.map((groep) => (
          <section key={groep}>
            <p className="font-lato text-xs font-bold uppercase tracking-widest text-gray-400">{GROEP_LABEL[groep]}</p>
            <h2 className="font-sora mt-1 text-2xl font-black text-neutral-dark">{GROEP_TITEL[groep]}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {techPerGroep(groep).map((t) => (
                <Link
                  key={t.slug}
                  href={`/technologie/${t.slug}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-xl">
                      <TechIcon tech={t} className="h-5 w-5" />
                    </span>
                    <span className="font-sora font-bold text-neutral-dark">{t.naam}</span>
                  </div>
                  <p className="font-lato mt-3 text-sm leading-relaxed text-gray-600">{t.kort}</p>
                  <p className="font-lato mt-3 text-sm font-semibold text-primary">
                    Lees meer <span className="inline-block transition group-hover:translate-x-1">→</span>
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
