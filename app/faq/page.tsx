import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { FAQS } from "@/data/faqs";

const url = `${SITE.url}/faq`;

export const metadata: Metadata = {
  title: "Employment Law FAQ — Quick Answers to Common Questions | MyPayRights",
  description:
    "Fast, plain-English answers to the most-searched employment law questions for UK and US workers: redundancy pay, notice periods, TUPE, PTO payout, COBRA, and more.",
  alternates: { canonical: url },
  openGraph: {
    title: "Employment Law FAQ | MyPayRights",
    description:
      "Answers to the most common employment law questions for UK and US workers — redundancy, dismissal, TUPE, PTO, and more.",
    url,
  },
};

const UK = FAQS.filter((f) => f.country === "UK" || f.country === "UK/US");
const US = FAQS.filter((f) => f.country === "US" || f.country === "UK/US");

export default function FaqHubPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "FAQ", item: url },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.shortAnswer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>FAQ</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            Employment Law · Quick Answers
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Plain-English answers to the employment law questions workers search for most.
            Each answer cites the relevant statute or regulation and links to a calculator
            where the question involves a calculation.
          </p>
        </div>

        <div className="flex flex-col gap-10 max-w-2xl">
          {UK.length > 0 && (
            <section aria-labelledby="uk-faq-heading">
              <h2 id="uk-faq-heading" className="mb-4 text-sm font-semibold text-ink">
                🇬🇧 UK employment law
              </h2>
              <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
                {UK.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/faq/${f.slug}`}
                    className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-surface-muted"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink">{f.question}</p>
                      <p className="mt-0.5 text-xs text-ink-soft line-clamp-1">{f.shortAnswer}</p>
                    </div>
                    <span className="mt-0.5 shrink-0 text-xs text-ink-faint">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {US.length > 0 && (
            <section aria-labelledby="us-faq-heading">
              <h2 id="us-faq-heading" className="mb-4 text-sm font-semibold text-ink">
                🇺🇸 US employment law
              </h2>
              <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
                {US.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/faq/${f.slug}`}
                    className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-surface-muted"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink">{f.question}</p>
                      <p className="mt-0.5 text-xs text-ink-soft line-clamp-1">{f.shortAnswer}</p>
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
