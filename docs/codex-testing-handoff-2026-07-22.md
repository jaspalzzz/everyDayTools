# Codex testing handoff — AdSense low-value remediation follow-up (2026-07-22)

## Scope
Three commits on top of the previous remediation (`5024416`):

| Commit | Summary |
|--------|---------|
| `41f9694` | Gate AdSense jurisdiction pages at the route level |
| `6db4636` | Address codex review: Wyoming law fix, hubs-only, static-server 404 |
| `7fe25bd` | Own the HTML edge-cache TTL to stop 7-day stale-page caching |

Review range: `git diff 5024416..HEAD`. (An earlier `git-show` capture was
removed; use `git show <hash>` for any single-commit diff.)

The goal was to eliminate the reviewer-reachable low-value/templated content that
caused the "Low value content" rejection, fix a legal-accuracy bug, and remove the
caching that kept deleted pages alive at the edge.

---

## What changed, and what to test

### 1. Route-level gating of jurisdiction pages (`41f9694`)
**Change:** Jurisdiction pages are emitted only for records that pass
`lib/contentQuality.ts` `isIndexable*`. Non-qualifying URLs are absent from the
`output: export` build (they 404), not merely `noindex`.
- `app/us/states/[state]/page.tsx`: `generateStaticParams` filtered to
  `isIndexableUsState`; component `notFound()` guard.
- `app/us/page.tsx`, `app/ca/page.tsx`, `app/au/page.tsx`: directory grids link
  only indexable records (US shows non-linked reference cells for the rest).
- `app/research/us-final-paycheck-laws/page.tsx`, `app/us/final-paycheck/page.tsx`,
  `data/faqs.ts`, guide exit link: internal links de-pointed from gated pages.

**Test:**
- No US state except kansas/mississippi/wyoming is emitted (rest 404).
- No internal link anywhere resolves to a gated (404) jurisdiction URL.
- Non-indexable state hub metadata emits `robots: noindex, follow`.

### 2. Publish only the 3 curated hubs; child routes deleted (`6db4636`)
**Change:** Deleted `app/us/states/[state]/{minimum-wage,final-paycheck,pto-payout}/`.
Only the state **hub** (`/us/states/{slug}`) is published now — the child routes
rendered mostly template-variant prose (60–77% cross-state overlap) without the
hub's sourced local analysis.
- `app/us/states/[state]/page.tsx`: removed the "Deep dives" section (linked the
  now-deleted children).
- `app/sitemap.ts`: state entries emit hub only (1 URL per curated state, not 4).
- `app/research/...`, `app/us/final-paycheck/page.tsx`: state links repointed from
  `/{slug}/final-paycheck` to the hub `/{slug}`.

**Test:**
- Build emits exactly 3 jurisdiction HTML files: kansas/mississippi/wyoming hubs.
- No `/us/states/*/{minimum-wage,final-paycheck,pto-payout}` route exists (404).
- Sitemap contains only the 3 hub URLs under `/us/states/` (total 194).

### 3. Wyoming legal-accuracy fix (`6db4636`) — YMYL, P1
**Change:** `data/usStates.ts` Wyoming `finalPaycheckTerminated` /
`finalPaycheckResigned` changed from "Within 5 business days" → "Next regular
payday". Verified against Wyoming DWS FAQ citing **W.S. 27-4-104(a)** (amended
2019; both termination and resignation = next regular payday).

**Test:**
- Live/built Wyoming hub renders "Next regular payday", never "Within 5 business
  days" (appears in StatCards + FAQ, ~4 occurrences).
- Sanity-check kansas (K.S.A. 44-315 → next payday) and mississippi (no state
  statute → federal default) if re-reviewing legal data.

### 4. CA/AU dynamic routes deleted + restoration guard (`41f9694`, `6db4636`)
**Change:** `app/ca/provinces/[province]/page.tsx` and
`app/au/states/[state]/page.tsx` deleted (nothing curated; `output: export` can't
emit an empty dynamic route). `data/caProvinces.ts` / `data/auStates.ts` untouched.
Added maintenance comments in `app/sitemap.ts` and the `/ca`, `/au` grids: a record
becoming indexable without restoring its route file would create a 404 link.

