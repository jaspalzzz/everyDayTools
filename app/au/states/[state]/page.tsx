import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialReview } from "@/components/EditorialReview";
import { AU_STATES, getAuState, type AuStateData } from "@/data/auStates";
import { EDITORIAL_REVIEW, FOUNDER_PERSON, SITE, clampMetaDescription, jsonLd, faqSchema } from "@/lib/seo";
import { clusterRank, pickVariantByPosition } from "@/lib/textVariants";
import type { FaqItem } from "@/lib/types";

type Props = { params: Promise<{ state: string }> };

const AU_ALL_SLUGS = AU_STATES.map((s) => s.slug);

// Rank-based phrasing variants (arrays of different lengths so no two of the
// 8 states collide on every answer). The national minimum wage, Fair Work
// coverage and max-hours answers are otherwise identical across states.
const AU_MINWAGE = [
  (s: AuStateData) => `The national minimum wage in ${s.name} is $26.44 per hour, effective 1 July 2026 following the Fair Work Commission's Annual Wage Review 2026-27.`,
  (s: AuStateData) => `As of 1 July 2026, workers in ${s.name} on the national minimum wage earn $26.44 per hour — the rate set by the Fair Work Commission's 2026-27 review.`,
  (s: AuStateData) => `${s.name} follows the national minimum wage of $26.44/hour from 1 July 2026 (Fair Work Commission Annual Wage Review 2026-27).`,
  (s: AuStateData) => `In ${s.name}, the national minimum wage is $26.44 per hour from the first full pay period on or after 1 July 2026, per the Fair Work Commission.`,
  (s: AuStateData) => `The Fair Work Commission set the national minimum wage at $26.44/hour from 1 July 2026, and that rate applies to national-system employees in ${s.name}.`,
] as const;

const AU_COVERAGE = [
  (s: AuStateData) => `Most private sector employees in ${s.name} are covered by the Fair Work Act 2009 (Cth) — the "national system." This includes employees of constitutional corporations, the Commonwealth, and territory employers.`,
  (s: AuStateData) => `In ${s.name}, the Fair Work Act 2009 (Cth) covers most private sector workers as national-system employees, including those employed by constitutional corporations and the Commonwealth.`,
  (s: AuStateData) => `The national system under the Fair Work Act 2009 (Cth) covers the large majority of ${s.name} private sector employees — constitutional corporations, Commonwealth and territory employers included.`,
  (s: AuStateData) => `${s.name} workers in the private sector are, for the most part, national-system employees under the Fair Work Act 2009 (Cth), which reaches constitutional corporations and Commonwealth employers.`,
  (s: AuStateData) => `Coverage in ${s.name} runs mainly through the Fair Work Act 2009 (Cth): most private sector staff are national-system employees, as are Commonwealth and constitutional-corporation employees.`,
  (s: AuStateData) => `For ${s.name}, the Fair Work Act 2009 (Cth) is the primary source of coverage — most private employees fall under the national system, alongside Commonwealth and territory employers.`,
] as const;

const AU_COVERAGE_TAIL = (s: AuStateData) =>
  s.hasStateIrSystem
    ? ` ${s.name} is unusual in also running a state industrial relations system (Industrial Relations Act 1979 (WA)) that covers employees of non-constitutional corporations such as sole traders, partnerships and non-corporate trusts.`
    : ` State and local government employees in ${s.name} are covered by state public sector employment laws rather than the Fair Work Act.`;

