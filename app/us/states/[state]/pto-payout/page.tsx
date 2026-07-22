import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { US_STATES, getUsState, type UsStateWithPto } from "@/data/usStates";
import { clusterRank, pickVariantByPosition } from "@/lib/textVariants";
import { statePageRobots } from "@/lib/contentQuality";
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
    (s: UsStateWithPto) => `When vested vacation is missing from a final paycheck in ${s.name}, put the dispute in writing quickly. List the hours accrued, the final rate of pay, and the policy source before escalating through ${s.dolUrl}.`,
    (s: UsStateWithPto) => `For ${s.name}, the practical move is to make payroll confirm the accrued vacation balance and payment date. If they refuse, preserve the records and use the state wage-claim channel.`,
  ],
  conditional: [
    (s: UsStateWithPto) => `In ${s.name}, start with the written PTO policy, offer letter, handbook, and any separation agreement. If those documents promise payout or do not clearly allow forfeiture, you may still have a wage claim.`,
    (s: UsStateWithPto) => `For ${s.name} workers, the first document to read is the employer's vacation policy. If it promises payout, or if the forfeiture language is unclear, preserve the policy and raise the issue with payroll in writing.`,
    (s: UsStateWithPto) => `In ${s.name}, a payout dispute is usually won or lost on the paperwork. Compare the handbook, offer letter, and final paystub, then contact ${s.dolUrl} if the employer ignores a promised cash-out.`,
    (s: UsStateWithPto) => `If your employer says no payout is owed in ${s.name}, ask for the exact policy clause they are relying on. A vague or late-disclosed forfeiture rule may leave room for a wage claim.`,
    (s: UsStateWithPto) => `When ${s.name} policy language points toward payout, send a concise written demand with the accrued hours, final rate, and last day worked before escalating to the state labor agency.`,
  ],
  "no-requirement": [
    (s: UsStateWithPto) => `In ${s.name}, the strongest claim usually comes from the employer's own written policy. Save the handbook and paystub showing accrued PTO, then compare the policy language with your final paycheck.`,
    (s: UsStateWithPto) => `Because ${s.name} has no default payout mandate, focus on proof that the company promised a cash-out. Keep the handbook, PTO balance, and any messages from HR or payroll.`,
    (s: UsStateWithPto) => `For ${s.name} employees, a missing payout is usually a policy-enforcement question. If the handbook says unused vacation is paid, ask payroll to apply that policy to the final check.`,
    (s: UsStateWithPto) => `Do not rely on a general state-law payout right in ${s.name}. Instead, collect the written PTO terms and check whether the employer followed its own final-pay process.`,
    (s: UsStateWithPto) => `If the employer's policy in ${s.name} promises payout, the issue can still matter even without a state mandate. Document the promise, the accrued balance, and the final paycheck amount.`,
    (s: UsStateWithPto) => `A PTO claim in ${s.name} needs company-specific evidence: policy text, accrual records, and any payroll confirmation that unused vacation would be paid.`,
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
    (name: string) => `An employer in ${name} may be able to limit future accrual, but a policy that wipes out earned vacation at the end of employment is a different and riskier question.`,
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
  (name: string) => `For a payout estimate in ${name}, multiply the unused hours on your PTO ledger by your final regular hourly rate. Salaried workers can convert annual salary into an hourly or daily rate first.`,
  (name: string) => `Use the same basic math in ${name}: unused vacation hours times the final pay rate. The result is a gross wage figure before federal, state, and payroll withholding.`,
  (name: string) => `To estimate unpaid PTO in ${name}, start with the accrued balance shown on your paystub or HR portal, then multiply by your final hourly equivalent.`,
  (name: string) => `A practical ${name} estimate is accrued unused PTO x final hourly rate. If your employer tracks days instead of hours, convert the days into work hours before multiplying.`,
  (name: string) => `For ${name}, calculate the gross amount by converting the PTO balance into hours and multiplying by the final regular rate. Taxes and deductions come after that gross figure.`,
  (name: string) => `For a final-pay dispute in ${name}, write down the PTO balance, the rate used by payroll, and the gross amount you expected before comparing it with the final check.`,
] as const;

