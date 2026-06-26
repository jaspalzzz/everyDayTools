/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pure static export — emits an `out/` directory of HTML/CSS/JS with no
  // server runtime. Deployed free on Cloudflare Pages as static assets.
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // next/image's default optimizer needs a server; disable it for static export.
  images: { unoptimized: true },
};

export default nextConfig;
