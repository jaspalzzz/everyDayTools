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

  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE.url}/${tool.slug}`,
    changeFrequency: "monthly",
    priority: priorityByTier[tool.tier ?? 1] ?? 0.8,
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
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/uk`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/us`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/ca`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE.url}/au`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE.url}/guides`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/compare`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE.url}/faq`, changeFrequency: "monthly", priority: 0.85 },
    ...guideEntries,
    { url: `${SITE.url}/situations/made-redundant-uk`, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE.url}/situations/unfair-dismissal-uk`, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE.url}/situations/leaving-job-uk`, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE.url}/situations/employer-not-paying`, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE.url}/situations/constructive-dismissal-uk`, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE.url}/situations/sacked-while-pregnant-uk`, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE.url}/situations/employer-gone-bust`, changeFrequency: "monthly", priority: 0.87 },
    { url: `${SITE.url}/situations/workplace-discrimination-uk`, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE.url}/situations/us-wrongful-termination`, changeFrequency: "monthly", priority: 0.87 },
    { url: `${SITE.url}/fr`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE.url}/fr/ca/indemnite-de-depart`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/fr/ca/preavis`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/fr/ca/paie-de-vacances`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/tupe-wizard`, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/methodology`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/editorial-policy`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/disclaimer`, changeFrequency: "yearly", priority: 0.2 },
    ...toolEntries,
    ...stateEntries,
    ...provinceEntries,
    ...auStateEntries,
    ...compareEntries,
    ...faqEntries,
    ...blogEntries,
  ];
}
