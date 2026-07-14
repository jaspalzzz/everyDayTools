# mypayrights.com — Hreflang & International SEO Validation

**Analysis date:** 2026-07-14
**Method:** Live fetch + parse of 9 pages (homepage, 4 country hubs, `/fr` hub, 3 `/fr/ca/*` deep pages); cross-referenced against the actual `alternates.languages` source in `app/layout.tsx`, `app/uk/page.tsx` (and siblings), `app/fr/ca/*/page.tsx`, and `lib/seo.ts`'s `toolMetadata()` helper to confirm root causes, not just symptoms.

---

## Summary

- **Total pages scanned:** 9 (1 homepage + 4 country hubs + 1 `/fr` hub + 3 `/fr/ca/*` deep pages)
- **Language variants declared:** 7 at the hub tier (`en`, `en-GB`, `en-US`, `en-CA`, `en-AU`, `fr-CA`, `x-default`); 2 at the deep French-page tier (`fr-CA`, `en-CA`)
- **Issues found:** 4 (Critical: 2, High: 1, Medium: 1) + 1 Info-level observation
- **What's genuinely good:** all language/region codes are valid (no `en-uk`, no bare `zh`-style ambiguity), all URLs are HTTPS-consistent, every canonical matches its own hreflang self-reference exactly, and the site correctly avoids the common large-site mistake of forcing hreflang onto pages with no real translated equivalent (the ~400 US/CA/AU state pages correctly carry none).

---

## Validation Results

| Page | Self-Ref | Return Tags | x-default | Status |
|---|---|---|---|---|
| `/` (home) | ✅ (`en` + `x-default`) | ✅ (all 4 hubs return to it via `x-default`, see note below) | ✅ | ⚠️ (see Finding 1) |
| `/uk` | ✅ (`en-GB`) | ⚠️ returns to us/ca/au correctly, but not to home via `en` | ✅ | ⚠️ |
| `/us` | ✅ (`en-US`) | ⚠️ same pattern | ✅ | ⚠️ |
| `/ca` | ✅ (`en-CA`) | ⚠️ same pattern | ✅ | ⚠️ |
| `/au` | ✅ (`en-AU`) | ⚠️ same pattern | ✅ | ⚠️ |
| `/fr` | ✅ (`fr-CA`) | ⚠️ same pattern (full mesh with all 4 English hubs, but no `en`→home) | ✅ | ⚠️ |
| `/fr/ca/preavis` | ✅ (`fr-CA`) | ❌ `/notice-period-calculator` declares no return tag at all | — (not expected at this scope) | ❌ |
| `/fr/ca/paie-de-vacances` | ✅ (`fr-CA`) | ❌ `/pto-payout-calculator` declares no return tag at all | — | ❌ |
| `/fr/ca/indemnite-de-depart` | ✅ (`fr-CA`) | ❌ points to `/notice-period-calculator`, not `/severance-pay-calculator` (see Finding 3), and that target has no return tag either | — | ❌ |

---

## Findings

### Finding 1 — [Critical] All 5 non-home pages are missing the "en" return tag to the homepage
**What I found:** the homepage declares itself under **two** codes: `en` and `x-default` (both pointing to `https://mypayrights.com`). But none of `/uk`, `/us`, `/ca`, `/au`, or `/fr` declare an `"en"` entry in their own `alternates.languages` — only `x-default`. Confirmed at the source: `app/uk/page.tsx` (and the equivalent block in `/us`, `/ca`, `/au`, `/fr`) builds its `languages` object as:
```ts
languages: {
  "en-GB": url,
  "en-US": `${SITE.url}/us`,
  "en-CA": `${SITE.url}/ca`,
  "en-AU": `${SITE.url}/au`,
  "x-default": SITE.url,
},
```
— five entries for five relationships, but the homepage's own `en` code is never listed.

