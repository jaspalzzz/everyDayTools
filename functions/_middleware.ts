export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}) {
  const url = new URL(context.request.url);

  if (url.hostname === "www.mypayrights.com") {
    url.hostname = "mypayrights.com";
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
