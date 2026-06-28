"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const CINEMATIC_DIENSTEN_REVEAL_ID = "home-diensten-reveal";

const CinematicHeroGsap = dynamic(() => import("@/components/CinematicHeroGsap"), {
  ssr: false,
});

/** Gedeelde hero-achtergrond — staat op .hero-bg-drift voor CSS-animatie (punt 4) */
export const HERO_BG_LAYERS = [
  "radial-gradient(ellipse 72% 58% at 78% 28%, rgba(26,59,204,0.28) 0%, transparent 62%)",
  "radial-gradient(ellipse 48% 40% at 12% 88%, rgba(15,36,144,0.35) 0%, transparent 55%)",
  "linear-gradient(168deg, #0f2490 0%, #0a0f1e 42%, #050810 100%)",
].join(", ");

/**
 * Grote contour-"A" (Allesis) — stroke only, geen fill (punt 1).
 * gradientId moet uniek zijn i.v.m. dubbele laag (voor/achter).
 */
function HeroLetterA({ gradientId }: { gradientId: string }) {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="18%" y1="8%" x2="82%" y2="92%">
          <stop offset="0%" stopColor="#8ec5ff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#c8deff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Geometrische A — drie lijnen, stroke-only */}
      <path
        d="M160 52 L58 268 M160 52 L262 268 M98 188 L222 188"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

type Props = {
  revealTargetId?: string;
};

export default function CinematicHero({
  revealTargetId = CINEMATIC_DIENSTEN_REVEAL_ID,
}: Props) {
  /** Pas na mount animatie activeren — voorkomt SSR/client HTML-mismatch. */
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [scrollHintVisible, setScrollHintVisible] = useState(true);

  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const shapeWrapRef = useRef<HTMLDivElement>(null);
  const pretitleRef = useRef<HTMLParagraphElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const onScroll = () => {
      if (window.scrollY > 24) setScrollHintVisible(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted, prefersReducedMotion]);

  const motionEnabled = mounted && !prefersReducedMotion;

  return (
    <section
      ref={heroSectionRef}
      aria-label="Introductie"
      className={`cinematic-hero relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-6 pb-24 pt-28 md:px-10 md:pb-28 md:pt-32${
        motionEnabled ? " cinematic-hero--await-gsap" : ""
      }`}
      style={{ minHeight: "100dvh", background: "#050810" }}
    >
      {/* Achtergrond: outer = muis-parallax (GSAP), inner = CSS gradient-drift (punt 4) */}
      <div ref={bgParallaxRef} className="hero-bg-layer pointer-events-none" aria-hidden>
        <div
          className="hero-bg-drift h-full w-full"
          style={{ background: HERO_BG_LAYERS }}
        />
      </div>

      {/* Ronddraaiende A — CSS-rotatie op inner, parallax op wrapper (punt 1 + 3) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-end overflow-hidden pr-0 md:pr-[4%]"
        aria-hidden
      >
        <div ref={shapeWrapRef} data-hero-fade="" className="hero-letter-wrap shrink-0 md:h-[480px] md:w-[480px]">
          <div className="hero-letter-spin hero-letter-spin--back">
            <div className={`hero-letter-rotate${motionEnabled ? " hero-letter-rotate--back" : ""}`}>
              <HeroLetterA gradientId="allesis-hero-a-back" />
            </div>
          </div>
          <div className="hero-letter-spin">
            <div className={`hero-letter-rotate${motionEnabled ? " hero-letter-rotate--front" : ""}`}>
              <HeroLetterA gradientId="allesis-hero-a-front" />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={heroContentRef}
        className="relative z-10 flex min-h-[100dvh] w-full flex-1 flex-col justify-center"
      >
        <div className="relative z-[1] mx-auto w-full max-w-6xl">
          <p
            ref={pretitleRef}
            data-hero-fade=""
            className="font-lato text-[11px] font-bold uppercase tracking-[0.28em] text-white/80 md:text-xs"
          >
            GEVONDEN. COMPLIANT. SNEL.
          </p>

          <h1 className="font-sora mt-5 max-w-4xl text-[clamp(2.5rem,7.5vw,5.75rem)] font-black leading-[1.04] tracking-[-0.03em] text-white">
            <span ref={headlineLine1Ref} data-hero-fade="" className="block">
              Uw nieuwe website.
            </span>
            <span ref={headlineLine2Ref} data-hero-fade="" className="mt-1 block md:mt-2">
              Gevonden.
            </span>
            <span ref={headlineLine3Ref} data-hero-fade="" className="block">
              Compliant.
            </span>
          </h1>

          <p
            ref={subtitleRef}
            data-hero-fade=""
            className="font-lato mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/88 md:text-xl"
          >
            Allesis bouwt snelle websites voor het MKB — inclusief hosting, SEO en AVG-compliance.
            Gevestigd in Haarlem.
          </p>

          <div ref={ctaRef} data-hero-fade="" className="mt-10">
            <Link
              ref={ctaButtonRef}
              href="/contact#offerte"
              className="hero-cta-primary font-lato inline-flex min-h-[52px] items-center justify-center rounded-xl bg-accent px-8 text-base font-bold text-neutral-dark transition-colors hover:bg-[#d9f03f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Nieuwe website aanvragen
            </Link>
            <p className="font-lato mt-5 text-sm">
              <Link
                href="/recent-websites"
                className="text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
              >
                Bekijk ons werk
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center md:bottom-10"
        aria-hidden
      >
        <p
          ref={scrollHintRef}
          data-hero-fade=""
          className={`font-lato text-xs tracking-wide text-white/55 transition-opacity duration-300 ${
            scrollHintVisible ? "" : "opacity-0"
          } ${motionEnabled && scrollHintVisible ? "hero-scroll-hint" : ""}`}
        >
          Scroll om te verkennen ↓
        </p>
      </div>

      {motionEnabled ? (
        <CinematicHeroGsap
          heroSectionRef={heroSectionRef}
          heroContentRef={heroContentRef}
          bgParallaxRef={bgParallaxRef}
          shapeWrapRef={shapeWrapRef}
          pretitleRef={pretitleRef}
          headlineLine1Ref={headlineLine1Ref}
          headlineLine2Ref={headlineLine2Ref}
          headlineLine3Ref={headlineLine3Ref}
          subtitleRef={subtitleRef}
          ctaRef={ctaRef}
          ctaButtonRef={ctaButtonRef}
          scrollHintRef={scrollHintRef}
          revealTargetId={revealTargetId}
        />
      ) : null}
    </section>
  );
}
