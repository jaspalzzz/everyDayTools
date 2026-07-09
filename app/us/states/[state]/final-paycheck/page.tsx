import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { US_STATES, getUsState, getNearbyStates, type UsStateWithPto } from "@/data/usStates";
import { EDITORIAL_REVIEW, FOUNDER_PERSON, SITE, clampMetaDescription, jsonLd, faqSchema } from "@/lib/seo";
import { clusterRank, pickVariantByPosition } from "@/lib/textVariants";
import type { FaqItem } from "@/lib/types";
import { FinalPaycheckLateChecker } from "@/components/calculators/FinalPaycheckLateChecker";

type Props = { params: Promise<{ state: string }> };

const ALL_SLUGS = US_STATES.map((s) => s.slug);

// Rank-based phrasing variants so states that share the same final-pay timing
// values (many are "next regular payday") don't render near-identical pages.
// Each field uses a different variant count so two states colliding on one
// answer won't collide on all of them. See lib/textVariants.ts.
const FP_DEADLINE_ANSWERS = [
  (s: UsStateWithPto) => `In ${s.name}, the deadline depends on how your employment ended. If your employer terminated you, your final paycheck is due ${s.finalPaycheckTerminated.toLowerCase()}. If you resigned voluntarily, it is due ${s.finalPaycheckResigned.toLowerCase()}. These are minimum legal deadlines — your employer can pay sooner, but not later.`,
  (s: UsStateWithPto) => `${s.name} sets the final-pay deadline by how you left. A firing means the check is due ${s.finalPaycheckTerminated.toLowerCase()}; quitting voluntarily means ${s.finalPaycheckResigned.toLowerCase()}. Employers may pay earlier, but paying later breaks the deadline.`,
  (s: UsStateWithPto) => `How fast ${s.name} requires your last check depends on the reason for separation: ${s.finalPaycheckTerminated.toLowerCase()} if the employer ended it, or ${s.finalPaycheckResigned.toLowerCase()} if you resigned. Those are floors, not targets — sooner is fine, later is not.`,
  (s: UsStateWithPto) => `Two deadlines apply in ${s.name}. Terminated employees must be paid ${s.finalPaycheckTerminated.toLowerCase()}; employees who resign are owed their final wages ${s.finalPaycheckResigned.toLowerCase()}. An employer that pays after these dates is in breach.`,
  (s: UsStateWithPto) => `${s.name} law ties the timing to the circumstances. If you were let go, the final paycheck is due ${s.finalPaycheckTerminated.toLowerCase()}. If you quit, it is due ${s.finalPaycheckResigned.toLowerCase()}. These are the latest lawful dates — nothing stops an employer paying you sooner.`,
] as const;

const FP_INCLUDED_ANSWERS = [
  (s: UsStateWithPto) => `Your final paycheck in ${s.name} must include all wages earned through your last day of work, including any overtime owed and any accrued but unpaid commissions or bonuses that are calculable at the time. Whether accrued PTO must be included depends on ${s.name}'s PTO payout law — check the ${s.name} employment law page for specifics. Final paychecks cannot have unauthorized deductions.`,
  (s: UsStateWithPto) => `In ${s.name}, the final check has to cover every wage you earned up to your last day: regular pay, overtime, and any commission or bonus that is already earned and calculable. Accrued PTO is separate — whether it must be paid out turns on ${s.name}'s PTO payout rules. No unauthorized deductions are allowed.`,
  (s: UsStateWithPto) => `${s.name} requires the final paycheck to reflect all earned wages through your last day — hourly or salary, plus owed overtime and any calculable earned commission. Unused PTO depends on ${s.name}'s separate payout law; see the state employment page. Deductions you didn't authorize are unlawful.`,
  (s: UsStateWithPto) => `Everything you earned through your last day belongs in the ${s.name} final paycheck: base wages, overtime, and earned, calculable commissions or bonuses. Accrued vacation is governed by ${s.name}'s PTO payout law, not the final-pay rule itself. The employer cannot slip in unauthorized deductions.`,
  (s: UsStateWithPto) => `A lawful ${s.name} final paycheck includes all wages through your last day worked, any overtime, and commissions/bonuses that have vested and can be calculated. Whether unused PTO is added depends on ${s.name}'s PTO payout law. Only legally authorized deductions (tax, garnishments) are permitted.`,
  (s: UsStateWithPto) => `The ${s.name} final paycheck should capture your full earned pay to the last day, overtime hours, and any commission or bonus that has already been earned and is quantifiable. Accrued vacation follows ${s.name}'s PTO payout law separately, and no deduction you didn't authorize in writing is lawful.`,
] as const;

