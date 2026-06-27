import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, SourceRef } from "../types";

export const AU_ANNUAL_LEAVE_SOURCE: SourceRef = {
  label: "Fair Work Act 2009 (Cth) s.87 — Fair Work Ombudsman",
  url: "https://www.fairwork.gov.au/leave/annual-leave",
};

export type AuLeaveCalcMode = "accrued" | "payout";

export interface AuAnnualLeaveInput {
  mode: AuLeaveCalcMode;
  /** Full-time ordinary hours per week (default 38 for NES full-time). */
  hoursPerWeek: number;
  /** Hourly base rate in AUD. */
  hourlyRate: number;
  /** Weeks of completed service (used to calculate accrued balance). */
  weeksWorked: number;
  /** For payout mode: accrued leave balance in hours. */
  accruedHours: number;
  /** Whether 17.5% annual leave loading applies (award-covered or contract). */
  hasLeaveLoading: boolean;
  /** Shift worker entitled to 5 weeks leave instead of 4. */
  isShiftWorker: boolean;
}

export function calcAuAnnualLeave(input: AuAnnualLeaveInput): CalcResult {
  const hoursPerWeek = safeNumber(input.hoursPerWeek) || 38;
  const hourlyRate = safeNumber(input.hourlyRate);
  const weeksWorked = safeNumber(input.weeksWorked);
  const accruedHoursInput = safeNumber(input.accruedHours);

  if (hourlyRate <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your details to see your entitlement",
      breakdown: [],
      notes: [],
      valid: false,
    };
  }

  // NES: 4 weeks per year for full-time employees; 5 weeks for eligible shift workers.
  const annualWeeks = input.isShiftWorker ? 5 : 4;
  // Accrual rate: annual entitlement ÷ 52 weeks per year.
  const weeklyAccrualHours = (annualWeeks * hoursPerWeek) / 52;

  if (input.mode === "accrued") {
    if (weeksWorked <= 0) {
      return {
        headline: "—",
        headlineCaption: "Enter your weeks worked to see accrued leave",
        breakdown: [],
        notes: [],
        valid: false,
      };
    }

    const accruedHours = weeklyAccrualHours * weeksWorked;
    const basePay = accruedHours * hourlyRate;
    const loadingAmount = input.hasLeaveLoading ? basePay * 0.175 : 0;
    const total = basePay + loadingAmount;

    return {
      headline: `${accruedHours.toFixed(1)} hours`,
      headlineCaption: `Accrued annual leave (${(accruedHours / hoursPerWeek).toFixed(1)} weeks)`,
      breakdown: [
        { label: "Leave entitlement", value: `${annualWeeks} weeks/year` },
        { label: "Weeks worked", value: `${weeksWorked.toFixed(0)} weeks` },
        { label: "Accrual rate", value: `${weeklyAccrualHours.toFixed(2)} hrs/week` },
        { label: "Accrued leave", value: `${accruedHours.toFixed(1)} hours`, emphasis: true },
        { label: "Base pay value", value: formatCurrency(basePay, "AU") },
        ...(input.hasLeaveLoading
          ? [{ label: "Leave loading (17.5%)", value: formatCurrency(loadingAmount, "AU") }]
          : []),
        { label: "Total leave pay", value: formatCurrency(total, "AU"), emphasis: true },
      ],
      notes: [
        "Annual leave accrues progressively throughout the year — not as a lump sum.",
        input.hasLeaveLoading
          ? "Leave loading of 17.5% applies if your modern award or enterprise agreement provides it."
          : "Leave loading is not included. Check your modern award or contract — it may apply.",
        "Casual employees do not accrue annual leave — they receive a casual loading instead.",
      ],
      valid: true,
    };
  }

  // Payout mode: calculate value of existing leave balance.
  if (accruedHoursInput <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your accrued leave hours to calculate payout",
      breakdown: [],
      notes: [],
      valid: false,
    };
  }

  const basePay = accruedHoursInput * hourlyRate;
  const loadingAmount = input.hasLeaveLoading ? basePay * 0.175 : 0;
  const total = basePay + loadingAmount;

  return {
    headline: formatCurrency(total, "AU"),
    headlineCaption: "Annual leave payout on termination",
    breakdown: [
      { label: "Accrued leave balance", value: `${accruedHoursInput.toFixed(1)} hours` },
      { label: "Hourly rate", value: formatCurrency(hourlyRate, "AU") },
      { label: "Base pay", value: formatCurrency(basePay, "AU") },
      ...(input.hasLeaveLoading
        ? [{ label: "Leave loading (17.5%)", value: formatCurrency(loadingAmount, "AU") }]
        : []),
      { label: "Total payout", value: formatCurrency(total, "AU"), emphasis: true },
    ],
    notes: [
      "When employment ends, all accrued but untaken annual leave must be paid out at your base rate of pay.",
      input.hasLeaveLoading
        ? "Leave loading applies to your payout if it would have applied when you took the leave."
        : "Leave loading is not included. If your award or contract provides it, adjust accordingly.",
      "Annual leave payout on termination is treated as ordinary income and is fully taxable.",
    ],
    valid: true,
  };
}
