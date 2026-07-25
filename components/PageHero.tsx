import Image from "next/image";
import type { ReactNode } from "react";

export const PAGE_HERO_FALLBACK_BG =
  "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg";

export type PageHeroProps = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  /** Optionele kleur voor titleAccent (default: Allesis groen) */
  accentColor?: string;
  description?: string;
  /** @deprecated Niet meer gebruikt — overlay is vast wit */
  tint?: string;
  /** @deprecated Niet meer gebruikt */
  orchidOpacity?: number;
  /** Full-bleed achtergrond (CSS background-image). Default: neutrale Pexels-foto */
  backgroundImage?: string;
  /** Optionele hero-foto rechts (2-koloms) of cloud-layout */
  imageSrc?: string;
  /** `side` = 2 kolommen; `cloud` = tekst boven, pagina-brede wolk eronder */
  imageLayout?: "side" | "cloud";
  /** Compacte cloud-hero (minder padding onder subtekst) */
  compact?: boolean;
  children?: ReactNode;
  className?: string;
};

/**
 * Herbruikbare pagina-hero: full-bleed foto + witte overlay,
 * of 2-koloms / cloud-layout met imageSrc.
 */
export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  accentColor = "#3B6D11",
  description,
  backgroundImage,
  imageSrc,
  imageLayout = "side",
  compact = false,
  children,
  className = "",
}: PageHeroProps) {
  if (imageSrc && imageLayout === "cloud") {
    return (
      <section
        className={`relative overflow-hidden bg-white ${className}`}
        style={compact ? { minHeight: "auto", padding: "80px 32px" } : undefined}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 z-0 w-full ${
            compact ? "top-10 sm:top-8" : "top-16 sm:top-12 md:top-8"
          }`}
          aria-hidden
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-[10%] bottom-0 opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 45%, #EAF3DE 0%, transparent 70%)",
            }}
          />

          <div
            className="relative w-full overflow-hidden"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 92% 78% at 50% 48%, #000 36%, transparent 76%)",
              maskImage:
                "radial-gradient(ellipse 92% 78% at 50% 48%, #000 36%, transparent 76%)",
            }}
          >
            <div
              className={`relative w-full ${
                compact
                  ? "h-[200px] sm:h-[240px] md:h-[280px]"
                  : "h-[320px] sm:h-[400px] md:h-[520px] lg:h-[580px]"
              }`}
            >
              <Image
                src={imageSrc}
                alt=""
                fill
                priority
                loading="eager"
                className="object-cover object-center opacity-90"
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(255,255,255,0.45)" }}
              />
            </div>
          </div>
        </div>

        <div
          className={`relative z-10 mx-auto max-w-3xl text-center ${
            compact
              ? "px-0 pb-4 pt-0"
              : "px-6 pb-[220px] pt-28 sm:pb-[260px] md:px-10 md:pb-[320px] md:pt-32"
          }`}
        >
          {eyebrow ? (
            <p
              className="font-lato mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-sora mb-5 text-5xl font-black leading-tight tracking-tight text-gray-900 md:text-6xl">
            {title}
            {titleAccent ? (
              <>
                <br />
                <span style={{ color: accentColor }}>{titleAccent}</span>
              </>
            ) : null}
          </h1>
          {description ? (
            <p className="font-lato mx-auto mb-2 max-w-xl text-lg leading-relaxed text-gray-600">{description}</p>
          ) : null}
          {children}
        </div>
      </section>
    );
  }

  if (imageSrc) {
    return (
      <section
        className={`relative overflow-hidden bg-white ${className}`}
        style={{ padding: "80px 32px" }}
      >
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="max-w-xl">
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

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-auto md:min-h-[420px]">
            <Image
              src={imageSrc}
              alt=""
              fill
              priority
              loading="eager"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    );
  }

  const bg = backgroundImage ?? PAGE_HERO_FALLBACK_BG;

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{
        padding: "80px 32px",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "rgba(255,255,255,0.82)" }}
        aria-hidden
      />

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

/** Helper: hex → rgba tint */
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
  if (Number.isNaN(n)) return `rgba(59,109,17,${alpha})`;
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
