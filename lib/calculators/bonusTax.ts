import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, CountryCode, SourceRef } from "../types";

/**
 * Bonus take-home estimator. A bonus is taxed, and in the US is commonly
 * withheld at a flat supplemental rate. We model a single deduction rate the
 * user can adjust, defaulting to the US 22% federal supplemental rate, and are
 * explicit that state tax and FICA add more.
 */
export const BONUS_TAX_SOURCE: SourceRef = {
  label: "IRS — Publication 15 (supplemental wages)",
  url: "https://www.irs.gov/publications/p15",
};

/** US federal flat supplemental withholding rate (bonuses up to $1M). */
export const US_SUPPLEMENTAL_RATE = 22;

export interface BonusTaxInput {
  country: CountryCode;
  bonusAmount: number;
  /** Total deductions as a percentage (default 22 for US federal supplemental). */
  deductionRate: number;
}

export function calcBonusTax(input: BonusTaxInput): CalcResult {
  const bonus = safeNumber(input.bonusAmount);
  const rate = Math.min(safeNumber(input.deductionRate), 100);
  const { country } = input;

  if (bonus <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your bonus amount",
      breakdown: [],
      notes: ["Enter your gross bonus and the deduction rate to estimate your take-home amount."],
      valid: false,
    };
  }

  const withheld = (bonus * rate) / 100;
  const takeHome = bonus - withheld;

  return {
    headline: formatCurrency(takeHome, country),
    headlineCaption: "Estimated take-home bonus",
    breakdown: [
      { label: "Gross bonus", value: formatCurrency(bonus, country) },
      { label: "Deduction rate", value: `${rate}%` },
      { label: "Tax withheld", value: formatCurrency(withheld, country) },
      { label: "Take-home", value: formatCurrency(takeHome, country), emphasis: true },
    ],
    notes: [
      "Estimate only. In the US, employers often withhold a flat 22% federal rate on bonuses; Social Security and Medicare (FICA) and any state tax are deducted on top.",
      "Withholding is not your final tax — your actual liability is reconciled when you file your return.",
    ],
    valid: true,
  };
}
