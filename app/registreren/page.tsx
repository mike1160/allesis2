export const metadata = { title: "Registreren | Allesis", description: "Maak een account aan bij Allesis." };
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div style={{ paddingTop: 100, minHeight: "80vh", background: "linear-gradient(135deg, #f0f4ff, #ffffff)", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 440, margin: "0 auto", padding: "60px 24px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, background: "#1a3bcc", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <span style={{ color: "white", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 20 }}>A</span>
          </div>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#0f172a", marginBottom: 8 }}>Account aanmaken</h1>
          <p style={{ fontFamily: "Lato, sans-serif", color: "#64748b", fontSize: 15 }}>Gratis registreren als klant</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
