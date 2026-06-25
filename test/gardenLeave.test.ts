import { describe, expect, it } from "vitest";
import { calcGardenLeave } from "@/lib/calculators/gardenLeave";

describe("garden leave pay", () => {
  it("totals weekly pay across the weeks", () => {
    // £1,000 × 8 = £8,000
    const r = calcGardenLeave({ country: "UK", weeklyPay: 1000, weeks: 8 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£8,000");
  });

  it("shows the monthly equivalent", () => {
    // 1000 × 52 / 12 = 4333.33 → £4,333
    const r = calcGardenLeave({ country: "UK", weeklyPay: 1000, weeks: 8 });
    expect(r.breakdown.find((b) => b.label === "Monthly equivalent")?.value).toBe("£4,333");
  });

  it("singular week label", () => {
    const r = calcGardenLeave({ country: "UK", weeklyPay: 1000, weeks: 1 });
    expect(r.breakdown.find((b) => b.label === "Garden leave")?.value).toBe("1 week");
  });

  it("reflects the selected currency", () => {
    expect(calcGardenLeave({ country: "US", weeklyPay: 1000, weeks: 4 }).headline.startsWith("$")).toBe(true);
  });

  it("returns invalid with no pay or weeks", () => {
    expect(calcGardenLeave({ country: "UK", weeklyPay: 0, weeks: 8 }).valid).toBe(false);
    expect(calcGardenLeave({ country: "UK", weeklyPay: 1000, weeks: 0 }).valid).toBe(false);
  });
});
