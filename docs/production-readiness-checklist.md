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
- `public/ads.txt` is replaced with the real publisher line after AdSense approval.
- `NEXT_PUBLIC_ADSENSE_CLIENT` is configured only with the approved publisher ID.
- AdSense is enabled only after consent flow and policy review are complete.
