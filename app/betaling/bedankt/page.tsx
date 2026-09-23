import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Bedankt voor uw bestelling — Allesis",
  description: "Uw betaling is ontvangen. U krijgt een bevestiging per e-mail.",
  robots: { index: false, follow: false },
};

export default function BetalingBedanktPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        eyebrow="Betaling ontvangen"
        title="Bedankt!"
        titleAccent="Uw bestelling staat klaar."
        description="U ontvangt binnen enkele minuten een bevestiging per e-mail. Wij nemen contact op zodra wij aan de slag gaan."
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
            Vraag over uw bestelling?
          </Link>
        </div>
      </PageHero>
    </div>
  );
}
