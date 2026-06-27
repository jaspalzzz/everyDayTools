"use client";

import { useState, useMemo } from "react";
import { analysePayslip, type DeductionLine } from "@/lib/calculators/payslipAnalyser";
import { ResultPanel } from "@/components/ResultPanel";
import type { CalcResult } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  "income-tax": "Income Tax",
  "national-insurance": "National Insurance",
  pension: "Pension",
  "student-loan": "Student Loan",
  "salary-sacrifice": "Salary Sacrifice",
  "attachment-of-earnings": "Attachment of Earnings",
  "childcare-vouchers": "Childcare Vouchers",
  "cycle-to-work": "Cycle to Work",
  "other-voluntary": "Voluntary Deduction",
  unknown: "Unrecognised",
};

const CATEGORY_COLORS: Record<string, string> = {
  "income-tax": "bg-red-100 text-red-800 border-red-200",
  "national-insurance": "bg-orange-100 text-orange-800 border-orange-200",
  pension: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "student-loan": "bg-blue-100 text-blue-800 border-blue-200",
  "salary-sacrifice": "bg-purple-100 text-purple-800 border-purple-200",
  "attachment-of-earnings": "bg-red-100 text-red-800 border-red-200",
  "childcare-vouchers": "bg-teal-100 text-teal-800 border-teal-200",
  "cycle-to-work": "bg-green-100 text-green-800 border-green-200",
  "other-voluntary": "bg-surface-muted text-ink-soft border-surface-line",
  unknown: "bg-amber-100 text-amber-800 border-amber-200",
};

