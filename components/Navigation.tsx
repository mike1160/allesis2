"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/hosting", label: "Hosting & Domeinen" },
  { href: "/vertaling", label: "Vertaling & Tolk" },
  { href: "/domeinen", label: "Domein checken" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? "rgba(255,255,255,0.97)" : "white", borderBottom: "1px solid #e2e6f0", boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.07)" : "none", transition: "box-shadow .3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, background: "#1a3bcc", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 14 }}>A</span>
          </div>
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: "#0f172a" }}>
            Allesis<span style={{ color: "#1a3bcc" }}>.nl</span>
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontFamily: "Lato, sans-serif", fontSize: 14, fontWeight: 700, color: "#374151", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1a3bcc")}
              onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>
              {l.label}
            </Link>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }} className="show-mobile">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <div style={{ background: "white", borderTop: "1px solid #e2e6f0", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, color: "#374151", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      )}
      <style>{`.hidden-mobile{display:flex!important}.show-mobile{display:none!important}@media(max-width:768px){.hidden-mobile{display:none!important}.show-mobile{display:block!important}}`}</style>
    </nav>
  );
}