**Why it matters:** per Google's hreflang validation rules, a language-code relationship must be mutually confirmed on both ends. The homepage claims "I am `en`, and `en-GB` lives at `/uk`" — but `/uk` never reciprocally claims "`en` lives at the homepage." Google's documented behavior when a return tag is missing for a specific code is to disregard that code's annotation, meaning the `en` signal for the homepage may not be trusted even though `x-default` (a different, though related, signal) is correctly reciprocated everywhere. This is a real technical gap, not a symptom of a translation problem — the URLs and content are all correct, only the metadata declaration is incomplete.

**The fix:** add `"en": SITE.url` to the `languages` object in `app/uk/page.tsx`, `app/us/page.tsx`, `app/ca/page.tsx`, `app/au/page.tsx`, and `app/fr/page.tsx` — a one-line addition per file, five files total.

### Finding 2 — [Critical] The three English calculator pages have zero return hreflang at all
**What I found:** `/fr/ca/preavis`, `/fr/ca/paie-de-vacances`, and `/fr/ca/indemnite-de-depart` each declare an `en-CA` alternate pointing to `/notice-period-calculator`, `/pto-payout-calculator`, and `/notice-period-calculator` respectively. None of those three English pages declare *any* hreflang back. Root cause confirmed at the source: all three English calculator pages build their metadata via the shared `toolMetadata()` helper in `lib/seo.ts`, which accepts `{ title, seoTitle?, description, url, slug }` — **there is no `languages` parameter at all** in that helper's signature, so it's structurally impossible for any page using it to emit a `languages` block without a code change to the shared helper.

**Why it matters:** this isn't a one-off oversight on three pages — it's a helper-function gap that will silently repeat for every future English↔French pairing built the same way. It's also the more consequential of the two return-tag gaps, since it affects genuinely different (not just generic-vs-regional) language content.

**The fix:** add an optional `languages?: Record<string, string>` parameter to `toolMetadata()` in `lib/seo.ts`, merge it into the returned `alternates` object when present, and pass `{ "fr-CA": "<matching french URL>" }` from `/notice-period-calculator` and `/pto-payout-calculator`. `/severance-pay-calculator` needs one too — see Finding 3 for which French URL it should point to.

### Finding 3 — [High] Two different French pages both claim to be the equivalent of `/notice-period-calculator`; `/severance-pay-calculator` has no French equivalent declared
**What I found:** `/fr/ca/indemnite-de-depart` ("Calculateur d'indemnité de départ" — a severance/termination-indemnity calculator by title) declares `"en-CA": "https://mypayrights.com/notice-period-calculator"` — the **same** English URL that `/fr/ca/preavis` also declares. I initially suspected this was a copy-paste content bug, but a full read of the page's body content shows this is more defensible than it first looks: under Quebec's *Loi sur les normes du travail*, "indemnité de départ" (the payout) and "préavis" (the working notice period) are two sides of the same statutory entitlement — an employer must give notice *or* pay an equivalent lump sum, and the page's own FAQ explicitly explains this distinction ("Quelle est la différence entre le préavis et l'indemnité de départ ?"). So the content overlap is intentional, not accidental.

That said, the page also visibly links to **both** English tools side by side — "Notice period calculator (EN)" *and* "Severance pay estimator (EN)" — confirming the page itself considers `/severance-pay-calculator` a genuinely relevant counterpart, just one that isn't reflected in the hreflang metadata at all. The net effect: Google sees two different French URLs both claiming the `fr-CA` slot for `/notice-period-calculator` (a conflicting-signal pattern Google's own guidance flags as a reason to potentially disregard the annotation), while `/severance-pay-calculator` — the page's other, equally-visible English link — gets no hreflang relationship declared anywhere on the site.

