"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FormConsentFields from "@/components/forms/FormConsentFields";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import { PRIVACY_CONSENT_ERROR } from "@/lib/form-consent";

const DIENSTEN = [
  "Webdesign / nieuwe website",
  "Hosting",
  "Domeinnaam",
  "Vertaling",
  "AVG & compliance",
  "Anders / combinatie",
] as const;

const VERIFY_SERVER = "Verificatie mislukt. Probeer het opnieuw.";
const VERIFY_CLIENT = "Verificatie mislukt. Vernieuw de pagina en probeer opnieuw.";

export default function OfferteForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    naam: "",
    email: "",
    telefoon: "",
    bedrijf: "",
    gewensteDienst: "",
    hostingPakket: "",
    bericht: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [nieuwsbrief, setNieuwsbrief] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);

  useEffect(() => {
    const pakket = searchParams.get("pakket")?.trim();
    if (pakket) {
      setForm((f) => ({ ...f, hostingPakket: pakket, gewensteDienst: f.gewensteDienst || "Hosting" }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }
    if (!turnstileToken) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "offerte", turnstileToken, privacyAccepted: true, nieuwsbrief, ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setTurnstileToken(null);
        if (data.error === PRIVACY_CONSENT_ERROR) {
          setPrivacyError(true);
          setError("");
        } else {
          setError(data.error === VERIFY_SERVER ? VERIFY_CLIENT : data.error || "Er ging iets mis. Probeer het opnieuw.");
        }
        return;
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #e2e6f0",
    borderRadius: 8,
    fontFamily: "Lato, sans-serif",
    fontSize: 15,
    color: "#0f172a",
    outline: "none",
    background: "white",
    boxSizing: "border-box" as const,
  };
  const labelStyle = {
    fontFamily: "Lato, sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#374151",
    display: "block",
    marginBottom: 6,
  };

  const submitDisabled = loading || !turnstileToken;
  const submitLabel = loading ? "Verzenden…" : !turnstileToken ? "Bezig met verificatie..." : "Offerte aanvragen →";

  if (success) {
    return (
      <div
        style={{
          background: "white",
          border: "1px solid #bbf7d0",
          borderRadius: 16,
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h2
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: "1.3rem",
            color: "#0f172a",
            marginBottom: 8,
          }}
        >
          Aanvraag verzonden!
        </h2>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b" }}>
          Bedankt. Wij nemen zo snel mogelijk contact met u op voor een vrijblijvende offerte.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e2e6f0",
        borderRadius: 16,
        padding: "36px 32px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Naam *</label>
            <input
              type="text"
              required
              placeholder="Jan de Vries"
              value={form.naam}
              onChange={(e) => setForm({ ...form, naam: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>E-mailadres *</label>
            <input
              type="email"
              required
              placeholder="u@bedrijf.nl"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Telefoonnummer *</label>
            <input
              type="tel"
              required
              placeholder="06 …"
              value={form.telefoon}
              onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Bedrijf / organisatie</label>
            <input
              type="text"
              placeholder="Optioneel"
              value={form.bedrijf}
              onChange={(e) => setForm({ ...form, bedrijf: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Gewenste dienst</label>
            <select
              value={form.gewensteDienst}
              onChange={(e) => setForm({ ...form, gewensteDienst: e.target.value })}
              style={inputStyle}
            >
              <option value="">Maak een keuze…</option>
              {DIENSTEN.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Hostingpakket (indien van toepassing)</label>
            <input
              type="text"
              placeholder="Bijv. Lite, Start Up — of leeg"
              value={form.hostingPakket}
              onChange={(e) => setForm({ ...form, hostingPakket: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Toelichting / wensen</label>
          <textarea
            rows={4}
            placeholder="Beschrijf kort uw project of vraag…"
            value={form.bericht}
            onChange={(e) => setForm({ ...form, bericht: e.target.value })}
            style={{ ...inputStyle, resize: "vertical" as const }}
          />
        </div>
        {error && (
          <p
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: 14,
              color: "#dc2626",
              background: "#fef2f2",
              padding: "10px 14px",
              borderRadius: 8,
              margin: 0,
            }}
            role="alert"
          >
            {error}
          </p>
        )}
        <FormConsentFields
          privacyAccepted={privacyAccepted}
          onPrivacyChange={(v) => {
            setPrivacyAccepted(v);
            if (v) setPrivacyError(false);
          }}
          nieuwsbrief={nieuwsbrief}
          onNieuwsbriefChange={setNieuwsbrief}
          showPrivacyError={privacyError}
        />
        <TurnstileWidget
          onToken={setTurnstileToken}
          onVerificationFailed={() => setError(VERIFY_CLIENT)}
        />
        <button
          type="submit"
          disabled={submitDisabled}
          style={{
            padding: "14px",
            background: "#c8a96e",
            color: "#0f172a",
            border: "none",
            borderRadius: 8,
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            cursor: submitDisabled ? "not-allowed" : "pointer",
            opacity: submitDisabled ? 0.7 : 1,
          }}
        >
          {submitLabel}
        </button>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 12, color: "#94a3b8", margin: 0, textAlign: "center" }}>
          * Verplichte velden — wij reageren binnen één werkdag.
        </p>
      </form>
    </div>
  );
}
