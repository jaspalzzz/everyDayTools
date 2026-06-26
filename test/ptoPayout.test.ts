import { describe, expect, it } from "vitest";
import { calcPtoPayout, STATE_PTO } from "@/lib/calculators/ptoPayout";

describe("US PTO payout", () => {
  it("computes gross payout (80 hrs × $30)", () => {
    const r = calcPtoPayout({ stateCode: "CA", unusedHours: 80, hourlyRate: 30 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("$2,400");
  });

  it("flags California as payout-required", () => {
    const r = calcPtoPayout({ stateCode: "CA", unusedHours: 40, hourlyRate: 25 });
    expect(r.breakdown.some((b) => b.value.includes("required"))).toBe(true);
  });

  it("flags a no-requirement state and warns to check policy", () => {
    const r = calcPtoPayout({ stateCode: "GA", unusedHours: 40, hourlyRate: 25 });
    expect(r.notes.some((n) => n.toLowerCase().includes("policy"))).toBe(true);
  });

  it("returns invalid for an unknown state", () => {
    const r = calcPtoPayout({ stateCode: "ZZ", unusedHours: 40, hourlyRate: 25 });
    expect(r.valid).toBe(false);
  });

  it("returns invalid when hours or rate are zero", () => {
    expect(calcPtoPayout({ stateCode: "CA", unusedHours: 0, hourlyRate: 25 }).valid).toBe(false);
    expect(calcPtoPayout({ stateCode: "CA", unusedHours: 40, hourlyRate: 0 }).valid).toBe(false);
  });

  // Anchor states: unambiguous, well-documented statutory positions. These lock the
  // highest-stakes classifications so an accidental edit can't silently flip them.
  // "required" = earned vacation vests as wages and cannot be forfeited at separation.
  it("locks the known payout-required states", () => {
    for (const code of ["CA", "CO", "IL", "MA", "MT", "NE", "ME"]) {
      expect(STATE_PTO.find((s) => s.code === code)?.rule).toBe("required");
    }
  });

  it("locks well-known no-requirement states", () => {
    for (const code of ["TX", "FL", "GA"]) {
      expect(STATE_PTO.find((s) => s.code === code)?.rule).toBe("no-requirement");
    }
  });

  it("covers all 50 states + DC with valid, non-empty policies (data integrity)", () => {
    expect(STATE_PTO).toHaveLength(51);
    expect(new Set(STATE_PTO.map((s) => s.code)).size).toBe(51); // no duplicates
    for (const s of STATE_PTO) {
      expect(s.code).toHaveLength(2);
      expect(s.note.length).toBeGreaterThan(10);
      expect(["required", "conditional", "no-requirement"]).toContain(s.rule);
    }
  });
});
