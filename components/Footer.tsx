import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0f172a", color: "white", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: "#1a3bcc", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 14 }}>A</span>
              </div>
              <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18 }}>Allesis.nl</span>
            </div>
            <p style={{ fontFamily: "Lato, sans-serif", color: "#94a3b8", fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
              Domeinregistratie, hosting, webdesign, SEO en Thais-Nederlands vertaalservice. Gevestigd in Haarlem, Nederland.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: ".08em", color: "#64748b", marginBottom: 16 }}>Diensten</h4>
            {[
              { href: "/hosting", label: "Hosting & Domeinen" },
              { href: "/domeinen", label: "Domein checken" },
              { href: "/vertaling", label: "Vertaling & Tolk" },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: 10 }}>
                <Link href={l.href} style={{ fontFamily: "Lato, sans-serif", color: "#94a3b8", fontSize: 14, textDecoration: "none" }}>{l.label}</Link>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: ".08em", color: "#64748b", marginBottom: 16 }}>Contact</h4>
            <div style={{ marginBottom: 10 }}>
              <a href="mailto:info@allesis.nl" style={{ fontFamily: "Lato, sans-serif", color: "#94a3b8", fontSize: 14, textDecoration: "none" }}>info@allesis.nl</a>
            </div>
            <div style={{ marginBottom: 10 }}>
              <Link href="/contact" style={{ fontFamily: "Lato, sans-serif", color: "#94a3b8", fontSize: 14, textDecoration: "none" }}>Stuur een bericht</Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1e293b", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "Lato, sans-serif", color: "#475569", fontSize: 13 }}>© {new Date().getFullYear()} Allesis. Alle rechten voorbehouden.</p>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/disclaimer" style={{ fontFamily: "Lato, sans-serif", color: "#475569", fontSize: 13, textDecoration: "none" }}>Disclaimer & Privacy</Link>
            <Link href="/contact" style={{ fontFamily: "Lato, sans-serif", color: "#475569", fontSize: 13, textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
