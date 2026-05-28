import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Hero siteConfig={content.siteConfig} />
      <About
        siteConfig={content.siteConfig}
        stats={content.stats}
        section={content.pageSections.about}
      />
      <Services
        siteConfig={content.siteConfig}
        services={content.services}
        section={content.pageSections.services}
      />
      <Projects
        projects={content.projects}
        section={content.pageSections.projects}
      />
      <Contact
        siteConfig={content.siteConfig}
        section={content.pageSections.contact}
      />
    </>
  );
}
