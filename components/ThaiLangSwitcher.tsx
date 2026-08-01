"use client";

import { useRouter, usePathname } from "next/navigation";
import type { Lang } from "@/lib/translations";

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "th", flag: "🇹🇭", label: "ไทย" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "nl", flag: "🇳🇱", label: "NL" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "de", flag: "🇩🇪", label: "DE" },
];

const THAI_BY_ASCII: Record<string, string> = {
  garage: "อู่ซ่อมรถ",
  restaurant: "ร้านอาหาร",
  spa: "สปา",
  clinic: "คลินิก",
  kliniek: "คลินิก",
  school: "โรงเรียน",
  realestate: "อสังหาริมทรัพย์",
  "real-estate": "อสังหาริมทรัพย์",
  property: "อสังหาริมทรัพย์",
  vastgoed: "อสังหาริมทรัพย์",
};

const ASCII_BY_THAI: Record<string, string> = {
  อู่ซ่อมรถ: "garage",
  ร้านอาหาร: "restaurant",
  สปา: "spa",
  คลินิก: "clinic",
  โรงเรียน: "school",
  อสังหาริมทรัพย์: "realestate",
};

export default function ThaiLangSwitcher({ current }: { current: Lang }) {
  const router = useRouter();
  const pathname = usePathname();

  function switchLang(lang: Lang) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "th" && parts[1]) {
      const raw = decodeURIComponent(parts[1]);
      const ascii = ASCII_BY_THAI[raw] ?? (THAI_BY_ASCII[raw] ? raw : raw);
      const canonicalAscii =
        ascii === "kliniek"
          ? "clinic"
          : ascii === "real-estate" || ascii === "property" || ascii === "vastgoed"
            ? "realestate"
            : ascii;
      const slug = lang === "th" ? (THAI_BY_ASCII[canonicalAscii] ?? raw) : canonicalAscii;
      router.push(`/th/${slug}?lang=${lang}`);
      return;
    }
    router.push(`${pathname.split("?")[0]}?lang=${lang}`);
  }

  return (
    <div className="flex gap-1 rounded-full border border-zinc-700 bg-zinc-900/80 p-1 backdrop-blur">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => switchLang(l.code)}
          className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
            current === l.code
              ? "bg-amber-400 text-zinc-900"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}
