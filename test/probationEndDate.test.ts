import { describe, expect, it } from "vitest";
import { calcProbationEndDate } from "@/lib/calculators/probationEndDate";

describe("probation end date", () => {
  it("adds calendar months to the start date", () => {
    const result = calcProbationEndDate({ startDate: "2026-07-13", duration: 6, unit: "months" });
    expect(result.valid).toBe(true);
    expect(result.headline).toBe("13 January 2027");
    expect(result.breakdown.find((line) => line.label === "Last full day before anniversary")?.value).toBe("12 January 2027");
  });

  it("clamps a month-end start to the final valid target day", () => {
    const result = calcProbationEndDate({ startDate: "2026-01-31", duration: 1, unit: "months" });
    expect(result.headline).toBe("28 February 2026");
  });

  it("handles leap-year month ends", () => {
    const result = calcProbationEndDate({ startDate: "2024-01-31", duration: 1, unit: "months" });
    expect(result.headline).toBe("29 February 2024");
  });

  it("adds exact seven-day weeks", () => {
    const result = calcProbationEndDate({ startDate: "2026-07-13", duration: 4, unit: "weeks" });
    expect(result.headline).toBe("10 August 2026");
  });

  it("rejects zero and excessive durations", () => {
    expect(calcProbationEndDate({ startDate: "2026-07-13", duration: 0, unit: "months" }).valid).toBe(false);
    expect(calcProbationEndDate({ startDate: "2026-07-13", duration: 61, unit: "weeks" }).valid).toBe(false);
  });
});
