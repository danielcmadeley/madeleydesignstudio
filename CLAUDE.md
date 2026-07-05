# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for Madeley Design Studio. Astro 6 + React 19 islands, deployed to Cloudflare Workers, with content managed in Sanity.

## Commands

Bun is the package manager (`bun.lock`).

```bash
bun run dev          # start dev server
bun run build        # production build to dist/
bun run preview      # preview the build
bun run lint         # eslint
bun run format       # prettier (ts, tsx, astro)
bun run typecheck    # astro check
bun run seed:sanity  # seed Sanity content (needs SANITY_API_WRITE_TOKEN in .env)
bunx wrangler deploy # deploy to Cloudflare Workers
```

There are no tests.

## Architecture

**Rendering model:** Astro's default static output — pages are prerendered at build time and served as Cloudflare Worker assets (`wrangler.jsonc` binds `dist/` as ASSETS). Only `src/pages/api/get-your-software.ts` opts into server rendering (`export const prerender = false`) via the `@astrojs/cloudflare` adapter.

**Content flow (Sanity):** All page copy lives in Sanity, not in components.
- `src/lib/sanity/queries.ts` — GROQ queries (singleton docs `siteSettings` and `homePage`)
- `src/lib/sanity/content.ts` — fetch wrappers + view-model transforms (`toHeroSlides`, `toVerticalSections`); these throw with a "run seed:sanity" message if content is missing
- `src/lib/sanity/types.ts` / `image.ts` — types and `urlFor`/`imageUrl` image URL builders
- Schemas live in `sanity/schemaTypes/`; Sanity Studio is mounted at `/admin` (config in `astro.config.mjs` and `sanity.config.ts`)

Pages fetch via `content.ts` and pass typed props down: page → `src/layouts/main.astro` (takes `siteSettings`) → components. When adding content fields: schema → query → type → transform → component.

**Enquiry form:** `/get-your-software` posts to `POST /api/get-your-software`, which validates, renders `src/emails/inquiry-email.tsx` (React Email) and sends via Resend. `RESEND_API_KEY` is a typed server secret declared in the `env.schema` block of `astro.config.mjs` and imported from `astro:env/server`. The from-address domain must stay verified in Resend.

**Components:**
- `src/components/ui/` — shadcn components (style `base-mira`, Phosphor icons); add with `bunx shadcn@latest add <name>`
- `src/components/landing-page/` — home page sections (hero grid/slides system)
- `src/components/universal/` — header, shared page hero
- GSAP is used for animation

## SEO & performance

`src/layouts/main.astro` owns all head tags: pass optional `title`/`description`/`ogImage` props per page (falls back to Sanity `siteSettings.defaultDescription` / `ogImage` / `/og-image.png`). Sanity images must go through `imageUrl(source, width)` / `imageSrcSet` in `src/lib/sanity/image.ts` so the Sanity CDN serves resized WebP/AVIF — never call `urlFor(...).url()` raw. Static images belong in `src/assets/` rendered with `astro:assets` `<Image>` (the Cloudflare adapter uses `imageService: "compile"`; sharp can't run on Workers). Ongoing SEO/perf work is tracked in `plans/performance-seo.md`.

## Styling conventions

Tailwind v4 — no tailwind config file; theme is defined in `@theme` blocks in `src/styles/global.css`.

- Use the theme tokens, not arbitrary hex: `text-brand-red`, `bg-cream`, `bg-sand`, `text-ink`, `mt-header`
- The header is fixed at 50px (`--spacing-header`). The first section of any page needs `mt-header` (or `mt-[50px]`) plus `min-h-[calc(100svh-50px)]` to clear it
- Path alias `@/*` → `src/*`
