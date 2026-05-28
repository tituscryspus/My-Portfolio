import About from "@/components/About";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function AboutPage() {
  const { siteConfig, stats, pageSections } = await getContent();
  const { about } = pageSections;

  return (
    <PageShell>
      <PageHeader
        title={about.pageTitle}
        description={about.pageDescription}
      />
      <About
        siteConfig={siteConfig}
        stats={stats}
        section={about}
        standalone
      />
    </PageShell>
  );
}
