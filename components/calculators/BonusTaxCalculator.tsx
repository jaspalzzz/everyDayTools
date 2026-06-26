"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { BONUS_TAX_SOURCE, US_SUPPLEMENTAL_RATE, calcBonusTax } from "@/lib/calculators/bonusTax";
import { US_BONUS } from "@/lib/rates";
import { COUNTRIES, type CountryCode } from "@/lib/types";

export function BonusTaxCalculator() {
  const [country, setCountry] = useState<CountryCode>("US");
  const [bonusAmount, setBonusAmount] = useState<number | "">(5000);
  const [deductionRate, setDeductionRate] = useState<number | "">(US_SUPPLEMENTAL_RATE);

  const result = useMemo(
    () =>
      calcBonusTax({
        country,
        bonusAmount: Number(bonusAmount) || 0,
        deductionRate: Number(deductionRate) || 0,
      }),
    [country, bonusAmount, deductionRate],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Bonus tax inputs">
        <SelectField
          id="country"
          label="Country"
          value={country}
          onChange={(v) => setCountry(v as CountryCode)}
          options={Object.values(COUNTRIES).map((c) => ({ value: c.code, label: c.label }))}
        />
        <FieldGrid>
          <NumberField
            id="bonus-amount"
            label="Gross bonus"
            value={bonusAmount}
            onChange={setBonusAmount}
            step={500}
          />
          <NumberField
            id="deduction-rate"
            label="Deduction rate"
            value={deductionRate}
            onChange={setDeductionRate}
            suffix="%"
            max={100}
            hint="US default: 22% federal supplemental"
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Bonus Take-home — Estimate",
          intro:
            "This document estimates your take-home bonus after the deduction rate you entered.",
          source: BONUS_TAX_SOURCE.label,
          sourceUrl: BONUS_TAX_SOURCE.url,
          effectiveDate: US_BONUS.effectiveDate,
          inputs: [
            { label: "Country", value: COUNTRIES[country].label },
            { label: "Gross bonus", value: `${COUNTRIES[country].currency === "GBP" ? "£" : COUNTRIES[country].currency === "USD" ? "$" : ""}${(Number(bonusAmount) || 0).toLocaleString()}` },
            { label: "Deduction rate", value: `${Number(deductionRate) || 0}%` },
          ],
        }}
      />
    </div>
  );
}