**Test:**
- All `/ca/provinces/*` and `/au/states/*` routes 404.
- `test/contentQuality.test.ts` asserts every CA/AU record is currently
  non-indexable (tripwire — fails loudly if one qualifies without a route).

### 5. Static export server returns real 404 (`6db4636`) — P2
**Change:** `scripts/serve_static_export.py` previously served `404.html` with
HTTP **200** (soft-404). Now `send_head` sends a real **404** for missing paths,
matching the production static host.

**Test:**
- `python3 scripts/serve_static_export.py` then GET a missing path → HTTP 404.
- Listed routes still 200. `seo-remediation.spec` passes under BOTH the default
  (dev) and `playwright.static.config.ts` configs (previously failed the latter).

### 6. HTML edge-cache TTL owned by the app (`7fe25bd`)
**Change:** HTML had no app-set `Cache-Control`; a platform default cached it at the
edge for 7 days (`s-maxage=604800`), so deleted pages lingered. Now:
- `functions/_middleware.ts` sets `Cache-Control: public, max-age=0, s-maxage=600,
  must-revalidate` on HTML responses.
- `public/_headers` sets the same **only** on the regenerated dynamic files
  (`/sitemap.xml`, `/robots.txt`) — **not** on `/*`. Cloudflare *merges* matching
  `_headers` rules (it does not pick the most specific), so a global `/*`
  `Cache-Control` gets appended to the `/_next/static/*` rule and shortens the
  hashed-asset edge TTL. Setting it per-path avoids that.
- `/_next/static/*` keeps `max-age=31536000, immutable` (long browser **and** edge
  cache).

**Test:**
- Live HTML (and cache-busted) responses return the short `Cache-Control`
  (`s-maxage=600`).
- `/sitemap.xml` returns `s-maxage=600`.
- `/_next/static/*` returns `max-age=31536000, immutable` with **no** `s-maxage`
  (confirm the merge leak is gone — a prior revision incorrectly returned
  `max-age=31536000, s-maxage=600, must-revalidate, immutable`).
- Deleted routes propagate to 404 within ~10 min (no manual purge needed going
  forward). Note: does NOT retroactively evict objects already cached under the old
  header.

---

## Regression checks (must stay green)
```bash
npm run test          # 242 unit/component tests
npm run typecheck     # tsc --noEmit
npm run build         # static export
npm run audit:responsive   # 320 / 375 / 768 overflow + clipped-interactive
npx playwright test e2e/seo-remediation.spec.ts --config=playwright.static.config.ts
npx playwright test e2e/production-links.spec.ts   # internal-link crawl (dev server)
```
Build-artifact checks:
```bash
ls out/us/states                       # kansas.html, mississippi.html, wyoming.html only
find out/ca/provinces out/au/states -name '*.html' 2>/dev/null   # none
grep -c "<loc>" out/sitemap.xml        # 194
grep -c "Within 5 business days" out/us/states/wyoming.html       # 0
```

## Known non-code caveats (not defects)
- **Stuck edge cache (still live):** one Cloudflare POP (AMS) is still serving
  `/ca/provinces/ontario` (and intermittently `/us/states/texas`) as HTTP 200 from an
  object cached under the OLD 7-day header — three purge operations (2× Purge
  Everything, 1× Purge-by-URL) have not evicted it (`Age` ~150k s and climbing). The
  origin and other POPs return 404, but **the stale page remains reviewer-reachable
  via AMS** until that object's 7-day TTL expires (~5 days) or Development Mode forces
  a cache bypass. It cannot recur once cleared (new short header). This is a concrete
  reason not to resubmit yet, not merely a formality.
- **CI e2e job flakiness:** the e2e job runs against `next dev` and intermittently
  fails with `ERR_CONNECTION_RESET` / `apiRequestContext aborted` / timeouts under
  parallel load — a pre-existing dev-server-under-load issue, not from these commits
  (quality-gate job passes; the same specs pass locally against the static server).
- **Do not resubmit to AdSense yet:** wait for Google to recrawl and Search Console's
  Pages report to move old jurisdiction URLs to Excluded/404 first.
