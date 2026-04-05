import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Log in op uw Allesis klantenpaneel.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div style={{ paddingTop: 100, minHeight: "80vh", background: "linear-gradient(135deg, #f0f4ff, #ffffff)", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 440, margin: "0 auto", padding: "60px 24px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, background: "#1a3bcc", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <span style={{ color: "white", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 20 }}>A</span>
          </div>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#0f172a", marginBottom: 8 }}>Inloggen</h1>
          <p style={{ fontFamily: "Lato, sans-serif", color: "#64748b", fontSize: 15 }}>Toegang tot uw klantenpaneel</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