const FP_LATE_ANSWERS = [
  (s: UsStateWithPto) => `If your employer misses the final paycheck deadline in ${s.name}, you can file a wage claim with the ${s.name} Department of Labor (${s.dolUrl}). You may also have the right to file a civil lawsuit. Many states allow you to recover the unpaid wages plus penalties and attorney fees. Document everything: your last day, what you were owed, and all communications with your employer.`,
  (s: UsStateWithPto) => `A late final paycheck in ${s.name} is a wage-law violation. Start by filing a claim with the ${s.name} Department of Labor at ${s.dolUrl}; a civil suit is also an option. Recovery often includes the unpaid wages plus penalties and sometimes attorney fees. Keep records of your last day, the amount owed, and every message with your employer.`,
  (s: UsStateWithPto) => `When a ${s.name} employer pays late, your route is a wage claim through the ${s.name} Department of Labor (${s.dolUrl}), or a private lawsuit. Depending on the facts you may recover the wages plus penalties and legal costs. Document the timeline: separation date, sums owed, and all correspondence.`,
  (s: UsStateWithPto) => `${s.name} gives you enforcement options if the deadline is missed: file with the ${s.name} Department of Labor (${s.dolUrl}) or sue in civil court. Awards frequently add penalties and attorney fees to the unpaid wages. Preserve evidence — your final day, the outstanding amount, and written exchanges with the employer.`,
  (s: UsStateWithPto) => `Missed the deadline in ${s.name}? File a wage claim with the ${s.name} Department of Labor at ${s.dolUrl}, and consider a civil claim as well. Many cases recover unpaid wages plus penalties (and sometimes fees). Save documentation of your last day, what you were owed, and all employer communications.`,
  (s: UsStateWithPto) => `The remedy for a late check in ${s.name} starts at the ${s.name} Department of Labor (${s.dolUrl}), with a civil lawsuit available too. Expect to potentially recover the wages, penalties, and in some cases attorney fees. Hold onto records of your separation date, the amount due, and every employer message.`,
  (s: UsStateWithPto) => `If ${s.name} pay arrives late, pursue it through the state Department of Labor at ${s.dolUrl} or in court. Recoverable amounts often go beyond the wages to include penalties and fees. Build a paper trail: last day worked, sums owed, and all correspondence with the employer.`,
] as const;

const FP_DEDUCTION_ANSWERS = [
  (s: UsStateWithPto) => `Unauthorized deductions from a final paycheck are generally illegal. In ${s.name}, an employer may only deduct amounts specifically authorized by law (taxes, garnishments) or expressly agreed to in writing by the employee. Attempting to withhold a final paycheck to recover property — a laptop, uniforms, a cash advance — without proper authorization or court process is a wage violation.`,
  (s: UsStateWithPto) => `Generally no — ${s.name} only allows deductions the law requires (taxes, court-ordered garnishments) or ones you agreed to in writing. Holding back your final check to claw back a laptop, uniform, or cash advance without written authorization or a court order is an unlawful deduction.`,
  (s: UsStateWithPto) => `In ${s.name}, a final paycheck can only be reduced by legally mandated amounts (tax, garnishment) or deductions you signed off on in writing. Docking pay to recover company property or an advance, absent that authorization or a court process, violates wage law.`,
  (s: UsStateWithPto) => `${s.name} treats most unauthorized deductions as illegal. Permitted ones are statutory (taxes, garnishments) or expressly agreed in writing. An employer can't withhold your final wages to recover equipment, uniforms, or a loan without your written consent or a court order.`,
  (s: UsStateWithPto) => `Only if the law requires it or you agreed in writing. ${s.name} employers may deduct taxes and garnishments, but withholding final pay to recover property or a cash advance — without written authorization or court process — is a wage violation you can act on.`,
  (s: UsStateWithPto) => `Deductions from a ${s.name} final paycheck are tightly limited to statutory ones (tax, garnishment) and anything you authorized in writing. Recovering the cost of a laptop, uniform, or advance by docking the check, without that consent or a court order, is unlawful.`,
  (s: UsStateWithPto) => `Not without authority. ${s.name} permits only legally required deductions or those you agreed to in writing. An employer that trims your final wages to recover property or a loan — lacking written consent or court process — has made an unlawful deduction.`,
  (s: UsStateWithPto) => `${s.name} law is narrow here: taxes, garnishments, and written-agreed amounts only. Using your final paycheck to offset unreturned equipment or a cash advance, absent written authorization or a court order, crosses into an illegal deduction.`,
] as const;

