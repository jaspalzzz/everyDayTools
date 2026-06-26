import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "My Pay Rights builds law-backed employment pay calculators that turn statutory rules into a clear answer and a downloadable document.",
  alternates: { canonical: `${SITE.url}/about` },
};

export default function AboutPage() {
  return (
    <article className="prose-tool mx-auto max-w-2xl px-5 py-10 text-sm leading-relaxed text-ink-soft">
      <h1 className="text-2xl font-medium tracking-tight text-ink">About {SITE.name}</h1>
      <p className="mt-4">
        {SITE.name} builds focused pay rights calculators for the moments that matter — being made
        redundant, leaving a job, working out your notice, or checking your overtime. Each tool has
        the relevant country&apos;s statutory rules built in, updates live as you type, and lets you
        download a dated PDF summary.
      </p>
      <h2>Why country-aware matters</h2>
      <p>
        Employment entitlements are set by law, and that law differs by country and changes most
        years. A generic answer is often wrong. We maintain the statutory figures behind each tool
        and cite the official source on every page so you can verify the result.
      </p>
      <h2>Important</h2>
      <p>
        Our tools provide estimates for general information only. They are not legal, financial or
        tax advice. For decisions that affect your finances or employment, consult a qualified
        professional or the official guidance linked on each page.
      </p>
    </article>
  );
}