const PRACTICE_INTRO_VARIANTS = [
  (name: string) => `PTO payout disputes in ${name} usually turn on three facts: whether vacation has already been earned, what the written PTO policy says about forfeiture, and whether the final paycheck included all wages due by the state deadline.`,
  (name: string) => `In ${name}, the practical analysis starts with the accrued balance, then moves to the handbook language, and finally to whether the final paycheck met the state timing rule.`,
  (name: string) => `Most ${name} vacation payout disputes come down to proof: the PTO ledger, the written policy, and the final paystub showing what was actually paid.`,
  (name: string) => `For ${name} workers, the important question is not just whether PTO exists, but whether it vested, whether forfeiture was clearly allowed, and whether payroll handled it on time.`,
  (name: string) => `A PTO claim in ${name} is strongest when the records line up: accrued time, a policy promising payout, and a final paycheck that left the balance out.`,
  (name: string) => `When reviewing a PTO payout in ${name}, separate the issue into accrual, policy, and payment timing. Each one needs its own document trail.`,
  (name: string) => `The cleanest way to review a payout issue in ${name} is to match three documents: the PTO balance, the written policy, and the final wage statement.`,
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
  (s: UsStateWithPto) => `For a PTO dispute in ${s.name}, collect the policy and payroll records first, then use ${s.dolUrl} to find the state complaint process or contact point.`,
  (s: UsStateWithPto) => `Before filing in ${s.name}, organize the handbook, PTO ledger, and final paystub. The official agency starting point is ${s.dolUrl}.`,
] as const;

function pickPtoVariant<T>(position: number, variants: readonly [T, ...T[]], offset = 0): T {
  const adjusted = position + offset;
  return pickVariantByPosition(adjusted + (Math.floor(adjusted / variants.length) * 4), variants);
}

function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function sentenceVerb(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

function getPtoComparisonStates(s: UsStateWithPto, limit = 8): UsStateWithPto[] {
  const regionStates = US_STATES.filter((state) => state.region === s.region).sort((a, b) => a.name.localeCompare(b.name));
  const currentIndex = regionStates.findIndex((state) => state.slug === s.slug);
  if (currentIndex === -1) return [];

  const picked: UsStateWithPto[] = [];
  for (let distance = 1; picked.length < limit && distance < regionStates.length; distance += 1) {
    const candidates = [
      regionStates[(currentIndex + distance) % regionStates.length],
      regionStates[(currentIndex - distance + regionStates.length) % regionStates.length],
    ].filter((candidate): candidate is UsStateWithPto => Boolean(candidate));

    for (const candidate of candidates) {
      if (candidate.slug !== s.slug && !picked.some((state) => state.slug === candidate.slug)) {
        picked.push(candidate);
        if (picked.length === limit) break;
      }
    }
  }

  return picked;
}

const REGION_LABEL: Record<UsStateWithPto["region"], string> = {
  Northeast: "Northeast",
  Midwest: "Midwest",
  South: "South",
  West: "West",
};

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
    robots: statePageRobots(s),
  };
}

function ptoVariantContext(s: UsStateWithPto) {
  const ruleSlugs = US_STATES.filter((state) => state.pto.rule === s.pto.rule).map((state) => state.slug);
  const ruleRank = clusterRank(ruleSlugs, s.slug);
  const globalRank = clusterRank(US_STATES.map((state) => state.slug), s.slug);
  const blendedRank = globalRank + (ruleRank * 3);

  return {
    globalRank,
    ruleSummary: pickPtoVariant(blendedRank, RULE_SUMMARY_VARIANTS[s.pto.rule])(s.name),
    payoutAction: pickPtoVariant(blendedRank, PAYOUT_ACTION_VARIANTS[s.pto.rule], 2)(s),
    useItOrLoseItAnswer: pickPtoVariant(blendedRank, USE_IT_OR_LOSE_IT_ANSWERS[s.pto.rule], 4)(s.name),
    practiceIntro: pickPtoVariant(globalRank, PRACTICE_INTRO_VARIANTS, 1)(s.name),
    estimateCopy: pickPtoVariant(globalRank, ESTIMATE_COPY_VARIANTS, 3)(s.name),
  };
}

