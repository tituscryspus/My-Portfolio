import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "tkryce-tech-solutions",
  title: "Tkryce Tech Solutions",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, { schemaType }) => {
      if (schemaType === "siteSettings") {
        return prev.filter(({ action }) => action !== "delete");
      }
      return prev;
    },
  },
});
