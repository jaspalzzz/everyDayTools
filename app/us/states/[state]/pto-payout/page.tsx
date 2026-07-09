import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { US_STATES, getNearbyStates, getUsState } from "@/data/usStates";
import {
  EDITORIAL_REVIEW,
  FOUNDER_PERSON,
  SITE,
  clampMetaDescription,
  faqSchema,
  jsonLd,
} from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

type Props = { params: Promise<{ state: string }> };

const RULE_LABEL = {
  required: "PTO payout required",
  conditional: "PTO payout depends on policy",
  "no-requirement": "No state PTO payout requirement",
} as const;

const RULE_SUMMARY = {
  required:
    "State law treats earned vacation as wages, so accrued unused vacation generally must be paid when employment ends.",
  conditional:
    "State law usually looks to the employer's written PTO or vacation policy. A clear forfeiture policy can change the result.",
  "no-requirement":
    "State law does not require unused vacation payout by itself. The employer's written policy or employment contract controls.",
} as const;

export function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) return {};

  const title = `${s.name} PTO Payout Law 2026`;
  const description = `${RULE_LABEL[s.pto.rule]} in ${s.name}. ${s.pto.note} Check unused vacation pay, final paycheck timing, and wage claim steps.`;
  const url = `${SITE.url}/us/states/${s.slug}/pto-payout`;

  return {
    title,
    description: clampMetaDescription(description),
    alternates: { canonical: url },
    openGraph: { title, description: clampMetaDescription(description), url },
  };
}

function payoutAction(policyRule: keyof typeof RULE_LABEL, stateName: string) {
  if (policyRule === "required") {
    return `If your employer refuses to pay accrued vacation in ${stateName}, treat it as an unpaid wage issue. Ask payroll for the final PTO balance in writing, then file a wage claim with the state labor agency if the payment is missing from your final paycheck.`;
  }
  if (policyRule === "conditional") {
    return `In ${stateName}, start with the written PTO policy, offer letter, handbook, and any separation agreement. If those documents promise payout or do not clearly allow forfeiture, you may still have a wage claim.`;
  }
  return `In ${stateName}, the strongest claim usually comes from the employer's own written policy. Save the handbook and paystub showing accrued PTO, then compare the policy language with your final paycheck.`;
}

function generateFaqs(s: NonNullable<ReturnType<typeof getUsState>>): FaqItem[] {
  const stateName = s.name;
  const policy = s.pto;

  return [
    {
      question: `Does ${stateName} require PTO payout when I leave?`,
      answer: `${RULE_SUMMARY[policy.rule]} ${policy.note}`,
    },
    {
      question: `When should unused PTO be paid in ${stateName}?`,
      answer: `If PTO payout is owed in ${stateName}, it should be included with your final wages. Employees fired by the employer must be paid ${s.finalPaycheckTerminated.toLowerCase()}; employees who resign must be paid ${s.finalPaycheckResigned.toLowerCase()}.`,
    },
    {
      question: `Can a ${stateName} employer use a "use it or lose it" policy?`,
      answer:
        policy.rule === "required"
          ? `${stateName} is a higher-risk state for "use it or lose it" forfeiture because earned vacation is treated as wages. Employers may usually cap future accrual, but cannot simply erase already earned vacation.`
          : `${stateName} may allow "use it or lose it" or forfeiture language if the policy is clear and communicated in advance. The exact result depends on the written policy and any contract terms.`,
    },
    {
      question: `How do I calculate unused PTO value in ${stateName}?`,
      answer: `Multiply unused PTO hours by your final hourly rate. For salaried employees, convert salary to a daily or hourly equivalent, then multiply by accrued unused PTO. PTO payout is gross wages before tax withholding.`,
    },
    {
      question: `Where do I file a PTO payout claim in ${stateName}?`,
      answer: `Start with the ${stateName} labor agency: ${s.dolUrl}. Include your final paystub, PTO balance, handbook policy, resignation or termination date, and any payroll messages about unused vacation.`,
    },
  ];
}

