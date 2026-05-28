import { defineField } from "sanity";

export function sectionIntroFields() {
  return [
    defineField({
      name: "eyebrow",
      title: "Section Label",
      type: "string",
      description: 'Small label above the heading, e.g. "About Us"',
    }),
    defineField({
      name: "title",
      title: "Heading (before highlight)",
      type: "string",
      description: 'Main heading text before the colored word, e.g. "Technology Partners You Can"',
    }),
    defineField({
      name: "titleHighlight",
      title: "Heading Highlight",
      type: "string",
      description: 'Word shown in gradient color, e.g. "Trust"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pageTitle",
      title: "Standalone Page Title",
      type: "string",
      description: "Title on the dedicated page header (e.g. /about)",
    }),
    defineField({
      name: "pageDescription",
      title: "Standalone Page Description",
      type: "text",
      rows: 2,
      description: "Subtitle on the dedicated page header",
    }),
  ];
}
