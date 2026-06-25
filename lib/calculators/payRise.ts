import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, CountryCode, SourceRef } from "../types";

/**
 * Pay rise calculator. Pure arithmetic — applies a percentage increase to a
 * current salary and shows the new figure plus the gain per year/month.
 * Country-aware for currency formatting.
 */
export const PAY_RISE_SOURCE: SourceRef = {
  label: "U.S. Bureau of Labor Statistics — Consumer Price Index",
  url: "https://www.bls.gov/cpi/",
};

export interface PayRiseInput {
  country: CountryCode;
  currentSalary: number;
  percentIncrease: number;
}

export function calcPayRise(input: PayRiseInput): CalcResult {
  const current = safeNumber(input.currentSalary);
  const percent = safeNumber(input.percentIncrease);
  const { country } = input;

  if (current <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your current salary",
      breakdown: [],
      notes: ["Enter your current salary and the percentage rise to see your new pay."],
      valid: false,
    };
  }

  const newSalary = current * (1 + percent / 100);
  const annualIncrease = newSalary - current;
  const monthlyIncrease = annualIncrease / 12;

  return {
    headline: formatCurrency(newSalary, country),
    headlineCaption: "Your new annual salary",
    breakdown: [
      { label: "Current salary", value: formatCurrency(current, country) },
      { label: "Pay rise", value: `${percent}%` },
      { label: "Increase per year", value: formatCurrency(annualIncrease, country) },
      { label: "New salary", value: formatCurrency(newSalary, country), emphasis: true },
      { label: "Extra per month (gross)", value: formatCurrency(monthlyIncrease, country, { decimals: 2 }) },
    ],
    notes: [
      "All figures are gross, before tax and deductions.",
      "Compare your rise to the rate of inflation to see your real, after-inflation change in pay.",
    ],
    valid: true,
  };
}
