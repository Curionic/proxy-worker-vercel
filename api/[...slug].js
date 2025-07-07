export default async function handler(req) {
  const url = new URL(req.url);
  const target = `https://winter-fire-e164.curionicone.workers.dev${url.pathname}${url.search}`;
  const res = await fetch(target, {
    method: req.method,
    headers: req.headers,
    body: req.body
  });
  const body = await res.arrayBuffer();
  const headers = new Headers(res.headers);
  headers.set("x-proxied-by", "vercel");
  return new Response(body, {
    status: res.status,
    headers
  });
}
