import { describe, expect, it } from "vitest";
import { calcMaternityPay } from "@/lib/calculators/maternityPay";

describe("UK Statutory Maternity Pay", () => {
  it("higher earner: 6 weeks at 90%, 33 weeks at the capped standard rate", () => {
    // AWE £600 → 90% = £540 (> £187.18 cap). total = 6×540 + 33×187.18 = £9,416.94
    const r = calcMaternityPay({ averageWeeklyEarnings: 600 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£9,417");
  });

  it("lower earner: 90% of pay is used for all 39 weeks when below the cap", () => {
    // AWE £200 → 90% = £180 (< £187.18). total = 39 × £180 = £7,020
    const r = calcMaternityPay({ averageWeeklyEarnings: 200 });
    expect(r.headline).toBe("£7,020");
  });

  it("rejects earnings below the Lower Earnings Limit and points to Maternity Allowance", () => {
    const r = calcMaternityPay({ averageWeeklyEarnings: 100 });
    expect(r.valid).toBe(false);
    expect(r.headline).toBe("Not eligible");
    expect(r.notes.some((n) => n.includes("Maternity Allowance"))).toBe(true);
  });

  it("first-6-weeks rate is always 90% of pay", () => {
    const r = calcMaternityPay({ averageWeeklyEarnings: 500 });
    expect(r.breakdown[0]?.value).toBe("£450.00/wk");
  });

  it("returns invalid for zero earnings", () => {
    expect(calcMaternityPay({ averageWeeklyEarnings: 0 }).valid).toBe(false);
  });
});
