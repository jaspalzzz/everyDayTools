"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import {
  calcAuRedundancy,
  AU_REDUNDANCY_SOURCE,
  type AuEmployerSize,
} from "@/lib/calculators/auRedundancy";

export function AuRedundancyCalculator() {
  const [years, setYears] = useState<number | "">(3);
  const [weeklyPay, setWeeklyPay] = useState<number | "">(1200);
  const [employerSize, setEmployerSize] = useState<AuEmployerSize>("large");

  const result = useMemo(
    () =>
      calcAuRedundancy({
        yearsOfService: Number(years) || 0,
        weeklyPay: Number(weeklyPay) || 0,
        employerSize,
      }),
    [years, weeklyPay, employerSize],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="AU redundancy pay inputs">
        <FieldGrid>
          <NumberField
            id="au-years"
            label="Full years of continuous service"
            value={years}
            onChange={setYears}
            min={0}
            max={50}
            hint="Complete years with the same employer"
          />
          <NumberField
            id="au-weekly-pay"
            label="Weekly base rate of pay"
            value={weeklyPay}
            onChange={setWeeklyPay}
            prefix="A$"
            hint="Base rate only — exclude overtime, allowances and loadings"
          />
        </FieldGrid>
        <SelectField
          id="au-employer-size"
          label="Employer size"
          value={employerSize}
          onChange={(v) => setEmployerSize(v as AuEmployerSize)}
          options={[
            { value: "large", label: "15 or more employees (standard)" },
            { value: "small", label: "Fewer than 15 employees (small business)" },
          ]}
          hint="Small businesses are exempt from NES redundancy pay"
        />
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "NES Redundancy Pay Estimate — Australia",
          intro:
            "This document estimates your minimum redundancy pay entitlement under the National Employment Standards (NES), Fair Work Act 2009 (Cth). The figure shown is the statutory minimum; your modern award or enterprise agreement may provide more.",
          source: AU_REDUNDANCY_SOURCE.label,
          sourceUrl: AU_REDUNDANCY_SOURCE.url,
          effectiveDate: "Fair Work Act 2009 (Cth) s.119",
          inputs: [
            { label: "Years of continuous service", value: String(Number(years) || 0) },
            { label: "Weekly base rate", value: `A$${(Number(weeklyPay) || 0).toLocaleString("en-AU")}` },
            { label: "Employer size", value: employerSize === "large" ? "15+ employees" : "Fewer than 15 employees" },
          ],
        }}
      />
    </div>
  );
}
