import type { MetadataRoute } from "next";
import { TOOLS } from "@/data/tools";
import { GUIDES } from "@/data/guides";
import { US_STATES } from "@/data/usStates";
import { CA_PROVINCES } from "@/data/caProvinces";
import { AU_STATES } from "@/data/auStates";
import { COMPARISONS } from "@/data/comparisons";
import { FAQS } from "@/data/faqs";
import { BLOG_POSTS } from "@/data/blogPosts";
import { SITE } from "@/lib/seo";

// Generated once at build time for the static export.
export const dynamic = "force-static";

const priorityByTier = {
  1: 0.9,
  2: 0.8,
  3: 0.7,
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE.url}/guides/${g.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    lastModified: g.dateModified,
  }));

  // UK statutory rates last changed 6 April 2026 (2026/27 tax year).
  const RATES_UPDATED = "2026-04-06";

  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE.url}/${tool.slug}`,
    changeFrequency: "monthly" as const,
    priority: priorityByTier[tool.tier ?? 1] ?? 0.8,
    lastModified: RATES_UPDATED,
  }));

  const stateEntries: MetadataRoute.Sitemap = US_STATES.flatMap((s) => [
    {
      url: `${SITE.url}/us/states/${s.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.75,
      lastModified: `${s.verifiedYear}-01-01`,
    },
    {
      url: `${SITE.url}/us/states/${s.slug}/final-paycheck`,
      changeFrequency: "yearly" as const,
      priority: 0.72,
      lastModified: `${s.verifiedYear}-01-01`,
    },
    {
      url: `${SITE.url}/us/states/${s.slug}/minimum-wage`,
      changeFrequency: "yearly" as const,
      priority: 0.72,
      lastModified: `${s.verifiedYear}-01-01`,
    },
  ]);

  const provinceEntries: MetadataRoute.Sitemap = CA_PROVINCES.map((p) => ({
    url: `${SITE.url}/ca/provinces/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.75,
    lastModified: `${p.verifiedYear}-01-01`,
  }));

  const faqEntries: MetadataRoute.Sitemap = FAQS.map((f) => ({
    url: `${SITE.url}/faq/${f.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.78,
    lastModified: f.dateModified,
  }));

  const auStateEntries: MetadataRoute.Sitemap = AU_STATES.map((s) => ({
    url: `${SITE.url}/au/states/${s.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.75,
    lastModified: `${s.verifiedYear}-01-01`,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.82,
    lastModified: p.dateModified,
  }));

  const compareEntries: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${SITE.url}/compare/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: c.dateModified,
  }));

  return [
    { url: SITE.url, changeFrequency: "weekly" as const, priority: 1, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/uk`, changeFrequency: "monthly" as const, priority: 0.9, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us`, changeFrequency: "monthly" as const, priority: 0.9, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/ca`, changeFrequency: "monthly" as const, priority: 0.85, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/au`, changeFrequency: "monthly" as const, priority: 0.85, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/guides`, changeFrequency: "monthly" as const, priority: 0.9, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/compare`, changeFrequency: "monthly" as const, priority: 0.85, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/faq`, changeFrequency: "monthly" as const, priority: 0.85, lastModified: RATES_UPDATED },
    ...guideEntries,
    { url: `${SITE.url}/situations/made-redundant-uk`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/unfair-dismissal-uk`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/leaving-job-uk`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/employer-not-paying`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/constructive-dismissal-uk`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/sacked-while-pregnant-uk`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/employer-gone-bust`, changeFrequency: "monthly" as const, priority: 0.87, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/workplace-discrimination-uk`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/us-wrongful-termination`, changeFrequency: "monthly" as const, priority: 0.87, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr`, changeFrequency: "monthly" as const, priority: 0.85, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr/ca/indemnite-de-depart`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr/ca/preavis`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr/ca/paie-de-vacances`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/tupe-wizard`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly" as const, priority: 0.9, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/methodology`, changeFrequency: "yearly" as const, priority: 0.6, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/editorial-policy`, changeFrequency: "yearly" as const, priority: 0.5, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/about`, changeFrequency: "yearly" as const, priority: 0.4, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly" as const, priority: 0.2, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly" as const, priority: 0.2, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/disclaimer`, changeFrequency: "yearly" as const, priority: 0.2, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/press`, changeFrequency: "yearly" as const, priority: 0.4, lastModified: RATES_UPDATED },
    // Pillar pages
    { url: `${SITE.url}/uk/redundancy`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/uk/maternity-leave`, changeFrequency: "monthly" as const, priority: 0.88, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/uk/pay-rights`, changeFrequency: "monthly" as const, priority: 0.87, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us/overtime`, changeFrequency: "monthly" as const, priority: 0.87, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us/pto-payout`, changeFrequency: "monthly" as const, priority: 0.87, lastModified: RATES_UPDATED },
    ...toolEntries,
    ...stateEntries,
    ...provinceEntries,
    ...auStateEntries,
    ...compareEntries,
    ...faqEntries,
    ...blogEntries,
  ];
}
