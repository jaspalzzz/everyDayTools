import { describe, expect, it } from "vitest";
import { calcPayRise } from "@/lib/calculators/payRise";

describe("pay rise", () => {
  it("applies a percentage rise to the salary", () => {
    // $50,000 + 5% = $52,500
    const r = calcPayRise({ country: "US", currentSalary: 50000, percentIncrease: 5 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("$52,500");
  });

  it("computes the annual and monthly increase", () => {
    const r = calcPayRise({ country: "UK", currentSalary: 40000, percentIncrease: 5 });
    expect(r.breakdown.find((b) => b.label === "Increase per year")?.value).toBe("£2,000");
    expect(r.breakdown.find((b) => b.label === "Extra per month (gross)")?.value).toBe("£166.67");
  });

  it("handles a 0% rise (salary unchanged)", () => {
    const r = calcPayRise({ country: "US", currentSalary: 60000, percentIncrease: 0 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("$60,000");
  });

  it("reflects the selected country's currency", () => {
    expect(calcPayRise({ country: "AU", currentSalary: 50000, percentIncrease: 10 }).headline.startsWith("$")).toBe(true);
    expect(calcPayRise({ country: "UK", currentSalary: 50000, percentIncrease: 10 }).headline.startsWith("£")).toBe(true);
  });

  it("returns invalid with no current salary", () => {
    expect(calcPayRise({ country: "US", currentSalary: 0, percentIncrease: 5 }).valid).toBe(false);
  });
});
