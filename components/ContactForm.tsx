"use client";
import { useState } from "react";
import FormConsentFields from "@/components/forms/FormConsentFields";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import { PRIVACY_CONSENT_ERROR } from "@/lib/form-consent";

const VERIFY_SERVER = "Verificatie mislukt. Probeer het opnieuw.";
const VERIFY_CLIENT = "Verificatie mislukt. Vernieuw de pagina en probeer opnieuw.";

export default function ContactForm() {
  const [form, setForm] = useState({ naam: "", email: "", onderwerp: "", bericht: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [nieuwsbrief, setNieuwsbrief] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);

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
        body: JSON.stringify({
          type: "contact",
          turnstileToken,
          privacyAccepted: true,
          nieuwsbrief,
          ...form,
        }),
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
    width: "100%", padding: "12px 14px", border: "1px solid #e2e6f0",
    borderRadius: 8, fontFamily: "Lato, sans-serif", fontSize: 15,
    color: "#0f172a", outline: "none", background: "white",
    boxSizing: "border-box" as const,
  };
  const labelStyle = {
    fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700,
    color: "#374151", display: "block", marginBottom: 6,
  };

  const submitDisabled = loading || !turnstileToken;
  const submitLabel = loading ? "Verzenden..." : !turnstileToken ? "Bezig met verificatie..." : "Bericht versturen →";

  if (success) return (
    <div style={{ background: "white", border: "1px solid #bbf7d0", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#0f172a", marginBottom: 8 }}>Bericht verzonden!</h2>
      <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b" }}>Bedankt voor uw bericht. Wij reageren binnen één werkdag.</p>
    </div>
  );

  return (
    <div style={{ background: "white", border: "1px solid #e2e6f0", borderRadius: 16, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Naam *</label>
            <input type="text" required placeholder="Jan de Vries" value={form.naam}
              onChange={e => setForm({ ...form, naam: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>E-mailadres *</label>
            <input type="email" required placeholder="u@bedrijf.nl" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Onderwerp</label>
          <input type="text" placeholder="Bijv. Vraag over hosting" value={form.onderwerp}
            onChange={e => setForm({ ...form, onderwerp: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Bericht *</label>
          <textarea required rows={5} placeholder="Beschrijf uw vraag of wens..." value={form.bericht}
            onChange={e => setForm({ ...form, bericht: e.target.value })}
            style={{ ...inputStyle, resize: "vertical" as const }} />
        </div>
        {error && (
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#dc2626", background: "#fef2f2", padding: "10px 14px", borderRadius: 8, margin: 0 }}>
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
        <button type="submit" disabled={submitDisabled} style={{
          padding: "14px", background: "#1a3bcc", color: "white", border: "none",
          borderRadius: 8, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15,
          cursor: submitDisabled ? "not-allowed" : "pointer", opacity: submitDisabled ? 0.7 : 1,
        }}>
          {submitLabel}
        </button>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 12, color: "#94a3b8", margin: 0, textAlign: "center" }}>
          * Verplichte velden
        </p>
      </form>
    </div>
  );
}
