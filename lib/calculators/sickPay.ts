import { formatCurrency, pluralUnit, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

/**
 * UK Statutory Sick Pay (SSP). Source: GOV.UK. Paid from the 4th qualifying
 * day of sickness (the first 3 are unpaid "waiting days"), for up to 28 weeks.
 * Weekly rate is uprated each April — single-source constant below.
 */
export const SSP_SOURCE: SourceRef = {
  label: "GOV.UK — Statutory Sick Pay (SSP)",
  url: "https://www.gov.uk/statutory-sick-pay",
};

export const SSP_CONSTANTS = {
  taxYear: "2026/27",
  weeklyRate: 123.25,
  waitingDays: 3,
  maxWeeks: 28,
  lowerEarningsLimit: 129,
  /** SSP is capped at 80% of normal weekly earnings (effective 2026/27). */
  earningsFraction: 0.8,
} as const;

export interface SickPayInput {
  /** Days normally worked per week (qualifying days), 1–7. */
  qualifyingDaysPerWeek: number;
  /** Total calendar working days off sick. */
  daysOffSick: number;
  /** Average gross weekly earnings — required to check LEL eligibility. 0 = not provided. */
  averageWeeklyEarnings?: number;
}

export function calcSickPay(input: SickPayInput): CalcResult {
  const qdpw = Math.min(safeNumber(input.qualifyingDaysPerWeek), 7);
  const daysOff = safeNumber(input.daysOffSick);
  const awe = safeNumber(input.averageWeeklyEarnings ?? 0);
  const C = SSP_CONSTANTS;

  if (qdpw <= 0 || daysOff <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your working days and days off sick",
      breakdown: [],
      notes: ["Enter the days you normally work each week and the working days you have been off sick."],
      valid: false,
    };
  }

  // If earnings are provided and fall below the LEL, the employee is ineligible.
  if (awe > 0 && awe < C.lowerEarningsLimit) {
    return {
      headline: "Not eligible",
      headlineCaption: "Earnings below the Lower Earnings Limit",
      breakdown: [],
      notes: [
        `To qualify for SSP your average weekly earnings must be at least £${C.lowerEarningsLimit} (${C.taxYear}).`,
        "If you do not qualify for SSP, check whether your employer offers contractual sick pay.",
      ],
      valid: false,
    };
  }

  // SSP weekly rate is the lower of the statutory flat rate or 80% of AWE (2026/27).
  const earningsCap = awe > 0 ? awe * C.earningsFraction : Infinity;
  const effectiveWeeklyRate = Math.min(C.weeklyRate, earningsCap);
  const cappedByEarnings = awe > 0 && earningsCap < C.weeklyRate;

  const dailyRate = effectiveWeeklyRate / qdpw;
  const maxPayableDays = C.maxWeeks * qdpw;
  const payableDays = Math.min(Math.max(0, daysOff - C.waitingDays), maxPayableDays);
  const total = payableDays * dailyRate;

  const notes: string[] = [];
  if (daysOff <= C.waitingDays) {
    notes.push(
      "The first 3 qualifying days are unpaid 'waiting days', so no SSP is payable until the 4th day off.",
    );
  }
  if (cappedByEarnings) {
    notes.push(
      `Your SSP is capped at 80% of your weekly earnings (${formatCurrency(earningsCap, "UK", { decimals: 2 })}/wk) because that is less than the standard rate of ${formatCurrency(C.weeklyRate, "UK", { decimals: 2 })}.`,
    );
  } else {
    notes.push(
      `Based on ${C.taxYear} standard rate of ${formatCurrency(C.weeklyRate, "UK", { decimals: 2 })} a week (lower of flat rate or 80% of earnings), paid for up to 28 weeks.`,
    );
  }
  if (awe === 0) {
    notes.push(
      `You must earn at least £${C.lowerEarningsLimit} a week on average to qualify. Enter your weekly earnings above to check the 80% earnings cap.`,
    );
  }
  notes.push("SSP rates are uprated each April.");

  return {
    headline: formatCurrency(total, "UK"),
    headlineCaption: "Estimated Statutory Sick Pay",
    breakdown: [
      {
        label: "Weekly SSP rate",
        value: formatCurrency(effectiveWeeklyRate, "UK", { decimals: 2 }),
      },
      {
        label: `Daily rate (${pluralUnit(qdpw, "qualifying day")})`,
        value: formatCurrency(dailyRate, "UK", { decimals: 2 }),
      },
      { label: "Unpaid waiting days", value: pluralUnit(C.waitingDays, "day") },
      { label: "Days paid", value: pluralUnit(payableDays, "day") },
      { label: "Total SSP", value: formatCurrency(total, "UK"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
