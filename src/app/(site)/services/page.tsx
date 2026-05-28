import Services from "@/components/Services";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function ServicesPage() {
  const { siteConfig, services, sections } = await getContent();

  return (
    <PageShell>
      <PageHeader
        title="Our Services"
        description="Comprehensive technology solutions tailored to your business needs."
      />
      <Services
        siteConfig={siteConfig}
        services={services}
        section={sections.services}
        standalone
      />
    </PageShell>
  );
}
