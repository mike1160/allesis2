"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Onjuist e-mailadres of wachtwoord.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const inputStyle = { width: "100%", padding: "12px 14px", border: "1px solid #e2e6f0", borderRadius: 8, fontFamily: "Lato, sans-serif", fontSize: 15, color: "#0f172a", outline: "none", background: "#f8f9fc", boxSizing: "border-box" as const };
  const labelStyle = { fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 };

  return (
    <div style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 16, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={labelStyle}>E-mailadres</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="u@bedrijf.nl" required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Wachtwoord</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={inputStyle} />
        </div>
        {error && <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#dc2626", background: "#fef2f2", padding: "10px 14px", borderRadius: 8, margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ padding: "13px", background: "#1a3bcc", color: "white", border: "none", borderRadius: 8, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Bezig..." : "Inloggen →"}
        </button>
      </form>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#64748b" }}>
          Nog geen account?{" "}
          <Link href="/registreren" style={{ color: "#1a3bcc", fontWeight: 700, textDecoration: "none" }}>Registreer hier</Link>
        </p>
      </div>
    </div>
  );
}
