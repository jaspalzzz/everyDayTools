import { describe, expect, it } from "vitest";
import { STATE_FINAL_PAY, calcFinalPaycheck } from "@/lib/calculators/finalPaycheck";

describe("US final paycheck deadline", () => {
  it("California: fired = last day, quit = within 72 hours", () => {
    expect(calcFinalPaycheck({ stateCode: "CA", separationType: "fired" }).headline).toBe("On your last day");
    expect(calcFinalPaycheck({ stateCode: "CA", separationType: "quit" }).headline).toBe("Within 72 hours");
  });

  it("Texas: faster deadline when fired than when quitting", () => {
    expect(calcFinalPaycheck({ stateCode: "TX", separationType: "fired" }).headline).toBe("Within 6 days");
    expect(calcFinalPaycheck({ stateCode: "TX", separationType: "quit" }).headline).toBe("Next regular payday");
  });

  it("flags no-law states and explains the pay-schedule default", () => {
    const r = calcFinalPaycheck({ stateCode: "FL", separationType: "fired" });
    expect(r.valid).toBe(true);
    expect(r.notes.some((n) => n.includes("no specific final-paycheck statute"))).toBe(true);
  });

  it("always tells the user to confirm with their state labor office", () => {
    const r = calcFinalPaycheck({ stateCode: "NY", separationType: "quit" });
    expect(r.notes.some((n) => n.toLowerCase().includes("state labor office"))).toBe(true);
  });

  it("surfaces the demand-triggered caveat for Minnesota", () => {
    const r = calcFinalPaycheck({ stateCode: "MN", separationType: "fired" });
    expect(r.headline).toBe("Within 24 hours");
    expect(r.notes.some((n) => n.toLowerCase().includes("written demand"))).toBe(true);
  });

  it("returns invalid for an unknown state", () => {
    expect(calcFinalPaycheck({ stateCode: "ZZ", separationType: "fired" }).valid).toBe(false);
  });

  // Anchor states: the immediate / same-day final-pay jurisdictions when an employee
  // is fired. These are the highest-stakes rows (wrong info exposes users to missed
  // penalty windows), so lock them against accidental edits.
  it("locks the same-day-when-fired states", () => {
    for (const code of ["CA", "CO", "MA", "MT"]) {
      expect(calcFinalPaycheck({ stateCode: code, separationType: "fired" }).headline).toBe(
        "On your last day",
      );
    }
  });

  it("locks California's 72-hour quit deadline and Texas's 6-day fired deadline", () => {
    expect(calcFinalPaycheck({ stateCode: "CA", separationType: "quit" }).headline).toBe("Within 72 hours");
    expect(calcFinalPaycheck({ stateCode: "TX", separationType: "fired" }).headline).toBe("Within 6 days");
  });

  it("covers all 50 states plus DC with non-empty rules (data integrity)", () => {
    expect(STATE_FINAL_PAY).toHaveLength(51);
    const codes = new Set(STATE_FINAL_PAY.map((s) => s.code));
    expect(codes.size).toBe(51); // no duplicates
    for (const s of STATE_FINAL_PAY) {
      expect(s.code).toHaveLength(2);
      expect(s.fired.length).toBeGreaterThan(3);
      expect(s.quit.length).toBeGreaterThan(3);
      expect(s.name.length).toBeGreaterThan(3);
    }
  });
});
