import Link from "next/link";
import DienstCard from "@/components/DienstCard";
import DomainChecker from "@/components/DomainChecker";

const diensten = [
  { icon: "🌐", titel: "Webhosting", tekst: "Snel, betrouwbaar en alles in één pakket. Van € 4,95/mnd.", href: "/hosting" },
  { icon: "🔎", titel: "Domeinregistratie", tekst: "Check en registreer direct uw domeinnaam. Alle extensies.", href: "/domeinen" },
  { icon: "🎨", titel: "Webdesign & SEO", tekst: "Professioneel webdesign vanaf € 599,– inclusief SEO pakket.", href: "/contact" },
  { icon: "🇹🇭", titel: "Thais-NL Vertaling", tekst: "Professionele vertaal- en tolkdiensten voor zakelijk en privé.", href: "/vertaling" },
];

const pakketten = [
  {
    naam: "Lite", prijs: "4,95", features: ["1.000 MB schijfruimte", "20 GB dataverkeer", "5 e-mailaccounts", "1 MySQL database", "SSL certificaat", "Helpdesk"],
  },
  {
    naam: "Start Up", prijs: "8,95", highlight: true,
    features: ["4.000 MB schijfruimte", "80 GB dataverkeer", "10 e-mailaccounts", "2 MySQL databases", "SSL certificaat", "Helpdesk"],
  },
  {
    naam: "Basic", prijs: "14,95",
    features: ["8.000 MB schijfruimte", "320 GB dataverkeer", "50 e-mailaccounts", "2 MySQL databases", "SSL certificaat", "Helpdesk"],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 60%)", paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div className="fu1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 999, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a3bcc", display: "inline-block" }} />
              <span style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, color: "#1a3bcc", letterSpacing: ".04em" }}>Amsterdam & omgeving · Sinds 2010</span>
            </div>

            <h1 className="fu2" style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", lineHeight: 1.12, color: "#0f172a", marginBottom: 20 }}>
              Alles voor uw website,<br />
              <span style={{ color: "#1a3bcc" }}>onder één dak</span>
            </h1>

            <p className="fu3" style={{ fontFamily: "Lato, sans-serif", fontSize: 18, color: "#64748b", lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
              Domeinregistratie, hosting, webdesign, SEO en Thais-Nederlands vertaalservice voor het MKB en particulieren.
            </p>

            {/* Domain checker */}
            <div className="fu4">
              <DomainChecker />
            </div>
          </div>
        </div>
      </section>

      {/* Diensten */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Wat wij doen</p>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#0f172a" }}>Onze diensten</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {diensten.map(d => (
              <DienstCard key={d.titel} {...d} />
            ))}
          </div>
        </div>
      </section>

      {/* Pakketten */}
      <section style={{ padding: "80px 24px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Hosting</p>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#0f172a" }}>Kies uw pakket</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, maxWidth: 900, margin: "0 auto" }}>
            {pakketten.map(p => (
              <div key={p.naam} style={{
                background: p.highlight ? "#1a3bcc" : "white",
                color: p.highlight ? "white" : "#0f172a",
                border: p.highlight ? "none" : "1px solid #e2e6f0",
                borderRadius: 16, padding: 32,
                boxShadow: p.highlight ? "0 8px 40px rgba(26,59,204,0.25)" : "none",
                transform: p.highlight ? "scale(1.03)" : "none",
              }}>
                {p.highlight && <div style={{ fontFamily: "Lato, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#a5b4fc", marginBottom: 12 }}>Meest gekozen</div>}
                <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{p.naam}</h3>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 36, color: p.highlight ? "white" : "#1a3bcc" }}>€ {p.prijs}</span>
                  <span style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: p.highlight ? "#a5b4fc" : "#94a3b8" }}>/mnd</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: p.highlight ? "#e0e7ff" : "#374151", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: p.highlight ? "#a5b4fc" : "#16a34a", fontSize: 16 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" style={{
                  display: "block", textAlign: "center", padding: "12px 0",
                  background: p.highlight ? "white" : "#1a3bcc",
                  color: p.highlight ? "#1a3bcc" : "white",
                  fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14,
                  borderRadius: 8, textDecoration: "none",
                }}>Bestel nu →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Klanten</p>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#0f172a" }}>Wat zij zeggen</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { quote: "Dankzij Allesis staat mijn website al jaren bij de eerste 3 zoekresultaten van Google — zonder Google Adwords.", naam: "M. Kleinjans", bedrijf: "Snelontruiming" },
              { quote: "Mijn website werd geredesignd met mooie foto's, goed vindbaar op Google en alle sociale netwerken werden ook bijgehouden.", naam: "Runee", bedrijf: "Bangkokwellness" },
            ].map(r => (
              <div key={r.naam} style={{ padding: 28, border: "1px solid #e2e6f0", borderRadius: 12, background: "#f8f9fc" }}>
                <div style={{ color: "#f59e0b", fontSize: 18, marginBottom: 16 }}>★★★★★</div>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 20 }}>&ldquo;{r.quote}&rdquo;</p>
                <div>
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{r.naam}</span>
                  <span style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#94a3b8" }}> · {r.bedrijf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #1a3bcc, #2d54e8)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "white", marginBottom: 16 }}>
            Klaar om te starten?
          </h2>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#a5b4fc", marginBottom: 36, fontWeight: 300 }}>
            Stuur ons een bericht — we reageren snel.
          </p>
          <Link href="/contact" style={{ display: "inline-block", padding: "14px 36px", background: "white", color: "#1a3bcc", fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: "none" }}>
            Stuur een bericht →
          </Link>
        </div>
      </section>
    </>
  );
}
