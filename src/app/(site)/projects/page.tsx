import Projects from "@/components/Projects";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getContent } from "@/lib/content";

export const revalidate = 30;

export default async function ProjectsPage() {
  const { projects, projectCategories, sections } = await getContent();

  return (
    <PageShell>
      <PageHeader
        title="Our Projects"
        description="Explore the digital products and solutions we've built for clients."
      />
      <Projects
        projects={projects}
        projectCategories={projectCategories}
        section={sections.projects}
        standalone
      />
    </PageShell>
  );
}
