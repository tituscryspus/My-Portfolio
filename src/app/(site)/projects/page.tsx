import Projects from "@/components/Projects";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function ProjectsPage() {
  const { projects, pageSections } = await getContent();
  const { projects: projectsSection } = pageSections;

  return (
    <PageShell>
      <PageHeader
        title={projectsSection.pageTitle}
        description={projectsSection.pageDescription}
      />
      <Projects
        projects={projects}
        section={projectsSection}
        standalone
      />
    </PageShell>
  );
}
