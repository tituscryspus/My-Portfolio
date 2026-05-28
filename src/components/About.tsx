"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { siteConfig as defaultSiteConfig, stats as defaultStats } from "@/data/site";
import type { SiteConfig, Stat } from "@/types/content";

const highlights = [
  "End-to-end project delivery from concept to launch",
  "Agile methodology with transparent communication",
  "Scalable solutions built for long-term growth",
  "Dedicated support and maintenance packages",
];

export default function About({
  siteConfig = defaultSiteConfig,
  stats = defaultStats,
  standalone = false,
}: {
  siteConfig?: SiteConfig;
  stats?: Stat[];
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
              <>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  About Us
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Technology Partners You Can{" "}
                  <span className="gradient-text">Trust</span>
                </h2>
              </>
            )}
            {standalone && (
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Technology Partners You Can{" "}
                <span className="gradient-text">Trust</span>
              </h2>
            )}
            <p className={`text-lg leading-relaxed text-muted ${standalone ? "mt-4" : "mt-6"}`}>
              {siteConfig.businessName} is a forward-thinking technology company
              founded by {siteConfig.founder.name}, a {siteConfig.founder.title}{" "}
              specializing in custom software development, digital products, and
              IT consulting. We combine technical excellence with business
              insight to deliver solutions that make a real impact.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              From startups to enterprises, we help organizations navigate their
              digital transformation journeys with confidence — backed by
              computer science expertise and real-world engineering experience.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((item, i) => (
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
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass rounded-xl p-6 text-center"
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
