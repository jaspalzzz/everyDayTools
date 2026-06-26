"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcTakeHomePay, takeHomeSource } from "@/lib/calculators/takeHomePay";
import type { CountryCode } from "@/lib/types";

const COUNTRY_OPTIONS = [
  { value: "UK", label: "United Kingdom (£)" },
  { value: "US", label: "United States ($)" },
];

export function TakeHomePayCalculator() {
  const [country, setCountry] = useState<CountryCode>("UK");
  const [grossAnnual, setGrossAnnual] = useState<number | "">(45_000);

  const result = useMemo(
    () =>
      calcTakeHomePay({
        country,
        grossAnnual: Number(grossAnnual) || 0,
      }),
    [country, grossAnnual],
  );

  const prefix = country === "UK" ? "£" : "$";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Take-home pay inputs">
        <FieldGrid>
          <SelectField
            id="country"
            label="Country"
            value={country}
            onChange={(v) => setCountry(v as CountryCode)}
            options={COUNTRY_OPTIONS}
          />
          <NumberField
            id="gross"
            label="Gross annual salary"
            value={grossAnnual}
            onChange={setGrossAnnual}
            prefix={prefix}
            min={0}
            step={1000}
            hint={
              country === "UK"
                ? "Before income tax and National Insurance"
                : "Before federal income tax and FICA"
            }
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Take-Home Pay Estimate",
          intro:
            "This document estimates your annual take-home pay based on the gross salary and country you entered.",
          source: takeHomeSource(country).label,
        }}
      />
    </div>
  );
}
