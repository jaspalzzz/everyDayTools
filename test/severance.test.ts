import { describe, expect, it } from "vitest";
import { calcSeverance } from "@/lib/calculators/severance";

describe("severance estimator", () => {
  it("US: weeks-per-year × years × weekly pay", () => {
    const r = calcSeverance({ country: "US", yearsOfService: 5, weeklyPay: 1200, weeksPerYear: 1 });
    expect(r.headline).toBe("$6,000");
  });

  it("US: respects a 2-weeks-per-year policy", () => {
    const r = calcSeverance({ country: "US", yearsOfService: 5, weeklyPay: 1000, weeksPerYear: 2 });
    expect(r.headline).toBe("$10,000");
  });

  it("US: warns severance is not legally required", () => {
    const r = calcSeverance({ country: "US", yearsOfService: 3, weeklyPay: 1000, weeksPerYear: 1 });
    expect(r.notes.some((n) => n.toLowerCase().includes("not generally required"))).toBe(true);
  });

  it("CA: applies the statutory minimum floor when policy is lower", () => {
    // 10 years × 2 days = 20 days = 4 weeks statutory; policy 0.1 wk/yr = 1 week => floor wins
    const r = calcSeverance({ country: "CA", yearsOfService: 10, weeklyPay: 1000, weeksPerYear: 0.1 });
    expect(r.headline).toBe("$4,000");
    expect(r.notes.some((n) => n.toLowerCase().includes("statutory minimum"))).toBe(true);
  });

  it("returns invalid with no service or pay", () => {
    expect(calcSeverance({ country: "US", yearsOfService: 0, weeklyPay: 1000, weeksPerYear: 1 }).valid).toBe(false);
    expect(calcSeverance({ country: "US", yearsOfService: 5, weeklyPay: 0, weeksPerYear: 1 }).valid).toBe(false);
  });
});
