import { formatCurrency, pluralUnit, safeNumber } from "../format";
import type { CalcResult, CountryCode, SourceRef } from "../types";

/**
 * Severance estimator. Outside Canada, severance is rarely statutory in the
 * private sector — it is driven by policy/contract. We model a transparent
 * "weeks per year" estimate, with Canada anchored to ESA termination pay.
 */
export const SEVERANCE_SOURCE: SourceRef = {
  label: "Canada — Employment Standards (termination & severance pay)",
  url: "https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards.html",
};

export type SeveranceCountry = Extract<CountryCode, "US" | "UK" | "CA">;

export interface SeveranceInput {
  country: SeveranceCountry;
  yearsOfService: number;
  weeklyPay: number;
  /** Weeks of severance offered per year of service (typical: 1–2). */
  weeksPerYear: number;
}

/** Canada (federal) statutory minimum: 2 days' pay per year, min 5 days, after 12 months. */
function caStatutoryWeeks(years: number): number {
  if (years < 1) return 0;
  const days = Math.max(years * 2, 5);
  return days / 5; // convert working days to weeks
}

export function calcSeverance(input: SeveranceInput): CalcResult {
  const years = safeNumber(input.yearsOfService);
  const weekly = safeNumber(input.weeklyPay);
  const perYear = safeNumber(input.weeksPerYear, 1);

  if (years <= 0 || weekly <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your service and weekly pay",
      breakdown: [],
      notes: ["Enter your years of service and gross weekly pay to estimate severance."],
      valid: false,
    };
  }

  const policyWeeks = years * perYear;
  const statutoryWeeks = input.country === "CA" ? caStatutoryWeeks(years) : 0;
  const weeks = Math.max(policyWeeks, statutoryWeeks);
  const total = weeks * weekly;

  const notes: string[] = [];
  if (input.country === "CA") {
    notes.push(
      "The Canadian statutory minimum shown is the federal rule (Canada Labour Code Part III), which only applies to federally-regulated employers — banking, telecoms, airlines, railways, and interprovincial transport. Most Canadian employees are covered by their province's employment standards instead, which set different (often higher) minimums. Check your province's rules before relying on this figure.",
    );
  }
  if (input.country === "CA" && statutoryWeeks > policyWeeks) {
    notes.push(
      "Your estimate uses the Canadian statutory minimum because it exceeds the policy figure you entered.",
    );
  }
  if (input.country !== "CA") {
    notes.push(
      "Severance is not generally required by law in your country — this estimate reflects a typical employer policy, not a legal entitlement.",
    );
  }
  notes.push("Severance pay is normally taxable. This is a gross, pre-tax estimate.");

  return {
    headline: formatCurrency(total, input.country),
    headlineCaption: "Estimated severance pay",
    breakdown: [
      { label: "Years of service", value: pluralUnit(years, "year") },
      { label: "Severance basis", value: `${perYear} week(s) per year` },
      { label: "Total weeks", value: pluralUnit(weeks, "week") },
      { label: "Weekly pay", value: formatCurrency(weekly, input.country) },
      { label: "Estimated severance", value: formatCurrency(total, input.country), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
