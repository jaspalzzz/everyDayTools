import { safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

/**
 * Counts working days (Mon–Fri) between two dates, inclusive. Public/bank
 * holidays are NOT excluded (they vary by country) — the result notes this.
 */
export const WORKING_DAYS_SOURCE: SourceRef = {
  label: "GOV.UK — UK bank holidays",
  url: "https://www.gov.uk/bank-holidays",
};

export interface WorkingDaysInput {
  /** ISO date strings, "YYYY-MM-DD". */
  startDate: string;
  endDate: string;
}

/** Parse "YYYY-MM-DD" into a local Date at midnight, or null if invalid. */
function parseISO(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? "");
  if (!m) return null;
  const [y, mo, d] = [safeNumber(Number(m[1])), safeNumber(Number(m[2])), safeNumber(Number(m[3]))];
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  return date;
}

export function calcWorkingDays(input: WorkingDaysInput): CalcResult {
  const start = parseISO(input.startDate);
  const end = parseISO(input.endDate);

  if (!start || !end) {
    return {
      headline: "—",
      headlineCaption: "Enter a start and end date",
      breakdown: [],
      notes: ["Pick a start date and an end date to count the working days between them."],
      valid: false,
    };
  }

  if (end < start) {
    return {
      headline: "—",
      headlineCaption: "End date is before the start date",
      breakdown: [],
      notes: ["The end date must be on or after the start date."],
      valid: false,
    };
  }

  const MS_PER_DAY = 86_400_000;
  const totalDays = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY) + 1; // inclusive
  let workingDays = 0;
  for (let i = 0; i < totalDays; i++) {
    const day = new Date(start.getTime() + i * MS_PER_DAY).getDay();
    if (day !== 0 && day !== 6) workingDays++;
  }
  const weekendDays = totalDays - workingDays;

  return {
    headline: `${workingDays} working day${workingDays === 1 ? "" : "s"}`,
    headlineCaption: "Working days (Mon–Fri), inclusive",
    breakdown: [
      { label: "Start date", value: input.startDate },
      { label: "End date", value: input.endDate },
      { label: "Total days", value: `${totalDays}` },
      { label: "Weekend days", value: `${weekendDays}` },
      { label: "Working days", value: `${workingDays}`, emphasis: true },
    ],
    notes: [
      "Counts Monday–Friday and includes both the start and end dates.",
      "Public and bank holidays are not excluded — they vary by country, so subtract any that fall in this range.",
    ],
    valid: true,
  };
}
