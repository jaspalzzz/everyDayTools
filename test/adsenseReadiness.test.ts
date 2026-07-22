import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";
import {
  ADSENSE_CLIENT,
  ADSENSE_PUBLISHER_ID,
  isAdSenseEligiblePathname,
} from "@/lib/adsense";

describe("AdSense application readiness", () => {
  it("keeps the publisher identity consistent in metadata and ads.txt", () => {
    expect(ADSENSE_CLIENT).toMatch(/^ca-pub-\d+$/);
    expect(ADSENSE_PUBLISHER_ID).toMatch(/^pub-\d+$/);
    expect(metadata.other?.["google-adsense-account"]).toBe(ADSENSE_CLIENT);

    const adsTxt = readFileSync("public/ads.txt", "utf8").trim();
    expect(adsTxt).toBe(
      `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`,
    );
  });

  it("allows the Google consent message through both deployed CSP paths", () => {
    for (const file of ["public/_headers", "functions/_middleware.ts"]) {
      const source = readFileSync(file, "utf8");
      expect(source, file).toContain("https://fundingchoicesmessages.google.com");
    }
  });

  it("keeps the first-party analytics choice out of the AdSense loader", () => {
    const loader = readFileSync("components/AdSenseScript.tsx", "utf8");
    expect(loader).not.toContain("ConsentBanner");
    expect(loader).not.toContain("mpr_cookie_consent");
  });

  it("includes Google's required advertising disclosures in the privacy policy", () => {
    const privacy = readFileSync("app/privacy/page.tsx", "utf8");
    expect(privacy).toContain("Third-party vendors, including");
    expect(privacy).toContain("prior visits to this site or other");
    expect(privacy).toContain("https://myadcenter.google.com/");
    expect(privacy).toContain("https://policies.google.com/technologies/partner-sites");
  });

  it("limits monetisation to calculators and one deliberate manual placement", () => {
    expect(isAdSenseEligiblePathname("/redundancy-pay-calculator")).toBe(true);
    expect(isAdSenseEligiblePathname("/redundancy-pay-calculator/")).toBe(true);
    for (const pathname of ["/", "/privacy", "/about", "/ca/provinces/ontario", "/404"]) {
      expect(isAdSenseEligiblePathname(pathname), pathname).toBe(false);
    }

    const toolLayout = readFileSync("components/ToolLayout.tsx", "utf8");
    expect(toolLayout.match(/<AdSlot\b/g)).toHaveLength(1);
  });

  it("explicitly allows Google's advertising crawlers", () => {
    const robots = readFileSync("app/robots.ts", "utf8");
    expect(robots).toContain('userAgent: "Mediapartners-Google"');
    expect(robots).toContain('userAgent: "Google-Display-Ads-Bot"');
  });
});
