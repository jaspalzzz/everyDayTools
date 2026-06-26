"use client";

import { useMemo, useState } from "react";
import { NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import {
  UNEMPLOYMENT_SOURCE,
  UNEMPLOYMENT_STATES,
  calcUnemployment,
} from "@/lib/calculators/unemployment";

export function UnemploymentCalculator() {
  const [stateCode, setStateCode] = useState("CA");
  const [highestQuarterWages, setHighestQuarterWages] = useState<number | "">(15000);

  const result = useMemo(
    () =>
      calcUnemployment({
        stateCode,
        highestQuarterWages: Number(highestQuarterWages) || 0,
      }),
    [stateCode, highestQuarterWages],
  );
  const state = UNEMPLOYMENT_STATES.find((s) => s.code === stateCode);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Unemployment benefit inputs">
        <SelectField
          id="state"
          label="State"
          value={stateCode}
          onChange={setStateCode}
          options={UNEMPLOYMENT_STATES.map((s) => ({ value: s.code, label: s.name }))}
        />
        <NumberField
          id="highest-quarter-wages"
          label="Highest-quarter wages (gross)"
          value={highestQuarterWages}
          onChange={setHighestQuarterWages}
          prefix="$"
          step={500}
          hint="Your gross pay in your highest-earning 3-month quarter"
        />
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Unemployment Benefit — Estimate",
          intro:
            "This document estimates your weekly unemployment benefit and maximum potential total, based on your highest-quarter wages and your state's benefit rules.",
          source: UNEMPLOYMENT_SOURCE.label,
          sourceUrl: UNEMPLOYMENT_SOURCE.url,
          effectiveDate: state?.effective,
          inputs: [
            { label: "State", value: state?.name ?? stateCode },
            {
              label: "Highest-quarter wages",
              value: `$${(Number(highestQuarterWages) || 0).toLocaleString()}`,
            },
          ],
        }}
      />
    </div>
  );
}
