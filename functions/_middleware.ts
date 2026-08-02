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

  // Canonicalise mixed-case *routes* to lowercase, but never rewrite a request
  // for a file. Static assets are served by exact name, so lowercasing a
  // capitalised filename redirects to a path that does not exist -- which is
  // what happened to /BingSiteAuth.xml, the Bing Webmaster Tools verification
  // file, before this guard. Page routes on this site have no extension, so
  // keying on "has a file extension" separates the two cleanly.
  const hasFileExtension = /\.[a-z0-9]+$/i.test(url.pathname);
  const lowercasePath = url.pathname.toLowerCase();
  if (!hasFileExtension && lowercasePath !== url.pathname) {
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
  // Own the HTML edge-cache TTL explicitly. Without this the platform default
  // (observed: s-maxage=604800, i.e. 7 days) kept deleted/updated pages alive
  // at the edge for a week. A short shared-cache window lets content changes and
  // route deletions propagate within minutes while still offloading most traffic
  // from the origin. Browsers always revalidate (max-age=0); the per-request CSP
  // nonce also rotates each time the edge copy expires. /_next/static/* is
  // content-hashed and keeps its long immutable cache via public/_headers.
  headers.set("Cache-Control", "public, max-age=0, s-maxage=600, must-revalidate");
  headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      `script-src 'nonce-${nonce}' 'strict-dynamic' 'self' https://pagead2.googlesyndication.com https://googletagservices.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://fundingchoicesmessages.google.com https://static.cloudflareinsights.com`,
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "font-src 'self' https://cdn.jsdelivr.net data:",
      "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://fundingchoicesmessages.google.com",
      "connect-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://cloudflareinsights.com",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://fundingchoicesmessages.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  );

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
