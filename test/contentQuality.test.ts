import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { generateMetadata as stateHubMetadata } from "@/app/us/states/[state]/page";
import { generateMetadata as finalPayMetadata } from "@/app/us/states/[state]/final-paycheck/page";
import { generateMetadata as minimumWageMetadata } from "@/app/us/states/[state]/minimum-wage/page";
import { generateMetadata as ptoPayoutMetadata } from "@/app/us/states/[state]/pto-payout/page";
import { generateMetadata as caProvinceMetadata } from "@/app/ca/provinces/[province]/page";
import { generateMetadata as auStateMetadata } from "@/app/au/states/[state]/page";
import { US_STATES, getUsState } from "@/data/usStates";
import { CA_PROVINCES, getCaProvince } from "@/data/caProvinces";
import { AU_STATES, getAuState } from "@/data/auStates";
import {
  isIndexableAuState,
  isIndexableCaProvince,
  isIndexableUsState,
  statePageRobots,
  US_STATE_REVIEW_YEAR,
} from "@/lib/contentQuality";
import { SITE } from "@/lib/seo";

describe("AdSense and Search content-quality gate", () => {
  it("does not treat template wording variation as an indexability signal", () => {
    const connecticut = getUsState("connecticut")!;
    const kansas = getUsState("kansas")!;

    expect(connecticut.verifiedYear).toBe(US_STATE_REVIEW_YEAR);
    expect(connecticut.stateSpecificDetail).toBeUndefined();
    expect(isIndexableUsState(connecticut)).toBe(false);

    expect(kansas.stateSpecificDetail).toBeDefined();
    expect(kansas.verifiedYear).toBeLessThan(US_STATE_REVIEW_YEAR);
    expect(isIndexableUsState(kansas)).toBe(false);
  });

  it("keeps every unqualified state route family out of the sitemap", () => {
    const urls = new Set(sitemap().map((entry) => entry.url));

    for (const state of US_STATES.filter((item) => !isIndexableUsState(item))) {
      for (const suffix of ["", "/final-paycheck", "/minimum-wage", "/pto-payout"]) {
        expect(urls.has(`${SITE.url}/us/states/${state.slug}${suffix}`), `${state.slug}${suffix}`)
          .toBe(false);
      }
    }
  });

  it("emits noindex,follow on every unqualified state page template", async () => {
    const params = Promise.resolve({ state: "connecticut" });
    const metadata = await Promise.all([
      stateHubMetadata({ params }),
      finalPayMetadata({ params }),
      minimumWageMetadata({ params }),
      ptoPayoutMetadata({ params }),
    ]);

    for (const value of metadata) {
      expect(value.robots).toMatchObject({
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
      });
    }
  });

  it("will index only a current, sourced, substantively curated record", () => {
    const base = getUsState("kansas")!;
    const curated = {
      ...base,
      verifiedYear: US_STATE_REVIEW_YEAR,
      lastContentUpdate: "2026-07-22",
    };

    expect(isIndexableUsState(curated)).toBe(true);
    expect(statePageRobots(curated)).toMatchObject({ index: true, follow: true });
  });

  it("excludes synonym-varied Canada and Australia templates from search inventory", async () => {
    const urls = new Set(sitemap().map((entry) => entry.url));
    for (const province of CA_PROVINCES) {
      expect(isIndexableCaProvince(province), province.slug).toBe(false);
      expect(urls.has(`${SITE.url}/ca/provinces/${province.slug}`), province.slug).toBe(false);
    }
    for (const state of AU_STATES) {
      expect(isIndexableAuState(state), state.slug).toBe(false);
      expect(urls.has(`${SITE.url}/au/states/${state.slug}`), state.slug).toBe(false);
    }

    const [canada, australia] = await Promise.all([
      caProvinceMetadata({ params: Promise.resolve({ province: "ontario" }) }),
      auStateMetadata({ params: Promise.resolve({ state: "new-south-wales" }) }),
    ]);
    for (const value of [canada, australia]) {
      expect(value.robots).toMatchObject({
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
      });
    }
  });

  it("requires a rendered, substantive primary-source editorial detail to requalify", () => {
    const detail = {
      heading: "A manually reviewed local distinction",
      body: Array.from({ length: 85 }, (_, index) => `reviewed${index}`).join(" "),
      sourceLabel: "Official employment standards authority",
      sourceUrl: "https://example.gov/employment-standards",
      sourceReviewed: "22 July 2026",
    };
    expect(isIndexableCaProvince({ ...getCaProvince("ontario")!, editorialDetail: detail })).toBe(true);
    expect(isIndexableAuState({
      ...getAuState("new-south-wales")!,
      lastContentUpdate: "2026-07-22",
      editorialDetail: detail,
    })).toBe(true);
  });
});
