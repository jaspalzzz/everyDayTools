import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, jsonLd } from "@/lib/seo";
import { COMPARISONS, getComparison } from "@/data/comparisons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  const url = `${SITE.url}/compare/${c.slug}`;
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: url },
    openGraph: { title: c.title, description: c.description, url },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const url = `${SITE.url}/compare/${c.slug}`;
  const flag = c.country === "UK" ? "🇬🇧" : c.country === "US" ? "🇺🇸" : "🇬🇧🇺🇸";

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE.url}/compare` },
      { "@type": "ListItem", position: 3, name: c.aLabel + " vs " + c.bLabel, item: url },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: c.description,
    url,
    datePublished: c.datePublished,
    dateModified: c.dateModified,
    author: { "@type": "Person", name: "Jaspal Singh", jobTitle: "Founder, MyPayRights" },
    publisher: { "@type": "Organization", name: "MyPayRights", url: SITE.url },
    mainEntityOfPage: url,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/compare" className="hover:text-ink-soft">Compare</Link>
          <span className="mx-1.5">/</span>
          <span>{c.aLabel} vs {c.bLabel}</span>
        </nav>

        <article className="max-w-2xl">
          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
              {flag} {c.country} · Employment Law · Updated {c.dateModified}
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              {c.h1}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.intro}</p>
          </header>

          <div className="prose-tool space-y-8 text-sm leading-relaxed text-ink-soft">

            {/* Side-by-side comparison table */}
            <section>
              <h2>Key differences at a glance</h2>
              <p className="mb-2 text-xs font-medium text-ink-faint sm:hidden">
                ← Swipe to see both sides →
              </p>
              <div className="overflow-x-auto rounded-xl border border-surface-line">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-surface-line bg-surface-muted">
                      <th className="w-1/3 px-4 py-2.5 text-left text-xs font-semibold text-ink">Aspect</th>
                      <th className="w-1/3 px-4 py-2.5 text-left text-xs font-semibold text-brand-700">{c.aLabel}</th>
                      <th className="w-1/3 px-4 py-2.5 text-left text-xs font-semibold text-ink">{c.bLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.rows.map(({ aspect, a, b }, i) => (
                      <tr
                        key={aspect}
                        className={`border-b border-surface-line last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted/40"}`}
                      >
                        <td className="px-4 py-3 font-medium text-ink">{aspect}</td>
                        <td className="px-4 py-3 text-ink-soft">{a}</td>
                        <td className="px-4 py-3 text-ink-soft">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Verdict */}
            <section>
              <h2>The bottom line</h2>
              <div className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-4">
                <p className="text-sm leading-relaxed text-ink-soft">{c.verdict}</p>
              </div>
            </section>

            {/* CTAs */}
            {c.relatedTools.length > 0 && (
              <div className={`grid gap-3 ${c.relatedTools.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {c.relatedTools.map((tool) => (
                  <div key={tool.slug} className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                    <p className="text-sm font-semibold text-ink">{tool.name}</p>
                    <Link
                      href={`/${tool.slug}`}
                      className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700"
                    >
                      Calculate →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAQs */}
          <section aria-labelledby="faq-heading" className="mt-12">
            <h2 id="faq-heading" className="mb-5 text-base font-semibold text-ink">
              Frequently asked questions
            </h2>
            <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
              {c.faqs.map((faq) => (
                <details key={faq.q} className="group px-5 py-4">
                  <summary className="cursor-pointer list-none text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.q}
                      <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-180" aria-hidden="true">↓</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <footer className="mt-10 border-t border-surface-line pt-6 text-xs text-ink-faint">
            <p>
              Last reviewed: {c.dateModified}. This guide provides general information about employment
              law and is not legal advice. Employment situations are fact-specific — seek advice from a
              qualified employment solicitor or ACAS if you are considering a tribunal claim.
              {c.country !== "US" && " Time limits apply for tribunal claims (3 months less one day from the relevant act)."}
            </p>
            <p className="mt-2">
              <Link href="/compare" className="text-brand-600 underline-offset-2 hover:underline">← All comparisons</Link>
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
