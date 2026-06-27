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
                ? "bg-surface-muted text-ink"
                : "text-ink-soft hover:bg-surface-muted hover:text-ink"
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

      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="flex h-[52px] max-w-[480px] items-center overflow-hidden rounded-xl border border-surface-line bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow focus-within:border-brand-300 focus-within:shadow-[0_2px_12px_rgba(23,105,224,0.12)]"
      >
        <span className="flex shrink-0 items-center pl-4 text-ink-faint">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          className="flex-1 bg-transparent px-3 py-0 text-[13.5px] text-ink outline-none placeholder:text-ink-faint"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex h-full w-[52px] shrink-0 items-center justify-center rounded-r-xl bg-brand-600 text-white transition-colors hover:bg-brand-800"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </div>
  );
}
