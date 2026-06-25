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

  // Guard against pathological ranges (e.g. year 9999) freezing the loop.
  const approxDays = (end.getTime() - start.getTime()) / 86_400_000;
  if (approxDays > 366 * 150) {
    return {
      headline: "—",
      headlineCaption: "Date range is too large",
      breakdown: [],
      notes: ["Please choose a date range shorter than 150 years."],
      valid: false,
    };
  }

  // Iterate by calendar date (DST-safe): advancing with setDate keeps local
  // midnight regardless of daylight-saving changes, so getDay() stays correct.
  let workingDays = 0;
  let totalDays = 0;
  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const lastDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  while (cursor <= lastDay) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) workingDays++;
    totalDays++;
    cursor.setDate(cursor.getDate() + 1);
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
