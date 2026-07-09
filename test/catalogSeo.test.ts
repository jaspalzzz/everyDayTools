import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { FAQS } from "@/data/faqs";
import { GUIDES } from "@/data/guides";
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

  it("keeps FAQ slugs unique", () => {
    const slugs = FAQS.map((faq) => faq.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps FAQ relationship slugs resolvable", () => {
    const faqSlugs = new Set(FAQS.map((faq) => faq.slug));
    const toolSlugs = new Set(TOOLS.map((tool) => tool.slug));
    const guideSlugs = new Set(GUIDES.map((guide) => guide.slug));

    for (const faq of FAQS) {
      for (const related of faq.related) {
        expect(faqSlugs.has(related), `${faq.slug} related FAQ ${related}`).toBe(true);
      }

      if (faq.relatedTool) {
        expect(toolSlugs.has(faq.relatedTool), `${faq.slug} related tool ${faq.relatedTool}`).toBe(true);
      }

      if (faq.relatedGuide) {
        expect(guideSlugs.has(faq.relatedGuide), `${faq.slug} related guide ${faq.relatedGuide}`).toBe(true);
      }
    }
  });

  it("keeps sitemap URLs unique", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