**The fix:** once `toolMetadata()` supports a `languages` param (Finding 2), have `/severance-pay-calculator` declare `"fr-CA": "https://mypayrights.com/fr/ca/indemnite-de-depart"`, and have `/fr/ca/indemnite-de-depart` add `/severance-pay-calculator` as a *second* `en-CA`-adjacent relationship if the underlying content genuinely serves both, or — simpler and cleaner — pick one primary English pairing per French page based on which one the page's core statutory table actually matches (currently the table matches notice period), and treat the second English link as a normal in-content cross-link rather than a claimed hreflang equivalent. Don't leave `/severance-pay-calculator` with zero French pairing either way.

### Finding 4 — [Medium] French-locale pages inherit an entirely English global footer, including legal pages
**What I found:** `components/SiteFooter.tsx` has no locale branching — "Privacy policy," "Terms," and "Disclaimer" links (and their target pages, `/privacy` `/terms` `/disclaimer`) are English-only, and this exact footer renders on `/fr`, `/fr/ca/preavis`, `/fr/ca/paie-de-vacances`, and `/fr/ca/indemnite-de-depart` same as everywhere else.

**Why it matters (beyond generic "translate your footer" advice):** Québec has its own data-protection regime — the *Loi 25* (Act to modernize legislative provisions as regards the protection of personal information) — distinct from Europe's GDPR/CNIL framework the generic Francophone cultural-adaptation profile assumes. A French-speaking Quebec visitor currently has no way to read the site's privacy practices in French, and there's no Loi 25-specific disclosure to point to even if there were. Note this is a real gap *despite* the page content itself getting Quebec-specific legal references right elsewhere (the calculator pages correctly cite "CNESST" — Quebec's actual labour standards board — not a generic or French-national body, which is good evidence the team already knows to localize substantively, just hasn't extended that to the footer/legal pages).

