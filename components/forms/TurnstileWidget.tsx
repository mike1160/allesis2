"use client";

import { Turnstile } from "@marsidev/react-turnstile";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Props = {
  onToken: (token: string | null) => void;
  /** Bij netwerk-/challenge-fout (naast onToken(null)). */
  onVerificationFailed?: () => void;
};

export default function TurnstileWidget({ onToken, onVerificationFailed }: Props) {
  if (!siteKey) {
    return (
      <p className="font-lato text-sm text-red-600" role="alert">
        Turnstile is niet geconfigureerd. Stel NEXT_PUBLIC_TURNSTILE_SITE_KEY in.
      </p>
    );
  }

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-auto py-1 [-webkit-overflow-scrolling:touch]">
      <div className="flex w-full min-w-[300px] justify-center sm:justify-start">
        <Turnstile
          siteKey={siteKey}
          onSuccess={(t) => onToken(t)}
          onError={() => {
            onToken(null);
            onVerificationFailed?.();
          }}
          onExpire={() => onToken(null)}
          options={{ theme: "auto", language: "nl", size: "normal" }}
        />
      </div>
    </div>
  );
}
