import { formatCurrency, pluralUnit, safeNumber } from "../format";
import { UK_SSP } from "../rates";
import type { CalcResult, SourceRef } from "../types";

export const SSP_SOURCE: SourceRef = UK_SSP.source;
export const SSP_CONSTANTS = UK_SSP;

export interface SickPayInput {
  qualifyingDaysPerWeek: number;
  daysOffSick: number;
  averageWeeklyEarnings?: number;
}

export function calcSickPay(input: SickPayInput): CalcResult {
  const qdpw = Math.min(safeNumber(input.qualifyingDaysPerWeek), 7);
  const daysOff = safeNumber(input.daysOffSick);
  const C = UK_SSP;

  if (qdpw <= 0 || daysOff <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your working days and days off sick",
      breakdown: [],
      notes: ["Enter the days you normally work each week and the working days you have been off sick."],
      valid: false,
    };
  }

  // From 6 April 2026 there is no LEL eligibility condition.
  // Weekly earnings are still collected to apply the 80%-of-AWE cap for low earners.
  const awe = safeNumber(input.averageWeeklyEarnings ?? 0);
  const earningsCap = awe > 0 ? awe * C.earningsFraction : C.weeklyRate;
  const effectiveWeeklyRate = awe > 0 ? Math.min(C.weeklyRate, earningsCap) : C.weeklyRate;
  const cappedByEarnings = awe > 0 && earningsCap < C.weeklyRate;

  const dailyRate = effectiveWeeklyRate / qdpw;
  const maxPayableDays = C.maxWeeks * qdpw;
  const payableDays = Math.min(Math.max(0, daysOff - C.waitingDays), maxPayableDays);
  const total = payableDays * dailyRate;

  const notes: string[] = [];
  // Waiting days abolished from 6 April 2026 — SSP is payable from day 1 of illness.
  if (cappedByEarnings) {
    notes.push(
      `Your SSP is capped at 80% of your weekly earnings (${formatCurrency(earningsCap, "UK", { decimals: 2 })}/wk) because that is less than the standard rate of ${formatCurrency(C.weeklyRate, "UK", { decimals: 2 })}.`,
    );
  } else {
    notes.push(
      `Based on ${C.taxYear} standard rate of ${formatCurrency(C.weeklyRate, "UK", { decimals: 2 })} a week, paid from the first qualifying day of illness for up to 28 weeks.`,
    );
  }
  if (awe === 0) {
    notes.push(
      "Enter your average weekly earnings above to check whether the 80%-of-earnings cap applies to you.",
    );
  }
  notes.push(
    "From 6 April 2026 the 3 unpaid waiting days and the Lower Earnings Limit eligibility condition are both abolished. SSP now starts from the first day you are ill.",
  );
  notes.push("SSP rates are uprated each April.");

  return {
    headline: formatCurrency(total, "UK"),
    headlineCaption: "Estimated Statutory Sick Pay",
    breakdown: [
      { label: "Weekly SSP rate", value: formatCurrency(effectiveWeeklyRate, "UK", { decimals: 2 }) },
      { label: `Daily rate (${pluralUnit(qdpw, "qualifying day")})`, value: formatCurrency(dailyRate, "UK", { decimals: 2 }) },
      { label: "Days paid", value: pluralUnit(payableDays, "day") },
      { label: "Total SSP", value: formatCurrency(total, "UK"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
