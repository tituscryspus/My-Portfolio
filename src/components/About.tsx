"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { pageSections as defaultSections } from "@/data/sections";
import { siteConfig as defaultSiteConfig, stats as defaultStats } from "@/data/site";
import type { AboutSection, SiteConfig, Stat } from "@/types/content";
import AnimatedStat from "./AnimatedStat";
import SectionHeading from "./SectionHeading";

export default function About({
  siteConfig = defaultSiteConfig,
  stats = defaultStats,
  section = defaultSections.about,
  standalone = false,
}: {
  siteConfig?: SiteConfig;
  stats?: Stat[];
  section?: AboutSection;
  standalone?: boolean;
}) {
  return (
    <section id={standalone ? undefined : "about"} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {!standalone && (
              <SectionHeading
                section={section}
                showDescription={false}
                className="text-left"
              />
            )}
            {standalone && (
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {section.heading}{" "}
                <span className="gradient-text">{section.headingHighlight}</span>
              </h2>
            )}
            <p className={`text-lg leading-relaxed text-muted ${standalone ? "mt-4" : "mt-6"}`}>
              {section.description}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">{section.paragraph2}</p>

            <ul className="mt-8 space-y-3">
              {section.highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative mb-8 overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/10]">
                <Image
                  src={siteConfig.images.team}
                  alt="Team collaborating on technology projects"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized={siteConfig.images.team.startsWith("http")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>

            <div className="glass glow rounded-2xl p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/50">
                  <Image
                    src={siteConfig.founder.image}
                    alt={siteConfig.founder.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized={siteConfig.founder.image.startsWith("http")}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{siteConfig.founder.name}</h3>
                  <p className="text-sm text-primary">{siteConfig.founder.role}</p>
                  <p className="mt-0.5 text-xs text-muted">{siteConfig.founder.title}</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted">{siteConfig.founder.bio}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={i * 120}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
