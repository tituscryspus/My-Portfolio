import Image from "next/image";
import type { SiteConfig } from "@/types/content";

type LogoProps = {
  siteConfig: SiteConfig;
  size?: "nav" | "footer";
  className?: string;
};

const sizes = {
  nav: { width: 180, height: 64, className: "h-10 w-auto sm:h-11 md:h-12" },
  footer: { width: 180, height: 64, className: "h-11 w-auto sm:h-12" },
};

export default function Logo({ siteConfig, size = "nav", className = "" }: LogoProps) {
  const { width, height, className: sizeClass } = sizes[size];
  const isExternal = siteConfig.images.logo.startsWith("http");

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-white px-2.5 py-1.5 shadow-lg shadow-black/20 ring-1 ring-white/80 sm:rounded-2xl sm:px-3 sm:py-2 ${className}`}
    >
      <Image
        src={siteConfig.images.logo}
        alt={siteConfig.businessName}
        width={width}
        height={height}
        className={`${sizeClass} object-contain object-center`}
        priority={size === "nav"}
        quality={100}
        unoptimized={isExternal}
      />
    </span>
  );
}
