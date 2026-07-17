"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/PageHero";

export default function BedanktClient() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") ?? "";

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        eyebrow="Betaling ontvangen"
        title="Bedankt!"
        titleAccent="U bent bijna klaar."
        description="U ontvangt binnen enkele minuten een e-mail op het opgegeven adres met uw privacyverklaring en cookiebanner-instructies."
        orchidOpacity={0.2}
        className="pt-28 md:pt-32"
      >
        {domain ? (
          <p className="font-lato mb-8 text-base text-gray-500">
            Website: <span className="font-semibold text-neutral-dark">{domain}</span>
          </p>
        ) : null}
        <Link
          href="/avg-check"
          className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-dark"
        >
          Terug naar AVG-check
        </Link>
      </PageHero>
    </div>
  );
}
