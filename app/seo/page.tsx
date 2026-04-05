import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "SEO & vindbaarheid in Google en AI-zoekopdrachten",
  description:
    "SEO bureau Haarlem: technische SEO, content en lokale vindbaarheid. Allesis helpt MKB beter gevonden te worden in Google én AI-assistenten. Vraag een vrijblijvend gesprek aan.",
  alternates: pageAlternates("/seo"),
  openGraph: {
    title: "SEO & vindbaarheid | Allesis Haarlem",
    description:
      "Lokale en nationale SEO voor het MKB — van techniek tot content. Ook toekomstbestendig voor AI-overzichten.",
    url: `${SITE_URL}/seo`,
    locale: "nl_NL",
    type: "website",
  },
};

const checks = [
  "Technische basis: snelheid, Core Web Vitals, indexeerbaarheid",
  "Zoekwoordenonderzoek afgestemd op uw diensten en regio",
  "On-page SEO: titels, structuur, interne links",
  "Lokale SEO: Google Bedrijfsprofiel, NAP-consistentie",
  "Meetplan met Search Console en heldere KPI’s",
  "Richtlijnen voor content die ook door AI-systemen wordt begrepen",
];

export default function SeoPage() {
  return (
    <div className="pt-[100px]">
      <section className="bg-gradient-to-b from-[#f8f9fc] to-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-lato mb-3 text-xs font-bold tracking-[0.12em] text-primary uppercase">SEO Haarlem</p>
          <h1 className="font-sora text-4xl font-extrabold text-neutral-dark md:text-5xl">SEO die écht iets oplevert</h1>
          <p className="font-lato mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-neutral-mid">
            <span className="text-neutral-dark font-semibold">EN:</span> Search engine optimization that connects your services
            with the right customers — locally and nationally.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Wat we voor u doen</h2>
            <p className="font-lato mt-3 text-neutral-mid leading-relaxed">
              Geen trucjes, maar een solide strategie: uw site moet snel zijn, duidelijk voor bezoekers én begrijpelijk voor
              zoekmachines (en steeds vaker voor AI-antwoorden). Wij werken vanuit Haarlem voor bedrijven in heel Nederland.
            </p>
            <ul className="font-lato mt-6 space-y-3 text-neutral-dark">
              {checks.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-green-600" aria-hidden>
                    ✓
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-neutral-light bg-white p-8 shadow-sm">
            <h3 className="font-sora text-lg font-bold text-neutral-dark">Prijzen</h3>
            <p className="font-lato mt-3 text-neutral-mid leading-relaxed">
              SEO is maatwerk. Wij bieden maandelijkse trajecten op basis van uw markt en concurrentie.{" "}
              <span className="text-neutral-dark font-semibold">EN:</span> Monthly SEO retainers — tailored after a short
              intake.
            </p>
            <p className="font-lato mt-4 text-sm text-neutral-mid">
              Maandelijkse SEO-trajecten op maat — concrete prijs na korte intake.
            </p>
            <Link
              href="/contact#offerte"
              className="font-lato mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-dark"
            >
              Offerte aanvragen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
