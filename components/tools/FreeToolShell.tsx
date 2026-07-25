"use client";

import PageHero from "@/components/PageHero";

type Props = {
  title: string;
  titleAccent?: string;
  subtitle: string;
  eyebrow?: string;
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
  titleAccent,
  subtitle,
  eyebrow = "Gratis tool",
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        titleAccent={titleAccent}
        description={subtitle}
      >
        <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-3">
          <label htmlFor={inputId} className="sr-only">
            Domeinnaam
          </label>
          <input
            id={inputId}
            type="text"
            value={domain}
            onChange={(e) => onDomainChange(e.target.value)}
            placeholder="bijv. uwbedrijf.nl"
            className="font-lato min-h-[56px] w-full rounded-xl border-2 border-gray-200 bg-white px-5 text-lg text-neutral-dark placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={loading || !domain.trim()}
            className="font-lato min-h-[56px] w-full rounded-xl bg-primary px-8 text-lg font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitLabel}
          </button>
        </form>

        {loading ? (
          <p className="font-lato mt-8 text-lg text-gray-500" aria-live="polite">
            {loadingSteps[loadingStepIndex]}
          </p>
        ) : null}

        {error ? (
          <div className="font-lato mt-8 max-w-xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700" role="alert">
            <p>{error}</p>
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-red-100 px-4 font-semibold text-red-800 underline-offset-2 hover:underline"
              >
                Opnieuw proberen
              </button>
            ) : null}
            <p className="mt-3 text-sm text-red-600">
              Hulp nodig?{" "}
              <a href="mailto:support@allesis.nl" className="font-semibold underline">
                support@allesis.nl
              </a>
            </p>
          </div>
        ) : null}
      </PageHero>

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
    <section className="border-t border-gray-200 bg-white px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        {children}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onReset}
            className="font-lato min-h-[48px] rounded-xl border-2 border-gray-200 bg-white px-6 font-semibold text-neutral-dark transition hover:border-primary hover:text-primary"
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
