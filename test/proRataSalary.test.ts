import { describe, expect, it } from "vitest";
import { calcProRata } from "@/lib/calculators/proRataSalary";

describe("pro-rata salary", () => {
  it("scales salary by the hours fraction", () => {
    // 24/40 × £50,000 = £30,000
    const r = calcProRata({ country: "UK", fullTimeSalary: 50000, fullTimeHours: 40, yourHours: 24 });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("£30,000");
  });

  it("shows the fraction and monthly figure", () => {
    const r = calcProRata({ country: "UK", fullTimeSalary: 50000, fullTimeHours: 40, yourHours: 24 });
    expect(r.breakdown.find((b) => b.label === "Pro-rata fraction")?.value).toBe("60%");
    expect(r.breakdown.find((b) => b.label === "Monthly (gross)")?.value).toBe("£2,500");
  });

  it("a different full-time baseline changes the result", () => {
    const at40 = calcProRata({ country: "UK", fullTimeSalary: 50000, fullTimeHours: 40, yourHours: 30 });
    const at35 = calcProRata({ country: "UK", fullTimeSalary: 50000, fullTimeHours: 35, yourHours: 30 });
    expect(parseFloat(at35.headline.replace(/[£,]/g, ""))).toBeGreaterThan(
      parseFloat(at40.headline.replace(/[£,]/g, "")),
    );
  });

  it("returns invalid with missing inputs", () => {
    expect(calcProRata({ country: "UK", fullTimeSalary: 0, fullTimeHours: 40, yourHours: 24 }).valid).toBe(false);
    expect(calcProRata({ country: "UK", fullTimeSalary: 50000, fullTimeHours: 0, yourHours: 24 }).valid).toBe(false);
  });
});
