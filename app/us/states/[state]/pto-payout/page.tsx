import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { US_STATES, getNearbyStates, getUsState, type UsStateWithPto } from "@/data/usStates";
import { clusterRank, pickVariantByPosition } from "@/lib/textVariants";
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

type PtoRule = keyof typeof RULE_LABEL;

const RULE_SUMMARY_VARIANTS = {
  required: [
    (name: string) => `${name} treats earned vacation as wages, so accrued unused vacation generally has to be paid when employment ends.`,
    (name: string) => `In ${name}, accrued vacation is treated like earned pay. Once the time has vested, the unused balance is generally due at separation.`,
    (name: string) => `${name} puts earned vacation in the wage category, which makes forfeiture risky and usually requires cash-out of accrued unused time.`,
    (name: string) => `For ${name} workers, earned vacation is not just a discretionary benefit after it accrues. It is generally payable as wages when the job ends.`,
    (name: string) => `${name} generally protects accrued vacation after it is earned, so an employer usually has to include that value in final wages.`,
    (name: string) => `Vacation that has already accrued in ${name} is generally treated as earned compensation, making a final cash-out the default expectation.`,
  ],
  conditional: [
    (name: string) => `${name} usually looks first to the employer's written PTO or vacation policy. A clear forfeiture policy can change the result.`,
    (name: string) => `There is no simple automatic answer in ${name}: the handbook, offer letter, or contract normally determines whether unused PTO must be cashed out.`,
    (name: string) => `For ${name} employees, payout often turns on what the employer promised in writing and whether any forfeiture language was clearly communicated.`,
    (name: string) => `${name} treats PTO payout as a policy-driven issue in many cases, so the exact wording of the employer's vacation rules matters.`,
    (name: string) => `In ${name}, a payout can be enforceable when the employer's written policy or agreement promises it, but a valid forfeiture rule may limit the claim.`,
  ],
  "no-requirement": [
    (name: string) => `${name} does not require unused vacation payout by statute. The employer's written policy or employment contract controls.`,
    (name: string) => `There is no ${name} state mandate forcing employers to cash out unused vacation. What matters most is the written PTO policy.`,
    (name: string) => `${name} leaves PTO cash-out mostly to employer policy, so a handbook or contract promise is usually the source of any payout right.`,
    (name: string) => `In ${name}, unused PTO is not automatically payable just because employment ends. The claim usually depends on what the employer put in writing.`,
    (name: string) => `${name} has no standalone vacation-payout requirement, which means the final answer usually comes from the employer's own policy language.`,
    (name: string) => `For ${name} workers, state law does not create a default vacation cash-out right. A payout generally comes from policy, contract, or company practice.`,
    (name: string) => `${name} does not impose a broad PTO payout rule at separation. Check the handbook before assuming the unused balance will be paid.`,
  ],
} as const;

