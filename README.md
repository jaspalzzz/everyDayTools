# EmploymentTools

Country-aware employment calculators with instant document output. Single-vertical
SEO tool site — Tier 1 launch set.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v3
- Client-side PDF generation (jsPDF) — nothing is uploaded or stored

## Architecture

```
lib/calculators/*.ts   Pure calculation engines (no UI). Statutory constants live here.
lib/pdf.ts             Client-side document generator (the workflow moat).
lib/seo.ts             WebApplication + FAQPage schema helpers.
data/tools.ts          Single source of truth: homepage, nav, internal links, sitemap.
components/ToolLayout   Shared page contract every calculator slots into.
components/calculators  One client component per tool (inputs → live result → PDF).
app/<slug>/page.tsx     Server page: metadata, schema, content block, FAQ.
```

## Tier 1 tools

| Tool | Region | Engine |
|------|--------|--------|
| Redundancy pay | UK | `lib/calculators/redundancy.ts` |
| PTO payout | US (state-aware) | `lib/calculators/ptoPayout.ts` |
| Notice period | UK / CA | `lib/calculators/noticePeriod.ts` |
| Severance | US / UK / CA | `lib/calculators/severance.ts` |
| Overtime | US / UK / CA / AU | `lib/calculators/takeHome.ts` |

## Maintenance ("drift moat")

Statutory constants change yearly. Review every April:

- `REDUNDANCY_CONSTANTS.weeklyPayCap` (UK, set each April)
- `STATE_PTO` rules (US, per-state)

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # strict TS check
npm run build      # production build
```
