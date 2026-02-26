"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Klant = {
  id: string; naam: string; email: string; created_at: string;
  hosting_pakketten: { id: string; naam: string; status: string; }[];
  domeinen: { id: string; naam: string; extensie: string; status: string; }[];
};

export default function AdminClient({ klanten }: { klanten: Klant[] }) {
  const [selected, setSelected] = useState<Klant | null>(null);
  const [search, setSearch] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const filtered = klanten.filter(k =>
    k.naam?.toLowerCase().includes(search.toLowerCase()) ||
    k.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: "#f8f9fc" }}>
      {/* Header */}
      <div style={{ background: "#0f172a", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "white", margin: 0 }}>🛠 Admin Dashboard</h1>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>Allesis klantenbeheer</p>
          </div>
          <button onClick={handleLogout} style={{ padding: "8px 16px", background: "#1e293b", border: "none", borderRadius: 8, fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, color: "#94a3b8", cursor: "pointer" }}>
            Uitloggen
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Totaal klanten", value: klanten.length, icon: "👥" },
            { label: "Hosting pakketten", value: klanten.reduce((a, k) => a + k.hosting_pakketten.length, 0), icon: "🌐" },
            { label: "Domeinen", value: klanten.reduce((a, k) => a + k.domeinen.length, 0), icon: "🔎" },
            { label: "Actieve pakketten", value: klanten.reduce((a, k) => a + k.hosting_pakketten.filter(p => p.status === "actief").length, 0), icon: "✅" },
          ].map(s => (
            <div key={s.label} style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 28, color: "#0f172a" }}>{s.value}</div>
              <div style={{ fontFamily: "Lato, sans-serif", fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 24 }}>
          {/* Klanten lijst */}
          <div style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f3f9" }}>
              <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0f172a", margin: "0 0 12px" }}>Klanten</h2>
              <input
                type="text" placeholder="Zoek op naam of e-mail..." value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #e2e6f0", borderRadius: 8, fontFamily: "Lato, sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              />
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "#94a3b8", fontFamily: "Lato, sans-serif", fontSize: 14 }}>Geen klanten gevonden</div>
            ) : filtered.map(k => (
              <div key={k.id} onClick={() => setSelected(k)}
                style={{ padding: "16px 24px", borderBottom: "1px solid #f1f3f9", cursor: "pointer", background: selected?.id === k.id ? "#eef2ff" : "white", transition: "background .15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{k.naam || "Onbekend"}</div>
                    <div style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#64748b" }}>{k.email}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ padding: "2px 8px", background: "#eef2ff", color: "#1a3bcc", borderRadius: 999, fontFamily: "Lato, sans-serif", fontSize: 11, fontWeight: 700 }}>
                      {k.hosting_pakketten.length} hosting
                    </span>
                    <span style={{ padding: "2px 8px", background: "#fff7ed", color: "#ea580c", borderRadius: 999, fontFamily: "Lato, sans-serif", fontSize: 11, fontWeight: 700 }}>
                      {k.domeinen.length} domeinen
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Klant detail */}
          {selected && (
            <div style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0f172a", margin: 0 }}>{selected.naam}</h2>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 18 }}>×</button>
              </div>
              <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#64748b", marginBottom: 24 }}>{selected.email}</p>

              <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: ".06em", color: "#94a3b8", marginBottom: 12 }}>Hosting pakketten</h3>
              {selected.hosting_pakketten.length === 0 ? <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#94a3b8" }}>Geen pakketten</p> :
                selected.hosting_pakketten.map(p => (
                  <div key={p.id} style={{ padding: "10px 14px", background: "#f8f9fc", borderRadius: 8, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#0f172a" }}>{p.naam}</span>
                    <span style={{ fontFamily: "Lato, sans-serif", fontSize: 12, fontWeight: 700, color: p.status === "actief" ? "#16a34a" : "#dc2626" }}>{p.status}</span>
                  </div>
                ))
              }

              <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: ".06em", color: "#94a3b8", marginBottom: 12, marginTop: 24 }}>Domeinen</h3>
              {selected.domeinen.length === 0 ? <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#94a3b8" }}>Geen domeinen</p> :
                selected.domeinen.map(d => (
                  <div key={d.id} style={{ padding: "10px 14px", background: "#f8f9fc", borderRadius: 8, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#0f172a" }}>{d.naam}{d.extensie}</span>
                    <span style={{ fontFamily: "Lato, sans-serif", fontSize: 12, fontWeight: 700, color: d.status === "actief" ? "#16a34a" : "#dc2626" }}>{d.status}</span>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
