"use client";

type Props = {
  title: string;
  subtitle: string;
  domain: string;
  onDomainChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  loadingSteps: readonly string[];
  loadingStepIndex: number;
  error: string | null;
  onRetry?: () => void;
  inputId: string;
  submitLabel?: string;
  children?: React.ReactNode;
};

export default function FreeToolShell({
  title,
  subtitle,
  domain,
  onDomainChange,
  onSubmit,
  loading,
  loadingSteps,
  loadingStepIndex,
  error,
  onRetry,
  inputId,
  submitLabel = "Controleer nu →",
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-[#0a0f1e] pb-20 pt-24">
      <section className="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-sora text-4xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h1>
          <p className="font-lato mx-auto mt-5 max-w-lg text-lg font-light text-white/70">{subtitle}</p>

          <form onSubmit={onSubmit} className="mx-auto mt-10 flex max-w-xl flex-col gap-3">
            <label htmlFor={inputId} className="sr-only">
              Domeinnaam
            </label>
            <input
              id={inputId}
              type="text"
              value={domain}
              onChange={(e) => onDomainChange(e.target.value)}
              placeholder="bijv. uwbedrijf.nl"
              className="font-lato min-h-[56px] w-full rounded-xl border-2 border-white/10 bg-white/5 px-5 text-lg text-white placeholder:text-white/40 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
            <button
              type="submit"
              disabled={loading || !domain.trim()}
              className="font-lato min-h-[56px] w-full rounded-xl bg-accent px-8 text-lg font-bold text-[#0a0f1e] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitLabel}
            </button>
          </form>

          {loading ? (
            <p className="font-lato mt-10 text-center text-lg text-white/80" aria-live="polite">
              {loadingSteps[loadingStepIndex]}
            </p>
          ) : null}

          {error ? (
            <div className="font-lato mt-8 rounded-xl bg-red-500/15 px-4 py-3 text-red-200" role="alert">
              <p>{error}</p>
              {onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-red-400/20 px-4 font-semibold text-red-100 underline-offset-2 hover:underline"
                >
                  Opnieuw proberen
                </button>
              ) : null}
              <p className="mt-3 text-sm text-red-200/90">
                Hulp nodig?{" "}
                <a href="mailto:support@allesis.nl" className="font-semibold text-red-100 underline">
                  support@allesis.nl
                </a>
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {children}
    </div>
  );
}

export function ToolReportSection({
  children,
  onReset,
}: {
  children: React.ReactNode;
  onReset: () => void;
}) {
  return (
    <section className="border-t border-white/10 bg-[#0a0f1e] px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        {children}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onReset}
            className="font-lato min-h-[48px] rounded-xl border-2 border-white/20 bg-white/5 px-6 font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
          >
            Scan een andere website
          </button>
        </div>
      </div>
    </section>
  );
}

export function scoreColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}
