import { describe, expect, it } from "vitest";
import { calcSickPay } from "@/lib/calculators/sickPay";

describe("UK Statutory Sick Pay", () => {
  it("5-day week, 10 days off: 7 payable days after 3 waiting days", () => {
    // daily = 123.25 / 5 = 24.65 ; payable = 10 − 3 = 7 ; total = 7 × 24.65 = £172.55
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£173");
    expect(r.breakdown.find((b) => b.label.startsWith("Daily rate"))?.value).toBe("£24.65");
  });

  it("pays nothing during the 3 waiting days", () => {
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 3 });
    expect(r.headline).toBe("£0");
    expect(r.notes.some((n: string) => n.includes("waiting days"))).toBe(true);
  });

  it("caps payable days at 28 weeks", () => {
    // qdpw 5 → max payable 140 days ; total = 140 × 24.65 = £3,451
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 400 });
    expect(r.headline).toBe("£3,451");
    expect(r.breakdown.find((b) => b.label === "Days paid")?.value).toBe("140 days");
  });

  it("daily rate scales with the working pattern", () => {
    const r = calcSickPay({ qualifyingDaysPerWeek: 2, daysOffSick: 5 });
    // daily = 123.25 / 2 = 61.625 → "£61.63"
    expect(r.breakdown.find((b) => b.label.startsWith("Daily rate"))?.value).toBe("£61.63");
  });

  it("applies the 80% earnings cap when AWE is below the statutory rate", () => {
    // AWE £140 → 80% = £112 < £123.25 flat rate → uses £112/wk
    // daily = 112 / 5 = 22.40 ; payable = 10 − 3 = 7 ; total = 7 × 22.40 = £156.80
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10, averageWeeklyEarnings: 140 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£157");
    expect(r.notes.some((n: string) => n.includes("80%"))).toBe(true);
  });

  it("does not cap when AWE × 80% exceeds the statutory rate", () => {
    // AWE £200 → 80% = £160 > £123.25 → uses flat £123.25
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10, averageWeeklyEarnings: 200 });
    expect(r.breakdown.find((b) => b.label === "Weekly SSP rate")?.value).toBe("£123.25");
  });

  it("returns ineligible when AWE is below the LEL", () => {
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10, averageWeeklyEarnings: 100 });
    expect(r.valid).toBe(false);
    expect(r.headline).toBe("Not eligible");
  });

  it("returns invalid with no working days or no days off", () => {
    expect(calcSickPay({ qualifyingDaysPerWeek: 0, daysOffSick: 10 }).valid).toBe(false);
    expect(calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 0 }).valid).toBe(false);
  });
});
