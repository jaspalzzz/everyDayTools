import { describe, expect, it } from "vitest";
import { calcSalaryToHourly } from "@/lib/calculators/salaryToHourly";

describe("salary to hourly", () => {
  it("US: £50k over 2,080 hours ≈ $24.04/hr", () => {
    const r = calcSalaryToHourly({
      country: "US",
      annualSalary: 50000,
      hoursPerWeek: 40,
      weeksPerYear: 52,
    });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("$24.04");
  });

  it("reflects the currency of the selected country", () => {
    const uk = calcSalaryToHourly({ country: "UK", annualSalary: 52000, hoursPerWeek: 40, weeksPerYear: 52 });
    expect(uk.headline.startsWith("£")).toBe(true);
  });

  it("fewer weeks raises the hourly rate", () => {
    const full = calcSalaryToHourly({ country: "US", annualSalary: 50000, hoursPerWeek: 40, weeksPerYear: 52 });
    const partYear = calcSalaryToHourly({ country: "US", annualSalary: 50000, hoursPerWeek: 40, weeksPerYear: 48 });
    expect(parseFloat(partYear.headline.slice(1))).toBeGreaterThan(parseFloat(full.headline.slice(1)));
  });

  it("exposes weekly and monthly gross in the breakdown", () => {
    const r = calcSalaryToHourly({ country: "US", annualSalary: 60000, hoursPerWeek: 40, weeksPerYear: 52 });
    expect(r.breakdown.find((b) => b.label === "Monthly (gross)")?.value).toBe("$5,000");
  });

  it("returns invalid when any input is zero", () => {
    expect(calcSalaryToHourly({ country: "US", annualSalary: 0, hoursPerWeek: 40, weeksPerYear: 52 }).valid).toBe(false);
    expect(calcSalaryToHourly({ country: "US", annualSalary: 50000, hoursPerWeek: 0, weeksPerYear: 52 }).valid).toBe(false);
  });
});
