# Editorial-authority rebrand — review handoff for Codex

**Merged to `main` as `f94b213`** (single change commit `031697e`).
**Review command:** `git diff 07b199e..f94b213`  (or `git show 031697e`)
**Scope:** 25 files, +289 / −259. Design-only — no calculation logic, statutory
data, or copy meaning changed. Already verified by the author: `tsc` clean,
176 tests, production build (437 pages), programmatic/technical/schema
100/100/100, no horizontal overflow at 320px.

---

## 1. Foundation — type system (highest impact, review first)

- **`app/layout.tsx`** — added `next/font/google` for **Fraunces** (variable
  serif, `axes: ['opsz']`, display) + **Inter** (body/UI); exposes
  `--font-display` / `--font-sans`; applied via `<html className>`.
- **`app/globals.css`** — **removed the render-blocking Google Fonts `@import`**;
  `h1/h2/h3/.font-display` now use the serif; body background → warm ivory.

**Review focus:** no CLS / font-loading regression; the Fraunces `axes` config
builds; removing the CDN import didn't drop a weight anything relied on.

## 2. Foundation — colour tokens

- **`tailwind.config.ts`** — `brand` scale re-hued blue → **deep navy**
  (`600 #1E4E8C`); added `surface.paper #FAF8F2`; warmed `surface.muted` /
  `surface.line`; added `fontFamily.display`.

**Review focus:** anything relying on old `brand-800 #16324F` as "navy" (a
separate `navy` token still exists); WCAG AA contrast for navy-on-paper and the
warm borders on white cards.

## 3. Site-wide accent rebrand (the bulk — 22 component/page files)

The accent lived in **~200 hardcoded hex values** (inline `style={}` + Tailwind
classes), not just tokens. All swapped via scripted `sed`:

- `#1769E0`→`#1E4E8C`, `#1458BA`→`#163C6B`, `rgba(23,105,224…)`→`rgba(30,78,140…)`
- cool borders `#c8d9ea` / `#d8e2ec` / `#e7edf3` → warm neutrals
- cool tints `#f6f9fc` / `#eaf3ff` / `#f7fbff` / `#f1f7ff` → warm / navy-tint

Files: SiteHeader, SiteFooter, ToolLayout, ResultPanel, ConsentBanner, fields,
HomeToolList, CountryPage, GuidesIndex, NewsIndex, home/* (HeroSearch,
HeroResultCard, PopularCalculators, BrowseByCategory, BrowseBySituation,
GuidesResources), about, contact, page, au/ca/us landing pages.

**Review focus (a scripted hex-swap is riskiest here):**
- Any **remaining cool-blue** the sweep missed.
- Any hex that was **intentionally** blue/grey and shouldn't be navy/warm (the
  green success/eyebrow `#16835b` was deliberately left).
- **Contrast/legibility** on recoloured pills, links, buttons, warm borders.

## Suggested verification for Codex

```
git grep -nE "#1769e0|rgba\(23, ?105, ?224|#c8d9ea|#e7edf3|#f7fbff" -- 'app/**' 'components/**'   # expect 0
npm run build && npm run test        # 437 pages, 176 tests
npm run score:seo && npm run score:schema-seo && npm run score:programmatic-seo   # expect 100 each
```
Plus a visual pass at 1440 / 390 / 320 on homepage + a calculator page + a
country page (the three template families most affected).

## Not in this commit (context)

Phase-1 foundation only. Still open by design and **not** yet done: **logo
mark**, hero composition refinement, and micro-detailing (small-caps labels,
editorial rules, motion, card rhythm).
