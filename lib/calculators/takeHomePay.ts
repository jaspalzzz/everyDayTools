import { formatCurrency, safeNumber } from "../format";
import type { CalcResult, CountryCode, SourceRef } from "../types";

// ---------------------------------------------------------------------------
// UK 2026/27 income tax bands (England/Wales/Northern Ireland)
// Source: HMRC — Income Tax rates and Personal Allowance
// https://www.gov.uk/income-tax-rates
// ---------------------------------------------------------------------------
const UK_TAX = {
  personalAllowance: 12_570,
  basicRateLimit: 50_270, // 12,570 + 37,700
  higherRateLimit: 125_140,
  basicRate: 0.2,
  higherRate: 0.4,
  additionalRate: 0.45,
  /** PA tapers by £1 for every £2 above £100k */
  paReducesAbove: 100_000,
  taxYear: "2026/27",
} as const;

// UK 2026/27 National Insurance (Class 1 employee)
// Source: HMRC — National Insurance rates and categories
// https://www.gov.uk/national-insurance/how-much-you-pay
const UK_NI = {
  primaryThreshold: 12_570, // matches LEL / PT for 2026/27
  upperEarningsLimit: 50_270,
  mainRate: 0.08,
  upperRate: 0.02,
  taxYear: "2026/27",
} as const;

// ---------------------------------------------------------------------------
// US 2026 federal income tax brackets (single filer)
// Source: IRS Rev. Proc. 2025-61 (inflation-adjusted 2026 figures)
// https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026
// ---------------------------------------------------------------------------
const US_TAX = {
  standardDeduction: 16_100, // single filer 2026
  brackets: [
    { floor: 0,       ceiling: 11_925, rate: 0.10 },
    { floor: 11_925,  ceiling: 48_475, rate: 0.12 },
    { floor: 48_475,  ceiling: 103_350, rate: 0.22 },
    { floor: 103_350, ceiling: 197_300, rate: 0.24 },
    { floor: 197_300, ceiling: 250_525, rate: 0.32 },
    { floor: 250_525, ceiling: 626_350, rate: 0.35 },
    { floor: 626_350, ceiling: Infinity, rate: 0.37 },
  ],
  taxYear: "2026",
} as const;

// FICA: Social Security + Medicare (employee share)
const US_FICA = {
  ssTaxRate: 0.062,
  ssWageBase: 176_100, // 2026 projected
  medicareTaxRate: 0.0145,
  additionalMedicareRate: 0.009,  // above $200k single
  additionalMedicareThreshold: 200_000,
} as const;

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------
export const TAKE_HOME_SOURCE_UK: SourceRef = {
  label: "HMRC — Income Tax rates and National Insurance (2026/27)",
  url: "https://www.gov.uk/income-tax-rates",
};

export const TAKE_HOME_SOURCE_US: SourceRef = {
  label: "IRS — 2026 Tax Brackets and Standard Deduction",
  url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026",
};

export function takeHomeSource(country: CountryCode): SourceRef {
  return country === "UK" ? TAKE_HOME_SOURCE_UK : TAKE_HOME_SOURCE_US;
}

// ---------------------------------------------------------------------------
// Input / output
// ---------------------------------------------------------------------------
export interface TakeHomePayInput {
  country: CountryCode;
  grossAnnual: number;
  /** US only: filing status affects standard deduction (future) */
  filingStatus?: "single" | "married";
}

