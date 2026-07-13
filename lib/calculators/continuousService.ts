import type { CalcResult, SourceRef } from "../types";
import {
  addUtcMonths,
  addUtcYears,
  calendarDifference,
  daysBetween,
  formatDisplayDate,
  formatIsoDate,
  parseIsoDate,
} from "./employmentDateMath";

export const CONTINUOUS_SERVICE_SOURCE: SourceRef = {
  label: "Employment Rights Act 1996 — ss.210–219 (continuous employment)",
  url: "https://www.legislation.gov.uk/ukpga/1996/18/part/XIV/chapter/I",
};

export interface ContinuousServiceInput {
  startDate: string;
  endDate: string;
}

export function calcContinuousService(input: ContinuousServiceInput): CalcResult {
  const start = parseIsoDate(input.startDate);
  const end = parseIsoDate(input.endDate);
  if (!start || !end || end < start) {
    return {
      headline: "—",
      headlineCaption: "Enter a valid employment start and end date",
      breakdown: [],
      notes: ["The end date must be the same as or later than the employment start date."],
      valid: false,
    };
  }

  const difference = calendarDifference(start, end);
  const totalDays = daysBetween(start, end);
  const totalWeeks = Math.floor(totalDays / 7);
  const oneMonthDate = addUtcMonths(start, 1);
  const twoYearDate = addUtcYears(start, 2);
  const reachedOneMonth = end >= oneMonthDate;
  const reachedTwoYears = end >= twoYearDate;
  const headlineParts = [
    difference.years ? `${difference.years} year${difference.years === 1 ? "" : "s"}` : null,
    difference.months ? `${difference.months} month${difference.months === 1 ? "" : "s"}` : null,
    !difference.years && !difference.months
      ? `${difference.days} day${difference.days === 1 ? "" : "s"}`
      : null,
  ].filter(Boolean);

  const notes = [
    reachedTwoYears
      ? "The dates reach the common two-year threshold used for statutory redundancy pay and ordinary unfair-dismissal protection, subject to eligibility and the applicable law."
      : `The two-year calendar threshold would be reached on ${formatDisplayDate(twoYearDate)} if continuous employment is preserved.`,
    reachedOneMonth
      ? "The dates also pass the one-month service threshold relevant to the UK statutory minimum notice right."
      : `One calendar month of service would be reached on ${formatDisplayDate(oneMonthDate)}.`,
    "Some absences, temporary cessations, transfers and breaks can preserve or interrupt legal continuity. This tool measures calendar elapsed service; check ERA 1996 ss.210–219 for your circumstances.",
  ];

  return {
    headline: headlineParts.join(", "),
    headlineCaption: "Elapsed calendar service between the dates entered",
    breakdown: [
      { label: "Employment start", value: formatDisplayDate(start) },
      { label: "Service measured to", value: formatDisplayDate(end) },
      { label: "Complete years", value: String(difference.years) },
      { label: "Total elapsed weeks", value: totalWeeks.toLocaleString("en-GB") },
      { label: "One-month threshold", value: reachedOneMonth ? "Reached" : "Not yet reached" },
      { label: "Two-year threshold", value: reachedTwoYears ? "Reached" : "Not yet reached", emphasis: true },
      { label: "Two-year threshold date", value: formatIsoDate(twoYearDate) },
    ],
    notes,
    valid: true,
  };
}
