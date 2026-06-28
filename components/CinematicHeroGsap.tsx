"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  heroSectionRef: React.RefObject<HTMLElement | null>;
  heroContentRef: React.RefObject<HTMLElement | null>;
  bgParallaxRef: React.RefObject<HTMLDivElement | null>;
  shapeWrapRef: React.RefObject<HTMLDivElement | null>;
  pretitleRef: React.RefObject<HTMLElement | null>;
  headlineLine1Ref: React.RefObject<HTMLElement | null>;
  headlineLine2Ref: React.RefObject<HTMLElement | null>;
  headlineLine3Ref: React.RefObject<HTMLElement | null>;
  subtitleRef: React.RefObject<HTMLElement | null>;
  ctaRef: React.RefObject<HTMLElement | null>;
  ctaButtonRef: React.RefObject<HTMLElement | null>;
  scrollHintRef: React.RefObject<HTMLElement | null>;
  revealTargetId: string;
};

/** Touch-apparaat — geen muis-parallax of magnetische CTA (punt 3 + 5) */
function isTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches;
}

/**
 * Client-only GSAP — lazy-loaded via next/dynamic in CinematicHero.
 */
export default function CinematicHeroGsap({
  heroSectionRef,
  heroContentRef,
  bgParallaxRef,
  shapeWrapRef,
  pretitleRef,
  headlineLine1Ref,
  headlineLine2Ref,
  headlineLine3Ref,
  subtitleRef,
  ctaRef,
  ctaButtonRef,
  scrollHintRef,
  revealTargetId,
}: Props) {
  useLayoutEffect(() => {
    const heroSection = heroSectionRef.current;
    const heroContent = heroContentRef.current;
    const bgParallax = bgParallaxRef.current;
    const shapeWrap = shapeWrapRef.current;
    const pretitle = pretitleRef.current;
    const headlineLines = [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current].filter(
      Boolean,
    ) as HTMLElement[];
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const ctaButton = ctaButtonRef.current;
    const scrollHint = scrollHintRef.current;
    const revealEl = document.getElementById(revealTargetId);

    if (!heroSection || !heroContent || headlineLines.length === 0) return;

    heroSection.classList.remove("cinematic-hero--await-gsap");

    const touch = isTouchDevice();
    let ctx: gsap.Context | null = null;

    try {
      ctx = gsap.context(function registerHeroAnimations(this: gsap.Context) {
        // --- Punt 2: startstate voor staggered load-reveal ---
        const fadeTargets = [pretitle, ...headlineLines, subtitle, cta, scrollHint].filter(Boolean);
        gsap.set(fadeTargets, { opacity: 0, y: 28 });
        if (shapeWrap) gsap.set(shapeWrap, { opacity: 0, scale: 0.92 });

        // Rotatie van de A loopt via CSS @keyframes — geen GSAP hier (punt 1, performance)

        // --- Punt 2: load-timeline met stagger op kopregels ---
        const loadTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (shapeWrap) {
          loadTl.to(shapeWrap, { opacity: 1, scale: 1, duration: 1.35 }, 0);
        }
        if (pretitle) {
          loadTl.to(pretitle, { opacity: 1, y: 0, duration: 0.85 }, 0.12);
        }
        loadTl.to(
          headlineLines,
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.13,
          },
          0.28,
        );
        if (subtitle) {
          loadTl.to(subtitle, { opacity: 1, y: 0, duration: 0.85 }, 0.62);
        }
        if (cta) {
          loadTl.to(cta, { opacity: 1, y: 0, duration: 0.75 }, 0.82);
        }
        if (scrollHint) {
          loadTl.to(scrollHint, { opacity: 1, y: 0, duration: 0.65 }, 0.98);
        }

        // --- Punt 3: subtiele muis-parallax via quickTo (max ~12px) ---
        if (!touch && shapeWrap && bgParallax) {
          const shapeX = gsap.quickTo(shapeWrap, "x", { duration: 0.85, ease: "power2.out" });
          const shapeY = gsap.quickTo(shapeWrap, "y", { duration: 0.85, ease: "power2.out" });
          const bgX = gsap.quickTo(bgParallax, "x", { duration: 1.1, ease: "power2.out" });
          const bgY = gsap.quickTo(bgParallax, "y", { duration: 1.1, ease: "power2.out" });

          const onParallaxMove = (event: MouseEvent) => {
            const nx = (event.clientX / window.innerWidth - 0.5) * 2;
            const ny = (event.clientY / window.innerHeight - 0.5) * 2;
            shapeX(nx * 12);
            shapeY(ny * 10);
            bgX(nx * -8);
            bgY(ny * -6);
          };

          heroSection.addEventListener("mousemove", onParallaxMove);
          this.add(() => {
            heroSection.removeEventListener("mousemove", onParallaxMove);
            shapeX(0);
            shapeY(0);
            bgX(0);
            bgY(0);
          });
        }

        // --- Punt 5: magnetische hover op primaire CTA (max ~7px) ---
        if (!touch && ctaButton) {
          gsap.set(ctaButton, { x: 0, y: 0 });

          const magnetX = gsap.quickTo(ctaButton, "x", { duration: 0.45, ease: "power3.out" });
          const magnetY = gsap.quickTo(ctaButton, "y", { duration: 0.45, ease: "power3.out" });

          const MAGNET_PADDING = 40;
          const MAX_PULL = 7;

          const onMagnetMove = (event: MouseEvent) => {
            const rect = ctaButton.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const nearX =
              event.clientX >= rect.left - MAGNET_PADDING && event.clientX <= rect.right + MAGNET_PADDING;
            const nearY =
              event.clientY >= rect.top - MAGNET_PADDING && event.clientY <= rect.bottom + MAGNET_PADDING;

            if (!nearX || !nearY) {
              magnetX(0);
              magnetY(0);
              return;
            }

            const dx = event.clientX - cx;
            const dy = event.clientY - cy;
            const dist = Math.hypot(dx, dy);
            const maxDist = Math.max(rect.width, rect.height) / 2 + MAGNET_PADDING;
            const strength = Math.max(0, 1 - dist / maxDist);

            magnetX(gsap.utils.clamp(-MAX_PULL, MAX_PULL, dx * strength * 0.22));
            magnetY(gsap.utils.clamp(-MAX_PULL, MAX_PULL, dy * strength * 0.22));
          };

          const resetMagnet = () => {
            magnetX(0);
            magnetY(0);
          };

          heroSection.addEventListener("mousemove", onMagnetMove);
          ctaButton.addEventListener("mouseleave", resetMagnet);
          this.add(() => {
            heroSection.removeEventListener("mousemove", onMagnetMove);
            ctaButton.removeEventListener("mouseleave", resetMagnet);
            magnetX(0);
            magnetY(0);
          });
        }

        // --- Scroll: hero vervaagt, A beweegt mee ---
        gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 0.75,
          },
        }).to(heroContent, { scale: 0.94, opacity: 0.15, y: -56, ease: "none" }, 0);

        if (shapeWrap) {
          gsap.to(shapeWrap, {
            y: -90,
            scale: 1.06,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: 0.75,
            },
          });
        }

        // --- Diensten-sectie: clip-path reveal ---
        if (revealEl) {
          gsap.fromTo(
            revealEl,
            { clipPath: "inset(12% 0 0 0 round 0px)", opacity: 0.92 },
            {
              clipPath: "inset(0% 0 0 0 round 0px)",
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: revealEl,
                start: "top 94%",
                end: "top 42%",
                scrub: 0.9,
              },
            },
          );
        }
      }, heroSection);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    } catch (err) {
      console.error("[CinematicHeroGsap]", err);
      heroSection.classList.remove("cinematic-hero--await-gsap");
    }

    return () => {
      ctx?.revert();
    };
  }, [
    heroSectionRef,
    heroContentRef,
    bgParallaxRef,
    shapeWrapRef,
    pretitleRef,
    headlineLine1Ref,
    headlineLine2Ref,
    headlineLine3Ref,
    subtitleRef,
    ctaRef,
    ctaButtonRef,
    scrollHintRef,
    revealTargetId,
  ]);

  return null;
}
