"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AllesisLogo from "@/components/AllesisLogo";
import { createClient } from "@/lib/supabase";

type MenuLink = { href: string; label: string; badge?: string };

type MenuGroup = {
  title: string;
  links: MenuLink[];
};

const MENU_GROUPS: MenuGroup[] = [
  {
    title: "Diensten",
    links: [
      { href: "/webdesign", label: "Webdesign" },
      { href: "/hosting", label: "Hosting & Domeinen" },
      { href: "/seo", label: "SEO" },
    ],
  },
  {
    title: "AVG & Compliance",
    links: [
      { href: "/avg", label: "AVG-compliance pakket" },
      { href: "/avg-regelgeving", label: "AVG Regelgeving" },
      { href: "/avg-boetes", label: "AVG Boetes" },
      { href: "/avg-check", label: "AVG Check", badge: "GRATIS" },
      { href: "/pagespeed-check", label: "PageSpeed Check", badge: "GRATIS" },
      { href: "/ai-vindbaarheid-check", label: "AI-vindbaarheid", badge: "GRATIS" },
      { href: "/tools/website-monitor", label: "Website Monitor" },
    ],
  },
  {
    title: "Thaise diensten",
    links: [{ href: "/thai", label: "Thaise webdiensten" }],
  },
  {
    title: "Portfolio",
    links: [{ href: "/recent-websites", label: "Recent Websites" }],
  },
  {
    title: "Contact",
    links: [{ href: "/contact", label: "Neem contact op" }],
  },
];

const FIRST_MENU_HREF = MENU_GROUPS[0]?.links[0]?.href ?? "/webdesign";

function FreeBadge({ label }: { label: string }) {
  return (
    <span className="font-lato ml-2 rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-neutral-dark">
      {label}
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
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
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

  /* Sluit alleen bij routewijziging — niet bij eerste mount */
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

  /* Overlay pas na open-klik actief — voorkomt dat dezelfde klik het menu direct sluit */
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
        >
          <div className="flex h-[4.25rem] shrink-0 items-center justify-between border-b border-neutral-light px-6">
            <p id={drawerTitleId} className="font-sora text-lg font-bold text-neutral-dark">
              Menu
            </p>
            <button
              type="button"
              onClick={closeMenu}
              className="font-lato inline-flex min-h-[40px] cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-bold text-neutral-mid transition hover:bg-neutral-light hover:text-neutral-dark"
            >
              Sluiten
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Hoofdnavigatie">
            {MENU_GROUPS.map((group) => (
              <div key={group.title} className="mb-10 last:mb-0">
                <p className="font-lato mb-4 text-xs font-bold uppercase tracking-[0.14em] text-neutral-mid">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        ref={link.href === FIRST_MENU_HREF ? firstMenuLinkRef : undefined}
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={`font-lato flex min-h-[48px] items-center rounded-lg px-3 py-2.5 text-base font-semibold no-underline transition hover:bg-neutral-light ${
                          isActive(link.href) ? "bg-neutral-light text-primary" : "text-neutral-dark"
                        }`}
                      >
                        {link.label}
                        {link.badge ? <FreeBadge label={link.badge} /> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {user ? (
              <div className="mt-10 border-t border-neutral-light pt-8">
                <p className="font-lato mb-4 text-xs font-bold uppercase tracking-[0.14em] text-neutral-mid">
                  Account
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/dashboard"
                      onClick={closeMenu}
                      className="font-lato flex min-h-[48px] items-center rounded-lg px-3 py-2.5 text-base font-semibold text-primary no-underline transition hover:bg-neutral-light"
                    >
                      Mijn account
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="font-lato flex min-h-[48px] w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-left text-base font-semibold text-neutral-mid transition hover:bg-neutral-light"
                    >
                      Uitloggen
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
          </nav>

          <div className="shrink-0 border-t border-neutral-light px-6 py-6">
            <a
              href="mailto:info@allesis.nl"
              className="font-lato block text-sm font-semibold text-primary no-underline hover:underline"
            >
              info@allesis.nl
            </a>
            <p className="font-lato mt-1 text-xs text-neutral-mid">Gevestigd in Haarlem</p>
          </div>
        </aside>
      </>
    ) : null;

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-[100] transition-[box-shadow,background-color] duration-300 ${
          scrolled ? "bg-white shadow-[0_4px_24px_-4px_rgba(10,15,30,0.12)]" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between gap-4 px-6">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5 no-underline" onClick={closeMenu}>
            <AllesisLogo />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="font-lato hidden min-h-[40px] items-center rounded-lg px-3 py-2 text-sm font-bold text-neutral-mid no-underline transition hover:bg-neutral-light hover:text-primary sm:inline-flex"
              >
                Mijn account
              </Link>
            ) : (
              <Link
                href="/login"
                className="font-lato inline-flex min-h-[40px] items-center rounded-lg px-3 py-2 text-sm font-bold text-neutral-mid no-underline transition hover:bg-neutral-light hover:text-primary"
              >
                Inloggen
              </Link>
            )}

            <Link
              href="/contact#offerte"
              className="font-lato inline-flex min-h-[40px] items-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white no-underline shadow-sm transition hover:bg-primary-dark"
            >
              <span className="hidden sm:inline">Offerte aanvragen</span>
              <span className="sm:hidden">Offerte</span>
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
              className="font-lato inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border border-neutral-light px-3 py-2 text-sm font-bold text-neutral-dark transition hover:border-primary/30 hover:bg-neutral-light"
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
              <span className="hidden sm:inline">{menuOpen ? "Sluiten" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {mounted && menuLayer ? createPortal(menuLayer, document.body) : null}
    </>
  );
}
