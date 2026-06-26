import { formatCurrency, pluralUnit, safeNumber } from "../format";
import { UK_REDUNDANCY } from "../rates";
import type { CalcResult, SourceRef } from "../types";

export const REDUNDANCY_SOURCE: SourceRef = UK_REDUNDANCY.source;

/** Re-export for components that reference the old constant shape. */
export const REDUNDANCY_CONSTANTS = UK_REDUNDANCY;

export interface RedundancyInput {
  age: number;
  yearsOfService: number;
  weeklyPay: number;
}

export function calcRedundancy(input: RedundancyInput): CalcResult {
  const age = Math.floor(safeNumber(input.age));
  const years = Math.floor(safeNumber(input.yearsOfService));
  const rawWeekly = safeNumber(input.weeklyPay);
  const C = UK_REDUNDANCY;
  const cappedWeekly = Math.min(rawWeekly, C.weeklyPayCap);

  if (years < C.minYears || age <= 0 || rawWeekly <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your details to see your estimate",
      breakdown: [],
      notes: [
        `You normally need at least ${C.minYears} years' continuous service to qualify for statutory redundancy pay.`,
      ],
      valid: false,
    };
  }

  const countedYears = Math.min(years, C.maxYears);

  let weeks = 0;
  for (let i = 0; i < countedYears; i++) {
    const ageDuringYear = age - 1 - i;
    if (ageDuringYear >= 41) weeks += 1.5;
    else if (ageDuringYear >= 22) weeks += 1.0;
    else weeks += 0.5;
  }

  const total = weeks * cappedWeekly;

  const notes: string[] = [];
  if (rawWeekly > C.weeklyPayCap) {
    notes.push(
      `Your weekly pay was capped at ${formatCurrency(C.weeklyPayCap, "UK")} for this statutory calculation (the legal maximum from ${C.effectiveDate}).`,
    );
  }
  if (years > C.maxYears) {
    notes.push(
      `Only your most recent ${C.maxYears} years of service count toward statutory redundancy pay.`,
    );
  }
  notes.push(
    "Statutory redundancy pay is tax-free. Your employer may offer more under your contract — this is the legal minimum only.",
  );

  return {
    headline: formatCurrency(total, "UK"),
    headlineCaption: "Estimated statutory redundancy pay",
    breakdown: [
      { label: "Counted years of service", value: String(countedYears) },
      { label: "Weeks' pay earned", value: pluralUnit(weeks, "week") },
      { label: "Weekly pay used", value: formatCurrency(cappedWeekly, "UK") },
      { label: "Statutory redundancy pay", value: formatCurrency(total, "UK"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
