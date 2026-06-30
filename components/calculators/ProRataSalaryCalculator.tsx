"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField, FormPanel } from "../fields";
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Pro-rata salary inputs">
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
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Pro-rata Salary — Summary",
          intro:
            "This document scales a full-time salary to your part-time hours, showing your pro-rata annual and monthly pay.",
          source: PRO_RATA_SOURCE.label,
          sourceUrl: PRO_RATA_SOURCE.url,
          inputs: [
            { label: "Country", value: COUNTRIES[country].label },
            { label: "Full-time salary", value: (Number(fullTimeSalary) || 0).toLocaleString() },
            { label: "Full-time hours", value: String(Number(fullTimeHours) || 0) },
            { label: "Your hours", value: String(Number(yourHours) || 0) },
          ],
        }}
      />
      </div>
    </div>
  );
}
