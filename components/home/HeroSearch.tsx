"use client";

import { useState } from "react";
import { CountryFlag } from "@/components/CountryFlag";

const COUNTRIES = [
  { code: "UK", label: "UK" },
  { code: "US", label: "US" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
] as const;

export function HeroSearch() {
  const [active, setActive] = useState("UK");
  const [query, setQuery] = useState("");

  function goToList() {
    const el = document.getElementById("all-calculators");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    goToList();
  }

  return (
    <div>
      {/* Country tabs — flat, no container */}
      <div className="mb-5 flex items-center gap-0.5">
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => { setActive(c.code); goToList(); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
              active === c.code
                ? "bg-slate-100 text-ink"
                : "text-ink-soft hover:bg-slate-50 hover:text-ink"
            }`}
          >
            <CountryFlag country={c.code} size={16} />
            {c.label}
            {c.code === "AU" && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-ink-faint">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Search bar — icon inside left, blue square button right */}
      <form
        onSubmit={handleSubmit}
        className="flex max-w-[460px] items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-brand-400 focus-within:shadow-[0_0_0_3px_rgba(24,95,165,0.08)]"
      >
        <span className="flex shrink-0 items-center pl-4 text-ink-faint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search calculators... e.g. "redundancy" or "overtime"'
          aria-label="Search calculators"
          className="flex-1 bg-transparent px-3 py-3.5 text-[13px] text-ink outline-none placeholder:text-ink-faint"
        />
        <button
          type="submit"
          aria-label="Search"
          className="m-1.5 flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-white transition-colors hover:bg-brand-800"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </div>
  );
}
