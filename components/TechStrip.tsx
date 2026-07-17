"use client";

import StripPill from "@/components/StripPill";
import { aiItems, techItems } from "@/lib/strip-items";

export default function TechStrip() {
  return (
    <div className="border-y border-gray-200 bg-gray-50 py-4">
      <div className="scrollbar-hide overflow-x-auto px-6">
        <div className="flex min-w-max items-center gap-2 md:min-w-0 md:flex-wrap md:justify-center">
          <span className="mr-1 flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Gebouwd met
          </span>

          {techItems.map((item) => (
            <StripPill key={item.naam} item={item} />
          ))}

          <div className="mx-2 h-5 w-px flex-shrink-0 bg-gray-300" />

          <span className="mr-1 flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-gray-400">
            AI vindbaar
          </span>

          {aiItems.map((item) => (
            <StripPill key={item.naam} item={item} linked={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