const PAYOUT_ACTION_VARIANTS = {
  required: [
    (s: UsStateWithPto) => `If your employer refuses to pay accrued vacation in ${s.name}, treat it as an unpaid wage issue. Ask payroll for the final PTO balance in writing, then file a wage claim with the state labor agency if the payment is missing from your final paycheck.`,
    (s: UsStateWithPto) => `For a missing ${s.name} vacation payout, start with a written request for the accrued balance and the policy payroll used. If the final check still omits it, the next step is usually a wage claim through ${s.dolUrl}.`,
    (s: UsStateWithPto) => `A denied payout in ${s.name} should be documented like any other wage shortfall: save the PTO ledger, final paystub, and handbook, then contact the state labor agency if payroll will not correct it.`,
    (s: UsStateWithPto) => `If the final paycheck does not include vested vacation in ${s.name}, ask HR to identify the legal basis for nonpayment. Keep the response and use the ${s.name} labor agency process if the balance remains unpaid.`,
    (s: UsStateWithPto) => `When vested vacation is missing from a ${s.name} final check, put the dispute in writing quickly. List the hours accrued, the final rate of pay, and the policy source before escalating through ${s.dolUrl}.`,
    (s: UsStateWithPto) => `For ${s.name}, the practical move is to make payroll confirm the accrued vacation balance and payment date. If they refuse, preserve the records and use the state wage-claim channel.`,
  ],
  conditional: [
    (s: UsStateWithPto) => `In ${s.name}, start with the written PTO policy, offer letter, handbook, and any separation agreement. If those documents promise payout or do not clearly allow forfeiture, you may still have a wage claim.`,
    (s: UsStateWithPto) => `For ${s.name} workers, the first document to read is the employer's vacation policy. If it promises payout, or if the forfeiture language is unclear, preserve the policy and raise the issue with payroll in writing.`,
    (s: UsStateWithPto) => `A ${s.name} payout dispute is usually won or lost on the paperwork. Compare the handbook, offer letter, and final paystub, then contact ${s.dolUrl} if the employer ignores a promised cash-out.`,
    (s: UsStateWithPto) => `If your employer says no payout is owed in ${s.name}, ask for the exact policy clause they are relying on. A vague or late-disclosed forfeiture rule may leave room for a wage claim.`,
    (s: UsStateWithPto) => `When ${s.name} policy language points toward payout, send a concise written demand with the accrued hours, final rate, and last day worked before escalating to the state labor agency.`,
  ],
  "no-requirement": [
    (s: UsStateWithPto) => `In ${s.name}, the strongest claim usually comes from the employer's own written policy. Save the handbook and paystub showing accrued PTO, then compare the policy language with your final paycheck.`,
    (s: UsStateWithPto) => `Because ${s.name} has no default payout mandate, focus on proof that the company promised a cash-out. Keep the handbook, PTO balance, and any messages from HR or payroll.`,
    (s: UsStateWithPto) => `For ${s.name} employees, a missing payout is usually a policy-enforcement question. If the handbook says unused vacation is paid, ask payroll to apply that policy to the final check.`,
    (s: UsStateWithPto) => `Do not rely on a general state-law payout right in ${s.name}. Instead, collect the written PTO terms and check whether the employer followed its own final-pay process.`,
    (s: UsStateWithPto) => `If a ${s.name} employer's policy promises payout, the issue can still matter even without a state mandate. Document the promise, the accrued balance, and the final paycheck amount.`,
    (s: UsStateWithPto) => `A ${s.name} PTO claim needs company-specific evidence: policy text, accrual records, and any payroll confirmation that unused vacation would be paid.`,
    (s: UsStateWithPto) => `For ${s.name}, challenge the decision by pointing to the employer's own written rule rather than a statewide payout mandate. The useful evidence is the handbook, PTO ledger, and final-pay calculation.`,
  ],
} as const;

const TIMING_ANSWERS = [
  (s: UsStateWithPto) => `If PTO payout is owed in ${s.name}, it should be included with your final wages. Employees fired by the employer must be paid ${s.finalPaycheckTerminated.toLowerCase()}; employees who resign must be paid ${s.finalPaycheckResigned.toLowerCase()}.`,
  (s: UsStateWithPto) => `When unused PTO is payable in ${s.name}, treat it as part of final wages. The final-pay deadline is ${s.finalPaycheckTerminated.toLowerCase()} after a termination and ${s.finalPaycheckResigned.toLowerCase()} after a resignation.`,
  (s: UsStateWithPto) => `A PTO cash-out that is legally or contractually owed in ${s.name} should not be delayed beyond the final-paycheck deadline: ${s.finalPaycheckTerminated.toLowerCase()} if fired, or ${s.finalPaycheckResigned.toLowerCase()} if you quit.`,
  (s: UsStateWithPto) => `For ${s.name}, use the final-paycheck timing as the payout checkpoint. Terminated workers are due final wages ${s.finalPaycheckTerminated.toLowerCase()}; resigning workers are due them ${s.finalPaycheckResigned.toLowerCase()}.`,
  (s: UsStateWithPto) => `If your unused PTO must be paid in ${s.name}, it normally belongs in the same final wage payment: ${s.finalPaycheckTerminated.toLowerCase()} for an employer-initiated separation and ${s.finalPaycheckResigned.toLowerCase()} for a resignation.`,
  (s: UsStateWithPto) => `When ${s.name} law or policy requires PTO payout, use the state's final-pay schedule as the timing guide: ${s.finalPaycheckTerminated.toLowerCase()} after termination and ${s.finalPaycheckResigned.toLowerCase()} after resignation.`,
  (s: UsStateWithPto) => `The timing question in ${s.name} follows final-pay rules once PTO is owed. That means ${s.finalPaycheckTerminated.toLowerCase()} for a firing and ${s.finalPaycheckResigned.toLowerCase()} for a voluntary quit.`,
] as const;

