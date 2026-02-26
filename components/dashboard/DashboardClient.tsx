"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Pakket = { id: string; naam: string; prijs: string; status: string; verloopdatum: string; schijfruimte: string; dataverkeer: string; };
type Domein = { id: string; naam: string; extensie: string; status: string; verloopdatum: string; };

export default function DashboardClient({ user, pakketten, domeinen }: {
  user: { email: string; naam: string };
  pakketten: Pakket[];
  domeinen: Domein[];
}) {
  const [tab, setTab] = useState<"overzicht" | "hosting" | "domeinen">("overzicht");
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const statusKleur = (s: string) => s === "actief" ? "#16a34a" : s === "verlopen" ? "#dc2626" : "#f59e0b";
  const statusBg = (s: string) => s === "actief" ? "#f0fdf4" : s === "verlopen" ? "#fef2f2" : "#fffbeb";

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: "#f8f9fc" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e6f0", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#0f172a", margin: 0 }}>
              Welkom, {user.naam} 👋
            </h1>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{user.email}</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/admin" style={{ padding: "8px 16px", border: "1px solid #e2e6f0", borderRadius: 8, fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, color: "#374151", textDecoration: "none" }}>Admin</Link>
            <button onClick={handleLogout} style={{ padding: "8px 16px", background: "#f1f3f9", border: "none", borderRadius: 8, fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, color: "#374151", cursor: "pointer" }}>
              Uitloggen
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 32, background: "white", padding: 4, borderRadius: 10, border: "1px solid #e2e6f0", width: "fit-content" }}>
          {(["overzicht", "hosting", "domeinen"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 20px", borderRadius: 8, border: "none", fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", background: tab === t ? "#1a3bcc" : "transparent", color: tab === t ? "white" : "#64748b", textTransform: "capitalize" }}>
              {t === "overzicht" ? "Overzicht" : t === "hosting" ? "Hosting" : "Domeinen"}
            </button>
          ))}
        </div>

        {/* Overzicht */}
        {tab === "overzicht" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Hosting pakketten", value: pakketten.length, icon: "🌐", color: "#eef2ff" },
                { label: "Actieve pakketten", value: pakketten.filter(p => p.status === "actief").length, icon: "✅", color: "#f0fdf4" },
                { label: "Domeinen", value: domeinen.length, icon: "🔎", color: "#fff7ed" },
              ].map(s => (
                <div key={s.label} style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 32, color: "#0f172a" }}>{s.value}</div>
                  <div style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#64748b", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {pakketten.length === 0 && domeinen.length === 0 && (
              <div style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 12, padding: 48, textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
                <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0f172a", marginBottom: 8 }}>Nog geen diensten</h3>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#64748b", marginBottom: 24 }}>U heeft nog geen hosting of domeinen. Bekijk onze pakketten.</p>
                <Link href="/hosting" style={{ padding: "10px 24px", background: "#1a3bcc", color: "white", borderRadius: 8, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  Bekijk pakketten →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Hosting tab */}
        {tab === "hosting" && (
          <div>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#0f172a", marginBottom: 20 }}>Uw hosting pakketten</h2>
            {pakketten.length === 0 ? (
              <div style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 12, padding: 48, textAlign: "center" }}>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", marginBottom: 20 }}>Geen hosting pakketten gevonden.</p>
                <Link href="/hosting" style={{ padding: "10px 24px", background: "#1a3bcc", color: "white", borderRadius: 8, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Bestel een pakket →</Link>
              </div>
            ) : pakketten.map(p => (
              <div key={p.id} style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 12, padding: 24, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0f172a", margin: "0 0 4px" }}>{p.naam}</h3>
                    <span style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#1a3bcc", fontWeight: 700 }}>€ {p.prijs}/mnd</span>
                  </div>
                  <span style={{ padding: "4px 12px", borderRadius: 999, fontFamily: "Lato, sans-serif", fontSize: 12, fontWeight: 700, background: statusBg(p.status), color: statusKleur(p.status) }}>
                    {p.status}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                  {[
                    { label: "Schijfruimte", value: p.schijfruimte },
                    { label: "Dataverkeer", value: p.dataverkeer },
                    { label: "Verloopt", value: new Date(p.verloopdatum).toLocaleDateString("nl-NL") },
                  ].map(i => (
                    <div key={i.label} style={{ background: "#f8f9fc", borderRadius: 8, padding: "10px 14px" }}>
                      <div style={{ fontFamily: "Lato, sans-serif", fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{i.label}</div>
                      <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{i.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Domeinen tab */}
        {tab === "domeinen" && (
          <div>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#0f172a", marginBottom: 20 }}>Uw domeinen</h2>
            {domeinen.length === 0 ? (
              <div style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 12, padding: 48, textAlign: "center" }}>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", marginBottom: 20 }}>Geen domeinen gevonden.</p>
                <Link href="/domeinen" style={{ padding: "10px 24px", background: "#1a3bcc", color: "white", borderRadius: 8, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Domein registreren →</Link>
              </div>
            ) : domeinen.map(d => (
              <div key={d.id} style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 12, padding: 24, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0f172a", margin: "0 0 4px" }}>{d.naam}{d.extensie}</h3>
                  <span style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#64748b" }}>Verloopt: {new Date(d.verloopdatum).toLocaleDateString("nl-NL")}</span>
                </div>
                <span style={{ padding: "4px 12px", borderRadius: 999, fontFamily: "Lato, sans-serif", fontSize: 12, fontWeight: 700, background: statusBg(d.status), color: statusKleur(d.status) }}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
