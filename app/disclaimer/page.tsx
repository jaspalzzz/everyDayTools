import type { Metadata } from "next";
import { SITE, jsonLd, webPageSchema } from "@/lib/seo";

const url = `${SITE.url}/disclaimer`;
const description = `${SITE.name} calculators provide estimates only — not legal or financial advice.`;

export const metadata: Metadata = {
  title: "Disclaimer",
  description,
  alternates: { canonical: url },
};

const schema = webPageSchema({
  name: "Disclaimer",
  description,
  url,
  dateModified: "2026-06-01",
});

export default function DisclaimerPage() {
  return (
    <article className="prose-tool mx-auto max-w-2xl px-5 py-10 text-sm leading-relaxed text-ink-soft">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <h1 className="text-2xl font-medium tracking-tight text-ink">Disclaimer</h1>
      <p className="mt-2 text-xs text-ink-faint">Last updated: June 2026</p>

      <h2>Not legal or financial advice</h2>
      <p className="mt-4">
        The calculators and content on {SITE.name} are provided for <strong>general information
        only</strong>. They do not constitute, and must not be relied on as, legal, financial, tax,
        or employment advice.
      </p>
      <p>
        Employment law is jurisdiction-specific and changes regularly. While we maintain the
        statutory figures used in each tool and cite the official source on every page, your
        individual circumstances — including your contract, employer policy, length of service, and
        local court interpretations — can produce a result different from the calculator&apos;s
        estimate.
      </p>

      <h2>Always verify</h2>
      <p>
        Before making any decision about your employment, pay, or benefits, confirm the current
        rules with the relevant official authority:
      </p>
      <ul className="mt-2 list-disc pl-5">
        <li>
          <strong>UK:</strong>{" "}
          <a
            href="https://www.gov.uk/browse/employing-people"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline"
          >
            GOV.UK — Employment
          </a>
        </li>
        <li>
          <strong>US:</strong>{" "}
          <a
            href="https://www.dol.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline"
          >
            U.S. Department of Labor
          </a>
        </li>
        <li>
          <strong>Canada:</strong>{" "}
          <a
            href="https://www.canada.ca/en/services/jobs/workplace.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline"
          >
            Government of Canada — Workplace
          </a>
        </li>
      </ul>
      <p className="mt-4">
        For personal situations involving significant money or a potential legal claim, consult a
        qualified employment lawyer, HR professional, or financial adviser.
      </p>

      <h2>Statutory data effective dates</h2>
      <p>
        Each tool displays the statutory source and, where shown, the effective date of the rates
        used. Rate-based tools (redundancy pay, maternity/sick pay, overtime thresholds) should be
        treated as estimates until you have confirmed the current figures with the cited official
        source.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        {SITE.name} and its operators accept no liability for any loss, damage, or consequence
        arising from reliance on any estimate or information provided by this site.
      </p>
    </article>
  );
}