const AU_MAXHOURS = [
  (s: AuStateData) => `Under the Fair Work Act 2009 (NES), full-time employees in ${s.name} have a maximum of 38 ordinary hours per week. An employer can request reasonable additional hours, but employees can refuse unreasonable requests.`,
  (s: AuStateData) => `The NES caps ordinary hours at 38 per week for full-time employees in ${s.name}. Reasonable additional hours can be asked for, but you can decline requests that are unreasonable.`,
  (s: AuStateData) => `In ${s.name}, the National Employment Standards set 38 ordinary hours a week for full-time staff. Extra hours must be reasonable, and an employee may refuse if they are not.`,
  (s: AuStateData) => `Full-time employees in ${s.name} work a maximum of 38 ordinary hours per week under the NES. Employers may request reasonable extra hours; unreasonable requests can be refused.`,
  (s: AuStateData) => `The 38-hour ordinary week from the National Employment Standards applies to full-time employees in ${s.name}. Additional hours are only required where they are reasonable.`,
  (s: AuStateData) => `${s.name} full-time employees are subject to the NES 38-hour ordinary week. An employer can seek reasonable additional hours, but an employee is entitled to refuse unreasonable ones.`,
  (s: AuStateData) => `Under the National Employment Standards, the ordinary-hours ceiling for full-time employees in ${s.name} is 38 hours a week, with any extra hours needing to be reasonable.`,
] as const;

const AU_MAXHOURS_TAIL =
  ` What counts as "reasonable" depends on health and safety, personal circumstances, the role, and usual industry patterns. Modern awards and enterprise agreements may set additional daily and weekly limits.`;

const AU_INTRO = [
  (s: AuStateData) => `Minimum wage, long service leave entitlements, workers compensation, and key employment rights for workers in ${s.name}.`,
  (s: AuStateData) => `What ${s.name} workers need to know: the national minimum wage, long service leave, workers compensation, and core Fair Work rights.`,
  (s: AuStateData) => `A quick guide to pay and entitlements in ${s.name} — minimum wage, long service leave, workers comp, and your rights under the Fair Work Act.`,
  (s: AuStateData) => `Key employment facts for ${s.name}: minimum wage, long service leave, workers compensation, and the Fair Work protections that apply.`,
] as const;

const AU_LSL = [
  (s: AuStateData) => `In ${s.name}, long service leave is governed by the ${s.lslLegislation}. You qualify after ${s.lslQualifyingYears} years of continuous service with the same employer and receive ${s.lslEntitlementWeeks} weeks of paid leave.`,
  (s: AuStateData) => `Long service leave in ${s.name} comes from the ${s.lslLegislation}: ${s.lslEntitlementWeeks} weeks of paid leave once you reach ${s.lslQualifyingYears} years of continuous service with one employer.`,
  (s: AuStateData) => `Under ${s.name}'s ${s.lslLegislation}, continuous service of ${s.lslQualifyingYears} years with the same employer earns ${s.lslEntitlementWeeks} weeks of long service leave.`,
  (s: AuStateData) => `${s.name} sets long service leave through the ${s.lslLegislation} — after ${s.lslQualifyingYears} years with the same employer you accrue ${s.lslEntitlementWeeks} weeks of paid leave.`,
  (s: AuStateData) => `The ${s.lslLegislation} gives ${s.name} employees ${s.lslEntitlementWeeks} weeks of long service leave after ${s.lslQualifyingYears} years of unbroken service with the same employer.`,
  (s: AuStateData) => `For ${s.name}, long service leave sits under the ${s.lslLegislation}: reach ${s.lslQualifyingYears} years of continuous service and you're entitled to ${s.lslEntitlementWeeks} weeks' paid leave.`,
  (s: AuStateData) => `${s.name}'s long service leave rules (the ${s.lslLegislation}) provide ${s.lslEntitlementWeeks} weeks of paid leave at ${s.lslQualifyingYears} years of continuous service with one employer.`,
  (s: AuStateData) => `Employees in ${s.name} accrue long service leave under the ${s.lslLegislation} — ${s.lslEntitlementWeeks} weeks after ${s.lslQualifyingYears} years of continuous service with the same employer.`,
] as const;

