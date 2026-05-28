import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedBackground from "@/components/AnimatedBackground";
import { getContent } from "@/lib/content";

export const revalidate = 30;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { siteConfig } = await getContent();

  return (
    <>
      <AnimatedBackground />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar siteConfig={siteConfig} />
      <main>{children}</main>
      <Footer siteConfig={siteConfig} />
    </>
  );
}
