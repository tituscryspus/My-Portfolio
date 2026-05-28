import Contact from "@/components/Contact";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function ContactPage() {
  const { siteConfig, pageSections } = await getContent();
  const { contact } = pageSections;

  return (
    <PageShell>
      <PageHeader
        title={contact.pageTitle}
        description={contact.pageDescription}
      />
      <Contact siteConfig={siteConfig} standalone />
    </PageShell>
  );
}
