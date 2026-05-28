import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getContent } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { siteConfig } = await getContent();

  return (
    <>
      <ScrollToTop />
      <Navbar siteConfig={siteConfig} />
      <main>{children}</main>
      <Footer siteConfig={siteConfig} />
    </>
  );
}
