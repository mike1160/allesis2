"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BedanktClient() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") ?? "";

  return (
    <div className="font-lato min-h-screen bg-[#0a0f1e] px-6 pb-20 pt-24 text-center text-white">
      <div className="mx-auto max-w-xl">
        <p className="text-lg leading-relaxed text-white/90">
          Bedankt voor uw betaling! U ontvangt binnen enkele minuten een e-mail op het opgegeven adres met uw
          privacyverklaring en cookiebanner-instructies.
        </p>
        {domain ? (
          <p className="mt-8 text-base text-white/70">
            Website: <span className="font-semibold text-white">{domain}</span>
          </p>
        ) : null}
        <Link
          href="/avg-check"
          className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-8 font-bold text-[#0a0f1e] transition hover:brightness-95"
        >
          Terug naar AVG-check
        </Link>
      </div>
    </div>
  );
}
