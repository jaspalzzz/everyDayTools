import type { CalcResult, SourceRef } from "../types";
import {
  addUtcDays,
  addUtcMonths,
  daysBetween,
  formatDisplayDate,
  parseIsoDate,
} from "./employmentDateMath";

export const PROBATION_END_SOURCE: SourceRef = {
  label: "GOV.UK — Employment contracts and conditions",
  url: "https://www.gov.uk/employment-contracts-and-conditions",
};

export type ProbationDurationUnit = "weeks" | "months";

export interface ProbationEndDateInput {
  startDate: string;
  duration: number;
  unit: ProbationDurationUnit;
}

export function calcProbationEndDate(input: ProbationEndDateInput): CalcResult {
  const start = parseIsoDate(input.startDate);
  const duration = Number.isFinite(input.duration) ? Math.floor(input.duration) : 0;
  if (!start || duration <= 0 || duration > 60) {
    return {
      headline: "—",
      headlineCaption: "Enter a valid start date and probation length",
      breakdown: [],
      notes: ["Use a positive whole-number duration of no more than 60 weeks or months."],
      valid: false,
    };
  }

  const reviewDate = input.unit === "months"
    ? addUtcMonths(start, duration)
    : addUtcDays(start, duration * 7);
  const lastFullDay = addUtcDays(reviewDate, -1);
  const durationLabel = `${duration} ${input.unit === "months"
    ? `month${duration === 1 ? "" : "s"}`
    : `week${duration === 1 ? "" : "s"}`}`;

  return {
    headline: formatDisplayDate(reviewDate),
    headlineCaption: "Calculated probation review / anniversary date",
    breakdown: [
      { label: "Employment start", value: formatDisplayDate(start) },
      { label: "Contract duration entered", value: durationLabel },
      { label: "Last full day before anniversary", value: formatDisplayDate(lastFullDay) },
      { label: "Review / anniversary date", value: formatDisplayDate(reviewDate), emphasis: true },
      { label: "Elapsed calendar days", value: daysBetween(start, reviewDate).toLocaleString("en-GB") },
    ],
    notes: [
      "This calculation treats the review date as the calendar anniversary of the start date. For month-end starts, it uses the last valid day of the target month.",
      "There is no universal UK statutory probation length. Your contract controls the period, review process and any extension power.",
      "Check whether your contract describes an inclusive end date, requires written confirmation, or allows an extension before relying on this date.",
      "Probation does not remove statutory rights such as protection from discrimination, whistleblowing detriment or automatically unfair dismissal.",
    ],
    valid: true,
  };
}
