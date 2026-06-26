import { describe, expect, it } from "vitest";
import { calcContractorComparison } from "../lib/calculators/ir35";

describe("calcContractorComparison", () => {
  it("invalid when inputs are zero", () => {
    const r = calcContractorComparison({ country: "UK", contractorGross: 0, employeeSalary: 0 });
    expect(r.valid).toBe(false);
  });

  it("UK: outside IR35 take-home is higher when gross significantly exceeds inside salary", () => {
    const r = calcContractorComparison({
      country: "UK",
      contractorGross: 90_000,
      employeeSalary: 65_000,
      expenses: 5_000,
    });
    expect(r.valid).toBe(true);
    const outsideRow = r.breakdown.find((b) => b.label === "Outside IR35 — take-home");
    const insideRow = r.breakdown.find((b) => b.label === "Inside IR35 — take-home");
    expect(outsideRow).toBeTruthy();
    expect(insideRow).toBeTruthy();
    const outside = parseFloat(outsideRow!.value.replace(/[£,]/g, ""));
    const inside = parseFloat(insideRow!.value.replace(/[£,]/g, ""));
    expect(outside).toBeGreaterThan(inside);
  });

  it("UK: expenses reduce profit and hence reduce outside-IR35 take-home vs same gross without expenses", () => {
    // Expenses reduce profit; with the same gross income, more expenses = less take-home
    const noExpenses = calcContractorComparison({
      country: "UK",
      contractorGross: 80_000,
      employeeSalary: 60_000,
      expenses: 0,
    });
    const withExpenses = calcContractorComparison({
      country: "UK",
      contractorGross: 80_000,
      employeeSalary: 60_000,
      expenses: 8_000,
    });
    const outsideNo = parseFloat(
      noExpenses.breakdown.find((b) => b.label === "Outside IR35 — take-home")!.value.replace(/[£,]/g, ""),
    );
    const outsideWith = parseFloat(
      withExpenses.breakdown.find((b) => b.label === "Outside IR35 — take-home")!.value.replace(/[£,]/g, ""),
    );
    // £8k expenses reduces profit by £8k, so take-home should be less
    expect(outsideWith).toBeLessThan(outsideNo);
    // but the reduction in take-home should be less than the expenses (tax savings offset some cost)
    expect(outsideNo - outsideWith).toBeLessThan(8_000);
  });

  it("US: 1099 take-home is meaningful when income significantly exceeds W-2 salary", () => {
    const r = calcContractorComparison({
      country: "US",
      contractorGross: 120_000,
      employeeSalary: 90_000,
      expenses: 10_000,
    });
    expect(r.valid).toBe(true);
    const row1099 = r.breakdown.find((b) => b.label === "1099 — take-home");
    expect(row1099).toBeTruthy();
    const takeHome = parseFloat(row1099!.value.replace(/[$,]/g, ""));
    expect(takeHome).toBeGreaterThan(0);
    expect(takeHome).toBeLessThan(120_000);
  });

  it("US: SE tax row is present in breakdown", () => {
    const r = calcContractorComparison({
      country: "US",
      contractorGross: 100_000,
      employeeSalary: 80_000,
    });
    expect(r.breakdown.some((b) => b.label === "1099 — SE tax")).toBe(true);
  });

  it("difference row is present", () => {
    const r = calcContractorComparison({
      country: "UK",
      contractorGross: 75_000,
      employeeSalary: 55_000,
    });
    expect(r.breakdown.some((b) => b.label === "Difference")).toBe(true);
  });
});
