import Contact from "@/components/Contact";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getContent } from "@/lib/content";

export const revalidate = 30;

export default async function ContactPage() {
  const { siteConfig, sections } = await getContent();

  return (
    <PageShell>
      <PageHeader
        title="Contact Us"
        description="Reach out for business inquiries or connect with Lukaye personally."
      />
      <Contact siteConfig={siteConfig} section={sections.contact} standalone />
    </PageShell>
  );
}
