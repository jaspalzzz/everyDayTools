import { formatCurrency, pluralUnit, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

/**
 * UK statutory redundancy pay.
 * Source: Employment Rights Act 1996, s.162. Figures effective 6 April 2025.
 * Review every April — the weekly cap and bands are set annually by the
 * Employment Rights (Increase of Limits) Order. This is the "drift moat":
 * the constants below must be maintained each tax year.
 */
export const REDUNDANCY_CONSTANTS = {
  /** Maximum week's pay used in the statutory calculation (2026/27). */
  weeklyPayCap: 751,
  /** Only the most recent 20 years of service count. */
  maxYears: 20,
  /** Minimum continuous service to qualify (years). */
  minYears: 2,
  effectiveFrom: "6 April 2026",
} as const;

export const REDUNDANCY_SOURCE: SourceRef = {
  label: "GOV.UK — Redundancy pay (Employment Rights Act 1996)",
  url: "https://www.gov.uk/redundancy-your-rights/redundancy-pay",
};

export interface RedundancyInput {
  age: number;
  yearsOfService: number;
  weeklyPay: number;
}

/**
 * Each full year of service earns a multiplier based on the employee's age
 * during that year. We approximate the age-banding by walking back from the
 * current age across the counted years (HMRC's standard method).
 */
export function calcRedundancy(input: RedundancyInput): CalcResult {
  const age = Math.floor(safeNumber(input.age));
  const years = Math.floor(safeNumber(input.yearsOfService));
  const rawWeekly = safeNumber(input.weeklyPay);
  const cappedWeekly = Math.min(rawWeekly, REDUNDANCY_CONSTANTS.weeklyPayCap);

  if (years < REDUNDANCY_CONSTANTS.minYears || age <= 0 || rawWeekly <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your details to see your estimate",
      breakdown: [],
      notes: [
        `You normally need at least ${REDUNDANCY_CONSTANTS.minYears} years' continuous service to qualify for statutory redundancy pay.`,
      ],
      valid: false,
    };
  }

  const countedYears = Math.min(years, REDUNDANCY_CONSTANTS.maxYears);

  // Walk back from the most recent year. The year worked at a given age uses:
  //   age 41+   -> 1.5 weeks
  //   age 22-40 -> 1.0 week
  //   under 22  -> 0.5 week
  let weeks = 0;
  for (let i = 0; i < countedYears; i++) {
    const ageDuringYear = age - 1 - i;
    if (ageDuringYear >= 41) weeks += 1.5;
    else if (ageDuringYear >= 22) weeks += 1.0;
    else weeks += 0.5;
  }

  const total = weeks * cappedWeekly;

  const notes: string[] = [];
  if (rawWeekly > REDUNDANCY_CONSTANTS.weeklyPayCap) {
    notes.push(
      `Your weekly pay was capped at ${formatCurrency(REDUNDANCY_CONSTANTS.weeklyPayCap, "UK")} for this statutory calculation (the legal maximum from ${REDUNDANCY_CONSTANTS.effectiveFrom}).`,
    );
  }
  if (years > REDUNDANCY_CONSTANTS.maxYears) {
    notes.push(
      `Only your most recent ${REDUNDANCY_CONSTANTS.maxYears} years of service count toward statutory redundancy pay.`,
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
