"use client";
import { useState } from "react";
import BestelKnop from "@/components/BestelKnop";

const EXTENSIONS = [".nl", ".com", ".net", ".eu", ".org", ".be"];

const SLUGS: Record<string, string> = {
  ".nl": "domein-nl",
  ".com": "domein-com",
  ".net": "domein-net",
  ".eu": "domein-eu",
  ".org": "domein-org",
  ".be": "domein-be",
};

const PRICES: Record<string, string> = {
  ".nl": "€ 9,95/jr",
  ".com": "€ 12,95/jr",
  ".net": "€ 13,95/jr",
  ".eu": "€ 8,95/jr",
  ".org": "€ 13,95/jr",
  ".be": "€ 9,95/jr",
};

type Result = {
  ext: string;
  available: boolean | null;
  loading: boolean;
  price: string;
};

export default function DomainChecker({ forDarkBackground = false }: { forDarkBackground?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [searched, setSearched] = useState(false);
  const [checking, setChecking] = useState(false);

  const cleanQuery = (val: string) => {
    let clean = val.toLowerCase().trim();
    EXTENSIONS.forEach(ext => { if (clean.endsWith(ext)) clean = clean.slice(0, -ext.length); });
    return clean.replace(/[^a-z0-9-]/g, "");
  };

  const checkDomains = async () => {
    const name = cleanQuery(query);
    if (!name || name.length < 2) return;

    setChecking(true);
    setSearched(true);
    setResults(EXTENSIONS.map(ext => ({ ext, available: null, loading: true, price: PRICES[ext] })));

    await Promise.all(
      EXTENSIONS.map(async (ext) => {
        try {
          const res = await fetch(`/api/domein-check?name=${encodeURIComponent(name)}&ext=${encodeURIComponent(ext)}`);
          const data = await res.json();
          setResults(prev => prev.map(r => r.ext === ext ? { ...r, loading: false, available: data.available } : r));
        } catch {
          setResults(prev => prev.map(r => r.ext === ext ? { ...r, loading: false, available: null } : r));
        }
      })
    );

    setChecking(false);
  };

  const domainName = cleanQuery(query);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", maxWidth: 580, margin: "0 auto", boxShadow: "0 4px 32px rgba(59,109,17,0.15)", borderRadius: 12, overflow: "hidden", border: "2px solid #3B6D11" }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && checkDomains()}
          placeholder="bijv. mijnbedrijf"
          style={{ flex: 1, padding: "16px 20px", border: "none", outline: "none", fontFamily: "Lato, sans-serif", fontSize: 16, color: "#0f172a", background: "white" }}
        />
        <button
          onClick={checkDomains}
          disabled={checking || !query}
          style={{ padding: "16px 28px", background: checking ? "#4f72e8" : "#3B6D11", color: "white", border: "none", fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, cursor: query && !checking ? "pointer" : "not-allowed", whiteSpace: "nowrap", transition: "background .2s" }}>
          {checking ? "Bezig..." : "Controleer →"}
        </button>
      </div>

      <p
        style={{
          fontFamily: "Lato, sans-serif",
          fontSize: 12,
          color: forDarkBackground ? "rgba(255,255,255,0.58)" : "#94a3b8",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Controleer .nl, .com, .net, .eu, .org en .be tegelijk
      </p>

      {searched && results.length > 0 && (
        <div style={{ maxWidth: 580, margin: "24px auto 0", display: "flex", flexDirection: "column", gap: 8 }}>
          {results.map(r => (
            <div key={r.ext} style={{
              padding: "14px 20px", background: "white", borderRadius: 10,
              border: `1px solid ${r.loading ? "#e2e6f0" : r.available === true ? "#bbf7d0" : r.available === false ? "#fecaca" : "#e2e6f0"}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              transition: "border-color .3s",
            }}>
             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {r.loading ? (
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #e2e6f0", borderTopColor: "#3B6D11", animation: "spin .8s linear infinite" }} />
                ) : r.available === true ? (
                  <span style={{ fontSize: 20 }}>✅</span>
                ) : r.available === false ? (
                  <span style={{ fontSize: 20 }}>❌</span>
                ) : (
                  <span style={{ fontSize: 20 }}>❓</span>
                )}
                <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: "#0f172a" }}>
                  {domainName}{r.ext}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {!r.loading && (
                  <span style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, color: r.available === true ? "#16a34a" : r.available === false ? "#dc2626" : "#94a3b8" }}>
                    {r.available === true ? r.price : r.available === false ? "Bezet" : "Onbekend"}
                  </span>
                )}
              </div>
             </div>

              {/* Afrekenen kan alleen voor een naam die zojuist vrij bleek */}
              {!r.loading && r.available === true && SLUGS[r.ext] ? (
                <div style={{ marginTop: 12 }}>
                  <BestelKnop
                    slug={SLUGS[r.ext]}
                    label="Registreer"
                    extraValue={`${domainName}${r.ext}`}
                  />
                </div>
              ) : null}
            </div>
          ))}
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 8 }}>
            Alleen vrije namen kunt u direct afrekenen. Wij registreren de naam en nemen binnen 1 werkdag contact op.
          </p>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
