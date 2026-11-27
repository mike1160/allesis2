"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FormConsentFields from "@/components/forms/FormConsentFields";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import { PRIVACY_CONSENT_ERROR } from "@/lib/form-consent";
import { HOSTING_FORM_LABELS, HOSTING_STANDAARD, vindHostingPakket } from "@/lib/hosting-pakketten";


const VERIFY_SERVER = "Verificatie mislukt. Probeer het opnieuw.";
const VERIFY_CLIENT = "Verificatie mislukt. Vernieuw de pagina en probeer opnieuw.";

/** Eerste jaar vooruit, incl. 21% btw. */
function jaarBedrag(label: string) {
  const p = vindHostingPakket(label);
  if (!p) return null;
  return (Math.round(p.prijs * 12 * 1.21 * 100) / 100).toFixed(2).replace(".", ",");
}

export default function HostingOrderForm({ ingActief = false }: { ingActief?: boolean }) {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    pakket: HOSTING_STANDAARD.formLabel as string,
    naam: "",
    email: "",
    telefoon: "",
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
    const gevonden = vindHostingPakket(searchParams.get("pakket"));
    if (gevonden) {
      setForm((f) => ({ ...f, pakket: gevonden.formLabel }));
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
        body: JSON.stringify({ type: "hosting_order", turnstileToken, privacyAccepted: true, nieuwsbrief, ...form }),
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
      if (typeof data.redirectUrl === "string" && data.redirectUrl.startsWith("https://")) {
        window.location.href = data.redirectUrl;
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
  const submitLabel = loading ? "Verzenden…" : !turnstileToken ? "Bezig met verificatie..." : ingActief
          ? "Bestellen en betalen met iDEAL →"
          : "Aanvraag versturen";
  const bedrag = jaarBedrag(form.pakket);

  if (success) {
    return (
      <div
        style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 16,
          padding: "40px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
        <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#0f172a", marginBottom: 8 }}>
          Bedankt!
        </h2>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", margin: 0 }}>
          Uw hostingaanvraag is verzonden. Wij nemen binnen één werkdag contact met u op.
        </p>
      </div>
    );
  }

  return (
    <form
      id="hosting-bestellen"
      onSubmit={handleSubmit}
      style={{
        marginTop: 48,
        padding: "36px 32px",
        background: "white",
        border: "1px solid #e2e6f0",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        maxWidth: 560,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.35rem", color: "#0f172a", marginBottom: 8 }}>
        Hosting bestellen
      </h2>
      <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", marginBottom: 24, lineHeight: 1.6 }}>
        Laat uw gegevens achter, dan regelen wij de rest. €20 per maand exclusief btw, inclusief mailhosting en SSL.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label style={labelStyle}>Pakket *</label>
          <select
            value={form.pakket}
            onChange={(e) => setForm({ ...form, pakket: e.target.value })}
            style={inputStyle}
            required
          >
            {HOSTING_FORM_LABELS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Naam *</label>
          <input
            type="text"
            required
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Telefoonnummer *</label>
          <input
            type="tel"
            required
            value={form.telefoon}
            onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Opmerking</label>
          <textarea
            rows={3}
            value={form.bericht}
            onChange={(e) => setForm({ ...form, bericht: e.target.value })}
            style={{ ...inputStyle, resize: "vertical" as const }}
            placeholder="Optioneel: domeinnaam, gewenste startdatum…"
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
        {ingActief && bedrag && (
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e6f0",
              borderRadius: 10,
              padding: "14px 16px",
              fontFamily: "Lato, sans-serif",
              fontSize: 14,
              color: "#334155",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "#0f172a" }}>
              <span>Eerste jaar vooruit</span>
              <span>€ {bedrag}</span>
            </div>
            <div style={{ marginTop: 4, fontSize: 12, color: "#64748b" }}>
              Incl. 21% btw. Veilig betalen via ING Checkout (o.a. iDEAL). De factuur volgt per e-mail.
            </div>
          </div>
        )}
        <button
          type="submit"
          disabled={submitDisabled}
          style={{
            padding: "14px",
            background: "#3B6D11",
            color: "white",
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
      </div>
    </form>
  );
}
