import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { TOOLS } from "@/data/tools";
import { SITE } from "@/lib/seo";

describe("tool catalogue SEO rules", () => {
  it("gives every tool an explicit launch tier", () => {
    expect(TOOLS.length).toBe(31);
    expect(TOOLS.every((tool) => tool.tier !== undefined)).toBe(true);
  });

  it("keeps tool metadata descriptions within the search snippet target", () => {
    for (const tool of TOOLS) {
      expect(tool.description.length, `${tool.slug} description length`).toBeLessThanOrEqual(155);
    }
  });

  it("includes a sitemap entry with a lastModified date for every tool", () => {
    // priority/changeFrequency were intentionally dropped: both are ignored
    // by Google, and Next.js's MetadataRoute.Sitemap type doesn't require
    // them -- lastModified is the only field Google actually uses.
    const entries = sitemap();

    for (const tool of TOOLS) {
      const entry = entries.find((item) => item.url === `${SITE.url}/${tool.slug}`);
      expect(entry, `${tool.slug} sitemap entry`).toBeDefined();
      expect(entry?.lastModified).toBeTruthy();
    }
  });
});
