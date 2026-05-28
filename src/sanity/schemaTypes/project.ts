import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  description:
    "Assign an existing category and technologies only. Add new categories under Project Categories and new technologies under Technologies.",
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
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "projectCategory" }],
      description:
        "Select one category from the list. To add a new category, go to Project Categories in the sidebar first.",
      options: {
        disableNew: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Technologies",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "technology" }],
          options: {
            disableNew: true,
          },
        }),
      ],
      description:
        "Select technologies that apply to this project. Click Add item, then search and pick from the list. To add a new technology, go to Technologies in the sidebar first.",
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
    select: {
      title: "title",
      subtitle: "category.title",
      media: "image",
    },
  },
});
