"use client";

import { useEffect, useRef } from "react";
import type { WeerEffect } from "@/lib/weer";

/** Achtergrond (lucht) per weertype. */
export const LUCHT: Record<WeerEffect, string> = {
  herfst: "linear-gradient(165deg, #1c0d05 0%, #4a1f0a 45%, #8a3b10 100%)",
  regen: "linear-gradient(170deg, #070b14 0%, #142033 50%, #26354d 100%)",
  sneeuw: "linear-gradient(170deg, #0d1626 0%, #23324a 55%, #4b5d78 100%)",
  zon: "linear-gradient(160deg, #06263f 0%, #0e5a8a 50%, #e0962f 115%)",
  mist: "linear-gradient(175deg, #151a21 0%, #2b333d 55%, #46505c 100%)",
  sterren: "linear-gradient(175deg, #02030a 0%, #0b1030 55%, #1d1748 100%)",
  bloesem: "linear-gradient(165deg, #1f0716 0%, #4d1030 50%, #8c2a57 100%)",
};

type Deeltje = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  vrot: number;
  fase: number;
  kleur: string;
  a: number;
};

const HERFST_KLEUREN = ["#e8590c", "#d9480f", "#f08c00", "#c92a2a", "#b5651d", "#f59f00", "#a61e4d"];
const BLOESEM_KLEUREN = ["#ffd1dc", "#ffc0cb", "#ffe4ec", "#f8a5c2", "#fff0f5"];

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function aantal(effect: WeerEffect, w: number) {
  const schaal = Math.min(1, w / 1200);
  const basis: Record<WeerEffect, number> = { herfst: 34, regen: 190, sneeuw: 150, zon: 46, mist: 11, sterren: 170, bloesem: 40 };
  return Math.max(8, Math.round(basis[effect] * (0.45 + 0.55 * schaal)));
}

function maak(effect: WeerEffect, w: number, h: number, begin: boolean): Deeltje {
  const y = begin ? rnd(-h, h) : rnd(-80, -10);
  switch (effect) {
    case "herfst":
    case "bloesem":
      return {
        x: rnd(-50, w + 50), y, vx: rnd(-0.4, 0.6), vy: rnd(0.6, 1.5),
        r: effect === "herfst" ? rnd(9, 17) : rnd(4, 7.5), rot: rnd(0, Math.PI * 2), vrot: rnd(-0.03, 0.03),
        fase: rnd(0, Math.PI * 2), kleur: (effect === "herfst" ? HERFST_KLEUREN : BLOESEM_KLEUREN)[Math.floor(rnd(0, 7)) % (effect === "herfst" ? 7 : 5)],
        a: rnd(0.75, 1),
      };
    case "regen":
      return { x: rnd(-100, w + 100), y: begin ? rnd(-h, h) : rnd(-60, -10), vx: -2.2, vy: rnd(11, 17), r: rnd(12, 24), rot: 0, vrot: 0, fase: 0, kleur: "", a: rnd(0.25, 0.6) };
    case "sneeuw":
      return { x: rnd(0, w), y, vx: 0, vy: rnd(0.35, 1.2), r: rnd(1, 3.6), rot: 0, vrot: 0, fase: rnd(0, Math.PI * 2), kleur: "", a: rnd(0.5, 0.95) };
    case "zon":
      return { x: rnd(0, w), y: begin ? rnd(0, h) : h + 10, vx: rnd(-0.15, 0.15), vy: rnd(-0.35, -0.1), r: rnd(1, 2.6), rot: 0, vrot: 0, fase: rnd(0, Math.PI * 2), kleur: "", a: rnd(0.2, 0.7) };
    case "mist":
      return { x: rnd(-w * 0.3, w), y: rnd(h * 0.15, h * 0.95), vx: rnd(0.12, 0.35) * (Math.random() < 0.5 ? 1 : -1), vy: 0, r: rnd(w * 0.25, w * 0.5), rot: 0, vrot: 0, fase: rnd(0, Math.PI * 2), kleur: "", a: rnd(0.15, 0.27) };
    case "sterren":
      return { x: rnd(0, w), y: rnd(0, h), vx: 0, vy: 0, r: rnd(0.4, 1.6), rot: 0, vrot: rnd(0.01, 0.04), fase: rnd(0, Math.PI * 2), kleur: "", a: rnd(0.3, 1) };
  }
}

function blad(ctx: CanvasRenderingContext2D, d: Deeltje) {
  const flip = Math.cos(d.fase * 1.7);
  ctx.save();
  ctx.translate(d.x, d.y);
  ctx.rotate(d.rot);
  ctx.scale(flip, 1);
  ctx.globalAlpha = d.a;
  ctx.fillStyle = d.kleur;
  const r = d.r;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.bezierCurveTo(r * 0.9, -r * 0.6, r * 0.8, r * 0.5, 0, r);
  ctx.bezierCurveTo(-r * 0.8, r * 0.5, -r * 0.9, -r * 0.6, 0, -r);
  ctx.fill();
  ctx.strokeStyle = "rgba(60,20,0,0.35)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.9);
  ctx.lineTo(0, r * 1.25);
  ctx.stroke();
  ctx.restore();
}

