import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { TOOLS } from "@/data/tools";
import { SITE } from "@/lib/seo";

const priorityByTier = {
  1: 0.9,
  2: 0.8,
  3: 0.7,
} as const;

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

  it("uses tier-based sitemap priorities for every tool", () => {
    const entries = sitemap();

    for (const tool of TOOLS) {
      const entry = entries.find((item) => item.url === `${SITE.url}/${tool.slug}`);
      expect(entry, `${tool.slug} sitemap entry`).toBeDefined();
      expect(entry?.changeFrequency).toBe("monthly");
      expect(entry?.priority).toBe(priorityByTier[tool.tier!]);
    }
  });
});
