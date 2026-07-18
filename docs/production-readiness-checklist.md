# Production Readiness Checklist

Run this before handing the site to SEO or deploying a production build.

## Link Integrity

- Internal catalogue slugs are valid: tools, guides, FAQs, blog related tools, and comparison slugs.
- Every production route returns a non-error page with a title.
- Every rendered internal link resolves to a live local route.
- External official-source links have no `404`/`410` responses; blocked/time-out warnings are reviewed from `reports/external-link-audit.json`.
- Removed or known-dead official URLs stay blocked by regression tests.

Commands:

```bash
npm run typecheck
npm run e2e -- production-links.spec.ts
npm run audit:external-links
```

## Mobile And Tablet

- No horizontal overflow at 320px, 375px, or tablet widths.
- Mobile hamburger opens while scrolled, not only at the top.
- Search results scroll to visible tabs/results.
- Long source cards, review-history rows, email addresses, and legal references wrap inside the viewport.

Commands:

```bash
npm run e2e -- responsive-audit.spec.ts
npm run e2e -- navigation.spec.ts guides-search.spec.ts home-layout.spec.ts
npm run build
npm run audit:responsive
```

## Calculator And Guide Flows

- Homepage search opens exact calculator matches directly.
- Unknown homepage search scrolls to visible calculator tabs.
- Guide search searches the full guide library and fixes stale incompatible filters.
- News/sidebar calculator links route to calculators, not articles.
- Calculator source cards point to live official sources.

## SEO Handoff

- All route titles render.
- No page renders `Application error`, framework bailout text, or generic 404 content.
- Sitemap route data matches the live page catalogue.
- Canonical/internal paths do not point to old slugs.
- Sitemap routes are indexable and do not emit `noindex`.
- Every sitemap route has a title, meta description, canonical, and visible page copy.
- Key landing pages and calculators expose JSON-LD for Google understanding.

Commands:

```bash
npm run build
npm run audit:indexability
```

## Search Console And AdSense

- `NEXT_PUBLIC_SITE_URL` points at the final production domain.
- Google Search Console verification token is set before launch.
- `public/ads.txt` contains the live publisher line and returns HTTP 200 at `/ads.txt`.
- `NEXT_PUBLIC_ADSENSE_CLIENT` is configured only with the approved publisher ID.
- A Google-certified CMP is published from AdSense **Privacy & messaging** for European
  regulations before ad serving is enabled; configure applicable US state messages as needed.
- `NEXT_PUBLIC_ADSENSE_READY` and `NEXT_PUBLIC_ADSENSE_CMP_READY` stay false during application
  review. Set both to `true` only after the site is approved and the certified CMP is live.
- The publisher meta tag remains present during review even while the AdSense runtime is disabled.
- After enabling, verify the Google privacy message, its footer revocation link, one manual ad unit,
  and browser console/CSP behavior on production without clicking a live ad.
