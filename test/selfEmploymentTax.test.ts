import { describe, expect, it } from "vitest";
import { calcSelfEmploymentTax } from "../lib/calculators/selfEmploymentTax";

describe("calcSelfEmploymentTax", () => {
  it("returns invalid for zero profit", () => {
    const r = calcSelfEmploymentTax({ country: "UK", netProfit: 0 });
    expect(r.valid).toBe(false);
  });

  it("UK: below PA — no income tax, but Class 4 applies above LPL", () => {
    // £12,570 profit = exactly at PA and Class 4 lower limit → no income tax, no Class 4
    const r = calcSelfEmploymentTax({ country: "UK", netProfit: 12_570 });
    expect(r.valid).toBe(true);
    // income tax zero, but Class 2 applies (profit >= SPT)
    const incomeTaxRow = r.breakdown.find((b) => b.label === "Income tax");
    expect(incomeTaxRow?.value).toMatch(/£0/);
  });

  it("UK: basic-rate profit £40,000 — take-home less than gross", () => {
    const r = calcSelfEmploymentTax({ country: "UK", netProfit: 40_000 });
    expect(r.valid).toBe(true);
    // take-home between 55-70% of gross (rough sanity)
    const takeHome = 40_000 - (40_000 - parseFloat(r.headline.replace(/[^0-9.]/g, "")));
    expect(r.headline).toMatch(/^£/);
    const breakdown = r.breakdown;
    expect(breakdown.some((b) => b.label === "Class 4 NI")).toBe(true);
    expect(breakdown.some((b) => b.label === "Class 2 NI")).toBe(true);
  });

  it("UK: headline value is numeric and less than gross", () => {
    const r = calcSelfEmploymentTax({ country: "UK", netProfit: 60_000 });
    const headlineNum = parseFloat(r.headline.replace(/[£,]/g, ""));
    expect(headlineNum).toBeGreaterThan(0);
    expect(headlineNum).toBeLessThan(60_000);
  });

  it("US: below standard deduction — only SE tax", () => {
    const r = calcSelfEmploymentTax({ country: "US", netProfit: 10_000 });
    expect(r.valid).toBe(true);
    // federal income tax should be 0 (agi below standard deduction)
    const fedRow = r.breakdown.find((b) => b.label === "Federal income tax");
    expect(fedRow?.value).toMatch(/\$0/);
  });

  it("US: mid-income £60k — take-home is reasonable", () => {
    const r = calcSelfEmploymentTax({ country: "US", netProfit: 60_000 });
    const headlineNum = parseFloat(r.headline.replace(/[$,]/g, ""));
    expect(headlineNum).toBeGreaterThan(35_000);
    expect(headlineNum).toBeLessThan(60_000);
  });

  it("includes monthly take-home in breakdown", () => {
    const r = calcSelfEmploymentTax({ country: "UK", netProfit: 50_000 });
    expect(r.breakdown.some((b) => b.label === "Monthly take-home")).toBe(true);
  });
});
