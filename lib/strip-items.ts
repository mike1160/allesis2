import {
  siNextdotjs,
  siCloudflare,
  siResend,
  siTailwindcss,
  siSupabase,
  siTypescript,
  siVercel,
  siGooglegemini,
  siAnthropic,
  siPerplexity,
  type SimpleIcon,
} from "simple-icons";

export type StripItem =
  | { kind: "svg"; naam: string; icon: SimpleIcon; color: string; url: string }
  | { kind: "emoji"; naam: string; emoji: string; url: string };

export const techItems: StripItem[] = [
  { kind: "svg", naam: "Next.js", icon: siNextdotjs, color: "#000000", url: "https://nextjs.org" },
  { kind: "svg", naam: "Cloudflare", icon: siCloudflare, color: "#F97316", url: "https://cloudflare.com" },
  { kind: "svg", naam: "Resend", icon: siResend, color: "#000000", url: "https://resend.com" },
  { kind: "svg", naam: "Tailwind", icon: siTailwindcss, color: "#06B6D4", url: "https://tailwindcss.com" },
  { kind: "svg", naam: "Supabase", icon: siSupabase, color: "#3ECF8E", url: "https://supabase.com" },
  { kind: "svg", naam: "Vercel", icon: siVercel, color: "#000000", url: "https://vercel.com" },
  { kind: "svg", naam: "TypeScript", icon: siTypescript, color: "#3178C6", url: "https://typescriptlang.org" },
  { kind: "emoji", naam: "Mollie", emoji: "💳", url: "https://mollie.com/nl" },
  { kind: "emoji", naam: "Porkbun", emoji: "🐷", url: "https://porkbun.com" },
];

export const aiItems: StripItem[] = [
  { kind: "emoji", naam: "ChatGPT", emoji: "💬", url: "https://chatgpt.com" },
  { kind: "svg", naam: "Gemini", icon: siGooglegemini, color: "#4285F4", url: "https://gemini.google.com" },
  { kind: "svg", naam: "Claude", icon: siAnthropic, color: "#D4A27F", url: "https://claude.ai" },
  { kind: "svg", naam: "Perplexity", icon: siPerplexity, color: "#20808D", url: "https://www.perplexity.ai" },
  { kind: "emoji", naam: "Copilot", emoji: "🤖", url: "https://copilot.microsoft.com" },
];
