"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { TOOLS, CATEGORY_META } from "@/data/tools";
import { SITE } from "@/lib/seo";
import { TablerIcon } from "./TablerIcon";
import { CountryFlag } from "./CountryFlag";

const CATEGORY_LINKS = [
  { label: "Leaving a Job", href: "/#cat-leaving-job" },
  { label: "Pay & Tax", href: "/#cat-pay-tax" },
  { label: "Parental Leave", href: "/#cat-parental-leave" },
  { label: "Benefits & Entitlements", href: "/#cat-benefits" },
];

const COUNTRY_LINKS = [
  { code: "UK", label: "United Kingdom", href: "/uk" },
  { code: "US", label: "United States", href: "/us" },
  { code: "CA", label: "Canada", href: "/ca" },
  { code: "AU", label: "Australia", href: "/au" },
];

function LogoMark() {
  return (
    <span
      style={{ width: 31, height: 31, display: "grid", placeItems: "center", border: "1px solid #b7d3f4", borderRadius: 7, color: "#1769e0", background: "#f2f7fd", fontWeight: 900, fontSize: 15 }}
    >
      M
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"calculators" | "countries" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    function handler(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menu]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-surface-line bg-white">
        <div className="mx-auto flex h-18 max-w-[1180px] items-center justify-between px-6" style={{ height: "4.5rem" }}>
          {/* Logo */}
          <Link href="/" className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap font-extrabold" style={{ color: "#16324f", gap: 10 }} onClick={() => setOpen(false)}>
            <LogoMark />
            <span>MyPayRights</span>
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenu(menu === "calculators" ? null : "calculators")}
                className="flex items-center gap-1 text-[15px] font-medium text-ink transition-colors hover:text-brand-600"
                aria-expanded={menu === "calculators"}
              >
                Calculators
                <TablerIcon name="ti-chevron-down" size={14} aria-hidden="true" className={`transition-transform ${menu === "calculators" ? "rotate-180" : ""}`} />
              </button>
              {menu === "calculators" && (
                <div className="absolute left-0 top-full z-50 mt-3 min-w-[220px] rounded-xl border border-surface-line bg-white py-2 shadow-lg">
                  {CATEGORY_LINKS.map((c) => (
                    <Link key={c.href} href={c.href} onClick={() => setMenu(null)} className="block px-4 py-2 text-sm text-ink-soft hover:bg-surface-muted hover:text-ink">
                      {c.label}
                    </Link>
                  ))}
                  <Link href="/#all-calculators" onClick={() => setMenu(null)} className="block border-t border-surface-line px-4 py-2 text-sm font-medium text-brand-600 hover:bg-surface-muted">
                    View all calculators →
                  </Link>
                </div>
              )}
            </div>

            <Link href="/guides" className="text-[15px] font-medium text-ink transition-colors hover:text-brand-600">Guides</Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenu(menu === "countries" ? null : "countries")}
                className="flex items-center gap-1 text-[15px] font-medium text-ink transition-colors hover:text-brand-600"
                aria-expanded={menu === "countries"}
              >
                Countries
                <TablerIcon name="ti-chevron-down" size={14} aria-hidden="true" className={`transition-transform ${menu === "countries" ? "rotate-180" : ""}`} />
              </button>
              {menu === "countries" && (
                <div className="absolute left-0 top-full z-50 mt-3 min-w-[200px] rounded-xl border border-surface-line bg-white py-2 shadow-lg">
                  {COUNTRY_LINKS.map((c) => (
                    <Link key={c.href} href={c.href} onClick={() => setMenu(null)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-ink-soft hover:bg-surface-muted hover:text-ink">
                      <CountryFlag country={c.code} size={18} />
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="text-[15px] font-medium text-ink transition-colors hover:text-brand-600">About Us</Link>
            <Link href="/blog" className="text-[15px] font-medium text-ink transition-colors hover:text-brand-600">News</Link>
          </nav>

          {/* Right */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/uk" className="flex items-center gap-2 rounded-lg border border-surface-line px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-brand-600">
              <CountryFlag country="UK" size={18} />
              UK
              <TablerIcon name="ti-chevron-down" size={14} aria-hidden="true" className="text-ink-faint" />
            </Link>
            <Link href="/#all-calculators" aria-label="Search calculators" className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-line text-ink-soft transition-colors hover:border-brand-600 hover:text-brand-600">
              <TablerIcon name="ti-search" size={18} aria-hidden="true" />
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
