import { describe, expect, it } from "vitest";
import { US_STATES } from "@/data/usStates";
import { CA_PROVINCES } from "@/data/caProvinces";
import { AU_STATES } from "@/data/auStates";
import { STATE_PTO } from "@/lib/calculators/ptoPayout";
import { STATE_FINAL_PAY } from "@/lib/calculators/finalPaycheck";

const CURRENT_YEAR = new Date().getUTCFullYear();

describe("jurisdiction data quality", () => {
  it("covers every US state plus DC with unique codes and slugs", () => {
    expect(US_STATES).toHaveLength(51);
    expect(new Set(US_STATES.map((state) => state.code)).size).toBe(51);
    expect(new Set(US_STATES.map((state) => state.slug)).size).toBe(51);
  });

  it("rejects stale or insecure US legal records", () => {
    for (const state of US_STATES) {
      expect(state.verifiedYear, `${state.name} verification is stale`).toBeGreaterThanOrEqual(CURRENT_YEAR - 1);
      expect(state.dolUrl, `${state.name} source must use HTTPS`).toMatch(/^https:\/\//);
      expect(state.finalPaycheckTerminated.trim().length, `${state.name} terminated deadline missing`).toBeGreaterThan(4);
      expect(state.finalPaycheckResigned.trim().length, `${state.name} resigned deadline missing`).toBeGreaterThan(4);
    }
  });

  it("keeps complete Canadian and Australian jurisdiction coverage current", () => {
    expect(CA_PROVINCES).toHaveLength(13);
    expect(AU_STATES).toHaveLength(8);
    for (const area of [...CA_PROVINCES, ...AU_STATES]) {
      expect(area.verifiedYear, `${area.name} verification is stale`).toBeGreaterThanOrEqual(CURRENT_YEAR - 1);
    }
  });

  it("requires genuine local context on the four priority state markets", () => {
    for (const slug of ["california", "texas", "new-york", "florida"]) {
      const state = US_STATES.find((item) => item.slug === slug);
      expect(state?.localContext?.length, `${slug} needs differentiated local context`).toBeGreaterThan(180);
      expect(state?.lastContentUpdate, `${slug} needs a truthful content update date`).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
    }
  });

  it("requires row-level provenance for every high-stakes US pay rule", () => {
    for (const row of [...STATE_PTO, ...STATE_FINAL_PAY]) {
      expect(row.sourceUrl, `${row.code} source must use HTTPS`).toMatch(/^https:\/\//);
      expect(row.lastVerified, `${row.code} verification date missing`).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
    }
  });
});
