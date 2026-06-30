"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { TOOLS, CATEGORY_META } from "@/data/tools";
import { SITE } from "@/lib/seo";
import { TablerIcon } from "./TablerIcon";
import { CountryFlag } from "./CountryFlag";

// Consistent SVG chevron — always same size, same weight
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      style={{ transition: "transform 180ms ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const MEGA_CATEGORIES = [
  { icon: "L", label: "Leaving a job", desc: "Redundancy, notice pay, severance, settlement, final paycheck.", href: "/#cat-leaving-job" },
  { icon: "P", label: "Pay & tax", desc: "Take-home pay, overtime, deductions, salary to hourly, bonus tax.", href: "/#cat-pay-tax" },
  { icon: "F", label: "Family & parental leave", desc: "Maternity pay, paternity pay, shared parental leave and adoption pay.", href: "/#cat-parental-leave" },
  { icon: "B", label: "Benefits & entitlements", desc: "Sick pay, holiday pay, unemployment benefits and annual leave.", href: "/#cat-benefits" },
  { icon: "H", label: "Hours & workplace", desc: "Working days, overtime checks, annual leave and pay-period dates.", href: "/#cat-hours" },
  { icon: "A", label: "All calculators", desc: "Browse every calculator by category, country and workplace issue.", href: "/#all-calculators" },
] as const;

const MEGA_TOOLS = [
  { label: "Redundancy pay", href: "/redundancy-pay-calculator" },
  { label: "Notice pay", href: "/notice-period-calculator" },
  { label: "Holiday pay", href: "/holiday-entitlement-calculator" },
  { label: "Final paycheck deadline", href: "/final-paycheck-calculator" },
  { label: "Unpaid wages", href: "/unpaid-wages-calculator" },
] as const;

const COUNTRY_LINKS = [
  { code: "UK", label: "United Kingdom", sub: "Statutory pay and employment rights", href: "/uk" },
  { code: "US", label: "United States", sub: "Federal and state pay rules", href: "/us" },
  { code: "CA", label: "Canada", sub: "Federal and provincial rights", href: "/ca" },
  { code: "AU", label: "Australia", sub: "Fair Work and NES entitlements", href: "/au" },
] as const;

function LogoMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 84 84" aria-hidden="true">
      <g transform="translate(6 6) scale(.75)">
        <path d="M26 14h30l16 16v48H26z" fill="#FFFFFF"/>
        <path d="M56 14v16h16" fill="#EAF3FF"/>
        <path d="M26 14h30l16 16v48H26z" fill="none" stroke="#16324F" strokeWidth="5" strokeLinejoin="round"/>
        <path d="M56 14v16h16" fill="none" stroke="#16324F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M36 35h18M36 47h22M36 59h14" fill="none" stroke="#16324F" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="67" cy="66" r="16" fill="#1769E0"/>
        <path d="M59 66l6 6 12-14" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"calculators" | "countries" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((name: "calculators" | "countries") => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setMenu(name);
  }, []);

  const closeMenu = useCallback(() => {
    leaveTimer.current = setTimeout(() => setMenu(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-surface-line" style={{ background: "rgba(255,255,255,.95)", backdropFilter: "blur(14px)" }}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6" style={{ height: 68 }}>

          {/* Logo */}
          <Link href="/" className="inline-flex shrink-0 items-center whitespace-nowrap" style={{ gap: 10 }} onClick={() => setOpen(false)}>
            <LogoMark />
            <span style={{ fontWeight: 800, fontSize: 17 }}>
              <span style={{ color: "#102033" }}>MyPay</span><span style={{ color: "#1769e0" }}>Rights</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-6 lg:flex">

            {/* Calculators mega-menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("calculators")}
              onMouseLeave={closeMenu}
            >
              <button
                type="button"
                aria-expanded={menu === "calculators"}
                style={{
                  height: 40, display: "inline-flex", alignItems: "center", gap: 7,
                  border: menu === "calculators" ? "1px solid #b8d3f1" : "1px solid transparent",
                  borderRadius: 8,
                  color: menu === "calculators" ? "#0f56bd" : "#25384c",
                  background: menu === "calculators" ? "#f7fbff" : "transparent",
                  padding: "0 11px", cursor: "default", fontWeight: 850, fontSize: 14,
                }}
              >
                Calculators
                <Chevron open={menu === "calculators"} />
              </button>

              {menu === "calculators" && (
                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMenu}
                  style={{
                    position: "absolute", top: "calc(100% + 14px)", left: "50%",
                    width: "min(940px, calc(100vw - 48px))",
                    transform: "translateX(-38%)",
                    border: "1px solid #cbd9e8", borderRadius: 12, background: "#fff",
                    boxShadow: "0 24px 70px rgba(16,32,51,.18)", overflow: "hidden", zIndex: 100,
                  }}
                >
                  {/* Arrow caret */}
                  <div style={{
                    position: "absolute", top: -7, left: "28%", width: 14, height: 14,
                    borderTop: "1px solid #cbd9e8", borderLeft: "1px solid #cbd9e8",
                    background: "#fff", transform: "rotate(45deg)", zIndex: 2,
                  }} />

                  <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.25fr .9fr", minHeight: 360 }}>
                    {/* Left: category grid */}
                    <div style={{ padding: 22 }}>
                      <p style={{ margin: "0 0 4px", color: "#16835b", fontSize: 11, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase" }}>
                        Find the right pay-rights tool
                      </p>
                      <p style={{ margin: "0 0 18px", color: "#102033", fontSize: 19, lineHeight: 1.25, fontWeight: 850 }}>
                        Calculators grouped by the way people actually think about workplace pay.
                      </p>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
                        {MEGA_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            onClick={() => setMenu(null)}
                            style={{
                              minHeight: 98, display: "grid", gridTemplateColumns: "38px 1fr", gap: 12,
                              border: "1px solid #e7edf3", borderRadius: 8, background: "#f6f9fc",
                              padding: 13, textDecoration: "none",
                            }}
                          >
                            <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 8, background: "#eaf3ff", color: "#1769e0", fontSize: 13, fontWeight: 900 }}>
                              {cat.icon}
                            </span>
                            <span>
                              <strong style={{ display: "block", marginBottom: 4, color: "#102033", fontSize: 14, lineHeight: 1.25, fontWeight: 800 }}>{cat.label}</strong>
                              <span style={{ display: "block", color: "#52616f", fontSize: 12, lineHeight: 1.4, fontWeight: 600 }}>{cat.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right: most-used + countries + CTA */}
                    <div style={{ borderLeft: "1px solid #e7edf3", background: "#f8fbff", padding: 22 }}>
                      <h3 style={{ margin: "0 0 12px", color: "#102033", fontSize: 15, fontWeight: 800 }}>Most used calculators</h3>
                      <div style={{ display: "grid", gap: 8, marginBottom: 18 }}>
                        {MEGA_TOOLS.map((t) => (
                          <Link
                            key={t.href}
                            href={t.href}
                            onClick={() => setMenu(null)}
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                              minHeight: 42, border: "1px solid #dce7f2", borderRadius: 8, background: "#fff",
                              padding: "9px 11px", color: "#25384c", fontSize: 13, fontWeight: 850, textDecoration: "none",
                            }}
                          >
                            {t.label}
                            <span style={{ color: "#0f56bd" }}>→</span>
                          </Link>
                        ))}
                      </div>

                      <h3 style={{ margin: "0 0 8px", color: "#102033", fontSize: 15, fontWeight: 800 }}>Country rules</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7, marginBottom: 16 }}>
                        {(["UK","US","CA","AU"] as const).map((c) => (
                          <Link
                            key={c}
                            href={`/${c.toLowerCase()}`}
                            onClick={() => setMenu(null)}
                            style={{
                              minHeight: 34, display: "grid", placeItems: "center",
                              border: "1px solid #dce7f2", borderRadius: 8, background: "#fff",
                              color: "#25384c", fontSize: 12, fontWeight: 850, textDecoration: "none",
                            }}
                          >
                            {c}
                          </Link>
                        ))}
                      </div>

                      <Link
                        href="/#all-calculators"
                        onClick={() => setMenu(null)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
                          borderRadius: 8, background: "#16324f", color: "#fff", padding: 14, textDecoration: "none",
                        }}
                      >
                        <span>
                          <strong style={{ display: "block", fontSize: 14, lineHeight: 1.2, marginBottom: 3 }}>View all calculators</strong>
                          <span style={{ color: "#dce8f4", fontSize: 12, fontWeight: 600 }}>Search, filter and compare every tool.</span>
                        </span>
                        <span style={{ width: 34, height: 34, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: 8, background: "#fff", color: "#16324f", fontSize: 16, fontWeight: 900 }}>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/guides" style={{ fontSize: 14, fontWeight: 700, color: "#25384c" }} className="hover:text-brand-600 transition-colors">Guides</Link>

            {/* Countries dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("countries")}
              onMouseLeave={closeMenu}
            >
              <button
                type="button"
                aria-expanded={menu === "countries"}
                style={{
                  height: 40, display: "inline-flex", alignItems: "center", gap: 7,
                  border: menu === "countries" ? "1px solid #b8d3f1" : "1px solid transparent",
                  borderRadius: 8,
                  color: menu === "countries" ? "#0f56bd" : "#25384c",
                  background: menu === "countries" ? "#f7fbff" : "transparent",
                  padding: "0 11px", cursor: "default", fontWeight: 850, fontSize: 14,
                }}
              >
                Countries
                <Chevron open={menu === "countries"} />
              </button>

              {menu === "countries" && (
                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMenu}
                  style={{
                    position: "absolute", top: "calc(100% + 14px)", left: "50%", width: 300,
                    transform: "translateX(-50%)",
                    border: "1px solid #cbd9e8", borderRadius: 12, background: "#fff",
                    boxShadow: "0 24px 70px rgba(16,32,51,.16)", padding: 10, zIndex: 100,
                  }}>
                  {COUNTRY_LINKS.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setMenu(null)}
                      style={{
                        display: "grid", gridTemplateColumns: "42px 1fr", gap: 12,
                        alignItems: "center", minHeight: 54, borderRadius: 8,
                        padding: "8px 10px", color: "#25384c", fontSize: 14, fontWeight: 850, textDecoration: "none",
                      }}
                      className="hover:bg-[#f6f9fc] hover:text-[#0f56bd]"
                    >
                      <span style={{
                        width: 38, height: 32, display: "grid", placeItems: "center",
                        border: "1px solid #bfd3e8", borderRadius: 7, background: "#f8fbff",
                        color: "#16324f", fontSize: 12, fontWeight: 900, letterSpacing: ".04em",
                      }}>
                        {c.code}
                      </span>
                      <span>
                        {c.label}
                        <small style={{ display: "block", color: "#52616f", fontSize: 11, fontWeight: 700, marginTop: 1 }}>{c.sub}</small>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" style={{ fontSize: 14, fontWeight: 700, color: "#25384c" }} className="hover:text-brand-600 transition-colors">About</Link>
            <Link href="/blog" style={{ fontSize: 14, fontWeight: 700, color: "#25384c" }} className="hover:text-brand-600 transition-colors">News</Link>
          </nav>

          {/* Right actions */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Link
              href="/uk"
              style={{ height: 38, border: "1px solid #d8e2ec", borderRadius: 8, background: "#fff", color: "#25384c", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 12px", fontSize: 13, fontWeight: 800 }}
            >
              UK ▾
            </Link>
            <Link
              href="/#all-calculators"
              aria-label="Search calculators"
              style={{ width: 38, height: 38, border: "1px solid #d8e2ec", borderRadius: 8, background: "#fff", color: "#25384c", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}
            >
              ⌕
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink lg:hidden"
          >
            <TablerIcon name={open ? "ti-x" : "ti-menu-2"} size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div id="mobile-nav" className="border-b border-surface-line bg-white lg:hidden" role="navigation" aria-label="Mobile menu">
          {(Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[]).map((cat) => {
            const tools = TOOLS.filter((t) => t.category === cat);
            return (
              <div key={cat} className="border-b border-surface-line last:border-b-0">
                <p className="px-5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-widest text-brand-600">
                  {CATEGORY_META[cat].label}
                </p>
                <ul>
                  {tools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/${tool.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink"
                      >
                        <TablerIcon name={tool.icon} size={15} aria-hidden="true" className="shrink-0 text-ink-faint" />
                        {tool.shortName}
                        <span className="ml-auto rounded-full bg-surface-muted px-1.5 py-0.5 text-[9px] font-medium text-ink-faint">
                          {tool.region}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="flex flex-wrap gap-4 px-5 py-4">
            <Link href="/guides" onClick={() => setOpen(false)} className="text-xs font-medium text-brand-600 hover:text-brand-700">Guides</Link>
            <Link href="/uk" onClick={() => setOpen(false)} className="text-xs text-ink-faint hover:text-ink-soft">Countries</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="text-xs text-ink-faint hover:text-ink-soft">About</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="text-xs text-ink-faint hover:text-ink-soft">News</Link>
          </div>
        </div>
      )}
    </>
  );
}
