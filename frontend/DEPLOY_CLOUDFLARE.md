# Deploying TheBraveByte Frontend to Cloudflare Pages

This repo now uses one canonical Cloudflare Pages deployment path for the `thebravebyte` project.

## Source of Truth

- Pages project: `thebravebyte`
- GitHub workflow: `.github/workflows/deploy-frontend-pages.yml`
- Frontend root: `frontend/`
- Build output: `frontend/dist`

## Deployment Model

The frontend is deployed as a static Nuxt build using `nuxt generate`.

- Build command: `npm run generate`
- Output directory: `dist`
- Wrangler deploy target: `wrangler pages deploy dist --project-name=thebravebyte --branch=main`

## GitHub Actions

The workflow deploys automatically on pushes to `main` when files under `frontend/**` change.

Required GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `NUXT_PUBLIC_API_BASE`

## Manual Deploy

From the repo root:

```bash
cd frontend
npm ci
npm run generate
npx wrangler pages deploy dist --project-name=thebravebyte --branch=main
```

## Cloudflare Pages Settings

- Project name: `thebravebyte`
- Production branch: `main`
- Environment variable:
  - `NUXT_PUBLIC_API_BASE=https://thebravebyte.onrender.com/api`

## Notes

- This setup intentionally avoids `.output/public` and SSR-specific deployment steps.
- Keep only the GitHub workflow above as the Pages deploy path for this project.
