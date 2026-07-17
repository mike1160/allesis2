"use client";

import { motion } from "framer-motion";

const easeOut = "easeOut" as const;

const stats = [
  { n: "300+", l: "Geredde honden & katten" },
  { n: "10+", l: "Jaar dierenopvang" },
  { n: "100%", l: "Van donaties naar zorg" },
];

/**
 * SSF-missiesectie op de homepage — donker navy met statistieken.
 * Legt uit dat Allesis Saved Souls Foundation steunt (SSF-oranje accent).
 */
export default function SSFMissie() {
  return (
    <section className="grain-dark relative overflow-hidden bg-[#0a0f1e] px-6 py-[120px] md:px-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse 70% 60% at 25% 20%, rgba(232,93,38,0.18), transparent 55%)" }}
        aria-hidden
      />
      <div className="relative z-[1] mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <p className="font-lato text-xs font-bold uppercase tracking-[0.2em] text-ssf-orange">🐾 Onze missie</p>
          <h2 className="font-sora mt-4 text-[clamp(1.75rem,3vw,3rem)] font-extrabold leading-tight text-white">
            Elke website redt levens
          </h2>
          <p className="font-lato mt-6 text-lg font-light leading-relaxed text-white/70">
            Allesis steunt de <strong className="font-semibold text-white">Saved Souls Foundation</strong> — een
            dierenopvang in Khon Kaen, Thailand die honden en katten redt, ook verlamde en gehandicapte dieren. Elke
            website die wij bouwen draagt bij: via een donatie-link steunen ook uw bezoekers dit werk.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://www.savedsouls-foundation.org/nl/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl bg-ssf-orange px-7 font-bold text-white transition hover:brightness-95"
            >
              Doneer aan SSF →
            </a>
            <a
              href="https://www.savedsouls-foundation.org/nl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-lato inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 px-7 font-bold text-white transition hover:bg-white/5"
            >
              Lees hun verhaal
            </a>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.55, ease: easeOut, delay: 0.12 }}
        >
          {stats.map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center lg:flex lg:items-center lg:gap-6 lg:text-left"
            >
              <div className="font-sora text-4xl font-extrabold text-ssf-orange lg:text-5xl">{s.n}</div>
              <div className="font-lato mt-2 text-sm font-light text-white/70 lg:mt-0">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
