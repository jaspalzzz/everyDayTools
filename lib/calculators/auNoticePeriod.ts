import { pluralUnit, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

export const AU_NOTICE_SOURCE: SourceRef = {
  label: "Fair Work Act 2009 (Cth) s.117 — Fair Work Ombudsman",
  url: "https://www.fairwork.gov.au/ending-employment/notice-and-final-pay/notice-of-termination",
};

/**
 * Fair Work Act 2009 s.117 minimum notice table.
 * These are employer-to-employee notice obligations.
 * Employee resignation notice is governed by the contract or award.
 */
function fwaNoticeWeeks(years: number): number {
  if (years < 1) return 1;
  if (years < 3) return 2;
  if (years < 5) return 3;
  return 4;
}

export interface AuNoticeInput {
  completedYears: number;
  /** Age at the time of notice — over-45s with 2+ years get an extra week. */
  age: number;
  /** Weekly base rate of pay, in AUD. */
  weeklyPay: number;
}

export function calcAuNoticePeriod(input: AuNoticeInput): CalcResult {
  const years = safeNumber(input.completedYears);
  const age = safeNumber(input.age);
  const weeklyPay = safeNumber(input.weeklyPay);

  if (years <= 0 || weeklyPay <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your details to see your entitlement",
      breakdown: [],
      notes: ["Enter your years of service and weekly pay to calculate your notice entitlement."],
      valid: false,
    };
  }

  const baseWeeks = fwaNoticeWeeks(years);
  const over45Bonus = age >= 45 && years >= 2 ? 1 : 0;
  const totalWeeks = baseWeeks + over45Bonus;
  const pilon = totalWeeks * weeklyPay;

  const breakdown: { label: string; value: string; emphasis?: boolean }[] = [
    { label: "Years of continuous service", value: pluralUnit(Math.floor(years), "year") },
    { label: "Base statutory notice", value: pluralUnit(baseWeeks, "week") },
  ];

  if (over45Bonus > 0) {
    breakdown.push({ label: "Over-45 additional notice", value: "1 week" });
  }

  breakdown.push(
    { label: "Total notice entitlement", value: pluralUnit(totalWeeks, "week"), emphasis: true },
    { label: "Pay in lieu (PILON)", value: `A$${pilon.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, emphasis: true },
  );

  const notes: string[] = [
    "This is the minimum notice your employer must give you under the Fair Work Act 2009 s.117. Your modern award, enterprise agreement, or employment contract may require more.",
    "If your employer pays you in lieu of notice, the payment must equal your full base rate of pay for the notice period (plus any other entitlements you would have earned).",
  ];

  if (over45Bonus > 0) {
    notes.push("You receive an additional 1 week's notice because you are over 45 and have at least 2 years of continuous service (Fair Work Act s.117(3)).");
  }

  return {
    headline: pluralUnit(totalWeeks, "week"),
    headlineCaption: "Minimum notice under Fair Work Act 2009",
    breakdown,
    notes,
    valid: true,
  };
}
