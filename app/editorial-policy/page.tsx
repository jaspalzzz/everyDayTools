import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/editorial-policy`;
const DATE = "2026-07-12";

export const metadata: Metadata = {
  title: `Editorial Policy — ${SITE.name} Standards & Review Process`,
  description:
    `${SITE.name} editorial standards: how content is written, reviewed against official sources, kept independent of commercial influence, and corrected when wrong.`,
  alternates: { canonical: url },
  openGraph: {
    title: `Editorial Policy — ${SITE.name} Standards & Review Process`,
    description:
      `Editorial independence, accuracy standards, correction process, and commercial separation policy for ${SITE.name} employment calculators and guides.`,
    url,
  },
};

export default function EditorialPolicyPage() {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Editorial Policy — ${SITE.name}`,
    description: metadata.description,
    url,
    dateModified: DATE,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    about: { "@type": "Thing", name: "Editorial independence and accuracy standards" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Editorial policy</span>
        </nav>

        <article className="max-w-2xl">
          <header className="mb-8">
            <h1 className="text-3xl font-medium tracking-tight text-ink">
              Editorial policy
            </h1>
            <p className="mt-2 text-xs text-ink-faint">Last updated: {DATE}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {SITE.name} is an employment rights information service. We publish calculators and
              guides that affect people&apos;s income and legal rights. This policy sets out the
              standards we hold ourselves to for accuracy, independence, and corrections.
            </p>
          </header>

          <div className="prose-tool space-y-8 text-sm leading-relaxed text-ink-soft">

            <section>
              <h2>Editorial independence</h2>
              <p>
                {SITE.name}&apos;s editorial content — calculators, guides, legal summaries, and
                statutory rate tables — is produced and maintained independently of any commercial
                relationship. Specifically:
              </p>
              <ul>
                {[
                  "Advertising and sponsorship relationships (including Google AdSense display advertising) have no influence on the calculation logic, legal summaries, or rate data on this site.",
                  "We do not accept payment to alter, favour, or suppress any statutory rate, legal interpretation, or calculator output.",
                  "We do not have commercial relationships with law firms, payroll providers, HR software companies, or recruitment agencies that would create a conflict of interest in our content.",
                  "Where we link to external services, these are editorial recommendations based on their relevance and authority — not paid placements unless explicitly labelled as such.",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Accuracy standards</h2>
              <p>
                Every statutory figure published on {SITE.name} must meet the following standards
                before publication:
              </p>
              <ul>
                {[
                  "Traced to a primary government source (GOV.UK, DOL.gov, legislation.gov.au, canada.ca, fairwork.gov.au, or equivalent official publication)",
                  "Cross-checked against at least one secondary statutory source (e.g. HMRC technical manuals, ACAS guidance, Explanatory Notes to legislation)",
                  "Tested in the relevant calculator to confirm the logic produces the correct statutory output for known reference cases",
                  "Dated with the effective date of the rate or rule change, not the date of publication",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                We do not publish employment law content that relies on secondary aggregators,
                payroll vendor documentation, or AI-generated text as a sole source. AI tools may
                be used to assist with drafting, but all legal claims and statutory figures are
                verified against primary sources before publication.
              </p>
            </section>

            <section>
              <h2>Scope of content</h2>
              <p>
                {SITE.name} publishes:
              </p>
              <ul>
                {[
                  "Statutory rate calculators — tools that apply the relevant law to user inputs to produce an estimate of statutory minimum entitlements",
                  "Explanatory guides — plain-English explanations of employment law concepts, processes, and rights",
                  "Jurisdiction-specific reference pages — state, provincial, or country-level summaries of employment law rules",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                {SITE.name} does not publish:
              </p>
              <ul>
                {[
                  "Legal advice — all content is general information and must not be relied on as legal advice for specific situations",
                  "Tax advice — tax treatment of payments is described at a general level; individual circumstances vary",
                  "Investment or financial advice — we are not regulated by the FCA (UK), SEC (US), or equivalent bodies",
                  "Predictions or forecasts about future legislative changes",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Content review and update cycle</h2>
              <p>
                Calculator rates and legal summaries are reviewed on a structured cycle aligned
                to legislative change dates (detailed in our{" "}
                <Link href="/methodology" className="text-brand-600 underline-offset-2 hover:underline">
                  methodology page
                </Link>
                ). In addition:
              </p>
              <ul>
                {[
                  "Guide content is reviewed annually, or sooner following any relevant court judgment, tribunal decision, or statutory instrument",
                  "The verified date shown on each calculator and guide reflects when that content was last checked against its primary sources — not when it was originally published",
                  "Content that is out-of-date but not yet reviewed carries a visible warning",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Corrections policy</h2>
              <p>
                We correct errors promptly and transparently. Our process:
              </p>
              <ol>
                {[
                  `Report errors to ${SITE.contactEmail} — include the page URL, the figure or statement you believe is wrong, and your source if you have one.`,
                  "All reports are acknowledged within one working day.",
                  "We verify the reported error against the primary source. If confirmed, the correction is published within two working days.",
                  "For material errors (a statutory rate that is wrong by more than a trivial margin, or a legal statement that is substantively incorrect), we add a correction note to the page and update the verified date.",
                  "We do not silently correct errors — changes to statutory figures and legal statements are recorded in the site's version history.",
                ].map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p>
                Material rate, methodology, and legal-summary changes are published in the{" "}
                <Link href="/updates" className="text-brand-600 underline-offset-2 hover:underline">
                  public update log
                </Link>
                . Minor spelling and presentation changes are not logged.
              </p>
            </section>

            <section>
              <h2>Who produces this content</h2>
              <p>
                {SITE.name} was founded by <strong>Jaspal Singh</strong>, a software engineer with a
                background in building employment and HR tools. All calculator logic and legal
                summaries are reviewed by Jaspal before publication.
              </p>
              <p>
                We are actively seeking a named legal reviewer — a qualified employment solicitor
                or MCIPD-certified HR professional — to provide independent review of our legal
                summaries. When this review arrangement is in place, the reviewer&apos;s name and
                qualification will be displayed on the pages they have reviewed.
              </p>
              <p>
                Until a formal legal reviewer is in place, all legal summaries are cross-checked
                against primary sources as described above and carry a disclaimer that they are
                general information, not legal advice.
              </p>
            </section>

            <section>
              <h2>Complaints</h2>
              <p>
                If you believe content on {SITE.name} is inaccurate, misleading, or otherwise
                fails to meet the standards described in this policy, contact us at{" "}
                <a href={`mailto:${SITE.contactEmail}`} className="text-brand-600 underline-offset-2 hover:underline">
                  {SITE.contactEmail}
                </a>
                . We will investigate and respond within five working days.
              </p>
            </section>

          </div>

          <footer className="mt-10 border-t border-surface-line pt-6 text-xs text-ink-faint">
            <p className="flex gap-4">
              <Link href="/methodology" className="text-brand-600 underline-offset-2 hover:underline">Data methodology</Link>
              <Link href="/about" className="text-brand-600 underline-offset-2 hover:underline">About us</Link>
              <Link href="/disclaimer" className="text-brand-600 underline-offset-2 hover:underline">Disclaimer</Link>
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
