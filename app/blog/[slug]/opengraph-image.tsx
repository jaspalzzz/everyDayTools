import { BLOG_POSTS, getBlogPost } from "@/data/blogPosts";
import { articleOgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Emitted per post so the static export contains a real image for every article.
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

/** Keep the card readable — long excerpts overflow the 1200x630 canvas. */
function clampExcerpt(value: string, max = 150): string {
  const text = value.trim();
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max) || max).trimEnd()}…`;
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return articleOgCard({
    title: post?.title ?? "My Pay Rights",
    excerpt: clampExcerpt(post?.excerpt ?? "Law-backed employment pay guidance."),
    region: post?.region ?? "Global",
  });
}