const AU_WORKERSCOMP = [
  (s: AuStateData) => `Workers compensation in ${s.name} is administered by ${s.workersCompAuthority} (${s.workersCompUrl}). If you're injured at work, notify your employer as soon as possible, get medical treatment and a certificate, and lodge a claim with the employer's insurer.`,
  (s: AuStateData) => `${s.workersCompAuthority} administers workers compensation in ${s.name} (${s.workersCompUrl}). After a work injury, tell your employer promptly, obtain a medical certificate, and lodge a claim through their insurer.`,
  (s: AuStateData) => `In ${s.name}, workers compensation runs through ${s.workersCompAuthority} (${s.workersCompUrl}). The steps after a workplace injury: notify your employer, seek treatment and a certificate, then lodge a claim with the insurer.`,
  (s: AuStateData) => `If you're hurt at work in ${s.name}, workers compensation is handled by ${s.workersCompAuthority} (${s.workersCompUrl}). Report the injury to your employer, get a medical certificate, and file a claim with their insurer.`,
  (s: AuStateData) => `${s.name}'s workers compensation scheme is administered by ${s.workersCompAuthority} (${s.workersCompUrl}). Notify your employer quickly after an injury, get medical evidence, and lodge the claim via the employer's insurer.`,
  (s: AuStateData) => `Workers comp claims in ${s.name} go through ${s.workersCompAuthority} (${s.workersCompUrl}). Following a work injury you should inform your employer, obtain a medical certificate, and submit a claim to their insurer.`,
  (s: AuStateData) => `To claim workers compensation in ${s.name}, deal with ${s.workersCompAuthority} (${s.workersCompUrl}): report the injury to your employer, get treated and certified, and lodge with the insurer.`,
  (s: AuStateData) => `In ${s.name}, ${s.workersCompAuthority} (${s.workersCompUrl}) oversees workers compensation. After a workplace injury, notify your employer, secure a medical certificate, and lodge your claim through the employer's insurer.`,
  (s: AuStateData) => `${s.name} workers injured on the job claim through ${s.workersCompAuthority} (${s.workersCompUrl}). Report promptly to your employer, get a medical certificate, and lodge the claim with their workers-comp insurer.`,
] as const;

const AU_WORKERSCOMP_TAIL =
  " Most employers must hold workers compensation insurance, and claims cover medical expenses, rehabilitation, and income replacement while you can't work.";

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
  const rank = clusterRank(AU_ALL_SLUGS, s.slug);
  const minWageTail = s.hasStateIrSystem
    ? ` Note: ${s.name} also runs a state industrial relations system for non-constitutional corporations — the ${s.stateMinWage ?? "WA state minimum wage"} may apply to state-system employees; check with the WA Industrial Relations Commission.`
    : ` The national minimum wage is set by the Fair Work Commission and applies across all sectors covered by the national system in ${s.name}.`;
  return [
    {
      question: `What is the minimum wage in ${s.name} in 2026?`,
      answer: `${pickVariantByPosition(rank, AU_MINWAGE)(s)}${minWageTail}`,
    },
    {
      question: `How much long service leave am I entitled to in ${s.name}?`,
      answer: `${pickVariantByPosition(rank, AU_LSL)(s)}${s.lslProRataOnTermination ? ` Pro-rata entitlement: ${s.lslProRataOnTermination}.` : ""}`,
    },
    {
      question: `Who is covered by the Fair Work Act in ${s.name}?`,
      answer: `${pickVariantByPosition(rank, AU_COVERAGE)(s)}${AU_COVERAGE_TAIL(s)}`,
    },
    {
      question: `How do I claim workers compensation in ${s.name}?`,
      answer: `${pickVariantByPosition(rank, AU_WORKERSCOMP)(s)}${AU_WORKERSCOMP_TAIL}`,
    },
    {
      question: `What are the maximum working hours in ${s.name}?`,
      answer: `${pickVariantByPosition(rank, AU_MAXHOURS)(s)}${AU_MAXHOURS_TAIL}`,
    },
  ];
}

export default async function Page({ params }: Props) {
  const { state: slug } = await params;
  const s = getAuState(slug);
  if (!s) notFound();

  const url = `${SITE.url}/au/states/${s.slug}`;
  const faqs = generateFaqs(s);
  const reviewedDate = `${s.verifiedYear}-01-01`;
  const rank = clusterRank(AU_ALL_SLUGS, s.slug);

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
            {pickVariantByPosition(rank, AU_INTRO)(s)}
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
              <p className="font-bold text-ink text-lg">$26.44/hr</p>
              <p className="text-xs text-ink-faint mt-1">From 1 July 2026</p>
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
              Fair Work Commission Annual Wage Review 2026-27
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
