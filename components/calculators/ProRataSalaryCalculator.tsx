"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { PRO_RATA_SOURCE, calcProRata } from "@/lib/calculators/proRataSalary";
import { COUNTRIES, type CountryCode } from "@/lib/types";

export function ProRataSalaryCalculator() {
  const [country, setCountry] = useState<CountryCode>("UK");
  const [fullTimeSalary, setFullTimeSalary] = useState<number | "">(50000);
  const [fullTimeHours, setFullTimeHours] = useState<number | "">(40);
  const [yourHours, setYourHours] = useState<number | "">(24);

  const result = useMemo(
    () =>
      calcProRata({
        country,
        fullTimeSalary: Number(fullTimeSalary) || 0,
        fullTimeHours: Number(fullTimeHours) || 0,
        yourHours: Number(yourHours) || 0,
      }),
    [country, fullTimeSalary, fullTimeHours, yourHours],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Pro-rata salary inputs">
        <SelectField
          id="country"
          label="Country"
          value={country}
          onChange={(v) => setCountry(v as CountryCode)}
          options={Object.values(COUNTRIES).map((c) => ({ value: c.code, label: c.label }))}
        />
        <NumberField
          id="full-time-salary"
          label="Full-time salary"
          value={fullTimeSalary}
          onChange={setFullTimeSalary}
          step={1000}
        />
        <FieldGrid>
          <NumberField
            id="full-time-hours"
            label="Full-time hours"
            value={fullTimeHours}
            onChange={setFullTimeHours}
            suffix="hrs"
            max={168}
          />
          <NumberField
            id="your-hours"
            label="Your hours"
            value={yourHours}
            onChange={setYourHours}
            suffix="hrs"
            max={168}
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Pro-rata Salary — Summary",
          intro:
            "This document scales a full-time salary to your part-time hours, showing your pro-rata annual and monthly pay.",
          source: PRO_RATA_SOURCE.label,
        }}
      />
    </div>
  );
}
