"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import {
  calcSeverance,
  SEVERANCE_SOURCE,
  type SeveranceCountry,
} from "@/lib/calculators/severance";

const CURRENCY_PREFIX: Record<SeveranceCountry, string> = { US: "$", UK: "£", CA: "$" };

export function SeveranceCalculator() {
  const [country, setCountry] = useState<SeveranceCountry>("US");
  const [years, setYears] = useState<number | "">(5);
  const [weeklyPay, setWeeklyPay] = useState<number | "">(1200);
  const [weeksPerYear, setWeeksPerYear] = useState<number | "">(1);

  const result = useMemo(
    () =>
      calcSeverance({
        country,
        yearsOfService: Number(years) || 0,
        weeklyPay: Number(weeklyPay) || 0,
        weeksPerYear: Number(weeksPerYear) || 1,
      }),
    [country, years, weeklyPay, weeksPerYear],
  );

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Severance pay inputs">
        <SelectField
          id="sev-country"
          label="Country"
          value={country}
          onChange={(v) => setCountry(v as SeveranceCountry)}
          options={[
            { value: "US", label: "United States" },
            { value: "UK", label: "United Kingdom" },
            { value: "CA", label: "Canada (federal)" },
          ]}
        />
        <FieldGrid>
          <NumberField
            id="sev-years"
            label="Years of service"
            value={years}
            onChange={setYears}
            min={0}
            max={50}
          />
          <NumberField
            id="sev-weekly"
            label="Gross weekly pay"
            value={weeklyPay}
            onChange={setWeeklyPay}
            prefix={CURRENCY_PREFIX[country]}
          />
        </FieldGrid>
        <NumberField
          id="sev-per-year"
          label="Weeks of severance per year"
          value={weeksPerYear}
          onChange={setWeeksPerYear}
          min={0}
          max={6}
          step={0.5}
          hint="Typical employer policy is 1–2 weeks per year of service"
        />
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Severance Pay — Estimate",
          intro:
            "This document estimates severance pay from your years of service and weekly pay, applying any statutory minimum that exceeds the policy figure.",
          source: SEVERANCE_SOURCE.label,
          sourceUrl: SEVERANCE_SOURCE.url,
          inputs: [
            { label: "Country", value: country },
            { label: "Years of service", value: String(Number(years) || 0) },
            { label: "Gross weekly pay", value: `${CURRENCY_PREFIX[country]}${(Number(weeklyPay) || 0).toLocaleString()}` },
            { label: "Weeks per year", value: String(Number(weeksPerYear) || 1) },
          ],
        }}
      />
      </div>
    </div>
  );
}
