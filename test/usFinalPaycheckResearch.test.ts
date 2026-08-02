import { describe, expect, it } from "vitest";
import { GET } from "@/app/research/us-final-paycheck-laws.csv/route";
import { US_STATES } from "@/data/usStates";
import {
  buildFinalPaycheckCsv,
  getFinalPaycheckFindings,
  getTerminationDeadlineDistribution,
} from "@/lib/usFinalPaycheckResearch";

describe("US final paycheck research asset", () => {
  it("covers all 50 states and Washington, DC exactly once", () => {
    expect(US_STATES).toHaveLength(51);
    expect(new Set(US_STATES.map((state) => state.code)).size).toBe(51);
    expect(US_STATES.every((state) => state.dolUrl.startsWith("https://"))).toBe(true);
  });

  it("keeps computed findings internally consistent", () => {
    const findings = getFinalPaycheckFindings();
    const distribution = getTerminationDeadlineDistribution();

    expect(findings.jurisdictionCount).toBe(51);
    expect(findings.sameDeadlineCount + findings.differingDeadlineCount).toBe(51);
    expect(distribution.reduce((sum, item) => sum + item.count, 0)).toBe(51);
    expect(findings.rapidTerminationStates).toHaveLength(findings.rapidTerminationCount);
    expect(findings.writtenDemandStates).toHaveLength(findings.writtenDemandCount);
  });

  it("exports a stable, downloadable CSV with one row per jurisdiction", async () => {
    const csv = buildFinalPaycheckCsv();
    const response = GET();

    expect(csv.split("\n").filter(Boolean)).toHaveLength(52);
    expect(csv).toContain("State,Code,Region,Terminated deadline");
    expect(csv).toContain("District of Columbia,DC");
    expect(response.headers.get("content-type")).toBe("text/csv; charset=utf-8");
    expect(response.headers.get("content-disposition")).toContain("us-final-paycheck-laws.csv");
    await expect(response.text()).resolves.toBe(csv);
  });
});
