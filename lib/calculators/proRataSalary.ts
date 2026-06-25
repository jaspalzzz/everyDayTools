import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, CountryCode, SourceRef } from "../types";

/**
 * Pro-rata salary: scales a full-time salary to the hours you actually work.
 * Country-aware for currency formatting.
 */
export const PRO_RATA_SOURCE: SourceRef = {
  label: "GOV.UK — Part-time workers' rights",
  url: "https://www.gov.uk/part-time-worker-rights",
};

export interface ProRataInput {
  country: CountryCode;
  fullTimeSalary: number;
  fullTimeHours: number;
  yourHours: number;
}

export function calcProRata(input: ProRataInput): CalcResult {
  const fullSalary = safeNumber(input.fullTimeSalary);
  const fullHours = safeNumber(input.fullTimeHours);
  const yourHours = safeNumber(input.yourHours);
  const { country } = input;

  if (fullSalary <= 0 || fullHours <= 0 || yourHours <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter the full-time salary and hours",
      breakdown: [],
      notes: ["Enter the full-time salary, full-time hours and your hours to work out your pro-rata pay."],
      valid: false,
    };
  }

  const fraction = yourHours / fullHours;
  const proRata = fullSalary * fraction;
  const monthly = proRata / 12;
  const pct = Math.round(fraction * 1000) / 10;

  const notes: string[] = [
    "All figures are gross, before tax and deductions.",
    "Part-time workers are entitled to the same pay and benefits, pro-rata, as comparable full-time staff.",
  ];
  if (yourHours > fullHours) {
    notes.unshift(
      "Your hours exceed the stated full-time hours — the result is above the full-time salary. Check that both figures are correct.",
    );
  }

  return {
    headline: formatCurrency(proRata, country),
    headlineCaption: "Your pro-rata annual salary",
    breakdown: [
      { label: "Full-time salary", value: formatCurrency(fullSalary, country) },
      { label: "Full-time hours", value: `${fullHours} hrs/week` },
      { label: "Your hours", value: `${yourHours} hrs/week` },
      { label: "Pro-rata fraction", value: `${pct}%` },
      { label: "Your salary", value: formatCurrency(proRata, country), emphasis: true },
      { label: "Monthly (gross)", value: formatCurrency(monthly, country) },
    ],
    notes,
    valid: true,
  };
}
