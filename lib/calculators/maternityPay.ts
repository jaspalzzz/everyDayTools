import { formatCurrency, safeNumber } from "../format";
import { UK_SMP } from "../rates";
import type { CalcResult, SourceRef } from "../types";

export const MATERNITY_SOURCE: SourceRef = UK_SMP.source;
export const SMP_CONSTANTS = UK_SMP;

export interface MaternityInput {
  averageWeeklyEarnings: number;
}

export function calcMaternityPay(input: MaternityInput): CalcResult {
  const awe = safeNumber(input.averageWeeklyEarnings);
  const C = UK_SMP;

  if (awe <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your average weekly earnings",
      breakdown: [],
      notes: ["Enter your average gross weekly earnings to estimate your Statutory Maternity Pay."],
      valid: false,
    };
  }

  if (awe < C.lowerEarningsLimit) {
    return {
      headline: "Not eligible",
      headlineCaption: "Earnings below the Lower Earnings Limit",
      breakdown: [],
      notes: [
        `To qualify for SMP you must earn at least £${C.lowerEarningsLimit} a week on average (${C.taxYear}).`,
        "If you do not qualify for SMP, you may be able to claim Maternity Allowance instead.",
      ],
      valid: false,
    };
  }

  const higherWeekly = C.higherRateFraction * awe;
  const lowerWeekly = Math.min(C.standardWeeklyRate, C.higherRateFraction * awe);
  const lowerWeeks = C.totalWeeks - C.higherRateWeeks;
  const total = C.higherRateWeeks * higherWeekly + lowerWeeks * lowerWeekly;

  return {
    headline: formatCurrency(total, "UK"),
    headlineCaption: "Estimated total Statutory Maternity Pay (39 weeks)",
    breakdown: [
      {
        label: `First ${C.higherRateWeeks} weeks (90% of pay)`,
        value: `${formatCurrency(higherWeekly, "UK", { decimals: 2 })}/wk`,
      },
      {
        label: `Next ${lowerWeeks} weeks`,
        value: `${formatCurrency(lowerWeekly, "UK", { decimals: 2 })}/wk`,
      },
      { label: "Total over 39 weeks", value: formatCurrency(total, "UK"), emphasis: true },
    ],
    notes: [
      `Based on ${C.taxYear} rates: 90% of pay for the first 6 weeks, then the lower of £${C.standardWeeklyRate} or 90% of pay for 33 weeks.`,
      "SMP rates are uprated each April — check the source link for the current figure.",
      "This is a gross estimate; SMP is subject to tax and National Insurance.",
    ],
    valid: true,
  };
}
