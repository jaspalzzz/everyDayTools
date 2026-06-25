import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name} — free employment calculators for informational purposes.`,
  alternates: { canonical: `${SITE.url}/terms` },
};

export default function TermsPage() {
  return (
    <article className="prose-tool mx-auto max-w-2xl px-5 py-10 text-sm leading-relaxed text-ink-soft">
      <h1 className="text-2xl font-medium tracking-tight text-ink">Terms of Use</h1>
      <p className="mt-2 text-xs text-ink-faint">Last updated: June 2026</p>

      <p className="mt-4">
        By using {SITE.name} you agree to these terms. If you do not agree, please do not use the
        site.
      </p>

      <h2>1. Informational use only</h2>
      <p>
        All calculators and content on {SITE.name} are provided for <strong>general information
        purposes only</strong>. Nothing on this site constitutes legal, financial, tax, or
        employment advice. Results are estimates based on publicly available statutory rules and may
        not reflect your specific circumstances.
      </p>
      <p>
        Always verify figures with the relevant official authority or a qualified professional
        before making decisions that affect your employment or finances.
      </p>

      <h2>2. Accuracy of results</h2>
      <p>
        We take care to keep statutory constants (redundancy caps, benefit rates, state rules)
        accurate and up to date. However, laws change, and there may be a lag between a rule
        changing and our tool being updated. We cannot guarantee that every result is correct for
        your exact situation.
      </p>
      <p>
        Each tool cites its statutory source and the effective date of the rates used. Check those
        sources for the authoritative current position.
      </p>

      <h2>3. No professional relationship</h2>
      <p>
        Using this site does not create a solicitor-client, attorney-client, financial adviser, or
        any other professional relationship between you and {SITE.name} or its operators.
      </p>

      <h2>4. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by applicable law, {SITE.name} and its operators accept no
        liability for any loss or damage arising from reliance on the information or results
        provided by this site.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The code, design, and content of this site are the property of the site operator.
        Statutory data cited on each page is drawn from public official sources and is not owned
        by us.
      </p>

      <h2>6. Third-party services</h2>
      <p>
        This site may use third-party services including Google AdSense and analytics providers.
        Your use of the site is also subject to those services&apos; terms of service.
      </p>

      <h2>7. Governing law</h2>
      <p>
        These terms are governed by and construed in accordance with applicable law. Any disputes
        will be subject to the jurisdiction of the courts relevant to the operator&apos;s location.
      </p>

      <h2>8. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after changes
        constitutes acceptance of the revised terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${SITE.legalEmail}`} className="text-brand-600 hover:underline">
          {SITE.legalEmail}
        </a>
        .
      </p>
    </article>
  );
}
