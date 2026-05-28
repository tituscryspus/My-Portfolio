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
      <About siteConfig={content.siteConfig} stats={content.stats} />
      <Services siteConfig={content.siteConfig} services={content.services} />
      <Projects projects={content.projects} />
      <Contact siteConfig={content.siteConfig} />
    </>
  );
}
