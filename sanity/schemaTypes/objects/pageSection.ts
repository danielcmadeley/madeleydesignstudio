import { defineField, defineType } from "sanity"

export const pageSection = defineType({
  name: "pageSection",
  title: "Page section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "backgroundColor",
      title: "Background color",
      type: "string",
      description: "Hex color, e.g. #FDE9C1",
      validation: (Rule) => Rule.required(),
    }),
  ],
})
