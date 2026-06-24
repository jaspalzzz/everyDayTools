import { describe, expect, it } from "vitest";
import { calcOvertime } from "@/lib/calculators/takeHome";

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
    expect(us.notes.some((n) => n.includes("FLSA"))).toBe(true);
    expect(uk.notes.some((n) => n.toLowerCase().includes("contract"))).toBe(true);
  });

  it("returns invalid with no rate or hours", () => {
    expect(calcOvertime({ country: "US", hourlyRate: 0, regularHours: 40, overtimeHours: 0, multiplier: 1.5 }).valid).toBe(false);
  });
});
