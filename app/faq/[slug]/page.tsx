import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { PillarBacklink } from "@/components/PillarBacklink";
import { EDITORIAL_REVIEW, FOUNDER_PERSON, SITE, clampMetaDescription, jsonLd } from "@/lib/seo";
import { FAQS, getFaq } from "@/data/faqs";

type Props = { params: Promise<{ slug: string }> };

const REDUNDANCY_PILLAR_FAQS = new Set([
  "can-employer-refuse-redundancy-pay",
  "is-redundancy-pay-tax-free",
  "what-is-the-redundancy-pay-cap",
  "can-i-be-made-redundant-on-sick-leave-uk",
  "can-i-be-made-redundant-while-on-maternity-leave",
  "do-i-get-notice-pay-if-made-redundant",
  "what-is-unfair-redundancy-selection",
  "can-i-be-made-redundant-and-rehired",
]);

export function generateStaticParams() {
  return FAQS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = getFaq(slug);
  if (!f) return {};
  const url = `${SITE.url}/faq/${f.slug}`;
  return {
    title: f.question,
    description: clampMetaDescription(f.shortAnswer),
    alternates: { canonical: url },
    openGraph: { title: f.question, description: clampMetaDescription(f.shortAnswer), url },
  };
}

export default async function FaqPage({ params }: Props) {
  const { slug } = await params;
  const f = getFaq(slug);
  if (!f) notFound();

  const url = `${SITE.url}/faq/${f.slug}`;
  const flag = f.country === "UK" ? "🇬🇧" : f.country === "US" ? "🇺🇸" : "🇬🇧🇺🇸";

  const relatedFaqs = FAQS.filter((r) => f.related.includes(r.slug));

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE.url}/faq` },
      { "@type": "ListItem", position: 3, name: f.question, item: url },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: f.question,
    description: f.shortAnswer,
    url,
    datePublished: f.datePublished,
    dateModified: f.dateModified,
    image: `${SITE.url}/opengraph-image`,
    author: FOUNDER_PERSON,
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/logo-mark.svg` } },
    mainEntityOfPage: url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />

      <div className="mx-auto max-w-content overflow-hidden px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex min-w-0 items-center text-xs text-ink-faint">
          <Link href="/" className="shrink-0 hover:text-ink-soft">Home</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <Link href="/faq" className="shrink-0 hover:text-ink-soft">FAQ</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <span className="min-w-0 truncate">{f.question}</span>
        </nav>

        <article className="max-w-2xl break-words">
          <header className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
              {flag} {f.country} · Employment Law · Updated {f.dateModified}
            </p>
            <h1 className="mt-2 text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {f.question}
            </h1>

            {/* Featured-snippet answer box */}
            <div className="mt-4 rounded-xl border-l-4 border-brand-600 bg-brand-50 px-5 py-4">
              <p className="text-sm font-medium leading-relaxed text-ink">{f.shortAnswer}</p>
            </div>
          </header>

          <div className="prose-tool space-y-4 text-sm leading-relaxed text-ink-soft">
            {f.answer.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {f.contextualLinks && f.contextualLinks.length > 0 && (
            <aside className="mt-6 rounded-xl border border-surface-line bg-surface-muted p-4" aria-label="State-specific overtime information">
              <p className="text-sm font-semibold text-ink">State-specific detail</p>
              <ul className="mt-2 grid gap-2 text-sm">
                {f.contextualLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-medium text-brand-700 underline underline-offset-2">
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <EditorialReview lastReviewed={f.dateModified} className="mt-8" />

          {REDUNDANCY_PILLAR_FAQS.has(f.slug) && <PillarBacklink className="mt-6" />}

          {/* CTAs */}
          {(f.relatedTool || f.relatedGuide) && (
            <div className={`mt-8 grid gap-3 ${f.relatedTool && f.relatedGuide ? "sm:grid-cols-2" : ""}`}>
              {f.relatedTool && (
                <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-4">
                  <p className="text-sm font-semibold text-ink">{f.relatedToolName}</p>
                  <Link
                    href={`/${f.relatedTool}`}
                    className="mt-3 inline-block rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700"
                  >
                    Calculate →
                  </Link>
                </div>
              )}
              {f.relatedGuide && (
                <div className="rounded-xl border border-surface-line bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-ink">{f.relatedGuideName}</p>
                  <Link
                    href={`/guides/${f.relatedGuide}`}
                    className="mt-3 inline-block rounded-lg border border-brand-600 px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50"
                  >
                    Read guide →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Related questions */}
          {relatedFaqs.length > 0 && (
            <section className="mt-10" aria-labelledby="related-heading">
              <h2 id="related-heading" className="mb-3 text-sm font-semibold text-ink">
                Related questions
              </h2>
              <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
                {relatedFaqs.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/faq/${r.slug}`}
                    className="flex items-start justify-between gap-3 px-4 py-3.5 hover:bg-surface-muted sm:px-5"
                  >
                    <span className="min-w-0 text-sm leading-relaxed text-ink">{r.question}</span>
                    <span className="shrink-0 text-xs text-ink-faint">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <footer className="mt-10 border-t border-surface-line pt-6 text-xs text-ink-faint">
            <p>
              Last reviewed: {f.dateModified}. This answer provides general information and is not
              legal advice. Employment situations are fact-specific — seek advice from ACAS or a
              qualified employment lawyer if your situation is complex.
            </p>
            <p className="mt-2">
              <Link href="/faq" className="text-brand-600 underline-offset-2 hover:underline">
                ← All FAQs
              </Link>
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
