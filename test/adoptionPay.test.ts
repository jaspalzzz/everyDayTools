import { describe, expect, it } from "vitest";
import { calcAdoptionPay } from "@/lib/calculators/adoptionPay";

describe("Statutory Adoption Pay", () => {
  it("mirrors SMP: 6 weeks at 90%, then 33 weeks at the lower statutory rate", () => {
    const r = calcAdoptionPay({ averageWeeklyEarnings: 600 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£9,653");
  });

  it("uses 90% of earnings throughout when it is below the statutory weekly rate", () => {
    const r = calcAdoptionPay({ averageWeeklyEarnings: 150 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£5,265");
    expect(r.breakdown.find((b) => b.label === "Next 33 weeks")?.value).toBe("£135.00/wk");
  });

  it("returns invalid below the Lower Earnings Limit", () => {
    const r = calcAdoptionPay({ averageWeeklyEarnings: 100 });
    expect(r.valid).toBe(false);
    expect(r.headline).toBe("Not eligible");
  });
});