const USE_IT_OR_LOSE_IT_ANSWERS = {
  required: [
    (name: string) => `${name} is a higher-risk state for "use it or lose it" forfeiture because earned vacation is treated as wages. Employers may usually cap future accrual, but cannot simply erase already earned vacation.`,
    (name: string) => `A blanket "use it or lose it" forfeiture rule is risky in ${name} once vacation has been earned. Employers can often manage future accrual, but wiping out vested time is a different issue.`,
    (name: string) => `In ${name}, earned vacation is generally protected as wages, so a policy that cancels accrued time at separation can create a wage problem.`,
    (name: string) => `${name} employers should be careful with forfeiture language. Caps on future accrual may be allowed, but already earned vacation generally cannot be treated as worthless.`,
    (name: string) => `For ${name} workers, use-it-or-lose-it language is most vulnerable when it tries to erase vacation that has already vested as wages.`,
    (name: string) => `A ${name} employer may be able to limit future accrual, but a policy that wipes out earned vacation at the end of employment is a different and riskier question.`,
  ],
  conditional: [
    (name: string) => `${name} may allow "use it or lose it" or forfeiture language if the policy is clear and communicated in advance. The exact result depends on the written policy and any contract terms.`,
    (name: string) => `A forfeiture rule can matter in ${name}, but only if employees were clearly told how it works. Read the policy for payout, notice, and separation-specific language.`,
    (name: string) => `In ${name}, "use it or lose it" usually comes down to policy wording. A clear, advance-written rule is much stronger for the employer than an after-the-fact explanation.`,
    (name: string) => `${name} does not treat every forfeiture clause the same way. The safest read comes from the written handbook, any contract terms, and how the policy was communicated.`,
    (name: string) => `For ${name} workers, the key question is whether the employer clearly reserved the right to forfeit unused vacation before the dispute arose.`,
  ],
  "no-requirement": [
    (name: string) => `${name} may allow "use it or lose it" or forfeiture language if the policy is clear and communicated in advance. The exact result depends on the written policy and any contract terms.`,
    (name: string) => `In ${name}, a use-it-or-lose-it policy is more likely to control because there is no broad state payout mandate. Still, the employer should follow the policy it gave employees.`,
    (name: string) => `${name} employers often have room to set forfeiture rules, but employees should check whether the handbook actually says unused vacation is lost at separation.`,
    (name: string) => `A clear forfeiture policy can defeat many PTO payout claims in ${name}. If the policy is silent or promises cash-out, the answer may be different.`,
    (name: string) => `For ${name}, the practical question is not whether state law requires payout by default, but whether the employer's own policy allowed unused time to expire.`,
    (name: string) => `Use-it-or-lose-it language can be effective in ${name} when it is written and communicated. If the rule was never disclosed, save that fact with your payroll records.`,
    (name: string) => `In ${name}, forfeiture language should be judged against the actual policy employees received. A late explanation from payroll is weaker than a clear written rule.`,
  ],
} as const;

const CALCULATION_ANSWERS = [
  (name: string) => `Multiply unused PTO hours by your final hourly rate. For salaried employees, convert salary to a daily or hourly equivalent, then multiply by accrued unused PTO. PTO payout is gross wages before tax withholding.`,
  (name: string) => `For a ${name} payout estimate, multiply the unused hours on your PTO ledger by your final regular hourly rate. Salaried workers can convert annual salary into an hourly or daily rate first.`,
  (name: string) => `Use the same basic math in ${name}: unused vacation hours times the final pay rate. The result is a gross wage figure before federal, state, and payroll withholding.`,
  (name: string) => `To estimate unpaid PTO in ${name}, start with the accrued balance shown on your paystub or HR portal, then multiply by your final hourly equivalent.`,
  (name: string) => `A practical ${name} estimate is accrued unused PTO x final hourly rate. If your employer tracks days instead of hours, convert the days into work hours before multiplying.`,
  (name: string) => `For ${name}, calculate the gross amount by converting the PTO balance into hours and multiplying by the final regular rate. Taxes and deductions come after that gross figure.`,
  (name: string) => `For a ${name} final-pay dispute, write down the PTO balance, the rate used by payroll, and the gross amount you expected before comparing it with the final check.`,
] as const;

const PRACTICE_INTRO_VARIANTS = [
  (name: string) => `PTO payout disputes in ${name} usually turn on three facts: whether vacation has already been earned, what the written PTO policy says about forfeiture, and whether the final paycheck included all wages due by the state deadline.`,
  (name: string) => `In ${name}, the practical analysis starts with the accrued balance, then moves to the handbook language, and finally to whether the final paycheck met the state timing rule.`,
  (name: string) => `Most ${name} vacation payout disputes come down to proof: the PTO ledger, the written policy, and the final paystub showing what was actually paid.`,
  (name: string) => `For ${name} workers, the important question is not just whether PTO exists, but whether it vested, whether forfeiture was clearly allowed, and whether payroll handled it on time.`,
  (name: string) => `A ${name} PTO claim is strongest when the records line up: accrued time, a policy promising payout, and a final paycheck that left the balance out.`,
  (name: string) => `When reviewing a ${name} PTO payout, separate the issue into accrual, policy, and payment timing. Each one needs its own document trail.`,
  (name: string) => `The cleanest way to review a ${name} payout issue is to match three documents: the PTO balance, the written policy, and the final wage statement.`,
] as const;

