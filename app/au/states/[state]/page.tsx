import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { AU_STATES, getAuState } from "@/data/auStates";
import { EDITORIAL_REVIEW, FOUNDER_PERSON, SITE, clampMetaDescription, jsonLd, faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/types";

type Props = { params: Promise<{ state: string }> };

export async function generateStaticParams() {
  return AU_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const s = getAuState(slug);
  if (!s) return {};

  const title = `${s.name} Employment Law 2026`;
  const description = `${s.name} employment law: national minimum wage ${s.nationalMinWage.split(" (")[0]}, long service leave ${s.lslEntitlementWeeks} weeks after ${s.lslQualifyingYears} years under the ${s.lslLegislation}. Workers compensation via ${s.workersCompAuthority}.`;
  const url = `${SITE.url}/au/states/${s.slug}`;

  return {
    title,
    description: clampMetaDescription(description),
    alternates: { canonical: url },
    openGraph: { title, description: clampMetaDescription(description), url },
  };
}

function generateFaqs(s: AuStateData): FaqItem[] {
  return [
    {
      question: `What is the minimum wage in ${s.name} in 2026?`,
      answer: `The national minimum wage in ${s.name} is $24.10 per hour (effective 1 July 2025, following the Fair Work Commission's Annual Wage Review 2025-26). ${s.hasStateIrSystem ? `Note: ${s.name} also has a state industrial relations system for non-constitutional corporations. The ${s.stateMinWage ?? "WA state minimum wage"} may apply to state system employees — check with the WA Industrial Relations Commission for your situation.` : "The national minimum wage is set by the Fair Work Commission and applies across all sectors covered by the national system in " + s.name + "."}`,
    },
    {
      question: `How much long service leave am I entitled to in ${s.name}?`,
      answer: `In ${s.name}, employees are entitled to long service leave under the ${s.lslLegislation}. You qualify after ${s.lslQualifyingYears} years of continuous service with the same employer and receive ${s.lslEntitlementWeeks} weeks of paid leave. ${s.lslProRataOnTermination ? `Pro-rata entitlement: ${s.lslProRataOnTermination}.` : ""}`,
    },
    {
      question: `Who is covered by the Fair Work Act in ${s.name}?`,
      answer: `Most private sector employees in ${s.name} are covered by the Fair Work Act 2009 (Cth) — referred to as "national system employees." This includes employees of constitutional corporations, the Commonwealth, and territory employers. ${s.hasStateIrSystem ? `${s.name} is unique in that it also has a state industrial relations system (under the Industrial Relations Act 1979 (WA)) that covers employees of non-constitutional corporations (such as sole traders, partnerships, and non-corporate trusts) operating in WA.` : `State and local government employees in ${s.name} are covered by state public sector employment laws rather than the Fair Work Act.`}`,
    },
    {
      question: `How do I claim workers compensation in ${s.name}?`,
      answer: `Workers compensation in ${s.name} is administered by ${s.workersCompAuthority} (${s.workersCompUrl}). If you are injured at work, you must notify your employer as soon as possible, seek medical treatment and obtain a medical certificate, and lodge a workers compensation claim with your employer's insurer. Most employers are required by law to hold workers compensation insurance. Claims cover medical expenses, rehabilitation, and income replacement while you cannot work.`,
    },
    {
      question: `What are the maximum working hours in ${s.name}?`,
      answer: `Under the Fair Work Act 2009 (NES), full-time employees in ${s.name} have a maximum of 38 ordinary hours per week. An employer can request reasonable additional hours, but employees can refuse unreasonable requests. What counts as "reasonable" depends on factors like health and safety, personal circumstances, the nature of the role, and usual working patterns in the industry. Modern awards and enterprise agreements may also set daily and weekly maximum hours relevant to your specific occupation.`,
    },
  ];
}

import type { AuStateData } from "@/data/auStates";

export default async function Page({ params }: Props) {
  const { state: slug } = await params;
  const s = getAuState(slug);
  if (!s) notFound();

  const url = `${SITE.url}/au/states/${s.slug}`;
  const faqs = generateFaqs(s);
  const reviewedDate = `${s.verifiedYear}-01-01`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Australia", item: `${SITE.url}/au` },
      { "@type": "ListItem", position: 3, name: s.name, item: url },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${s.name} Employment Law 2026`,
    url,
    description: `Employment law facts for ${s.name}: minimum wage, long service leave, workers compensation.`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    areaServed: { "@type": "State", name: s.name, containedInPlace: { "@type": "Country", name: "Australia" } },
    dateModified: reviewedDate,
    author: FOUNDER_PERSON,
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/au" className="hover:text-ink-soft">🇦🇺 Australia</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-soft">{s.name}</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">
            Australia · {s.code} · Employment Law 2026
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {s.name} employment law
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Minimum wage, long service leave entitlements, workers compensation, and key employment
            rights for workers in {s.name}.
          </p>
        </div>

        <EditorialReview
          lastReviewed={reviewedDate}
          sourceLabel={s.lslLegislation}
          className="mb-8"
        />

        {/* Key stats grid */}
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-ink">Key employment figures</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-surface-line bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">National minimum wage</p>
              <p className="font-bold text-ink text-lg">$24.10/hr</p>
              <p className="text-xs text-ink-faint mt-1">From 1 July 2025</p>
            </div>
            <div className="rounded-xl border border-surface-line bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">Long service leave</p>
              <p className="font-bold text-ink text-lg">{s.lslEntitlementWeeks} weeks</p>
              <p className="text-xs text-ink-faint mt-1">After {s.lslQualifyingYears} years</p>
            </div>
            <div className="rounded-xl border border-surface-line bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">Workers comp</p>
              <p className="font-bold text-ink">{s.workersCompAuthority}</p>
            </div>
          </div>
        </section>

        {/* WA state system callout */}
        {s.hasStateIrSystem && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-semibold text-amber-900 mb-1">WA has two industrial relations systems</p>
            <p className="text-sm text-amber-800">
              Most private sector workers in WA are covered by the federal Fair Work Act system.
              However, employees of non-constitutional corporations (sole traders, partnerships, non-corporate
              trusts) are covered by the <strong>WA state system</strong> under the Industrial Relations Act
              1979 (WA). The WA state minimum wage is{" "}
              <strong>{s.stateMinWage?.split(" (")[0]}</strong> — higher than the national rate.
            </p>
          </div>
        )}

        {/* Long service leave detail */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-ink">Long service leave in {s.name}</h2>
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-5 mb-4">
            <p className="text-sm font-semibold text-brand-700 mb-1">{s.lslLegislation}</p>
            <p className="text-ink-soft text-sm">{s.lslSummary}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-surface-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">Qualifying period</p>
              <p className="font-bold text-ink">{s.lslQualifyingYears} years continuous service</p>
            </div>
            <div className="rounded-xl border border-surface-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-1">Pro-rata on termination</p>
              <p className="text-sm text-ink">{s.lslProRataOnTermination}</p>
            </div>
          </div>
        </section>

        {/* Tools CTA */}
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-ink">Calculate your entitlements</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/au-redundancy-pay-calculator"
              className="group rounded-xl border border-surface-line p-4 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <p className="font-semibold text-ink group-hover:text-brand-700">Redundancy pay calculator →</p>
              <p className="mt-1 text-sm text-ink-soft">Calculate your NES redundancy entitlement under Fair Work Act s.119.</p>
            </Link>
            <Link
              href="/au-notice-period-calculator"
              className="group rounded-xl border border-surface-line p-4 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <p className="font-semibold text-ink group-hover:text-brand-700">Notice period calculator →</p>
              <p className="mt-1 text-sm text-ink-soft">Calculate your minimum notice under Fair Work Act s.117.</p>
            </Link>
            <Link
              href="/au-annual-leave-calculator"
              className="group rounded-xl border border-surface-line p-4 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <p className="font-semibold text-ink group-hover:text-brand-700">Annual leave calculator →</p>
              <p className="mt-1 text-sm text-ink-soft">Accrue and payout annual leave under the NES.</p>
            </Link>
            <a
              href={s.workersCompUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-surface-line p-4 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <p className="font-semibold text-ink group-hover:text-brand-700">{s.workersCompAuthority} →</p>
              <p className="mt-1 text-sm text-ink-soft">Lodge a workers compensation claim in {s.name}.</p>
            </a>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-ink">Frequently asked questions — {s.name}</h2>
          <div className="flex flex-col divide-y divide-surface-line rounded-xl border border-surface-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-5 py-4">
                <summary className="cursor-pointer list-none text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-180" aria-hidden="true">↓</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="border-t border-surface-line pt-6 text-xs text-ink-faint">
          <p>
            Data verified {s.verifiedYear}. National minimum wage from{" "}
            <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              Fair Work Commission Annual Wage Review 2025-26
            </a>. Long service leave from the {s.lslLegislation}. Employment law changes frequently —
            verify with the{" "}
            <a href={s.employmentAuthorityUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              Fair Work Ombudsman
            </a>{" "}
            before acting.
          </p>
          <p className="mt-2">
            <Link href="/au" className="text-brand-600 hover:underline">← Back to Australia employment calculators</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
