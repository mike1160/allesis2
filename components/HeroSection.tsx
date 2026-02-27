"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Fade from transparent to white overlay as user scrolls
  const maxScroll = 400;
  const progress = Math.min(scrollY / maxScroll, 1);
  const overlayOpacity = progress * 0.92;
  const textOpacity = 1 - progress * 0.3;

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/allesis4.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        transform: `scale(${1 + scrollY * 0.0002})`,
        transition: "transform 0.1s ease-out",
      }} />

      {/* Frosted glass / white overlay that grows on scroll */}
      <div style={{
        position: "absolute", inset: 0,
        background: `rgba(255,255,255,${overlayOpacity})`,
        backdropFilter: `blur(${progress * 12}px)`,
        WebkitBackdropFilter: `blur(${progress * 12}px)`,
        transition: "background 0.05s, backdrop-filter 0.05s",
      }} />

      {/* Dark gradient overlay at bottom for text readability when not scrolled */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to bottom, rgba(0,0,0,${0.15 * (1-progress)}) 0%, rgba(0,0,0,${0.45 * (1-progress)}) 100%)`,
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 780, margin: "0 auto",
        padding: "0 24px",
        textAlign: "center",
        opacity: textOpacity,
        paddingTop: 64,
      }}>
        <p style={{
          fontFamily: "Lato, sans-serif",
          fontSize: 13, fontWeight: 700,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: progress > 0.5 ? "#1a3bcc" : "rgba(255,255,255,0.85)",
          marginBottom: 16,
          transition: "color 0.3s",
        }}>
          Haarlem, Nederland — Webhosting & Vertaling
        </p>

        <h1 style={{
          fontFamily: "Sora, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          lineHeight: 1.1,
          color: progress > 0.5 ? "#0f172a" : "white",
          marginBottom: 24,
          transition: "color 0.3s",
          textShadow: progress > 0.5 ? "none" : "0 2px 20px rgba(0,0,0,0.3)",
        }}>
          Alles voor uw website,<br />
          <span style={{ color: progress > 0.5 ? "#1a3bcc" : "#93c5fd" }}>
            onder één dak
          </span>
        </h1>

        <p style={{
          fontFamily: "Lato, sans-serif",
          fontSize: 18,
          color: progress > 0.5 ? "#64748b" : "rgba(255,255,255,0.9)",
          lineHeight: 1.75,
          marginBottom: 44,
          fontWeight: 300,
          maxWidth: 600,
          margin: "0 auto 44px",
          transition: "color 0.3s",
          textShadow: progress > 0.5 ? "none" : "0 1px 8px rgba(0,0,0,0.25)",
        }}>
          Domeinregistratie, hosting, webdesign, SEO en Thais-Nederlands vertaalservice voor het MKB en particulieren.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/hosting" style={{
            padding: "15px 32px",
            background: "#1a3bcc",
            color: "white",
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 10,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(26,59,204,0.4)",
          }}>
            Bekijk hosting →
          </Link>
          <Link href="/contact" style={{
            padding: "15px 32px",
            background: progress > 0.4 ? "white" : "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: progress > 0.4 ? "2px solid #e2e6f0" : "2px solid rgba(255,255,255,0.5)",
            color: progress > 0.4 ? "#374151" : "white",
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 10,
            textDecoration: "none",
            transition: "all 0.3s",
          }}>
            Contact
          </Link>
        </div>

        {/* Scroll indicator */}
        {scrollY < 50 && (
          <div style={{
            position: "absolute",
            bottom: -80,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: 1 - scrollY / 50,
          }}>
            <span style={{ fontFamily: "Lato, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: ".1em", textTransform: "uppercase" }}>Scroll</span>
            <div style={{
              width: 1, height: 40,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)",
              animation: "pulse 1.5s infinite",
            }} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.5; transform: scaleY(0.8); }
        }
      `}</style>
    </section>
  );
}
