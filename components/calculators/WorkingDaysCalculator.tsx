"use client";

import { useEffect, useMemo, useState } from "react";
import { DateField, FieldGrid, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { WORKING_DAYS_SOURCE, calcWorkingDays } from "@/lib/calculators/workingDays";

function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Populate sensible defaults after mount (keeps SSR/CSR markup identical).
  useEffect(() => {
    const now = new Date();
    setStartDate(isoDate(now));
    setEndDate(isoDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)));
  }, []);

  const result = useMemo(() => calcWorkingDays({ startDate, endDate }), [startDate, endDate]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Working days inputs">
        <FieldGrid>
          <DateField id="start-date" label="Start date" value={startDate} onChange={setStartDate} />
          <DateField id="end-date" label="End date" value={endDate} onChange={setEndDate} />
        </FieldGrid>
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
      <ResultPanel
        result={result}
        letterMeta={{
          title: "Working Days — Summary",
          intro:
            "This document counts the working days (Monday to Friday) between two dates, inclusive of both ends.",
          source: WORKING_DAYS_SOURCE.label,
          sourceUrl: WORKING_DAYS_SOURCE.url,
          inputs: [
            { label: "Start date", value: startDate || "Not set" },
            { label: "End date", value: endDate || "Not set" },
          ],
        }}
      />
      </div>
    </div>
  );
}
