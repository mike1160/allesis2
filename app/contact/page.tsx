export const metadata = {
  title: "Contact",
  description: "Neem contact op met Allesis voor hosting, webdesign, domeinen of vertaling.",
  alternates: { canonical: "https://allesis.nl/contact" },
};
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #f0f4ff, #ffffff)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Contact</p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0f172a", marginBottom: 16 }}>Stuur ons een bericht</h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", marginBottom: 48, fontWeight: 300, lineHeight: 1.8 }}>
            Heeft u vragen over hosting, domeinen, webdesign of vertaling? Wij reageren binnen één werkdag.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
            {[
              { icon: "✉️", label: "E-mail", waarde: "info@allesis.nl", href: "mailto:info@allesis.nl" },
              { icon: "📍", label: "Locatie", waarde: "Vijfhuizen, Nederland", href: null },
            ].map(c => (
              <div key={c.label} style={{ padding: "20px 24px", background: "white", border: "1px solid #e2e6f0", borderRadius: 12 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontFamily: "Lato, sans-serif", fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{c.label}</div>
                {c.href ? (
                  <a href={c.href} style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: "#1a3bcc", textDecoration: "none" }}>{c.waarde}</a>
                ) : (
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{c.waarde}</span>
                )}
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
