import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, CountryCode, SourceRef } from "../types";

/**
 * Garden leave pay: during garden leave you remain employed and are paid in
 * full while away from work. Total = weekly pay × weeks of garden leave.
 */
export const GARDEN_LEAVE_SOURCE: SourceRef = {
  label: "Acas — Notice periods and garden leave",
  url: "https://www.acas.org.uk/notice-periods",
};

export interface GardenLeaveInput {
  country: CountryCode;
  weeklyPay: number;
  weeks: number;
}

export function calcGardenLeave(input: GardenLeaveInput): CalcResult {
  const weeklyPay = safeNumber(input.weeklyPay);
  const weeks = safeNumber(input.weeks);
  const { country } = input;

  if (weeklyPay <= 0 || weeks <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your weekly pay and notice length",
      breakdown: [],
      notes: ["Enter your gross weekly pay and the number of weeks of garden leave to see the total."],
      valid: false,
    };
  }

  const total = weeklyPay * weeks;
  const monthlyEquivalent = (weeklyPay * 52) / 12;

  return {
    headline: formatCurrency(total, country),
    headlineCaption: "Total pay during garden leave",
    breakdown: [
      { label: "Weekly pay", value: formatCurrency(weeklyPay, country) },
      { label: "Garden leave", value: `${weeks} week${weeks === 1 ? "" : "s"}` },
      { label: "Monthly equivalent", value: formatCurrency(monthlyEquivalent, country) },
      { label: "Total pay", value: formatCurrency(total, country), emphasis: true },
    ],
    notes: [
      "On garden leave you stay employed and receive your normal pay, but are kept away from work.",
      "You usually keep accruing holiday and remain bound by your contract — including any restrictions on starting a new job — until it ends.",
      "All figures are gross, before tax.",
    ],
    valid: true,
  };
}
