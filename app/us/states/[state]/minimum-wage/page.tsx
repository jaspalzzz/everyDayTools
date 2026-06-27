import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { US_STATES, getUsState } from "@/data/usStates";
import { SITE, jsonLd, faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

type Props = { params: Promise<{ state: string }> };

export async function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) return {};

  const title = `${s.name} Minimum Wage 2026 — Current Rate & Rules`;
  const description = `${s.name} minimum wage is ${s.minimumWage} in 2026.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} Learn about tipped employee rates, scheduled increases, and how to report violations.`;
  const url = `${SITE.url}/us/states/${s.slug}/minimum-wage`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

function generateFaqs(s: ReturnType<typeof getUsState> & object): FaqItem[] {
  const isFederal = s.minimumWage.includes("federal minimum");
  return [
    {
      question: `What is the minimum wage in ${s.name} in 2026?`,
      answer: `The minimum wage in ${s.name} is ${s.minimumWage}.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} ${isFederal ? `${s.name} has not set a state minimum wage above the federal rate, so the federal minimum wage of $7.25/hr applies.` : ""}`,
    },
    {
      question: `Does the federal minimum wage apply in ${s.name}?`,
      answer: isFederal
        ? `Yes. ${s.name} does not have a state minimum wage law that exceeds the federal rate. The federal minimum wage of $7.25/hr (set by the Fair Labor Standards Act) therefore applies. If the federal minimum wage is ever raised by Congress, that new rate would automatically apply in ${s.name}.`
        : `The federal minimum wage of $7.25/hr applies nationwide, but ${s.name}'s state minimum wage of ${s.minimumWage} is higher — and the higher rate must be paid. Under the Fair Labor Standards Act, when a state rate exceeds the federal rate, the state rate controls.`,
    },
    {
      question: `What is the minimum wage for tipped employees in ${s.name}?`,
      answer: `Tipped employees in ${s.name} may be paid a lower "tipped minimum wage" under federal or state law, provided tips bring total hourly earnings up to the full minimum wage. If tips do not make up the difference, the employer must pay the shortfall. The specific tipped credit rules in ${s.name} are set by state law — check the ${s.name} Department of Labor for the current tipped rate.`,
    },
    {
      question: `Are there local minimum wages higher than ${s.name}'s state rate?`,
      answer: `Some cities and counties in ${s.name} may have enacted local minimum wages higher than the state rate. Where a local ordinance applies, employers must pay the highest of federal, state, or local rates. Check with your local city or county government for any applicable local minimum wage that may apply to your job.`,
    },
    {
      question: `What can I do if my employer pays me less than minimum wage in ${s.name}?`,
      answer: `If your employer pays below the minimum wage in ${s.name}, you can: (1) file a wage complaint with the ${s.name} Department of Labor; (2) file a federal complaint with the US Department of Labor Wage and Hour Division; or (3) bring a private civil lawsuit to recover unpaid wages. You may be entitled to back pay for up to 2–3 years plus additional damages. Retaliation for filing a wage complaint is illegal. Visit the ${s.name} Department of Labor at ${s.dolUrl} to start a claim.`,
    },
  ];
}

export default async function Page({ params }: Props) {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) notFound();

  const url = `${SITE.url}/us/states/${s.slug}/minimum-wage`;
  const faqs = generateFaqs(s);

  const isFederal = s.minimumWage.includes("federal minimum");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "US Employment Law", item: `${SITE.url}/us` },
      { "@type": "ListItem", position: 3, name: `${s.name} Employment Law`, item: `${SITE.url}/us/states/${s.slug}` },
      { "@type": "ListItem", position: 4, name: "Minimum Wage", item: url },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} Minimum Wage 2026`,
    description: `Current minimum wage in ${s.name} and rules for 2026.`,
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
          <span className="text-ink-soft">Minimum Wage</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          {s.name} Minimum Wage 2026
        </h1>
        <p className="mb-8 text-ink-soft">
          Current rate, tipped employee rules, and what to do if you are underpaid.
        </p>

        {/* Current rate card */}
        <div className="mb-8 rounded-xl border border-brand-100 bg-brand-50 p-6">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand-600">Current minimum wage</p>
          <p className="text-4xl font-bold text-ink">{s.minimumWage}</p>
          {isFederal && (
            <p className="mt-2 text-sm text-ink-soft">
              {s.name} uses the federal minimum wage — no higher state rate has been enacted.
            </p>
          )}
          {s.minimumWageNote && (
            <p className="mt-2 text-sm text-ink-soft">{s.minimumWageNote}</p>
          )}
        </div>

        {/* Quick facts grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-surface-line bg-surface-muted p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">Federal vs state</p>
            <p className="font-semibold text-ink">
              {isFederal ? "Federal rate applies ($7.25/hr)" : `State rate applies (${s.minimumWage})`}
            </p>
          </div>
          <div className="rounded-xl border border-surface-line bg-surface-muted p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">Last verified</p>
            <p className="font-semibold text-ink">{s.verifiedYear}</p>
          </div>
        </div>

        {/* Who is covered */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-ink">Who is covered by the {s.name} minimum wage</h2>
          <p className="mb-3 text-ink-soft">
            The minimum wage applies to most employees in {s.name}. Common exemptions include:
          </p>
          <ul className="space-y-2 text-ink-soft">
            {[
              "Certain agricultural or farm workers (federal FLSA exemptions may apply)",
              "Tipped employees — a lower base rate may apply if tips close the gap",
              "Student workers at certain educational institutions (may qualify for a subminimum rate)",
              "Independent contractors — minimum wage laws do not apply to genuine contractors",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-ink-faint">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How to report */}
        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 text-lg font-bold text-amber-900">Being paid below minimum wage?</h2>
          <ol className="space-y-2 text-sm text-amber-900">
            <li><strong>1.</strong> Calculate the shortfall: hours worked × (minimum wage − actual pay).</li>
            <li><strong>2.</strong> Keep records: pay stubs, time records, and any written communications.</li>
            <li><strong>3.</strong> File a complaint with the {s.name} Department of Labor or the US DOL Wage and Hour Division.</li>
            <li><strong>4.</strong> You may also bring a private lawsuit to recover up to 3 years of back pay plus liquidated damages.</li>
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
            href="/take-home-overtime-calculator"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Overtime pay calculator
          </Link>
          <Link
            href="/take-home-pay-calculator"
            className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600"
          >
            Take-home pay calculator
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
