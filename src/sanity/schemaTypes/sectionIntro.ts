import { defineField, defineType } from "sanity";

export const sectionIntro = defineType({
  name: "sectionIntro",
  title: "Section Intro",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
      description: 'Small label above the heading, e.g. "About Us"',
    }),
    defineField({
      name: "heading",
      title: "Heading (before highlight)",
      type: "string",
    }),
    defineField({
      name: "headingHighlight",
      title: "Heading Highlight",
      type: "string",
      description: "Shown in gradient color at the end of the heading",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
});

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading (before highlight)",
      type: "string",
    }),
    defineField({
      name: "headingHighlight",
      title: "Heading Highlight",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "First Paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "paragraph2",
      title: "Second Paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "highlights",
      title: "Bullet Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
