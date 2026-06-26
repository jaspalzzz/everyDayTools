import type { MetadataRoute } from "next";
import { TOOLS } from "@/data/tools";
import { SITE } from "@/lib/seo";

// Generated once at build time for the static export.
export const dynamic = "force-static";

const priorityByTier = {
  1: 0.9,
  2: 0.8,
  3: 0.7,
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE.url}/${tool.slug}`,
    changeFrequency: "monthly",
    priority: priorityByTier[tool.tier ?? 1] ?? 0.8,
  }));

  return [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/disclaimer`, changeFrequency: "yearly", priority: 0.2 },
    ...toolEntries,
  ];
}