function NumberInput({
  id, label, value, onChange, hint,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-ink-faint text-sm">£</span>
        <input
          id={id}
          type="number"
          min={0}
          step={0.01}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-surface-line bg-white py-2 pl-7 pr-3 text-sm text-ink focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
        />
      </div>
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

export function PayslipAnalyser() {
  const [grossPay, setGrossPay] = useState("3000");
  const [netPay, setNetPay] = useState("2200");
  const [deductions, setDeductions] = useState<{ label: string; amount: string }[]>([
    { label: "Income Tax", amount: "400" },
    { label: "National Insurance", amount: "280" },
    { label: "Pension", amount: "120" },
  ]);

  const addDeduction = () => setDeductions((d) => [...d, { label: "", amount: "" }]);
  const removeDeduction = (i: number) => setDeductions((d) => d.filter((_, idx) => idx !== i));
  const updateDeduction = (i: number, field: "label" | "amount", value: string) =>
    setDeductions((d) => d.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));

  const analysis = useMemo(() => {
    const parsed: DeductionLine[] = deductions
      .filter((d) => d.label.trim() && d.amount)
      .map((d) => ({ label: d.label.trim(), amount: parseFloat(d.amount) || 0 }));

    return analysePayslip({
      grossPay: parseFloat(grossPay) || 0,
      netPay: parseFloat(netPay) || 0,
      deductions: parsed,
    });
  }, [grossPay, netPay, deductions]);

  const f = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const result: CalcResult = useMemo(
    () => ({
      headline: f(parseFloat(netPay) || 0),
      headlineCaption: analysis.reconciliationOk
        ? "Net pay reconciles with listed deductions"
        : "Net pay check based on the figures entered",
      breakdown: [
        { label: "Gross pay", value: f(parseFloat(grossPay) || 0) },
        { label: "Net pay", value: f(parseFloat(netPay) || 0), emphasis: true },
        { label: "Listed deductions", value: f(analysis.totalDeductions) },
        { label: "Gross minus net", value: f(analysis.impliedDeductions) },
        { label: "Taxable pay estimate", value: f(analysis.taxablePayEstimate) },
      ],
      notes: [
        analysis.reconciliationOk
          ? "The listed deductions reconcile with gross minus net pay within £1."
          : "The listed deductions do not fully reconcile with gross minus net pay; check whether a deduction is missing or a figure has been entered differently from the payslip.",
        "This analyser explains common UK deduction labels and does not replace payroll, HMRC, or employment-law advice.",
      ],
      valid: (parseFloat(grossPay) || 0) > 0 && (parseFloat(netPay) || 0) >= 0,
    }),
    [analysis, grossPay, netPay],
  );

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="rounded-xl border border-surface-line bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-base font-bold text-ink">Enter your payslip details</h2>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberInput id="gross" label="Gross pay (this period)" value={grossPay} onChange={setGrossPay} hint="Before any deductions" />
          <NumberInput id="net" label="Net pay (take-home)" value={netPay} onChange={setNetPay} hint="Amount paid into your bank account" />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-ink">Deductions listed on your payslip</p>
            <button
              onClick={addDeduction}
              className="text-xs font-medium text-brand-600 hover:underline"
            >
              + Add deduction
            </button>
          </div>

          <div className="space-y-2">
            {deductions.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Deduction label (e.g. Income Tax)"
                  value={d.label}
                  onChange={(e) => updateDeduction(i, "label", e.target.value)}
                  className="flex-1 rounded-lg border border-surface-line bg-white px-3 py-2 text-sm text-ink focus:border-brand-600 focus:outline-none"
                />
                <div className="relative w-28">
                  <span className="absolute inset-y-0 left-3 flex items-center text-ink-faint text-sm">£</span>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="0.00"
                    value={d.amount}
                    onChange={(e) => updateDeduction(i, "amount", e.target.value)}
                    className="w-full rounded-lg border border-surface-line bg-white py-2 pl-7 pr-3 text-sm text-ink focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => removeDeduction(i)}
                  aria-label="Remove deduction"
                  className="text-ink-faint hover:text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      {analysis.alerts.length > 0 && (
        <div className="space-y-2">
          {analysis.alerts.map((a, i) => (
            <div
              key={i}
              className={`rounded-xl border p-4 text-sm ${
                a.severity === "error"
                  ? "border-red-200 bg-red-50 text-red-800"
                  : a.severity === "warning"
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-blue-200 bg-blue-50 text-blue-800"
              }`}
            >
              <span className="mr-2">{a.severity === "error" ? "⚠️" : a.severity === "warning" ? "⚡" : "ℹ️"}</span>
              {a.message}
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Gross pay", value: f(parseFloat(grossPay) || 0) },
          { label: "Total deductions", value: f(analysis.totalDeductions), sub: analysis.reconciliationOk ? "✓ reconciled" : "⚠ check totals" },
          { label: "Taxable pay (est.)", value: f(analysis.taxablePayEstimate) },
          { label: "Net pay", value: f(parseFloat(netPay) || 0) },
        ].map(({ label, value, sub }) => (
          <div key={label} className="rounded-xl border border-surface-line bg-surface-muted p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">{label}</p>
            <p className="text-lg font-bold text-ink">{value}</p>
            {sub && <p className={`text-xs mt-1 ${analysis.reconciliationOk ? "text-emerald-600" : "text-amber-600"}`}>{sub}</p>}
          </div>
        ))}
      </div>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Payslip Deduction Analysis",
          intro:
            "This document summarises the payslip figures entered, reconciles gross pay against net pay and listed deductions, and explains common UK deduction categories.",
          source: "GOV.UK — Payslips",
          sourceUrl: "https://www.gov.uk/payslips",
          effectiveDate: "2026-04-06",
          inputs: [
            { label: "Gross pay", value: f(parseFloat(grossPay) || 0) },
            { label: "Net pay", value: f(parseFloat(netPay) || 0) },
            { label: "Listed deductions", value: f(analysis.totalDeductions) },
          ],
        }}
      />

      {/* Deduction explanations */}
      {analysis.deductionsByCategory.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-bold text-ink">What each deduction means</h2>
          {analysis.deductionsByCategory.map((d, i) => (
            <details key={i} className="group rounded-xl border border-surface-line bg-white">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`shrink-0 rounded border px-2 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[d.category]}`}>
                    {CATEGORY_LABELS[d.category]}
                  </span>
                  <span className="text-sm font-medium text-ink truncate">{d.label}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-semibold text-ink text-sm">{f(d.amount)}</span>
                  {d.isPreTax && (
                    <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      pre-tax
                    </span>
                  )}
                  <svg className="h-4 w-4 text-ink-faint transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                </div>
              </summary>
              <div className="border-t border-surface-line px-4 py-3 text-sm text-ink-soft leading-relaxed">
                <p>{d.explanation}</p>
                {d.guideUrl && (
                  <a href={d.guideUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-brand-600 hover:underline text-xs">
                    Official guidance →
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      )}

      <p className="text-xs text-ink-faint border-t border-surface-line pt-4">
        This tool provides general explanations of common UK payslip deductions. It does not account for all edge cases or sector-specific rules. For specific payroll queries, contact your payroll team or{" "}
        <a href="https://www.acas.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">ACAS</a>.
      </p>
    </div>
  );
}
