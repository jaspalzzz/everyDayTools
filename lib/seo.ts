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

export const EDITORIAL_REVIEW = {
  "@type": "Organization",
  name: `${SITE.name} editorial review`,
  url: `${SITE.url}/editorial-policy`,
} as const;

export function clampMetaDescription(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;

  const trimmed = normalized.slice(0, Math.max(0, max - 3));
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${(lastSpace > 110 ? trimmed.slice(0, lastSpace) : trimmed).trim()}...`;
}

/** Derive the primary offer currency from the tool region. */
function priceCurrencyForRegion(region: Region): string {
  if (region === "UK") return "GBP";
  if (region === "US") return "USD";
  if (region === "AU") return "AUD";
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
    featureList: ["Live results", "PDF download", "No signup required", "Free to use"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: priceCurrencyForRegion(params.region ?? "US/UK/CA/AU"),
    },
    publisher: { "@type": "Organization", name: SITE.name },
    maintainer: EDITORIAL_REVIEW,
    isAccessibleForFree: true,
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
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.url}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo-mark.svg`,
        width: 64,
        height: 64,
      },
      description:
        "MyPayRights provides free, law-backed employment pay calculators for the UK, US, Canada, and Australia. Every statutory rate is sourced directly from official government publications and reviewed on each jurisdiction's annual legislative cycle.",
      founder: {
        "@type": "Person",
        name: "Jaspal Singh",
        jobTitle: "Founder",
        url: SITE.url,
      },
      knowsAbout: [
        "Employment law",
        "Statutory redundancy pay",
        "Pay in lieu of notice",
        "UK employment rights",
        "US wage and hour law",
        "Fair Work Act Australia",
        "Canadian employment standards",
      ],
      areaServed: ["GB", "US", "CA", "AU"],
      contactPoint: {
        "@type": "ContactPoint",
        email: SITE.contactEmail,
        contactType: "customer support",
        availableLanguage: "English",
      },
    },
  ];
}

/**
 * Builds the per-tool metadata object (title, description, canonical,
 * and per-page Open Graph / Twitter tags). Call this in every tool page.tsx
 * instead of building metadata manually.
 *
 * Pass seoTitle to use a keyword-optimised title tag (e.g. "UK Redundancy Pay
 * Calculator 2026") without changing the UI display name.
 */
export function toolMetadata(params: {
  title: string;
  /** If set, used for <title> and OG title instead of title. */
  seoTitle?: string;
  description: string;
  url: string;
  /** Slug used to build the per-page OG image path. */
  slug: string;
}): Metadata {
  const displayTitle = params.seoTitle ?? params.title;
  const ogImageUrl = `/${params.slug}/opengraph-image`;
  return {
    title: displayTitle,
    description: clampMetaDescription(params.description),
    alternates: { canonical: params.url },
    openGraph: {
      title: displayTitle,
      description: clampMetaDescription(params.description),
      url: params.url,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      title: displayTitle,
      description: clampMetaDescription(params.description),
      images: [ogImageUrl],
    },
  };
}

/** Person entity for the site founder — used in Article/Guide schema. */
export const FOUNDER_PERSON = {
  "@type": "Person",
  name: "Jaspal Singh",
  jobTitle: "Founder",
  url: `${SITE.url}/about`,
} as const;

/**
 * Article schema for blog posts and guides. Uses a named Person author
 * rather than Organization so Google can display bylines and author-rich results.
 */
export function articleSchema(params: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  keywords?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: FOUNDER_PERSON,
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    ...(params.keywords ? { keywords: params.keywords } : {}),
  };
}

/**
 * Schema for long-form guide pages (/guides/*). Article subtype with an
 * 'about' property naming the legal topic for enhanced entity signals.
 */
export function guideSchema(params: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  legalTopic: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: FOUNDER_PERSON,
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    about: { "@type": "Thing", name: params.legalTopic },
  };
}

/** Renders a JSON-LD script tag string for injection via dangerouslySetInnerHTML. */
export function jsonLd(schema: object): { __html: string } {
  return { __html: JSON.stringify(schema) };
}
