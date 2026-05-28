import Services from "@/components/Services";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function ServicesPage() {
  const { siteConfig, services, pageSections } = await getContent();
  const { services: servicesSection } = pageSections;

  return (
    <PageShell>
      <PageHeader
        title={servicesSection.pageTitle}
        description={servicesSection.pageDescription}
      />
      <Services siteConfig={siteConfig} services={services} standalone />
    </PageShell>
  );
}
