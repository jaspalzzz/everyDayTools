import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { US_STATES, getUsState } from "@/data/usStates";
import { SITE, clampMetaDescription, jsonLd, faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";
import { FinalPaycheckLateChecker } from "@/components/calculators/FinalPaycheckLateChecker";

type Props = { params: Promise<{ state: string }> };

export async function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) return {};

  const title = `${s.name} Final Paycheck Law 2026 — Deadlines & Penalties`;
  const description = `${s.name} final paycheck deadlines: terminated employees must be paid ${s.finalPaycheckTerminated.toLowerCase()}, resigned employees by ${s.finalPaycheckResigned.toLowerCase()}. What's included, penalties, and how to claim.`;
  const url = `${SITE.url}/us/states/${s.slug}/final-paycheck`;

  return {
    title,
    description: clampMetaDescription(description),
    alternates: { canonical: url },
    openGraph: { title, description: clampMetaDescription(description), url },
  };
}

function generateFaqs(s: ReturnType<typeof getUsState> & object): FaqItem[] {
  return [
    {
      question: `How long does my employer have to give me my final paycheck in ${s.name}?`,
      answer: `In ${s.name}, the deadline depends on how your employment ended. If your employer terminated you, your final paycheck is due ${s.finalPaycheckTerminated.toLowerCase()}. If you resigned voluntarily, it is due ${s.finalPaycheckResigned.toLowerCase()}. These are minimum legal deadlines — your employer can pay sooner, but not later.`,
    },
    {
      question: `What must be included in my final paycheck in ${s.name}?`,
      answer: `Your final paycheck in ${s.name} must include all wages earned through your last day of work, including any overtime owed and any accrued but unpaid commissions or bonuses that are calculable at the time. Whether accrued PTO must be included depends on ${s.name}'s PTO payout law — check the ${s.name} employment law page for specifics. Final paychecks cannot have unauthorized deductions.`,
    },
    {
      question: `What can I do if my employer is late with my final paycheck in ${s.name}?`,
      answer: `If your employer misses the final paycheck deadline in ${s.name}, you can file a wage claim with the ${s.name} Department of Labor (${s.dolUrl}). You may also have the right to file a civil lawsuit. Many states allow you to recover the unpaid wages plus penalties and attorney fees. Document everything: your last day, what you were owed, and all communications with your employer.`,
    },
    {
      question: `Can my employer deduct money from my final paycheck in ${s.name}?`,
      answer: `Unauthorized deductions from a final paycheck are generally illegal. In ${s.name}, an employer may only deduct amounts specifically authorized by law (taxes, garnishments) or expressly agreed to in writing by the employee. Attempting to withhold a final paycheck to recover property — a laptop, uniforms, a cash advance — without proper authorization or court process is a wage violation.`,
    },
    {
      question: `Does ${s.name} have penalties for employers who pay the final paycheck late?`,
      answer: `Yes. ${s.name} provides remedies for employees whose final paycheck is late. Depending on the circumstances, you may be entitled to the unpaid wages plus waiting-time penalties, liquidated damages, or interest. The ${s.name} labor enforcement agency can investigate your complaint and order payment. You may also pursue a private civil claim in state court. Contact the ${s.name} Department of Labor at ${s.dolUrl} to file a claim.`,
    },
  ];
}

