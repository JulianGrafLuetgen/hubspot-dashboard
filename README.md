# HubSpot Insights Dashboard (Monorepo)

Monorepo managed with pnpm, containing:

- `backend`: TypeScript + Express API
- `frontend`: Nuxt 4 + Vue 3 app
- `packages/pandas-facade`: Typed façade and docs for data processing helpers

See `_Original_Task/CHALLENGE.md` for full challenge requirements.

## Quick Start

Prereqs: Node 22+, pnpm installed.

```bash
pnpm install
pnpm dev
```

This runs backend and frontend in parallel.

## Scripts

- `pnpm dev`: run all workspaces
- `pnpm build`: build all
- `pnpm start`: start all
- `pnpm clean`: remove build artifacts across workspaces
- `pnpm docs`: build façade and generate TypeDoc markdown into `packages/pandas-facade/docs/api`

## Backend

- Port: `PORT` env (default 3001)
- Endpoints:
  - `GET /api/health` → `{ status, timestamp, service }`
  - `GET /api/hubspot-data` → `{ success, data, timestamp }`

## Frontend

- Nuxt 4, Tailwind via `https://github.com/atinux/content-wind/` and `@nuxtjs/tailwindcss`
- Composable `useHubSpotData` fetches from `http://localhost:3001/api/hubspot-data`