function bloemblad(ctx: CanvasRenderingContext2D, d: Deeltje) {
  ctx.save();
  ctx.translate(d.x, d.y);
  ctx.rotate(d.rot);
  ctx.scale(Math.cos(d.fase * 1.5), 1);
  ctx.globalAlpha = d.a;
  ctx.fillStyle = d.kleur;
  ctx.beginPath();
  ctx.ellipse(0, 0, d.r, d.r * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function WeatherFx({ effect }: { effect: WeerEffect }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rustig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let deeltjes: Deeltje[] = [];
    let zichtbaar = true;
    let raf = 0;
    let vallendeSter: { x: number; y: number; life: number } | null = null;

    const formaat = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      deeltjes = Array.from({ length: aantal(effect, w) }, () => maak(effect, w, h, true));
    };

    const teken = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < deeltjes.length; i++) {
        const d = deeltjes[i];
        switch (effect) {
          case "herfst":
          case "bloesem": {
            d.fase += 0.02;
            d.x += d.vx + Math.sin(d.fase) * 0.9;
            d.y += d.vy;
            d.rot += d.vrot;
            if (effect === "herfst") blad(ctx, d);
            else bloemblad(ctx, d);
            break;
          }
          case "regen": {
            d.x += d.vx;
            d.y += d.vy;
            ctx.strokeStyle = `rgba(190,210,240,${d.a})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x + d.vx * 1.6, d.y + d.r);
            ctx.stroke();
            if (d.y > h - 4 && Math.random() < 0.35) {
              ctx.strokeStyle = `rgba(190,210,240,${d.a * 0.8})`;
              ctx.beginPath();
              ctx.ellipse(d.x, h - 3, 5, 1.5, 0, 0, Math.PI * 2);
              ctx.stroke();
            }
            break;
          }
          case "sneeuw": {
            d.fase += 0.012;
            d.x += Math.sin(d.fase) * 0.5;
            d.y += d.vy;
            ctx.fillStyle = `rgba(255,255,255,${d.a})`;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fill();
            break;
          }
          case "zon": {
            d.fase += 0.02;
            d.x += d.vx + Math.sin(d.fase) * 0.2;
            d.y += d.vy;
            ctx.fillStyle = `rgba(255,220,150,${d.a * (0.6 + 0.4 * Math.sin(d.fase * 2))})`;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fill();
            break;
          }
          case "mist": {
            d.x += d.vx;
            const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
            g.addColorStop(0, `rgba(220,226,232,${d.a})`);
            g.addColorStop(1, "rgba(220,226,232,0)");
            ctx.fillStyle = g;
            ctx.fillRect(d.x - d.r, d.y - d.r, d.r * 2, d.r * 2);
            if (d.x - d.r > w) d.x = -d.r;
            if (d.x + d.r < 0) d.x = w + d.r;
            break;
          }
          case "sterren": {
            d.fase += d.vrot;
            ctx.fillStyle = `rgba(255,255,255,${d.a * (0.55 + 0.45 * Math.sin(d.fase))})`;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fill();
            break;
          }
        }
        const weg =
          effect === "zon" ? d.y < -10 : effect === "mist" || effect === "sterren" ? false : d.y > h + 30 || d.x < -120 || d.x > w + 120;
        if (weg) deeltjes[i] = maak(effect, w, h, false);
      }

      if (effect === "sterren") {
        if (!vallendeSter && Math.random() < 0.004) vallendeSter = { x: rnd(w * 0.2, w), y: rnd(0, h * 0.4), life: 1 };
        if (vallendeSter) {
          const s = vallendeSter;
          const g = ctx.createLinearGradient(s.x, s.y, s.x + 90, s.y - 35);
          g.addColorStop(0, `rgba(255,255,255,${s.life})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + 90, s.y - 35);
          ctx.stroke();
          s.x -= 9;
          s.y += 3.5;
          s.life -= 0.025;
          if (s.life <= 0) vallendeSter = null;
        }
      }
    };

    const lus = () => {
      if (zichtbaar && !document.hidden) teken();
      raf = requestAnimationFrame(lus);
    };

    formaat();
    if (rustig) {
      teken();
    } else {
      raf = requestAnimationFrame(lus);
    }

    const ro = new ResizeObserver(formaat);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      zichtbaar = e.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [effect]);

  return (
    <>
      {effect === "zon" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="weer-zon-gloed absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full" />
          <div className="weer-zon-stralen absolute -right-[420px] -top-[420px] h-[1200px] w-[1200px]" />
        </div>
      )}
      <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
    </>
  );
}
