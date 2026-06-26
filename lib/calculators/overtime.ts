import { formatCurrency, pluralUnit, safeNumber } from "../format";
import { US_FLSA } from "../rates";
import type { CalcResult, CountryCode, SourceRef } from "../types";

/**
 * Overtime & gross weekly pay estimator.
 * US source: FLSA — overtime at 1.5× the regular rate for hours over 40/week.
 * Acts as the high-volume traffic anchor that links into the higher-RPM tools.
 */
export const OVERTIME_SOURCE: SourceRef = {
  label: "U.S. DOL — Overtime Pay (Fair Labor Standards Act)",
  url: "https://www.dol.gov/agencies/whd/overtime",
};

export type OvertimeCountry = Extract<CountryCode, "US" | "UK" | "CA" | "AU">;

export interface OvertimeInput {
  country: OvertimeCountry;
  hourlyRate: number;
  regularHours: number;
  overtimeHours: number;
  /** Overtime multiplier (FLSA default 1.5). */
  multiplier: number;
}

export function calcOvertime(input: OvertimeInput): CalcResult {
  const rate = safeNumber(input.hourlyRate);
  const regular = safeNumber(input.regularHours);
  const ot = safeNumber(input.overtimeHours);
  const multiplier = safeNumber(input.multiplier, 1.5) || 1.5;

  if (rate <= 0 || regular + ot <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your rate and hours",
      breakdown: [],
      notes: ["Enter your hourly rate and the hours you worked to estimate your gross pay."],
      valid: false,
    };
  }

  const basePay = rate * regular;
  const otRate = rate * multiplier;
  const otPay = otRate * ot;
  const gross = basePay + otPay;

  // FLSA only mandates overtime past 40 hours/week. If a US user has entered more
  // than 40 regular hours, the excess is almost certainly mis-categorised — surface
  // a warning and the corrected figure rather than silently overriding their input
  // (which would be wrong for exempt staff or state daily-overtime rules).
  const FLSA_WEEKLY_THRESHOLD = US_FLSA.weeklyOvertimeThreshold;
  const usExcessRegular =
    input.country === "US" && regular > FLSA_WEEKLY_THRESHOLD ? regular - FLSA_WEEKLY_THRESHOLD : 0;

  const notes: string[] = [];
  if (input.country === "US") {
    notes.push(
      "Under the FLSA, non-exempt employees must receive at least 1.5× their regular rate for hours over 40 in a workweek.",
    );
    if (usExcessRegular > 0) {
      const correctedGross =
        rate * FLSA_WEEKLY_THRESHOLD + otRate * (usExcessRegular + ot);
      notes.push(
        `You entered ${pluralUnit(regular, "regular hour")} — ${pluralUnit(usExcessRegular, "hour")} over the 40-hour FLSA threshold. If you are non-exempt, those hours should be paid as overtime: your gross would be ${formatCurrency(correctedGross, input.country)}. Move the excess into "overtime hours" to apply the multiplier.`,
      );
    }
  } else {
    notes.push(
      "Overtime rules vary by country and contract. Many employers, not the law, set the overtime multiplier — check your contract.",
    );
  }
  notes.push("This is gross pay before tax and deductions.");

  return {
    headline: formatCurrency(gross, input.country),
    headlineCaption: "Estimated gross weekly pay",
    breakdown: [
      { label: "Regular pay", value: `${formatCurrency(basePay, input.country)} (${pluralUnit(regular, "hr")})` },
      { label: "Overtime rate", value: formatCurrency(otRate, input.country, { decimals: 2 }) },
      { label: "Overtime pay", value: `${formatCurrency(otPay, input.country)} (${pluralUnit(ot, "hr")})` },
      { label: "Gross weekly pay", value: formatCurrency(gross, input.country), emphasis: true },
    ],
    notes,
    valid: true,
  };
}