export default async function Page({ params }: Props) {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) notFound();

  const url = `${SITE.url}/us/states/${s.slug}/final-paycheck`;
  const faqs = generateFaqs(s);
  const hasStateCalculator = s.code === "CA" || s.code === "TX";

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "US Employment Law", item: `${SITE.url}/us` },
      { "@type": "ListItem", position: 3, name: `${s.name} Employment Law`, item: `${SITE.url}/us/states/${s.slug}` },
      { "@type": "ListItem", position: 4, name: "Final Paycheck Law", item: url },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Final Paycheck Law 2026`,
    description: `Final paycheck deadlines and rules in ${s.name}.`,
    url,
    datePublished: "2026-01-01",
    dateModified: "2026-06-27",
    publisher: { "@type": "Organization", name: "MyPayRights", url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/us" className="hover:text-brand-600">US</Link>
          <span>/</span>
          <Link href={`/us/states/${s.slug}`} className="hover:text-brand-600">{s.name}</Link>
          <span>/</span>
          <span className="text-ink-soft">Final Paycheck</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          {s.name} Final Paycheck Law 2026
        </h1>
        <p className="mb-8 text-ink-soft">
          Deadlines, what must be included, and how to claim if your employer pays late.
        </p>

        {/* Key deadlines */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-surface-line bg-surface-muted p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">If you were terminated</p>
            <p className="text-xl font-bold text-ink">{s.finalPaycheckTerminated}</p>
          </div>
          <div className="rounded-xl border border-surface-line bg-surface-muted p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">If you resigned</p>
            <p className="text-xl font-bold text-ink">{s.finalPaycheckResigned}</p>
          </div>
        </div>

        {hasStateCalculator && (
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-bold text-ink">
              Was your {s.name} final paycheck late?
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-ink-soft">
              Enter your last day and payment date to estimate whether the paycheck missed the
              {s.name} deadline. This is a timing check only, not legal advice.
            </p>
            <FinalPaycheckLateChecker presetStateCode={s.code} />
          </section>
        )}

        {/* What must be included */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-ink">What must be included in your final paycheck</h2>
          <p className="mb-3 text-ink-soft">
            Your {s.name} employer must include all of the following in your final paycheck:
          </p>
          <ul className="space-y-2 text-ink-soft">
            {[
              "All earned wages through your last day (hourly or salary)",
              "Overtime pay owed for hours worked",
              "Commission that has already been earned and is calculable",
              "Any unreimbursed business expenses (where contractually required)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-brand-600">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-faint">
            Whether accrued vacation or PTO must be included depends on {s.name}&apos;s PTO payout law.{" "}
            <Link href={`/us/states/${s.slug}`} className="text-brand-600 hover:underline">
              See {s.name} PTO payout rules →
            </Link>
          </p>
        </section>

        {/* How to file a claim */}
        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-amber-900">If your employer pays late</h2>
          <ol className="space-y-2 text-sm text-amber-900">
            <li><strong>1.</strong> Document your last day worked and what you are owed.</li>
            <li><strong>2.</strong> Send a written demand to your employer (email is fine).</li>
            <li><strong>3.</strong> File a wage claim with the {s.name} Department of Labor.</li>
            <li><strong>4.</strong> You may also file a civil lawsuit to recover unpaid wages plus penalties.</li>
          </ol>
          <a
            href={s.dolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
          >
            {s.name} Department of Labor →
          </a>
        </section>

        {/* Tools CTA */}
        <section className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/final-paycheck-deadline-calculator"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Final paycheck deadline calculator
          </Link>
          <Link
            href="/pto-payout-calculator"
            className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600"
          >
            PTO payout calculator
          </Link>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-ink">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-surface-line">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 font-medium text-ink">
                  {faq.question}
                  <svg className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <p className="border-t border-surface-line px-4 py-3 text-sm text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-surface-line bg-surface-muted p-5 text-sm leading-relaxed text-ink-soft">
          <h2 className="mb-2 text-base font-bold text-ink">Sources and review</h2>
          <p>
            Publisher: My Pay Rights.
            Primary state source:{" "}
            <a href={s.dolUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              {s.name} labor agency
            </a>
            . Federal reference:{" "}
            <a href="https://www.dol.gov/agencies/whd/state/contacts" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              U.S. Department of Labor state contacts
            </a>
            .{" "}
            <Link href="/contact" className="text-brand-600 hover:underline">
              Report a correction
            </Link>
            .
          </p>
        </section>

        {/* Back link */}
        <div className="mt-8">
          <Link href={`/us/states/${s.slug}`} className="text-sm text-brand-600 hover:underline">
            ← Back to {s.name} employment law
          </Link>
        </div>
      </main>
    </>
  );
}
