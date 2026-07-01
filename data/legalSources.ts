/**
 * Primary legal and regulatory sources for every calculator and guide on the site.
 * Keyed by tool slug (matches data/tools.ts) or page slug for guides/situations.
 *
 * Rules:
 * - Only government / official regulatory domains (legislation.gov.uk, gov.uk,
 *   dol.gov, irs.gov, fairwork.gov.au, canada.ca, legislation.gov.au, etc.)
 * - List the specific legislation first, then guidance, then regulator/calculator
 * - Max 4 sources per page — prioritise the most authoritative
 */

import type { LegalSource } from "@/lib/types";

export const LEGAL_SOURCES: Record<string, LegalSource[]> = {

  /* ─── UK SEPARATION ─────────────────────────────────────── */

  "redundancy-pay-calculator": [
    {
      label: "Employment Rights Act 1996",
      section: "ss.135–154 (Redundancy payments)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/part/XI",
      type: "legislation",
    },
    {
      label: "GOV.UK — Statutory redundancy pay",
      url: "https://www.gov.uk/redundancy-your-rights/redundancy-pay",
      type: "guidance",
    },
    {
      label: "GOV.UK — Official redundancy pay calculator",
      url: "https://www.gov.uk/calculate-your-redundancy-pay",
      type: "calculator",
    },
  ],

  "notice-period-calculator": [
    {
      label: "Employment Rights Act 1996",
      section: "s.86 (Minimum notice periods)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/section/86",
      type: "legislation",
    },
    {
      label: "GOV.UK — Notice periods",
      url: "https://www.gov.uk/staff-redundant/giving-staff-notice",
      type: "guidance",
    },
    {
      label: "ACAS — Notice and final pay",
      url: "https://www.acas.org.uk/notice-periods",
      type: "regulator",
    },
  ],

  "garden-leave-calculator": [
    {
      label: "Employment Rights Act 1996",
      section: "s.86 (Minimum notice) — garden leave derived from common law",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/section/86",
      type: "legislation",
    },
  ],

  "employer-redundancy-cost-calculator": [
    {
      label: "Employment Rights Act 1996",
      section: "ss.135–154 (Redundancy payments)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/part/XI",
      type: "legislation",
    },
    {
      label: "GOV.UK — Statutory redundancy pay",
      url: "https://www.gov.uk/redundancy-your-rights/redundancy-pay",
      type: "guidance",
    },
    {
      label: "GOV.UK — Making staff redundant (employer guide)",
      url: "https://www.gov.uk/staff-redundant",
      type: "guidance",
    },
  ],

  "employer-notice-pay-calculator": [
    {
      label: "Employment Rights Act 1996",
      section: "ss.86–91 (Notice and garden leave)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/section/86",
      type: "legislation",
    },
    {
      label: "GOV.UK — Giving staff notice pay",
      url: "https://www.gov.uk/staff-redundant/giving-staff-notice",
      type: "guidance",
    },
  ],

  /* ─── UK LEAVE & ENTITLEMENTS ───────────────────────────── */

  "holiday-entitlement-calculator": [
    {
      label: "Working Time Regulations 1998",
      section: "reg.13 (Annual leave entitlement)",
      url: "https://www.legislation.gov.uk/uksi/1998/1833/regulation/13",
      type: "legislation",
    },
    {
      label: "GOV.UK — Holiday entitlement",
      url: "https://www.gov.uk/holiday-entitlement-rights",
      type: "guidance",
    },
    {
      label: "GOV.UK — Official holiday entitlement calculator",
      url: "https://www.gov.uk/calculate-your-holiday-entitlement",
      type: "calculator",
    },
  ],

  "statutory-sick-pay-calculator": [
    {
      label: "Employment Rights Act 1996 / ERA 2025",
      section: "As amended by Employment Rights Act 2025 (effective 6 April 2026)",
      url: "https://www.legislation.gov.uk/ukpga/2025/15",
      type: "legislation",
    },
    {
      label: "Social Security Contributions & Benefits Act 1992",
      section: "ss.151–163 (Statutory sick pay)",
      url: "https://www.legislation.gov.uk/ukpga/1992/4/part/XI",
      type: "legislation",
    },
    {
      label: "GOV.UK — Statutory Sick Pay",
      url: "https://www.gov.uk/statutory-sick-pay",
      type: "guidance",
    },
    {
      label: "ACAS — SSP eligibility (day-one pay, no earnings threshold from 6 April 2026)",
      url: "https://www.acas.org.uk/checking-sick-pay/statutory-sick-pay-ssp",
      type: "regulator",
    },
  ],

  "maternity-pay-calculator": [
    {
      label: "Social Security Contributions & Benefits Act 1992",
      section: "ss.164–171 (Statutory maternity pay)",
      url: "https://www.legislation.gov.uk/ukpga/1992/4/part/XII",
      type: "legislation",
    },
    {
      label: "Statutory Maternity Pay (General) Regulations 1986",
      url: "https://www.legislation.gov.uk/uksi/1986/1960/contents",
      type: "legislation",
    },
    {
      label: "GOV.UK — Maternity pay and leave",
      url: "https://www.gov.uk/maternity-pay-leave",
      type: "guidance",
    },
  ],

  "paternity-pay-calculator": [
    {
      label: "Social Security Contributions & Benefits Act 1992",
      section: "ss.171ZA–171ZJ (Statutory paternity pay)",
      url: "https://www.legislation.gov.uk/ukpga/1992/4/part/XIIZA",
      type: "legislation",
    },
    {
      label: "GOV.UK — Paternity pay and leave",
      url: "https://www.gov.uk/paternity-pay-leave",
      type: "guidance",
    },
  ],

  "adoption-pay-calculator": [
    {
      label: "Social Security Contributions & Benefits Act 1992",
      section: "ss.171ZL–171ZT (Statutory adoption pay)",
      url: "https://www.legislation.gov.uk/ukpga/1992/4/part/XIIZB",
      type: "legislation",
    },
    {
      label: "GOV.UK — Adoption pay and leave",
      url: "https://www.gov.uk/adoption-pay-leave",
      type: "guidance",
    },
  ],

  "shared-parental-leave-calculator": [
    {
      label: "Children and Families Act 2014",
      section: "Part 7 (Shared parental leave)",
      url: "https://www.legislation.gov.uk/ukpga/2014/6/part/7",
      type: "legislation",
    },
    {
      label: "GOV.UK — Shared Parental Leave and Pay",
      url: "https://www.gov.uk/shared-parental-leave-and-pay",
      type: "guidance",
    },
  ],

  /* ─── UK PAY & TAX ──────────────────────────────────────── */

  "take-home-pay-calculator": [
    {
      label: "Income Tax (Earnings and Pensions) Act 2003",
      url: "https://www.legislation.gov.uk/ukpga/2003/1/contents",
      type: "legislation",
    },
    {
      label: "Social Security Contributions & Benefits Act 1992",
      section: "Schedule 1 (NI contributions)",
      url: "https://www.legislation.gov.uk/ukpga/1992/4/schedule/1",
      type: "legislation",
    },
    {
      label: "HMRC — Rates and thresholds for 2026/27",
      url: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax",
      type: "guidance",
    },
  ],

  "self-employment-tax-calculator": [
    {
      label: "Social Security Contributions & Benefits Act 1992",
      section: "ss.11–15 (Class 2 & 4 National Insurance)",
      url: "https://www.legislation.gov.uk/ukpga/1992/4/part/I",
      type: "legislation",
    },
    {
      label: "HMRC — Self-employed National Insurance rates",
      url: "https://www.gov.uk/self-employed-national-insurance-rates",
      type: "guidance",
    },
    {
      label: "IRS — Self-employment tax (SE tax)",
      url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
      type: "guidance",
    },
  ],

  "ir35-calculator": [
    {
      label: "Income Tax (Earnings and Pensions) Act 2003",
      section: "Chapter 8 — off-payroll working rules (IR35)",
      url: "https://www.legislation.gov.uk/ukpga/2003/1/part/2/chapter/8",
      type: "legislation",
    },
    {
      label: "HMRC — Off-payroll working rules (IR35)",
      url: "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35",
      type: "guidance",
    },
    {
      label: "HMRC — Check Employment Status for Tax (CEST)",
      url: "https://www.gov.uk/guidance/check-employment-status-for-tax",
      type: "calculator",
    },
  ],

  "payslip-analyser": [
    {
      label: "Employment Rights Act 1996",
      section: "ss.8–10 (Itemised pay statements)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/section/8",
      type: "legislation",
    },
    {
      label: "GOV.UK — Understanding your payslip",
      url: "https://www.gov.uk/payslips",
      type: "guidance",
    },
    {
      label: "HMRC — Income Tax and NI deductions",
      url: "https://www.gov.uk/income-tax",
      type: "guidance",
    },
  ],

  "bonus-tax-calculator": [
    {
      label: "Income Tax (Earnings and Pensions) Act 2003",
      section: "s.62 (Earnings definition includes bonus)",
      url: "https://www.legislation.gov.uk/ukpga/2003/1/section/62",
      type: "legislation",
    },
    {
      label: "HMRC — Tax on bonuses",
      url: "https://www.gov.uk/income-tax",
      type: "guidance",
    },
    {
      label: "IRS — Publication 15 (flat 22% supplemental wage withholding rate)",
      url: "https://www.irs.gov/publications/p15",
      type: "guidance",
    },
  ],

  "day-rate-calculator": [
    {
      label: "Income Tax (Earnings and Pensions) Act 2003",
      url: "https://www.legislation.gov.uk/ukpga/2003/1/contents",
      type: "legislation",
    },
    {
      label: "HMRC — Rates and allowances 2026/27",
      url: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax",
      type: "guidance",
    },
  ],

  "salary-to-hourly-calculator": [
    {
      label: "GOV.UK — National Minimum Wage and pay calculations",
      url: "https://www.gov.uk/national-minimum-wage",
      type: "guidance",
    },
    {
      label: "DOL — Wages and the Fair Labor Standards Act",
      url: "https://www.dol.gov/agencies/whd/flsa",
      type: "guidance",
    },
  ],

  "pay-rise-calculator": [
    {
      label: "HMRC — Income Tax rates and allowances",
      url: "https://www.gov.uk/income-tax-rates",
      type: "guidance",
    },
    {
      label: "IRS — Federal income tax rates",
      url: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
      type: "guidance",
    },
  ],

  "pro-rata-salary-calculator": [
    {
      label: "GOV.UK — Part-time workers' rights",
      url: "https://www.gov.uk/part-time-worker-rights",
      type: "guidance",
    },
    {
      label: "GOV.UK — Holiday entitlement for irregular hours",
      url: "https://www.gov.uk/holiday-entitlement-rights",
      type: "guidance",
    },
  ],

  "working-days-calculator": [
    {
      label: "GOV.UK — Bank holidays in England and Wales",
      url: "https://www.gov.uk/bank-holidays",
      type: "guidance",
    },
    {
      label: "DOL — State labor offices",
      url: "https://www.dol.gov/agencies/whd/state/contacts",
      type: "guidance",
    },
  ],

  /* ─── US CALCULATORS ────────────────────────────────────── */

  "unemployment-benefit-calculator": [
    {
      label: "Social Security Act",
      section: "Title III (Grants to states for unemployment compensation)",
      url: "https://www.ssa.gov/OP_Home/ssact/title03/0300.htm",
      type: "legislation",
    },
    {
      label: "DOL — Unemployment Insurance",
      url: "https://www.dol.gov/general/topic/unemployment-insurance",
      type: "regulator",
    },
  ],

  "final-paycheck-deadline-calculator": [
    {
      label: "Fair Labor Standards Act — state law applies on final pay timing",
      url: "https://www.dol.gov/agencies/whd/flsa",
      type: "legislation",
    },
    {
      label: "DOL — Final pay state law comparison",
      url: "https://www.dol.gov/agencies/whd/state/payday",
      type: "guidance",
    },
  ],

  "pto-payout-calculator": [
    {
      label: "DOL — Vacation / PTO payout rules",
      url: "https://www.dol.gov/agencies/whd/fact-sheets/56-vacation",
      type: "guidance",
    },
  ],

  "take-home-overtime-calculator": [
    {
      label: "Fair Labor Standards Act",
      section: "§207 (Maximum hours / overtime requirement)",
      url: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title29-section207",
      type: "legislation",
    },
    {
      label: "DOL — Overtime pay",
      url: "https://www.dol.gov/agencies/whd/overtime",
      type: "guidance",
    },
  ],

  /* ─── AUSTRALIA ─────────────────────────────────────────── */

  "au-redundancy-pay-calculator": [
    {
      label: "Fair Work Act 2009",
      section: "s.119 (Redundancy pay entitlement)",
      url: "https://www.legislation.gov.au/Details/C2009A00028/Html/Volume_1#_Toc279384854",
      type: "legislation",
    },
    {
      label: "Fair Work Ombudsman — Redundancy pay",
      url: "https://www.fairwork.gov.au/ending-employment/redundancy/redundancy-pay-and-entitlements",
      type: "regulator",
    },
  ],

  "au-notice-period-calculator": [
    {
      label: "Fair Work Act 2009",
      section: "s.117 (Requirement to give notice of termination)",
      url: "https://www.legislation.gov.au/Details/C2009A00028/Html/Volume_1#_Toc279384852",
      type: "legislation",
    },
    {
      label: "Fair Work Ombudsman — Notice of termination",
      url: "https://www.fairwork.gov.au/ending-employment/notice-and-final-pay",
      type: "regulator",
    },
  ],

  "au-annual-leave-calculator": [
    {
      label: "Fair Work Act 2009",
      section: "s.87 (Annual leave entitlement)",
      url: "https://www.legislation.gov.au/Details/C2009A00028/Html/Volume_1#_Toc279384640",
      type: "legislation",
    },
    {
      label: "Fair Work Ombudsman — Annual leave",
      url: "https://www.fairwork.gov.au/leave/annual-leave",
      type: "regulator",
    },
  ],

  /* ─── CANADA ────────────────────────────────────────────── */

  "severance-pay-calculator": [
    {
      label: "Canada Labour Code",
      section: "Part III — Standard hours, wages, vacations and holidays",
      url: "https://laws-lois.justice.gc.ca/eng/acts/L-2/page-1.html",
      type: "legislation",
    },
    {
      label: "Canada.ca — Severance pay",
      url: "https://www.canada.ca/en/employment-social-development/services/labour-standards/reports/severance-pay.html",
      type: "guidance",
    },
  ],

  "settlement-agreement-calculator": [
    {
      label: "Employment Rights Act 1996",
      section: "s.203 (Settlement agreements — statutory provisions)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/section/203",
      type: "legislation",
    },
    {
      label: "Income Tax (Earnings and Pensions) Act 2003",
      section: "s.403 — £30,000 termination payment exemption",
      url: "https://www.legislation.gov.uk/ukpga/2003/1/section/403",
      type: "legislation",
    },
    {
      label: "GOV.UK — Settlement agreements",
      url: "https://www.gov.uk/negotiate-settle-employment-dispute",
      type: "guidance",
    },
    {
      label: "ACAS — Settlement agreements guide",
      url: "https://www.acas.org.uk/settlement-agreements",
      type: "regulator",
    },
  ],

  "tribunal-compensation-calculator": [
    {
      label: "Employment Rights Act 1996",
      section: "ss.119–124 (Basic award & compensatory award)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/section/119",
      type: "legislation",
    },
    {
      label: "Equality Act 2010",
      section: "s.124 (Remedies — injury to feelings, Vento bands)",
      url: "https://www.legislation.gov.uk/ukpga/2010/15/section/124",
      type: "legislation",
    },
    {
      label: "GOV.UK — Employment Tribunal decisions and awards",
      url: "https://www.gov.uk/employment-tribunals/what-you-can-claim",
      type: "guidance",
    },
    {
      label: "ACAS — Code of Practice on Disciplinary and Grievance Procedures",
      url: "https://www.acas.org.uk/acas-code-of-practice-for-disciplinary-and-grievance-procedures",
      type: "regulator",
    },
  ],

  /* ─── SITUATION PAGES ───────────────────────────────────── */

  "made-redundant-uk": [
    {
      label: "Employment Rights Act 1996",
      section: "Part XI (Redundancy)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/part/XI",
      type: "legislation",
    },
    {
      label: "GOV.UK — Redundancy: your rights",
      url: "https://www.gov.uk/redundancy-your-rights",
      type: "guidance",
    },
    {
      label: "ACAS — Redundancy",
      url: "https://www.acas.org.uk/redundancy",
      type: "regulator",
    },
  ],

  "unfair-dismissal-uk": [
    {
      label: "Employment Rights Act 1996",
      section: "Part X (Unfair dismissal, ss.94–134A)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/part/X",
      type: "legislation",
    },
    {
      label: "GOV.UK — Dismissal: your rights",
      url: "https://www.gov.uk/dismissal",
      type: "guidance",
    },
    {
      label: "ACAS — Dismissal",
      url: "https://www.acas.org.uk/dismissal",
      type: "regulator",
    },
  ],

  "constructive-dismissal-uk": [
    {
      label: "Employment Rights Act 1996",
      section: "s.95(1)(c) — constructive dismissal definition",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/section/95",
      type: "legislation",
    },
    {
      label: "GOV.UK — Constructive dismissal",
      url: "https://www.gov.uk/dismissal/constructive-and-wrongful-dismissal",
      type: "guidance",
    },
    {
      label: "ACAS — Constructive dismissal",
      url: "https://www.acas.org.uk/constructive-dismissal",
      type: "regulator",
    },
  ],

  "sacked-while-pregnant-uk": [
    {
      label: "Equality Act 2010",
      section: "s.18 (Pregnancy and maternity discrimination)",
      url: "https://www.legislation.gov.uk/ukpga/2010/15/section/18",
      type: "legislation",
    },
    {
      label: "Employment Rights Act 1996",
      section: "s.99 (Automatic unfair dismissal — maternity)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/section/99",
      type: "legislation",
    },
    {
      label: "GOV.UK — Dismissal during pregnancy or maternity leave",
      url: "https://www.gov.uk/dismissal/being-dismissed",
      type: "guidance",
    },
  ],

  "workplace-discrimination-uk": [
    {
      label: "Equality Act 2010",
      section: "ss.4–12 (Protected characteristics) & ss.13–27 (Prohibited conduct)",
      url: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
      type: "legislation",
    },
    {
      label: "Equality and Human Rights Commission",
      url: "https://www.equalityhumanrights.com/guidance/employment",
      type: "regulator",
    },
    {
      label: "GOV.UK — Discrimination at work",
      url: "https://www.gov.uk/discrimination-your-rights",
      type: "guidance",
    },
  ],

  "employer-gone-bust": [
    {
      label: "Employment Rights Act 1996",
      section: "ss.166–182 (Insolvency of employer)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/part/XII",
      type: "legislation",
    },
    {
      label: "Insolvency Act 1986",
      url: "https://www.legislation.gov.uk/ukpga/1986/45/contents",
      type: "legislation",
    },
    {
      label: "GOV.UK — Claim money if your employer has gone bust",
      url: "https://www.gov.uk/your-rights-if-your-employer-is-insolvent",
      type: "guidance",
    },
  ],

  "leaving-job-uk": [
    {
      label: "Employment Rights Act 1996",
      section: "s.86 (Notice periods) & s.13 (Deductions from wages)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/section/86",
      type: "legislation",
    },
    {
      label: "GOV.UK — Leaving a job",
      url: "https://www.gov.uk/handing-in-your-notice",
      type: "guidance",
    },
  ],

  "employer-not-paying": [
    {
      label: "Employment Rights Act 1996",
      section: "ss.13–27 (Protection of wages)",
      url: "https://www.legislation.gov.uk/ukpga/1996/18/part/II",
      type: "legislation",
    },
    {
      label: "GOV.UK — If you're not paid the right amount",
      url: "https://www.gov.uk/recover-debt-money-owed-you",
      type: "guidance",
    },
    {
      label: "ACAS — Chasing payment",
      url: "https://www.acas.org.uk/if-your-employer-has-not-paid-you",
      type: "regulator",
    },
  ],

  "us-wrongful-termination": [
    {
      label: "Title VII of the Civil Rights Act 1964",
      url: "https://www.eeoc.gov/statutes/title-vii-civil-rights-act-1964",
      type: "legislation",
    },
    {
      label: "Americans with Disabilities Act 1990",
      url: "https://www.eeoc.gov/statutes/americans-disabilities-act-1990",
      type: "legislation",
    },
    {
      label: "EEOC — Wrongful termination / retaliation",
      url: "https://www.eeoc.gov/retaliation",
      type: "regulator",
    },
  ],
};
