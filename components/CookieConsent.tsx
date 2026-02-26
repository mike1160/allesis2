"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000, background: "#0f172a", color: "white", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", boxShadow: "0 -4px 24px rgba(0,0,0,0.2)" }}>
      <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#94a3b8", margin: 0, maxWidth: 700, lineHeight: 1.6 }}>
        Wij gebruiken cookies om uw ervaring te verbeteren en websiteverkeer te analyseren. Door verder te gaan accepteert u ons cookiebeleid. Zie onze{" "}
        <Link href="/disclaimer" style={{ color: "#818cf8", textDecoration: "underline" }}>disclaimer</Link> voor meer informatie.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={accept} style={{ padding: "10px 24px", background: "#1a3bcc", color: "white", border: "none", borderRadius: 8, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          Accepteren
        </button>
        <button onClick={() => setVisible(false)} style={{ padding: "10px 24px", background: "transparent", color: "#64748b", border: "1px solid #1e293b", borderRadius: 8, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          Weigeren
        </button>
      </div>
    </div>
  );
}
