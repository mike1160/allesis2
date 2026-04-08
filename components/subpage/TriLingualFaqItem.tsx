"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PremiumCard from "./PremiumCard";

type Lang = "nl" | "en" | "th";

const tabs: { id: Lang; label: string }[] = [
  { id: "nl", label: "NL" },
  { id: "en", label: "EN" },
  { id: "th", label: "TH" },
];

export default function TriLingualFaqItem({
  nl,
  en,
  th,
  aNl,
  aEn,
  aTh,
}: {
  nl: string;
  en: string;
  th: string;
  aNl: string;
  aEn: string;
  aTh: string;
}) {
  const [lang, setLang] = useState<Lang>("nl");

  const q = lang === "nl" ? nl : lang === "en" ? en : th;
  const a = lang === "nl" ? aNl : lang === "en" ? aEn : aTh;

  return (
    <PremiumCard className="!p-0 overflow-hidden">
      <div className="border-b border-neutral-light/80 bg-neutral-light/40 px-5 py-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Taal kiezen">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={lang === t.id}
              onClick={() => setLang(t.id)}
              className={`font-lato rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                lang === t.id ? "bg-primary text-white shadow-sm" : "bg-white text-neutral-mid ring-1 ring-neutral-light hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="p-6"
      >
        <p className="font-sora text-lg font-bold text-neutral-dark" lang={lang === "th" ? "th" : lang}>
          {q}
        </p>
        <p className="font-lato mt-3 leading-relaxed text-neutral-mid" lang={lang === "th" ? "th" : lang}>
          {a}
        </p>
      </motion.div>
    </PremiumCard>
  );
}
