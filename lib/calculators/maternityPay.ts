import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

/**
 * UK Statutory Maternity Pay (SMP). Source: GOV.UK / Social Security
 * Contributions and Benefits Act 1992. Rates are uprated each April — they
 * live in one place here so a yearly change is a single edit (drift moat).
 */
export const MATERNITY_SOURCE: SourceRef = {
  label: "GOV.UK — Statutory Maternity Pay and Leave",
  url: "https://www.gov.uk/maternity-pay-leave/pay",
};

export const SMP_CONSTANTS = {
  taxYear: "2025/26",
  /** Standard weekly rate for weeks 7–39. */
  standardWeeklyRate: 187.18,
  /** Lower Earnings Limit — minimum average weekly earnings to qualify. */
  lowerEarningsLimit: 125,
  higherRateFraction: 0.9,
  higherRateWeeks: 6,
  totalWeeks: 39,
} as const;

export interface MaternityInput {
  /** Average gross weekly earnings over the relevant period. */
  averageWeeklyEarnings: number;
}

export function calcMaternityPay(input: MaternityInput): CalcResult {
  const awe = safeNumber(input.averageWeeklyEarnings);
  const C = SMP_CONSTANTS;

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
