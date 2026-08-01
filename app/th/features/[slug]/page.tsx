import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FEATURES, FEATURE_SLUGS, type FeatureSlug } from "@/lib/th-features";
import { resolveLang, LINE_URL, WHATSAPP_URL, type Lang } from "@/lib/translations";
import { SITE_URL } from "@/lib/seo-config";

export function generateStaticParams() {
  return FEATURE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = FEATURES[slug as FeatureSlug];
  if (!feature) return {};
  return {
    title: `${feature.title.en} — Allesis Phuket`,
    alternates: { canonical: `${SITE_URL}/th/features/${slug}` },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function FeaturePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang: langParam } = await searchParams;
  const feature = FEATURES[slug as FeatureSlug];
  if (!feature) notFound();
  const lang: Lang = resolveLang(langParam);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${feature.img}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 pt-32">
          <Link
            href={`/th?lang=${lang}`}
            className="mb-6 inline-block text-sm text-zinc-400 hover:text-amber-400"
          >
            ← {lang === "th" ? "กลับ" : lang === "nl" ? "Terug" : lang === "ru" ? "Назад" : lang === "de" ? "Zurück" : "Back"}
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-amber-400 md:text-5xl">
            {feature.title[lang]}
          </h1>
          <p className="mt-4 text-xl text-zinc-300">{feature.lead[lang]}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed text-zinc-400">{feature.body[lang]}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={LINE_URL}
            className="rounded-xl bg-green-500 px-8 py-4 text-center font-black text-white hover:bg-green-400"
          >
            LINE
          </a>
          <a
            href={WHATSAPP_URL}
            className="rounded-xl bg-amber-400 px-8 py-4 text-center font-black text-zinc-900 hover:bg-amber-300"
          >
            WhatsApp
          </a>
          <Link
            href={`/th?lang=${lang}#contact`}
            className="rounded-xl border border-zinc-600 bg-zinc-800 px-8 py-4 text-center font-bold text-white hover:bg-zinc-700"
          >
            {lang === "th" ? "แบบฟอร์มติดต่อ" : lang === "nl" ? "Contactformulier" : "Contact form"}
          </Link>
        </div>
      </section>
    </main>
  );
}
