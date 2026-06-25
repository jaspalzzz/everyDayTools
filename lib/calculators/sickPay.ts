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
  taxYear: "2025/26",
  weeklyRate: 118.75,
  waitingDays: 3,
  maxWeeks: 28,
  lowerEarningsLimit: 125,
} as const;

export interface SickPayInput {
  /** Days normally worked per week (qualifying days), 1–7. */
  qualifyingDaysPerWeek: number;
  /** Total calendar working days off sick. */
  daysOffSick: number;
}

export function calcSickPay(input: SickPayInput): CalcResult {
  const qdpw = Math.min(safeNumber(input.qualifyingDaysPerWeek), 7);
  const daysOff = safeNumber(input.daysOffSick);
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

  const dailyRate = C.weeklyRate / qdpw;
  const maxPayableDays = C.maxWeeks * qdpw;
  const payableDays = Math.min(Math.max(0, daysOff - C.waitingDays), maxPayableDays);
  const total = payableDays * dailyRate;

  const notes: string[] = [];
  if (daysOff <= C.waitingDays) {
    notes.push(
      "The first 3 qualifying days are unpaid 'waiting days', so no SSP is payable until the 4th day off.",
    );
  }
  notes.push(
    `Based on ${C.taxYear} rate of ${formatCurrency(C.weeklyRate, "UK", { decimals: 2 })} a week, paid for up to 28 weeks.`,
  );
  notes.push(
    `You must also earn at least £${C.lowerEarningsLimit} a week on average to qualify. SSP rates change each April.`,
  );

  return {
    headline: formatCurrency(total, "UK"),
    headlineCaption: "Estimated Statutory Sick Pay",
    breakdown: [
      { label: "Weekly SSP rate", value: formatCurrency(C.weeklyRate, "UK", { decimals: 2 }) },
      { label: `Daily rate (${pluralUnit(qdpw, "qualifying day")})`, value: formatCurrency(dailyRate, "UK", { decimals: 2 }) },
      { label: "Unpaid waiting days", value: pluralUnit(C.waitingDays, "day") },
      { label: "Days paid", value: pluralUnit(payableDays, "day") },
      { label: "Total SSP", value: formatCurrency(total, "UK"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
