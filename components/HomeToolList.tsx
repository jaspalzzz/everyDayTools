"use client";

import { useMemo, useState } from "react";
import type React from "react";
import Link from "next/link";
import { TablerIcon } from "./TablerIcon";
import { TOOLS, CATEGORY_META, type ToolCategory } from "@/data/tools";

type CountryFilter = "all" | "UK" | "US" | "CA" | "AU";

function FlagUK() {
  return (
    <svg width="16" height="12" viewBox="0 0 60 40" aria-hidden="true" className="inline-block shrink-0">
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8"/>
    </svg>
  );
}
function FlagUS() {
  return (
    <svg width="16" height="12" viewBox="0 0 60 40" aria-hidden="true" className="inline-block shrink-0">
      <rect width="60" height="40" fill="#B22234"/>
      {[0,1,2,3,4,5].map(i => <rect key={i} y={i*6+3} width="60" height="3" fill="#fff"/>)}
      <rect width="24" height="21" fill="#3C3B6E"/>
    </svg>
  );
}
function FlagCA() {
  return (
    <svg width="16" height="12" viewBox="0 0 60 40" aria-hidden="true" className="inline-block shrink-0">
      <rect width="60" height="40" fill="#fff"/>
      <rect width="15" height="40" fill="#D80621"/>
      <rect x="45" width="15" height="40" fill="#D80621"/>
      <path d="M30,8 L33,16 H41 L35,21 L37,29 L30,24 L23,29 L25,21 L19,16 H27 Z" fill="#D80621"/>
    </svg>
  );
}
function FlagAU() {
  return (
    <svg width="16" height="12" viewBox="0 0 60 40" aria-hidden="true" className="inline-block shrink-0">
      <rect width="60" height="40" fill="#00008B"/>
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="5"/>
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="3"/>
      <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="8"/>
      <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="5"/>
    </svg>
  );
}

const COUNTRY_TABS: { value: CountryFilter; label: string; flag?: React.ReactNode }[] = [
  { value: "all", label: "All" },
  { value: "UK", label: "UK", flag: <FlagUK /> },
  { value: "US", label: "US", flag: <FlagUS /> },
  { value: "CA", label: "CA", flag: <FlagCA /> },
  { value: "AU", label: "AU", flag: <FlagAU /> },
];

const CATEGORY_ORDER: ToolCategory[] = ["leaving-job", "pay-tax", "parental-leave", "benefits"];

function toolMatchesCountry(region: string, country: CountryFilter): boolean {
  if (country === "all") return true;
  return region.includes(country);
}

export function HomeToolList() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<CountryFilter>("all");

  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((t) => {
      const matchesCountry = toolMatchesCountry(t.region, country);
      if (!matchesCountry) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.shortName.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    });
  }, [query, country]);

  const grouped = useMemo(() => {
    if (isSearching) return null;
    return CATEGORY_ORDER.map((cat) => ({
      cat,
      tools: filtered.filter((t) => t.category === cat),
    })).filter((g) => g.tools.length > 0);
  }, [filtered, isSearching]);

  return (
    <div>
      {/* Country tabs */}
      <div className="flex justify-center" role="tablist" aria-label="Filter by country">
        <div className="flex gap-1 rounded-xl border border-surface-line bg-surface-muted p-1">
          {COUNTRY_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={country === tab.value}
              onClick={() => setCountry(tab.value)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                country === tab.value
                  ? "bg-white text-ink shadow-sm"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {tab.flag}{tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative mx-auto mt-4 max-w-md">
        <TablerIcon
          name="ti-search"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
          size={16}
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search calculators… e.g. "redundancy" or "overtime"'
          aria-label="Search calculators"
          className="w-full rounded-lg border border-surface-line bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-50"
        />
      </div>

      {/* Tool list */}
      <div className="mx-auto mt-8 max-w-2xl">
        {isSearching || !grouped ? (
          /* Search results — flat list */
          <div className="flex flex-col gap-2">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-ink-faint">
                No calculators match &ldquo;{query}&rdquo;. Try a different word.
              </p>
            )}
          </div>
        ) : (
          /* Grouped by category */
          <div className="flex flex-col gap-8">
            {grouped.map(({ cat, tools }) => (
              <section key={cat} aria-labelledby={`cat-${cat}`} className="scroll-mt-20">
                <div className="mb-3 flex items-baseline gap-3 border-b border-surface-line pb-2">
                  <h2 id={`cat-${cat}`} className="text-[15px] font-bold text-ink">
                    {CATEGORY_META[cat].label}
                  </h2>
                  <span className="text-[11px] text-ink-faint">{CATEGORY_META[cat].description}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const CATEGORY_ICON_COLOR: Record<string, string> = {
  "leaving-job":    "text-brand-600",
  "pay-tax":        "text-brand-600",
  "parental-leave": "text-brand-600",
  "benefits":       "text-brand-600",
};

function ToolCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex items-center gap-3.5 rounded-xl border border-surface-line bg-white px-4 py-3 transition-all hover:border-brand-600 hover:shadow-[0_2px_8px_rgba(23,105,224,0.08)]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <TablerIcon name={tool.icon} size={17} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13.5px] font-semibold text-ink group-hover:text-brand-600">{tool.name}</span>
        <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-soft">{tool.description}</span>
      </span>
      <span className="shrink-0 rounded-full border border-surface-line px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">
        {tool.region}
      </span>
      <TablerIcon name="ti-arrow-right" className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" size={14} aria-hidden="true" />
    </Link>
  );
}