const SAME_DEADLINE_TIMING_VARIANTS = [
  (s: UsStateWithPto) => `${s.name} uses the same stated final-pay deadline for firings and resignations, so the timing review is straightforward once you know whether unused PTO was actually owed.`,
  (s: UsStateWithPto) => `Because the firing and resignation deadlines match in ${s.name}, focus first on whether the PTO balance was payable, then compare the final check with that shared deadline.`,
  (s: UsStateWithPto) => `For ${s.name}, the separation type does not change the stated final-pay deadline. The harder question is usually whether the policy made unused vacation payable at all.`,
  (s: UsStateWithPto) => `${s.name}'s final-pay timing is symmetrical for fired and resigning workers, which makes the PTO dispute mainly a rule-and-records question.`,
  (s: UsStateWithPto) => `In ${s.name}, the same final-pay checkpoint applies on both sides of separation. Save the PTO ledger and final paystub so the owed amount can be checked against that date.`,
  (s: UsStateWithPto) => `When ${s.name} uses one deadline for both kinds of separation, late-payment analysis is simpler: confirm the PTO right, then confirm whether it appeared in the final wage payment.`,
  (s: UsStateWithPto) => `${s.name} does not create a different timing track for quitting versus being fired on this page's data, so the policy language and final wage statement carry more weight.`,
] as const;

const SPLIT_DEADLINE_TIMING_VARIANTS = [
  (s: UsStateWithPto) => `${s.name} separates the final-pay timing for firings and resignations, which makes the last-day record important when you compare the PTO balance with the final check.`,
  (s: UsStateWithPto) => `In ${s.name}, the final-pay deadline changes with the type of separation. Keep the termination notice or resignation message with the PTO records.`,
  (s: UsStateWithPto) => `For ${s.name}, identify whether the employer ended the job or the worker resigned before deciding which final-pay deadline controls the PTO cash-out.`,
  (s: UsStateWithPto) => `${s.name}'s timing rule is not one-size-fits-all, so the separation reason should be part of the wage-claim file.`,
] as const;

const FAST_TERMINATION_TIMING_VARIANTS = [
  (s: UsStateWithPto) => `${s.name} gives terminated workers a faster final-pay checkpoint than workers who resign, so document who initiated the separation before judging whether the PTO cash-out was late.`,
  (s: UsStateWithPto) => `A firing can trigger a tighter final-pay clock in ${s.name}. If PTO is owed, keep the termination date and final check date together.`,
  (s: UsStateWithPto) => `For ${s.name}, employer-initiated separations need extra timing attention because the final-pay deadline can arrive quickly after termination.`,
  (s: UsStateWithPto) => `${s.name}'s termination deadline is the pressure point for many PTO disputes. The resignation deadline may be different, so do not mix the two timelines.`,
] as const;

function timingProfile(s: UsStateWithPto, position: number): string {
  const firedDeadline = s.finalPaycheckTerminated.toLowerCase();
  const resignedDeadline = s.finalPaycheckResigned.toLowerCase();

  if (firedDeadline === resignedDeadline) {
    return pickPtoVariant(position, SAME_DEADLINE_TIMING_VARIANTS)(s);
  }

  if (firedDeadline.includes("immediately") || firedDeadline.includes("business day") || firedDeadline.includes("3")) {
    return pickPtoVariant(position, FAST_TERMINATION_TIMING_VARIANTS)(s);
  }

  return pickPtoVariant(position, SPLIT_DEADLINE_TIMING_VARIANTS)(s);
}

