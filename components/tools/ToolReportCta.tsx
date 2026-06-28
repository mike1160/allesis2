"use client";

import Link from "next/link";

type Props = {
  headline?: string;
  description?: string;
  href?: string;
  buttonText?: string;
};

export default function ToolReportCta({
  headline = "Wilt u dat wij dit voor u oplossen?",
  description = "Allesis helpt met snelle websites, technische optimalisatie en AI-vindbaarheid — persoonlijk en zonder verplichtingen.",
  href = "/contact#offerte",
  buttonText = "Vraag een offerte aan",
}: Props) {
  return (
    <div className="font-lato mt-12 rounded-2xl bg-primary p-8 text-center text-white shadow-lg">
      <p className="font-sora text-xl font-bold">{headline}</p>
      <p className="mt-2 text-white/80">{description}</p>
      <Link
        href={href}
        className="font-lato mt-6 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-10 text-base font-bold text-primary transition hover:bg-neutral-light"
      >
        {buttonText} →
      </Link>
    </div>
  );
}
