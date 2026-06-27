import { formatCurrency, safeNumber } from "../format";
import { UK_REDUNDANCY, UK_SETTLEMENT } from "../rates";
import type { CalcResult, SourceRef } from "../types";

export const SETTLEMENT_SOURCE: SourceRef = UK_SETTLEMENT.source;

export type SettlementReason =
  | "redundancy"
  | "unfair-dismissal"
  | "discrimination"
  | "without-reason";

export interface SettlementInput {
  annualSalary: number;
  yearsOfService: number;
  age: number;
  reason: SettlementReason;
}

function calcBasicAward(age: number, years: number, weeklyPay: number): number {
  const C = UK_REDUNDANCY;
  if (years < C.minYears) return 0;
  const counted = Math.min(years, C.maxYears);
  const capped = Math.min(weeklyPay, C.weeklyPayCap);
  let weeks = 0;
  for (let i = 0; i < counted; i++) {
    const a = age - 1 - i;
    if (a >= 41) weeks += 1.5;
    else if (a >= 22) weeks += 1.0;
    else weeks += 0.5;
  }
  return weeks * capped;
}

function statutoryNoticeWeeks(years: number): number {
  if (years < 1) return 0;
  return Math.min(years, 12);
}

/**
 * Estimates a reasonable settlement agreement range.
 *
 * Returns min (statutory floor), typical (mid-range), and high (strong claim)
 * values along with a tax breakdown against the £30k threshold.
 */
export function calcSettlement(input: SettlementInput): CalcResult {
  const salary = safeNumber(input.annualSalary);
  const years = Math.floor(safeNumber(input.yearsOfService));
  const age = Math.floor(safeNumber(input.age));
  const reason = input.reason;
  const C = UK_SETTLEMENT;

  if (salary <= 0 || age <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your details to see an estimate",
      breakdown: [],
      notes: ["Enter your salary, service length, age and reason for leaving."],
      valid: false,
    };
  }

  const weeklyPay = salary / 52;
  const monthlyPay = salary / 12;

  // 1. Statutory redundancy pay (included when reason = redundancy and 2+ years)
  const redundancyPay = reason === "redundancy" ? calcBasicAward(age, years, weeklyPay) : 0;

  // 2. Notice pay (PILON) — statutory minimum weeks
  const noticeWeeks = statutoryNoticeWeeks(years);
  const noticePay = noticeWeeks * weeklyPay;

  // 3. Ex gratia / compensatory element — months of salary
  //    Ranges represent low (quick settlement) → typical → strong claim
  const exGratiaMonths: Record<SettlementReason, [number, number, number]> = {
    "redundancy":        [1,   2,   3],
    "unfair-dismissal":  [2,   4,   6],
    "discrimination":    [3,   6,  12],
    "without-reason":    [1,   2,   4],
  };
  const [moLow, moMid, moHigh] = exGratiaMonths[reason];
  const exGratiaLow  = monthlyPay * moLow;
  const exGratiaMid  = monthlyPay * moMid;
  const exGratiaHigh = monthlyPay * moHigh;

  // 4. Legal fees contribution — employer standard
  const legalFees = C.legalFeesContribution;

  // Totals
  const floorTotal   = redundancyPay + noticePay + legalFees;
  const typicalTotal = floorTotal + exGratiaMid;
  const highTotal    = floorTotal + exGratiaHigh;

  // Tax: first £30k of total termination payment is tax-free
  const taxFreeUsed  = Math.min(typicalTotal, C.taxFreeThreshold);
  const taxable      = Math.max(0, typicalTotal - C.taxFreeThreshold);

  const notes: string[] = [
    `Statutory notice entitlement: ${noticeWeeks} week${noticeWeeks !== 1 ? "s" : ""} (${noticeWeeks} year${noticeWeeks !== 1 ? "s" : ""} service, capped at 12).`,
  ];
  if (taxable > 0) {
    notes.push(
      `Of the typical total, ${formatCurrency(taxFreeUsed, "UK")} falls within the £30,000 tax-free threshold. The remaining ${formatCurrency(taxable, "UK")} is subject to income tax and NI.`,
    );
  } else {
    notes.push(`The typical total falls within the £30,000 tax-free threshold — no income tax on the settlement payment itself.`);
  }
  if (reason === "discrimination") {
    notes.push(
      "Discrimination claims are uncapped — this estimate does not include injury to feelings (Vento bands) or aggravated damages, which can add significantly. Use the Tribunal compensation calculator for a fuller picture.",
    );
  }
  notes.push(
    "This is an estimate only. Actual settlement values depend on the strength of your claim, your employer's risk appetite, and negotiation. Always take independent legal advice before signing a settlement agreement.",
  );

  return {
    headline: formatCurrency(typicalTotal, "UK"),
    headlineCaption: "Estimated typical settlement value",
    breakdown: [
      ...(redundancyPay > 0
        ? [{ label: "Statutory redundancy pay", value: formatCurrency(redundancyPay, "UK") }]
        : []),
      { label: `Notice pay (PILON — ${noticeWeeks} wk${noticeWeeks !== 1 ? "s" : ""})`, value: formatCurrency(noticePay, "UK") },
      { label: "Legal fees contribution", value: formatCurrency(legalFees, "UK") },
      { label: `Ex gratia (${moMid} months — typical)`, value: formatCurrency(exGratiaMid, "UK") },
      { label: "Typical settlement total", value: formatCurrency(typicalTotal, "UK"), emphasis: true },
      { label: `Range: low (${moLow} mth ex gratia)`, value: formatCurrency(floorTotal + exGratiaLow, "UK") },
      { label: `Range: high (${moHigh} mth ex gratia)`, value: formatCurrency(highTotal, "UK") },
      { label: "Tax-free portion (£30k threshold)", value: formatCurrency(taxFreeUsed, "UK") },
      ...(taxable > 0 ? [{ label: "Taxable portion", value: formatCurrency(taxable, "UK") }] : []),
    ],
    notes,
    valid: true,
  };
}
