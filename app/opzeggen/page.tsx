import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import OpzegForm from "@/components/OpzegForm";
import { pageAlternates } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Dienst opzeggen",
  description:
    "Hosting, e-mail, domeinnaam of een andere dienst van Allesis opzeggen. Eenvoudig online, met bevestiging binnen één werkdag.",
  alternates: pageAlternates("/opzeggen"),
  robots: { index: true, follow: true },
};

const STAPPEN = [
  { n: "1", titel: "Vul het formulier in", tekst: "Kies de dienst, de einddatum en wat er met uw domein moet gebeuren." },
  { n: "2", titel: "Direct ontvangstbevestiging", tekst: "U krijgt meteen een e-mail dat wij uw opzegging hebben ontvangen." },
  { n: "3", titel: "Definitieve bevestiging", tekst: "Binnen één werkdag bevestigen wij de einddatum en sturen wij zo nodig de verhuiscode." },
];

const GOED_OM_TE_WETEN = [
  "Hosting heeft een looptijd van minimaal 1 jaar en is daarna jaarlijks opzegbaar.",
  "Uw domeinnaam blijft van u. Wilt u verhuizen, dan sturen wij de verhuiscode.",
  "Na de einddatum zijn uw website en e-mail niet meer bereikbaar. Bewaar tijdig wat u nodig heeft; wij helpen graag met een export.",
  "Twijfelt u? Bel of mail ons gerust. Soms is een ander pakket of een kleine aanpassing de oplossing.",
];

export default function OpzeggenPage() {
  return (
    <div className="bg-neutral-light px-6 pb-20 pt-28 md:px-10 md:pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="font-lato text-xs font-bold uppercase tracking-[0.14em] text-primary">Klantenservice</p>
        <h1 className="font-sora mt-3 text-[clamp(2.2rem,5vw,3.4rem)] font-black leading-tight tracking-tight text-neutral-dark">
          Dienst opzeggen
        </h1>
        <p className="font-lato mt-4 max-w-2xl text-lg text-gray-600">
          Jammer dat u weggaat. Opzeggen regelt u hier in een paar minuten, zonder gedoe. Heeft u een account? Dan kunt u
          ook opzeggen via{" "}
          <Link href="/dashboard" className="font-semibold text-primary underline-offset-2 hover:underline">
            Mijn Allesis
          </Link>
          .
        </p>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {STAPPEN.map((s) => (
            <li key={s.n} className="rounded-2xl border border-gray-200 bg-white p-5">
              <span className="font-sora flex h-9 w-9 items-center justify-center rounded-full bg-primary font-black text-white">{s.n}</span>
              <p className="font-sora mt-3 font-bold text-neutral-dark">{s.titel}</p>
              <p className="font-lato mt-1 text-sm text-gray-600">{s.tekst}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Suspense fallback={<p className="font-lato text-gray-500">Formulier laden…</p>}>
            <OpzegForm />
          </Suspense>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="font-sora font-bold text-neutral-dark">Goed om te weten</h2>
              <ul className="mt-4 space-y-3">
                {GOED_OM_TE_WETEN.map((g) => (
                  <li key={g} className="font-lato flex gap-2.5 text-sm leading-relaxed text-gray-600">
                    <span className="text-primary" aria-hidden>
                      •
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
              <p className="font-lato mt-4 text-xs text-gray-400">
                Zie ook onze{" "}
                <Link href="/voorwaarden" className="underline">
                  voorwaarden
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl bg-neutral-dark p-6 text-white">
              <h2 className="font-sora font-bold">Liever eerst even praten?</h2>
              <p className="font-lato mt-2 text-sm text-white/70">Vaak is er een eenvoudige oplossing. We denken graag mee.</p>
              <a href="mailto:info@allesis.nl" className="font-lato mt-4 inline-block font-bold text-accent hover:underline">
                info@allesis.nl →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
