/**
 * Contextual affiliate/referral CTA blocks.
 * Renders a "get professional advice" panel with optional affiliate tracking.
 * Affiliate links are managed here centrally — update hrefs in AFFILIATE_LINKS to swap providers.
 */

import Link from "next/link";
import { SITE } from "@/lib/seo";

export type AffiliateContext =
  | "redundancy-uk"
  | "unfair-dismissal-uk"
  | "settlement-agreement-uk"
  | "tupe-uk"
  | "employment-tribunal-uk"
  | "wages-us"
  | "general-uk";

interface AffiliateLink {
  label: string;
  href: string;
  description: string;
  isFree: boolean;
  /** rel attribute — use "nofollow sponsored" for paid affiliate links */
  rel: string;
}

const AFFILIATE_LINKS: Record<AffiliateContext, AffiliateLink[]> = {
  "redundancy-uk": [
    {
      label: "ACAS — Free redundancy advice",
      href: "https://www.acas.org.uk/redundancy",
      description: "The official UK employment relations service. Free, impartial, and authoritative.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "Citizens Advice — Redundancy help",
      href: "https://www.citizensadvice.org.uk/work/redundancy/",
      description: "Free, confidential advice on your redundancy rights and next steps.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "Employment Law Friend — Fixed-fee solicitors",
      href: "https://www.employmentlawfriend.co.uk",
      description: "Fixed-fee employment solicitors specialising in redundancy and settlement agreements.",
      isFree: false,
      rel: "nofollow noopener noreferrer",
    },
  ],
  "unfair-dismissal-uk": [
    {
      label: "ACAS — Early conciliation (free)",
      href: "https://www.acas.org.uk/early-conciliation",
      description: "Mandatory first step before an Employment Tribunal claim. Free and fast.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "Citizens Advice — Unfair dismissal",
      href: "https://www.citizensadvice.org.uk/work/leaving-a-job/dismissal/check-if-your-dismissal-is-fair/",
      description: "Check if your dismissal was fair and what to do next.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "Law Society — Find an employment solicitor",
      href: "https://solicitors.lawsociety.org.uk",
      description: "Search for regulated employment solicitors near you via the Law Society directory.",
      isFree: false,
      rel: "noopener noreferrer",
    },
  ],
  "settlement-agreement-uk": [
    {
      label: "ACAS — Settlement agreements",
      href: "https://www.acas.org.uk/settlement-agreements",
      description: "Free guidance on what a settlement agreement is and your rights before signing.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "Employment Law Friend — Settlement agreement review",
      href: "https://www.employmentlawfriend.co.uk",
      description: "Fixed-fee solicitor review of your settlement agreement. Employer-funded in most cases.",
      isFree: false,
      rel: "nofollow noopener noreferrer",
    },
  ],
  "tupe-uk": [
    {
      label: "ACAS — TUPE guidance",
      href: "https://www.acas.org.uk/tupe",
      description: "Free, authoritative guidance on TUPE transfers and your rights.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "Gov.uk — TUPE: Your rights",
      href: "https://www.gov.uk/transfers-takeovers",
      description: "Official government guidance on business transfers and TUPE.",
      isFree: true,
      rel: "noopener noreferrer",
    },
  ],
  "employment-tribunal-uk": [
    {
      label: "ACAS — Early conciliation",
      href: "https://www.acas.org.uk/early-conciliation",
      description: "You must contact ACAS before filing a tribunal claim. This step is free.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "Employment Tribunal — Make a claim (ET1)",
      href: "https://www.gov.uk/employment-tribunals/make-a-claim",
      description: "Submit your ET1 claim form online. Filing is free for employees.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "Law Society — Find an employment solicitor",
      href: "https://solicitors.lawsociety.org.uk",
      description: "Search the Law Society directory for regulated employment solicitors.",
      isFree: false,
      rel: "noopener noreferrer",
    },
  ],
  "wages-us": [
    {
      label: "US DOL Wage and Hour Division — File a complaint",
      href: "https://www.dol.gov/agencies/whd/contact/complaints",
      description: "Free federal wage complaint process for FLSA-covered workers.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "National Employment Law Project",
      href: "https://www.nelp.org",
      description: "Worker rights advocacy and resources on minimum wage and wage theft.",
      isFree: true,
      rel: "noopener noreferrer",
    },
  ],
  "general-uk": [
    {
      label: "ACAS — Free employment advice",
      href: "https://www.acas.org.uk",
      description: "Free, impartial advice on all employment matters. Call 0300 123 1100.",
      isFree: true,
      rel: "noopener noreferrer",
    },
    {
      label: "Citizens Advice",
      href: "https://www.citizensadvice.org.uk/work/",
      description: "Free employment rights advice across the UK.",
      isFree: true,
      rel: "noopener noreferrer",
    },
  ],
};

interface AffiliateCtaProps {
  context: AffiliateContext;
  heading?: string;
  className?: string;
}

export function AffiliateCta({ context, heading, className = "" }: AffiliateCtaProps) {
  const links = AFFILIATE_LINKS[context];
  if (!links || links.length === 0) return null;

  const title = heading ?? "Get professional advice";

  return (
    <aside className={`rounded-xl border border-surface-line bg-surface-muted p-5 ${className}`} aria-label="Professional advice resources">
      <p className="mb-3 text-sm font-semibold text-ink">{title}</p>
      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel={link.rel}
            className="group flex items-start gap-3 rounded-lg border border-surface-line bg-white px-4 py-3 text-sm transition-colors hover:border-brand-600 hover:bg-brand-50"
          >
            <span className="mt-0.5 shrink-0">
              {link.isFree ? (
                <span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">FREE</span>
              ) : (
                <span className="rounded border border-surface-line bg-surface-muted px-1.5 py-0.5 text-xs font-semibold text-ink-faint">PAID</span>
              )}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-medium text-ink group-hover:text-brand-700">{link.label} →</span>
              <span className="block text-xs text-ink-soft mt-0.5">{link.description}</span>
            </span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-faint">
        {SITE.name} earns a small referral fee from some paid links above, at no cost to you.
        Free resources are never commercially influenced.
      </p>
    </aside>
  );
}
