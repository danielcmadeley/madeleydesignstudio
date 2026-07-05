// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
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