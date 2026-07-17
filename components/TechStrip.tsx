"use client";

import StripPill from "@/components/StripPill";
import { aiItems, techItems } from "@/lib/strip-items";

export default function TechStrip() {
  return (
    <div className="overflow-x-auto border-y border-gray-200 bg-gray-50 px-6 py-4">
      <div className="mx-auto flex min-w-max items-center justify-center gap-3">
        <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Gebouwd met
        </span>

        {techItems.map((item) => (
          <StripPill key={item.naam} item={item} />
        ))}

        <div className="mx-1 h-5 w-px flex-shrink-0 bg-gray-300" />

        <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-gray-400">
          AI vindbaar
        </span>

        {aiItems.map((item) => (
          <StripPill key={item.naam} item={item} />
        ))}
      </div>
    </div>
  );
}
