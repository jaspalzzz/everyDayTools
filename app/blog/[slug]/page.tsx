import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost, BLOG_CATEGORIES } from "@/data/blogPosts";
import { getTool } from "@/data/tools";
import { EditorialReview } from "@/components/EditorialReview";
import { EDITORIAL_REVIEW, SITE, FOUNDER_PERSON, clampMetaDescription, jsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: clampMetaDescription(post.description),
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: clampMetaDescription(post.description),
      url,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  };
}

const REGION_FLAGS: Record<string, string> = {
  UK: "🇬🇧", US: "🇺🇸", AU: "🇦🇺", CA: "🇨🇦", Global: "🌍",
};

async function loadContent(slug: string): Promise<React.ComponentType | null> {
  try {
    const mod = await import(`./content/${slug}`);
    return mod.default ?? null;
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${post.slug}`;
  const Content = await loadContent(slug);

  const relatedToolMetas = post.relatedTools.map((s) => getTool(s)).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: FOUNDER_PERSON,
    reviewedBy: EDITORIAL_REVIEW,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    keywords: post.tags.join(", "),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <div className="mx-auto max-w-3xl px-5 py-10">
        <nav className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/blog" className="hover:text-ink-soft">Blog</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-soft">{BLOG_CATEGORIES[post.category].label}</span>
        </nav>

        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
            <span>{REGION_FLAGS[post.region]} {post.region}</span>
            <span>·</span>
            <span>{BLOG_CATEGORIES[post.category].label}</span>
            <span>·</span>
            <span>{post.readingTimeMinutes} min read</span>
            <span>·</span>
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </time>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-ink leading-tight">{post.title}</h1>
          <p className="mt-3 text-ink-soft leading-relaxed">{post.excerpt}</p>
        </header>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-surface-line bg-surface-muted px-3 py-0.5 text-xs text-ink-soft">
              {tag}
            </span>
          ))}
        </div>

        {/* Author byline */}
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-soft border-b border-surface-line pb-4">
          <span>By <Link href="/about" className="font-medium text-ink hover:text-brand-600">Jaspal Singh</Link></span>
          <span>·</span>
          <span>Founder, My Pay Rights</span>
        </div>

        {/* Quick answer — direct response callout */}
        {post.quickAnswer && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Quick answer</p>
            <p className="leading-relaxed">{post.quickAnswer}</p>
          </div>
        )}

        {/* Legal disclaimer */}
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          <strong>For information only.</strong> This article is not legal advice. For advice on your specific situation, consult a qualified employment solicitor or contact{" "}
          <a href="https://www.acas.org.uk" target="_blank" rel="noopener noreferrer" className="underline">ACAS</a> (UK),{" "}
          <a href="https://www.dol.gov" target="_blank" rel="noopener noreferrer" className="underline">DOL</a> (US), or the relevant statutory body for your jurisdiction.
        </div>

        <EditorialReview lastReviewed={post.dateModified} className="mb-8" />

        {/* Article content */}
        {Content ? (
          <article className="prose-tool">
            <Content />
          </article>
        ) : (
          <div className="rounded-xl border border-surface-line bg-surface-muted p-8 text-center text-ink-soft">
            <p className="font-medium">Full article coming soon.</p>
            <p className="mt-1 text-sm">Use the tools below while we finish writing this guide.</p>
          </div>
        )}

        {/* Related tools */}
        {relatedToolMetas.length > 0 && (
          <section className="mt-10 border-t border-surface-line pt-8">
            <h2 className="mb-4 text-base font-bold text-ink">Related calculators</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedToolMetas.map((tool) => tool && (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="group rounded-xl border border-surface-line p-4 transition-colors hover:border-brand-600 hover:bg-brand-50"
                >
                  <p className="font-semibold text-sm text-ink group-hover:text-brand-700">{tool.name} →</p>
                  <p className="mt-1 text-xs text-ink-soft">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="mt-8">
          <Link href="/blog" className="text-sm text-brand-600 hover:underline">← Back to blog</Link>
        </div>
      </div>
    </>
  );
}
