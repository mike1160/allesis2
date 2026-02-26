import Link from "next/link";
export const metadata = { title: "Hosting & Domeinen | Allesis", description: "Betrouwbare webhosting pakketten voor MKB en particulieren vanaf € 4,95/mnd." };

export default function HostingPage() {
  const pakketten = [
    { naam: "Lite", prijs: "4,95", features: ["1.000 MB schijfruimte","20 GB dataverkeer","5 e-mailaccounts","Onbeperkt e-mail forwarding","Onbeperkt subdomeinen","1 MySQL database","PHP / Perl CGI / SSI","FTP + Crontab","SSL certificaat","Helpdesk"] },
    { naam: "Start Up", prijs: "8,95", highlight: true, features: ["4.000 MB schijfruimte","80 GB dataverkeer","10 e-mailaccounts","Onbeperkt e-mail forwarding","Onbeperkt subdomeinen","2 MySQL databases","PHP / Perl CGI / SSI","FTP + Crontab","SSL certificaat","Helpdesk"] },
    { naam: "Basic", prijs: "14,95", features: ["8.000 MB schijfruimte","320 GB dataverkeer","50 e-mailaccounts","Onbeperkt e-mail forwarding","Onbeperkt subdomeinen","2 MySQL databases","PHP / Perl CGI / SSI","FTP + Crontab","SSL certificaat","Helpdesk"] },
  ];
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #f0f4ff, #ffffff)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Hosting</p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0f172a", marginBottom: 16 }}>Alles in één pakket</h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", fontWeight: 300 }}>Snel, betrouwbaar en alles inbegrepen. Kies het pakket dat bij u past.</p>
        </div>
      </section>
      <section style={{ padding: "64px 24px", background: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {pakketten.map(p => (
            <div key={p.naam} style={{ background: p.highlight ? "#1a3bcc" : "white", border: p.highlight ? "none" : "1px solid #e2e6f0", borderRadius: 16, padding: 32, boxShadow: p.highlight ? "0 8px 40px rgba(26,59,204,0.25)" : "0 1px 4px rgba(0,0,0,0.04)", transform: p.highlight ? "scale(1.03)" : "none" }}>
              {p.highlight && <div style={{ fontFamily: "Lato, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#a5b4fc", marginBottom: 12 }}>Meest gekozen</div>}
              <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 20, color: p.highlight ? "white" : "#0f172a", marginBottom: 4 }}>{p.naam}</h2>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 36, color: p.highlight ? "white" : "#1a3bcc" }}>€ {p.prijs}</span>
                <span style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: p.highlight ? "#a5b4fc" : "#94a3b8" }}>/mnd</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: p.highlight ? "#e0e7ff" : "#374151", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: p.highlight ? "#a5b4fc" : "#16a34a" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "12px 0", background: p.highlight ? "white" : "#1a3bcc", color: p.highlight ? "#1a3bcc" : "white", fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: "none" }}>Bestel nu →</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
