import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { EDITORIAL_REVIEW, LEGAL_REVIEWER, SITE, articleSchema } from "@/lib/seo";

describe("editorial integrity safeguards", () => {
  it("does not represent the internal source check as a credentialed person review", () => {
    expect(EDITORIAL_REVIEW["@type"]).toBe("Organization");
    expect(EDITORIAL_REVIEW.name.toLowerCase()).not.toMatch(/solicitor|attorney|lawyer|barrister/);
  });

  it("does not emit an independent reviewer without a complete credential configuration", () => {
    expect(LEGAL_REVIEWER).toBeNull();
    const schema = articleSchema({
      headline: "Test",
      description: "Test article",
      url: `${SITE.url}/test`,
      datePublished: "2026-01-01",
      dateModified: "2026-01-01",
      image: `${SITE.url}/opengraph-image`,
    });
    expect(schema).not.toHaveProperty("reviewedBy");
  });

  it("publishes the promised public update log in the sitemap", () => {
    expect(sitemap().some((entry) => entry.url === `${SITE.url}/updates`)).toBe(true);
  });

  it("uses valid, non-future modification dates throughout the sitemap", () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const entry of sitemap()) {
      expect(entry.lastModified, `${entry.url} missing lastModified`).toBeTruthy();
      const value = new Date(entry.lastModified as string | Date).toISOString().slice(0, 10);
      expect(value <= today, `${entry.url} has future lastModified ${value}`).toBe(true);
    }
  });
});
