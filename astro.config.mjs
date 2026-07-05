// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig, envField } from "astro/config"
import react from "@astrojs/react"
import cloudflare from "@astrojs/cloudflare"

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sanity({
      projectId: "a0grmhhc",
      dataset: "production",
      apiVersion: "2026-03-01",
      useCdn: false,
      studioBasePath: "/admin",
    }),
  ],
})