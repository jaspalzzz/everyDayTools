import { describe, expect, it } from "vitest";
import { UNEMPLOYMENT_STATES, calcUnemployment } from "@/lib/calculators/unemployment";

describe("US unemployment benefit estimate", () => {
  it("California: wages ÷ 26 within the band", () => {
    // 5,200 ÷ 26 = $200 (between $40 and $450)
    const r = calcUnemployment({ stateCode: "CA", highestQuarterWages: 5200 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("$200");
  });

  it("California: caps at the $450 maximum (CA EDD statutory cap)", () => {
    const r = calcUnemployment({ stateCode: "CA", highestQuarterWages: 80000 });
    expect(r.headline).toBe("$450");
    expect(r.notes.some((n: string) => n.includes("limited to"))).toBe(true);
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

  it("New York: applies the DOL floor and caps at $869", () => {
    expect(calcUnemployment({ stateCode: "NY", highestQuarterWages: 2600 }).headline).toBe("$140");
    expect(calcUnemployment({ stateCode: "NY", highestQuarterWages: 40000 }).headline).toBe("$869");
  });

  it("Massachusetts: divisor 0 returns the capped state maximum estimate", () => {
    const r = calcUnemployment({ stateCode: "MA", highestQuarterWages: 1000 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("$1,105");
    expect(r.breakdown.find((b) => b.label === "Formula")?.value).toBe("State maximum estimate");
    expect(r.notes.some((n) => n.includes("consult your state agency"))).toBe(true);
  });

  it("always surfaces the estimate + coverage caveats", () => {
    const r = calcUnemployment({ stateCode: "CA", highestQuarterWages: 8000 });
    expect(r.notes.some((n) => n.toLowerCase().includes("simplified estimate"))).toBe(true);
    expect(r.notes.some((n) => n.toLowerCase().includes("do not include extensions"))).toBe(true);
  });

  it("returns invalid for unknown state or zero wages", () => {
    expect(calcUnemployment({ stateCode: "ZZ", highestQuarterWages: 10000 }).valid).toBe(false);
    expect(calcUnemployment({ stateCode: "CA", highestQuarterWages: 0 }).valid).toBe(false);
  });

  it("state table is internally consistent (data integrity)", () => {
    expect(UNEMPLOYMENT_STATES).toHaveLength(51);
    expect(UNEMPLOYMENT_STATES.map((s) => s.name)).toEqual(
      [...UNEMPLOYMENT_STATES].map((s) => s.name).sort((a, b) => a.localeCompare(b)),
    );

    for (const s of UNEMPLOYMENT_STATES) {
      expect(s.code).toHaveLength(2);
      expect(s.divisor).toBeGreaterThanOrEqual(0);
      expect(s.maxWeeks).toBeGreaterThan(0);
      expect(s.maxWBA).toBeGreaterThan(s.minWBA);
      expect(s.effective.length).toBeGreaterThan(5);
      if (s.divisor === 0) {
        expect(s.note).toContain("consult your state agency");
      }
    }
  });
});
