import { formatCurrency, safeNumber } from "../format";
import { UK_SPP } from "../rates";
import type { CalcResult, SourceRef } from "../types";

export const PATERNITY_SOURCE: SourceRef = UK_SPP.source;

export interface PaternityPayInput {
  averageWeeklyEarnings: number;
  weeks: 1 | 2;
}

export function calcPaternityPay(input: PaternityPayInput): CalcResult {
  const awe = safeNumber(input.averageWeeklyEarnings);
  const weeks = input.weeks === 2 ? 2 : 1;
  const C = UK_SPP;

  if (awe <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your average weekly earnings",
      breakdown: [],
      notes: ["Enter your average gross weekly earnings to estimate Statutory Paternity Pay."],
      valid: false,
    };
  }

  if (awe < C.lowerEarningsLimit) {
    return {
      headline: "Not eligible",
      headlineCaption: "Earnings below the Lower Earnings Limit",
      breakdown: [],
      notes: [
        `To qualify for SPP you must earn at least £${C.lowerEarningsLimit} a week on average (${C.taxYear}).`,
        "You also normally need 26 weeks' continuous employment by the end of the 15th week before the baby is due.",
      ],
      valid: false,
    };
  }

  const weeklyRate = Math.min(C.weeklyRate, C.higherRateFraction * awe);
  const total = weeklyRate * weeks;

  return {
    headline: formatCurrency(total, "UK"),
    headlineCaption: `Estimated Statutory Paternity Pay (${weeks} week${weeks === 1 ? "" : "s"})`,
    breakdown: [
      { label: "Average weekly earnings", value: formatCurrency(awe, "UK") },
      { label: "Weekly SPP rate", value: `${formatCurrency(weeklyRate, "UK", { decimals: 2 })}/wk` },
      { label: "Weeks payable", value: `${weeks} week${weeks === 1 ? "" : "s"}` },
      { label: "Total SPP", value: formatCurrency(total, "UK"), emphasis: true },
    ],
    notes: [
      `Based on ${C.taxYear} rates: the lower of £${C.weeklyRate} or 90% of average weekly earnings.`,
      "This assumes you meet the employment, notice and relationship conditions for Statutory Paternity Pay.",
      "This is a gross estimate; SPP is subject to tax and National Insurance.",
    ],
    valid: true,
  };
}
