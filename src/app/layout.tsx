import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getContent();

  return {
    title: `${siteConfig.businessName} | ${siteConfig.founder.name}`,
    description: `${siteConfig.description} ${siteConfig.descriptionCta}`,
    keywords: [
      "Tkryce Tech Solutions",
      "Lukaye Titus Cryspus",
      "Computer Scientist",
      "web development",
      "software development",
      "technology consulting",
      "portfolio",
    ],
    icons: {
      icon: siteConfig.images.logo,
      apple: siteConfig.images.logo,
    },
    openGraph: {
      title: `${siteConfig.businessName} — ${siteConfig.founder.name}`,
      description: `${siteConfig.description} ${siteConfig.descriptionCta}`,
      type: "website",
      images: [siteConfig.founder.image],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} min-h-screen`}>{children}</body>
    </html>
  );
}
