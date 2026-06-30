"use client";

import { useState } from "react";

const COUNTRIES = [
  { code: "UK", label: "UK" },
  { code: "US", label: "US" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
] as const;

const QUICK_LINKS = [
  { label: "Payslip analyser", href: "/payslip-analyser" },
  { label: "Redundancy pay", href: "/redundancy-pay-calculator" },
  { label: "Notice period", href: "/notice-period-calculator" },
  { label: "Final paycheck", href: "/final-paycheck-deadline-calculator" },
  { label: "Holiday pay", href: "/holiday-entitlement-calculator" },
] as const;

export function HeroSearch() {
  const [active, setActive] = useState<"UK" | "US" | "CA" | "AU">("UK");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const el = document.getElementById("all-calculators");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className="overflow-hidden rounded-lg border bg-white"
      style={{ borderColor: "#cdddeb", boxShadow: "0 10px 28px rgba(16,32,51,.08)" }}
      aria-label="Start a pay rights check"
    >
      {/* Country tabs */}
      <div className="grid grid-cols-4 border-b" style={{ background: "#f8fbff", borderColor: "#e7edf3" }}>
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => setActive(c.code)}
            style={{
              borderRight: "1px solid #e7edf3",
              borderBottom: active === c.code ? "3px solid #1769e0" : "3px solid transparent",
              background: active === c.code ? "#ffffff" : "transparent",
              color: active === c.code ? "#16324f" : "#52616f",
            }}
            className="min-h-[46px] px-2 text-[13px] font-bold transition-colors last:border-r-0"
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Finder row */}
      <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_54px] sm:grid-cols-[170px_1fr_54px] gap-2.5 p-4">
        <select
          aria-label="Country"
          className="col-span-2 sm:col-span-1 min-h-[52px] rounded-lg border px-3.5 text-[13px] font-medium text-ink outline-none"
          style={{ borderColor: "#d8e2ec" }}
          value={active}
          onChange={(e) => setActive(e.target.value as typeof active)}
        >
          <option value="UK">United Kingdom</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
        </select>
        <input
          type="search"
          aria-label="Search calculator"
          placeholder='Describe your issue: unpaid wages, notice pay…'
          className="min-h-[52px] rounded-lg border px-3.5 text-[13px] text-ink outline-none placeholder:text-[#8795a3]"
          style={{ borderColor: "#d8e2ec" }}
        />
        <button
          type="submit"
          aria-label="Find calculator"
          className="flex min-h-[52px] w-[54px] items-center justify-center rounded-lg text-white text-lg font-bold transition-colors"
          style={{ background: "#1769e0", boxShadow: "0 10px 20px rgba(23,105,224,.22)" }}
        >
          →
        </button>
      </form>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 px-4 pb-4">
        {QUICK_LINKS.map((q) => (
          <a
            key={q.label}
            href={q.href}
            className="rounded-full border px-2.5 py-[7px] text-[12px] font-bold text-ink-soft transition-colors hover:border-brand-300 hover:text-ink"
            style={{ borderColor: "#cfe0f1", background: "#f7fbff" }}
          >
            {q.label}
          </a>
        ))}
      </div>
    </div>
  );
}
