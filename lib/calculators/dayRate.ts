import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, CountryCode, SourceRef } from "../types";

export const DAY_RATE_SOURCE: SourceRef = {
  label: "Standard contractor working-day convention (220–260 days/year)",
  url: "https://www.gov.uk/self-employed-national-insurance-rates",
};

export interface DayRateInput {
  country: CountryCode;
  /** Day rate in local currency. If provided, converts to annual. */
  dayRate?: number;
  /** Annual salary in local currency. If provided, converts to day rate. */
  annualSalary?: number;
  /** Working days per year (default 260 for 5-day week, minus holidays). */
  workingDaysPerYear?: number;
}

const DEFAULT_WORKING_DAYS = 260;
/** UK contractors typically charge more to cover NI, pension, holiday. */
const UK_CONTRACTOR_PREMIUM_FACTOR = 1.35;

export function calcDayRate(input: DayRateInput): CalcResult {
  const { country } = input;
  const days = safeNumber(input.workingDaysPerYear, DEFAULT_WORKING_DAYS) || DEFAULT_WORKING_DAYS;
  const isCurrencyUK = country === "UK";

  const dayRate = safeNumber(input.dayRate);
  const annualSalary = safeNumber(input.annualSalary);

  if (dayRate <= 0 && annualSalary <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter either a day rate or an annual salary",
      breakdown: [],
      notes: [],
      valid: false,
    };
  }

  if (dayRate > 0) {
    // Convert day rate → annual equivalents
    const annual = dayRate * days;
    const monthly = annual / 12;
    const weekly = dayRate * 5;
    // Equivalent employee salary is lower because employees get NI/pension/holiday
    const equivalentEmployeeSalary = isCurrencyUK
      ? annual / UK_CONTRACTOR_PREMIUM_FACTOR
      : annual * 0.8; // rough US W-2 equivalent (no benefits)

    return {
      headline: formatCurrency(annual, country),
      headlineCaption: "Estimated annual contractor income",
      breakdown: [
        { label: "Day rate", value: formatCurrency(dayRate, country) },
        { label: "Working days per year", value: String(days) },
        { label: "Annual gross (contractor)", value: formatCurrency(annual, country), emphasis: true },
        { label: "Monthly", value: formatCurrency(monthly, country) },
        { label: "Weekly (5 days)", value: formatCurrency(weekly, country) },
        {
          label: isCurrencyUK ? "Equivalent employee salary" : "Rough W-2 equivalent",
          value: formatCurrency(equivalentEmployeeSalary, country),
        },
      ],
      notes: [
        `Based on ${days} working days/year. Adjust the field for your actual billable days.`,
        isCurrencyUK
          ? "The equivalent employee salary is ~35% lower to account for employer NI, pension auto-enrolment, and paid holiday that employees receive but contractors must self-fund."
          : "The W-2 equivalent is ~20% lower: employees receive employer FICA match, health insurance, and paid leave that self-employed workers must fund themselves.",
        "This is gross income before tax. Use the Self-employment tax calculator to estimate take-home.",
      ],
      valid: true,
    };
  }

  // Convert annual salary → day rate equivalent
  const equivalentDayRate = isCurrencyUK
    ? (annualSalary * UK_CONTRACTOR_PREMIUM_FACTOR) / days
    : (annualSalary / 0.8) / days;
  const monthly = annualSalary / 12;

  return {
    headline: formatCurrency(equivalentDayRate, country),
    headlineCaption: "Equivalent contractor day rate",
    breakdown: [
      { label: "Employee annual salary", value: formatCurrency(annualSalary, country) },
      { label: "Monthly salary", value: formatCurrency(monthly, country) },
      { label: "Working days per year", value: String(days) },
      {
        label: isCurrencyUK ? "Equivalent day rate (incl. premium)" : "Equivalent day rate",
        value: formatCurrency(equivalentDayRate, country),
        emphasis: true,
      },
    ],
    notes: [
      isCurrencyUK
        ? `The day rate includes a ~35% uplift over the raw salary ÷ days calculation to cover employer NI, pension, and holiday that you must self-fund as a contractor.`
        : `The day rate includes a ~25% uplift to cover self-employment tax, no employer health insurance or benefits, and unpaid downtime between contracts.`,
      `Based on ${days} billable days/year. Reduce this for holiday, admin, and gaps between contracts.`,
      "Use the Self-employment tax calculator to estimate your actual take-home.",
    ],
    valid: true,
  };
}
