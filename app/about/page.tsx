import type { Metadata } from "next";
import { SITE, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About MyPayRights — Law-Backed Employment Pay Calculators",
  description:
    "MyPayRights builds employment pay calculators backed by primary government sources for the UK, US, Canada, and Australia. Statutory rates, verified annually.",
  alternates: { canonical: `${SITE.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About My Pay Rights",
          url: `${SITE.url}/about`,
          description:
            "My Pay Rights builds law-backed employment pay calculators reviewed against official GOV.UK, U.S. DOL, and equivalent statutory sources.",
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
          publisher: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
            contactPoint: {
              "@type": "ContactPoint",
              email: SITE.contactEmail,
              contactType: "customer support",
            },
          },
          author: {
            "@type": "Person",
            name: "Jaspal Singh",
            jobTitle: "Founder",
            url: SITE.url,
          },
        })}
      />
      <article className="prose-tool mx-auto max-w-2xl px-5 py-10 text-sm leading-relaxed text-ink-soft">
        <h1 className="text-2xl font-medium tracking-tight text-ink">About {SITE.name}</h1>

        <p className="mt-4">
          {SITE.name} builds focused employment pay calculators for the moments that matter most —
          being made redundant, leaving a job, checking your overtime, or working out parental
          leave. Each tool has the relevant statutory rules built in, updates as you type, and
          produces a dated PDF you can keep for your records.
        </p>

        <h2>Who built this</h2>
        <p>
          My Pay Rights was founded by Jaspal Singh, a software engineer with a long-standing
          interest in making employment law accessible to ordinary people. The tools began as
          personal reference calculators built after spending too long hunting through GOV.UK
          guidance during a job change — and became a public site when it was clear others needed
          the same thing.
        </p>
        <p>
          The rate data and legal logic behind each calculator is reviewed before every statutory
          update. If you spot a figure that looks wrong or out of date, email{" "}
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="text-brand-600 underline-offset-2 hover:underline"
          >
            {SITE.contactEmail}
          </a>{" "}
          — errors are taken seriously and investigated within one working day.
        </p>

        <h2>How the rates are verified</h2>
        <p>
          Every statutory figure — the UK weekly redundancy pay cap, SMP rate, SSP rate, US
          federal overtime multiplier, Canadian notice minimums — is sourced directly from official
          government publications. UK rates come from{" "}
          <a
            href="https://www.gov.uk/government/collections/national-minimum-wage-and-national-living-wage-rates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline-offset-2 hover:underline"
          >
            GOV.UK
          </a>{" "}
          and HMRC. US rates come from the{" "}
          <a
            href="https://www.dol.gov/agencies/whd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline-offset-2 hover:underline"
          >
            U.S. Department of Labor Wage and Hour Division
          </a>
          . Each tool page shows the source and effective date.
        </p>
        <p>
          UK rates are reviewed each April (in line with the HMRC tax year) and again in October
          if an Autumn Statement changes anything material. US rates are reviewed each January and
          after any DOL final rule changes.
        </p>

        <h2>Why country-aware matters</h2>
        <p>
          Employment entitlements are set by national law, and that law changes most years. A
          generic calculator that doesn&apos;t know whether you&apos;re in the UK or the US —
          or which US state you&apos;re in for PTO payout purposes — will give you a wrong answer.
          Every calculator on this site knows exactly which jurisdiction&apos;s rules apply and
          applies them correctly.
        </p>

        <h2>What this site is not</h2>
        <p>
          The tools provide estimates for general information only. They are not legal, financial
          or tax advice. Employment situations often have complexity that a calculator cannot
          capture — zero-hours contracts, TUPE transfers, contested continuous employment, enhanced
          contractual terms. For any decision that affects your finances or employment, check the
          official guidance linked on each page or speak to a qualified employment solicitor or
          ACAS.
        </p>
      </article>
    </>
  );
}
