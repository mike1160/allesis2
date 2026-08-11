"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const LIME = "#C8FF00";
const ACCENT = "#3B6D11";

type NavLink = { href: string; label: string; badge?: string };

/** Desktop top-nav — compact */
const NAV_LINKS: NavLink[] = [
  { href: "/webdesign", label: "Diensten" },
  { href: "/branches", label: "Branches" },
  { href: "/vaarapp", label: "VaarApp", badge: "Nieuw" },
  { href: "/th", label: "🇹🇭 Thailand" },
  { href: "/recent-websites", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

/** Mobiel: 4 hoofdpaden — in één oogopslag */
const PRIMARY_TILES: {
  href: string;
  label: string;
  hint: string;
  emoji: string;
}[] = [
  { href: "/webdesign", label: "Website", hint: "Nieuw of sneller", emoji: "✦" },
  { href: "/app-ontwerp", label: "App", hint: "Apple & Android", emoji: "◇" },
  { href: "/recent-websites", label: "Portfolio", hint: "Recent werk", emoji: "◎" },
  { href: "/th", label: "Thailand", hint: "Phuket & meer", emoji: "🇹🇭" },
];

/** Mobiel: korte tweede rij */
const QUICK_LINKS: NavLink[] = [
  { href: "/hosting", label: "Hosting" },
  { href: "/seo", label: "SEO" },
  { href: "/avg", label: "AVG" },
  { href: "/branches", label: "Branches" },
  { href: "/avg-check", label: "Gratis checks" },
];

function SoftBadge({ label, lime = false }: { label: string; lime?: boolean }) {
  return (
    <span
      className="font-lato ml-1.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
      style={
        lime
          ? { backgroundColor: LIME, color: "#0a0f1e" }
          : { backgroundColor: "rgba(59,109,17,0.12)", color: ACCENT }
      }
    >
      {label}
    </span>
  );
}

function BrandMark() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="nav-logo-dot inline-block h-2.5 w-2.5 shrink-0 rounded-full" aria-hidden />
      <span className="font-sora text-lg font-extrabold tracking-tight">
        <span className="nav-logo-word">Allesis</span>
        <span className="nav-logo-tld">.nl</span>
      </span>
    </span>
  );
}

