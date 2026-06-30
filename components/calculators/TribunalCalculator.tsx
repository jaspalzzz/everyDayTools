"use client";

import { useMemo, useState } from "react";
import { NumberField, SelectField, FieldGrid, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcTribunal, TRIBUNAL_SOURCE, type ClaimType, type VentoBand } from "@/lib/calculators/tribunalCompensation";
import { UK_TRIBUNAL } from "@/lib/rates";

const CLAIM_OPTIONS: { value: ClaimType; label: string }[] = [
  { value: "unfair-dismissal", label: "Unfair dismissal" },
  { value: "discrimination",   label: "Discrimination (Equality Act 2010)" },
  { value: "whistleblowing",   label: "Whistleblowing / protected disclosure" },
];

const FAULT_OPTIONS = [
  { value: "0",  label: "None (0%)" },
  { value: "25", label: "Some (25%)" },
  { value: "50", label: "Significant (50%)" },
  { value: "75", label: "Substantial (75%)" },
];

const VENTO_OPTIONS: { value: VentoBand; label: string }[] = [
  { value: "lower",  label: `Lower band (£1,200 – £11,700)` },
  { value: "middle", label: `Middle band (£11,700 – £35,200)` },
  { value: "upper",  label: `Upper band (£35,200 – £58,700)` },
];

export function TribunalCalculator() {
  const [salary, setSalary]     = useState<number | "">(35000);
  const [years, setYears]       = useState<number | "">(3);
  const [age, setAge]           = useState<number | "">(32);
  const [claimType, setClaimType] = useState<ClaimType>("unfair-dismissal");
  const [months, setMonths]     = useState<number | "">(4);
  const [acasBreach, setAcasBreach] = useState(false);
  const [faultPct, setFaultPct] = useState("0");
  const [ventoBand, setVentoBand] = useState<VentoBand>("lower");

  const result = useMemo(
    () =>
      calcTribunal({
        annualSalary:       Number(salary)  || 0,
        yearsOfService:     Number(years)   || 0,
        age:                Number(age)     || 0,
        claimType,
        monthsToFindWork:   Number(months)  || 0,
        acasBreach,
        contributoryFaultPct: Number(faultPct),
        ventoBand: claimType === "discrimination" ? ventoBand : undefined,
      }),
    [salary, years, age, claimType, months, acasBreach, faultPct, ventoBand],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
        <FormPanel label="Tribunal compensation inputs">
          <NumberField
            id="salary"
            label="Gross annual salary"
            value={salary}
            onChange={setSalary}
            prefix="£"
            hint="Your salary at time of dismissal"
          />
          <FieldGrid>
            <NumberField id="years" label="Years of service" value={years} onChange={setYears} min={0} max={50} hint="Complete years" />
            <NumberField id="age"   label="Your age"         value={age}   onChange={setAge}   min={16} max={100} />
          </FieldGrid>

          <SelectField
            id="claim"
            label="Type of claim"
            value={claimType}
            onChange={(v) => setClaimType(v as ClaimType)}
            options={CLAIM_OPTIONS}
          />

          {claimType === "discrimination" && (
            <SelectField
              id="vento"
              label="Injury to feelings — Vento band"
              value={ventoBand}
              onChange={(v) => setVentoBand(v as VentoBand)}
              options={VENTO_OPTIONS}
              hint="Lower = less serious; Upper = most serious / sustained campaign"
            />
          )}

          <NumberField
            id="months"
            label="Months to find equivalent work"
            value={months}
            onChange={setMonths}
            min={1}
            max={36}
            suffix="months"
            hint="Your best estimate. This drives the compensatory award."
          />

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Employer failed ACAS Code?</span>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={acasBreach}
                onChange={(e) => setAcasBreach(e.target.checked)}
                className="h-4 w-4 rounded border-surface-line text-brand-600 focus:ring-brand-600"
              />
              <span className="text-sm text-ink-soft">
                Yes — employer did not follow a fair disciplinary/grievance process (adds up to 25%)
              </span>
            </label>
          </div>

          <SelectField
            id="fault"
            label="Your contributory fault"
            value={faultPct}
            onChange={setFaultPct}
            options={FAULT_OPTIONS}
            hint="Tribunal reduces the award by your share of responsibility"
          />
        </FormPanel>

        <div style={{ position: "sticky", top: 88 }}>
        <ResultPanel
          result={result}
          letterMeta={{
            title: "Employment Tribunal — Compensation Estimate",
            intro:
              "This document estimates the compensation a UK Employment Tribunal might award, based on the details entered. It covers the basic award, compensatory award, ACAS uplift, injury to feelings (where applicable), and any contributory fault reduction.",
            source: TRIBUNAL_SOURCE.label,
            sourceUrl: TRIBUNAL_SOURCE.url,
            effectiveDate: UK_TRIBUNAL.effectiveDate,
            inputs: [
              { label: "Annual salary",     value: `£${(Number(salary) || 0).toLocaleString()}` },
              { label: "Years of service",  value: String(Number(years) || 0) },
              { label: "Age",               value: String(Number(age) || 0) },
              { label: "Claim type",        value: CLAIM_OPTIONS.find((o) => o.value === claimType)?.label ?? claimType },
              { label: "Months to find work", value: String(Number(months) || 0) },
              { label: "ACAS breach",       value: acasBreach ? "Yes" : "No" },
              { label: "Contributory fault", value: `${faultPct}%` },
            ],
          }}
        />
        </div>
      </div>

      {/* Cap notice */}
      <div className="rounded-xl border border-surface-line bg-surface-muted p-4">
        <p className="text-xs leading-relaxed text-ink-faint">
          <strong className="text-ink-soft">Compensatory award cap:</strong>{" "}
          {claimType === "unfair-dismissal"
            ? `£${UK_TRIBUNAL.compensatoryAwardCap.toLocaleString()} or 52 weeks' gross pay — whichever is lower.`
            : "No cap applies to discrimination or whistleblowing compensatory awards — all financial loss can be recovered."}
          {" "}Vento bands updated each April per Employment Tribunal Presidential Guidance.
        </p>
      </div>
    </div>
  );
}
