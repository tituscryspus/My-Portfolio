import { defineField, defineType } from "sanity";

export const technology = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  description:
    "Add and manage technology names here (Next.js, Figma, etc.). Projects only select from this list — they cannot create technologies.",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'e.g. "Next.js", "PostgreSQL", or "Figma"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
      description: "Optional — controls order in the Technologies list.",
    }),
  ],
  orderings: [
    {
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name" },
  },
});
