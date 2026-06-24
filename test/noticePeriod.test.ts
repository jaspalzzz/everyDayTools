import { describe, expect, it } from "vitest";
import { calcNoticePeriod } from "@/lib/calculators/noticePeriod";

describe("notice period", () => {
  it("UK: 1 week per complete year between 2 and 12 years", () => {
    const r = calcNoticePeriod({ region: "UK", completedYears: 4, contractualWeeks: 0 });
    expect(r.headline).toBe("4 weeks");
  });

  it("UK: caps statutory notice at 12 weeks", () => {
    const r = calcNoticePeriod({ region: "UK", completedYears: 25, contractualWeeks: 0 });
    expect(r.headline).toBe("12 weeks");
  });

  it("UK: minimum 1 week once past one month, under 2 years", () => {
    const r = calcNoticePeriod({ region: "UK", completedYears: 1, contractualWeeks: 0 });
    expect(r.headline).toBe("1 week");
  });

  it("uses contractual notice when it exceeds statutory", () => {
    const r = calcNoticePeriod({ region: "UK", completedYears: 3, contractualWeeks: 8 });
    expect(r.headline).toBe("8 weeks");
    expect(r.notes.some((n) => n.toLowerCase().includes("contract"))).toBe(true);
  });

  it("never drops below statutory even if contract is lower", () => {
    const r = calcNoticePeriod({ region: "UK", completedYears: 10, contractualWeeks: 2 });
    expect(r.headline).toBe("10 weeks");
  });

  it("CA: caps at 8 weeks (Ontario baseline)", () => {
    const r = calcNoticePeriod({ region: "CA", completedYears: 20, contractualWeeks: 0 });
    expect(r.headline).toBe("8 weeks");
  });

  it("returns invalid for brand-new employment", () => {
    const r = calcNoticePeriod({ region: "UK", completedYears: 0, contractualWeeks: 0 });
    expect(r.valid).toBe(false);
  });
});
