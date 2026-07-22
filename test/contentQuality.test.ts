import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import {
  generateMetadata as stateHubMetadata,
  generateStaticParams as stateHubParams,
} from "@/app/us/states/[state]/page";
import {
  generateMetadata as finalPayMetadata,
  generateStaticParams as finalPayParams,
} from "@/app/us/states/[state]/final-paycheck/page";
import {
  generateMetadata as minimumWageMetadata,
  generateStaticParams as minimumWageParams,
} from "@/app/us/states/[state]/minimum-wage/page";
import {
  generateMetadata as ptoPayoutMetadata,
  generateStaticParams as ptoPayoutParams,
} from "@/app/us/states/[state]/pto-payout/page";
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
    // A current-year review alone (Connecticut) is not enough without curated
    // local analysis; and template-varied prose on a stale record (California)
    // never qualifies. Only a current, sourced, substantively curated record does.
    const connecticut = getUsState("connecticut")!;
    const california = getUsState("california")!;

    expect(connecticut.verifiedYear).toBe(US_STATE_REVIEW_YEAR);
    expect(connecticut.stateSpecificDetail).toBeUndefined();
    expect(isIndexableUsState(connecticut)).toBe(false);

    expect(california.verifiedYear).toBeLessThan(US_STATE_REVIEW_YEAR);
    expect(california.stateSpecificDetail).toBeUndefined();
    expect(isIndexableUsState(california)).toBe(false);
  });

  it("only builds US state pages that pass the quality gate (rest 404)", async () => {
    // The static export emits a page only for params returned here. Gated,
    // template-varied records must be absent from the build so neither Search
    // nor an AdSense reviewer can reach thin, programmatically generated pages.
    const indexable = US_STATES.filter(isIndexableUsState).map((s) => s.slug).sort();
    // The three manually curated, source-reviewed states are the qualifying set.
    expect(indexable).toEqual(["kansas", "mississippi", "wyoming"]);

    for (const params of [stateHubParams, finalPayParams, minimumWageParams, ptoPayoutParams]) {
      const emitted = (await params()).map((p) => p.state).sort();
      expect(emitted).toEqual(indexable);
      expect(emitted.every((slug) => isIndexableUsState(getUsState(slug)!))).toBe(true);
    }
  });

  it("keeps every unqualified state route family out of the sitemap", () => {
    const urls = new Set(sitemap().map((entry) => entry.url));

    for (const state of US_STATES) {
      const present = isIndexableUsState(state);
      for (const suffix of ["", "/final-paycheck", "/minimum-wage", "/pto-payout"]) {
        expect(urls.has(`${SITE.url}/us/states/${state.slug}${suffix}`), `${state.slug}${suffix}`)
          .toBe(present);
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

  it("indexes a current, sourced, substantively curated record", () => {
    const kansas = getUsState("kansas")!;
    expect(kansas.verifiedYear).toBeGreaterThanOrEqual(US_STATE_REVIEW_YEAR);
    expect(kansas.stateSpecificDetail).toBeDefined();
    expect(isIndexableUsState(kansas)).toBe(true);
    expect(statePageRobots(kansas)).toMatchObject({ index: true, follow: true });
  });

  it("excludes synonym-varied Canada and Australia templates from search inventory", () => {
    // No province or state is curated yet, so their dynamic routes have been
    // removed entirely: every such URL 404s (verified in e2e). Here we lock the
    // gate + sitemap contract so a record cannot silently re-enter search.
    const urls = new Set(sitemap().map((entry) => entry.url));
    for (const province of CA_PROVINCES) {
      expect(isIndexableCaProvince(province), province.slug).toBe(false);
      expect(urls.has(`${SITE.url}/ca/provinces/${province.slug}`), province.slug).toBe(false);
    }
    for (const state of AU_STATES) {
      expect(isIndexableAuState(state), state.slug).toBe(false);
      expect(urls.has(`${SITE.url}/au/states/${state.slug}`), state.slug).toBe(false);
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
