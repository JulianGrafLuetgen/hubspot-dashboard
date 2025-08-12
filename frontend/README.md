# HubSpot Insights Frontend

A minimal Nuxt 4 app for visualizing HubSpot data using Vue 3, Tailwind CSS, and Chart.js.

## Development

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Build: `pnpm build`
- Start (prod): `pnpm start`
- Clean: `pnpm clean`

## Structure

- `app/pages/index.vue` – Headline, filter bar placeholder, chart placeholder
- `app/pages/about.vue` – Project notes and time blocks
- `plugins/chart.client.ts` – Chart.js registration
- `public/data.json` – Data source for fetch-based loading

## Notes

- Default theme is dark; toggle available in navbar.
- Nuxt Content and template branding removed.
