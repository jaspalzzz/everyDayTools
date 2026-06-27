import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Press & Media — My Pay Rights",
  description:
    "Press kit, editorial contact, and about My Pay Rights — the free, law-backed employment pay calculator for workers in the UK, US, Australia, and Canada.",
  alternates: { canonical: `${SITE.url}/press` },
};

const COVERAGE_TOPICS = [
  "UK statutory redundancy pay rates and changes",
  "Employer vs employee redundancy cost comparison",
  "US final paycheck laws and wage theft statistics",
  "Gender pay gap and equal pay enforcement",
  "FLSA overtime exemption misclassification",
  "UK Employment Rights Act 2025 changes",
  "Gig economy worker classification",
  "State-by-state PTO payout laws",
];

export default function PressPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Press", item: `${SITE.url}/press` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <div className="mx-auto max-w-content px-5 py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Press</span>
        </nav>

        <div className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink">Press & Media</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            My Pay Rights is a free employment law reference and pay calculator platform for workers
            in the UK, United States, Australia, and Canada. All content is written against primary
            legislation and verified each April when statutory rates change.
          </p>

          {/* Contact */}
          <section className="mt-10 rounded-xl border border-surface-line bg-surface-muted p-6">
            <h2 className="text-base font-semibold text-ink">Editorial contact</h2>
            <p className="mt-2 text-sm text-ink-soft">
              For interview requests, data questions, custom research, or licensing of our statutory
              rate data:
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-20 text-xs font-medium text-ink-faint">Email</span>
                <a href="mailto:editorial@mypayrights.com" className="text-brand-600 hover:underline">
                  editorial@mypayrights.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-xs font-medium text-ink-faint">Founded</span>
                <span className="text-ink-soft">2026</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-xs font-medium text-ink-faint">Founder</span>
                <span className="text-ink-soft">Jaspal Singh</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-xs font-medium text-ink-faint">Coverage</span>
                <span className="text-ink-soft">UK · US · Australia · Canada</span>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="mt-10">
            <h2 className="text-base font-semibold text-ink">About My Pay Rights</h2>
            <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-ink-soft">
              <p>
                My Pay Rights publishes free, law-backed employment pay calculators and plain-language
                guides for workers navigating redundancy, dismissal, parental leave, and wage disputes.
                Every statutory rate — from the UK weekly pay cap for redundancy (£751 in 2026/27)
                to the Australian superannuation guarantee (12% from July 2026) — is sourced from
                primary legislation and reviewed on each jurisdiction&apos;s annual rate-change cycle.
              </p>
              <p>
                The platform covers 31 calculators across four jurisdictions, 15 in-depth guides,
                and 78+ FAQ pages. Calculators produce live, interactive results with a downloadable
                PDF summary — no sign-up required.
              </p>
              <p>
                My Pay Rights does not provide personalised legal advice. Readers with specific
                employment issues are directed to ACAS (UK), the DOL (US), the Fair Work Ombudsman
                (AU), or their provincial employment standards office (CA).
              </p>
            </div>
          </section>

          {/* Topics */}
          <section className="mt-10">
            <h2 className="text-base font-semibold text-ink">We can help with</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {COVERAGE_TOPICS.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2 rounded-lg border border-surface-line bg-white px-3 py-2.5 text-xs text-ink-soft"
                >
                  <span className="mt-0.5 text-emerald-500">✓</span>
                  {topic}
                </li>
              ))}
            </ul>
          </section>

          {/* Brand assets */}
          <section className="mt-10">
            <h2 className="text-base font-semibold text-ink">Brand assets</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Logo files and brand guidelines are available on request at{" "}
              <a href="mailto:editorial@mypayrights.com" className="text-brand-600 hover:underline">
                editorial@mypayrights.com
              </a>
              . Please use the canonical name{" "}
              <strong className="text-ink">My Pay Rights</strong> in all editorial references.
              The website URL is{" "}
              <a href={SITE.url} className="text-brand-600 hover:underline">
                mypayrights.com
              </a>
              .
            </p>
          </section>

          <div className="mt-10 border-t border-surface-line pt-6">
            <Link href="/" className="text-sm text-brand-600 hover:underline">← Back to home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