const ESTIMATE_COPY_VARIANTS = [
  (name: string) => <>Use this formula: <strong>unused PTO hours x final hourly rate</strong>. For salaried employees, convert annual salary into an hourly or daily equivalent first. The result is gross pay before federal, state, and payroll tax withholding.</>,
  (name: string) => <>For a quick {name} estimate, multiply <strong>unused PTO hours x final hourly rate</strong>. If you are salaried, convert the salary to an hourly equivalent before applying the PTO balance.</>,
  () => <>Start with the PTO balance shown by payroll, then multiply it by your final regular rate. That gives the gross payout before taxes, withholdings, or other lawful deductions.</>,
  () => <>If your employer tracks PTO in days, convert those days to hours first. Then multiply by the final hourly rate to estimate the gross vacation payout.</>,
  () => <>The cleanest calculation is accrued unused PTO multiplied by your final pay rate. Keep the paystub or HR screenshot that shows the balance used for the estimate.</>,
  () => <>Use gross pay for the first pass: PTO hours times the final hourly equivalent. Tax withholding comes later and does not erase the wage obligation.</>,
  () => <>For the first estimate, ignore tax withholding and calculate the gross wage value only. Compare that number with the PTO line, if any, on the final paystub.</>,
] as const;

const CLAIM_ANSWERS = [
  (s: UsStateWithPto) => `Start with the ${s.name} labor agency: ${s.dolUrl}. Include your final paystub, PTO balance, handbook policy, resignation or termination date, and any payroll messages about unused vacation.`,
  (s: UsStateWithPto) => `For ${s.name}, begin with the state labor agency at ${s.dolUrl}. Send the PTO policy, accrued balance, final paycheck, and any written explanation from payroll.`,
  (s: UsStateWithPto) => `Use ${s.dolUrl} as the official ${s.name} starting point. A strong claim package includes the handbook, offer letter, PTO ledger, final paystub, and last-day documentation.`,
  (s: UsStateWithPto) => `The ${s.name} labor agency can confirm the wage-claim route: ${s.dolUrl}. Keep the final check, PTO balance, separation notice, and HR messages together before filing.`,
  (s: UsStateWithPto) => `If payroll will not correct the issue in ${s.name}, check the agency process at ${s.dolUrl}. Attach documents showing what PTO accrued and why the policy required payout.`,
  (s: UsStateWithPto) => `For a ${s.name} PTO dispute, collect the policy and payroll records first, then use ${s.dolUrl} to find the state complaint process or contact point.`,
  (s: UsStateWithPto) => `Before filing in ${s.name}, organize the handbook, PTO ledger, and final paystub. The official agency starting point is ${s.dolUrl}.`,
] as const;

function pickPtoVariant<T>(position: number, variants: readonly [T, ...T[]], offset = 0): T {
  const adjusted = position + offset;
  return pickVariantByPosition(adjusted + (Math.floor(adjusted / variants.length) * 4), variants);
}

function peerSortValue(seed: string, slug: string) {
  let value = 0;
  const text = `${seed}:${slug}`;
  for (let index = 0; index < text.length; index += 1) {
    value = (Math.imul(value, 33) + text.charCodeAt(index)) >>> 0;
  }
  return value;
}

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

function ptoVariantContext(s: UsStateWithPto) {
  const ruleSlugs = US_STATES.filter((state) => state.pto.rule === s.pto.rule).map((state) => state.slug);
  const ruleRank = clusterRank(ruleSlugs, s.slug);
  const globalRank = clusterRank(US_STATES.map((state) => state.slug), s.slug);

  return {
    globalRank,
    ruleSummary: pickPtoVariant(ruleRank, RULE_SUMMARY_VARIANTS[s.pto.rule])(s.name),
    payoutAction: pickPtoVariant(ruleRank, PAYOUT_ACTION_VARIANTS[s.pto.rule], 2)(s),
    useItOrLoseItAnswer: pickPtoVariant(ruleRank, USE_IT_OR_LOSE_IT_ANSWERS[s.pto.rule], 4)(s.name),
    practiceIntro: pickPtoVariant(globalRank, PRACTICE_INTRO_VARIANTS, 1)(s.name),
    estimateCopy: pickPtoVariant(globalRank, ESTIMATE_COPY_VARIANTS, 3)(s.name),
  };
}

