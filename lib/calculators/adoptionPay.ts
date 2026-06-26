import { formatCurrency, safeNumber } from "../format";
import { UK_SAP } from "../rates";
import type { CalcResult, SourceRef } from "../types";

export const ADOPTION_SOURCE: SourceRef = UK_SAP.source;

export interface AdoptionPayInput {
  averageWeeklyEarnings: number;
}

export function calcAdoptionPay(input: AdoptionPayInput): CalcResult {
  const awe = safeNumber(input.averageWeeklyEarnings);
  const C = UK_SAP;

  if (awe <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your average weekly earnings",
      breakdown: [],
      notes: ["Enter your average gross weekly earnings to estimate Statutory Adoption Pay."],
      valid: false,
    };
  }

  if (awe < C.lowerEarningsLimit) {
    return {
      headline: "Not eligible",
      headlineCaption: "Earnings below the Lower Earnings Limit",
      breakdown: [],
      notes: [
        `To qualify for SAP you must earn at least £${C.lowerEarningsLimit} a week on average (${C.taxYear}).`,
        "You also normally need 26 weeks' continuous employment by the week you are matched with a child.",
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
    headlineCaption: "Estimated total Statutory Adoption Pay (39 weeks)",
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
      "This assumes you meet the adoption pay employment, notice and matching conditions.",
      "This is a gross estimate; SAP is subject to tax and National Insurance.",
    ],
    valid: true,
  };
}
