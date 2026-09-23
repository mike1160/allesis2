"use client";

import Link from "next/link";
import { useState } from "react";
import { formatEuro, getProduct } from "@/lib/producten";

type Props = {
  slug: string;
  /** Tekst op de knop; standaard "Nu bestellen" */
  label?: string;
  /** Extra vrij veld, bijv. de gewenste website-URL */
  extraLabel?: string;
  extraPlaceholder?: string;
  /** Vaste waarde voor het extra veld (bijv. een net gecontroleerde domeinnaam) */
  extraValue?: string;
  /** "wit" voor op een gekleurde kaart, "primary" voor op wit */
  variant?: "primary" | "wit";
  className?: string;
};

export default function BestelKnop({
  slug,
  label = "Nu bestellen",
  extraLabel,
  extraPlaceholder,
  extraValue,
  variant = "primary",
  className = "",
}: Props) {
  const product = getProduct(slug);
  const [open, setOpen] = useState(false);
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [extra, setExtra] = useState("");
  const [akkoord, setAkkoord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!product) return null;

  const vastExtra = typeof extraValue === "string" && extraValue.length > 0;
  const directeLevering = !!product.directeLevering;

  const knopStyle =
    variant === "wit"
      ? "bg-white text-primary hover:bg-neutral-light"
      : "bg-primary text-white hover:bg-primary-dark";

  const inputStyle =
    variant === "wit"
      ? "w-full rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-accent"
      : "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-dark outline-none focus:border-primary";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (directeLevering && !akkoord) {
      setError("Vink eerst aan dat u akkoord gaat met directe levering.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          naam,
          email,
          extra: (vastExtra ? extraValue : extra) || undefined,
          ...(directeLevering ? { akkoord: true } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        setError(typeof data.error === "string" ? data.error : "Betaling aanmaken mislukt.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Kon de server niet bereiken. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`font-lato block min-h-[44px] w-full rounded-xl py-3 text-center text-sm font-bold transition ${knopStyle} ${className}`}
      >
        {label} — {formatEuro(product.prijsInclBtw)}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`font-lato mt-2 flex flex-col gap-2 text-left ${className}`}>
      {vastExtra ? (
        <p className={`text-sm font-bold ${variant === "wit" ? "text-white" : "text-neutral-dark"}`}>{extraValue}</p>
      ) : null}

      <input
        type="text"
        required
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        placeholder="Uw naam"
        className={inputStyle}
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Uw e-mailadres"
        className={inputStyle}
      />
      {extraLabel && !vastExtra ? (
        <input
          type="text"
          maxLength={200}
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder={extraPlaceholder || extraLabel}
          aria-label={extraLabel}
          className={inputStyle}
        />
      ) : null}

      {directeLevering ? (
        <label
          className={`flex items-start gap-2 text-xs leading-relaxed ${
            variant === "wit" ? "text-white/90" : "text-neutral-mid"
          }`}
        >
          <input
            type="checkbox"
            required
            checked={akkoord}
            onChange={(e) => setAkkoord(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span>
            Ik ga akkoord met de{" "}
            <Link
              href="/voorwaarden"
              target="_blank"
              className={`underline ${variant === "wit" ? "text-white" : "text-primary"}`}
            >
              algemene voorwaarden
            </Link>{" "}
            en met directe levering, en weet dat ik daardoor mijn herroepingsrecht verlies.
          </span>
        </label>
      ) : null}

      <button
        type="submit"
        disabled={loading || (directeLevering && !akkoord)}
        className={`min-h-[44px] rounded-xl py-3 text-center text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${knopStyle}`}
      >
        {loading ? "Even geduld…" : `Afrekenen — ${formatEuro(product.prijsInclBtw)}`}
      </button>

      {error ? (
        <p className={`text-sm ${variant === "wit" ? "text-red-200" : "text-red-600"}`}>{error}</p>
      ) : null}
      <p className={`text-xs ${variant === "wit" ? "text-white/70" : "text-neutral-mid"}`}>
        Prijs incl. btw · iDEAL, Bancontact, creditcard of Apple Pay
      </p>
    </form>
  );
}
