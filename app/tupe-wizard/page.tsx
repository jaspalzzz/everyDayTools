import type { Metadata } from "next";
import Link from "next/link";
import { TupeWizard } from "./TupeWizard";
import { AffiliateCta } from "@/components/AffiliateCta";
import { SITE, jsonLd } from "@/lib/seo";

const title = "Does TUPE Apply to Me? Free UK TUPE Checker 2026";
const description =
  "Answer 5 questions to find out if TUPE (Transfer of Undertakings) applies to your situation — and what protections you have. Free, instant, no sign-up.";
const url = `${SITE.url}/tupe-wizard`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "TUPE Wizard", item: url },
  ],
};

const webApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TUPE Eligibility Checker",
  description,
  url,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webApp)} />

<div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <nav className="mb-6 flex items-center gap-1 text-sm text-ink-faint">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="text-ink-soft">TUPE Wizard</span>
        </nav>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-ink">
          Does TUPE apply to me?
        </h1>
        <p className="mb-8 text-ink-soft">
          Answer 5 quick questions to find out whether the Transfer of Undertakings (Protection of
          Employment) Regulations 2006 apply to your situation — and what your rights are.
        </p>

        <TupeWizard />

        {/* Explainer */}
        <section className="mt-10 space-y-4 text-sm text-ink-soft">
          <h2 className="text-base font-bold text-ink">What is TUPE?</h2>
          <p>
            TUPE stands for the Transfer of Undertakings (Protection of Employment) Regulations 2006.
            It protects employees when the business or service they work for changes hands. Under TUPE,
            your employment automatically transfers to the new employer on the same terms — your pay,
            hours, holidays, and other conditions cannot be reduced because of the transfer.
          </p>
          <p>
            TUPE applies to two types of transfer: <strong>business transfers</strong> (a business or
            part of it is sold or transferred) and <strong>service provision changes</strong> (a service
            is outsourced, re-tendered, or brought back in-house).
          </p>
          <p>
            If TUPE applies and you are dismissed — before or after the transfer — the dismissal is
            automatically unfair from day one, with no 2-year qualifying period. The exception is where
            the employer can demonstrate an economic, technical, or organisational (ETO) reason for the
            dismissal.
          </p>
          <p className="text-xs text-ink-faint">
            This checker gives general guidance only and is not legal advice. For your specific
            situation, consult an employment solicitor or contact{" "}
            <a href="https://www.acas.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              ACAS
            </a>{" "}
            for free advice.
          </p>
        </section>

        <AffiliateCta context="tupe-uk" heading="Official TUPE resources" className="mt-8" />

        {/* Related */}
        <section className="mt-8 flex flex-wrap gap-3">
          <Link href="/guides/uk-tupe" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Full TUPE guide
          </Link>
          <Link href="/redundancy-pay-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Redundancy pay calculator
          </Link>
          <Link href="/notice-period-calculator" className="rounded-lg border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-600 hover:text-brand-600">
            Notice period calculator
          </Link>
        </section>
      </div>
    </>
  );
}
