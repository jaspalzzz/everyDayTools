"use client";

import { useMemo, useState } from "react";
import { SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import {
  FINAL_PAY_SOURCE,
  STATE_FINAL_PAY,
  calcFinalPaycheck,
  type SeparationType,
} from "@/lib/calculators/finalPaycheck";

export function FinalPaycheckCalculator() {
  const [stateCode, setStateCode] = useState("CA");
  const [separationType, setSeparationType] = useState<SeparationType>("fired");

  const result = useMemo(
    () => calcFinalPaycheck({ stateCode, separationType }),
    [stateCode, separationType],
  );
  const state = STATE_FINAL_PAY.find((s) => s.code === stateCode);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Final paycheck inputs">
        <SelectField
          id="state"
          label="State"
          value={stateCode}
          onChange={setStateCode}
          options={STATE_FINAL_PAY.map((s) => ({ value: s.code, label: s.name }))}
        />
        <SelectField
          id="separation-type"
          label="How did you leave?"
          value={separationType}
          onChange={(v) => setSeparationType(v as SeparationType)}
          options={[
            { value: "fired", label: "Let go / fired (involuntary)" },
            { value: "quit", label: "Resigned / quit (voluntary)" },
          ]}
        />
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Final Paycheck Deadline — Summary",
          intro:
            "This document summarises when your final paycheck is legally due based on your state and how your employment ended.",
          source: FINAL_PAY_SOURCE.label,
          sourceUrl: FINAL_PAY_SOURCE.url,
          inputs: [
            { label: "State", value: state?.name ?? stateCode },
            {
              label: "How you left",
              value: separationType === "fired" ? "Let go / fired" : "Resigned / quit",
            },
          ],
        }}
      />
    </div>
  );
}
