import Link from "next/link";
import DienstCard from "@/components/DienstCard";
import CookieConsent from "@/components/CookieConsent";
import HeroSection from "@/components/HeroSection";

const diensten = [
  { icon: "🌐", titel: "Webhosting", tekst: "Snel, betrouwbaar en alles in één pakket. Vanaf € 8,95/mnd.", href: "/hosting" },
  { icon: "🔎", titel: "Domeinregistratie", tekst: "Check en registreer direct uw domeinnaam. Alle extensies.", href: "/domeinen" },
  { icon: "🎨", titel: "Webdesign & SEO", tekst: "Professioneel webdesign inclusief SEO pakket op maat.", href: "/webdesign" },
  { icon: "🇹🇭", titel: "Thais-NL-EN Vertaling", tekst: "Professionele vertaal- en tolkdiensten. Specialist BOSIET offshore.", href: "/vertaling" },
];

const pakketten = [
  {
    naam: "Lite", prijs: "8,95",
    features: ["1.000 MB schijfruimte", "20 GB dataverkeer", "5 e-mailaccounts", "1 MySQL database", "SSL certificaat", "Helpdesk"],
    disclaimer: "Prijzen excl. BTW. Jaarlijks gefactureerd.",
  },
  {
    naam: "Start Up", prijs: "12,95", highlight: true,
    features: ["4.000 MB schijfruimte", "80 GB dataverkeer", "10 e-mailaccounts", "2 MySQL databases", "SSL certificaat", "Helpdesk"],
    disclaimer: "Prijzen excl. BTW. Jaarlijks gefactureerd.",
  },
  {
    naam: "Plus", prijs: "17,95",
    features: ["8.000 MB schijfruimte", "320 GB dataverkeer", "50 e-mailaccounts", "2 MySQL databases", "SSL certificaat", "Helpdesk"],
    disclaimer: "Prijzen excl. BTW. Jaarlijks gefactureerd.",
  },
];

export default function Home() {
  return (
    <>
      <CookieConsent />

      {/* Hero */}
      <HeroSection />

      {/* Diensten */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Wat wij doen</p>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#0f172a" }}>Onze diensten</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {diensten.map(d => <DienstCard key={d.titel} {...d} />)}
          </div>
        </div>
      </section>

      {/* Pakketten */}
      <section style={{ padding: "80px 24px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Hosting</p>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#0f172a" }}>Kies uw pakket</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, maxWidth: 900, margin: "0 auto" }}>
            {pakketten.map(p => (
              <div key={p.naam} style={{
                background: p.highlight ? "#1a3bcc" : "white",
                border: p.highlight ? "none" : "1px solid #e2e6f0",
                borderRadius: 16, padding: 32,
                boxShadow: p.highlight ? "0 8px 40px rgba(26,59,204,0.25)" : "none",
                transform: p.highlight ? "scale(1.03)" : "none",
              }}>
                {p.highlight && <div style={{ fontFamily: "Lato, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#a5b4fc", marginBottom: 12 }}>Meest gekozen</div>}
                <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 20, color: p.highlight ? "white" : "#0f172a", marginBottom: 4 }}>{p.naam}</h3>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 36, color: p.highlight ? "white" : "#1a3bcc" }}>€ {p.prijs}</span>
                  <span style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: p.highlight ? "#a5b4fc" : "#94a3b8" }}>/mnd</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: p.highlight ? "#e0e7ff" : "#374151", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: p.highlight ? "#a5b4fc" : "#16a34a" }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 11, color: p.highlight ? "#818cf8" : "#94a3b8", marginBottom: 16 }}>{p.disclaimer}</p>
                <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "12px 0", background: p.highlight ? "white" : "#1a3bcc", color: p.highlight ? "#1a3bcc" : "white", fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: "none" }}>
                  Bestel nu →
                </Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontFamily: "Lato, sans-serif", fontSize: 12, color: "#94a3b8", marginTop: 24 }}>
            * Alle prijzen zijn excl. BTW en worden jaarlijks gefactureerd. Zie onze <Link href="/disclaimer" style={{ color: "#1a3bcc", textDecoration: "none" }}>disclaimer</Link> voor volledige voorwaarden.
          </p>
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
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "white", marginBottom: 16 }}>Klaar om te starten?</h2>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#a5b4fc", marginBottom: 36, fontWeight: 300 }}>Stuur ons een bericht — we reageren snel.</p>
          <Link href="/contact" style={{ display: "inline-block", padding: "14px 36px", background: "white", color: "#1a3bcc", fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: "none" }}>
            Stuur een bericht →
          </Link>
        </div>
      </section>
    </>
  );
}
