import { describe, expect, it } from "vitest";
import { calcTakeHomePay } from "@/lib/calculators/takeHomePay";

describe("UK take-home pay", () => {
  it("returns invalid when gross is zero", () => {
    expect(calcTakeHomePay({ country: "UK", grossAnnual: 0 }).valid).toBe(false);
  });

  it("below personal allowance — no tax or NI", () => {
    const r = calcTakeHomePay({ country: "UK", grossAnnual: 10_000 });
    expect(r.valid).toBe(true);
    // No income tax, no NI below £12,570 → take-home = gross
    expect(r.headline).toBe("£10,000");
  });

  it("basic-rate earner (£30,000)", () => {
    const r = calcTakeHomePay({ country: "UK", grossAnnual: 30_000 });
    // Taxable: 30000 - 12570 = 17430 × 0.2 = 3486 tax
    // NI: (30000 - 12570) × 0.08 = 1394.40 → rounded to nearest whole
    // Take-home ≈ 30000 - 3486 - 1394 = 25120
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£25,120");
  });

  it("higher-rate earner (£60,000)", () => {
    const r = calcTakeHomePay({ country: "UK", grossAnnual: 60_000 });
    expect(r.valid).toBe(true);
    // Must pay higher rate on income above £50,270
    const hasHigherRateNote = r.breakdown.some(
      (b) => b.label === "Income tax" && b.value.startsWith("−"),
    );
    expect(hasHigherRateNote).toBe(true);
  });

  it("tapers personal allowance above £100k", () => {
    const r = calcTakeHomePay({ country: "UK", grossAnnual: 110_000 });
    expect(r.valid).toBe(true);
    // PA should be reduced: 12570 - (10000/2) = 7570
    const paLine = r.breakdown.find((b) => b.label === "Personal allowance");
    expect(paLine?.value).toBe("£7,570");
    expect(r.notes.some((n) => n.includes("£100,000"))).toBe(true);
  });

  it("PA reaches zero at £125,140", () => {
    const r = calcTakeHomePay({ country: "UK", grossAnnual: 130_000 });
    const paLine = r.breakdown.find((b) => b.label === "Personal allowance");
    expect(paLine?.value).toBe("£0");
  });

  it("breakdown includes monthly take-home line", () => {
    const r = calcTakeHomePay({ country: "UK", grossAnnual: 40_000 });
    expect(r.breakdown.some((b) => b.label === "Monthly take-home")).toBe(true);
  });
});

describe("US take-home pay", () => {
  it("returns invalid when gross is zero", () => {
    expect(calcTakeHomePay({ country: "US", grossAnnual: 0 }).valid).toBe(false);
  });

  it("below standard deduction — no federal income tax", () => {
    const r = calcTakeHomePay({ country: "US", grossAnnual: 15_000 });
    expect(r.valid).toBe(true);
    // AGI = 15000 - 16100 = 0 → no income tax (only FICA)
    const fedLine = r.breakdown.find((b) => b.label === "Federal income tax");
    expect(fedLine?.value).toBe("−$0");
  });

  it("middle-income earner ($75,000)", () => {
    const r = calcTakeHomePay({ country: "US", grossAnnual: 75_000 });
    expect(r.valid).toBe(true);
    expect(r.headline).toMatch(/^\$[\d,]+$/);
    // Deductions should be less than gross
    const takeHome = parseFloat(r.headline.replace(/[$,]/g, ""));
    expect(takeHome).toBeGreaterThan(50_000);
    expect(takeHome).toBeLessThan(75_000);
  });

  it("SS tax stops at wage base ($176,100)", () => {
    const r = calcTakeHomePay({ country: "US", grossAnnual: 200_000 });
    expect(r.valid).toBe(true);
    expect(r.notes.some((n) => n.includes("$176,100"))).toBe(true);
  });

  it("breakdown includes monthly take-home line", () => {
    const r = calcTakeHomePay({ country: "US", grossAnnual: 60_000 });
    expect(r.breakdown.some((b) => b.label === "Monthly take-home")).toBe(true);
  });

  it("notes include state tax caveat", () => {
    const r = calcTakeHomePay({ country: "US", grossAnnual: 60_000 });
    expect(r.notes.some((n) => n.toLowerCase().includes("state"))).toBe(true);
  });
});
