import type { ReactNode } from "react";

export type PageHeroProps = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  /** Optionele kleur voor titleAccent (default: primary blauw) */
  accentColor?: string;
  description?: string;
  /** Kleur overlay over de orchidee, per branche */
  tint?: string;
  /** 0.15 subtiel, 0.35 prominent */
  orchidOpacity?: number;
  children?: ReactNode;
  className?: string;
};

/**
 * Herbruikbare pagina-hero met orchidee rechts, witte fade links,
 * en optionele branchetint over de foto.
 */
export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  accentColor = "#1a3bcc",
  description,
  tint = "rgba(255,255,255,0)",
  orchidOpacity = 0.25,
  children,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative flex min-h-[50vh] items-center overflow-hidden bg-white px-6 py-24 md:px-12 ${className}`}
    >
      {/* Orchidee — altijd rechts */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-full bg-cover bg-right-top md:w-1/2"
        style={{
          backgroundImage: "url('/images/orchid.jpg')",
          opacity: orchidOpacity,
        }}
        aria-hidden
      />

      {/* Kleur tint per branche */}
      {tint ? (
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-full md:w-1/2"
          style={{ background: tint }}
          aria-hidden
        />
      ) : null}

      {/* Witte fade links zodat tekst leesbaar blijft */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p
              className="font-lato mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-sora mb-6 text-5xl font-black leading-tight tracking-tight text-gray-900 md:text-6xl">
            {title}
            {titleAccent ? (
              <>
                <br />
                <span style={{ color: accentColor }}>{titleAccent}</span>
              </>
            ) : null}
          </h1>
          {description ? (
            <p className="font-lato mb-8 max-w-xl text-lg leading-relaxed text-gray-500">{description}</p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}

/** Helper: hex → rgba tint voor orchidee-overlay */
export function hexToTint(hex: string, alpha = 0.18): string {
  const raw = hex.replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(26,59,204,${alpha})`;
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
