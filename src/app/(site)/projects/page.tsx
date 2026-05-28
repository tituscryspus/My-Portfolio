import Projects from "@/components/Projects";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function ProjectsPage() {
  const { projects, sections } = await getContent();

  return (
    <PageShell>
      <PageHeader
        title="Our Projects"
        description="Explore the digital products and solutions we've built for clients."
      />
      <Projects projects={projects} section={sections.projects} standalone />
    </PageShell>
  );
}
