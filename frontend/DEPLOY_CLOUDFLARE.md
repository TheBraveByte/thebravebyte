# Deploying the Brave Byte frontend to Cloudflare Pages

This document explains how to deploy the `frontend/` Nuxt site to Cloudflare Pages. You already host the backend elsewhere — this guide assumes the frontend will be a static build that calls your backend via `NUXT_PUBLIC_API_BASE`.

---

## Recommendation (simplest)

- Use static generation (`nuxt generate`) and publish the `dist` folder to Cloudflare Pages.
- Configure `NUXT_PUBLIC_API_BASE` in the Pages environment variables to point to your backend (include `/api` if your backend expects it, e.g. `https://thebravebyte.onrender.com/api`).

Why static? It's the simplest, faster, and doesn't require Cloudflare Functions if you only need a static frontend that calls an external API.

---

## Build settings for Cloudflare Pages (UI)

- **Framework preset**: "None" (or pick "Other")
- **Build command**: `npm run generate`
- **Build output directory**: `dist`
- **Root directory**: `frontend` (if you point Pages to repo root, set this to `frontend`)

Note: In this repo `frontend/package.json` defines a `generate` script (`nuxt generate`). This outputs a static `dist` folder.

---

## Required environment variables (Pages -> Project settings -> Environment variables)

- `NUXT_PUBLIC_API_BASE` — the full base URL to your backend API. Example:

  - `https://thebravebyte.onrender.com/api`

Set any other secrets used by client code here. Do NOT store server-only secrets in the frontend.

---

## CLI / Wrangler option

If you prefer CLI deploys (not GitHub integration), you can build locally and publish static assets with Wrangler:

```bash
# from repo root
cd frontend
npm ci
npm run generate
# publish the generated `dist` folder
npx wrangler pages publish dist --project-name=thebravebyte
```

If you want to automate via GitHub Actions, enable Cloudflare Pages GitHub integration in the Pages dashboard — this is the straightforward flow.

---

## Notes about SSR / Nitro

This guide uses static generation. If you later need SSR (server-side rendering) and Cloudflare Functions, the workflow changes:

- Build with `npm run build` to create `.output` (server and public). You'd deploy `.output/public` with Pages and configure Functions.
- That path is more complex and requires extra configuration; only use it when you need server-side rendering or server routes on Cloudflare.

---

## Quick checklist before deploy

- [ ] Confirm backend is reachable at `NUXT_PUBLIC_API_BASE`.
- [ ] Set `NUXT_PUBLIC_API_BASE` in Pages environment variables.
- [ ] Choose Pages project root: `frontend`.
- [ ] Set build command to `npm run generate` and output dir to `dist`.
- [ ] (Optional) Add `CNAME` or custom domain in Pages and set DNS.

---

## Troubleshooting

- If your browser's Network tab shows requests to `/api/...` on the Pages host, it means `NUXT_PUBLIC_API_BASE` wasn't set or the frontend build didn't pick it up. Ensure you set the Pages env var (not just account-level envs).
- If you get 404 on article pages but the request URL is correct (points to your backend), check the backend logs and the slug/ID value being requested.

---

If you want, I can:

- Add a small GitHub Actions workflow that builds the frontend and calls `wrangler pages publish dist` on push to `main`.
- Create a small `composables/api.ts` helper to centralize `useRuntimeConfig().public.apiBase` usage across the frontend.

Which option would you like next? (Add GH Action, add composable, or just deploy manually?)
