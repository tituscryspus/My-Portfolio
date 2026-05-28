import { defineArrayMember, defineField, defineType } from "sanity";
import { CategorySelectInput } from "../components/CategorySelectInput";
import { TechnologiesSelectInput } from "../components/TechnologiesSelectInput";

const blockInlineCreate = {
  disableNew: true,
  creationTypeFilter: () => [],
};

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  description:
    "Pick a category and technologies from your existing lists. Add new ones only under Portfolio → Project Categories or Technologies.",
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
      components: {
        input: CategorySelectInput,
      },
      options: blockInlineCreate,
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
          options: blockInlineCreate,
        }),
      ],
      components: {
        input: TechnologiesSelectInput,
      },
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
