"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TOOLS, CATEGORY_META } from "@/data/tools";
import { SITE } from "@/lib/seo";
import { TablerIcon } from "./TablerIcon";

const HERO_TOOLS = TOOLS.filter((t) => t.hero);

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="border-b border-surface-line">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Image
              src="/logo-mark.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
              priority
              aria-hidden="true"
            />
            <span className="text-base font-medium tracking-tight text-ink">{SITE.name}</span>
          </Link>

          {/* Desktop nav — hero tools + Guides */}
          <nav aria-label="Quick tools" className="hidden items-center gap-5 sm:flex">
            {HERO_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {tool.shortName}
              </Link>
            ))}
            <Link
              href="/guides"
              className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
            >
              Guides
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink sm:hidden"
          >
            <TablerIcon name={open ? "ti-x" : "ti-menu-2"} size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {open && (
        <div
          id="mobile-nav"
          className="border-b border-surface-line bg-white sm:hidden"
          role="navigation"
          aria-label="Mobile menu"
        >
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
          <div className="flex gap-4 px-5 py-4">
            <Link href="/guides" onClick={() => setOpen(false)} className="text-xs font-medium text-brand-600 hover:text-brand-700">Guides</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="text-xs text-ink-faint hover:text-ink-soft">About</Link>
            <Link href="/privacy" onClick={() => setOpen(false)} className="text-xs text-ink-faint hover:text-ink-soft">Privacy</Link>
            <Link href="/terms" onClick={() => setOpen(false)} className="text-xs text-ink-faint hover:text-ink-soft">Terms</Link>
          </div>
        </div>
      )}
    </>
  );
}
