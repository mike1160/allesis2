"use client";

import FormConsentFields from "@/components/forms/FormConsentFields";
import TurnstileWidget from "@/components/forms/TurnstileWidget";

interface Props {
  domain: string;
  score: number;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  loading: boolean;
  sent: boolean;
  error?: string | null;
  turnstileToken: string | null;
  setTurnstileToken: (t: string | null) => void;
  onTurnstileFailed: () => void;
  privacyAccepted: boolean;
  setPrivacyAccepted: (v: boolean) => void;
  nieuwsbrief: boolean;
  setNieuwsbrief: (v: boolean) => void;
  showPrivacyError: boolean;
}

export default function AVGHelpPopup({
  domain,
  score,
  onClose,
  onSubmit,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  loading,
  sent,
  error,
  turnstileToken,
  setTurnstileToken,
  onTurnstileFailed,
  privacyAccepted,
  setPrivacyAccepted,
  nieuwsbrief,
  setNieuwsbrief,
  showPrivacyError,
}: Props) {
  const submitDisabled = loading || !turnstileToken;
  const submitLabel = loading ? "Bezig…" : !turnstileToken ? "Bezig met verificatie..." : "Ja, neem contact op";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      style={{ animation: "avgOverlayFade 0.2s ease-out forwards" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="avg-popup-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[min(90dvh,640px)] w-full max-w-md overflow-y-auto overscroll-contain rounded-3xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.3)]"
        style={{ animation: "avgModalUp 0.25s ease-out forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none text-neutral-mid transition hover:bg-neutral-light hover:text-neutral-dark"
          aria-label="Sluiten"
        >
          ×
        </button>

        {!sent ? (
          <>
            <h2 id="avg-popup-title" className="font-sora pr-10 text-xl font-bold text-neutral-dark">
              Wij helpen u graag
            </h2>
            <p className="font-lato mt-4 text-base leading-relaxed text-neutral-mid">
              Uw website <strong className="text-neutral-dark">{domain}</strong> scoort <strong>{score}/100</strong>. Wilt
              u dat Allesis de gevonden problemen voor u oplost? Laat uw gegevens achter — we nemen binnen één werkdag
              contact op.
            </p>
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="avg-popup-name" className="font-lato mb-1 block text-sm font-bold text-neutral-dark">
                  Naam *
                </label>
                <input
                  id="avg-popup-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="font-lato w-full rounded-xl border border-[#cbd5e0] px-4 py-3 text-neutral-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="avg-popup-email" className="font-lato mb-1 block text-sm font-bold text-neutral-dark">
                  E-mailadres *
                </label>
                <input
                  id="avg-popup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="font-lato w-full rounded-xl border border-[#cbd5e0] px-4 py-3 text-neutral-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="avg-popup-phone" className="font-lato mb-1 block text-sm font-bold text-neutral-dark">
                  Telefoonnummer
                </label>
                <input
                  id="avg-popup-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="font-lato w-full rounded-xl border border-[#cbd5e0] px-4 py-3 text-neutral-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <FormConsentFields
                privacyAccepted={privacyAccepted}
                onPrivacyChange={setPrivacyAccepted}
                nieuwsbrief={nieuwsbrief}
                onNieuwsbriefChange={setNieuwsbrief}
                showPrivacyError={showPrivacyError}
              />
              {error ? (
                <p className="font-lato rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
              <TurnstileWidget
                onToken={setTurnstileToken}
                onVerificationFailed={onTurnstileFailed}
              />
              <button
                type="submit"
                disabled={submitDisabled}
                className="font-lato mt-2 w-full rounded-xl bg-primary py-3.5 text-base font-bold text-white transition hover:bg-primary-dark disabled:opacity-60"
              >
                {submitLabel}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="font-lato text-center text-sm font-semibold text-neutral-mid underline-offset-2 hover:underline"
              >
                Nee bedankt
              </button>
            </form>
          </>
        ) : (
          <div className="pt-2 text-center">
            <div className="text-4xl" aria-hidden>
              ✅
            </div>
            <p className="font-sora mt-4 text-lg font-bold text-neutral-dark">Bedankt!</p>
            <p className="font-lato mt-2 text-neutral-mid">We nemen spoedig contact met u op.</p>
            <button
              type="button"
              onClick={onClose}
              className="font-lato mt-8 w-full rounded-xl bg-primary py-3.5 font-bold text-white transition hover:bg-primary-dark"
            >
              Sluiten
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
