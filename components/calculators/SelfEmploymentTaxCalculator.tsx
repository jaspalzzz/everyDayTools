"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcSelfEmploymentTax, seTaxSource } from "@/lib/calculators/selfEmploymentTax";
import { UK_NI_SELF_EMPLOYED, US_SE_TAX } from "@/lib/rates";
import type { CountryCode } from "@/lib/types";

const COUNTRY_OPTIONS = [
  { value: "UK", label: "United Kingdom (£)" },
  { value: "US", label: "United States ($)" },
];

export function SelfEmploymentTaxCalculator() {
  const [country, setCountry] = useState<CountryCode>("UK");
  const [netProfit, setNetProfit] = useState<number | "">(40_000);

  const result = useMemo(
    () => calcSelfEmploymentTax({ country, netProfit: Number(netProfit) || 0 }),
    [country, netProfit],
  );

  const prefix = country === "UK" ? "£" : "$";
  const source = seTaxSource(country);
  const effectiveDate =
    country === "UK" ? UK_NI_SELF_EMPLOYED.effectiveDate : US_SE_TAX.effectiveDate;

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Self-employment tax inputs">
        <FieldGrid>
          <SelectField
            id="se-country"
            label="Country"
            value={country}
            onChange={(v) => setCountry(v as CountryCode)}
            options={COUNTRY_OPTIONS}
          />
          <NumberField
            id="net-profit"
            label="Net profit"
            value={netProfit}
            onChange={setNetProfit}
            prefix={prefix}
            min={0}
            step={1000}
            hint={
              country === "UK"
                ? "After allowable business expenses, before tax"
                : "Schedule C net profit after business deductions"
            }
          />
        </FieldGrid>
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Self-Employment Tax Estimate",
          intro:
            "This document estimates your tax liability and take-home pay as a self-employed person based on the net profit you entered.",
          source: source.label,
          sourceUrl: source.url,
          effectiveDate,
          inputs: [
            { label: "Country", value: country === "UK" ? "United Kingdom" : "United States" },
            { label: "Net profit", value: `${prefix}${(Number(netProfit) || 0).toLocaleString()}` },
          ],
        }}
      />
      </div>
    </div>
  );
}
