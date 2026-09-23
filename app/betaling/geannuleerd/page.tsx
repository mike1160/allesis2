import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Betaling geannuleerd — Allesis",
  description: "De betaling is geannuleerd. Er is niets afgeschreven.",
  robots: { index: false, follow: false },
};

export default function BetalingGeannuleerdPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        eyebrow="Betaling geannuleerd"
        title="Er is niets afgeschreven."
        titleAccent="U kunt het opnieuw proberen."
        description="De betaling is afgebroken of geannuleerd. Uw bestelling is niet geplaatst — probeer het gerust nog een keer, of neem contact met ons op."
      >
        <div className="font-lato flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-dark"
          >
            Terug naar home
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-neutral-300 bg-white px-8 font-bold text-neutral-dark transition hover:bg-neutral-light"
          >
            Hulp nodig?
          </Link>
        </div>
      </PageHero>
    </div>
  );
}
