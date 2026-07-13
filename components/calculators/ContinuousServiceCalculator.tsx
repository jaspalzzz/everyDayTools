"use client";

import { useMemo, useState } from "react";
import { DateField, FieldGrid, FormPanel } from "@/components/fields";
import { ResultPanel } from "@/components/ResultPanel";
import {
  CONTINUOUS_SERVICE_SOURCE,
  calcContinuousService,
} from "@/lib/calculators/continuousService";

export function ContinuousServiceCalculator() {
  const [startDate, setStartDate] = useState("2024-04-06");
  const [endDate, setEndDate] = useState("2026-04-06");
  const result = useMemo(
    () => calcContinuousService({ startDate, endDate }),
    [startDate, endDate],
  );

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Continuous service dates">
        <FieldGrid>
          <DateField
            id="employment-start-date"
            label="Employment start date"
            value={startDate}
            onChange={setStartDate}
          />
          <DateField
            id="service-end-date"
            label="Measure service to"
            value={endDate}
            onChange={setEndDate}
            hint="Use your leaving date or another date you need to check."
          />
        </FieldGrid>
        <p className="text-xs leading-relaxed text-ink-soft">
          Enter the legal employment start date shown in your records. TUPE transfers and some
          absences or temporary breaks may preserve an earlier continuous-employment date.
        </p>
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
        <ResultPanel
          result={result}
          letterMeta={{
            title: "Continuous Employment — Service Record",
            intro:
              "This document records the elapsed calendar service between the employment dates entered and highlights common UK service thresholds.",
            source: CONTINUOUS_SERVICE_SOURCE.label,
            sourceUrl: CONTINUOUS_SERVICE_SOURCE.url,
            inputs: [
              { label: "Employment start", value: startDate },
              { label: "Measured to", value: endDate },
            ],
          }}
        />
      </div>
    </div>
  );
}
