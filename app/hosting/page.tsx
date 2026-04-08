import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import HostingOrderForm from "@/components/HostingOrderForm";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Webhosting Nederland — SSL, e-mail & MySQL",
  description:
    "Snelle Nederlandse webhosting voor MKB. Pakketten vanaf €4,95/mnd ex btw. SSL, e-mail, MySQL en helpdesk. Allesis Haarlem.",
  alternates: pageAlternates("/hosting"),
  openGraph: {
    title: "Webhosting pakketten | Allesis",
    description: "Betrouwbare hosting met SSL, e-mail en MySQL — jaarlijks gefactureerd.",
    url: `${SITE_URL}/hosting`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function HostingPage() {
  const pakketten = [
    {
      naam: "Lite",
      prijs: "4,95",
      features: [
        "1.000 MB schijfruimte",
        "20 GB dataverkeer",
        "5 e-mailaccounts",
        "Onbeperkt e-mail forwarding",
        "Onbeperkt subdomeinen",
        "1 MySQL database",
        "PHP / Perl CGI / SSI",
        "FTP + Crontab",
        "SSL certificaat",
        "Helpdesk",
      ],
    },
    {
      naam: "Start Up",
      prijs: "8,95",
      highlight: true,
      features: [
        "4.000 MB schijfruimte",
        "80 GB dataverkeer",
        "10 e-mailaccounts",
        "Onbeperkt e-mail forwarding",
        "Onbeperkt subdomeinen",
        "2 MySQL databases",
        "PHP / Perl CGI / SSI",
        "FTP + Crontab",
        "SSL certificaat",
        "Helpdesk",
      ],
    },
    {
      naam: "Basic",
      prijs: "14,95",
      features: [
        "8.000 MB schijfruimte",
        "320 GB dataverkeer",
        "50 e-mailaccounts",
        "Onbeperkt e-mail forwarding",
        "Onbeperkt subdomeinen",
        "2 MySQL databases",
        "PHP / Perl CGI / SSI",
        "FTP + Crontab",
        "SSL certificaat",
        "Helpdesk",
      ],
    },
  ];

  return (
    <>
      <SubpageHero
        eyebrow="Hosting"
        title="Alles in één pakket"
        subtitle="Snel, betrouwbaar en alles inbegrepen. Kies het pakket dat bij u past."
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 md:items-stretch">
          {pakketten.map((p) => (
            <PremiumCard key={p.naam} highlighted={!!p.highlight} className={p.highlight ? "md:scale-[1.02] md:shadow-xl" : ""}>
              {p.highlight ? (
                <p className="font-lato text-[11px] font-bold uppercase tracking-[0.12em] text-white/70">Meest gekozen</p>
              ) : null}
              <h2 className={`font-sora mt-2 text-xl font-bold ${p.highlight ? "text-white" : "text-neutral-dark"}`}>{p.naam}</h2>
              <div className="mt-4">
                <span className={`font-sora text-4xl font-extrabold ${p.highlight ? "text-white" : "text-primary"}`}>€ {p.prijs}</span>
                <span className={`font-lato ml-1 text-sm ${p.highlight ? "text-white/70" : "text-neutral-mid"}`}>/mnd</span>
              </div>
              <ul className="mt-8 flex flex-1 flex-col gap-2.5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={`font-lato flex items-start gap-2 text-sm ${p.highlight ? "text-white/90" : "text-neutral-mid"}`}
                  >
                    <span className={`mt-0.5 shrink-0 font-bold ${p.highlight ? "text-white" : "text-primary"}`} aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/hosting?pakket=${encodeURIComponent(p.naam)}#hosting-bestellen`}
                className={`font-lato mt-8 block min-h-[44px] rounded-xl py-3 text-center text-sm font-bold transition ${
                  p.highlight ? "bg-white text-primary hover:bg-neutral-light" : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                Bestel nu →
              </Link>
            </PremiumCard>
          ))}
        </div>

        <Suspense
          fallback={
            <p className="font-lato mt-12 text-center text-neutral-mid">Formulier laden…</p>
          }
        >
          <HostingOrderForm />
        </Suspense>
      </Reveal>
    </>
  );
}
