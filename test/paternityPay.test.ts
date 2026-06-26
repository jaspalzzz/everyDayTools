import { describe, expect, it } from "vitest";
import { calcPaternityPay } from "@/lib/calculators/paternityPay";

describe("Statutory Paternity Pay", () => {
  it("pays one or two weeks at the lower statutory rate", () => {
    expect(calcPaternityPay({ averageWeeklyEarnings: 600, weeks: 1 }).headline).toBe("£194");
    expect(calcPaternityPay({ averageWeeklyEarnings: 600, weeks: 2 }).headline).toBe("£389");
  });

  it("uses 90% of earnings when lower than the statutory weekly rate", () => {
    const r = calcPaternityPay({ averageWeeklyEarnings: 150, weeks: 2 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£270");
    expect(r.breakdown.find((b) => b.label === "Weekly SPP rate")?.value).toBe("£135.00/wk");
  });

  it("returns invalid below the Lower Earnings Limit", () => {
    const r = calcPaternityPay({ averageWeeklyEarnings: 100, weeks: 2 });
    expect(r.valid).toBe(false);
    expect(r.headline).toBe("Not eligible");
  });
});
