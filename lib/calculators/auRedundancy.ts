import { formatCurrency, pluralUnit, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

export const AU_REDUNDANCY_SOURCE: SourceRef = {
  label: "Fair Work Act 2009 (Cth) s.119",
  url: "https://www.legislation.gov.au/C2009A00028/latest/text",
};

/**
 * NES redundancy pay table — Fair Work Act 2009 s.119.
 * Maps minimum years of continuous service to weeks of base-rate pay.
 * The 10+ year figure is lower than 9–10 years because employees with 10+
 * years also accrue long service leave entitlements under state/territory law.
 */
const NES_TABLE: Array<{ minYears: number; weeks: number }> = [
  { minYears: 1, weeks: 4 },
  { minYears: 2, weeks: 6 },
  { minYears: 3, weeks: 7 },
  { minYears: 4, weeks: 8 },
  { minYears: 5, weeks: 10 },
  { minYears: 6, weeks: 11 },
  { minYears: 7, weeks: 13 },
  { minYears: 8, weeks: 14 },
  { minYears: 9, weeks: 16 },
  { minYears: 10, weeks: 12 },
];

export type AuEmployerSize = "large" | "small";

export interface AuRedundancyInput {
  yearsOfService: number;
  weeklyPay: number;
  /** Small business = fewer than 15 employees. Exempt from NES redundancy pay. */
  employerSize: AuEmployerSize;
}

function nesWeeks(years: number): number {
  // Walk the table in reverse to find the highest bracket the employee meets.
  for (let i = NES_TABLE.length - 1; i >= 0; i--) {
    if (years >= NES_TABLE[i]!.minYears) return NES_TABLE[i]!.weeks;
  }
  return 0;
}

export function calcAuRedundancy(input: AuRedundancyInput): CalcResult {
  const years = Math.floor(safeNumber(input.yearsOfService));
  const weeklyPay = safeNumber(input.weeklyPay);

  // Small business exemption — no NES redundancy pay obligation.
  if (input.employerSize === "small") {
    return {
      headline: "Not applicable",
      headlineCaption: "Small business employers are exempt",
      breakdown: [],
      notes: [
        "Employers with fewer than 15 employees are exempt from the NES redundancy pay obligation under the Fair Work Act 2009. You may still have entitlements under a modern award or enterprise agreement — check with the Fair Work Ombudsman.",
      ],
      valid: false,
    };
  }

  if (years < 1 || weeklyPay <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your details to see your estimate",
      breakdown: [],
      notes: [
        "You normally need at least 1 year of continuous service with the same employer to qualify for NES redundancy pay.",
      ],
      valid: false,
    };
  }

  const weeks = nesWeeks(years);
  const total = weeks * weeklyPay;

  const notes: string[] = [
    "Calculated on your base rate of pay only — overtime, loadings, penalties, and allowances are excluded.",
  ];

  if (years >= 10) {
    notes.push(
      "The NES table drops to 12 weeks at 10+ years because long service leave entitlements also apply. Your total exit package including long service leave may be higher — check with your state or territory authority.",
    );
  }

  notes.push(
    "Your employer may have a modern award or enterprise agreement that provides more redundancy pay than the NES minimum shown here.",
  );

  return {
    headline: formatCurrency(total, "AU"),
    headlineCaption: "Estimated NES redundancy pay",
    breakdown: [
      { label: "Years of continuous service", value: pluralUnit(years, "year") },
      { label: "NES redundancy entitlement", value: pluralUnit(weeks, "week") },
      { label: "Weekly base rate", value: formatCurrency(weeklyPay, "AU") },
      { label: "Redundancy pay", value: formatCurrency(total, "AU"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
