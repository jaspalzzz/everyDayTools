import { describe, expect, it } from "vitest";
import { calcWorkingDays } from "@/lib/calculators/workingDays";

describe("working days between dates", () => {
  it("counts Mon–Fri inclusively (2024-01-01 Mon → 2024-01-07 Sun = 5)", () => {
    const r = calcWorkingDays({ startDate: "2024-01-01", endDate: "2024-01-07" });
    expect(r.valid).toBe(true);
    expect(r.headline).toBe("5 working days");
    expect(r.breakdown.find((b) => b.label === "Total days")?.value).toBe("7");
    expect(r.breakdown.find((b) => b.label === "Weekend days")?.value).toBe("2");
  });

  it("a single weekday counts as one working day", () => {
    expect(calcWorkingDays({ startDate: "2024-01-01", endDate: "2024-01-01" }).headline).toBe("1 working day");
  });

  it("a single weekend day counts as zero", () => {
    // 2024-01-06 is a Saturday
    expect(calcWorkingDays({ startDate: "2024-01-06", endDate: "2024-01-06" }).headline).toBe("0 working days");
  });

  it("rejects an end date before the start date", () => {
    expect(calcWorkingDays({ startDate: "2024-01-10", endDate: "2024-01-01" }).valid).toBe(false);
  });

  it("rejects malformed or empty dates", () => {
    expect(calcWorkingDays({ startDate: "", endDate: "2024-01-01" }).valid).toBe(false);
    expect(calcWorkingDays({ startDate: "2024-13-40", endDate: "2024-01-01" }).valid).toBe(false);
  });

  it("counts correctly across a DST transition (US spring-forward 2024-03-10)", () => {
    // Fri 03-08, Sat, Sun(03-10 DST), Mon, Tue 03-12 → weekdays: Fri, Mon, Tue = 3
    const r = calcWorkingDays({ startDate: "2024-03-08", endDate: "2024-03-12" });
    expect(r.headline).toBe("3 working days");
    expect(r.breakdown.find((b) => b.label === "Total days")?.value).toBe("5");
  });

  it("counts a full leap year correctly (2024 = 262 weekdays)", () => {
    const r = calcWorkingDays({ startDate: "2024-01-01", endDate: "2024-12-31" });
    expect(r.breakdown.find((b) => b.label === "Total days")?.value).toBe("366");
    expect(r.headline).toBe("262 working days");
  });

  it("rejects an absurdly large range instead of hanging", () => {
    expect(calcWorkingDays({ startDate: "1000-01-01", endDate: "9999-12-31" }).valid).toBe(false);
  });
});
