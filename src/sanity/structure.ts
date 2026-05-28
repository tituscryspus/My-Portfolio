import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Tkryce Tech Solutions")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("projectCategory").title("Project Categories"),
      S.documentTypeListItem("technology").title("Technologies"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("stat").title("Statistics"),
    ]);
