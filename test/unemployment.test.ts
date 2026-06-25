import { describe, expect, it } from "vitest";
import { UNEMPLOYMENT_STATES, calcUnemployment } from "@/lib/calculators/unemployment";

describe("US unemployment benefit estimate", () => {
  it("California: wages ÷ 26 within the band", () => {
    // 5,200 ÷ 26 = $200 (between $40 and $450)
    const r = calcUnemployment({ stateCode: "CA", highestQuarterWages: 5200 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("$200");
  });

  it("California: caps at the $450 maximum", () => {
    const r = calcUnemployment({ stateCode: "CA", highestQuarterWages: 30000 });
    expect(r.headline).toBe("$450");
    expect(r.notes.some((n) => n.includes("limited to"))).toBe(true);
  });

  it("California: applies the $40 floor for very low wages", () => {
    const r = calcUnemployment({ stateCode: "CA", highestQuarterWages: 520 });
    expect(r.headline).toBe("$40");
  });

  it("Texas: divisor 25, cap $605", () => {
    expect(calcUnemployment({ stateCode: "TX", highestQuarterWages: 15000 }).headline).toBe("$600");
    expect(calcUnemployment({ stateCode: "TX", highestQuarterWages: 25000 }).headline).toBe("$605");
  });

  it("Florida: 12-week duration drives the potential total", () => {
    const r = calcUnemployment({ stateCode: "FL", highestQuarterWages: 10000 });
    expect(r.headline).toBe("$275"); // capped
    expect(r.breakdown.find((b) => b.label === "Maximum potential total")?.value).toBe("$3,300");
  });

  it("New York: no floor applied, caps at $869", () => {
    expect(calcUnemployment({ stateCode: "NY", highestQuarterWages: 2600 }).headline).toBe("$100");
    expect(calcUnemployment({ stateCode: "NY", highestQuarterWages: 40000 }).headline).toBe("$869");
  });

  it("always surfaces the estimate + coverage caveats", () => {
    const r = calcUnemployment({ stateCode: "CA", highestQuarterWages: 8000 });
    expect(r.notes.some((n) => n.toLowerCase().includes("simplified estimate"))).toBe(true);
    expect(r.notes.some((n) => n.toLowerCase().includes("curated set"))).toBe(true);
  });

  it("returns invalid for unknown state or zero wages", () => {
    expect(calcUnemployment({ stateCode: "ZZ", highestQuarterWages: 10000 }).valid).toBe(false);
    expect(calcUnemployment({ stateCode: "CA", highestQuarterWages: 0 }).valid).toBe(false);
  });

  it("state table is internally consistent (data integrity)", () => {
    for (const s of UNEMPLOYMENT_STATES) {
      expect(s.code).toHaveLength(2);
      expect(s.divisor).toBeGreaterThan(0);
      expect(s.maxWeeks).toBeGreaterThan(0);
      expect(s.maxWBA).toBeGreaterThan(s.minWBA);
      expect(s.effective.length).toBeGreaterThan(5);
    }
  });
});
