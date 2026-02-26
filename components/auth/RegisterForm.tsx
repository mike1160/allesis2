"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (password.length < 8) { setError("Wachtwoord moet minimaal 8 tekens zijn."); setLoading(false); return; }

    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { naam }, emailRedirectTo: `${window.location.origin}/dashboard` }
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  const inputStyle = { width: "100%", padding: "12px 14px", border: "1px solid #e2e6f0", borderRadius: 8, fontFamily: "Lato, sans-serif", fontSize: 15, color: "#0f172a", outline: "none", background: "#f8f9fc", boxSizing: "border-box" as const };
  const labelStyle = { fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 };

  if (success) return (
    <div style={{ background: "white", border: "1px solid #bbf7d0", borderRadius: 16, padding: "36px 32px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#0f172a", marginBottom: 8 }}>Controleer uw e-mail</h2>
      <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", lineHeight: 1.7 }}>
        We hebben een bevestigingslink gestuurd naar <strong>{email}</strong>. Klik op de link om uw account te activeren.
      </p>
    </div>
  );

  return (
    <div style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 16, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={labelStyle}>Uw naam</label>
          <input type="text" value={naam} onChange={e => setNaam(e.target.value)} placeholder="Jan de Vries" required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>E-mailadres</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="u@bedrijf.nl" required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Wachtwoord <span style={{ color: "#94a3b8", fontWeight: 400 }}>(min. 8 tekens)</span></label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={inputStyle} />
        </div>
        {error && <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#dc2626", background: "#fef2f2", padding: "10px 14px", borderRadius: 8, margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ padding: "13px", background: "#1a3bcc", color: "white", border: "none", borderRadius: 8, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Bezig..." : "Account aanmaken →"}
        </button>
      </form>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#64748b" }}>
          Al een account?{" "}
          <Link href="/login" style={{ color: "#1a3bcc", fontWeight: 700, textDecoration: "none" }}>Inloggen</Link>
        </p>
      </div>
    </div>
  );
}