export default function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayReady, setOverlayReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const prevPathnameRef = useRef<string | null>(null);
  const drawerTitleId = useId();

  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isActive = useCallback(
    (href: string) =>
      pathname === href ||
      pathname.startsWith(`${href}/`) ||
      (href === "/th" && (pathname.startsWith("/th") || pathname.startsWith("/thailand"))),
    [pathname],
  );

  const closeMenu = useCallback(() => {
    setOverlayReady(false);
    setMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      closeMenu();
    }
  }, [pathname, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      setOverlayReady(false);
      return;
    }
    const timer = window.setTimeout(() => setOverlayReady(true), 120);
    return () => window.clearTimeout(timer);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const frame = requestAnimationFrame(() => firstMenuLinkRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    closeMenu();
    router.push("/");
    router.refresh();
  };

  const menuLayer =
    mounted && menuOpen ? (
      <>
        <button
          type="button"
          aria-label="Menu sluiten"
          tabIndex={-1}
          onClick={closeMenu}
          className={`main-nav-overlay${overlayReady ? " is-visible" : ""}`}
        />

        <aside
          id="main-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby={drawerTitleId}
          className="main-nav-drawer is-open"
          style={{ backgroundColor: "#FAFBF7" }}
        >
          {/* Header */}
          <div className="flex h-[4.25rem] shrink-0 items-center justify-between px-5">
            <div>
              <p id={drawerTitleId} className="font-sora text-base font-bold text-neutral-dark">
                Waarmee kunnen we helpen?
              </p>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="font-lato inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-mid shadow-sm transition hover:text-neutral-dark"
              aria-label="Menu sluiten"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 pb-4" aria-label="Hoofdnavigatie">
            {/* 2×2 hoofdpaden */}
            <ul className="grid grid-cols-2 gap-2.5">
              {PRIMARY_TILES.map((tile, index) => (
                <li key={tile.href}>
                  <Link
                    ref={index === 0 ? firstMenuLinkRef : undefined}
                    href={tile.href}
                    onClick={closeMenu}
                    aria-current={isActive(tile.href) ? "page" : undefined}
                    className="font-lato flex h-full min-h-[88px] flex-col justify-between rounded-2xl bg-white p-3.5 no-underline shadow-[0_1px_0_rgba(10,15,30,0.04)] transition active:scale-[0.98]"
                    style={{
                      border: isActive(tile.href)
                        ? `1.5px solid ${ACCENT}`
                        : "1px solid rgba(10,15,30,0.06)",
                    }}
                  >
                    <span className="text-base leading-none text-primary/80" aria-hidden>
                      {tile.emoji}
                    </span>
                    <span>
                      <span className="block text-[15px] font-bold text-neutral-dark">{tile.label}</span>
                      <span className="mt-0.5 block text-[11px] font-medium text-neutral-mid">
                        {tile.hint}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* VaarApp — één rustige highlight */}
            <Link
              href="/vaarapp"
              onClick={closeMenu}
              aria-current={isActive("/vaarapp") ? "page" : undefined}
              className="mt-4 flex items-center gap-3 rounded-2xl px-4 py-3.5 no-underline"
              style={{
                background: "linear-gradient(120deg, #0a0f1e 0%, #1a3a14 100%)",
              }}
            >
              <span className="min-w-0 flex-1">
                <span className="font-lato block text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                  Uitgelicht
                </span>
                <span className="mt-0.5 flex items-center gap-2">
                  <span className="font-sora text-lg font-black text-white">vaarapp</span>
                  <SoftBadge label="Nieuw" lime />
                </span>
                <span className="font-lato mt-0.5 block text-xs text-white/65">
                  Bruggen, sluizen &amp; havens — gratis download
                </span>
              </span>
              <span className="font-lato text-sm font-bold text-[#C8FF00]" aria-hidden>
                →
              </span>
            </Link>

            {/* Korte quick links */}
            <p className="font-lato mb-2 mt-7 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-mid">
              Meer
            </p>
            <ul className="flex flex-wrap gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`font-lato inline-flex min-h-[40px] items-center rounded-full bg-white px-3.5 text-sm font-semibold no-underline shadow-sm transition ${
                      isActive(link.href) ? "text-primary" : "text-neutral-dark"
                    }`}
                    style={{ border: "1px solid rgba(10,15,30,0.06)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {user ? (
              <div className="mt-6 flex gap-3">
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="font-lato text-sm font-semibold no-underline"
                  style={{ color: ACCENT }}
                >
                  Mijn account
                </Link>
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="font-lato cursor-pointer text-sm font-medium text-neutral-mid"
                >
                  Uitloggen
                </button>
              </div>
            ) : null}
          </nav>

          {/* Sticky CTA */}
          <div className="shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="font-lato flex min-h-[52px] items-center justify-center rounded-2xl px-5 text-[15px] font-bold text-white no-underline transition hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              Gratis gesprek
            </Link>
            <p className="font-lato mt-3 text-center text-xs text-neutral-mid">
              <a
                href="mailto:info@allesis.nl"
                className="font-semibold no-underline hover:underline"
                style={{ color: ACCENT }}
              >
                info@allesis.nl
              </a>
              {" · "}Haarlem
            </p>
          </div>
        </aside>
      </>
    ) : null;

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-[100] transition-[box-shadow,background-color] duration-300 ${
          scrolled ? "bg-white/95 shadow-[0_1px_0_rgba(10,15,30,0.06)] backdrop-blur-md" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto grid h-[4.25rem] max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-6 md:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="justify-self-start no-underline"
            onClick={closeMenu}
            suppressHydrationWarning
          >
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Hoofdnavigatie">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`font-lato inline-flex items-center text-sm font-medium no-underline transition-colors ${
                  isActive(link.href) ? "text-neutral-dark" : "text-neutral-mid hover:text-neutral-dark"
                }`}
              >
                {link.label}
                {link.badge ? <SoftBadge label={link.badge} lime /> : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="font-lato inline-flex min-h-[40px] items-center rounded-full px-5 py-2 text-sm font-bold text-white no-underline transition hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              Gratis gesprek
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                if (menuOpen) closeMenu();
                else openMenu();
              }}
              aria-expanded={menuOpen}
              aria-controls="main-nav-drawer"
              aria-haspopup="dialog"
              aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
              className="font-lato inline-flex min-h-[40px] cursor-pointer items-center rounded-lg border border-neutral-light px-3 py-2 text-sm font-bold text-neutral-dark transition hover:bg-neutral-light md:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                {menuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <g>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </g>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mounted && menuLayer ? createPortal(menuLayer, document.body) : null}
    </>
  );
}
