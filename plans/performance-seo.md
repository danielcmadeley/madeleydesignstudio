# Performance & SEO plan

Tracking the work to make the marketing site fast, crawlable, and well-ranked.
Started 2026-07-05. Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms, Lighthouse 95+.

## ✅ Done (in code)

### Images
- [x] Sanity images now served through the Sanity image CDN with transforms
      (`auto=format` → WebP/AVIF, `fit=max`, `q=80`, explicit widths) instead of
      full-size original PNGs — see `src/lib/sanity/image.ts`
- [x] Responsive `srcset`/`sizes` + intrinsic `width`/`height` (CLS guard) on the
      full-width hero continuation images
- [x] Hero logo images capped at 400w; first slide `loading="eager"` +
      `fetchpriority="high"`, later slides lazy
- [x] Footer castle moved to `src/assets/` and rendered via `astro:assets`
      `<Image>` (build-time WebP: 192KB PNG → 20–36KB WebP per breakpoint)
- [x] `imageService: "compile"` on the Cloudflare adapter so image processing
      happens at build time (sharp can't run on Workers)
- [x] ~6MB of seed-source hero PNGs moved out of `public/` (no longer shipped
      with every deploy) to `scripts/assets/`; seed script updated

### Crawling & indexing
- [x] `site: "https://madeleydesignstudio.com"` set in `astro.config.mjs`
- [x] `@astrojs/sitemap` generating `sitemap-index.xml` (excludes `/admin`)
- [x] `public/robots.txt` — allows all, disallows `/admin` + `/api/`, points at sitemap

### Meta tags & social
- [x] Layout (`src/layouts/main.astro`) now emits: meta description, canonical
      URL, Open Graph (type/site_name/title/description/url/image), Twitter card
- [x] Per-page `title`/`description` props passed from company, forge, studio,
      and get-your-software pages; index falls back to Sanity site settings
- [x] Sanity `siteSettings` schema gained `defaultDescription` and `ogImage`
      fields (query, types, and seed script updated)
- [x] JSON-LD structured data (Organization + WebSite) on every page
- [x] Placeholder OG image at `public/og-image.png` (1200×630, brand colors)

### Delivery
- [x] `prefetch: { prefetchAll: true }` — links prefetch for instant navigation
- [x] Hashed `/_astro/*` assets get immutable Cache-Control (adapter injects `_headers`)

## ⏳ Remaining — needs a human / external account

- [ ] **Populate Sanity SEO content**: run `bun run seed:sanity` (needs
      `SANITY_API_WRITE_TOKEN`) or fill in "Default meta description" and
      "Social share image" in the Studio at `/admin`. Until then the home page
      has no meta description.
- [ ] **Google Search Console**: verify madeleydesignstudio.com, submit
      `https://madeleydesignstudio.com/sitemap-index.xml`, monitor Core Web Vitals
      and indexing reports.
- [ ] **Cloudflare dashboard toggles**: enable Early Hints and Speed Brain
      (Speed → Optimization); confirm HTTP/3 is on.
- [ ] **Analytics**: enable Cloudflare Web Analytics (free, ~1KB beacon) rather
      than GA4 to avoid a Core Web Vitals hit.
- [ ] **Designed OG image**: `public/og-image.png` is a generated placeholder
      (Arial). Replace with a designed 1200×630 export using the Outfit
      wordmark, or upload one to the new Sanity `ogImage` field.
- [ ] **Bing Webmaster Tools**: optional, imports from Search Console in one click.

## 📋 Backlog — future code work

- [ ] Fix the footer "Join the team!" link — it points at `/careers`, which
      doesn't exist (404s hurt crawl quality). Create the page or remove the link.
- [ ] Real content + unique H1/meta for the thin placeholder pages
      (company/forge/studio) — thin content ranks poorly.
- [ ] `X-Robots-Tag: noindex` header for `/admin` (robots.txt disallow only
      stops crawling, not indexing of the URL itself).
- [ ] Preload the primary Outfit woff2 in the layout head if font swap flash
      becomes noticeable.
- [ ] Audit `client:` directives as React islands get added — prefer
      `client:visible` below the fold; keep heavy deps (recharts, swiper) off
      the marketing pages.
- [ ] Lighthouse CI (or a PageSpeed check) in the deploy workflow once CI exists.
- [ ] Alt text: hero/continuation images have Sanity-driven alt fields — keep
      them descriptive as real content lands.

## Verification log

- 2026-07-05: `bun run build` ✅ — sitemap emitted, canonical/OG/JSON-LD present
  in `dist/client/index.html`, Sanity srcsets requesting `auto=format&q=80`,
  footer castle compiled to WebP (20–36KB). `astro check` has 3 pre-existing
  errors (tailwind vite plugin type, `sanity:client` virtual module types) —
  unrelated to this work. `bun run lint`: 16 pre-existing errors, all in stock
  `src/components/ui/*` shadcn files.
