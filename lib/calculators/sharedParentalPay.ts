import { formatCurrency, safeNumber } from "../format";
import { UK_SHPP } from "../rates";
import type { CalcResult, SourceRef } from "../types";

export const SHARED_PARENTAL_SOURCE: SourceRef = UK_SHPP.source;

export interface SharedParentalPayInput {
  averageWeeklyEarnings: number;
  shppWeeks: number;
}

export function calcSharedParentalPay(input: SharedParentalPayInput): CalcResult {
  const awe = safeNumber(input.averageWeeklyEarnings);
  const weeks = safeNumber(input.shppWeeks);
  const C = UK_SHPP;

  if (awe <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your average weekly earnings",
      breakdown: [],
      notes: ["Enter your average gross weekly earnings to estimate Statutory Shared Parental Pay."],
      valid: false,
    };
  }

  if (awe < C.lowerEarningsLimit) {
    return {
      headline: "Not eligible",
      headlineCaption: "Earnings below the Lower Earnings Limit",
      breakdown: [],
      notes: [
        `To qualify for ShPP you must earn at least £${C.lowerEarningsLimit} a week on average (${C.taxYear}).`,
        "Shared Parental Pay also depends on how much maternity or adoption pay is curtailed.",
      ],
      valid: false,
    };
  }

  if (weeks < 1 || weeks > C.maxWeeks) {
    return {
      headline: "—",
      headlineCaption: `Enter 1-${C.maxWeeks} payable weeks`,
      breakdown: [],
      notes: [`Statutory Shared Parental Pay is payable for up to ${C.maxWeeks} weeks.`],
      valid: false,
    };
  }

  const weeklyRate = Math.min(C.weeklyRate, C.higherRateFraction * awe);
  const total = weeklyRate * weeks;

  return {
    headline: formatCurrency(total, "UK"),
    headlineCaption: `Estimated Statutory Shared Parental Pay (${weeks} weeks)`,
    breakdown: [
      { label: "Average weekly earnings", value: formatCurrency(awe, "UK") },
      { label: "Weekly ShPP rate", value: `${formatCurrency(weeklyRate, "UK", { decimals: 2 })}/wk` },
      { label: "Weeks payable", value: `${weeks} weeks` },
      { label: "Total ShPP", value: formatCurrency(total, "UK"), emphasis: true },
    ],
    notes: [
      `Based on ${C.taxYear} rates: the lower of £${C.weeklyRate} or 90% of average weekly earnings.`,
      "This assumes enough maternity or adoption pay has been ended early to create shared parental pay weeks.",
      "This is a gross estimate; ShPP is subject to tax and National Insurance.",
    ],
    valid: true,
  };
}
