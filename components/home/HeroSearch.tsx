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
      {/* Country tabs */}
      <div className="mb-5 flex items-center gap-1 rounded-xl border border-surface-line bg-white p-1 shadow-sm w-fit">
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => { setActive(c.code); goToList(); }}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-all ${
              active === c.code
                ? "bg-brand-600 text-white shadow-sm"
                : "text-ink-soft hover:bg-surface-muted hover:text-ink"
            }`}
          >
            <CountryFlag country={c.code} size={16} />
            {c.label}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="flex max-w-[520px] overflow-hidden rounded-xl border border-surface-line bg-white shadow-[0_4px_16px_rgba(24,95,165,0.08)] focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-50"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search calculators... e.g. "redundancy" or "overtime"'
          aria-label="Search calculators"
          className="flex-1 bg-transparent px-5 py-3.5 text-[14px] text-ink outline-none placeholder:text-ink-faint"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex items-center justify-center rounded-r-xl bg-brand-600 px-5 py-3.5 text-white transition-colors hover:bg-brand-800"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </div>
  );
}
