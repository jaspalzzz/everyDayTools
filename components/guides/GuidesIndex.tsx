"use client";

import { useState } from "react";
import Link from "next/link";
import type { GuideMeta } from "@/data/guides";

const TABS = [
  { key: "featured", label: "Featured", sub: "Most urgent rights" },
  { key: "leaving", label: "Leaving a job", sub: "Final pay, notice, dismissal" },
  { key: "pay", label: "Pay & tax", sub: "Wages, deductions, take-home" },
  { key: "parental", label: "Parental leave", sub: "SMP, SPP, adoption" },
  { key: "benefits", label: "Benefits", sub: "Sick pay, holiday pay" },
  { key: "us", label: "US state rules", sub: "PTO and paycheck timing" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

const FEATURED_SLUGS = [
  "uk-redundancy-pay",
  "uk-notice-period-law",
  "uk-maternity-pay",
  "uk-take-home-pay",
];

const CALCULATOR_LINKS = [
  { label: "Redundancy pay", href: "/redundancy-pay-calculator" },
  { label: "Notice pay", href: "/notice-period-calculator" },
  { label: "Holiday pay", href: "/holiday-entitlement-calculator" },
  { label: "Final paycheck deadline", href: "/final-paycheck-deadline-calculator" },
  { label: "Payslip analyser", href: "/payslip-analyser" },
] as const;

function filterGuides(guides: GuideMeta[], tab: TabKey): GuideMeta[] {
  switch (tab) {
    case "featured":
      return FEATURED_SLUGS.map((s) => guides.find((g) => g.slug === s)).filter(Boolean) as GuideMeta[];
    case "leaving":
      return guides.filter((g) => g.category === "Leaving a Job");
    case "pay":
      return guides.filter((g) => g.category === "Pay & Tax");
    case "parental":
      return guides.filter((g) => g.category === "Parental Leave");
    case "benefits":
      return guides.filter((g) => g.category === "Benefits & Entitlements");
    case "us":
      return guides.filter((g) => g.country === "US");
    default:
      return guides;
  }
}

function CountryBadge({ country }: { country: string }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", borderRadius: 999,
        background: "rgba(255,255,255,.92)", color: "#16324f",
        padding: "5px 9px", fontSize: 11, fontWeight: 900,
        textTransform: "uppercase", letterSpacing: ".03em",
      }}
    >
      {country}
    </span>
  );
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", borderRadius: 999,
        background: "rgba(255,255,255,.92)", color: "#16324f",
        padding: "5px 9px", fontSize: 11, fontWeight: 900,
        textTransform: "uppercase", letterSpacing: ".03em",
      }}
    >
      {label}
    </span>
  );
}

