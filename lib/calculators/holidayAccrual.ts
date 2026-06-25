import { pluralUnit, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

/**
 * UK statutory annual leave entitlement. Source: Working Time Regulations 1998 —
 * 5.6 weeks per year, capped at 28 days for those working 5+ days a week.
 */
export const HOLIDAY_SOURCE: SourceRef = {
  label: "GOV.UK — Holiday entitlement",
  url: "https://www.gov.uk/holiday-entitlement-rights",
};

export const HOLIDAY_CONSTANTS = {
  statutoryWeeks: 5.6,
  maxStatutoryDays: 28,
} as const;

export interface HolidayInput {
  /** Days normally worked per week (1–7). */
  daysPerWeek: number;
  /** Months into the current leave year worked so far (0–12), for accrual. */
  monthsWorked: number;
}

/** Round to one decimal place (entitlement is commonly quoted to 0.5 of a day). */
function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function calcHolidayAccrual(input: HolidayInput): CalcResult {
  const daysPerWeek = Math.min(safeNumber(input.daysPerWeek), 7);
  const monthsWorked = Math.min(safeNumber(input.monthsWorked, 12), 12);

  if (daysPerWeek <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter the days you work each week",
      breakdown: [],
      notes: ["Enter how many days a week you normally work to see your statutory holiday entitlement."],
      valid: false,
    };
  }

  const uncapped = daysPerWeek * HOLIDAY_CONSTANTS.statutoryWeeks;
  const annual = round1(Math.min(uncapped, HOLIDAY_CONSTANTS.maxStatutoryDays));
  const accrued = round1(annual * (monthsWorked / 12));
  const capped = uncapped > HOLIDAY_CONSTANTS.maxStatutoryDays;

  const notes: string[] = [];
  if (capped) {
    notes.push(
      "The statutory minimum is capped at 28 days a year, so working more than 5 days a week does not increase it.",
    );
  }
  notes.push("Your contract may give more than the statutory minimum, but it cannot give less.");

  return {
    headline: pluralUnit(annual, "day"),
    headlineCaption: "Your statutory annual leave entitlement",
    breakdown: [
      { label: "Days worked per week", value: pluralUnit(daysPerWeek, "day") },
      { label: "Statutory multiplier", value: `${HOLIDAY_CONSTANTS.statutoryWeeks} weeks` },
      { label: "Full-year entitlement", value: pluralUnit(annual, "day"), emphasis: true },
      { label: `Accrued after ${pluralUnit(monthsWorked, "month")}`, value: pluralUnit(accrued, "day") },
    ],
    notes,
    valid: true,
  };
}
