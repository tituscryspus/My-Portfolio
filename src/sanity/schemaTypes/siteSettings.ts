import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "images", title: "Images" },
    { name: "founder", title: "Founder" },
  ],
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "text",
      rows: 4,
      group: "general",
    }),
    defineField({
      name: "descriptionCta",
      title: "Hero Call to Action Line",
      type: "string",
      group: "general",
      description: 'Shown on its own line, e.g. "Partner with us to build the future."',
    }),
    defineField({
      name: "email",
      title: "Email Addresses",
      type: "object",
      group: "contact",
      fields: [
        { name: "business", title: "Business Email", type: "string" },
        { name: "personal", title: "Personal Email", type: "string" },
      ],
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      group: "contact",
      description: "International format, e.g. +256 700 123456. Used when visitors send a message.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      group: "contact",
      fields: [
        { name: "github", title: "GitHub URL", type: "url" },
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
        { name: "twitter", title: "Twitter / X URL", type: "url" },
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "images",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background",
      type: "image",
      group: "images",
      options: { hotspot: true },
    }),
    defineField({
      name: "teamImage",
      title: "Team / About Image",
      type: "image",
      group: "images",
      options: { hotspot: true },
    }),
    defineField({
      name: "workspaceImage",
      title: "Workspace Image",
      type: "image",
      group: "images",
      options: { hotspot: true },
    }),
    defineField({
      name: "officeImage",
      title: "Services Background Image",
      type: "image",
      group: "images",
      options: { hotspot: true },
    }),
    defineField({
      name: "founder",
      title: "Founder Profile",
      type: "object",
      group: "founder",
      fields: [
        { name: "name", title: "Full Name", type: "string" },
        { name: "role", title: "Role", type: "string" },
        { name: "title", title: "Professional Title", type: "string" },
        { name: "bio", title: "Bio", type: "text", rows: 5 },
        {
          name: "image",
          title: "Profile Photo",
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
