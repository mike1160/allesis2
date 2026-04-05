import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AVG Boetes — Wat Riskeert u als Ondernemer?",
  description:
    "De AP legt steeds meer AVG-boetes op aan Nederlandse bedrijven. Ontdek wat u riskeert en hoe u uw website snel compliant maakt. Allesis helpt u.",
  alternates: { canonical: "https://allesis.nl/avg-boetes" },
};

const bedragen = [
  "Lichte overtredingen: tot €10 miljoen of 2% jaaromzet",
  "Zware overtredingen: tot €20 miljoen of 4% jaaromzet",
  "Informele handhaving (waarschuwing, last onder dwangsom) is ook mogelijk",
];

const overtredingen = [
  "Geen of onvolledig privacybeleid",
  "Cookiebanner die geen echte keuze biedt",
  "Google Analytics zonder correcte configuratie",
  "Contactformulieren zonder vermelding van gegevensverwerking",
];

const voorkomen = [
  "Laat uw website controleren op AVG-compliance",
  "Allesis levert bij elke nieuwe website een volledig compliant pakket",
];

export default function AvgBoetesPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 24px 40px", background: "linear-gradient(180deg, #fef2f2 0%, #ffffff 100%)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#dc2626", marginBottom: 16 }}>
            AVG handhaving
          </p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(1.85rem, 4vw, 2.5rem)", color: "#0f172a", lineHeight: 1.25, marginBottom: 16 }}>
            AVG-boetes: wat riskeert u als ondernemer?
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", lineHeight: 1.7 }}>
            Inzicht in maxima, veelgemaakte fouten op websites en hoe u risico beperkt.
          </p>
        </div>
      </section>

      <section style={{ padding: "40px 24px 48px", background: "white" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 20 }}>
            Hoeveel kan een AVG-boete bedragen?
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {bedragen.map((item) => (
              <li key={item} style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#374151", display: "flex", gap: 12, lineHeight: 1.6 }}>
                <span style={{ color: "#dc2626", fontWeight: 700 }}>€</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ padding: "48px 24px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 20 }}>
            Meest voorkomende overtredingen op websites
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {overtredingen.map((item) => (
              <li key={item} style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#374151", display: "flex", gap: 12, lineHeight: 1.6 }}>
                <span style={{ color: "#1a3bcc", fontWeight: 700 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ padding: "48px 24px 72px", background: "white" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 20 }}>
            Hoe voorkomt u een boete?
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
            {voorkomen.map((item) => (
              <li key={item} style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#374151", display: "flex", gap: 12, lineHeight: 1.6 }}>
                <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", lineHeight: 1.65, marginBottom: 24 }}>
            Zie ook:{" "}
            <Link href="/avg-regelgeving" style={{ color: "#1a3bcc", fontWeight: 700, textDecoration: "none" }}>
              AVG-regelgeving voor websites
            </Link>
            .
          </p>
          <div style={{ textAlign: "center" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                background: "#1a3bcc",
                color: "white",
                fontFamily: "Lato, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Vraag een AVG-check aan →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
