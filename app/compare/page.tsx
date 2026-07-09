import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { COMPARISONS } from "@/data/comparisons";

const url = `${SITE.url}/compare`;

export const metadata: Metadata = {
  title: "Employment Law Comparisons — Understand Your Rights",
  description:
    "Side-by-side comparisons of employment law concepts: PILON vs garden leave, unfair vs wrongful dismissal, redundancy vs dismissal, and more.",
  alternates: { canonical: url },
  openGraph: {
    title: "Employment Law Comparisons | MyPayRights",
    description:
      "Side-by-side guides to the UK and US employment law distinctions that matter most when you're losing your job or disputing a dismissal.",
    url,
  },
};

const UK = COMPARISONS.filter((c) => c.country === "UK" || c.country === "UK/US");
const US = COMPARISONS.filter((c) => c.country === "US" || c.country === "UK/US");

const COUNTRY_LABEL: Record<string, string> = {
  UK: "🇬🇧 UK",
  US: "🇺🇸 US",
  "UK/US": "🇬🇧🇺🇸 UK & US",
};

export default function ComparePage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Compare", item: url },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Employment Law Comparisons",
    url,
    numberOfItems: COMPARISONS.length,
    itemListElement: COMPARISONS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${c.aLabel} vs ${c.bLabel}`,
      url: `${SITE.url}/compare/${c.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Compare</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            Employment Law · Side-by-Side Guides
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Employment law comparisons
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Employment law is full of terms that sound similar but carry very different legal
            consequences. These side-by-side guides explain the distinctions that matter most —
            when you're losing your job, disputing a dismissal, or trying to understand what
            you're owed.
          </p>
        </div>

        <div className="flex flex-col gap-10 max-w-2xl">
          {UK.length > 0 && (
            <section aria-labelledby="uk-heading">
              <h2 id="uk-heading" className="mb-4 text-sm font-semibold text-ink">
                🇬🇧 UK employment law
              </h2>
              <div className="flex flex-col gap-2">
                {UK.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="flex items-start justify-between gap-4 rounded-xl border border-surface-line bg-white px-5 py-4 hover:bg-surface-muted"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink">
                        {c.aLabel} <span className="text-ink-faint">vs</span> {c.bLabel}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-soft">{c.summary}</p>
                    </div>
                    <span className="mt-0.5 shrink-0 text-xs text-ink-faint">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {US.length > 0 && (
            <section aria-labelledby="us-heading">
              <h2 id="us-heading" className="mb-4 text-sm font-semibold text-ink">
                🇺🇸 US employment law
              </h2>
              <div className="flex flex-col gap-2">
                {US.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="flex items-start justify-between gap-4 rounded-xl border border-surface-line bg-white px-5 py-4 hover:bg-surface-muted"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink">
                        {c.aLabel} <span className="text-ink-faint">vs</span> {c.bLabel}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-soft">{c.summary}</p>
                    </div>
                    <span className="mt-0.5 shrink-0 text-xs text-ink-faint">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