export default async function Page({ params }: Props) {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) notFound();

  const url = `${SITE.url}/us/states/${s.slug}/pto-payout`;
  const reviewedDate = s.lastContentUpdate ?? `${s.verifiedYear}-01-01`;
  const nearbyStates = getNearbyStates(s.slug);
  const faqs = generateFaqs(s);
  const policy = s.pto;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "US Employment Law", item: `${SITE.url}/us` },
      { "@type": "ListItem", position: 3, name: `${s.name} Employment Law`, item: `${SITE.url}/us/states/${s.slug}` },
      { "@type": "ListItem", position: 4, name: "PTO Payout", item: url },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} PTO Payout Law 2026`,
    description: `${RULE_LABEL[policy.rule]} in ${s.name}. ${policy.note}`,
    url,
    datePublished: "2026-01-01",
    dateModified: reviewedDate,
    author: FOUNDER_PERSON,
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link href="/us" className="hover:text-brand-600">US</Link>
          <span>/</span>
          <Link href={`/us/states/${s.slug}`} className="hover:text-brand-600">{s.name}</Link>
          <span>/</span>
          <span className="text-ink-soft">PTO Payout</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          {s.name} PTO Payout Law 2026
        </h1>
        <p className="mb-8 text-ink-soft">
          Unused vacation payout rules, final paycheck timing, and wage claim steps for {s.name} workers.
        </p>

        <EditorialReview
          lastReviewed={reviewedDate}
          sourceLabel={`${s.name} labor agency`}
          className="mb-8"
        />

        <section className="mb-8 rounded-xl border border-surface-line bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">State rule</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">{RULE_LABEL[policy.rule]}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{policy.note}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{RULE_SUMMARY[policy.rule]}</p>
        </section>

        <section className="mb-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-surface-line bg-surface-muted p-4">
            <p className="text-xs text-ink-faint">PTO rule type</p>
            <p className="mt-1 text-sm font-semibold text-ink">{RULE_LABEL[policy.rule]}</p>
          </div>
          <div className="rounded-lg border border-surface-line bg-surface-muted p-4">
            <p className="text-xs text-ink-faint">If fired</p>
            <p className="mt-1 text-sm font-semibold text-ink">{s.finalPaycheckTerminated}</p>
          </div>
          <div className="rounded-lg border border-surface-line bg-surface-muted p-4">
            <p className="text-xs text-ink-faint">If resigned</p>
            <p className="mt-1 text-sm font-semibold text-ink">{s.finalPaycheckResigned}</p>
          </div>
        </section>

        <section className="prose-tool mb-10 max-w-none text-sm leading-relaxed text-ink-soft">
          <h2 className="text-base font-semibold text-ink">What this means in practice</h2>
          <p>
            PTO payout disputes in {s.name} usually turn on three facts: whether vacation has
            already been earned, what the written PTO policy says about forfeiture, and whether
            the final paycheck included all wages due by the state deadline.
          </p>
          <p>{payoutAction(policy.rule, s.name)}</p>

          <h2 className="mt-6 text-base font-semibold text-ink">How to estimate the payout</h2>
          <p>
            Use this formula: <strong>unused PTO hours x final hourly rate</strong>. For salaried
            employees, convert annual salary into an hourly or daily equivalent first. The result
            is gross pay before federal, state, and payroll tax withholding.
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">Documents to save</h2>
          <ul className="mt-2 flex flex-col gap-1.5 pl-4">
            <li className="list-disc">Final paystub and PTO balance</li>
            <li className="list-disc">Employee handbook or written PTO policy</li>
            <li className="list-disc">Offer letter, contract, or separation agreement</li>
            <li className="list-disc">Messages from payroll or HR about unused vacation</li>
          </ul>
        </section>

        <section className="mb-10 rounded-xl border border-brand-100 bg-brand-50 p-5">
          <h2 className="text-base font-semibold text-ink">Calculate and compare</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/pto-payout-calculator" className="rounded-lg border border-surface-line bg-white p-4 hover:bg-surface-muted">
              <p className="text-sm font-semibold text-ink">PTO payout calculator</p>
              <p className="mt-1 text-xs text-ink-soft">Estimate unused vacation value before tax.</p>
            </Link>
            <Link href={`/us/states/${s.slug}/final-paycheck`} className="rounded-lg border border-surface-line bg-white p-4 hover:bg-surface-muted">
              <p className="text-sm font-semibold text-ink">{s.name} final paycheck law</p>
              <p className="mt-1 text-xs text-ink-soft">Check the deadline and late-payment remedies.</p>
            </Link>
          </div>
        </section>

        <section className="mb-10" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-4 text-base font-semibold text-ink">Common questions</h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-surface-line bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-ink">{faq.question}</summary>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {nearbyStates.length > 0 && (
          <section className="mb-10" aria-labelledby="nearby-heading">
            <h2 id="nearby-heading" className="mb-4 text-base font-semibold text-ink">
              Compare nearby state PTO rules
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {nearbyStates.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/us/states/${nearby.slug}/pto-payout`}
                  className="rounded-lg border border-surface-line bg-white p-4 hover:bg-surface-muted"
                >
                  <p className="text-sm font-semibold text-ink">{nearby.name}</p>
                  <p className="mt-1 text-xs text-ink-soft">{RULE_LABEL[nearby.pto.rule]}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-surface-line pt-6 text-xs text-ink-faint">
          Sources:{" "}
          <a href={s.dolUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
            {s.name} labor agency
          </a>
          {" · "}
          <a href="https://www.dol.gov/agencies/whd/state/contacts" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
            U.S. Department of Labor state labor offices
          </a>
          {" · "}
          <Link href="/guides/us-pto-payout-laws-by-state" className="text-brand-600 hover:underline">
            US PTO payout guide
          </Link>
        </div>
      </main>
    </>
  );
}
