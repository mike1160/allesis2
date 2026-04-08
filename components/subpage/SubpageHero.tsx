"use client";

import { motion } from "framer-motion";

const easeOut = "easeOut" as const;

export default function SubpageHero({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`grain-dark relative overflow-hidden px-6 pb-16 pt-28 text-white md:px-10 md:pb-24 md:pt-32 ${className}`}
      style={{
        background: "linear-gradient(155deg, #0f172a 0%, #152a5c 42%, #1a3bcc 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,255,255,0.12), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, ease: easeOut }}
        >
          {eyebrow ? (
            <p className="font-lato mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/55">{eyebrow}</p>
          ) : null}
          <h1 className="font-sora text-[clamp(2rem,5vw,3.35rem)] font-extrabold leading-[1.12] tracking-tight text-white">
            {title}
          </h1>
          {subtitle ? (
            <div className="font-lato mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/70">{subtitle}</div>
          ) : null}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
