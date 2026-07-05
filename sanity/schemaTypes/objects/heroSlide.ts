import { defineField, defineType } from "sanity"

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero slide",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "slug",
      options: { source: "verticalLabel", maxLength: 32 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "verticalLabel",
      title: "Vertical label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtext",
      title: "Subtext",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logoImage",
      title: "Logo image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logoImageAlt",
      title: "Logo image alt text",
      type: "string",
    }),
    defineField({
      name: "continuationImage",
      title: "Continuation image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "continuationImageAlt",
      title: "Continuation image alt text",
      type: "string",
    }),
    defineField({
      name: "sections",
      title: "Unique sections",
      type: "array",
      of: [{ type: "pageSection" }],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),
  ],
  preview: {
    select: {
      title: "verticalLabel",
      subtitle: "headline",
      media: "logoImage",
    },
  },
})
