"use client";

import { useEffect, useRef } from "react";

export default function AllesisLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const W = (canvas.width = 52);
    const H = (canvas.height = 52);
    let frame = 0;
    let raf = 0;
    let cancelled = false;

    const R = 10.5;
    const s = R / 9;

    function draw(ctx: CanvasRenderingContext2D) {
      if (cancelled) return;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const rot = frame * 0.0052;

      // Zachte atmosfeer / glow (alleen blauw)
      const glow = ctx.createRadialGradient(cx - 3, cy - 3, 2, cx, cy, R + 14);
      glow.addColorStop(0, "rgba(125,211,252,0.42)");
      glow.addColorStop(0.5, "rgba(59,130,246,0.22)");
      glow.addColorStop(1, "rgba(15,23,42,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R + 13, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Oceaan (dominant blauw)
      const ocean = ctx.createRadialGradient(cx - 3.5, cy - 3.5, 0.5, cx, cy, R);
      ocean.addColorStop(0, "#7dd3fc");
      ocean.addColorStop(0.35, "#38bdf8");
      ocean.addColorStop(0.68, "#0284c7");
      ocean.addColorStop(1, "#1e40af");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = ocean;
      ctx.fill();

      // Raster + continenten draaien mee
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.translate(-cx, -cy);

      // Meridiaan-achtige ellipsen (herkenbare bol)
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 0.55;
      for (let i = 0; i < 7; i++) {
        const phase = (i / 7) * Math.PI;
        const ex = Math.max(0.35, R * 0.92 * Math.abs(Math.sin(phase)));
        ctx.beginPath();
        ctx.ellipse(cx, cy, ex, R, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Breedtegraden
      ctx.strokeStyle = "rgba(255,255,255,0.11)";
      ctx.lineWidth = 0.45;
      for (const dy of [-5, -2.5, 0, 2.5, 5]) {
        const dys = dy * s;
        const w = Math.sqrt(Math.max(0, R * R - dys * dys));
        if (w < 0.5) continue;
        ctx.beginPath();
        ctx.ellipse(cx, cy + dys, w, Math.max(0.4, w * 0.22), 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Land: kleiner oppervlak, teal (leest als aarde maar minder “groen bol”)
      const land = "#5eead4";
      const landDeep = "#0d9488";

      ctx.fillStyle = land;
      ctx.strokeStyle = landDeep;
      ctx.lineWidth = 0.32;
      ctx.globalAlpha = 0.88;
      const ls = s * 0.88;

      // Noord- en Zuid-Amerika (links, iets compacter)
      ctx.beginPath();
      ctx.moveTo(cx - 3.5 * ls, cy - 6 * ls);
      ctx.bezierCurveTo(cx - 7 * ls, cy - 6.5 * ls, cx - 7.6 * ls, cy - 2 * ls, cx - 6.8 * ls, cy + 0.4 * ls);
      ctx.bezierCurveTo(cx - 6.2 * ls, cy + 2.8 * ls, cx - 4.8 * ls, cy + 5 * ls, cx - 3 * ls, cy + 5.6 * ls);
      ctx.bezierCurveTo(cx - 1.6 * ls, cy + 3.6 * ls, cx - 2.4 * ls, cy + 0.8 * ls, cx - 3 * ls, cy - 1.4 * ls);
      ctx.bezierCurveTo(cx - 3.5 * ls, cy - 3.8 * ls, cx - 3.5 * ls, cy - 6 * ls, cx - 3.5 * ls, cy - 6 * ls);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Afrika
      ctx.beginPath();
      ctx.moveTo(cx + 0.4 * ls, cy - 5.2 * ls);
      ctx.bezierCurveTo(cx + 2.6 * ls, cy - 4.7 * ls, cx + 3.6 * ls, cy - 1 * ls, cx + 3.4 * ls, cy + 1.8 * ls);
      ctx.bezierCurveTo(cx + 2.9 * ls, cy + 5 * ls, cx + 1.4 * ls, cy + 6.4 * ls, cx + 0.15 * ls, cy + 5.2 * ls);
      ctx.bezierCurveTo(cx - 0.7 * ls, cy + 3.2 * ls, cx - 0.45 * ls, cy + 0.45 * ls, cx + 0.15 * ls, cy - 2.2 * ls);
      ctx.bezierCurveTo(cx + 0.35 * ls, cy - 4.2 * ls, cx + 0.4 * ls, cy - 5.2 * ls, cx + 0.4 * ls, cy - 5.2 * ls);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Europa
      ctx.beginPath();
      ctx.moveTo(cx - 0.45 * ls, cy - 6.4 * ls);
      ctx.bezierCurveTo(cx + 2.2 * ls, cy - 6.1 * ls, cx + 2.85 * ls, cy - 4.7 * ls, cx + 2.45 * ls, cy - 3.6 * ls);
      ctx.bezierCurveTo(cx + 1.1 * ls, cy - 4 * ls, cx - 0.45 * ls, cy - 4.9 * ls, cx - 1.05 * ls, cy - 5.85 * ls);
      ctx.bezierCurveTo(cx - 0.9 * ls, cy - 6.4 * ls, cx - 0.45 * ls, cy - 6.4 * ls, cx - 0.45 * ls, cy - 6.4 * ls);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Azië (kleiner)
      ctx.beginPath();
      ctx.moveTo(cx + 5 * ls, cy - 2.7 * ls);
      ctx.bezierCurveTo(cx + 6.3 * ls, cy - 1.8 * ls, cx + 6.5 * ls, cy + 0.85 * ls, cx + 5.6 * ls, cy + 2.2 * ls);
      ctx.bezierCurveTo(cx + 4.5 * ls, cy + 1.8 * ls, cx + 4.1 * ls, cy - 0.45 * ls, cx + 4.7 * ls, cy - 2.2 * ls);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.globalAlpha = 1;

      // Poolkappen
      ctx.fillStyle = "rgba(248,250,252,0.94)";
      ctx.beginPath();
      ctx.ellipse(cx, cy - 7.2 * s, 3.2 * s, 1.15 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx, cy + 7.2 * s, 2.8 * s, 1 * s, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // einde rotatie
      ctx.restore(); // clip

      // Glans op de bol (boven links)
      const hi = ctx.createRadialGradient(cx - 3.5 * s, cy - 3.5 * s, 0, cx - 2.2 * s, cy - 2.2 * s, 5.2 * s);
      hi.addColorStop(0, "rgba(255,255,255,0.65)");
      hi.addColorStop(0.5, "rgba(255,255,255,0.12)");
      hi.addColorStop(1, "rgba(255,255,255,0)");
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = hi;
      ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      ctx.restore();

      frame++;
      if (!cancelled) {
        raf = requestAnimationFrame(() => draw(ctx));
      }
    }

    draw(context);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <canvas ref={canvasRef} style={{ width: 44, height: 44 }} />
      <span
        style={{
          fontWeight: 800,
          fontSize: "1.25rem",
          color: "#0f172a",
          letterSpacing: "-0.5px",
          lineHeight: 1,
        }}
      >
        Allesis<span style={{ color: "#1d4ed8" }}>.nl</span>
      </span>
    </div>
  );
}
