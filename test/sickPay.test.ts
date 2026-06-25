import { describe, expect, it } from "vitest";
import { calcSickPay } from "@/lib/calculators/sickPay";

describe("UK Statutory Sick Pay", () => {
  it("5-day week, 10 days off: 7 payable days after 3 waiting days", () => {
    // daily = 118.75 / 5 = 23.75 ; payable = 10 − 3 = 7 ; total = 7 × 23.75 = £166.25
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£166");
    expect(r.breakdown.find((b) => b.label.startsWith("Daily rate"))?.value).toBe("£23.75");
  });

  it("pays nothing during the 3 waiting days", () => {
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 3 });
    expect(r.headline).toBe("£0");
    expect(r.notes.some((n) => n.includes("waiting days"))).toBe(true);
  });

  it("caps payable days at 28 weeks", () => {
    // qdpw 5 → max payable 140 days ; total = 140 × 23.75 = £3,325
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 400 });
    expect(r.headline).toBe("£3,325");
    expect(r.breakdown.find((b) => b.label === "Days paid")?.value).toBe("140 days");
  });

  it("daily rate scales with the working pattern", () => {
    const r = calcSickPay({ qualifyingDaysPerWeek: 2, daysOffSick: 5 });
    // daily = 118.75 / 2 = 59.375 → "£59.38"
    expect(r.breakdown.find((b) => b.label.startsWith("Daily rate"))?.value).toBe("£59.38");
  });

  it("returns invalid with no working days or no days off", () => {
    expect(calcSickPay({ qualifyingDaysPerWeek: 0, daysOffSick: 10 }).valid).toBe(false);
    expect(calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 0 }).valid).toBe(false);
  });
});
