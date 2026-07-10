"use client";

import { useState } from "react";
import Link from "next/link";
import type { ToolCategory } from "@/data/tools";
import { CATEGORY_META } from "@/data/tools";

export interface RateLine { label: string; value: string; }
export interface SourceLink { label: string; href: string; }

export interface CountryTool {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: ToolCategory;
  hero: boolean;
}

export interface CountryPageProps {
  code: string;
  name: string;
  eyebrow: string;
  heroCopy: React.ReactNode;
  rates: RateLine[];
  ratesNote: string;
  searchPlaceholder: string;
  tools: CountryTool[];
  sources: SourceLink[];
  note: React.ReactNode;
  extraContent?: React.ReactNode;
}

const CATEGORY_ORDER: ToolCategory[] = ["leaving-job", "pay-tax", "parental-leave", "benefits"];

const TABS = [
  { key: "all", label: "All tools" },
  { key: "leaving-job", label: "Leaving a job" },
  { key: "pay-tax", label: "Pay & tax" },
  { key: "parental-leave", label: "Parental leave" },
  { key: "benefits", label: "Benefits" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

function MiniIcon({ letter }: { letter: string }) {
  return (
    <span
      style={{
        width: 34, height: 34, flexShrink: 0,
        display: "grid", placeItems: "center",
        borderRadius: 8, background: "#EAF0F8",
        color: "#1E4E8C", fontSize: 13, fontWeight: 900,
      }}
    >
      {letter}
    </span>
  );
}

function ToolIcon({ letter, featured }: { letter: string; featured: boolean }) {
  return (
    <span
      style={{
        width: 40, height: 40, flexShrink: 0,
        display: "grid", placeItems: "center",
        borderRadius: 8,
        background: featured ? "#CFDEEF" : "#EAF0F8",
        color: featured ? "#163C6B" : "#1E4E8C",
        fontSize: 15, fontWeight: 900,
      }}
    >
      {letter}
    </span>
  );
}

export function CountryPage({
  code, name, eyebrow, heroCopy, rates, ratesNote,
  searchPlaceholder, tools, sources, note, extraContent,
}: CountryPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [searchQ, setSearchQ] = useState("");

  const priorityTools = tools.filter((t) => t.hero).slice(0, 3);

  const filteredTools = tools.filter((t) => {
    if (activeTab !== "all" && t.category !== activeTab) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    }
    return true;
  });

  const displayCategories = activeTab === "all"
    ? CATEGORY_ORDER
    : [activeTab as ToolCategory];

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          borderBottom: "1px solid #EAE5D8",
          background: "radial-gradient(circle at 84% 18%,rgba(30,78,140,.11),transparent 31%),linear-gradient(180deg,#fff 0%,#FBF9F3 100%)",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] items-start gap-10 lg:gap-12"
          style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 24px 36px" }}
        >
          {/* Left */}
          <div>
            <nav aria-label="Breadcrumb" style={{ color: "#7a8794", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
              <Link href="/" style={{ color: "#7a8794" }}>Home</Link>
              {" / "}
              <span>{name}</span>
            </nav>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#16835b", fontSize: 12, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16835b", boxShadow: "0 0 0 5px rgba(22,131,91,.12)", flexShrink: 0 }} />
              {eyebrow}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "14px 0 14px" }}>
              {/* Jurisdiction tile */}
              <span
                style={{
                  width: 54, height: 54, flexShrink: 0, display: "grid", placeItems: "center",
                  border: "1px solid #E4DECF", borderRadius: 10, background: "#fff",
                  color: "#16324f", fontSize: 16, fontWeight: 950, letterSpacing: ".04em",
                  boxShadow: "0 10px 26px rgba(16,32,51,.07)",
                }}
              >
                {code}
              </span>
              <h1
                style={{
                  margin: 0, color: "#102033",
                  fontSize: "clamp(40px,5vw,64px)", lineHeight: 1, fontWeight: 850,
                }}
              >
                {name}
              </h1>
            </div>

            <p style={{ maxWidth: 740, margin: "0 0 20px", color: "#25384c", fontSize: 18, lineHeight: 1.62 }}>
              {heroCopy}
            </p>

            {/* Search — left column, directly below hero copy */}
            <form
              onSubmit={(e) => e.preventDefault()}
              aria-label={`Search ${name} calculators`}
              className="grid grid-cols-[minmax(0,1fr)_46px] gap-2 sm:grid-cols-[minmax(0,1fr)_auto_46px]"
              style={{ border: "1px solid #E4DECF", borderRadius: 10, background: "#fff", boxShadow: "0 4px 20px rgba(16,32,51,.08)", padding: 10, maxWidth: 640 }}
            >
              <input
                type="search"
                aria-label="Search calculators"
                placeholder={searchPlaceholder}
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="col-span-2 min-w-0 sm:col-span-1"
                style={{ minHeight: 46, border: "1px solid var(--color-control-border)", borderRadius: 8, background: "#FBF9F3", color: "#102033", padding: "0 14px", outline: "none", fontSize: 13 }}
              />
              <select
                aria-label="Topic"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as TabKey)}
                className="min-w-0"
                style={{ width: "100%", minHeight: 46, border: "1px solid var(--color-control-border)", borderRadius: 8, background: "#fff", color: "#102033", padding: "0 12px", outline: "none", fontSize: 13 }}
              >
                {TABS.map((t) => (
                  <option key={t.key} value={t.key}>{t.label}</option>
                ))}
              </select>
              <button
                type="submit"
                aria-label="Search"
                style={{ minHeight: 46, width: 46, border: 0, borderRadius: 8, background: "#1E4E8C", color: "#fff", fontSize: 18, fontWeight: 900, cursor: "pointer" }}
              >
                →
              </button>
            </form>
          </div>

          {/* Right column: rate panel only */}
          <aside
            className="hidden lg:block"
            style={{ border: "1px solid #E4DECF", borderRadius: 10, background: "#fff", boxShadow: "0 18px 44px rgba(16,32,51,.10)", overflow: "hidden" }}
            aria-label={`Key ${code} statutory rates`}
          >
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #EAE5D8", background: "#FBF9F3" }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 18, color: "#102033", fontWeight: 850 }}>Key 2026 rates</h2>
              <p style={{ margin: 0, color: "#52616f", fontSize: 13, fontWeight: 700 }}>{ratesNote}</p>
            </div>
            <div style={{ display: "grid", padding: "8px 20px 18px" }}>
              {rates.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", justifyContent: "space-between", gap: 16,
                    borderBottom: i < rates.length - 1 ? "1px solid #EAE5D8" : "none",
                    padding: "12px 0", color: "#52616f", fontSize: 13, fontWeight: 700,
                  }}
                >
                  <span>{r.label}</span>
                  <strong style={{ color: "#102033", textAlign: "right", fontWeight: 850 }}>{r.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── Main ── */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 24px 74px" }}>

        {/* Sticky category tabs */}
        <nav
          aria-label="Category filter"
          className="flex flex-wrap gap-2 pb-4 mb-5"
          style={{ position: "sticky", top: 68, zIndex: 5, background: "#FBF9F3", scrollbarWidth: "none" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                flexShrink: 0, border: activeTab === tab.key ? "1px solid #A6C2E0" : "1px solid #E4DECF",
                borderRadius: 999, background: activeTab === tab.key ? "#EAF0F8" : "#fff",
                color: activeTab === tab.key ? "#163C6B" : "#25384c",
                padding: "8px 14px", fontSize: 13, fontWeight: 850, cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-8 items-start">

          {/* Main column */}
          <section aria-label={`${name} calculators`}>

            {/* Priority grid — only shown on "all" tab with no search */}
            {activeTab === "all" && !searchQ && priorityTools.length > 0 && (
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                style={{ marginBottom: 34 }}
              >
                {priorityTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    style={{
                      minHeight: 176, border: "1px solid #E4DECF", borderRadius: 10,
                      background: "#fff", boxShadow: "0 10px 24px rgba(16,32,51,.06)",
                      padding: 17, display: "flex", flexDirection: "column",
                      justifyContent: "space-between", textDecoration: "none",
                    }}
                  >
                    <MiniIcon letter={tool.shortName.charAt(0).toUpperCase()} />
                    <div>
                      <strong style={{ display: "block", color: "#102033", fontSize: 17, lineHeight: 1.2, margin: "12px 0 7px", fontWeight: 850 }}>
                        {tool.shortName}
                      </strong>
                      <p style={{ margin: 0, color: "#52616f", fontSize: 13 }}>
                        {tool.description}
                      </p>
                    </div>
                    <span style={{ color: "#163C6B", fontSize: 13, fontWeight: 900, marginTop: 16 }}>
                      Calculate →
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Tool sections by category */}
            {displayCategories.map((cat) => {
              const catTools = filteredTools.filter((t) => t.category === cat);
              if (catTools.length === 0) return null;
              const meta = CATEGORY_META[cat];
              return (
                <section key={cat} style={{ marginTop: activeTab === "all" ? 20 : 0, marginBottom: 28 }}>
                  <h2 style={{ margin: "0 0 5px", color: "#102033", fontSize: 22, fontWeight: 850 }}>
                    {meta.label}
                  </h2>
                  <p style={{ margin: "0 0 12px", color: "#52616f", fontSize: 14 }}>
                    {meta.description}
                  </p>
                  <div style={{ display: "grid", gap: 9 }}>
                    {catTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        className="grid grid-cols-[40px_1fr] sm:grid-cols-[40px_1fr_30px]"
                        style={{
                          gap: 14,
                          alignItems: "center",
                          minHeight: 76,
                          border: tool.hero ? "1px solid #A6C2E0" : "1px solid #E4DECF",
                          borderRadius: 8,
                          background: tool.hero ? "#F5F1E8" : "#fff",
                          padding: "13px 14px",
                          textDecoration: "none",
                        }}
                      >
                        <ToolIcon letter={tool.shortName.charAt(0).toUpperCase()} featured={tool.hero} />
                        <span>
                          <h3 style={{ margin: "0 0 3px", color: "#102033", fontSize: 15, lineHeight: 1.25, fontWeight: 800 }}>
                            {tool.name}
                          </h3>
                          <p style={{ margin: 0, color: "#52616f", fontSize: 12 }}>
                            {tool.description}
                          </p>
                        </span>
                        <span
                          className="hidden sm:grid"
                          style={{ width: 30, height: 30, placeItems: "center", borderRadius: 8, background: "#EAF0F8", color: "#163C6B", fontWeight: 900, fontSize: 14 }}
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

            {filteredTools.length === 0 && (
              <p style={{ color: "#52616f", fontSize: 14, padding: "32px 0" }}>
                No calculators found. Try adjusting the search or topic filter.
              </p>
            )}

            {/* Extra content slot (US states, CA provinces, etc.) */}
            {extraContent && activeTab === "all" && !searchQ && (
              <div style={{ marginTop: 32, borderTop: "1px solid #EAE5D8", paddingTop: 32 }}>
                {extraContent}
              </div>
            )}
          </section>

          {/* Side rail */}
          <aside
            className="hidden lg:grid gap-4"
            style={{ position: "sticky", top: 88 }}
            aria-label="Sources and notes"
          >
            {/* Authority card */}
            <section style={{ border: "1px solid #E4DECF", borderRadius: 10, background: "#fff", padding: 18 }}>
              <h2 style={{ margin: "0 0 10px", color: "#102033", fontSize: 18, lineHeight: 1.2, fontWeight: 850 }}>Source basis</h2>
              <p style={{ margin: "0 0 13px", color: "#52616f", fontSize: 13 }}>
                Figures are verified against official government publications and updated when rates change.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {sources.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", justifyContent: "space-between", gap: 10,
                      border: "1px solid #EAE5D8", borderRadius: 8,
                      background: "#F4F1E9", padding: "9px 10px",
                      color: "#25384c", fontSize: 13, fontWeight: 850, textDecoration: "none",
                    }}
                  >
                    {s.label}
                    <span style={{ color: "#163C6B" }}>→</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Country note */}
            <section
              style={{ border: "1px solid #f1d9aa", borderRadius: 10, background: "#fff4df", padding: 16, color: "#5d461d", fontSize: 13 }}
            >
              {note}
            </section>

            {/* Other country shortcuts */}
            <section style={{ border: "1px solid #E4DECF", borderRadius: 10, background: "#fff", padding: 18 }}>
              <h2 style={{ margin: "0 0 10px", color: "#102033", fontSize: 15, fontWeight: 850 }}>Other jurisdictions</h2>
              <div style={{ display: "grid", gap: 7 }}>
                {(["UK", "US", "CA", "AU"] as const).filter((c) => c !== code).map((c) => {
                  const labels: Record<string, string> = { UK: "United Kingdom", US: "United States", CA: "Canada", AU: "Australia" };
                  return (
                    <Link
                      key={c}
                      href={`/${c.toLowerCase()}`}
                      style={{
                        display: "grid", gridTemplateColumns: "38px 1fr", gap: 10,
                        alignItems: "center", minHeight: 44, borderRadius: 8,
                        border: "1px solid #EAE5D8", background: "#F4F1E9",
                        padding: "8px 10px", textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          display: "grid", placeItems: "center",
                          border: "1px solid #A6C2E0", borderRadius: 7, background: "#fff",
                          color: "#16324f", fontSize: 11, fontWeight: 900, letterSpacing: ".04em",
                          height: 28,
                        }}
                      >
                        {c}
                      </span>
                      <span style={{ color: "#25384c", fontSize: 13, fontWeight: 800 }}>{labels[c]}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
