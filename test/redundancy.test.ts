import { describe, expect, it } from "vitest";
import { calcRedundancy, REDUNDANCY_CONSTANTS } from "@/lib/calculators/redundancy";

describe("UK statutory redundancy pay", () => {
  it("computes a mid-career example (age 40, 6 years, £500/wk)", () => {
    const r = calcRedundancy({ age: 40, yearsOfService: 6, weeklyPay: 500 });
    expect(r.valid).toBe(true);
    // 6 years all in the 22–40 band = 6 weeks × £500
    expect(r.headline).toBe("£3,000");
  });

  it("matches the published statutory maximum (£21,570 for 2025/26)", () => {
    const r = calcRedundancy({ age: 61, yearsOfService: 30, weeklyPay: 2000 });
    // capped at 20 years, all 41+ => 30 weeks × £719 cap
    expect(r.headline).toBe("£21,570");
  });

  it("applies the weekly pay cap for high earners", () => {
    const capped = calcRedundancy({ age: 50, yearsOfService: 5, weeklyPay: 5000 });
    const atCap = calcRedundancy({
      age: 50,
      yearsOfService: 5,
      weeklyPay: REDUNDANCY_CONSTANTS.weeklyPayCap,
    });
    expect(capped.headline).toBe(atCap.headline);
    expect(capped.notes.some((n) => n.includes("capped"))).toBe(true);
  });

  it("weights age bands correctly (under 22 = 0.5 week)", () => {
    // age 21, 3 years => years worked at 20,19,18 => 0.5×3 = 1.5 weeks × £400 = £600
    const r = calcRedundancy({ age: 21, yearsOfService: 3, weeklyPay: 400 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£600");
  });

  it("rejects service under the 2-year minimum", () => {
    const r = calcRedundancy({ age: 30, yearsOfService: 1, weeklyPay: 500 });
    expect(r.valid).toBe(false);
    expect(r.headline).toBe("—");
  });

  it("never counts more than 20 years", () => {
    const r = calcRedundancy({ age: 70, yearsOfService: 40, weeklyPay: 100 });
    const counted = r.breakdown.find((b) => b.label.includes("Counted years"));
    expect(counted?.value).toBe("20");
  });

  it("ignores invalid/negative input without throwing", () => {
    const r = calcRedundancy({ age: -5, yearsOfService: NaN, weeklyPay: -100 });
    expect(r.valid).toBe(false);
  });
});
