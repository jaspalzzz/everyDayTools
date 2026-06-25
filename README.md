# EmploymentTools

Country-aware employment calculators with instant document output. Single-vertical
SEO tool site — **16 tools live across Tiers 1–3**.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v3
- Client-side PDF generation (jsPDF) — nothing is uploaded or stored
- Vitest (unit/component) + Playwright (e2e)
- GitHub Actions CI (quality-gate → e2e)

## Architecture

```
lib/calculators/*.ts      Pure calculation engines (no UI). Statutory constants live here.
lib/pdf.ts                Client-side document generator (the workflow moat).
lib/seo.ts                Site metadata, public URL/contact config, schema helpers.
lib/types.ts              CalcResult contract every engine returns.
lib/format.ts             Locale-aware currency/number formatting.
data/tools.ts             Single source of truth: homepage, nav, internal links, sitemap.
components/ToolLayout     Shared page contract every calculator slots into.
components/ResultPanel    Live headline, breakdown, notes, PDF CTA.
components/fields.tsx     Accessible primitives: NumberField, SelectField, DateField, FieldGrid.
components/calculators/   One client component per tool (inputs → live result → PDF).
app/<slug>/page.tsx       Server page: metadata, schema, 300-word block, 6 FAQs, source.
test/                     100 Vitest unit/component tests.
e2e/                      33 Playwright tests — PDF bytes + live-result contract per tool.
```

## All 16 tools

**Tier 1 — hero launch set**

| Tool | Region | Engine |
|------|--------|--------|
| Redundancy pay | UK | `lib/calculators/redundancy.ts` |
| PTO payout | US — 50 states + DC | `lib/calculators/ptoPayout.ts` |
| Notice period | UK / CA | `lib/calculators/noticePeriod.ts` |
| Severance pay | US / UK / CA | `lib/calculators/severance.ts` |
| Overtime pay | US / UK / CA / AU | `lib/calculators/overtime.ts` |

**Tier 2 — expansion**

| Tool | Region | Engine |
|------|--------|--------|
| Salary → hourly | US / UK / CA / AU | `lib/calculators/salaryToHourly.ts` |
| Holiday entitlement | UK | `lib/calculators/holidayAccrual.ts` |
| Maternity pay (SMP) | UK | `lib/calculators/maternityPay.ts` |
| Statutory sick pay (SSP) | UK | `lib/calculators/sickPay.ts` |
| Final paycheck deadline | US — 50 states + DC | `lib/calculators/finalPaycheck.ts` |
| Unemployment benefit | US — 4 verified states | `lib/calculators/unemployment.ts` |

**Tier 3 — long-tail funnel**

| Tool | Region | Engine |
|------|--------|--------|
| Pay rise | US / UK / CA / AU | `lib/calculators/payRise.ts` |
| Pro-rata salary | US / UK / CA / AU | `lib/calculators/proRataSalary.ts` |
| Bonus tax | US / UK / CA / AU | `lib/calculators/bonusTax.ts` |
| Working days | US / UK / CA / AU | `lib/calculators/workingDays.ts` |
| Garden leave | UK | `lib/calculators/gardenLeave.ts` |

## Quality gate

Every push runs:

```bash
npm run test        # 100 Vitest unit/component tests
npm run typecheck   # tsc --noEmit, strict mode
npm run build       # next build (23 routes)
npm run e2e         # 33 Playwright tests
```

Run locally before pushing:

```bash
npm run test && npm run typecheck && npm run build
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # strict TS check
npm run build      # production build
npm run test       # unit tests
npm run e2e        # e2e tests (requires built app or dev server)
```

## Maintenance ("drift moat")

Statutory constants change yearly. Review every April (UK budget) and at US benefit-year
changes. Key constants to refresh:

| Constant | File | When |
|----------|------|------|
| `REDUNDANCY_CONSTANTS.weeklyPayCap` | `lib/calculators/redundancy.ts` | Each April |
| `SMP_CONSTANTS`, `SSP_CONSTANTS` | `lib/calculators/maternityPay.ts`, `sickPay.ts` | Each April |
| `HOLIDAY_CONSTANTS` | `lib/calculators/holidayAccrual.ts` | Each April |
| `STATE_PTO` rules | `lib/calculators/ptoPayout.ts` | As state laws change |
| `UNEMPLOYMENT_STATES` caps | `lib/calculators/unemployment.ts` | Each benefit year |
| US supplemental tax rate | `lib/calculators/bonusTax.ts` | As IRS updates |

## Launch configuration

- `NEXT_PUBLIC_SITE_URL` may override the production URL used for metadata, sitemap,
  robots, canonicals, and schema. The fallback is `https://employmenttools.com`.
- Public contact emails live in `lib/seo.ts`.
- Analytics/Search Console are tracked in [TASKS.md](TASKS.md) under T1.3.

See [TASKS.md](TASKS.md) for the full post-launch roadmap.