export function GuidesIndex({ guides }: { guides: GuideMeta[] }) {
  const [activeTab, setActiveTab] = useState<TabKey>("featured");
  const [searchQ, setSearchQ] = useState("");
  const [country, setCountry] = useState("all");
  const [topic, setTopic] = useState("all");

  const featured = guides.find((g) => g.slug === "uk-redundancy-pay")!;
  const filtered = filterGuides(guides, activeTab).filter((g) => {
    if (searchQ && !g.title.toLowerCase().includes(searchQ.toLowerCase()) && !g.description.toLowerCase().includes(searchQ.toLowerCase())) return false;
    if (country !== "all" && g.country !== country) return false;
    return true;
  });

  const gridGuides = activeTab === "featured" ? filtered.slice(1) : filtered;
  const featuredGuide = activeTab === "featured" ? filtered[0] ?? featured : null;

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: "radial-gradient(circle at 84% 14%,rgba(23,105,224,.10),transparent 30%),linear-gradient(180deg,#fff 0%,#f7fbff 100%)",
          borderBottom: "1px solid #e7edf3",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] items-end gap-10 lg:gap-12"
          style={{ maxWidth: 1180, margin: "0 auto", padding: "54px 24px 42px" }}
        >
          {/* Left */}
          <div>
            <nav aria-label="Breadcrumb" style={{ color: "#7a8794", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
              <Link href="/" style={{ color: "#7a8794" }}>Home</Link>
              {" / "}
              <span>Guides</span>
            </nav>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#16835b", fontSize: 12, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16835b", boxShadow: "0 0 0 5px rgba(22,131,91,.12)", flexShrink: 0 }} />
              Employment rights, plain English
            </div>

            <h1 style={{ maxWidth: 680, margin: "14px 0 16px", color: "#102033", fontSize: "clamp(38px,4.8vw,62px)", lineHeight: 1, letterSpacing: 0, fontWeight: 850 }}>
              Guides for pay problems that need a clear answer.
            </h1>

            <p style={{ maxWidth: 680, margin: 0, color: "#25384c", fontSize: 18, lineHeight: 1.62 }}>
              Practical employment-rights guides for the UK, US, Canada and Australia. Each guide explains{" "}
              <strong style={{ color: "#16324f", fontWeight: 850 }}>what the rule means, what to check, what evidence matters, and which calculator to use next.</strong>
            </p>
          </div>

          {/* Trust card */}
          <aside
            className="hidden lg:block"
            style={{ border: "1px solid #c8d9ea", borderRadius: 10, background: "#fff", boxShadow: "0 18px 44px rgba(16,32,51,.10)", padding: 20 }}
            aria-label="Guide standards"
          >
            <h2 style={{ margin: "0 0 12px", color: "#16324f", fontSize: 18, lineHeight: 1.2, fontWeight: 850 }}>Guide standards</h2>
            <ul style={{ display: "grid", gap: 11, margin: 0, padding: 0, listStyle: "none" }}>
              {[
                "Reviewed against official government sources.",
                "Updated when statutory rates change.",
                "Linked to relevant calculators and next steps.",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: 9, color: "#52616f", fontSize: 13, fontWeight: 720 }}>
                  <span style={{ width: 20, height: 20, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "50%", background: "#e9f7f1", color: "#16835b", fontSize: 12, fontWeight: 900 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ── Search band ── */}
      <div style={{ maxWidth: 1180, margin: "-20px auto 0", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-label="Find a guide"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_170px_170px_52px] gap-2.5"
          style={{ border: "1px solid #c8d9ea", borderRadius: 10, background: "#fff", boxShadow: "0 14px 32px rgba(16,32,51,.08)", padding: 14 }}
        >
          <input
            type="search"
            aria-label="Search guides"
            placeholder="Search guides: unpaid wages, notice pay, redundancy, sick pay"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            style={{ minHeight: 50, border: "1px solid #d8e2ec", borderRadius: 8, background: "#fff", color: "#102033", padding: "0 14px", outline: "none", fontSize: 13 }}
          />
          <select
            aria-label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ minHeight: 50, border: "1px solid #d8e2ec", borderRadius: 8, background: "#fff", color: "#102033", padding: "0 14px", outline: "none", fontSize: 13 }}
          >
            <option value="all">All countries</option>
            <option value="UK">United Kingdom</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
          <select
            aria-label="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ minHeight: 50, border: "1px solid #d8e2ec", borderRadius: 8, background: "#fff", color: "#102033", padding: "0 14px", outline: "none", fontSize: 13 }}
          >
            <option value="all">All topics</option>
            <option value="leaving">Leaving a job</option>
            <option value="pay">Pay &amp; tax</option>
            <option value="parental">Parental leave</option>
            <option value="benefits">Benefits</option>
          </select>
          <button
            type="submit"
            aria-label="Search"
            style={{ minHeight: 50, border: 0, borderRadius: 8, background: "#1769e0", color: "#fff", fontSize: 18, fontWeight: 900, cursor: "pointer" }}
            className="col-span-1"
          >
            →
          </button>
        </form>
      </div>

      {/* ── Main ── */}
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 24px 74px" }}>

        {/* Topic strip */}
        <nav
          aria-label="Guide topics"
          className="flex gap-2 overflow-x-auto pb-4 mb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                flexShrink: 0, minHeight: 72,
                border: activeTab === tab.key ? "1px solid #a8c9ef" : "1px solid #d8e2ec",
                borderRadius: 8, background: "#fff",
                padding: 12,
                display: "flex", flexDirection: "column", justifyContent: "center",
                color: activeTab === tab.key ? "#0f56bd" : "#25384c",
                fontSize: 13, fontWeight: 850, cursor: "pointer",
                textAlign: "left", minWidth: 140,
                boxShadow: activeTab === tab.key ? "inset 0 -3px 0 #1769e0" : "none",
              }}
            >
              {tab.label}
              <span style={{ marginTop: 2, color: activeTab === tab.key ? "#0f56bd" : "#52616f", fontSize: 12, fontWeight: 650, display: "block" }}>
                {tab.sub}
              </span>
            </button>
          ))}
        </nav>

        {/* Content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-8 items-start" style={{ marginTop: 4 }}>

          {/* Main column */}
          <section aria-label="Guides">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 18 }}>
              <div>
                <h2 style={{ margin: 0, color: "#102033", fontSize: 28, lineHeight: 1.15, fontWeight: 850 }}>
                  {activeTab === "featured" ? "Recommended guides" : TABS.find((t) => t.key === activeTab)?.label}
                </h2>
                <p style={{ margin: "7px 0 0", color: "#52616f", fontSize: 14 }}>
                  {activeTab === "featured"
                    ? "Lead with the highest-intent topics. Find the right guide for your situation."
                    : `${filtered.length} guide${filtered.length !== 1 ? "s" : ""} in this topic.`}
                </p>
              </div>
            </div>

            {/* Featured guide card (only on Featured tab or when there's a top guide) */}
            {featuredGuide && (
              <Link
                href={`/guides/${featuredGuide.slug}`}
                style={{ display: "block", border: "1px solid #c8d9ea", borderRadius: 10, background: "#fff", boxShadow: "0 18px 44px rgba(16,32,51,.10)", overflow: "hidden", marginBottom: 20, textDecoration: "none" }}
              >
                {/* Gradient top */}
                <div
                  style={{
                    minHeight: 210, display: "grid", alignContent: "end", padding: 24, color: "#fff",
                    background: "linear-gradient(180deg,rgba(16,32,51,.08) 0%,rgba(16,32,51,.78) 100%),linear-gradient(135deg,#16324f 0%,#d9e8f4 48%,#1769e0 100%)",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <CountryBadge country={featuredGuide.country} />
                    <CategoryBadge label={featuredGuide.category} />
                    <CategoryBadge label="Updated 2026" />
                  </div>
                  <h2 style={{ maxWidth: 700, margin: 0, fontSize: 32, lineHeight: 1.12, fontWeight: 850 }}>
                    {featuredGuide.title}
                  </h2>
                </div>
                {/* Body row */}
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-[18px]"
                  style={{ padding: "18px 22px" }}
                >
                  <p style={{ margin: 0, color: "#25384c", fontSize: 15, flex: 1 }}>
                    {featuredGuide.description}
                  </p>
                  <span
                    style={{
                      flexShrink: 0, minHeight: 44, display: "inline-flex", alignItems: "center",
                      justifyContent: "center", borderRadius: 8, background: "#1769e0",
                      color: "#fff", padding: "0 15px", fontSize: 13, fontWeight: 900, whiteSpace: "nowrap",
                    }}
                  >
                    Read guide →
                  </span>
                </div>
              </Link>
            )}

            {/* Guide grid */}
            {gridGuides.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gridGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    style={{ display: "block", border: "1px solid #d8e2ec", borderRadius: 8, background: "#fff", padding: 17, textDecoration: "none" }}
                    className="hover:border-[#a8c9ef] transition-colors"
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span
                        style={{
                          display: "inline-flex", alignItems: "center", borderRadius: 999,
                          background: "#eaf3ff", color: "#16324f",
                          padding: "5px 9px", fontSize: 11, fontWeight: 900,
                          textTransform: "uppercase", letterSpacing: ".03em",
                        }}
                      >
                        {guide.country}
                      </span>
                      <span
                        style={{
                          display: "inline-flex", alignItems: "center", borderRadius: 999,
                          background: "#f6f9fc", color: "#16324f",
                          padding: "5px 9px", fontSize: 11, fontWeight: 900,
                          textTransform: "uppercase", letterSpacing: ".03em",
                        }}
                      >
                        {guide.category}
                      </span>
                    </div>
                    <h3 style={{ margin: "0 0 8px", color: "#102033", fontSize: 17, lineHeight: 1.28, fontWeight: 800 }}>
                      {guide.title}
                    </h3>
                    <p style={{ margin: "0 0 14px", color: "#52616f", fontSize: 13 }}>
                      {guide.description}
                    </p>
                    <span style={{ color: "#0f56bd", fontSize: 13, fontWeight: 900 }}>
                      Read guide →
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <p style={{ color: "#52616f", fontSize: 14, padding: "32px 0" }}>
                No guides found. Try adjusting the search or topic filter.
              </p>
            )}
          </section>

          {/* Side rail */}
          <aside
            className="hidden lg:grid gap-4"
            style={{ position: "sticky", top: 88 }}
            aria-label="Quick calculator links"
          >
            <section style={{ border: "1px solid #d8e2ec", borderRadius: 10, background: "#fff", padding: 18 }}>
              <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 18, lineHeight: 1.2, fontWeight: 850 }}>Use a calculator next</h2>
              <div style={{ display: "grid", gap: 8 }}>
                {CALCULATOR_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                      minHeight: 42, border: "1px solid #e7edf3", borderRadius: 8,
                      background: "#f6f9fc", color: "#25384c",
                      padding: "9px 11px", fontSize: 13, fontWeight: 850, textDecoration: "none",
                    }}
                  >
                    {link.label}
                    <span style={{ color: "#0f56bd" }}>→</span>
                  </Link>
                ))}
              </div>
            </section>

            <section
              style={{ border: "1px solid #f1d9aa", borderRadius: 10, background: "#fff4df", padding: 18 }}
            >
              <p style={{ margin: 0, color: "#5d461d", fontSize: 13 }}>
                <strong style={{ display: "block", color: "#3c2c0d", marginBottom: 5 }}>Editorial note</strong>
                Guides are decision support. They explain the rule, the evidence, the next step, and the matching calculator. Not legal advice.
              </p>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
