import type { MetadataRoute } from "next";
import { TOOLS } from "@/data/tools";
import { GUIDES } from "@/data/guides";
import { US_STATES } from "@/data/usStates";
import { CA_PROVINCES } from "@/data/caProvinces";
import { COMPARISONS } from "@/data/comparisons";
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

  const stateEntries: MetadataRoute.Sitemap = US_STATES.map((s) => ({
    url: `${SITE.url}/us/states/${s.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.75,
    lastModified: `${s.verifiedYear}-01-01`,
  }));

  const provinceEntries: MetadataRoute.Sitemap = CA_PROVINCES.map((p) => ({
    url: `${SITE.url}/ca/provinces/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.75,
    lastModified: `${p.verifiedYear}-01-01`,
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
    ...guideEntries,
    { url: `${SITE.url}/situations/made-redundant-uk`, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE.url}/methodology`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/editorial-policy`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/disclaimer`, changeFrequency: "yearly", priority: 0.2 },
    ...toolEntries,
    ...stateEntries,
    ...provinceEntries,
    ...compareEntries,
  ];
}
