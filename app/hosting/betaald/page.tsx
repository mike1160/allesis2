import type { Metadata } from "next";
import Link from "next/link";
import { haalOrderStatus, ingGeconfigureerd, isBetaald } from "@/lib/ing-checkout";

export const metadata: Metadata = {
  title: "Betaling",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

type Uitkomst = "betaald" | "bezig" | "mislukt";

async function bepaalUitkomst(sp: Record<string, string | string[] | undefined>): Promise<Uitkomst> {
  const een = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) as string | undefined;
  const id = een("id") || een("orderId");
  if (id && ingGeconfigureerd()) {
    const order = await haalOrderStatus(id).catch(() => null);
    if (order) {
      if (isBetaald(order.status)) return "betaald";
      return order.status.code < 0 ? "mislukt" : "bezig";
    }
  }
  const code = Number(een("statusCode") ?? NaN);
  if (code === 100) return "betaald";
  if (code < 0) return "mislukt";
  return "bezig";
}

const TEKST: Record<Uitkomst, { icoon: string; titel: string; tekst: string }> = {
  betaald: {
    icoon: "✅",
    titel: "Betaling ontvangen. Bedankt!",
    tekst: "Uw hosting is voor het eerste jaar geregeld. U ontvangt een bevestiging per e-mail en wij nemen binnen één werkdag contact met u op om alles over te zetten.",
  },
  bezig: {
    icoon: "⏳",
    titel: "Uw betaling wordt verwerkt",
    tekst: "Zodra ING de betaling bevestigt, ontvangt u automatisch een e-mail. Dat duurt meestal maar een paar seconden.",
  },
  mislukt: {
    icoon: "↩️",
    titel: "De betaling is niet gelukt",
    tekst: "Er is niets afgeschreven. Uw aanvraag hebben wij wel ontvangen: u kunt het opnieuw proberen, of wij sturen u een betaalverzoek.",
  },
};

export default async function BetaaldPage({ searchParams }: Props) {
  const uitkomst = await bepaalUitkomst(await searchParams);
  const t = TEKST[uitkomst];
  return (
    <div className="bg-neutral-light px-6 pb-24 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="text-5xl" aria-hidden>
          {t.icoon}
        </div>
        <h1 className="font-sora mt-5 text-2xl font-black text-neutral-dark md:text-3xl">{t.titel}</h1>
        <p className="font-lato mt-4 leading-relaxed text-gray-600">{t.tekst}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {uitkomst === "mislukt" ? (
            <Link href="/hosting#hosting-bestellen" className="font-lato rounded-xl bg-primary px-5 py-3 font-bold text-white">
              Opnieuw proberen
            </Link>
          ) : (
            <Link href="/" className="font-lato rounded-xl bg-primary px-5 py-3 font-bold text-white">
              Naar de homepage
            </Link>
          )}
          <a href="mailto:info@allesis.nl" className="font-lato rounded-xl border border-gray-300 px-5 py-3 font-bold text-neutral-dark">
            info@allesis.nl
          </a>
        </div>
      </div>
    </div>
  );
}
