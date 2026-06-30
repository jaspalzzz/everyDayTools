"use client";

import { useEffect, useMemo, useState } from "react";
import { readUrlParamsOnMount, writeUrlParams } from "@/hooks/useUrlSync";
import { FieldGrid, NumberField, SelectField, FormPanel } from "../fields";
import { ResultPanel } from "../ResultPanel";
import { calcNoticePeriod, NOTICE_SOURCE, type NoticeRegion } from "@/lib/calculators/noticePeriod";

export function NoticePeriodCalculator() {
  const [region, setRegion] = useState<NoticeRegion>("UK");
  const [years, setYears] = useState<number | "">(4);
  const [contractual, setContractual] = useState<number | "">(0);

  useEffect(() => {
    readUrlParamsOnMount({
      years: (v) => setYears(v),
      contractual: (v) => setContractual(v),
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => writeUrlParams({ years: Number(years) || 0, contractual: Number(contractual) || 0 }), 400);
    return () => clearTimeout(t);
  }, [years, contractual]);

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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]" style={{ alignItems: "start" }}>
      <FormPanel label="Notice period inputs">
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
      </FormPanel>

      <div style={{ position: "sticky", top: 88 }}>
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
    </div>
  );
}
