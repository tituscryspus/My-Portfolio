import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "document",
  description:
    "Stats in the About section. To delete one: open it, click ⋮ (top right), then Delete.",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'e.g. "50+"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "Projects Delivered"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
