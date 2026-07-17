import type { ReactNode } from "react";

export type BrancheHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  /** Unsplash (of andere) foto-URL */
  foto: string;
  /** Tailwind gradient classes, bijv. `from-orange-950 via-orange-900/80 to-transparent` */
  gradient: string;
  children?: ReactNode;
};

/**
 * Full-bleed foto-hero voor branchepagina's.
 * Donkere gradient links voor leesbaarheid; accentregel in geel.
 */
export default function BrancheHero({
  eyebrow,
  title,
  titleAccent,
  description,
  foto,
  gradient,
  children,
}: BrancheHeroProps) {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden px-6 py-28 md:px-16 md:pt-32">
      {/* ACHTERGROND FOTO */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url('${foto}')` }}
        aria-hidden
      />

      {/* DONKERE GRADIENT OVER FOTO — links donkerder voor leesbaarheid */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-85`} aria-hidden />

      {/* EXTRA DONKER ONDERAAN op mobiel */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden"
        aria-hidden
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-2xl">
        <p className="font-lato mb-4 text-xs font-bold uppercase tracking-widest text-white/60">{eyebrow}</p>
        <h1 className="font-sora mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
          {title}
          <br />
          <span className="text-yellow-300">{titleAccent}</span>
        </h1>
        <p className="font-lato mb-8 max-w-xl text-lg leading-relaxed text-white/80">{description}</p>
        {children}
      </div>
    </section>
  );
}
