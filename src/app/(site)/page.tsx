import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/content";

export const revalidate = 30;

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Hero siteConfig={content.siteConfig} />
      <About
        siteConfig={content.siteConfig}
        stats={content.stats}
        section={content.sections.about}
      />
      <Services
        siteConfig={content.siteConfig}
        services={content.services}
        section={content.sections.services}
      />
      <Projects
        projects={content.projects}
        projectCategories={content.projectCategories}
        section={content.sections.projects}
      />
      <Contact siteConfig={content.siteConfig} section={content.sections.contact} />
    </>
  );
}
