import type { MetadataRoute } from "next";
import { TOOLS } from "@/data/tools";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE.url}/${tool.slug}`,
    changeFrequency: "monthly",
    priority: tool.hero ? 0.9 : 0.7,
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
