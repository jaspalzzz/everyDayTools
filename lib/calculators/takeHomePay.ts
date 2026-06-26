import { formatCurrency, safeNumber } from "../format";
import { UK_INCOME_TAX, UK_NI, US_INCOME_TAX, US_FICA } from "../rates";
import type { CalcResult, CountryCode, SourceRef } from "../types";

export const TAKE_HOME_SOURCE_UK: SourceRef = UK_INCOME_TAX.source;
export const TAKE_HOME_SOURCE_US: SourceRef = US_INCOME_TAX.source;

export function takeHomeSource(country: CountryCode): SourceRef {
  return country === "UK" ? TAKE_HOME_SOURCE_UK : TAKE_HOME_SOURCE_US;
}

export interface TakeHomePayInput {
  country: CountryCode;
  grossAnnual: number;
  filingStatus?: "single" | "married";
}

function calcUK(gross: number): CalcResult {
  const T = UK_INCOME_TAX;
  const N = UK_NI;

  let pa: number = T.personalAllowance;
  if (gross > T.paReducesAbove) {
    const excess = gross - T.paReducesAbove;
    pa = Math.max(0, pa - Math.floor(excess / 2));
  }

  const taxable = Math.max(0, gross - pa);

  let tax = 0;
  if (taxable <= 0) {
    tax = 0;
  } else if (gross <= T.basicRateLimit) {
    tax = taxable * T.basicRate;
  } else if (gross <= T.higherRateLimit) {
    const basic = Math.max(0, T.basicRateLimit - pa);
    const higher = taxable - basic;
    tax = basic * T.basicRate + higher * T.higherRate;
  } else {
    const basicBand = T.basicRateLimit - pa;
    const higherBand = Math.max(0, T.higherRateLimit - T.basicRateLimit);
    const additionalBand = Math.max(0, taxable - basicBand - higherBand);
    tax =
      Math.max(0, basicBand) * T.basicRate +
      higherBand * T.higherRate +
      additionalBand * T.additionalRate;
  }

  let ni = 0;
  if (gross > N.primaryThreshold) {
    const mainBand = Math.min(gross, N.upperEarningsLimit) - N.primaryThreshold;
    ni += mainBand * N.mainRate;
  }
  if (gross > N.upperEarningsLimit) {
    ni += (gross - N.upperEarningsLimit) * N.upperRate;
  }

  const totalDeductions = tax + ni;
  const takeHome = gross - totalDeductions;
  const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

  const notes: string[] = [
    `Based on ${T.taxYear} England/Wales/Northern Ireland rates. Scottish taxpayers have different income tax bands.`,
    "This is an estimate. It assumes you have a standard tax code (1257L), no other income, and no pension contributions. Your actual take-home may differ.",
  ];
  if (gross > T.paReducesAbove) {
    notes.push(
      `Your personal allowance is reduced because your income exceeds £${T.paReducesAbove.toLocaleString()}. It tapers by £1 for every £2 earned above this threshold.`,
    );
  }

  return {
    headline: formatCurrency(takeHome, "UK"),
    headlineCaption: "Estimated annual take-home pay",
    breakdown: [
      { label: "Gross annual salary", value: formatCurrency(gross, "UK") },
      { label: "Personal allowance", value: formatCurrency(pa, "UK") },
      { label: "Taxable income", value: formatCurrency(taxable, "UK") },
      { label: "Income tax", value: `−${formatCurrency(tax, "UK")}` },
      { label: "National Insurance", value: `−${formatCurrency(ni, "UK")}` },
      { label: "Total deductions", value: `−${formatCurrency(totalDeductions, "UK")}` },
      { label: "Effective tax rate", value: `${effectiveRate.toFixed(1)}%` },
      { label: "Monthly take-home", value: formatCurrency(takeHome / 12, "UK"), emphasis: false },
      { label: "Annual take-home", value: formatCurrency(takeHome, "UK"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}

function calcUS(gross: number): CalcResult {
  const T = US_INCOME_TAX;
  const F = US_FICA;

  const agi = Math.max(0, gross - T.standardDeductionSingle);

  let fedTax = 0;
  for (const band of T.brackets) {
    if (agi <= band.floor) break;
    const taxable = Math.min(agi, band.ceiling) - band.floor;
    fedTax += taxable * band.rate;
  }

  const ssWages = Math.min(gross, F.ssWageBase);
  const ssTax = ssWages * F.ssTaxRate;
  const medicareTax = gross * F.medicareTaxRate;
  const additionalMedicare =
    gross > F.additionalMedicareThreshold
      ? (gross - F.additionalMedicareThreshold) * F.additionalMedicareRate
      : 0;

  const fica = ssTax + medicareTax + additionalMedicare;
  const totalDeductions = fedTax + fica;
  const takeHome = gross - totalDeductions;
  const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

  const notes: string[] = [
    `Based on ${T.taxYear} federal rates for a single filer using the standard deduction ($${T.standardDeductionSingle.toLocaleString()}).`,
    "This estimate does not include state or local income tax, 401(k) contributions, health insurance premiums, or other pre-tax deductions, which would reduce your taxable income and increase take-home pay.",
    "Married filing jointly, head of household, and other filing statuses have different brackets and deductions.",
  ];
  if (gross > F.ssWageBase) {
    notes.push(
      `Social Security tax stops at the $${F.ssWageBase.toLocaleString()} wage base. Medicare tax applies to all wages.`,
    );
  }

  return {
    headline: formatCurrency(takeHome, "US"),
    headlineCaption: "Estimated annual take-home pay",
    breakdown: [
      { label: "Gross annual salary", value: formatCurrency(gross, "US") },
      { label: "Standard deduction", value: `−${formatCurrency(T.standardDeductionSingle, "US")}` },
      { label: "Adjusted gross income", value: formatCurrency(agi, "US") },
      { label: "Federal income tax", value: `−${formatCurrency(fedTax, "US")}` },
      { label: "Social Security (6.2%)", value: `−${formatCurrency(ssTax, "US")}` },
      { label: "Medicare (1.45%)", value: `−${formatCurrency(medicareTax + additionalMedicare, "US")}` },
      { label: "Total deductions", value: `−${formatCurrency(totalDeductions, "US")}` },
      { label: "Effective tax rate", value: `${effectiveRate.toFixed(1)}%` },
      { label: "Monthly take-home", value: formatCurrency(takeHome / 12, "US"), emphasis: false },
      { label: "Annual take-home", value: formatCurrency(takeHome, "US"), emphasis: true },
    ],
    notes,
    valid: true,
  };
}

export function calcTakeHomePay(input: TakeHomePayInput): CalcResult {
  const gross = safeNumber(input.grossAnnual);

  if (gross <= 0) {
    return {
      headline: "—",
      headlineCaption: "Enter your gross annual salary to see your estimate",
      breakdown: [],
      notes: [],
      valid: false,
    };
  }

  if (input.country === "UK") return calcUK(gross);
  if (input.country === "US") return calcUS(gross);

  return {
    headline: "—",
    headlineCaption: "UK and US are currently supported",
    breakdown: [],
    notes: ["Take-home pay calculation is currently available for the UK and US."],
    valid: false,
  };
}
