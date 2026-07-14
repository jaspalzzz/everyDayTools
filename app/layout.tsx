import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AdSenseScript } from "@/components/AdSenseScript";
import { Analytics } from "@/components/Analytics";
import { ConsentBanner } from "@/components/ConsentBanner";
import { ADSENSE_CLIENT } from "@/lib/adsense";
import { SITE } from "@/lib/seo";

const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION ?? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;
const yandexSiteVerification = process.env.YANDEX_SITE_VERIFICATION;
const adsenseAccount = ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: "%s",
  },
  description:
    "Free, law-backed pay rights calculators — redundancy pay, PTO payout, notice period, severance and overtime. Live results, no signup, instant PDF.",
  applicationName: SITE.name,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...(bingSiteVerification ? { other: { "msvalidate.01": bingSiteVerification } } : {}),
    ...(yandexSiteVerification ? { yandex: yandexSiteVerification } : {}),
  },
  alternates: {
    canonical: SITE.url,
    languages: {
      "en": SITE.url,
      "en-GB": `${SITE.url}/uk`,
      "en-US": `${SITE.url}/us`,
      "en-CA": `${SITE.url}/ca`,
      "en-AU": `${SITE.url}/au`,
      "fr-CA": `${SITE.url}/fr`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Free, law-backed pay rights calculators — redundancy pay, PTO payout, notice period, severance and overtime. Live results, no signup, instant PDF.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Free, law-backed pay rights calculators. Live results, no signup, instant PDF.",
    images: ["/twitter-image"],
  },
  ...(adsenseAccount ? { other: { "google-adsense-account": adsenseAccount } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <AdSenseScript />
        <Analytics />
      </head>
      <body>
        <SiteHeader />
        <main id="page-content">{children}</main>
        <SiteFooter />
        <ConsentBanner />
      </body>
    </html>
  );
}
