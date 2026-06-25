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

  it("always surfaces the coverage caveat (no silent caps)", () => {
    const r = calcFinalPaycheck({ stateCode: "NY", separationType: "quit" });
    expect(r.notes.some((n) => n.toLowerCase().includes("curated set"))).toBe(true);
  });

  it("returns invalid for an unknown state", () => {
    expect(calcFinalPaycheck({ stateCode: "ZZ", separationType: "fired" }).valid).toBe(false);
  });

  it("every state has a non-empty rule for both separation types (data integrity)", () => {
    for (const s of STATE_FINAL_PAY) {
      expect(s.code).toHaveLength(2);
      expect(s.fired.deadline.length).toBeGreaterThan(3);
      expect(s.quit.deadline.length).toBeGreaterThan(3);
      expect(s.fired.note.length).toBeGreaterThan(10);
      expect(s.quit.note.length).toBeGreaterThan(10);
    }
  });
});
