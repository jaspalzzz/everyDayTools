import type { Metadata } from "next";
import { SITE, jsonLd, webPageSchema } from "@/lib/seo";

const url = `${SITE.url}/privacy`;
const description = `How ${SITE.name} handles your data — no personal data is collected or stored.`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: url },
};

const schema = webPageSchema({
  name: "Privacy Policy",
  description,
  url,
  dateModified: "2026-06-01",
});

export default function PrivacyPage() {
  return (
    <article className="prose-tool mx-auto max-w-2xl px-5 py-10 text-sm leading-relaxed text-ink-soft">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <h1 className="text-2xl font-medium tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-2 text-xs text-ink-faint">Last updated: June 2026</p>

      <p className="mt-4">
        Your privacy matters. This page explains what data {SITE.name} collects (almost none),
        how the calculators work, and what any third-party services on this site may do.
      </p>

      <h2>1. What data we collect</h2>
      <p>
        <strong>{SITE.name} does not collect, store, or transmit any personal data.</strong> All
        calculations run entirely in your browser. The numbers you enter — salary, hours, state —
        are never sent to a server, never saved, and never associated with you.
      </p>
      <p>
        When you download a PDF it is generated locally in your browser and downloaded directly to
        your device. We receive nothing.
      </p>

      <h2>2. Cookies and local storage</h2>
      <p>
        We do not set first-party cookies. We do not use local storage or session storage to
        persist your inputs. Each page visit starts fresh.
      </p>

      <h2>3. Analytics</h2>
      <p>
        We may use privacy-friendly analytics (such as Plausible Analytics or Google Analytics) to
        understand which tools are used and how traffic arrives. If analytics are active, the
        service may collect your anonymised IP address, browser type, referrer URL, and pages
        visited. No personally identifiable information is tracked. You can block analytics with a
        standard ad or tracker blocker.
      </p>

      <h2>4. Advertising</h2>
      <p>
        This site may display ads served by Google AdSense. Google uses cookies to serve ads based
        on your prior visits to this and other websites. You can opt out of personalised advertising
        by visiting{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:underline"
        >
          Google Ad Settings
        </a>
        . See{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:underline"
        >
          Google&apos;s advertising policy
        </a>{" "}
        for full details.
      </p>

      <h2>5. Third-party links</h2>
      <p>
        Each tool links to official government or statutory sources (GOV.UK, US Department of
        Labor, IRS, state agencies). Those sites have their own privacy policies. We are not
        responsible for external site content or data practices.
      </p>

      <h2>6. Children</h2>
      <p>
        This site is not directed at children under 13 and we do not knowingly collect data from
        children.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        We may update this policy occasionally. Changes are effective when posted. The &quot;last
        updated&quot; date at the top reflects the current version.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about this policy? Email us at{" "}
        <a href={`mailto:${SITE.privacyEmail}`} className="text-brand-600 hover:underline">
          {SITE.privacyEmail}
        </a>
        .
      </p>
    </article>
  );
}