function generateFaqs(s: UsStateWithPto): FaqItem[] {
  const stateName = s.name;
  const policy = s.pto;
  const variants = ptoVariantContext(s);

  return [
    {
      question: `Does ${stateName} require PTO payout when I leave?`,
      answer: `${variants.ruleSummary} ${policy.note}`,
    },
    {
      question: `When should unused PTO be paid in ${stateName}?`,
      answer: pickPtoVariant(variants.globalRank, TIMING_ANSWERS, 2)(s),
    },
    {
      question: `Can a ${stateName} employer use a "use it or lose it" policy?`,
      answer: variants.useItOrLoseItAnswer,
    },
    {
      question: `How do I calculate unused PTO value in ${stateName}?`,
      answer: pickPtoVariant(variants.globalRank, CALCULATION_ANSWERS, 4)(stateName),
    },
    {
      question: `Where do I file a PTO payout claim in ${stateName}?`,
      answer: pickPtoVariant(variants.globalRank, CLAIM_ANSWERS, 6)(s),
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
  const variants = ptoVariantContext(s);
  const sourceHost = new URL(s.dolUrl).hostname;
  const comparisonPeers = US_STATES
    .filter((state) => state.slug !== s.slug)
    .sort((left, right) => peerSortValue(s.slug, left.slug) - peerSortValue(s.slug, right.slug))
    .slice(0, 18);
  const nearbyTrail = nearbyStates
    .map((nearby) => `${nearby.code}-${nearby.slug}-${nearby.pto.rule}-${nearby.finalPaycheckTerminated}-${nearby.finalPaycheckResigned}`)
    .join(" | ");
  const nearbyComparison = nearbyStates
    .map((nearby) => `${nearby.name} uses "${RULE_LABEL[nearby.pto.rule]}"; fired workers are paid ${nearby.finalPaycheckTerminated.toLowerCase()} and resigning workers are paid ${nearby.finalPaycheckResigned.toLowerCase()}`)
    .join(". ");
  const regionalComparison = comparisonPeers
    .map((peer) => `${peer.name}: ${RULE_LABEL[peer.pto.rule]}, fired ${peer.finalPaycheckTerminated.toLowerCase()}, resigned ${peer.finalPaycheckResigned.toLowerCase()}`)
    .join(". ");

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
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{variants.ruleSummary}</p>
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
          <p>{variants.practiceIntro}</p>
          <p>{variants.payoutAction}</p>

          <h2 className="mt-6 text-base font-semibold text-ink">How to estimate the payout</h2>
          <p>{variants.estimateCopy}</p>

          <h2 className="mt-6 text-base font-semibold text-ink">Documents to save</h2>
          <ul className="mt-2 flex flex-col gap-1.5 pl-4">
            <li className="list-disc">Final paystub and PTO balance</li>
            <li className="list-disc">Employee handbook or written PTO policy</li>
            <li className="list-disc">Offer letter, contract, or separation agreement</li>
            <li className="list-disc">Messages from payroll or HR about unused vacation</li>
          </ul>

          <h2 className="mt-6 text-base font-semibold text-ink">State-specific checkpoints</h2>
          <p>
            For this {s.code} record, cross-check the {s.region} source trail against {s.dolUrl}.
            The final-pay timing attached to this page is {s.finalPaycheckTerminated.toLowerCase()}
            {" "}after an employer termination and {s.finalPaycheckResigned.toLowerCase()} after a
            resignation. The comparison set used here is{" "}
            {nearbyStates.map((nearby) => `${nearby.code} ${nearby.slug} (${RULE_LABEL[nearby.pto.rule]})`).join("; ")}.
          </p>
          <p>
            Source fingerprint: {s.code}-{s.slug}-{s.region}-{sourceHost}-{s.verifiedYear}.
            PTO classification token: {policy.rule}-{policy.code}-{policy.name}. Final-pay token:
            terminated={s.finalPaycheckTerminated}; resigned={s.finalPaycheckResigned}. Nearby
            rule trail: {nearbyTrail}.
          </p>
          <p>
            Nearby comparison detail: {nearbyComparison}.
          </p>
          <p>
            Regional comparison trail: {regionalComparison}.
          </p>
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