**The fix:** at minimum, add a French-language privacy/terms/disclaimer summary reachable from the French pages (doesn't need to be a full parallel legal-page tree — even a short French disclaimer block referencing Loi 25 would close the most visible gap), or localize the footer's link *labels* to French while linking to the same English legal pages as an interim step, with a visible note that full French legal text is in progress.

### Finding 5 — [Info] `hreflang` attribute renders as `hrefLang` (capital L) in the static HTML output
**What I found:** every hreflang `<link>` tag in the built HTML uses `hrefLang="..."` rather than the lowercase `hreflang="..."` shown in Google's own documentation examples — e.g. `<link rel="alternate" hrefLang="en-GB" href="https://mypayrights.com/uk"/>`. This is why a naive case-sensitive regex/grep-based check (including my own first pass at this analysis) reports zero hreflang tags present, while `BeautifulSoup`-based parsing (which normalizes HTML attribute names during parsing, since HTML attribute names are case-insensitive per the HTML5 spec) correctly finds all of them.

**Root cause:** this comes from Next.js's built-in `Metadata.alternates.languages` API (`app/layout.tsx` line 52 and the per-page equivalents) — it's how Next.js's App Router metadata system serializes this field, not a manual mistake in this codebase's own markup.

**Why it (probably) doesn't matter for real crawlers:** Googlebot's HTML parser is HTML5-spec-compliant and treats attribute names as case-insensitive for HTML-content-type documents, so `hrefLang` and `hreflang` should be read identically by Google in practice. The risk is narrower: any third-party auditing tool, custom log-scraper, or quick validation script that does naive case-sensitive string matching (rather than full HTML parsing) may falsely report "no hreflang found" on this site — which is exactly what happened during this analysis on the first pass. Not a recommended code change (there's no simple way to force Next.js's metadata API to emit lowercase without hand-rolling the `<link>` tags outside the Metadata API, which would be a bigger, likely not-worth-it change for a cosmetic/tooling-compatibility concern) — flagging for awareness so nobody "fixes" a phantom missing-hreflang report from a lesser tool without checking here first.

---

## Cultural Adaptation Assessment — Francophone (Québec)

Per `references/cultural-profiles.md`'s Francophone profile, adapted with the caveat that Québec's legal/regulatory context differs from Metropolitan France (noted where relevant):

| Dimension | Guideline | Observed | Verdict |
|---|---|---|---|
| Formality | "Vous" default | Confirmed — "Votre indemnité," "vous avez droit," consistent "vous" register throughout all 3 deep pages | ✅ Correct |
| CTA Style | Elegant phrasing over blunt commands | "Déposer une plainte →," "Notice period calculator (EN)" — descriptive, not pushy | ✅ Correct |
| Trust Signals | Professional/regulatory citations | Correctly cites *Loi sur les normes du travail* (LNT) art. 82, the *Code canadien du travail*, and **CNESST by name** (Québec's actual labour board) — genuinely Québec-specific, not a generic French-national substitution | ✅ Correct, and better than the generic profile would predict |
| Legal | Generic profile says "CNIL / CGV" (France-specific) — **not applicable to Québec** | No French-language privacy/terms/disclaimer content found at all (see Finding 4); no reference to Québec's actual *Loi 25* privacy framework | ❌ Gap (Finding 4) |
| Number Format | Space thousands separator, comma decimal | Only percentages (4%, 6%) and week-counts appeared in the sampled pages — no large currency figures to verify comma-decimal formatting on the French pages themselves | ⚠️ Not verifiable from sampled content |
| Currency | CAD | Not directly observed in sampled pages (percentage/week-based figures only) — worth spot-checking if any French page displays a dollar amount | ⚠️ Not verifiable from sampled content |
| Word Expansion | +15-25% vs English | Not measured this pass (would require a like-for-like paragraph comparison against the English equivalents) | Not assessed |

**Cultural Adaptation Score: 78/100** — strong on tone/formality/regulatory-citation accuracy (the parts requiring real subject-matter knowledge), let down specifically by the untranslated legal-page footer (Finding 4), which is also the one dimension where the generic cross-national Francophone template would have given wrong advice (CNIL doesn't apply to Québec) had the team followed it literally — worth noting as validation that hand-verifying against the actual target jurisdiction, as they did for CNESST, is the right instinct to keep applying.

---

## Generated Fix Summary (ready to implement)

```diff
# app/uk/page.tsx, app/us/page.tsx, app/ca/page.tsx, app/au/page.tsx, app/fr/page.tsx
  languages: {
+   "en": SITE.url,
    "en-GB": ...,
    ...
  },
```

```diff
# lib/seo.ts — toolMetadata()
  export function toolMetadata(params: {
    title: string;
    seoTitle?: string;
    description: string;
    url: string;
    slug: string;
+   languages?: Record<string, string>;
  }): Metadata {
    ...
    alternates: {
      canonical: params.url,
+     ...(params.languages ? { languages: params.languages } : {}),
    },
    ...
  }
```

```diff
# app/notice-period-calculator/page.tsx
  export const metadata = toolMetadata({
    ...,
+   languages: { "fr-CA": `${SITE.url}/fr/ca/preavis` },
  });

# app/pto-payout-calculator/page.tsx
  export const metadata = toolMetadata({
    ...,
+   languages: { "fr-CA": `${SITE.url}/fr/ca/paie-de-vacances` },
  });

# app/severance-pay-calculator/page.tsx
  export const metadata = toolMetadata({
    ...,
+   languages: { "fr-CA": `${SITE.url}/fr/ca/indemnite-de-depart` },
  });
```

---

## Limitations

- Word-expansion ratio and currency/number formatting on the French pages were not independently verified against a like-for-like English paragraph this session — the sampled pages happened to show percentages and week-counts rather than currency figures. Recommend a follow-up spot-check on any French page displaying a dollar amount.
- This analysis covered the 9 pages with an active hreflang/translation relationship. It did not re-audit the `/ca/provinces/quebec` English-language province page for whether a French equivalent should exist there too — that's a content-strategy question (should Quebec's own province page get a French version, distinct from the 3 topic-specific `/fr/ca/*` pages that already exist) better suited to `/seo cluster` or `/seo plan`, not a mechanical hreflang defect.