function regionalRuleSummary(s: UsStateWithPto, comparisonStates: UsStateWithPto[]): string {
  if (comparisonStates.length === 0) return "";

  const sameRule = comparisonStates.filter((state) => state.pto.rule === s.pto.rule);
  const differentRule = comparisonStates.filter((state) => state.pto.rule !== s.pto.rule);
  const comparisonNames = formatList(comparisonStates.map((state) => state.name));
  const sameRuleNames = formatList(sameRule.map((state) => state.name));
  const differentRuleNames = formatList(differentRule.map((state) => state.name));

  if (sameRule.length === comparisonStates.length) {
    return `${s.name}'s regional comparison set is ${comparisonNames}. Each listed state uses the same broad PTO payout category, so the useful distinction is the final-pay deadline rather than the payout rule label.`;
  }

  if (sameRule.length === 0) {
    return `${s.name}'s regional comparison set is ${comparisonNames}. ${differentRuleNames} ${sentenceVerb(differentRule.length, "uses", "use")} a different PTO payout category, so workers crossing state lines should not assume the same handbook language produces the same result.`;
  }

  return `${s.name}'s regional comparison set is ${comparisonNames}. ${sameRuleNames} ${sentenceVerb(sameRule.length, "matches", "match")} ${s.name}'s payout category, while ${differentRuleNames} ${sentenceVerb(differentRule.length, "uses", "use")} a different category.`;
}

