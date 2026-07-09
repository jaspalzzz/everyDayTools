/**
 * UK Payslip Deduction Analyser
 * Identifies and explains common payslip deduction types. Detects likely errors.
 */

export interface DeductionLine {
  label: string;
  amount: number;
}

export interface PayslipInputs {
  grossPay: number;
  netPay: number;
  deductions: DeductionLine[];
}

export type DeductionCategory =
  | "income-tax"
  | "national-insurance"
  | "pension"
  | "student-loan"
  | "salary-sacrifice"
  | "attachment-of-earnings"
  | "childcare-vouchers"
  | "cycle-to-work"
  | "other-voluntary"
  | "unknown";

export interface AnalysedDeduction {
  label: string;
  amount: number;
  category: DeductionCategory;
  explanation: string;
  isPreTax: boolean;
  guideUrl?: string;
}

export interface PayslipAlert {
  severity: "error" | "warning" | "info";
  message: string;
}

export interface PayslipAnalysis {
  totalDeductions: number;
  impliedDeductions: number; // gross - net
  reconciliationOk: boolean;
  deductionsByCategory: AnalysedDeduction[];
  alerts: PayslipAlert[];
  taxablePayEstimate: number;
}

const LABEL_MAP: { pattern: RegExp; category: DeductionCategory; isPreTax: boolean; explanation: string; guideUrl?: string }[] = [
  {
    pattern: /income.?tax|paye|tax$/i,
    category: "income-tax",
    isPreTax: false,
    explanation: "Income tax deducted through PAYE (Pay As You Earn). HMRC calculates the amount using your tax code. The standard code for 2026/27 is 1257L, giving a Personal Allowance of £12,570. Check your payslip's tax code is correct — an emergency code (W1, M1, or OT) means HMRC has not yet sent your employer your correct code.",
    guideUrl: "https://www.gov.uk/income-tax-rates",
  },
  {
    pattern: /national.?ins|n\.?i\.?c?|employee.?ni/i,
    category: "national-insurance",
    isPreTax: false,
    explanation: "Employee National Insurance Contributions (NICs). For 2026/27, Class 1 employee NICs are charged at 8% on earnings between the Primary Threshold (£12,570/yr) and the Upper Earnings Limit (£50,270/yr), and 2% above the UEL. Check the rate on your payslip — anything above 8% on main earnings may be an error.",
    guideUrl: "https://www.gov.uk/national-insurance/how-much-you-pay",
  },
  {
    pattern: /pension|auto.?enrol|workplace.?pension|nest|peoples.?pension/i,
    category: "pension",
    isPreTax: true,
    explanation: "Auto-enrolment workplace pension contribution. The legal minimum employee contribution is 5% of qualifying earnings (earnings between £6,240 and £50,270 per year). Your employer must contribute at least 3%. Many employers offer enhanced contributions — check your contract. Pension contributions are taken from gross pay before income tax, reducing your tax bill.",
    guideUrl: "https://www.gov.uk/workplace-pensions/what-you-employer-must-do",
  },
  {
    pattern: /student.?loan|plan.?[123]|postgrad/i,
    category: "student-loan",
    isPreTax: false,
    explanation: "Student loan repayment deducted through PAYE. The repayment rate and threshold depend on your plan: Plan 1 (pre-2012 English/Welsh loans): 9% above £26,900/yr. Plan 2 (post-2012 English/Welsh): 9% above £29,385/yr. Plan 4 (Scottish): 9% above £33,795/yr. Postgraduate Loan: 6% above £21,000/yr. You repay nothing if your income is below the threshold.",
    guideUrl: "https://www.gov.uk/repaying-your-student-loan/when-you-start-repaying",
  },
  {
    pattern: /salary.?sacrifice|sal.?sac|ss:/i,
    category: "salary-sacrifice",
    isPreTax: true,
    explanation: "Salary sacrifice reduces your gross pay before tax and NI are calculated, saving you income tax and NI on the sacrificed amount. Common uses: pension contributions, electric vehicle (EV) leases, childcare vouchers (closed to new entrants), and cycle-to-work schemes. Your take-home pay is reduced, but your tax and NI bills fall by more than the sacrifice amount.",
  },
  {
    pattern: /attach|aoe|court.?order|maintenance/i,
    category: "attachment-of-earnings",
    isPreTax: false,
    explanation: "Attachment of Earnings Order (AEO): a court-ordered deduction your employer is legally required to make from your pay. This is used to collect debts (council tax arrears, CCJs, child support maintenance). Your employer has no discretion — they must deduct the amount specified in the court order. If you believe the order is wrong, contact the court or the creditor directly.",
  },
  {
    pattern: /childcare.?voucher|carer.?voucher/i,
    category: "childcare-vouchers",
    isPreTax: true,
    explanation: "Childcare vouchers (closed to new entrants since October 2018). Existing scheme members can continue. Basic-rate taxpayers can take up to £55/week (£243/month) in childcare vouchers free of income tax and NI. Higher-rate taxpayers can take £28/week, additional-rate taxpayers £25/week. If you joined after October 2018, you should use Tax-Free Childcare instead.",
  },
  {
    pattern: /cycle|bike.?to.?work|cyclescheme/i,
    category: "cycle-to-work",
    isPreTax: true,
    explanation: "Cycle-to-work scheme: salary sacrifice used to pay for a bicycle and/or cycling equipment through your employer. The sacrifice reduces your gross pay, saving income tax and NI on the amount. There is no cap on the scheme value, though most providers set practical limits. At the end of the loan period you typically buy the bike at its fair market value.",
  },
  {
    pattern: /health|dental|medical|bupa|axa|aviva.*(health|med)/i,
    category: "other-voluntary",
    isPreTax: false,
    explanation: "Private medical or dental insurance premium deducted from net pay. If this is employer-provided benefit-in-kind (BIK) insurance, the taxable value will appear on your P11D and you will pay income tax on it — but the premium itself is usually not deducted from your payslip. If you see a deduction here, it is likely an employee-funded top-up or a voluntary scheme.",
  },
];

