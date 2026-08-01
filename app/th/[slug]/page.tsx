import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BranchPageLayout from "@/components/BranchPageLayout";
import { resolveLang, type Lang } from "@/lib/translations";
import { garageContent, garageImgs } from "@/lib/branches/garage";
import { restaurantContent, restaurantImgs } from "@/lib/branches/restaurant";
import { spaContent, spaImgs } from "@/lib/branches/spa";
import { clinicContent, clinicImgs } from "@/lib/branches/clinic";
import { schoolContent, schoolImgs } from "@/lib/branches/school";
import { realestateContent, realestateImgs } from "@/lib/branches/realestate";
import { SITE_URL } from "@/lib/seo-config";

const BRANCHES = {
  garage: { content: garageContent, imgs: garageImgs },
  restaurant: { content: restaurantContent, imgs: restaurantImgs },
  spa: { content: spaContent, imgs: spaImgs },
  clinic: { content: clinicContent, imgs: clinicImgs },
  school: { content: schoolContent, imgs: schoolImgs },
  realestate: { content: realestateContent, imgs: realestateImgs },
} as const;

type BranchKey = keyof typeof BRANCHES;

const SLUG_MAP: Record<string, BranchKey> = {
  garage: "garage",
  อู่ซ่อมรถ: "garage",
  restaurant: "restaurant",
  ร้านอาหาร: "restaurant",
  spa: "spa",
  สปา: "spa",
  clinic: "clinic",
  kliniek: "clinic",
  คลินิก: "clinic",
  school: "school",
  โรงเรียน: "school",
  realestate: "realestate",
  "real-estate": "realestate",
  property: "realestate",
  vastgoed: "realestate",
  อสังหาริมทรัพย์: "realestate",
};

const THAI_SLUG: Record<BranchKey, string> = {
  garage: "อู่ซ่อมรถ",
  restaurant: "ร้านอาหาร",
  spa: "สปา",
  clinic: "คลินิก",
  school: "โรงเรียน",
  realestate: "อสังหาริมทรัพย์",
};

export function generateStaticParams() {
  return (Object.keys(BRANCHES) as BranchKey[]).flatMap((slug) => [
    { slug },
    { slug: THAI_SLUG[slug] },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = SLUG_MAP[decodeURIComponent(slug)];
  if (!branch) return {};
  const titles: Record<BranchKey, string> = {
    garage: "เว็บไซต์อู่ซ่อมรถ ภูเก็ต — Garage Website Phuket | Allesis",
    restaurant: "เว็บไซต์ร้านอาหาร ภูเก็ต — Restaurant Website Phuket | Allesis",
    spa: "เว็บไซต์สปา นวด ภูเก็ต — Spa Website Phuket | Allesis",
    clinic: "เว็บไซต์คลินิก ทันตกรรม ภูเก็ต — Clinic Website Phuket | Allesis",
    school: "เว็บไซต์โรงเรียน สถาบันภาษา ภูเก็ต — School Website Phuket | Allesis",
    realestate: "เว็บไซต์อสังหาริมทรัพย์ ภูเก็ต — Real Estate Website Phuket | Allesis",
  };
  const descriptions: Record<BranchKey, string> = {
    garage:
      "Fast Next.js garage & tyre websites for Phuket — Thai & English, booking, Google Maps, LINE. เว็บไซต์อู่ซ่อมรถภูเก็ต เร็ว พบได้ใน Google",
    restaurant:
      "Restaurant websites for Phuket — menu, reservations, multilingual. เว็บไซต์ร้านอาหารภูเก็ต จองโต๊ะ เมนูออนไลน์",
    spa: "Spa & massage websites for Phuket — packages, booking, reviews. เว็บไซต์สปาและนวดภูเก็ต",
    clinic:
      "Clinic & dental websites for Phuket — trust signals, online booking. เว็บไซต์คลินิกและทันตกรรมภูเก็ต",
    school:
      "School & language institute websites for Phuket. เว็บไซต์โรงเรียนและสถาบันภาษาภูเก็ต",
    realestate:
      "Real estate & property websites for Phuket — listings, search, multilingual. เว็บไซต์อสังหาริมทรัพย์ภูเก็ต",
  };
  const thai = THAI_SLUG[branch];
  return {
    title: titles[branch],
    description: descriptions[branch],
    keywords: [
      `website ${branch} Phuket`,
      "web design Phuket",
      "ทำเว็บไซต์ภูเก็ต",
      "Allesis Phuket",
    ],
    alternates: {
      canonical: `${SITE_URL}/th/${encodeURI(thai)}`,
      languages: {
        th: `${SITE_URL}/th/${encodeURI(thai)}?lang=th`,
        en: `${SITE_URL}/th/${branch}?lang=en`,
        nl: `${SITE_URL}/th/${branch}?lang=nl`,
        ru: `${SITE_URL}/th/${branch}?lang=ru`,
        de: `${SITE_URL}/th/${branch}?lang=de`,
        "x-default": `${SITE_URL}/th/${encodeURI(thai)}`,
      },
    },
    openGraph: {
      title: titles[branch],
      description: descriptions[branch],
      url: `${SITE_URL}/th/${encodeURI(thai)}`,
      locale: "th_TH",
      alternateLocale: ["en_US", "nl_NL"],
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function BranchPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang: langParam } = await searchParams;
  const decoded = decodeURIComponent(slug);
  const branch = SLUG_MAP[decoded];
  if (!branch) notFound();

  const lang: Lang = resolveLang(langParam);
  const { content, imgs } = BRANCHES[branch];

  return (
    <BranchPageLayout
      lang={lang}
      data={content[lang]}
      heroImg={imgs.hero}
      midImg={imgs.mid}
      ctaImg={imgs.cta}
      gradientFrom={imgs.gradient}
    />
  );
}
