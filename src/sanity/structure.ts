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
      S.documentTypeListItem("stat").title("Statistics"),
      S.divider(),
      S.listItem()
        .title("Portfolio")
        .child(
          S.list()
            .title("Portfolio")
            .items([
              S.documentTypeListItem("projectCategory").title(
                "Project Categories — add categories here"
              ),
              S.documentTypeListItem("technology").title(
                "Technologies — add technologies here"
              ),
              S.divider(),
              S.documentTypeListItem("project").title(
                "Projects — select category & technologies only"
              ),
            ])
        ),
    ]);
