import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

// Generated once at build time for the static export.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Mediapartners-Google", allow: "/" },
      { userAgent: "Google-Display-Ads-Bot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