const FP_PENALTY_ANSWERS = [
  (s: UsStateWithPto) => `Yes. ${s.name} provides remedies for employees whose final paycheck is late. Depending on the circumstances, you may be entitled to the unpaid wages plus waiting-time penalties, liquidated damages, or interest. The ${s.name} labor enforcement agency can investigate your complaint and order payment. You may also pursue a private civil claim in state court. Contact the ${s.name} Department of Labor at ${s.dolUrl} to file a claim.`,
  (s: UsStateWithPto) => `Yes — late final pay carries remedies in ${s.name}. You may recover the wages plus waiting-time penalties, liquidated damages, or interest, depending on the facts. The ${s.name} labor agency can investigate and order payment, and you can also sue in state court. Start a claim at ${s.dolUrl}.`,
  (s: UsStateWithPto) => `${s.name} does provide penalties for late final paychecks. Beyond the unpaid wages, you may be owed waiting-time penalties, liquidated damages, or interest. The state labor enforcement agency can order payment, or you can bring a private civil claim. File through the ${s.name} Department of Labor at ${s.dolUrl}.`,
  (s: UsStateWithPto) => `Yes. Employees in ${s.name} whose final check is late may recover more than the wages themselves — waiting-time penalties, liquidated damages, or interest can apply. The ${s.name} labor agency investigates and can order payment; a civil suit is also available. Begin at ${s.dolUrl}.`,
  (s: UsStateWithPto) => `There are remedies in ${s.name} for a late final paycheck. Depending on circumstances you may claim penalties, liquidated damages, or interest on top of the unpaid wages. The ${s.name} Department of Labor (${s.dolUrl}) can investigate and order payment, and you retain the right to sue.`,
  (s: UsStateWithPto) => `Yes — ${s.name} backs the deadline with consequences. A late final paycheck can expose the employer to waiting-time penalties, liquidated damages, or interest beyond the wages themselves. The ${s.name} labor agency can order payment; ${s.dolUrl} is where a claim begins.`,
  (s: UsStateWithPto) => `${s.name} attaches real remedies to late final pay. On top of the unpaid amount you may be owed penalties, liquidated damages, or interest depending on the circumstances. File with the ${s.name} Department of Labor at ${s.dolUrl}, and a civil claim remains open to you.`,
  (s: UsStateWithPto) => `Late final pay is penalized in ${s.name}. Recovery can extend past the wages to waiting-time penalties, liquidated damages, or interest, based on the facts of your case. The state labor agency (${s.dolUrl}) investigates and can compel payment, or you can litigate.`,
  (s: UsStateWithPto) => `Yes. The ${s.name} deadline has teeth: employees can seek penalties, liquidated damages, or interest in addition to the unpaid wages when pay is late. Lodge a complaint with the ${s.name} Department of Labor at ${s.dolUrl}, or bring your own suit in state court.`,
] as const;

const FP_INTRO = [
  (s: UsStateWithPto) => `Deadlines, what must be included, and how to claim if your ${s.name} employer pays late.`,
  (s: UsStateWithPto) => `When your last check is due in ${s.name}, what it has to contain, and what to do if it's late.`,
  (s: UsStateWithPto) => `Your ${s.name} final-pay deadline, the wages that must be included, and your options for a late paycheck.`,
  (s: UsStateWithPto) => `How final pay works in ${s.name}: timing by separation type, required contents, and enforcement if it's late.`,
  (s: UsStateWithPto) => `The ${s.name} rules on final-paycheck timing, what belongs in it, and how to recover late wages.`,
] as const;

const FP_INCLUDED_LEAD = [
  (s: UsStateWithPto) => `Your ${s.name} employer must include all of the following in your final paycheck:`,
  (s: UsStateWithPto) => `Under ${s.name} law, a complete final paycheck has to cover each of these:`,
  (s: UsStateWithPto) => `In ${s.name}, a lawful final paycheck should account for all of the following:`,
  (s: UsStateWithPto) => `These items must appear in a ${s.name} final paycheck:`,
  (s: UsStateWithPto) => `A ${s.name} final paycheck is only complete when it includes each of these:`,
  (s: UsStateWithPto) => `For a final paycheck to be lawful in ${s.name}, it needs to include all of the following:`,
] as const;

