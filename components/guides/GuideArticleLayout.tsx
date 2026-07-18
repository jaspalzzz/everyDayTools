import type { ReactNode } from "react";
import Link from "next/link";
import { CountryFlag } from "@/components/CountryFlag";
import { EditorialReview } from "@/components/EditorialReview";
import {
  SITE,
  faqSchema,
  guideSchema,
  jsonLd,
} from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

export interface GuideSource {
  label: string;
  href: string;
  detail: string;
}

export interface GuideAction {
  label: string;
  href: string;
  description: string;
}

export interface GuideRelatedLink {
  label: string;
  href: string;
}

export function GuideArticleLayout({
  slug,
  title,
  description,
  country,
  category,
  datePublished,
  dateModified,
  sourceLabel,
  legalTopic,
  quickAnswer,
  actions,
  sources,
  faqs,
  relatedLinks = [],
  children,
}: {
  slug: string;
  title: string;
  description: string;
  country: "UK" | "US" | "CA" | "AU";
  category: string;
  datePublished: string;
  dateModified: string;
  sourceLabel: string;
  legalTopic: string;
  quickAnswer: string;
  actions: GuideAction[];
  sources: GuideSource[];
  faqs: FaqItem[];
  relatedLinks?: GuideRelatedLink[];
  children: ReactNode;
}) {
  const url = `${SITE.url}/guides/${slug}`;
  const reviewedLabel = new Date(dateModified).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const article = guideSchema({
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    image: `${SITE.url}/opengraph-image`,
    legalTopic,
  });

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.url}/guides` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/guides" className="hover:text-ink-soft">Guides</Link>
          <span className="mx-1.5">/</span>
          <span>{title}</span>
        </nav>

        <article className="max-w-3xl">
          <header className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <CountryFlag country={country} size={18} />
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                {category}
              </span>
              <span className="text-[11px] text-ink-faint">Source checked {reviewedLabel}</span>
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">{title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{description}</p>
          </header>

          <aside className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">Quick answer</p>
            <p className="mt-1 text-sm leading-relaxed text-emerald-950">{quickAnswer}</p>
          </aside>

          <EditorialReview
            lastReviewed={dateModified}
            sourceLabel={sourceLabel}
            className="mb-8"
          />

          <section aria-labelledby={`${slug}-tools`} className="mb-8 rounded-xl border border-brand-200 bg-brand-50 p-5">
            <h2 id={`${slug}-tools`} className="text-sm font-bold text-ink">Check your figures</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {actions.map((action, index) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={index === 0
                    ? "rounded-lg bg-brand-600 px-4 py-3 text-white no-underline hover:bg-brand-700"
                    : "rounded-lg border border-brand-200 bg-white px-4 py-3 text-ink no-underline hover:border-brand-600"}
                >
                  <span className="block text-sm font-semibold">{action.label} →</span>
                  <span className={index === 0 ? "mt-1 block text-xs text-blue-100" : "mt-1 block text-xs text-ink-soft"}>
                    {action.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className="prose-tool flex flex-col gap-7 text-sm leading-relaxed text-ink-soft">
            {children}

            {relatedLinks.length > 0 && (
              <section>
                <h2>Related explanations</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {relatedLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="block rounded-lg border border-surface-line bg-white px-4 py-3 font-semibold text-brand-700 no-underline hover:border-brand-600">
                        {item.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby={`${slug}-faq`}>
              <h2 id={`${slug}-faq`}>Frequently asked questions</h2>
              <div className="mt-3 flex flex-col gap-3">
                {faqs.map((item) => (
                  <details key={item.question} className="rounded-lg border border-surface-line bg-white px-4 py-3">
                    <summary className="cursor-pointer font-semibold text-ink">{item.question}</summary>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="border-t border-surface-line pt-6" aria-labelledby={`${slug}-sources`}>
              <h2 id={`${slug}-sources`}>Official sources</h2>
              <p className="text-xs text-ink-faint">
                Checked {reviewedLabel}. Statutory figures and eligibility statements above should be read with the effective dates shown in the text.
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {sources.map((source) => (
                  <li key={source.href} className="rounded-lg border border-surface-line bg-surface-muted px-4 py-3">
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-700"
                    >
                      {source.label}
                    </a>
                    <span className="mt-1 block text-xs text-ink-faint">{source.detail}</span>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-950">
              This guide explains published minimum standards and is not legal advice. Contracts, collective agreements, awards, common-law rights, and individual facts can provide different or additional rights.
            </aside>
          </div>
        </article>
      </div>
    </>
  );
}
