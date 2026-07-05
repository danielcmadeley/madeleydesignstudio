import { defineField, defineType } from "sanity"

export const service = defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "panelColor",
      title: "Panel color",
      type: "string",
      description: "Hex color for the visual panel background, e.g. #C22A52",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "panelInnerColor",
      title: "Panel inner color",
      type: "string",
      description: "Hex color for the large centre rectangle, e.g. #BE0048",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "panelBlockColor",
      title: "Panel block color",
      type: "string",
      description: "Hex color for the small circuit blocks, e.g. #7E1638",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
})
