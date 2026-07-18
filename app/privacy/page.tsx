import type { Metadata } from "next";
import { SITE, jsonLd, webPageSchema } from "@/lib/seo";

const url = `${SITE.url}/privacy`;
const description = `How ${SITE.name} handles calculator inputs, analytics, advertising cookies and privacy choices.`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: url },
};

const schema = webPageSchema({
  name: "Privacy Policy",
  description,
  url,
  dateModified: "2026-07-18",
});

export default function PrivacyPage() {
  return (
    <article className="prose-tool mx-auto max-w-2xl px-5 py-10 text-sm leading-relaxed text-ink-soft">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <h1 className="text-2xl font-medium tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-2 text-xs text-ink-faint">Last updated: 18 July 2026</p>

      <p className="mt-4">
        This page explains how {SITE.name} handles calculator inputs, preference storage,
        analytics and advertising. The calculators are designed to keep the figures you enter on
        your device, while hosting and optional third-party services process limited technical
        data needed to operate, measure and fund the site.
      </p>

      <h2>1. Calculator inputs and downloaded files</h2>
      <p>
        <strong>Calculations run in your browser.</strong> The calculator values you enter — such
        as salary, hours, dates or jurisdiction — are not submitted to a {SITE.name} server or
        saved in an account. Do not enter information you do not want to appear in a PDF you
        create.
      </p>
      <p>
        PDFs are generated locally in your browser and downloaded directly to your device. We do
        not receive the calculator values or the contents of those files.
      </p>

      <h2>2. Cookies and local storage</h2>
      <p>
        We do not use cookies or browser storage to persist calculator inputs. We use one
        first-party local-storage value, <code>mpr_cookie_consent</code>, to remember whether you
        allowed optional analytics. You can change that choice using the &quot;Privacy and cookie
        settings&quot; control in the site footer.
      </p>
      <p>
        If advertising is enabled, Google and participating advertising partners may use cookies,
        local storage or similar technologies as described below. Where required, a
        Google-certified consent message provides advertising choices separately from our
        analytics choice.
      </p>

      <h2>3. Analytics</h2>
      <p>
        We may use Google Analytics to understand which pages are visited, how visitors arrive and
        whether the site is working well. It is optional and loads only after you allow analytics.
        Google may process technical information such as your truncated or otherwise handled IP
        address, browser and device details, referrer, pages visited and approximate location. We
        do not send calculator input values to analytics.
      </p>

      <h2>4. Advertising</h2>
      <p>
        This site may display advertising through Google AdSense. Third-party vendors, including
        Google, use cookies to serve ads based on a visitor&apos;s prior visits to this site or other
        websites. Google&apos;s advertising cookies allow Google and its partners to serve ads based
        on visits to this site and other sites on the internet. The consent message identifies the
        advertising partners active for visitors in regions where that disclosure is required.
      </p>
      <p>
        You can opt out of personalised advertising or manage your Google ad preferences through{" "}
        <a
          href="https://myadcenter.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:underline"
        >
          My Ad Center
        </a>
        . You can also use the &quot;Privacy and cookie settings&quot; control in our footer to reopen
        available site choices. Learn more in{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:underline"
        >
          Google&apos;s advertising technologies information
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:underline"
        >
          Google&apos;s Privacy Policy
        </a>
        .
      </p>

      <h2>5. Hosting and security logs</h2>
      <p>
        Our hosting and security providers may automatically process request information such as
        IP address, user agent, requested URL, time and security signals. This information is used
        to deliver the site, prevent abuse, diagnose failures and maintain security. We do not use
        those logs to reconstruct calculator inputs.
      </p>

      <h2>6. Third-party links</h2>
      <p>
        Each tool links to official government or statutory sources (GOV.UK, US Department of
        Labor, IRS, state agencies). Those sites have their own privacy policies. We are not
        responsible for external site content or data practices.
      </p>

      <h2>7. Children</h2>
      <p>
        This site is not directed at children under 13 and we do not knowingly collect data from
        children.
      </p>

      <h2>8. Your choices and questions</h2>
      <p>
        You may reject optional analytics when the banner appears, reopen the choice from the
        footer, adjust personalised advertising through My Ad Center, or use browser controls to
        clear cookies and local storage. Privacy rights vary by location. If you have a question or
        want to make a privacy request, contact us using the address below.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy occasionally. Changes are effective when posted. The &quot;last
        updated&quot; date at the top reflects the current version.
      </p>

      <h2>10. Contact</h2>
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