function categorise(line: DeductionLine): AnalysedDeduction {
  for (const entry of LABEL_MAP) {
    if (entry.pattern.test(line.label)) {
      return {
        label: line.label,
        amount: line.amount,
        category: entry.category,
        explanation: entry.explanation,
        isPreTax: entry.isPreTax,
        guideUrl: entry.guideUrl,
      };
    }
  }
  return {
    label: line.label,
    amount: line.amount,
    category: "unknown",
    isPreTax: false,
    explanation: `This deduction ("${line.label}") was not automatically recognised. It could be a voluntary deduction agreed with your employer (e.g. equipment hire, canteen meals, trade union subscription) or a payroll error. If you did not agree to it in writing, query it with your payroll team — unauthorised deductions from wages are unlawful under the Employment Rights Act 1996 s.13.`,
  };
}

export function analysePayslip(inputs: PayslipInputs): PayslipAnalysis {
  const { grossPay, netPay, deductions } = inputs;

  const analysed = deductions.map(categorise);
  const totalDeductions = deductions.reduce((s, d) => s + d.amount, 0);
  const impliedDeductions = grossPay - netPay;
  const diff = Math.abs(totalDeductions - impliedDeductions);
  const reconciliationOk = grossPay > 0 && netPay > 0 && diff < 1;

  const preTaxTotal = analysed.filter((d) => d.isPreTax).reduce((s, d) => s + d.amount, 0);
  const taxablePayEstimate = Math.max(0, grossPay - preTaxTotal);

  const alerts: PayslipAlert[] = [];

  if (grossPay > 0 && netPay > 0 && !reconciliationOk) {
    alerts.push({
      severity: "warning",
      message: `The listed deductions total £${totalDeductions.toFixed(2)} but gross minus net is £${impliedDeductions.toFixed(2)} — a difference of £${diff.toFixed(2)}. There may be unlisted deductions, or the gross/net figures entered are incorrect.`,
    });
  }

  const niDeduction = analysed.find((d) => d.category === "national-insurance");
  if (niDeduction && grossPay > 0) {
    const annualised = grossPay * 12;
    const expectedRate = annualised > 50270 ? 0.08 : annualised > 12570 ? 0.08 : 0;
    const actualRate = niDeduction.amount / grossPay;
    if (actualRate > expectedRate + 0.03) {
      alerts.push({
        severity: "warning",
        message: `Your NI deduction (£${niDeduction.amount.toFixed(2)}) appears higher than expected for a gross of £${grossPay.toFixed(2)}. The standard 2026/27 employee NI rate is 8%. Contact your payroll team to check your NI category letter.`,
      });
    }
  }

  const unknowns = analysed.filter((d) => d.category === "unknown");
  if (unknowns.length > 0) {
    alerts.push({
      severity: "info",
      message: `${unknowns.length} deduction${unknowns.length > 1 ? "s" : ""} could not be automatically categorised: ${unknowns.map((d) => `"${d.label}"`).join(", ")}. Review these with your payroll team.`,
    });
  }

  if (grossPay > 0 && netPay > 0 && netPay / grossPay < 0.45) {
    alerts.push({
      severity: "warning",
      message: `Your net pay is less than 45% of gross pay, which is unusually high deductions. Double-check your tax code is correct and that no emergency or incorrect tax code is being applied.`,
    });
  }

  return {
    totalDeductions,
    impliedDeductions,
    reconciliationOk,
    deductionsByCategory: analysed,
    alerts,
    taxablePayEstimate,
  };
}