// ---------------------------------------------------------------------------
// UK engine
// ---------------------------------------------------------------------------
function calcUK(gross: number): CalcResult {
  // Taper personal allowance above £100k
  let pa: number = UK_TAX.personalAllowance;
  if (gross > UK_TAX.paReducesAbove) {
    const excess = gross - UK_TAX.paReducesAbove;
    pa = Math.max(0, pa - Math.floor(excess / 2));
  }

  const taxable = Math.max(0, gross - pa);

  // Income tax bands
  let tax = 0;
  if (taxable <= 0) {
    tax = 0;
  } else if (gross <= UK_TAX.basicRateLimit) {
    tax = taxable * UK_TAX.basicRate;
  } else if (gross <= UK_TAX.higherRateLimit) {
    const basic = Math.max(0, UK_TAX.basicRateLimit - pa);
    const higher = taxable - basic;
    tax = basic * UK_TAX.basicRate + higher * UK_TAX.higherRate;
  } else {
    const basicBand = UK_TAX.basicRateLimit - pa;
    const higherBand = Math.max(0, UK_TAX.higherRateLimit - UK_TAX.basicRateLimit);
    const additionalBand = Math.max(0, taxable - basicBand - higherBand);
    tax =
      Math.max(0, basicBand) * UK_TAX.basicRate +
      higherBand * UK_TAX.higherRate +
      additionalBand * UK_TAX.additionalRate;
  }

  // National Insurance (Class 1)
  let ni = 0;
  if (gross > UK_NI.primaryThreshold) {
    const mainBand = Math.min(gross, UK_NI.upperEarningsLimit) - UK_NI.primaryThreshold;
    ni += mainBand * UK_NI.mainRate;
  }
  if (gross > UK_NI.upperEarningsLimit) {
    ni += (gross - UK_NI.upperEarningsLimit) * UK_NI.upperRate;
  }

  const totalDeductions = tax + ni;
  const takeHome = gross - totalDeductions;
  const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

  const notes: string[] = [
    `Based on ${UK_TAX.taxYear} England/Wales/Northern Ireland rates. Scottish taxpayers have different income tax bands.`,
    "This is an estimate. It assumes you have a standard tax code (1257L), no other income, and no pension contributions. Your actual take-home may differ.",
  ];

  if (gross > UK_TAX.paReducesAbove) {
    notes.push(
      `Your personal allowance is reduced because your income exceeds £${UK_TAX.paReducesAbove.toLocaleString()}. It tapers by £1 for every £2 earned above this threshold.`,
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

// ---------------------------------------------------------------------------
// US engine
// ---------------------------------------------------------------------------
function calcUS(gross: number): CalcResult {
  const agi = Math.max(0, gross - US_TAX.standardDeduction);

  // Federal income tax (marginal brackets)
  let fedTax = 0;
  for (const band of US_TAX.brackets) {
    if (agi <= band.floor) break;
    const taxable = Math.min(agi, band.ceiling) - band.floor;
    fedTax += taxable * band.rate;
  }

  // FICA
  const ssWages = Math.min(gross, US_FICA.ssWageBase);
  const ssTax = ssWages * US_FICA.ssTaxRate;
  const medicareTax = gross * US_FICA.medicareTaxRate;
  const additionalMedicare =
    gross > US_FICA.additionalMedicareThreshold
      ? (gross - US_FICA.additionalMedicareThreshold) * US_FICA.additionalMedicareRate
      : 0;

  const fica = ssTax + medicareTax + additionalMedicare;
  const totalDeductions = fedTax + fica;
  const takeHome = gross - totalDeductions;
  const effectiveRate = gross > 0 ? (totalDeductions / gross) * 100 : 0;

  const notes: string[] = [
    `Based on ${US_TAX.taxYear} federal rates for a single filer using the standard deduction ($${US_TAX.standardDeduction.toLocaleString()}).`,
    "This estimate does not include state or local income tax, 401(k) contributions, health insurance premiums, or other pre-tax deductions, which would reduce your taxable income and increase take-home pay.",
    "Married filing jointly, head of household, and other filing statuses have different brackets and deductions.",
  ];

  if (gross > US_FICA.ssWageBase) {
    notes.push(
      `Social Security tax stops at the $${US_FICA.ssWageBase.toLocaleString()} wage base. Medicare tax applies to all wages.`,
    );
  }

  return {
    headline: formatCurrency(takeHome, "US"),
    headlineCaption: "Estimated annual take-home pay",
    breakdown: [
      { label: "Gross annual salary", value: formatCurrency(gross, "US") },
      { label: "Standard deduction", value: `−${formatCurrency(US_TAX.standardDeduction, "US")}` },
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

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------
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
