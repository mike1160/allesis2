"use client";

import Image from "next/image";
import { useState } from "react";

export type FAQGridItem = {
  vraag: string;
  antwoord: string;
  foto: string;
};

export type FAQGridProps = {
  items: FAQGridItem[];
  /** bijv. `from-orange-900/90 via-orange-900/50` (to-transparent wordt toegevoegd) */
  gradient: string;
  titel?: string;
};

export default function FAQGrid({
  items,
  gradient,
  titel = "Veelgestelde vragen",
}: FAQGridProps) {
  const [open, setOpen] = useState<number | null>(null);
  const overlay = gradient.includes("to-") ? gradient : `${gradient} to-transparent`;

  return (
    <section className="px-6 py-20 md:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-sora mb-10 text-center text-4xl font-black text-neutral-dark">{titel}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <button
              key={item.vraag}
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="group relative overflow-hidden rounded-2xl text-left"
              style={{ minHeight: open === i ? "200px" : "140px" }}
            >
              <Image
                src={item.foto}
                alt={item.vraag}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-t ${overlay} transition-opacity duration-300 ${
                  open === i ? "opacity-95" : "opacity-85 group-hover:opacity-90"
                }`}
                aria-hidden
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sora text-base font-black leading-tight text-white md:text-lg">
                    {item.vraag}
                  </h3>
                  <span
                    className={`flex-shrink-0 text-xl text-white/70 transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </div>
                {open === i ? (
                  <p className="font-lato mt-3 text-sm leading-relaxed text-white/80">{item.antwoord}</p>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FAQGrid };
