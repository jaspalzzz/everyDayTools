import { describe, expect, it } from "vitest";
import { calcSickPay } from "@/lib/calculators/sickPay";

// From 6 April 2026: no waiting days, no LEL. SSP from day 1 for any employee.
const AWE_OK = 200; // above 80%-cap threshold (80% of £200 = £160 > £123.25 flat)

describe("UK Statutory Sick Pay", () => {
  it("5-day week, 10 days off: all 10 days payable (no waiting days from April 2026)", () => {
    // daily = 123.25 / 5 = 24.65 ; payable = 10 ; total = 10 × 24.65 = £246.50
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10, averageWeeklyEarnings: AWE_OK });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£247");
    expect(r.breakdown.find((b) => b.label.startsWith("Daily rate"))?.value).toBe("£24.65");
  });

  it("pays from day 1 — no waiting days", () => {
    // 3 days off → all 3 payable; total = 3 × 24.65 = £73.95
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 3, averageWeeklyEarnings: AWE_OK });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£74");
    expect(r.notes.some((n: string) => n.toLowerCase().includes("waiting"))).toBe(true);
  });

  it("caps payable days at 28 weeks", () => {
    // qdpw 5 → max payable 140 days ; total = 140 × 24.65 = £3,451
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 400, averageWeeklyEarnings: AWE_OK });
    expect(r.headline).toBe("£3,451");
    expect(r.breakdown.find((b) => b.label === "Days paid")?.value).toBe("140 days");
  });

  it("daily rate scales with the working pattern", () => {
    const r = calcSickPay({ qualifyingDaysPerWeek: 2, daysOffSick: 5, averageWeeklyEarnings: AWE_OK });
    // daily = 123.25 / 2 = 61.625 → "£61.63"
    expect(r.breakdown.find((b) => b.label.startsWith("Daily rate"))?.value).toBe("£61.63");
  });

  it("uses flat rate and prompts for AWE when averageWeeklyEarnings is not provided", () => {
    // No AWE → uses flat rate; valid: true (LEL abolished, all employees eligible)
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10 });
    expect(r.valid).toBe(true);
    expect(r.notes.some((n: string) => n.includes("80%") || n.includes("earnings"))).toBe(true);
  });

  it("applies the 80% earnings cap when AWE × 80% is below the statutory rate", () => {
    // AWE £140 → 80% = £112 < £123.25 flat rate → uses £112/wk
    // daily = 112 / 5 = 22.40 ; payable = 10 (no waiting days) ; total = 10 × 22.40 = £224
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10, averageWeeklyEarnings: 140 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£224");
    expect(r.notes.some((n: string) => n.includes("80%"))).toBe(true);
  });

  it("does not cap when AWE × 80% exceeds the statutory rate", () => {
    // AWE £200 → 80% = £160 > £123.25 → uses flat £123.25
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10, averageWeeklyEarnings: 200 });
    expect(r.breakdown.find((b) => b.label === "Weekly SSP rate")?.value).toBe("£123.25");
  });

  it("low-earner below old LEL now qualifies (LEL abolished)", () => {
    // AWE £100 → 80% = £80 < £123.25 → 80% cap applies; 10 days × (80/5) = £160
    const r = calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 10, averageWeeklyEarnings: 100 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£160");
  });

  it("returns invalid with no working days or no days off", () => {
    expect(calcSickPay({ qualifyingDaysPerWeek: 0, daysOffSick: 10 }).valid).toBe(false);
    expect(calcSickPay({ qualifyingDaysPerWeek: 5, daysOffSick: 0 }).valid).toBe(false);
  });
});
