import { defineField, defineType } from "sanity"

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "heroCycleSeconds",
      title: "Hero auto-cycle interval (seconds)",
      type: "number",
      initialValue: 6,
      validation: (Rule) => Rule.required().min(3).max(30),
    }),
    defineField({
      name: "continuationTagline",
      title: "Continuation tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSlides",
      title: "Hero slides",
      type: "array",
      of: [{ type: "heroSlide" }],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "service" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "pageSection",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
})
