import type { Metadata } from "next";
import Link from "next/link";
import { SITE, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact My Pay Rights",
  description:
    "Contact My Pay Rights for calculator corrections, editorial questions, privacy requests, press enquiries, and source updates.",
  alternates: { canonical: `${SITE.url}/contact` },
};

const CONTACT_OPTIONS = [
  {
    label: "Calculator corrections",
    email: SITE.contactEmail,
    body: "Report a statutory rate, source, calculation, or page issue.",
  },
  {
    label: "Privacy requests",
    email: SITE.privacyEmail,
    body: "Ask about privacy, cookies, data handling, or rights requests.",
  },
  {
    label: "Legal and policy",
    email: SITE.legalEmail,
    body: "Send legal, copyright, publisher-policy, or compliance notices.",
  },
  {
    label: "Press and editorial",
    email: "editorial@mypayrights.com",
    body: "Request comment, source notes, data background, or brand assets.",
  },
] as const;

const INCLUDE_ITEMS = [
  "The page URL or calculator name",
  "The country, state, province, or territory involved",
  "The figure, rule, or statement you believe needs review",
  "A link to the official source if you have one",
] as const;

const RELATED_LINKS = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Editorial policy", href: "/editorial-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;

export default function ContactPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE.url}/contact` },
    ],
  };

  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact My Pay Rights",
    url: `${SITE.url}/contact`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      contactPoint: CONTACT_OPTIONS.map((option) => ({
        "@type": "ContactPoint",
        email: option.email,
        contactType: option.label,
        availableLanguage: "English",
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(contactPage)} />

      <section
        style={{
          borderBottom: "1px solid #EAE5D8",
          background:
            "radial-gradient(circle at 82% 14%,rgba(30,78,140,.10),transparent 30%),linear-gradient(180deg,#fff 0%,#FBF9F3 100%)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 44px" }}>
          <nav aria-label="Breadcrumb" style={{ color: "#7a8794", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            <Link href="/" style={{ color: "#7a8794" }}>Home</Link>
            {" / "}
            <span>Contact</span>
          </nav>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#16835b", fontSize: 12, fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16835b", boxShadow: "0 0 0 5px rgba(22,131,91,.12)", flexShrink: 0 }} />
            Corrections, privacy and editorial contact
          </div>

          <h1 style={{ maxWidth: 820, margin: "14px 0 16px", color: "#102033", fontSize: "clamp(42px,5.4vw,68px)", lineHeight: 1, fontWeight: 850 }}>
            Contact My Pay Rights.
          </h1>

          <p style={{ maxWidth: 760, margin: 0, color: "#25384c", fontSize: 18, lineHeight: 1.62 }}>
            Use the right inbox below for corrections, source updates, privacy requests,
            editorial questions, and compliance notices. My Pay Rights provides general
            information only and cannot give personal legal advice.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 24px 74px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-8 items-start">
          <div>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Contact options">
              {CONTACT_OPTIONS.map((option) => (
                <article
                  key={option.email}
                  style={{
                    border: "1px solid #E4DECF",
                    borderRadius: 10,
                    background: "#fff",
                    boxShadow: "0 10px 24px rgba(16,32,51,.06)",
                    padding: 18,
                  }}
                >
                  <h2 style={{ margin: "0 0 8px", color: "#102033", fontSize: 18, lineHeight: 1.2, fontWeight: 850 }}>
                    {option.label}
                  </h2>
                  <p style={{ minHeight: 42, margin: "0 0 14px", color: "#52616f", fontSize: 13, lineHeight: 1.55 }}>
                    {option.body}
                  </p>
                  <a
                    href={`mailto:${option.email}`}
                    style={{ color: "#163C6B", fontSize: 14, fontWeight: 850, textDecoration: "underline", textUnderlineOffset: 3 }}
                  >
                    {option.email}
                  </a>
                </article>
              ))}
            </section>

            <section style={{ marginTop: 34, paddingTop: 30, borderTop: "1px solid #EAE5D8" }}>
              <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 28, lineHeight: 1.15, fontWeight: 850 }}>
                What to include
              </h2>
              <p style={{ maxWidth: 760, margin: "0 0 16px", color: "#25384c", fontSize: 16, lineHeight: 1.72 }}>
                For calculator corrections and source disputes, include enough detail to
                reproduce the issue. That makes it easier to check the rule against official
                sources and update the page quickly.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {INCLUDE_ITEMS.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "24px 1fr",
                      gap: 10,
                      border: "1px solid #E4DECF",
                      borderRadius: 8,
                      background: "#FBF9F3",
                      padding: 13,
                      color: "#25384c",
                      fontSize: 14,
                      fontWeight: 750,
                    }}
                  >
                    <span style={{ width: 22, height: 22, display: "grid", placeItems: "center", borderRadius: "50%", background: "#16835b", color: "#fff", fontSize: 12, fontWeight: 900 }}>
                      OK
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section style={{ marginTop: 34, paddingTop: 30, borderTop: "1px solid #EAE5D8" }}>
              <h2 style={{ margin: "0 0 12px", color: "#102033", fontSize: 28, lineHeight: 1.15, fontWeight: 850 }}>
                Response standard
              </h2>
              <p style={{ margin: 0, color: "#25384c", fontSize: 16, lineHeight: 1.72 }}>
                Corrections involving statutory figures, legal-source links, or calculator
                logic are reviewed within one working day where possible. Complex source
                disputes may take longer because they require checking official guidance,
                legislation, and local enforcement material.
              </p>
            </section>
          </div>

          <aside className="hidden lg:grid gap-4" style={{ position: "sticky", top: 88 }}>
            <section style={{ border: "1px solid #f1d9aa", borderRadius: 10, background: "#fff4df", padding: 18, color: "#5d461d", fontSize: 13, lineHeight: 1.65 }}>
              <h2 style={{ margin: "0 0 8px", color: "#3c2c0d", fontSize: 17, fontWeight: 850 }}>
                Legal advice boundary
              </h2>
              My Pay Rights cannot review your documents, contact your employer, or tell you
              what legal action to take. For personal advice, contact ACAS, a government labour
              agency, a union representative, or a qualified employment lawyer.
            </section>

            <section style={{ border: "1px solid #E4DECF", borderRadius: 10, background: "#fff", padding: 18 }}>
              <h2 style={{ margin: "0 0 10px", color: "#102033", fontSize: 17, fontWeight: 850 }}>
                Related pages
              </h2>
              <div style={{ display: "grid", gap: 8 }}>
                {RELATED_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      border: "1px solid #EAE5D8",
                      borderRadius: 8,
                      background: "#F4F1E9",
                      padding: "9px 10px",
                      color: "#25384c",
                      fontSize: 13,
                      fontWeight: 850,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                    <span style={{ color: "#163C6B" }}>-&gt;</span>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
