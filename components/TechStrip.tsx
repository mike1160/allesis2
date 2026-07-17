"use client";

import {
  siNextdotjs,
  siCloudflare,
  siResend,
  siTailwindcss,
  siSupabase,
  siGoogle,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

type TechItem =
  | { name: string; kind: "svg"; icon: SimpleIcon; color: string; url: string }
  | { name: string; kind: "emoji"; emoji: string; url: string };

const techItems: TechItem[] = [
  { name: "Next.js", kind: "svg", icon: siNextdotjs, color: "#000000", url: "https://nextjs.org" },
  { name: "Cloudflare", kind: "svg", icon: siCloudflare, color: "#F97316", url: "https://cloudflare.com" },
  { name: "Resend", kind: "svg", icon: siResend, color: "#000000", url: "https://resend.com" },
  { name: "Tailwind", kind: "svg", icon: siTailwindcss, color: "#06B6D4", url: "https://tailwindcss.com" },
  { name: "Supabase", kind: "svg", icon: siSupabase, color: "#3ECF8E", url: "https://supabase.com" },
  { name: "Google", kind: "svg", icon: siGoogle, color: "#4285F4", url: "https://search.google.com/search-console" },
  { name: "TypeScript", kind: "svg", icon: siTypescript, color: "#3178C6", url: "https://typescriptlang.org" },
  { name: "Vercel", kind: "svg", icon: siVercel, color: "#000000", url: "https://vercel.com" },
  { name: "Mollie", kind: "emoji", emoji: "💳", url: "https://mollie.com/nl" },
  { name: "SSL", kind: "emoji", emoji: "🔒", url: "https://letsencrypt.org" },
  { name: "Porkbun", kind: "emoji", emoji: "🐷", url: "https://porkbun.com" },
  { name: "FXW", kind: "emoji", emoji: "🌐", url: "https://fxw.nl" },
];

export default function TechStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 border-y border-gray-200 bg-gray-50 px-6 py-5">
      <span className="mr-2 w-full text-center text-xs font-semibold uppercase tracking-widest text-gray-400 md:w-auto">
        Gebouwd met
      </span>
      {techItems.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
        >
          {item.kind === "emoji" ? (
            <span className="text-sm leading-none" aria-hidden>
              {item.emoji}
            </span>
          ) : (
            <svg
              role="img"
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4 flex-shrink-0"
              style={{ fill: item.color }}
            >
              <path d={item.icon.path} />
            </svg>
          )}
          <span className="whitespace-nowrap text-xs font-bold text-gray-600">{item.name}</span>
        </a>
      ))}
    </div>
  );
}
