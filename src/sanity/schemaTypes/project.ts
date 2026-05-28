import { defineField, defineType } from "sanity";

const categoryOptions = [
  { title: "Web App", value: "web" },
  { title: "Mobile", value: "mobile" },
  { title: "Full Stack", value: "fullstack" },
  { title: "Design", value: "design" },
];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  description:
    "Portfolio projects. To delete one: open it, click ⋮ (top right), then Delete.",
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
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tags",
      title: "Technologies / Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categoryOptions },
      initialValue: "web",
    }),
    defineField({
      name: "liveUrl",
      title: "Live Demo URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
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
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
