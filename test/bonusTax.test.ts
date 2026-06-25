import { describe, expect, it } from "vitest";
import { calcBonusTax } from "@/lib/calculators/bonusTax";

describe("bonus take-home", () => {
  it("applies the US 22% supplemental rate", () => {
    // 5000 − 22% = 3900
    const r = calcBonusTax({ country: "US", bonusAmount: 5000, deductionRate: 22 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("$3,900");
    expect(r.breakdown.find((b) => b.label === "Tax withheld")?.value).toBe("$1,100");
  });

  it("a 0% rate returns the full bonus", () => {
    const r = calcBonusTax({ country: "US", bonusAmount: 5000, deductionRate: 0 });
    expect(r.headline).toBe("$5,000");
  });

  it("clamps the deduction rate at 100%", () => {
    const r = calcBonusTax({ country: "US", bonusAmount: 5000, deductionRate: 150 });
    expect(r.headline).toBe("$0");
    expect(r.breakdown.find((b) => b.label === "Deduction rate")?.value).toBe("100%");
  });

  it("reflects the selected currency", () => {
    expect(calcBonusTax({ country: "UK", bonusAmount: 4000, deductionRate: 40 }).headline.startsWith("£")).toBe(true);
  });

  it("returns invalid for a zero bonus", () => {
    expect(calcBonusTax({ country: "US", bonusAmount: 0, deductionRate: 22 }).valid).toBe(false);
  });
});
