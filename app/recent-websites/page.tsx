import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Recent gemaakte websites — SEO & AI-vindbaar",
  description:
    "Portfolio: o.a. Ren Ji Tang (Next.js), geoptimaliseerd voor Google en AI-overzichten. Allesis bouwt toekomstbestendige sites voor het MKB.",
  alternates: pageAlternates("/recent-websites"),
  openGraph: {
    title: "Recent websites | Allesis",
    description: "Cases en technische aanpak — vindbaar in zoekmachines en AI.",
    url: `${SITE_URL}/recent-websites`,
    locale: "nl_NL",
    type: "website",
  },
};

const featured = {
  title: "Ren Ji Tang",
  subtitle: "Acupunctuur & Traditionele Chinese Geneeskunde — 's-Hertogenbosch",
  url: "https://www.renjitang.nl",
  tech: ["Next.js", "Tailwind CSS"],
  features: [
    "Online boekingsmodule",
    "Google reviews-integratie",
    "Behandelingspagina's",
    "Volledig AVG-compliant",
  ],
  resultaat: "5 sterren op Google, volledig mobielvriendelijk, snel ladend",
};

const projects = [
  {
    title: "Saved Souls Foundation",
    subtitle: "Dierenopvang Thailand",
    url: "https://www.savedsouls-foundation.com/nl",
    image: "/savedsouls-screenshot.png",
    description:
      "Non-profit in Khon Kaen, Thailand, voor geredde en gehandicapte honden. Content en structuur zijn zo opgezet dat zoekmachines en AI-tools de missie en acties correct kunnen weergeven.",
  },
  {
    title: "Shu Xin Haarlem",
    subtitle: "Traditionele Chinese Geneeskunde & Acupunctuur",
    url: "https://shuxin.nl/",
    image: "/shuxin-screenshot.png",
    description:
      "Praktijk voor acupunctuur en TCG in het hart van Haarlem. Website afgestemd op zoekgedrag in Google én op hoe AI's en taalmodellen informatie over de praktijk ophalen en samenvatten.",
  },
];

export default function RecentWebsitesPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Portfolio & cases"
        title="Recent gemaakte websites aangepast aan vindbaarheid in AI en large language models"
        subtitle="Steeds vaker zoeken mensen via AI-assistenten en grote taalmodellen. Wij bouwen en optimaliseren websites zodat ze niet alleen goed scoren in Google, maar ook correct worden weergegeven in ChatGPT, Perplexity en vergelijkbare tools. Hieronder ons uitgelichte project en meer recent werk."
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-12">
        <div className="mx-auto max-w-4xl">
          <Link href={featured.url} target="_blank" rel="noopener noreferrer" className="group block no-underline">
            <PremiumCard className="overflow-hidden border-2 border-primary/40 !p-0 ring-0 transition group-hover:border-primary">
              <div
                className="flex flex-col items-center justify-center px-6 py-12 text-center"
                style={{
                  background: "linear-gradient(135deg, #1a3bcc 0%, #2d54e8 45%, #0f172a 100%)",
                }}
              >
                <span className="font-lato text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Uitgelicht project</span>
                <h2 className="font-sora mt-3 text-3xl font-extrabold text-white md:text-4xl">{featured.title}</h2>
                <p className="font-lato mt-2 max-w-md text-sm text-white/80">{featured.subtitle}</p>
              </div>
              <div className="p-8">
                <p className="font-lato text-sm leading-relaxed text-neutral-mid">
                  Volledige Next.js-website voor de acupunctuurpraktijk in &apos;s-Hertogenbosch — gebouwd door allesis.nl. Tech stack:{" "}
                  <strong className="text-neutral-dark">{featured.tech.join(" · ")}</strong>.
                </p>
                <ul className="font-lato mt-5 space-y-2 text-sm text-neutral-mid">
                  {featured.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="font-bold text-primary" aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="font-lato mt-4 text-sm font-semibold text-neutral-dark">Resultaat: {featured.resultaat}.</p>
                <span className="font-lato mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:underline">
                  Bezoek renjitang.nl <ExternalLink className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </PremiumCard>
          </Link>
        </div>
      </Reveal>

      <Reveal className="bg-neutral-light/40 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-sora text-center text-2xl font-bold text-neutral-dark">Meer recente sites</h2>
          <div className="mt-10 flex flex-col gap-10">
            {projects.map((project) => (
              <Link
                key={project.url}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block no-underline"
              >
                <PremiumCard className="!p-0 overflow-hidden">
                  <div className="relative aspect-[16/10] w-full bg-neutral-light">
                    <Image
                      src={project.image}
                      alt={`Screenshot van ${project.title}`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-sora text-xl font-bold text-neutral-dark">{project.title}</h3>
                    <p className="font-lato mt-1 text-sm font-semibold text-primary">{project.subtitle}</p>
                    <p className="font-lato mt-3 text-sm leading-relaxed text-neutral-mid">{project.description}</p>
                    <span className="font-lato mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:underline">
                      Bezoek website <ExternalLink className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </PremiumCard>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-lg text-center">
          <p className="font-lato text-neutral-mid">Ook uw site toekomstbestendig maken voor zoekmachines én AI? Wij helpen graag.</p>
          <Link
            href="/contact"
            className="font-lato mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-10 font-bold text-white transition hover:bg-primary-dark"
          >
            Neem contact op →
          </Link>
        </div>
      </Reveal>
    </>
  );
}
