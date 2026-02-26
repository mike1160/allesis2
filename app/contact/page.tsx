export const metadata = { title: "Contact | Allesis", description: "Stuur Allesis een bericht voor hosting, webdesign, vertaling of dienstverlening." };

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 100, minHeight: "80vh" }}>
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #f0f4ff, #ffffff)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Contact</p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#0f172a", marginBottom: 12 }}>Stuur een bericht</h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", marginBottom: 40, fontWeight: 300 }}>
            Heeft u een vraag of wilt u een offerte? We reageren binnen één werkdag.
          </p>

          <div style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 16, padding: "40px 36px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <form action="mailto:info@allesis.nl" method="get" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Uw naam", name: "naam", type: "text", placeholder: "Jan de Vries" },
                { label: "E-mailadres", name: "email", type: "email", placeholder: "u@bedrijf.nl" },
                { label: "Onderwerp", name: "subject", type: "text", placeholder: "bijv. Offerte webdesign" },
              ].map(f => (
                <div key={f.name}>
                  <label style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} name={f.name} placeholder={f.placeholder} style={{ width: "100%", padding: "12px 14px", border: "1px solid #e2e6f0", borderRadius: 8, fontFamily: "Lato, sans-serif", fontSize: 15, color: "#0f172a", outline: "none", background: "#f8f9fc" }} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Uw bericht</label>
                <textarea name="body" rows={5} placeholder="Hoe kunnen wij u helpen?" style={{ width: "100%", padding: "12px 14px", border: "1px solid #e2e6f0", borderRadius: 8, fontFamily: "Lato, sans-serif", fontSize: 15, color: "#0f172a", outline: "none", background: "#f8f9fc", resize: "vertical" }} />
              </div>
              <button type="submit" style={{ padding: "14px", background: "#1a3bcc", color: "white", border: "none", borderRadius: 8, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                Verstuur bericht →
              </button>
            </form>

            <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid #f1f3f9", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>✉️</span>
              <a href="mailto:info@allesis.nl" style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#1a3bcc", textDecoration: "none", fontWeight: 700 }}>info@allesis.nl</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
