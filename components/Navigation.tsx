"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type NavLink = { type: "link"; href: string; label: string };
type NavDropdown = { type: "dropdown"; label: string; items: { href: string; label: string }[] };

const navItems: (NavLink | NavDropdown)[] = [
  { type: "link", href: "/webdesign", label: "Webdesign" },
  { type: "link", href: "/hosting", label: "Hosting & Domeinen" },
  { type: "link", href: "/vertaling", label: "Vertaling & Tolk" },
  { type: "link", href: "/domeinen", label: "Domein checken" },
  { type: "link", href: "/recent-websites", label: "Recent websites" },
  {
    type: "dropdown",
    label: "AVG & Compliance",
    items: [
      { href: "/avg-regelgeving", label: "AVG-regelgeving" },
      { href: "/avg-boetes", label: "AVG-boetes" },
    ],
  },
  { type: "link", href: "/contact", label: "Contact" },
];

const linkStyle = {
  fontFamily: "Lato, sans-serif",
  fontSize: 14,
  fontWeight: 700,
  color: "#374151",
  textDecoration: "none",
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avgOpen, setAvgOpen] = useState(false);
  const [mobileAvgOpen, setMobileAvgOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setAvgOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const hoverColor = (e: React.MouseEvent<HTMLElement>, c: string) => {
    (e.currentTarget as HTMLElement).style.color = c;
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.97)" : "white",
        borderBottom: "1px solid #e2e6f0",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.07)" : "none",
        transition: "box-shadow .3s",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, background: "#1a3bcc", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 14 }}>A</span>
          </div>
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: "#0f172a" }}>
            Allesis<span style={{ color: "#1a3bcc" }}>.nl</span>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }} className="hidden-mobile">
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.href}
                href={item.href}
                style={{ ...linkStyle }}
                onMouseEnter={(e) => hoverColor(e, "#1a3bcc")}
                onMouseLeave={(e) => hoverColor(e, "#374151")}
              >
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                ref={dropdownRef}
                style={{ position: "relative" }}
                onMouseEnter={() => setAvgOpen(true)}
                onMouseLeave={() => setAvgOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setAvgOpen((o) => !o)}
                  style={{
                    ...linkStyle,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: 0,
                  }}
                  onMouseEnter={(e) => hoverColor(e, "#1a3bcc")}
                  onMouseLeave={(e) => hoverColor(e, "#374151")}
                >
                  {item.label}
                  <span style={{ fontSize: 10, opacity: 0.7 }}>▼</span>
                </button>
                {avgOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      paddingTop: 8,
                      minWidth: 200,
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        border: "1px solid #e2e6f0",
                        borderRadius: 10,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        padding: "8px 0",
                      }}
                    >
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          style={{
                            display: "block",
                            padding: "10px 16px",
                            fontFamily: "Lato, sans-serif",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#374151",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f8f9fc";
                            e.currentTarget.style.color = "#1a3bcc";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#374151";
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}

          {user ? (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Link
                href="/dashboard"
                style={{
                  padding: "7px 16px",
                  background: "#eef2ff",
                  color: "#1a3bcc",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                👤 Mijn account
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: "7px 16px",
                  background: "transparent",
                  border: "1px solid #e2e6f0",
                  color: "#64748b",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Uitloggen
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <Link
                href="/login"
                style={{
                  padding: "7px 16px",
                  border: "1px solid #e2e6f0",
                  color: "#374151",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                Inloggen
              </Link>
              <Link
                href="/registreren"
                style={{
                  padding: "7px 16px",
                  background: "#1a3bcc",
                  color: "white",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                Registreren
              </Link>
            </div>
          )}
        </div>

        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }} className="show-mobile">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ background: "white", borderTop: "1px solid #e2e6f0", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 12 }} className="show-mobile">
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, color: "#374151", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => setMobileAvgOpen((v) => !v)}
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#374151",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {item.label}
                  <span style={{ fontSize: 10 }}>{mobileAvgOpen ? "▲" : "▼"}</span>
                </button>
                {mobileAvgOpen && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10, paddingLeft: 12, borderLeft: "2px solid #e2e6f0" }}>
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => {
                          setOpen(false);
                          setMobileAvgOpen(false);
                        }}
                        style={{ fontFamily: "Lato, sans-serif", fontWeight: 600, fontSize: 14, color: "#1a3bcc", textDecoration: "none" }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
          <hr style={{ border: "none", borderTop: "1px solid #f1f3f9" }} />
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setOpen(false)} style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, color: "#1a3bcc", textDecoration: "none" }}>
                👤 Mijn account
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#64748b",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: 0,
                }}
              >
                Uitloggen
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, color: "#374151", textDecoration: "none" }}>
                Inloggen
              </Link>
              <Link href="/registreren" onClick={() => setOpen(false)} style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, color: "#1a3bcc", textDecoration: "none" }}>
                Registreren →
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`.hidden-mobile{display:flex!important;align-items:center}.show-mobile{display:none!important}@media(max-width:768px){.hidden-mobile{display:none!important}.show-mobile{display:block!important}}`}</style>
    </nav>
  );
}
