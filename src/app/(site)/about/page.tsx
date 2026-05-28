import About from "@/components/About";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getContent } from "@/lib/content";

export const revalidate = 30;

export default async function AboutPage() {
  const { siteConfig, stats, sections } = await getContent();

  return (
    <PageShell>
      <PageHeader
        title="About Us"
        description={`Meet ${siteConfig.founder.name} and learn about ${siteConfig.businessName}.`}
      />
      <About siteConfig={siteConfig} stats={stats} section={sections.about} standalone />
    </PageShell>
  );
}
