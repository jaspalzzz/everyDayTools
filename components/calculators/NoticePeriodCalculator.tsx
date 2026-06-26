"use client";

import { useMemo, useState } from "react";
import { FieldGrid, NumberField, SelectField } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcNoticePeriod, NOTICE_SOURCE, type NoticeRegion } from "@/lib/calculators/noticePeriod";

export function NoticePeriodCalculator() {
  const [region, setRegion] = useState<NoticeRegion>("UK");
  const [years, setYears] = useState<number | "">(4);
  const [contractual, setContractual] = useState<number | "">(0);

  const result = useMemo(
    () =>
      calcNoticePeriod({
        region,
        completedYears: Number(years) || 0,
        contractualWeeks: Number(contractual) || 0,
      }),
    [region, years, contractual],
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="flex flex-col gap-4" aria-label="Notice period inputs">
        <SelectField
          id="region"
          label="Country"
          value={region}
          onChange={(v) => setRegion(v as NoticeRegion)}
          options={[
            { value: "UK", label: "United Kingdom" },
            { value: "CA", label: "Canada (Ontario baseline)" },
          ]}
        />
        <FieldGrid>
          <NumberField
            id="notice-years"
            label="Completed years of service"
            value={years}
            onChange={setYears}
            min={0}
            max={50}
          />
          <NumberField
            id="contractual"
            label="Contractual notice"
            value={contractual}
            onChange={setContractual}
            suffix="weeks"
            hint="From your contract (0 if unknown)"
          />
        </FieldGrid>
      </form>

      <ResultPanel
        result={result}
        letterMeta={{
          title: "Notice Period — Summary",
          intro:
            "This document summarises the minimum notice period you are entitled to, comparing the statutory minimum with your contractual notice.",
          source: NOTICE_SOURCE.label,
          sourceUrl: NOTICE_SOURCE.url,
          inputs: [
            { label: "Country", value: region === "UK" ? "United Kingdom" : "Canada (Ontario baseline)" },
            { label: "Completed years of service", value: String(Number(years) || 0) },
            { label: "Contractual notice", value: `${Number(contractual) || 0} weeks` },
          ],
        }}
      />
    </div>
  );
}
