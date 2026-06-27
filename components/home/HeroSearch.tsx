"use client";

import { useState } from "react";
import { TablerIcon } from "@/components/TablerIcon";
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
      {/* Country pill tabs */}
      <div className="mb-6 inline-flex rounded-xl border border-surface-line bg-white p-1.5 shadow-sm">
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => { setActive(c.code); goToList(); }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              active === c.code
                ? "bg-brand-50 text-brand-600 shadow-[inset_0_0_0_1px_rgba(24,95,165,0.12)]"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            <CountryFlag country={c.code} size={18} />
            {c.label}
          </button>
        ))}
      </div>

      {/* Search bar with button */}
      <form onSubmit={handleSubmit} className="flex max-w-xl rounded-xl border border-surface-line bg-white p-1.5 shadow-md focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-50">
        <div className="flex flex-1 items-center pl-3">
          <TablerIcon name="ti-search" size={20} aria-hidden="true" className="mr-3 text-ink-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search calculators… e.g. "redundancy", "notice period", "overtime"'
            aria-label="Search calculators"
            className="w-full bg-transparent py-2 text-sm text-ink outline-none placeholder:text-ink-faint"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Search
        </button>
      </form>
    </div>
  );
}
