import { formatCurrency, formatNumber, safeNumber } from "../format";
import type { CalcResult, CountryCode, SourceRef } from "../types";

/**
 * Converts an annual salary into the equivalent hourly, weekly and monthly
 * gross pay. Pure arithmetic, but country-aware for currency formatting.
 */
export const SALARY_HOURLY_SOURCE: SourceRef = {
  label: "U.S. DOL — Hours Worked under the FLSA",
  url: "https://www.dol.gov/agencies/whd/fact-sheets/22-flsa-hours-worked",
};

export interface SalaryToHourlyInput {
  country: CountryCode;
  annualSalary: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export function calcSalaryToHourly(input: SalaryToHourlyInput): CalcResult {
  const annual = safeNumber(input.annualSalary);
  const hoursPerWeek = safeNumber(input.hoursPerWeek);
  const weeksPerYear = safeNumber(input.weeksPerYear);
  const { country } = input;

  if (annual <= 0 || hoursPerWeek <= 0 || weeksPerYear <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your salary and working hours",
      breakdown: [],
      notes: ["Enter an annual salary, hours per week and weeks per year to convert to an hourly rate."],
      valid: false,
    };
  }

  const totalHours = hoursPerWeek * weeksPerYear;
  const hourly = annual / totalHours;
  const weekly = annual / weeksPerYear;
  const monthly = annual / 12;

  return {
    headline: formatCurrency(hourly, country, { decimals: 2 }),
    headlineCaption: "Your equivalent gross hourly rate",
    breakdown: [
      { label: "Annual salary", value: formatCurrency(annual, country) },
      { label: "Monthly (gross)", value: formatCurrency(monthly, country) },
      { label: "Weekly (gross)", value: formatCurrency(weekly, country) },
      {
        label: `Hourly (${formatNumber(Math.round(totalHours), country)} hrs/year)`,
        value: formatCurrency(hourly, country, { decimals: 2 }),
        emphasis: true,
      },
    ],
    notes: [
      `Based on ${formatNumber(hoursPerWeek, country)} hours a week over ${formatNumber(weeksPerYear, country)} weeks a year.`,
      "All figures are gross, before tax and deductions.",
    ],
    valid: true,
  };
}
