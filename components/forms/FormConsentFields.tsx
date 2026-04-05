"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { PRIVACY_CONSENT_ERROR } from "@/lib/form-consent";

type Props = {
  privacyAccepted: boolean;
  onPrivacyChange: (v: boolean) => void;
  nieuwsbrief: boolean;
  onNieuwsbriefChange: (v: boolean) => void;
  showPrivacyError?: boolean;
};

const textStyle: CSSProperties = {
  fontFamily: "Lato, sans-serif",
  fontSize: 14,
  color: "#374151",
  lineHeight: 1.5,
};

export default function FormConsentFields({
  privacyAccepted,
  onPrivacyChange,
  nieuwsbrief,
  onNieuwsbriefChange,
  showPrivacyError,
}: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", ...textStyle }}>
        <input
          type="checkbox"
          checked={privacyAccepted}
          onChange={(e) => onPrivacyChange(e.target.checked)}
          style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: "#1a3bcc" }}
          aria-invalid={showPrivacyError || undefined}
          aria-describedby={showPrivacyError ? "privacy-consent-error" : undefined}
        />
        <span>
          Ik ga akkoord met de verwerking van mijn gegevens volgens de{" "}
          <Link href="/privacy" className="font-semibold text-primary underline-offset-2 hover:underline" style={{ color: "#1a3bcc" }}>
            privacyverklaring
          </Link>
          <span style={{ color: "#dc2626" }}>*</span>
        </span>
      </label>
      {showPrivacyError ? (
        <p id="privacy-consent-error" style={{ margin: 0, fontSize: 13, color: "#dc2626", fontFamily: "Lato, sans-serif" }} role="alert">
          {PRIVACY_CONSENT_ERROR}
        </p>
      ) : null}
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", ...textStyle }}>
        <input
          type="checkbox"
          checked={nieuwsbrief}
          onChange={(e) => onNieuwsbriefChange(e.target.checked)}
          style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: "#1a3bcc" }}
        />
        <span>Ik wil graag de nieuwsbrief ontvangen</span>
      </label>
    </div>
  );
}
