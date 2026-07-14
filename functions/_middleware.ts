export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}) {
  const url = new URL(context.request.url);
  let shouldRedirect = false;

  if (url.hostname === "www.mypayrights.com") {
    url.hostname = "mypayrights.com";
    shouldRedirect = true;
  }

  const lowercasePath = url.pathname.toLowerCase();
  if (lowercasePath !== url.pathname) {
    url.pathname = lowercasePath;
    shouldRedirect = true;
  }

  if (shouldRedirect) return Response.redirect(url.toString(), 301);

  const response = await context.next();
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("text/html")) return response;

  // Static Next.js exports contain inline hydration scripts. At the edge we
  // nonce every script in the HTML response, then issue the matching CSP.
  // This keeps the static deployment compatible without relying on
  // script-src 'unsafe-inline'.
  const nonce = crypto.randomUUID().replaceAll("-", "");
  const html = (await response.text()).replace(
    /<script(?![^>]*\snonce=)/gi,
    `<script nonce="${nonce}"`,
  );
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");
  headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      `script-src 'nonce-${nonce}' 'strict-dynamic' 'self' https://pagead2.googlesyndication.com https://googletagservices.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://static.cloudflareinsights.com`,
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "font-src 'self' https://cdn.jsdelivr.net data:",
      "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
      "connect-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://cloudflareinsights.com",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "require-trusted-types-for 'script'",
      "trusted-types * 'allow-duplicates'",
    ].join("; "),
  );

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
