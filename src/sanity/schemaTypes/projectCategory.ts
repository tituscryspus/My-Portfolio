import { defineField, defineType } from "sanity";

export const projectCategory = defineType({
  name: "projectCategory",
  title: "Project Category",
  type: "document",
  description:
    "Add and manage portfolio filter tabs here (Web Apps, Mobile, etc.). Projects only select from this list — they cannot create categories.",
  fields: [
    defineField({
      name: "title",
      title: "Display Name",
      type: "string",
      description: 'Shown on the filter button, e.g. "Web Apps" or "AI / ML"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 48 },
      description: "Used internally for filtering (auto-generated from the display name).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Filter Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first in the filter bar (after “All Projects”).",
    }),
  ],
  orderings: [
    {
      title: "Filter Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
