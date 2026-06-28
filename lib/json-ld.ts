import { ORGANIZATION_SAME_AS, SITE_URL } from "@/lib/seo-config";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;

export type FaqItem = {
  question: string;
  answer: string;
};

export function buildFaqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type ServiceSchemaInput = {
  id: string;
  name: string;
  description: string;
  url: string;
};

export function buildServiceSchema({ id, name, description, url }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": id,
    name,
    description,
    url,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@id": LOCAL_BUSINESS_ID },
  };
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Allesis",
    legalName: "Allesis",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/logo.svg`,
    email: "info@allesis.nl",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "KvK",
      value: "52339831",
    },
    description:
      "Full-service digitaal bureau in Haarlem: webdesign, hosting, SEO, AVG-compliance en Thaise web- en taaldiensten.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Haarlem",
      addressRegion: "Noord-Holland",
      addressCountry: "NL",
    },
    knowsLanguage: ["nl", "en", "th"],
    areaServed: [
      { "@type": "Country", name: "Nederland" },
      { "@type": "Country", name: "Thailand" },
      { "@type": "Place", name: "Worldwide" },
    ],
    sameAs: [...ORGANIZATION_SAME_AS],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@allesis.nl",
      contactType: "customer service",
      areaServed: ["NL", "Worldwide"],
      availableLanguage: ["Dutch", "English", "Thai"],
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": LOCAL_BUSINESS_ID,
    name: "Allesis",
    url: SITE_URL,
    image: `${SITE_URL}/logo.svg`,
    description: "Webdesign, hosting, SEO en AVG bureau in Haarlem — persoonlijk en all-in-one.",
    email: "info@allesis.nl",
    priceRange: "€€",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "KvK",
      value: "52339831",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Haarlem",
      addressRegion: "Noord-Holland",
      addressCountry: "NL",
    },
    areaServed: ["Haarlem", "Amsterdam", "Alkmaar", "Noord-Holland", "Nederland"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    knowsLanguage: ["nl", "en", "th"],
    parentOrganization: { "@id": ORGANIZATION_ID },
  };
}

export function buildSiteGraphSchema(extraNodes: Record<string, unknown>[] = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildLocalBusinessSchema(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Allesis.nl",
        inLanguage: ["nl-NL", "en", "th"],
        publisher: { "@id": ORGANIZATION_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/domeinen?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      ...extraNodes,
    ],
  };
}
