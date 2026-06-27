"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TablerIcon } from "./TablerIcon";
import { TOOLS, CATEGORY_META, type ToolCategory } from "@/data/tools";

type CountryFilter = "all" | "UK" | "US" | "CA" | "AU";

const COUNTRY_TABS: { value: CountryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "UK", label: "🇬🇧 UK" },
  { value: "US", label: "🇺🇸 US" },
  { value: "CA", label: "🇨🇦 CA" },
  { value: "AU", label: "🇦🇺 AU" },
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
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                country === tab.value
                  ? "bg-white text-ink shadow-sm"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {tab.label}
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
              <section key={cat} aria-labelledby={`cat-${cat}`}>
                <div className="mb-3 flex items-baseline gap-2">
                  <h2 id={`cat-${cat}`} className="text-sm font-semibold text-ink">
                    {CATEGORY_META[cat].label}
                  </h2>
                  <span className="text-xs text-ink-faint">{CATEGORY_META[cat].description}</span>
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

function ToolCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className={`flex items-center gap-4 rounded-lg border px-4 py-4 transition-colors ${
        tool.hero
          ? "border-brand-100 bg-brand-50 hover:bg-brand-100/40"
          : "border-surface-line bg-white hover:bg-surface-muted"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
          tool.hero ? "bg-white text-brand-600" : "bg-surface-muted text-ink-soft"
        }`}
      >
        <TablerIcon name={tool.icon} size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-ink">{tool.name}</span>
        <span className="block truncate text-xs text-ink-soft">{tool.description}</span>
      </span>
      <span className="hidden shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-brand-800 sm:inline">
        {tool.region}
      </span>
      <TablerIcon name="ti-arrow-right" className="shrink-0 text-ink-faint" size={16} aria-hidden="true" />
    </Link>
  );
}
