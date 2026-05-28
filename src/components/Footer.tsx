import Link from "next/link";
import { navLinks } from "@/data/navigation";
import Logo from "@/components/Logo";
import type { SiteConfig } from "@/types/content";

export default function Footer({ siteConfig }: { siteConfig: SiteConfig }) {
  const currentYear = new Date().getFullYear();
  const footerLinks = navLinks.filter((link) => link.href !== "/");

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" className="shrink-0">
            <Logo siteConfig={siteConfig} size="footer" />
          </Link>

          <p className="text-center text-sm text-muted">
            &copy; {currentYear} {siteConfig.businessName}. Founded by{" "}
            {siteConfig.founder.name}.
          </p>

          <div className="flex gap-6 text-sm text-muted">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
