import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { GUIDES } from "@/data/guides";

const REQUIRED_GUIDES: Record<string, string> = {
  "us-final-paycheck-late": "/final-paycheck-deadline-calculator",
  "uk-redundancy-pay": "/redundancy-pay-calculator",
  "us-pto-payout-laws-by-state": "/pto-payout-calculator",
  "uk-severance-vs-redundancy": "/severance-pay-calculator",
  "ca-ontario-termination-severance-pay": "/notice-period-calculator",
  "au-redundancy-final-entitlements": "/au-redundancy-pay-calculator",
};

describe("guide catalogue completeness", () => {
  it("keeps the original content cluster and all core countries represented", () => {
    const slugs = new Set(GUIDES.map((guide) => guide.slug));
    const countries = new Set(GUIDES.map((guide) => guide.country));

    expect(GUIDES.length).toBeGreaterThanOrEqual(19);
    for (const slug of Object.keys(REQUIRED_GUIDES)) expect(slugs.has(slug), slug).toBe(true);
    for (const country of ["UK", "US", "CA", "AU"] as const) {
      expect(countries.has(country), country).toBe(true);
    }
  });

  it("keeps every required guide routed, linked to its calculator, and in the sitemap", () => {
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url));

    for (const [slug, calculatorHref] of Object.entries(REQUIRED_GUIDES)) {
      const pagePath = join(process.cwd(), "app", "guides", slug, "page.tsx");
      expect(existsSync(pagePath), `${slug} page`).toBe(true);

      const source = readFileSync(pagePath, "utf8");
      expect(source, `${slug} calculator link`).toContain(calculatorHref);
      expect(sitemapUrls.has(`https://mypayrights.com/guides/${slug}`), `${slug} sitemap`).toBe(true);
    }
  });

  it("keeps the shared international guide shell source-reviewed and schema-enabled", () => {
    const shellPath = join(process.cwd(), "components", "guides", "GuideArticleLayout.tsx");
    const source = readFileSync(shellPath, "utf8");

    expect(source).toContain("guideSchema({");
    expect(source).toContain("faqSchema(faqs)");
    expect(source).toContain("<EditorialReview");
    expect(source).toContain("Official sources");
  });
});
