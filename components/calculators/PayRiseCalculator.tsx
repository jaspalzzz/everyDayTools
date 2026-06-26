"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { PAY_RISE_SOURCE, calcPayRise } from "@/lib/calculators/payRise";
import { COUNTRIES, type CountryCode } from "@/lib/types";

export function PayRiseCalculator() {
  const [country, setCountry] = useState<CountryCode>("US");
  const [currentSalary, setCurrentSalary] = useState<number | "">(50000);
  const [percentIncrease, setPercentIncrease] = useState<number | "">(5);

  const result = useMemo(
    () =>
      calcPayRise({
        country,
        currentSalary: Number(currentSalary) || 0,
        percentIncrease: Number(percentIncrease) || 0,
      }),
    [country, currentSalary, percentIncrease],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Pay rise inputs">
        <SelectField
          id="country"
          label="Country"
          value={country}
          onChange={(v) => setCountry(v as CountryCode)}
          options={Object.values(COUNTRIES).map((c) => ({ value: c.code, label: c.label }))}
        />
        <FieldGrid>
          <NumberField
            id="current-salary"
            label="Current salary"
            value={currentSalary}
            onChange={setCurrentSalary}
            step={1000}
          />
          <NumberField
            id="percent-increase"
            label="Pay rise"
            value={percentIncrease}
            onChange={setPercentIncrease}
            suffix="%"
            step={0.5}
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Pay Rise — Summary",
          intro:
            "This document summarises your new salary after a percentage pay rise, including the increase per year and per month.",
          source: PAY_RISE_SOURCE.label,
          sourceUrl: PAY_RISE_SOURCE.url,
          inputs: [
            { label: "Country", value: COUNTRIES[country].label },
            { label: "Current salary", value: (Number(currentSalary) || 0).toLocaleString() },
            { label: "Pay rise", value: `${Number(percentIncrease) || 0}%` },
          ],
        }}
      />
    </div>
  );
}
