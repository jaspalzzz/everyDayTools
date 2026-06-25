import { describe, expect, it } from "vitest";
import { calcHolidayAccrual } from "@/lib/calculators/holidayAccrual";

describe("UK holiday entitlement", () => {
  it("5 days a week = 28 days statutory", () => {
    const r = calcHolidayAccrual({ daysPerWeek: 5, monthsWorked: 12 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("28 days");
  });

  it("4 days a week = 22.4 days", () => {
    const r = calcHolidayAccrual({ daysPerWeek: 4, monthsWorked: 12 });
    expect(r.headline).toBe("22.4 days");
  });

  it("caps at 28 days for 6+ days a week, with a note", () => {
    const r = calcHolidayAccrual({ daysPerWeek: 6, monthsWorked: 12 });
    expect(r.headline).toBe("28 days");
    expect(r.notes.some((n) => n.includes("capped at 28"))).toBe(true);
  });

  it("accrues pro-rata within the leave year", () => {
    const r = calcHolidayAccrual({ daysPerWeek: 5, monthsWorked: 6 });
    // 28 × 6/12 = 14 days
    expect(r.breakdown.find((b) => b.label.includes("Accrued"))?.value).toBe("14 days");
  });

  it("returns invalid for zero days per week", () => {
    expect(calcHolidayAccrual({ daysPerWeek: 0, monthsWorked: 12 }).valid).toBe(false);
  });

  it("clamps days per week to 7 and months to 12", () => {
    const r = calcHolidayAccrual({ daysPerWeek: 10, monthsWorked: 20 });
    // 7 days × 5.6 = 39.2 capped to 28; months clamped to 12 => fully accrued
    expect(r.headline).toBe("28 days");
    expect(r.breakdown.find((b) => b.label.includes("Accrued"))?.value).toBe("28 days");
  });
});
