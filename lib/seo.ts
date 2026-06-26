import type { Metadata } from "next";
import type { FaqItem } from "./types";
import type { Region } from "@/data/tools";

/**
 * Structured-data helpers. WebApplication schema tells Google each tool page
 * is an interactive application, not a blog post; FAQPage schema targets the
 * People Also Ask box. Both are core to the ranking strategy.
 */

export const SITE = {
  name: "My Pay Rights",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mypayrights.com",
  tagline: "Law-backed calculators for pay, leave, and final wages",
  contactEmail: "hello@mypayrights.com",
  privacyEmail: "privacy@mypayrights.com",
  legalEmail: "legal@mypayrights.com",
} as const;

/** Derive the primary offer currency from the tool region. */
function priceCurrencyForRegion(region: Region): string {
  if (region === "UK") return "GBP";
  if (region === "US") return "USD";
  // Multi-region tools: default to GBP as the first listed currency
  return region.startsWith("UK") ? "GBP" : "USD";
}

export function webApplicationSchema(params: {
  name: string;
  description: string;
  url: string;
  region?: Region;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: priceCurrencyForRegion(params.region ?? "US/UK/CA/AU"),
    },
    publisher: { "@type": "Organization", name: SITE.name },
  };
}

export function breadcrumbSchema(toolName: string, toolUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: toolName, item: toolUrl },
    ],
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

/** JSON-LD for the homepage only — WebSite + Organization. */
export function homepageSchemas(): [object, object] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      contactPoint: {
        "@type": "ContactPoint",
        email: SITE.contactEmail,
        contactType: "customer support",
      },
    },
  ];
}

/**
 * Builds the per-tool metadata object (title, description, canonical,
 * and per-page Open Graph / Twitter tags). Call this in every tool page.tsx
 * instead of building metadata manually.
 */
export function toolMetadata(params: {
  title: string;
  description: string;
  url: string;
  /** Slug used to build the per-page OG image path. */
  slug: string;
}): Metadata {
  const ogImageUrl = `/${params.slug}/opengraph-image`;
  return {
    title: params.title,
    description: params.description,
    alternates: { canonical: params.url },
    openGraph: {
      title: params.title,
      description: params.description,
      url: params.url,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      title: params.title,
      description: params.description,
      images: [ogImageUrl],
    },
  };
}

/** Renders a JSON-LD script tag string for injection via dangerouslySetInnerHTML. */
export function jsonLd(schema: object): { __html: string } {
  return { __html: JSON.stringify(schema) };
}
