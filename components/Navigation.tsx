"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import AllesisLogo from "@/components/AllesisLogo";

type NavLink = { type: "link"; href: string; label: string };
type NavDropdown = { type: "dropdown"; label: string; items: { href: string; label: string; badge?: string }[] };

const navItems: (NavLink | NavDropdown)[] = [
  { type: "link", href: "/webdesign", label: "Webdesign" },
  { type: "link", href: "/hosting", label: "Hosting & Domeinen" },
  { type: "link", href: "/seo", label: "SEO" },
  {
    type: "dropdown",
    label: "AVG & Compliance",
    items: [
      { href: "/avg", label: "AVG-compliance pakket" },
      { href: "/avg-regelgeving", label: "AVG Regelgeving" },
      { href: "/avg-boetes", label: "AVG Boetes" },
      { href: "/avg-check", label: "AVG Check", badge: "GRATIS" },
    ],
  },
  { type: "link", href: "/thai", label: "Thaise diensten" },
  { type: "link", href: "/recent-websites", label: "Recent Websites" },
  { type: "link", href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avgOpen, setAvgOpen] = useState(false);
  const [mobileAvgOpen, setMobileAvgOpen] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
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
    const client = createClient();
    client.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const closeMobile = () => {
    setOpen(false);
    setMobileAvgOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 transition-[box-shadow,background-color] duration-300 ${
          scrolled ? "bg-white shadow-[0_4px_24px_-4px_rgba(10,15,30,0.12)]" : "bg-white/95 backdrop-blur-sm"
        }`}
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-2.5 no-underline" onClick={closeMobile}>
            <AllesisLogo />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-lato text-sm font-bold text-neutral-mid no-underline transition hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setAvgOpen(true)}
                  onMouseLeave={() => setAvgOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setAvgOpen((o) => !o)}
                    className="font-lato flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-sm font-bold text-neutral-mid transition hover:text-primary"
                  >
                    {item.label}
                    <span className="text-[10px] opacity-60" aria-hidden>
                      ▾
                    </span>
                  </button>
                  {avgOpen ? (
                    <div className="absolute top-full left-0 min-w-[220px] pt-2">
                      <div className="rounded-xl bg-white py-2 shadow-[0_12px_40px_-8px_rgba(10,15,30,0.15)] ring-1 ring-black/5">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="font-lato block px-4 py-2.5 text-sm font-semibold text-neutral-mid no-underline transition hover:bg-neutral-light hover:text-primary"
                          >
                            {sub.label}
                            {sub.badge ? (
                              <span
                                style={{
                                  background: "#e8ff47",
                                  color: "#0a0f1e",
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  padding: "1px 6px",
                                  borderRadius: "4px",
                                  marginLeft: "4px",
                                }}
                              >
                                {sub.badge}
                              </span>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ),
            )}

            {user ? (
              <div className="ml-2 flex items-center gap-2 border-l border-neutral-light pl-6">
                <Link
                  href="/dashboard"
                  className="font-lato rounded-lg bg-[#eef2ff] px-4 py-2 text-xs font-bold text-primary no-underline transition hover:bg-[#e0e7ff]"
                >
                  Mijn account
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="font-lato cursor-pointer rounded-lg border border-neutral-light px-4 py-2 text-xs font-bold text-neutral-mid transition hover:bg-neutral-light"
                >
                  Uitloggen
                </button>
              </div>
            ) : (
              <div className="ml-2 flex items-center gap-2 border-l border-neutral-light pl-6">
                <Link
                  href="/login"
                  className="font-lato rounded-lg px-4 py-2 text-xs font-bold text-neutral-mid no-underline transition hover:bg-neutral-light hover:text-primary"
                >
                  Inloggen
                </Link>
                <Link
                  href="/contact#offerte"
                  className="font-lato rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white no-underline shadow-sm transition hover:bg-primary-dark"
                >
                  Offerte aanvragen
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex cursor-pointer items-center justify-center rounded-lg p-2 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-dark">
              {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobiel: fullscreen overlay */}
      {open ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white pt-[4.25rem] lg:hidden">
          <button
            type="button"
            onClick={closeMobile}
            className="absolute top-[calc(4.25rem+0.5rem)] right-6 z-10 flex cursor-pointer items-center justify-center rounded-lg p-2"
            aria-label="Menu sluiten"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-neutral-dark"
              aria-hidden
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-8 py-10">
            {navItems.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="font-sora border-b border-neutral-light py-5 text-2xl font-bold text-neutral-dark no-underline"
                >
                  {item.label}
                </Link>
              ) : (
                <div key={item.label} className="border-b border-neutral-light py-2">
                  <button
                    type="button"
                    onClick={() => setMobileAvgOpen((v) => !v)}
                    className="font-sora flex w-full items-center justify-between py-4 text-left text-2xl font-bold text-neutral-dark"
                  >
                    {item.label}
                    <span className="text-base opacity-50">{mobileAvgOpen ? "▲" : "▼"}</span>
                  </button>
                  {mobileAvgOpen ? (
                    <div className="flex flex-col gap-3 pb-6 pl-1">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMobile}
                          className="font-lato text-lg font-semibold text-primary no-underline"
                        >
                          {sub.label}
                          {sub.badge ? (
                            <span
                              style={{
                                background: "#e8ff47",
                                color: "#0a0f1e",
                                fontSize: "11px",
                                fontWeight: 700,
                                padding: "1px 6px",
                                borderRadius: "4px",
                                marginLeft: "4px",
                              }}
                            >
                              {sub.badge}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ),
            )}

            {user ? (
              <div className="mt-6 flex flex-col gap-4 border-t border-neutral-light pt-8">
                <Link href="/dashboard" onClick={closeMobile} className="font-lato text-lg font-bold text-primary no-underline">
                  Mijn account
                </Link>
                <button type="button" onClick={handleLogout} className="font-lato text-left text-lg font-bold text-neutral-mid">
                  Uitloggen
                </button>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-4 border-t border-neutral-light pt-8">
                <Link href="/login" onClick={closeMobile} className="font-lato text-lg font-bold text-neutral-mid no-underline">
                  Inloggen
                </Link>
                <Link href="/contact#offerte" onClick={closeMobile} className="font-lato text-lg font-bold text-primary no-underline">
                  Offerte aanvragen →
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-neutral-light px-8 py-8">
            <a
              href="mailto:info@allesis.nl"
              onClick={closeMobile}
              className="font-lato block text-lg font-semibold text-primary no-underline"
            >
              info@allesis.nl
            </a>
            <p className="font-lato mt-2 text-sm font-light text-neutral-mid">Gevestigd in Haarlem</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
