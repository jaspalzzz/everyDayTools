"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { SALARY_HOURLY_SOURCE, calcSalaryToHourly } from "@/lib/calculators/salaryToHourly";
import { COUNTRIES, type CountryCode } from "@/lib/types";

export function SalaryToHourlyCalculator() {
  const [country, setCountry] = useState<CountryCode>("US");
  const [annualSalary, setAnnualSalary] = useState<number | "">(50000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number | "">(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number | "">(52);

  const result = useMemo(
    () =>
      calcSalaryToHourly({
        country,
        annualSalary: Number(annualSalary) || 0,
        hoursPerWeek: Number(hoursPerWeek) || 0,
        weeksPerYear: Number(weeksPerYear) || 0,
      }),
    [country, annualSalary, hoursPerWeek, weeksPerYear],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Salary to hourly inputs">
        <SelectField
          id="country"
          label="Country"
          value={country}
          onChange={(v) => setCountry(v as CountryCode)}
          options={Object.values(COUNTRIES).map((c) => ({ value: c.code, label: c.label }))}
        />
        <NumberField
          id="annual-salary"
          label="Annual salary (gross)"
          value={annualSalary}
          onChange={setAnnualSalary}
          step={1000}
        />
        <FieldGrid>
          <NumberField
            id="hours-per-week"
            label="Hours per week"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            max={168}
          />
          <NumberField
            id="weeks-per-year"
            label="Weeks per year"
            value={weeksPerYear}
            onChange={setWeeksPerYear}
            max={52}
            hint="52 if you work all year"
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Salary to Hourly — Summary",
          intro:
            "This document converts an annual salary into the equivalent gross hourly, weekly and monthly pay, based on the hours and weeks worked.",
          source: SALARY_HOURLY_SOURCE.label,
        }}
      />
    </div>
  );
}
