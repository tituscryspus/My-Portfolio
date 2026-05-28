import { defineField, defineType } from "sanity";

const iconOptions = [
  { title: "Web Development (Code)", value: "Code2" },
  { title: "Mobile (Smartphone)", value: "Smartphone" },
  { title: "Cloud & DevOps", value: "Cloud" },
  { title: "UI/UX Design", value: "Palette" },
  { title: "Backend / Database", value: "Database" },
  { title: "Consulting / Security", value: "Shield" },
];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: iconOptions },
      initialValue: "Code2",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "icon" },
  },
});
