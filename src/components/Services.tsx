"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Cloud,
  Palette,
  Database,
  Shield,
  LucideIcon,
} from "lucide-react";
import SectionIntro from "@/components/SectionIntro";
import { services as defaultServices, siteConfig as defaultSiteConfig } from "@/data/site";
import { defaultPageSections } from "@/data/sections";
import type { SectionIntro as SectionIntroContent, Service, SiteConfig } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Cloud,
  Palette,
  Database,
  Shield,
};

export default function Services({
  siteConfig = defaultSiteConfig,
  services = defaultServices as Service[],
  section = defaultPageSections.services,
  standalone = false,
}: {
  siteConfig?: SiteConfig;
  services?: Service[];
  section?: SectionIntroContent;
  standalone?: boolean;
}) {
  return (
    <section id={standalone ? undefined : "services"} className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={siteConfig.images.office}
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          sizes="100vw"
          aria-hidden
          unoptimized={siteConfig.images.office.startsWith("http")}
        />
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {!standalone && <SectionIntro section={section} />}

        <div
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${standalone ? "" : "mt-16"}`}
        >
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group glass rounded-2xl p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 transition-colors group-hover:from-primary/30 group-hover:to-accent/30">
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
