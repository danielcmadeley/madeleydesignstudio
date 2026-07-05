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
