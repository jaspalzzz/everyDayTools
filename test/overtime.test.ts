import { describe, expect, it } from "vitest";
import { calcOvertime } from "@/lib/calculators/overtime";

describe("overtime pay", () => {
  it("US FLSA: regular + 1.5× overtime ($25, 40 reg, 8 OT)", () => {
    const r = calcOvertime({
      country: "US",
      hourlyRate: 25,
      regularHours: 40,
      overtimeHours: 8,
      multiplier: 1.5,
    });
    // 40×25 = 1000 ; 8×37.5 = 300 ; total 1300
    expect(r.headline).toBe("$1,300");
  });

  it("supports double-time multipliers", () => {
    const r = calcOvertime({
      country: "US",
      hourlyRate: 20,
      regularHours: 0,
      overtimeHours: 10,
      multiplier: 2,
    });
    expect(r.headline).toBe("$400");
  });

  it("defaults a zero/invalid multiplier to 1.5", () => {
    const r = calcOvertime({
      country: "US",
      hourlyRate: 20,
      regularHours: 0,
      overtimeHours: 10,
      multiplier: 0,
    });
    expect(r.headline).toBe("$300");
  });

  it("cites the FLSA for US, generic guidance otherwise", () => {
    const us = calcOvertime({ country: "US", hourlyRate: 20, regularHours: 40, overtimeHours: 0, multiplier: 1.5 });
    const uk = calcOvertime({ country: "UK", hourlyRate: 20, regularHours: 40, overtimeHours: 0, multiplier: 1.5 });
    expect(us.notes.some((n: string) => n.includes("FLSA"))).toBe(true);
    expect(uk.notes.some((n: string) => n.toLowerCase().includes("contract"))).toBe(true);
  });

  it("US: warns and gives the corrected figure when regular hours exceed 40", () => {
    // 50 regular @ $20, 0 OT, 1.5×. Naive gross = 50×20 = $1,000.
    // FLSA-correct = 40×20 + 10×30 = 800 + 300 = $1,100.
    const r = calcOvertime({ country: "US", hourlyRate: 20, regularHours: 50, overtimeHours: 0, multiplier: 1.5 });
    expect(r.headline).toBe("$1,000"); // respects the user's literal input
    const warning = r.notes.find((n: string) => n.includes("40-hour FLSA threshold"));
    expect(warning).toBeTruthy();
    expect(warning).toContain("$1,100"); // surfaces the corrected gross
  });

  it("US: no over-40 warning when regular hours are within the threshold", () => {
    const r = calcOvertime({ country: "US", hourlyRate: 20, regularHours: 40, overtimeHours: 5, multiplier: 1.5 });
    expect(r.notes.some((n: string) => n.includes("40-hour FLSA threshold"))).toBe(false);
  });

  it("non-US: does not apply the 40-hour FLSA warning", () => {
    const r = calcOvertime({ country: "UK", hourlyRate: 20, regularHours: 50, overtimeHours: 0, multiplier: 1.5 });
    expect(r.notes.some((n: string) => n.includes("FLSA threshold"))).toBe(false);
  });

  it("returns invalid with no rate or hours", () => {
    expect(calcOvertime({ country: "US", hourlyRate: 0, regularHours: 40, overtimeHours: 0, multiplier: 1.5 }).valid).toBe(false);
  });
});
