import { describe, expect, it } from "vitest";
import { calcSharedParentalPay } from "@/lib/calculators/sharedParentalPay";

describe("Statutory Shared Parental Pay", () => {
  it("pays up to 37 weeks at the lower statutory rate", () => {
    const r = calcSharedParentalPay({ averageWeeklyEarnings: 600, shppWeeks: 37 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£7,190");
  });

  it("uses 90% of earnings when lower than the statutory weekly rate", () => {
    const r = calcSharedParentalPay({ averageWeeklyEarnings: 150, shppWeeks: 10 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£1,350");
    expect(r.breakdown.find((b) => b.label === "Weekly ShPP rate")?.value).toBe("£135.00/wk");
  });

  it("returns invalid for ineligible earnings or weeks outside the payable range", () => {
    expect(calcSharedParentalPay({ averageWeeklyEarnings: 100, shppWeeks: 10 }).valid).toBe(false);
    expect(calcSharedParentalPay({ averageWeeklyEarnings: 600, shppWeeks: 38 }).valid).toBe(false);
  });
});
