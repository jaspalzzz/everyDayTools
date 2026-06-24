import type { FaqItem } from "./types";

/**
 * Structured-data helpers. WebApplication schema tells Google each tool page
 * is an interactive application, not a blog post; FAQPage schema targets the
 * People Also Ask box. Both are core to the ranking strategy.
 */

export const SITE = {
  name: "EmploymentTools",
  url: "https://employmenttools.example",
  tagline: "Country-aware employment calculators with instant document output",
} as const;

export function webApplicationSchema(params: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE.name },
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Renders a JSON-LD script tag string for injection via dangerouslySetInnerHTML. */
export function jsonLd(schema: object): { __html: string } {
  return { __html: JSON.stringify(schema) };
}
