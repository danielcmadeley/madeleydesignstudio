import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "defaultTitle",
      title: "Default page title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "defaultDescription",
      title: "Default meta description",
      description:
        "Used for search results and social shares when a page has no description of its own (~150–160 characters).",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      description:
        "Shown when pages are shared on social platforms (1200×630 recommended). Falls back to /og-image.png.",
      type: "image",
    }),
    defineField({
      name: "headerCta",
      title: "Header call to action",
      type: "ctaLink",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
})
