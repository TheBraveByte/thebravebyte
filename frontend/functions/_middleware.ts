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

  // For SPA routing: if the response is 404, serve index.html instead
  const response = await next();
  if (response.status === 404) {
    const indexResponse = await fetch(new URL('/index.html', request.url));
    return new Response(await indexResponse.text(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  return response;
}