export async function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) return {};

  const title = `${s.name} Final Paycheck Law 2026`;
  const description = `${s.name} final paycheck deadlines: terminated employees must be paid ${s.finalPaycheckTerminated.toLowerCase()}, resigned employees by ${s.finalPaycheckResigned.toLowerCase()}. What's included, penalties, and how to claim.`;
  const url = `${SITE.url}/us/states/${s.slug}/final-paycheck`;

  return {
    title,
    description: clampMetaDescription(description),
    alternates: { canonical: url },
    openGraph: { title, description: clampMetaDescription(description), url },
  };
}

function generateFaqs(s: UsStateWithPto): FaqItem[] {
  const rank = clusterRank(ALL_SLUGS, s.slug);
  return [
    {
      question: `How long does my employer have to give me my final paycheck in ${s.name}?`,
      answer: pickVariantByPosition(rank, FP_DEADLINE_ANSWERS)(s),
    },
    {
      question: `What must be included in my final paycheck in ${s.name}?`,
      answer: pickVariantByPosition(rank, FP_INCLUDED_ANSWERS)(s),
    },
    {
      question: `What can I do if my employer is late with my final paycheck in ${s.name}?`,
      answer: pickVariantByPosition(rank, FP_LATE_ANSWERS)(s),
    },
    {
      question: `Can my employer deduct money from my final paycheck in ${s.name}?`,
      answer: pickVariantByPosition(rank, FP_DEDUCTION_ANSWERS)(s),
    },
    {
      question: `Does ${s.name} have penalties for employers who pay the final paycheck late?`,
      answer: pickVariantByPosition(rank, FP_PENALTY_ANSWERS)(s),
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
  const reviewedDate = s.lastContentUpdate ?? `${s.verifiedYear}-01-01`;
  const rank = clusterRank(ALL_SLUGS, s.slug);
  const nearbyStates = getNearbyStates(s.slug);

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
    dateModified: reviewedDate,
    author: FOUNDER_PERSON,
    reviewedBy: EDITORIAL_REVIEW,
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
          {pickVariantByPosition(rank, FP_INTRO)(s)}
        </p>

        <EditorialReview
          lastReviewed={reviewedDate}
          sourceLabel={`${s.name} labor agency`}
          className="mb-8"
        />

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
            {pickVariantByPosition(rank, FP_INCLUDED_LEAD)(s)}
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

        {/* Nearby states */}
        {nearbyStates.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-ink">
              How {s.name} compares to nearby states
            </h2>
            <p className="mb-4 text-sm text-ink-soft">
              Final-paycheck deadlines vary across the {s.region} region. {s.name} requires{" "}
              {s.finalPaycheckTerminated.toLowerCase()} after a termination and{" "}
              {s.finalPaycheckResigned.toLowerCase()} after a resignation — here is how neighbouring
              states set their deadlines.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-line text-xs uppercase tracking-wide text-ink-faint">
                    <th scope="col" className="py-2 pr-4 font-semibold">State</th>
                    <th scope="col" className="py-2 pr-4 font-semibold">If fired</th>
                    <th scope="col" className="py-2 font-semibold">If resigned</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-line bg-surface-muted/40">
                    <th scope="row" className="py-2 pr-4 font-semibold text-ink">{s.name} (this page)</th>
                    <td className="py-2 pr-4 text-ink-soft">{s.finalPaycheckTerminated}</td>
                    <td className="py-2 text-ink-soft">{s.finalPaycheckResigned}</td>
                  </tr>
                  {nearbyStates.map((n) => (
                    <tr key={n.slug} className="border-b border-surface-line last:border-0">
                      <th scope="row" className="py-2 pr-4 font-medium">
                        <Link href={`/us/states/${n.slug}/final-paycheck`} className="text-brand-600 hover:underline">
                          {n.name}
                        </Link>
                      </th>
                      <td className="py-2 pr-4 text-ink-soft">{n.finalPaycheckTerminated}</td>
                      <td className="py-2 text-ink-soft">{n.finalPaycheckResigned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

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
