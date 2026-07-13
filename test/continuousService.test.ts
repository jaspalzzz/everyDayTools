import { describe, expect, it } from "vitest";
import { calcContinuousService } from "@/lib/calculators/continuousService";

describe("continuous employment", () => {
  it("recognises an exact two-year anniversary", () => {
    const result = calcContinuousService({ startDate: "2024-07-13", endDate: "2026-07-13" });
    expect(result.valid).toBe(true);
    expect(result.headline).toBe("2 years");
    expect(result.breakdown.find((line) => line.label === "Two-year threshold")?.value).toBe("Reached");
  });

  it("does not round up just before the two-year anniversary", () => {
    const result = calcContinuousService({ startDate: "2024-07-13", endDate: "2026-07-12" });
    expect(result.headline).toBe("1 year, 11 months");
    expect(result.breakdown.find((line) => line.label === "Two-year threshold")?.value).toBe("Not yet reached");
  });

  it("handles leap-day starts using the final valid anniversary day", () => {
    const result = calcContinuousService({ startDate: "2024-02-29", endDate: "2026-02-28" });
    expect(result.headline).toBe("2 years");
  });

  it("shows days where service is less than one month", () => {
    const result = calcContinuousService({ startDate: "2026-07-01", endDate: "2026-07-13" });
    expect(result.headline).toBe("12 days");
  });

  it("rejects an end date before the start date", () => {
    expect(calcContinuousService({ startDate: "2026-07-13", endDate: "2026-07-12" }).valid).toBe(false);
  });

  it("rejects malformed calendar dates", () => {
    expect(calcContinuousService({ startDate: "2026-02-30", endDate: "2026-07-13" }).valid).toBe(false);
  });
});
