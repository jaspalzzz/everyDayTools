import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { FAQS } from "@/data/faqs";

const url = `${SITE.url}/faq`;

export const metadata: Metadata = {
  title: "Employment Law FAQ — Quick Answers to Common Questions | MyPayRights",
  description:
    "Plain-English answers to common employment law questions for UK, US, Canada and Australia workers: redundancy, notice periods, TUPE, PTO payout, and more.",
  alternates: { canonical: url },
  openGraph: {
    title: "Employment Law FAQ | MyPayRights",
    description:
      "Answers to the most common employment law questions for UK, US, Canada and Australia workers — redundancy, dismissal, TUPE, PTO, and more.",
    url,
  },
};

const FAQ_GROUPS = [
  { id: "uk", heading: "🇬🇧 UK employment law", faqs: FAQS.filter((f) => f.country === "UK" || f.country === "UK/US") },
  { id: "us", heading: "🇺🇸 US employment law", faqs: FAQS.filter((f) => f.country === "US" || f.country === "UK/US") },
  { id: "ca", heading: "🇨🇦 Canada employment law", faqs: FAQS.filter((f) => f.country === "CA") },
  { id: "au", heading: "🇦🇺 Australia employment law", faqs: FAQS.filter((f) => f.country === "AU") },
] as const;

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

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Employment Law FAQ",
    url,
    numberOfItems: FAQS.length,
    itemListElement: FAQS.map((f, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: f.question,
      url: `${SITE.url}/faq/${f.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />

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
          {FAQ_GROUPS.filter((g) => g.faqs.length > 0).map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-faq-heading`}>
              <h2 id={`${group.id}-faq-heading`} className="mb-4 text-sm font-semibold text-ink">
                {group.heading}
              </h2>
              <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
                {group.faqs.map((f) => (
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
          ))}
        </div>
      </div>
    </>
  );
}
