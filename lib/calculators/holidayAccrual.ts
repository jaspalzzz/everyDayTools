import { pluralUnit, safeNumber } from "../format";
import { UK_HOLIDAY } from "../rates";
import type { CalcResult, SourceRef } from "../types";

export const HOLIDAY_SOURCE: SourceRef = UK_HOLIDAY.source;
export const HOLIDAY_CONSTANTS = UK_HOLIDAY;

export interface HolidayInput {
  daysPerWeek: number;
  monthsWorked: number;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function calcHolidayAccrual(input: HolidayInput): CalcResult {
  const daysPerWeek = Math.min(safeNumber(input.daysPerWeek), 7);
  const monthsWorked = Math.min(safeNumber(input.monthsWorked, 12), 12);
  const C = UK_HOLIDAY;

  if (daysPerWeek <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter the days you work each week",
      breakdown: [],
      notes: ["Enter how many days a week you normally work to see your statutory holiday entitlement."],
      valid: false,
    };
  }

  const uncapped = daysPerWeek * C.statutoryWeeks;
  const annual = round1(Math.min(uncapped, C.maxStatutoryDays));
  const accrued = round1(annual * (monthsWorked / 12));
  const capped = uncapped > C.maxStatutoryDays;

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
      { label: "Statutory multiplier", value: `${C.statutoryWeeks} weeks` },
      { label: "Full-year entitlement", value: pluralUnit(annual, "day"), emphasis: true },
      { label: `Accrued after ${pluralUnit(monthsWorked, "month")}`, value: pluralUnit(accrued, "day") },
    ],
    notes,
    valid: true,
  };
}
