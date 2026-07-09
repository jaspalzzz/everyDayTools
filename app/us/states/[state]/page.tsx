import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { US_STATES, getUsState, getNearbyStates, type UsStateWithPto } from "@/data/usStates";
import { pickVariant } from "@/lib/textVariants";
import { EDITORIAL_REVIEW, SITE, clampMetaDescription, jsonLd, faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

type Props = { params: Promise<{ state: string }> };

export async function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) return {};

  const title = `${s.name} PTO Payout Law & Final Paycheck Rules 2026`;
  const description = `${s.name} PTO payout law: accrued vacation ${s.pto.rule === "required" ? "must be paid" : s.pto.rule === "conditional" ? "may be paid depending on your employer policy" : "is not required to be paid"} at termination. Final paycheck due ${s.finalPaycheckTerminated.toLowerCase()}. Minimum wage ${s.minimumWage}.`;
  const url = `${SITE.url}/us/states/${s.slug}`;

  return {
    title,
    description: clampMetaDescription(description),
    alternates: { canonical: url },
    openGraph: { title, description: clampMetaDescription(description), url },
  };
}

const RULE_CONFIG = {
  required: {
    label: "Payout required by law",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500",
  },
  conditional: {
    label: "Depends on employer policy",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  "no-requirement": {
    label: "No state payout requirement",
    badge: "bg-surface-muted text-ink-soft border-surface-line",
    dot: "bg-ink-faint",
  },
} as const;

const PTO_RULE_ANSWERS = {
  required: [
    (name: string, note: string) => `Yes. ${name} treats accrued vacation as earned wages that cannot be forfeited. Your employer must pay out all unused accrued PTO when you leave — regardless of the reason for separation. Use-it-or-lose-it policies are prohibited. ${note}`,
    (name: string, note: string) => `Yes — and ${name} is firm about it. Accrued vacation counts as wages you've already earned, so it can't be taken away by a use-it-or-lose-it policy, and your employer owes you the full unused balance on separation no matter why you left. ${note}`,
    (name: string, note: string) => `Yes, by law. Once vacation time accrues in ${name}, it's treated the same as any other earned wage — your employer can't wipe it out with a use-it-or-lose-it clause, and the full unused balance is due regardless of who initiated the separation. ${note}`,
  ],
  conditional: [
    (name: string, note: string) => `It depends on your employer's written policy. ${name} has no blanket state law requiring PTO payout, but if your employer's policy or employment contract provides for it, the payout is enforceable as wages. ${note}`,
    (name: string, note: string) => `That comes down to what your employer's handbook or contract actually says. ${name} doesn't impose a blanket payout requirement by statute, but once a policy or agreement promises it, that promise becomes an enforceable wage obligation. ${note}`,
    (name: string, note: string) => `There's no automatic statewide rule in ${name} — it hinges on your employer's own policy. But if that policy or your contract promises a payout, ${name} law will treat the broken promise as unpaid wages. ${note}`,
  ],
  "no-requirement": [
    (name: string, note: string) => `No. ${name} has no state law requiring employers to pay out accrued vacation when you leave. The payout is entirely governed by your employer's written PTO policy and any contractual terms. ${note}`,
    (name: string, note: string) => `No — there's no ${name} statute forcing a payout. Whether you see that unused balance on your final paycheck comes down entirely to your employer's own written PTO policy or your employment contract, not state law. ${note}`,
    (name: string, note: string) => `${name} law is silent on this: no statute obligates your employer to cash out unused vacation at separation. What you're owed, if anything, is set by whatever policy or contract your employer put in writing. ${note}`,
    (name: string, note: string) => `Not by state mandate. ${name} leaves PTO payout entirely up to the employer — there's no law forcing a cash-out of unused vacation when employment ends, so check your handbook. ${note}`,
    (name: string, note: string) => `No state requirement exists in ${name}. Employers here are free to set their own use-it-or-lose-it or payout policy, and that written policy — not a statute — determines what you're owed. ${note}`,
    (name: string, note: string) => `${name} doesn't require it. Unlike states with mandatory payout laws, whether your unused vacation gets cashed out here depends solely on what your employer agreed to in writing. ${note}`,
  ],
} as const;

const FINAL_PAYCHECK_ANSWERS = [
  (s: UsStateWithPto) =>
    `In ${s.name}, the deadlines differ based on how your employment ended. If you were terminated by your employer, your final paycheck is due ${s.finalPaycheckTerminated.toLowerCase()}. If you resigned voluntarily, the deadline is ${s.finalPaycheckResigned.toLowerCase()}. If your employer misses these deadlines, you can file a wage claim with the ${s.name} Department of Labor.`,
  (s: UsStateWithPto) =>
    `${s.name} sets separate deadlines depending on why you left. A termination means your final paycheck is due ${s.finalPaycheckTerminated.toLowerCase()}, while a resignation gives your employer until ${s.finalPaycheckResigned.toLowerCase()}. Missing either deadline is grounds for a wage claim with the ${s.name} Department of Labor.`,
  (s: UsStateWithPto) =>
    `How fast you're paid in ${s.name} depends on how the job ended: ${s.finalPaycheckTerminated.toLowerCase()} if you were let go, or ${s.finalPaycheckResigned.toLowerCase()} if you quit. An employer that blows past either deadline can be reported to the ${s.name} Department of Labor.`,
  (s: UsStateWithPto) =>
    `${s.name} draws a line between firings and resignations for final-pay timing. Fired employees must be paid ${s.finalPaycheckTerminated.toLowerCase()}; those who resign are owed their pay ${s.finalPaycheckResigned.toLowerCase()}. A wage claim with the ${s.name} Department of Labor is the remedy if either deadline slips.`,
  (s: UsStateWithPto) =>
    `The clock starts differently in ${s.name} depending on the circumstances: ${s.finalPaycheckTerminated.toLowerCase()} after a termination, ${s.finalPaycheckResigned.toLowerCase()} after a resignation. Employers who miss it can be reported to the ${s.name} Department of Labor.`,
] as const;

const MIN_WAGE_ANSWERS = [
  (s: UsStateWithPto) =>
    `The current minimum wage in ${s.name} is ${s.minimumWage}.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} Some cities and counties within ${s.name} may have a higher local minimum wage. Check with the ${s.name} Department of Labor for the most current rate.`,
  (s: UsStateWithPto) =>
    `As of 2026, ${s.name}'s minimum wage sits at ${s.minimumWage}.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} Local ordinances in some ${s.name} cities or counties can set a higher floor, so it's worth checking with the ${s.name} Department of Labor for the exact rate that applies where you work.`,
  (s: UsStateWithPto) =>
    `${s.name}'s minimum wage is currently ${s.minimumWage}.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} That's the statewide floor — a handful of localities within ${s.name} set their own higher minimum, so confirm the current figure with the ${s.name} Department of Labor.`,
  (s: UsStateWithPto) =>
    `Right now, ${s.name} sets its minimum wage at ${s.minimumWage}.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} A few ${s.name} cities or counties may require more, so verify the rate for your specific location with the ${s.name} Department of Labor.`,
  (s: UsStateWithPto) =>
    `${s.name} pegs its statewide minimum wage at ${s.minimumWage}.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} Local governments in ${s.name} can set a higher rate, so double-check against the ${s.name} Department of Labor before assuming the statewide figure applies to you.`,
] as const;

const WHAT_TO_DO_ANSWERS = [
  (name: string) =>
    `If your employer fails to pay your final wages by the legal deadline, you can file a wage claim with the ${name} labor enforcement agency. You may be entitled to the unpaid wages plus penalties or interest depending on state law. You can also file a civil lawsuit or contact the federal Department of Labor Wage and Hour Division if your employer is covered by federal law. Document all communications and keep records of your hours worked and pay stubs.`,
  (name: string) =>
    `A late or missing final paycheck in ${name} is grounds for a formal wage claim with the state's labor enforcement agency, and depending on the circumstances you may recover penalties or interest on top of the unpaid wages. A civil suit or a complaint to the federal Wage and Hour Division are also options if federal law covers your employer. Keep pay stubs, timesheets, and any written communication as evidence.`,
  (name: string) =>
    `Start by filing a wage claim with ${name}'s labor enforcement agency if your final paycheck is late — state law may entitle you to the unpaid wages plus penalties or interest. Federally covered employers can also be reported to the U.S. Department of Labor's Wage and Hour Division, or you can pursue a civil claim. Keep a paper trail: hours worked, pay stubs, and any messages with your employer.`,
  (name: string) =>
    `You have options if your final paycheck is late in ${name}: a wage claim with the state's labor enforcement agency, a complaint to the federal Wage and Hour Division for employers covered by federal law, or a private civil lawsuit. Compensation can include the unpaid wages plus penalties or interest. Save your pay stubs, hours records, and correspondence in case you need them.`,
  (name: string) =>
    `${name} gives you several ways to chase down a late final paycheck — a state wage claim, a federal complaint to the Department of Labor's Wage and Hour Division, or a civil suit. You may recover the wages owed plus penalties or interest. Hold onto pay stubs, time records, and any written exchanges with your employer as proof.`,
] as const;

const SICK_LEAVE_ANSWERS = [
  (name: string) =>
    `In most cases, no. PTO payout rules in ${name} apply primarily to accrued vacation or PTO. Sick leave is typically treated separately — unless your employer has a combined PTO bank or the sick leave has vested as wages under your employment agreement. Check your offer letter and employee handbook for the specific terms of your employer's sick leave policy.`,
  (name: string) =>
    `Generally not. ${name}'s PTO payout rules are aimed at vacation time, not sick leave — those stay separate unless your employer runs a combined PTO bank or your contract explicitly vests sick time as wages. Your offer letter or handbook will spell out which policy applies.`,
  (name: string) =>
    `Usually no — sick leave and vacation are treated as different buckets under ${name} PTO rules, unless your employer merges them into one combined PTO bank or your employment agreement says sick time vests as wages. Review your handbook to see which setup you have.`,
  (name: string) =>
    `Not typically. ${name}'s PTO payout requirements center on vacation time, and sick leave is its own category unless your employer combines them into a single PTO bank or your agreement vests sick time as earned wages. Your handbook or offer letter will settle which rule applies to you.`,
  (name: string) =>
    `As a rule, no — ${name} treats sick leave separately from vacation for payout purposes, unless your employer's PTO bank blends the two or your contract vests sick time as wages. Check your employee handbook to confirm how your employer structures it.`,
] as const;

function generateFaqs(s: UsStateWithPto): FaqItem[] {
  const variants = PTO_RULE_ANSWERS[s.pto.rule];
  const ruleLabel = pickVariant(s.slug + "-ptorule", variants)(s.name, s.pto.note);

  const faqs: FaqItem[] = [
    {
      question: `Is PTO payout required by law in ${s.name}?`,
      answer: ruleLabel,
    },
    {
      question: `How long does my employer have to pay my final paycheck in ${s.name}?`,
      answer: pickVariant(s.slug + "-finalpaycheck", FINAL_PAYCHECK_ANSWERS)(s),
    },
    {
      question: `What is the minimum wage in ${s.name} in 2025?`,
      answer: pickVariant(s.slug + "-minwage", MIN_WAGE_ANSWERS)(s),
    },
    {
      question: `What can I do if my employer doesn't pay my final paycheck on time in ${s.name}?`,
      answer: pickVariant(s.slug + "-whattodo", WHAT_TO_DO_ANSWERS)(s.name),
    },
    {
      question: `Does ${s.name} require employers to include accrued sick leave in the final paycheck?`,
      answer: pickVariant(s.slug + "-sickleave", SICK_LEAVE_ANSWERS)(s.name),
    },
  ];

  return faqs;
}

export default async function StatePage({ params }: Props) {
  const { state: slug } = await params;
  const s = getUsState(slug);
  if (!s) notFound();

  const url = `${SITE.url}/us/states/${s.slug}`;
  const rule = RULE_CONFIG[s.pto.rule];
  const faqs = generateFaqs(s);
  const reviewedDate = s.lastContentUpdate ?? `${s.verifiedYear}-01-01`;
  const nearbyStates = getNearbyStates(s.slug);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "US", item: `${SITE.url}/us` },
      { "@type": "ListItem", position: 3, name: s.name, item: url },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${s.name} PTO Payout Law & Final Paycheck Rules 2026`,
    url,
    description: `${s.name} employment pay rights: PTO payout law, final paycheck deadlines, and minimum wage.`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    about: {
      "@type": "Thing",
      name: `${s.name} employment law`,
    },
    areaServed: { "@type": "State", name: s.name },
    dateModified: reviewedDate,
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

      <div className="mx-auto max-w-content px-5 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/us" className="hover:text-ink-soft">🇺🇸 US</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-soft">{s.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            United States · {s.name} · Employment Pay Rights 2026
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {s.name} PTO payout law &amp; pay rights
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Everything you need to know about {s.name}&apos;s PTO payout rules, final paycheck
            deadlines, and minimum wage — accurate to 2025 state legislation.
          </p>
        </div>

        <EditorialReview
          lastReviewed={reviewedDate}
          sourceLabel={`${s.name} labor and wage official sources`}
          className="mb-8"
        />

        {/* PTO rule card */}
        <section aria-labelledby="pto-rule-heading" className="mb-8">
          <h2 id="pto-rule-heading" className="mb-3 text-sm font-semibold text-ink">
            PTO payout rule
          </h2>
          <div className={`flex items-start gap-3 rounded-xl border px-5 py-4 ${rule.badge}`}>
            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${rule.dot}`} aria-hidden="true" />
            <div>
              <p className="font-semibold">{rule.label}</p>
              <p className="mt-1 text-sm leading-relaxed">{s.pto.note}</p>
            </div>
          </div>
        </section>

        {/* Key stats grid */}
        <section aria-labelledby="key-stats-heading" className="mb-8">
          <h2 id="key-stats-heading" className="mb-3 text-sm font-semibold text-ink">
            Key employment figures
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Minimum wage (2025)"
              value={s.minimumWage}
              note={s.minimumWageNote}
            />
            <StatCard
              label="Final paycheck (if fired)"
              value={s.finalPaycheckTerminated}
            />
            <StatCard
              label="Final paycheck (if resigned)"
              value={s.finalPaycheckResigned}
            />
          </div>
        </section>

        {/* State-specific legal context (only where genuinely distinct) */}
        {s.localContext && (
          <section aria-labelledby="local-context-heading" className="mb-10">
            <h2 id="local-context-heading" className="mb-3 text-sm font-semibold text-ink">
              What makes {s.name} different
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">{s.localContext}</p>
          </section>
        )}

        {/* Calculator CTA */}
        <section aria-labelledby="calc-heading" className="mb-10">
          <h2 id="calc-heading" className="mb-3 text-sm font-semibold text-ink">
            Calculate your entitlements
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <CtaCard
              href="/pto-payout-calculator"
              title="PTO payout calculator"
              description={`Calculate the value of your unused vacation pay in ${s.name} — ${s.pto.rule === "required" ? "required by state law" : s.pto.rule === "conditional" ? "check your policy" : "policy-dependent"}.`}
              icon="💰"
            />
            <CtaCard
              href="/final-paycheck-deadline-calculator"
              title="Final paycheck deadline calculator"
              description={`Find the exact legal deadline for your final paycheck in ${s.name} based on how your employment ended.`}
              icon="📅"
            />
          </div>
        </section>

        {/* Sub-page deep dives */}
        <section className="mb-10">
          <h2 className="mb-3 text-sm font-semibold text-ink">Deep dives</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={`/us/states/${s.slug}/final-paycheck`}
              className="group rounded-xl border border-surface-line p-4 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <p className="font-semibold text-ink group-hover:text-brand-700">
                {s.name} final paycheck law →
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Deadlines if fired or resigned, what must be included, and penalties.
              </p>
            </Link>
            <Link
              href={`/us/states/${s.slug}/minimum-wage`}
              className="group rounded-xl border border-surface-line p-4 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <p className="font-semibold text-ink group-hover:text-brand-700">
                {s.name} minimum wage →
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Current rate, tipped employee rules, and how to report violations.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section aria-labelledby="faq-heading" className="mb-10">
          <h2 id="faq-heading" className="mb-5 text-base font-semibold text-ink">
            Frequently asked questions — {s.name}
          </h2>
          <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-5 py-4">
                <summary className="cursor-pointer list-none text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-180" aria-hidden="true">
                      ↓
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Nearby states */}
        {nearbyStates.length > 0 && (
          <section aria-labelledby="nearby-states-heading" className="mb-10">
            <h2 id="nearby-states-heading" className="mb-3 text-sm font-semibold text-ink">
              Compare nearby states
            </h2>
            <p className="mb-3 text-sm text-ink-soft">
              Other {s.region} states — minimum wage and final paycheck rules vary by state, so
              check the specific rule where you work.
            </p>
            <div className="flex flex-wrap gap-2">
              {nearbyStates.map((n) => (
                <Link
                  key={n.slug}
                  href={`/us/states/${n.slug}`}
                  className="rounded-full border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand-600 hover:text-brand-700"
                >
                  {n.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Source + DOL link */}
        <footer className="border-t border-surface-line pt-6 text-xs text-ink-faint">
          <p>
            Data verified {s.verifiedYear} from{" "}
            <a
              href="https://www.dol.gov/agencies/whd/state/contacts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline-offset-2 hover:underline"
            >
              U.S. Department of Labor — State Labor Offices
            </a>{" "}
            and the{" "}
            <a
              href={s.dolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline-offset-2 hover:underline"
            >
              {s.name} Department of Labor
            </a>
            . Employment law changes frequently — verify current requirements with your state
            agency or a licensed employment attorney before acting.
          </p>
          <p className="mt-2">
            <Link href="/us" className="text-brand-600 underline-offset-2 hover:underline">
              ← Back to all US calculators
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-surface-line bg-surface-muted px-4 py-3">
      <p className="text-xs text-ink-faint">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-snug text-ink">{value}</p>
      {note && <p className="mt-1 text-xs leading-snug text-ink-faint">{note}</p>}
    </div>
  );
}

function CtaCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 px-4 py-4 transition-colors hover:bg-brand-100/40"
    >
      <span className="text-xl" aria-hidden="true">{icon}</span>
      <span>
        <span className="block text-sm font-medium text-ink">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-ink-soft">{description}</span>
      </span>
    </Link>
  );
}
