import { describe, expect, it } from "vitest";
import { calcDayRate } from "../lib/calculators/dayRate";

describe("calcDayRate", () => {
  it("invalid when no inputs provided", () => {
    const r = calcDayRate({ country: "UK" });
    expect(r.valid).toBe(false);
  });

  it("day-to-annual: £500/day × 220 days = £110,000 annual", () => {
    const r = calcDayRate({ country: "UK", dayRate: 500, workingDaysPerYear: 220 });
    expect(r.valid).toBe(true);
    expect(r.headline).toContain("110,000");
  });

  it("day-to-annual: $600/day × 240 days = $144,000 annual", () => {
    const r = calcDayRate({ country: "US", dayRate: 600, workingDaysPerYear: 240 });
    expect(r.valid).toBe(true);
    expect(r.headline).toContain("144,000");
  });

  it("annual-to-day: equivalent day rate is higher than raw salary/days", () => {
    const salary = 60_000;
    const days = 220;
    const r = calcDayRate({ country: "UK", annualSalary: salary, workingDaysPerYear: days });
    expect(r.valid).toBe(true);
    const rawRate = salary / days;
    const headlineNum = parseFloat(r.headline.replace(/[£,]/g, ""));
    expect(headlineNum).toBeGreaterThan(rawRate);
  });

  it("day-to-annual includes equivalent employee salary row", () => {
    const r = calcDayRate({ country: "UK", dayRate: 450, workingDaysPerYear: 220 });
    const eq = r.breakdown.find((b) => b.label === "Equivalent employee salary");
    expect(eq).toBeTruthy();
  });

  it("annual-to-day includes equivalent day rate row with emphasis", () => {
    const r = calcDayRate({ country: "UK", annualSalary: 70_000, workingDaysPerYear: 220 });
    const eq = r.breakdown.find((b) => b.emphasis);
    expect(eq).toBeTruthy();
  });
});
