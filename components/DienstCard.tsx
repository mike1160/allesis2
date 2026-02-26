"use client";
import Link from "next/link";

type Props = { icon: string; titel: string; tekst: string; href: string; };

export default function DienstCard({ icon, titel, tekst, href }: Props) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block", padding: 28, border: "1px solid #e2e6f0", borderRadius: 12, background: "white", transition: "all .2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1a3bcc"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(26,59,204,0.1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e2e6f0"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
      <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 8 }}>{titel}</h3>
      <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{tekst}</p>
    </Link>
  );
}
