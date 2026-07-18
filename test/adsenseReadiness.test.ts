import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";
import { ADSENSE_CLIENT, ADSENSE_PUBLISHER_ID } from "@/lib/adsense";

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
  });
});
