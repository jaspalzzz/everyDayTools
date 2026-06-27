import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { US_STATES, getUsState, type UsStateWithPto } from "@/data/usStates";
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

  const title = `${s.name} PTO Payout Law & Final Paycheck Rules 2026`;
  const description = `${s.name} PTO payout law: accrued vacation ${s.pto.rule === "required" ? "must be paid" : s.pto.rule === "conditional" ? "may be paid depending on your employer policy" : "is not required to be paid"} at termination. Final paycheck due ${s.finalPaycheckTerminated.toLowerCase()}. Minimum wage ${s.minimumWage}.`;
  const url = `${SITE.url}/us/states/${s.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
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

function generateFaqs(s: UsStateWithPto): FaqItem[] {
  const ruleLabel = {
    required:
      `Yes. ${s.name} treats accrued vacation as earned wages that cannot be forfeited. Your employer must pay out all unused accrued PTO when you leave — regardless of the reason for separation. Use-it-or-lose-it policies are prohibited. ${s.pto.note}`,
    conditional:
      `It depends on your employer's written policy. ${s.name} has no blanket state law requiring PTO payout, but if your employer's policy or employment contract provides for it, the payout is enforceable as wages. ${s.pto.note}`,
    "no-requirement":
      `No. ${s.name} has no state law requiring employers to pay out accrued vacation when you leave. The payout is entirely governed by your employer's written PTO policy and any contractual terms. ${s.pto.note}`,
  }[s.pto.rule];

  const faqs: FaqItem[] = [
    {
      question: `Is PTO payout required by law in ${s.name}?`,
      answer: ruleLabel,
    },
    {
      question: `How long does my employer have to pay my final paycheck in ${s.name}?`,
      answer:
        `In ${s.name}, the deadlines differ based on how your employment ended. If you were terminated by your employer, your final paycheck is due ${s.finalPaycheckTerminated.toLowerCase()}. If you resigned voluntarily, the deadline is ${s.finalPaycheckResigned.toLowerCase()}. If your employer misses these deadlines, you can file a wage claim with the ${s.name} Department of Labor.`,
    },
    {
      question: `What is the minimum wage in ${s.name} in 2025?`,
      answer:
        `The current minimum wage in ${s.name} is ${s.minimumWage}.${s.minimumWageNote ? ` ${s.minimumWageNote}` : ""} Some cities and counties within ${s.name} may have a higher local minimum wage. Check with the ${s.name} Department of Labor for the most current rate.`,
    },
    {
      question: `What can I do if my employer doesn't pay my final paycheck on time in ${s.name}?`,
      answer:
        `If your employer fails to pay your final wages by the legal deadline, you can file a wage claim with the ${s.name} labor enforcement agency. You may be entitled to the unpaid wages plus penalties or interest depending on state law. You can also file a civil lawsuit or contact the federal Department of Labor Wage and Hour Division if your employer is covered by federal law. Document all communications and keep records of your hours worked and pay stubs.`,
    },
    {
      question: `Does ${s.name} require employers to include accrued sick leave in the final paycheck?`,
      answer:
        `In most cases, no. PTO payout rules in ${s.name} apply primarily to accrued vacation or PTO. Sick leave is typically treated separately — unless your employer has a combined PTO bank or the sick leave has vested as wages under your employment agreement. Check your offer letter and employee handbook for the specific terms of your employer's sick leave policy.`,
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
