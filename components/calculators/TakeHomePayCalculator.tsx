"use client";

import { useEffect, useMemo, useState } from "react";
import { readUrlParamsOnMount, writeUrlParams } from "@/hooks/useUrlSync";
import { FieldGrid, NumberField, SelectField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcTakeHomePay, takeHomeSource } from "@/lib/calculators/takeHomePay";
import { UK_INCOME_TAX, US_INCOME_TAX } from "@/lib/rates";
import type { CountryCode } from "@/lib/types";

const COUNTRY_OPTIONS = [
  { value: "UK", label: "United Kingdom (£)" },
  { value: "US", label: "United States ($)" },
];

export function TakeHomePayCalculator() {
  const [country, setCountry] = useState<CountryCode>("UK");
  const [grossAnnual, setGrossAnnual] = useState<number | "">(45_000);

  useEffect(() => {
    readUrlParamsOnMount({ salary: (v) => setGrossAnnual(v) });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => writeUrlParams({ salary: Number(grossAnnual) || 0 }), 400);
    return () => clearTimeout(t);
  }, [grossAnnual]);

  const result = useMemo(
    () =>
      calcTakeHomePay({
        country,
        grossAnnual: Number(grossAnnual) || 0,
      }),
    [country, grossAnnual],
  );

  const prefix = country === "UK" ? "£" : "$";
  const source = takeHomeSource(country);
  const effectiveDate =
    country === "UK" ? UK_INCOME_TAX.effectiveDate : US_INCOME_TAX.effectiveDate;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Take-home pay inputs">
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
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Take-Home Pay Estimate",
          intro:
            "This document estimates your annual take-home pay based on the gross salary and country you entered.",
          source: source.label,
          sourceUrl: source.url,
          effectiveDate,
          inputs: [
            { label: "Country", value: country === "UK" ? "United Kingdom" : "United States" },
            { label: "Gross annual salary", value: `${prefix}${(Number(grossAnnual) || 0).toLocaleString()}` },
          ],
        }}
      />
      </div>
    </div>
  );
}
