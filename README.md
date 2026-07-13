# My Pay Rights

Law-backed calculators for pay, leave, and final wages with instant document output.
Single-vertical SEO tool site — **33 tools live across Tiers 1–3**.

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
test/                     203 Vitest unit/component regression tests.
e2e/                      Playwright journeys + PDF bytes/text contract per registered tool.
```

## Current catalogue — 33 tools

`data/tools.ts` is the authoritative catalogue. The current product groups are:

- **Leaving a job (15):** redundancy, settlement, tribunal, severance, notice,
  continuous service, probation dates, garden leave, employer exit-cost tools,
  US PTO/final-paycheck/unemployment, and Australian redundancy/notice.
- **Pay and tax (10):** take-home pay, overtime, salary/hourly, pay rise, pro-rata,
  bonus tax, IR35, day rate, self-employment tax, and payslip analysis.
- **Parental leave (4):** maternity, paternity, adoption, and shared parental pay.
- **Benefits and entitlements (4):** holiday entitlement, statutory sick pay,
  working days, and Australian annual leave.

PTO payout, final-paycheck deadlines, and unemployment benefits cover all 50 US
states plus Washington, DC. State PTO/final-pay rows include an official authority
URL and ISO verification date.

## Quality gate

Every push runs:

```bash
npm run test        # 203 Vitest unit/component tests
npm run typecheck   # tsc --noEmit, strict mode
npm run build       # static export → out/
npm run e2e         # journeys + PDF bytes/text checks for every registered tool
```

Run locally before pushing:

```bash
npm run test && npm run typecheck && npm run build && npm run audit:indexability
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # strict TS check
npm run build      # production build
npm run test       # unit tests
npm run e2e        # e2e tests (requires built app or dev server)
npm run audit:indexability
npm run audit:responsive
```

## Deployment (Cloudflare Pages — static)

The app is a **pure static export** (`output: "export"` in `next.config.mjs`). `npm run build`
emits a self-contained `out/` directory of HTML/CSS/JS with no server runtime, hosted free on
Cloudflare Pages as static assets.

**Cloudflare Pages project settings:**

| Setting | Value |
|---------|-------|
| Framework preset | Next.js (Static HTML Export) — or "None" |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | 20 (set `NODE_VERSION=20` env var if needed) |

**Environment variable** (Production and Preview):

```bash
NEXT_PUBLIC_SITE_URL=https://mypayrights.com
GOOGLE_SITE_VERIFICATION=google-site-verification-token
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-8825078307302402
NEXT_PUBLIC_ADSENSE_READY=false
# Optional; all four are required before independent-review claims are shown
NEXT_PUBLIC_LEGAL_REVIEWER_NAME=
NEXT_PUBLIC_LEGAL_REVIEWER_CREDENTIAL=
NEXT_PUBLIC_LEGAL_REVIEWER_URL=
NEXT_PUBLIC_LEGAL_REVIEWER_JURISDICTIONS=
```

This drives metadata, sitemap, robots, canonical URLs, and structured data. If unset, it falls
back to `https://mypayrights.com`. Search Console verification metadata is emitted when
`GOOGLE_SITE_VERIFICATION` is set. The AdSense account meta tag is emitted when
`NEXT_PUBLIC_ADSENSE_CLIENT` is set, and the client script remains off until
`NEXT_PUBLIC_ADSENSE_READY=true`.

**Edge headers** — `public/_headers` is copied to the output root and applied by Cloudflare Pages:
security headers (CSP, HSTS, `X-Frame-Options`, `nosniff`) on every route, plus a `Content-Type:
image/png` override for the extension-less `/opengraph-image` and `/twitter-image` files so social
scrapers accept them.

**Custom domain** — add `mypayrights.com` under the Pages project's *Custom domains* tab; Cloudflare
provisions the TLS certificate automatically.

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
  robots, canonicals, and schema. The fallback is `https://mypayrights.com`.
- `GOOGLE_SITE_VERIFICATION` or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` adds the Search Console
  verification meta tag.
- `NEXT_PUBLIC_ADSENSE_CLIENT` adds the site-level AdSense publisher meta tag. If unset, the
  production publisher ID `ca-pub-8825078307302402` is used.
- `NEXT_PUBLIC_ADSENSE_READY=true` enables the AdSense runtime script after consent.
- `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXXXXX`) enables consent-gated Google Analytics 4. GA loads
  only after the visitor accepts cookies (same `ConsentBanner` choice as AdSense); if unset, no
  analytics ships. Set it in Cloudflare Pages Production/Preview to start collecting a baseline.
- `NEXT_PUBLIC_SOCIAL_PROFILES` (comma-separated URLs) populates `Organization.sameAs` in the
  homepage JSON-LD. Empty by default — set it only to genuine brand/social profiles (never a
  placeholder), as an invalid `sameAs` is worse than none.
- `public/ads.txt` contains the Google AdSense publisher record for `pub-8825078307302402`.
- Public contact emails live in `lib/seo.ts`.
- Analytics/Search Console are tracked in [TASKS.md](TASKS.md) under T1.3.

See [TASKS.md](TASKS.md) for the full post-launch roadmap.
