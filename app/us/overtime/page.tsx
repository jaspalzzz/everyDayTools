import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";
import { TOOLS } from "@/data/tools";
import { FAQS } from "@/data/faqs";

const url = `${SITE.url}/us/overtime`;

export const metadata: Metadata = {
  title: "US Overtime Law 2026 — Who Qualifies, How to Calculate & Claim",
  description:
    "FLSA overtime rules for 2026: who is exempt vs non-exempt, how to calculate overtime pay, the salary threshold ($684/week), state overtime laws, and how to recover unpaid overtime.",
  alternates: { canonical: url },
  openGraph: {
    title: "US Overtime Law 2026 — FLSA Overtime Pay Rules Explained",
    description:
      "Non-exempt workers must be paid 1.5× their regular rate for hours over 40/week. Guide to exemptions, salary threshold, and recovering unpaid overtime.",
    url,
  },
};

const OVERTIME_TOOLS = TOOLS.filter((t) =>
  ["overtime-calculator"].includes(t.slug)
);

const OVERTIME_FAQS = FAQS.filter((f) =>
  ["what-is-the-flsa", "what-is-overtime-law-us", "are-salaried-employees-exempt-from-overtime-us"].includes(f.slug)
);

export default function USOvertimePage() {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "US Overtime Law 2026",
    url,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "US", item: `${SITE.url}/us` },
        { "@type": "ListItem", position: 3, name: "Overtime", item: url },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webPage)} />

      <div className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/us" className="hover:text-ink-soft">🇺🇸 US</Link>
          <span className="mx-1.5">/</span>
          <span>Overtime</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-600">US · Fair Labor Standards Act 1938</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-ink sm:text-4xl">US Overtime Law 2026</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            The Fair Labor Standards Act (FLSA) requires most US employers to pay non-exempt employees
            at least 1.5 times their regular rate of pay for all hours worked over 40 in a workweek.
            Exemptions are wide — but many employers misclassify workers as exempt to avoid paying overtime.
          </p>
          <div className="mt-5 rounded-lg border border-surface-line bg-surface-muted px-4 py-3 text-xs leading-relaxed text-ink-faint">
            <strong className="text-ink">2026 key figures:</strong> Overtime threshold: 40 hours/workweek ·
            Overtime rate: 1.5× regular rate · Salary exemption threshold: $684/week ($35,568/year) ·
            Enforcement: DOL Wage and Hour Division · Statute of limitations: 2 years (3 if willful)
          </div>
        </div>

        {/* Calculator */}
        {OVERTIME_TOOLS.length > 0 && (
          <section className="mb-10" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="mb-4 text-base font-semibold text-ink">Calculate your overtime</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {OVERTIME_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="rounded-lg border border-surface-line bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <p className="text-sm font-semibold text-ink">{tool.name} →</p>
                  <p className="mt-1 text-xs text-ink-soft">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="prose-tool mb-10 max-w-2xl text-sm leading-relaxed text-ink-soft">
          <h2 className="text-base font-semibold text-ink">Who must be paid overtime?</h2>
          <p>
            All employees are entitled to overtime unless they fall within a specific FLSA exemption.
            The most common exemptions — called the "white collar exemptions" — cover executive,
            administrative, and professional employees who:
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 pl-4">
            <li className="list-disc">Are paid on a salary basis of at least $684/week ($35,568/year)</li>
            <li className="list-disc">Primarily perform executive, administrative, or professional duties as defined by DOL regulation</li>
          </ul>
          <p className="mt-3">
            Both the salary test AND the duties test must be met. An employee who earns $100,000/year
            but primarily performs manual labor is still non-exempt and entitled to overtime. Conversely,
            an employee who primarily performs managerial duties but earns $600/week is non-exempt
            because they fall below the salary threshold.
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">How overtime is calculated</h2>
          <p>
            Overtime is calculated on a workweek basis — a fixed, regularly recurring period of 7
            consecutive 24-hour periods. Hours cannot be averaged over two weeks. If you work 50 hours
            one week and 30 the next, you are owed 10 hours of overtime for week 1, even though the
            average is 40.
          </p>
          <p className="mt-2">
            The overtime rate is 1.5× your "regular rate of pay." The regular rate includes most
            forms of compensation — hourly rate, salary, piecework earnings, shift differentials,
            and non-discretionary bonuses — but excludes gifts, overtime premiums themselves, and
            certain other payments.
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">State overtime laws</h2>
          <p>
            Several states have overtime rules that are more generous than federal law. California
            requires daily overtime (1.5× for hours over 8/day; 2× for hours over 12/day) and
            double time on the seventh consecutive day of a workweek. Nevada requires overtime for
            hours over 8/day for employees earning under 1.5× the state minimum wage. When state law
            is more protective than federal law, the state law applies.
          </p>

          <h2 className="mt-6 text-base font-semibold text-ink">Recovering unpaid overtime</h2>
          <p>
            If your employer has not paid overtime you are owed, you can:
          </p>
          <ol className="mt-2 flex flex-col gap-2 pl-4">
            <li className="list-decimal">File a complaint with the DOL Wage and Hour Division (free, anonymous)</li>
            <li className="list-decimal">File a private lawsuit under FLSA — you can recover back wages, an equal amount in liquidated damages, and attorney's fees</li>
            <li className="list-decimal">File with your state labor agency (often has faster resolution)</li>
          </ol>
          <p className="mt-3">
            The statute of limitations is 2 years (3 years if the violation was willful). Class or
            collective actions are common for overtime claims affecting multiple workers.
          </p>
        </section>

        {/* FAQs */}
        {OVERTIME_FAQS.length > 0 && (
          <section className="mb-10 max-w-2xl" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-4 text-base font-semibold text-ink">Common questions</h2>
            <div className="flex flex-col gap-3">
              {OVERTIME_FAQS.map((f) => (
                <Link
                  key={f.slug}
                  href={`/faq/${f.slug}`}
                  className="rounded-lg border border-surface-line bg-white p-4 transition-colors hover:bg-surface-muted"
                >
                  <p className="text-sm font-medium text-ink">{f.question}</p>
                  <p className="mt-1 text-xs text-ink-soft">{f.shortAnswer}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-surface-line pt-6 text-xs text-ink-faint">
          Sources:{" "}
          <a href="https://www.dol.gov/agencies/whd/overtime" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">DOL Wage and Hour Division — Overtime</a>
          {" · "}
          <a href="https://www.dol.gov/agencies/whd/flsa" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Fair Labor Standards Act (FLSA)</a>
        </div>
      </div>
    </>
  );
}
