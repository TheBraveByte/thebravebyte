export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Proxy /api/* requests to the external backend
  if (url.pathname.startsWith('/api/')) {
    const backendUrl = 'https://thebravebyte.onrender.com' + url.pathname + url.search;
    return fetch(backendUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
  }

  const response = await next();

  // SPA fallback: serve the prerendered shell (200.html, not index.html — this
  // is a `nuxt generate` SPA) for client-side routes that miss a static asset.
  // The pathname guard prevents this fetch from re-entering the middleware and
  // looping (which is what produced Cloudflare error 1019).
  if (response.status === 404 && url.pathname !== '/200.html') {
    const shell = await fetch(new URL('/200.html', url.origin));
    if (shell.ok) {
      return new Response(await shell.text(), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  }

  return response;
}