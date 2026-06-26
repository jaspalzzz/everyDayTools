"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcDayRate, DAY_RATE_SOURCE } from "@/lib/calculators/dayRate";
import type { CountryCode } from "@/lib/types";

const COUNTRY_OPTIONS = [
  { value: "UK", label: "United Kingdom (£)" },
  { value: "US", label: "United States ($)" },
];

const MODE_OPTIONS = [
  { value: "day-to-annual", label: "Day rate → Annual income" },
  { value: "annual-to-day", label: "Annual salary → Day rate" },
];

export function DayRateCalculator() {
  const [country, setCountry] = useState<CountryCode>("UK");
  const [mode, setMode] = useState("day-to-annual");
  const [dayRate, setDayRate] = useState<number | "">(500);
  const [annualSalary, setAnnualSalary] = useState<number | "">(65_000);
  const [workingDays, setWorkingDays] = useState<number | "">(220);

  const result = useMemo(
    () =>
      calcDayRate({
        country,
        dayRate: mode === "day-to-annual" ? Number(dayRate) || 0 : 0,
        annualSalary: mode === "annual-to-day" ? Number(annualSalary) || 0 : 0,
        workingDaysPerYear: Number(workingDays) || 220,
      }),
    [country, mode, dayRate, annualSalary, workingDays],
  );

  const prefix = country === "UK" ? "£" : "$";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Day rate converter inputs">
        <FieldGrid>
          <SelectField
            id="dr-country"
            label="Country"
            value={country}
            onChange={(v) => setCountry(v as CountryCode)}
            options={COUNTRY_OPTIONS}
          />
          <SelectField
            id="dr-mode"
            label="Convert"
            value={mode}
            onChange={setMode}
            options={MODE_OPTIONS}
          />
        </FieldGrid>

        {mode === "day-to-annual" ? (
          <NumberField
            id="day-rate"
            label="Day rate"
            value={dayRate}
            onChange={setDayRate}
            prefix={prefix}
            min={0}
            step={50}
            hint="Your daily contractor rate"
          />
        ) : (
          <NumberField
            id="annual-salary"
            label="Annual salary"
            value={annualSalary}
            onChange={setAnnualSalary}
            prefix={prefix}
            min={0}
            step={1000}
            hint="Employee gross annual salary"
          />
        )}

        <NumberField
          id="working-days"
          label="Billable days per year"
          value={workingDays}
          onChange={setWorkingDays}
          min={1}
          max={365}
          hint="220 = 52 weeks × 5 days, minus 8 bank holidays and 12 days holiday"
        />
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Day Rate / Salary Conversion",
          intro:
            "This document converts between contractor day rate and equivalent annual income based on your inputs.",
          source: DAY_RATE_SOURCE.label,
          sourceUrl: DAY_RATE_SOURCE.url,
          inputs: [
            { label: "Country", value: country === "UK" ? "United Kingdom" : "United States" },
            { label: "Convert", value: mode === "day-to-annual" ? "Day rate to annual income" : "Annual salary to day rate" },
            {
              label: mode === "day-to-annual" ? "Day rate" : "Annual salary",
              value: `${prefix}${(Number(mode === "day-to-annual" ? dayRate : annualSalary) || 0).toLocaleString()}`,
            },
            { label: "Billable days per year", value: String(Number(workingDays) || 0) },
          ],
        }}
      />
    </div>
  );
}