function rotateItems<T>(items: T[], position: number): T[] {
  if (items.length === 0) return items;
  const start = position % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

function documentChecklist(s: UsStateWithPto, position: number): string[] {
  return rotateItems([
    `${s.name} final paystub showing whether unused PTO appeared as a wage line`,
    "Payroll or HR portal screenshot showing the accrued PTO balance",
    "Employee handbook section or written PTO policy covering payout and forfeiture",
    "Offer letter, contract, or separation agreement with vacation-pay terms",
    `Messages from payroll or HR explaining the ${s.name} payout decision`,
    `Last-day record showing whether the ${s.finalPaycheckTerminated.toLowerCase()} or ${s.finalPaycheckResigned.toLowerCase()} deadline applies`,
    `${s.name} agency URL or filing page: ${s.dolUrl}`,
  ], position);
}

function generateFaqs(s: UsStateWithPto): FaqItem[] {
  const stateName = s.name;
  const policy = s.pto;
  const variants = ptoVariantContext(s);
  const leadQuestion = {
    question: `Does ${stateName} require PTO payout when I leave?`,
    answer: `${variants.ruleSummary} ${policy.note}`,
  };
  const secondaryQuestions = rotateItems([
    {
      question: `When should unused PTO be paid in ${stateName}?`,
      answer: pickPtoVariant(variants.globalRank, TIMING_ANSWERS, 2)(s),
    },
    {
      question: `Can employers in ${stateName} use a "use it or lose it" policy?`,
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
  ], variants.globalRank);

  return [leadQuestion, ...secondaryQuestions];
}

export default async function Page({ params }: Props) {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) notFound();

  const url = `${SITE.url}/us/states/${s.slug}/pto-payout`;
  const reviewedDate = s.lastContentUpdate ?? `${s.verifiedYear}-01-01`;
  const comparisonStates = getPtoComparisonStates(s);
  const faqs = generateFaqs(s);
  const policy = s.pto;
  const variants = ptoVariantContext(s);
  const documentsToSave = documentChecklist(s, variants.globalRank);
  const sameRuleComparison = comparisonStates.filter((state) => state.pto.rule === s.pto.rule).length;
  const comparisonSummary = regionalRuleSummary(s, comparisonStates);
  const regionalPattern =
    comparisonStates.length === 0
      ? ""
      : sameRuleComparison === comparisonStates.length
        ? `all ${comparisonStates.length} of the ${REGION_LABEL[s.region]} comparison states listed below take the same approach, so the regional pattern is consistent`
        : sameRuleComparison === 0
          ? `none of the ${REGION_LABEL[s.region]} comparison states below follow the same approach, so regional rules differ sharply`
          : `${sameRuleComparison} of the ${comparisonStates.length} ${REGION_LABEL[s.region]} comparison states below ${sentenceVerb(sameRuleComparison, "shares", "share")} the same approach and the rest differ, so it is worth checking each state individually`;

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

<div className="mx-auto max-w-3xl overflow-x-hidden px-4 py-10 sm:px-6">
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
          className="mb-3"
        />
        <p className="mb-8 text-sm text-ink-faint">
          Data verified {s.verifiedYear} from the{" "}
          <a className="font-medium text-brand-600 hover:underline" href={s.dolUrl} rel="noopener noreferrer" target="_blank">
            {s.name} labor agency
          </a>.
        </p>

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
            {documentsToSave.map((item) => (
              <li key={item} className="list-disc">{item}</li>
            ))}
          </ul>

          <h2 className="mt-6 text-base font-semibold text-ink">State-specific checkpoints</h2>
          <p>
            In {s.name}, a final paycheck — including any PTO payout that is owed — is due{" "}
            {s.finalPaycheckTerminated.toLowerCase()} when the employer ends the job and{" "}
            {s.finalPaycheckResigned.toLowerCase()} when you resign. Confirm the current rule against the{" "}
            <a href={s.dolUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              {s.name} labor agency
            </a>{" "}
            before you file, since deadlines and payout rules can change between legislative sessions.
          </p>
          <p>{timingProfile(s, variants.globalRank)}</p>
          {regionalPattern && (
            <p>
              {s.name} sits in the U.S. Census {REGION_LABEL[s.region]} region, and {regionalPattern}.
            </p>
          )}
          {comparisonSummary && <p>{comparisonSummary}</p>}
        </section>

        {comparisonStates.length > 0 && (
          <section className="mb-10" aria-labelledby="comparison-heading">
            <h2 id="comparison-heading" className="mb-2 text-base font-semibold text-ink">
              How regional states handle PTO payout
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-ink-soft">
              How {s.name} compares with selected {REGION_LABEL[s.region]} states on unused vacation payout and final-pay timing.
              Follow a link for that state&apos;s full rules.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-line text-xs uppercase tracking-wide text-ink-faint">
                    <th scope="col" className="py-2 pr-4 font-semibold">State</th>
                    <th scope="col" className="py-2 pr-4 font-semibold">Rule detail</th>
                    <th scope="col" className="py-2 pr-4 font-semibold">If fired</th>
                    <th scope="col" className="py-2 font-semibold">If resigned</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-line bg-surface-muted/40">
                    <th scope="row" className="py-2 pr-4 font-semibold text-ink">{s.name} (this page)</th>
                    <td className="py-2 pr-4 text-ink-soft">
                      <p className="font-medium text-ink">{RULE_LABEL[s.pto.rule]}</p>
                      <p className="mt-1 text-xs leading-relaxed">{s.pto.note}</p>
                    </td>
                    <td className="py-2 pr-4 text-ink-soft">{s.finalPaycheckTerminated}</td>
                    <td className="py-2 text-ink-soft">{s.finalPaycheckResigned}</td>
                  </tr>
                  {comparisonStates.map((nearby) => (
                    <tr key={nearby.slug} className="border-b border-surface-line last:border-0">
                      <th scope="row" className="py-2 pr-4 font-medium">
                        <Link href={`/us/states/${nearby.slug}/pto-payout`} className="text-brand-600 hover:underline">
                          {nearby.name}
                        </Link>
                      </th>
                      <td className="py-2 pr-4 text-ink-soft">
                        <p className="font-medium text-ink">{RULE_LABEL[nearby.pto.rule]}</p>
                        <p className="mt-1 text-xs leading-relaxed">{nearby.pto.note}</p>
                      </td>
                      <td className="py-2 pr-4 text-ink-soft">{nearby.finalPaycheckTerminated}</td>
                      <td className="py-2 text-ink-soft">{nearby.finalPaycheckResigned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

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
      </div>
    </>
  );
}
