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

  if (input.averageWeeklyEarnings === undefined) {
    return {
      headline: "—",
      headlineCaption: "Enter your weekly earnings to check eligibility",
      breakdown: [],
      notes: [
        `You must earn at least £${C.lowerEarningsLimit}/wk on average to qualify for SSP. Your earnings also determine whether the 80%-of-earnings cap applies instead of the standard £${C.weeklyRate} rate.`,
      ],
      valid: false,
    };
  }

  const awe = safeNumber(input.averageWeeklyEarnings);

  if (awe < C.lowerEarningsLimit) {
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

  const earningsCap = awe * C.earningsFraction;
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
      { label: "Weekly SSP rate", value: formatCurrency(effectiveWeeklyRate, "UK", { decimals: 2 }) },
      { label: `Daily rate (${pluralUnit(qdpw, "qualifying day")})`, value: formatCurrency(dailyRate, "UK", { decimals: 2 }) },
      { label: "Unpaid waiting days", value: pluralUnit(C.waitingDays, "day") },
      { label: "Days paid", value: pluralUnit(payableDays, "day") },
      { label: "Total SSP", value: formatCurrency(total, "UK"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
