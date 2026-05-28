"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig as defaultSiteConfig } from "@/data/site";
import type { SiteConfig } from "@/types/content";

export default function Hero({ siteConfig = defaultSiteConfig }: { siteConfig?: SiteConfig }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 sm:pt-32 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={siteConfig.images.hero}
          alt="Technology and digital innovation"
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
          unoptimized={siteConfig.images.hero.startsWith("http")}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
            >
              {siteConfig.founder.name} · {siteConfig.founder.title}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
            >
              Building Digital Solutions
              <br />
              <span className="gradient-text">That Drive Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-lg text-muted lg:mx-0 md:text-xl"
            >
              {siteConfig.description}
              <br />
              <span className="mt-2 inline-block font-medium text-foreground">
                {siteConfig.descriptionCta}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                Start a Project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-white/5"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="glass glow overflow-hidden rounded-2xl p-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={siteConfig.images.workspace}
                  alt="Developer workspace with laptop and code"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized={siteConfig.images.workspace.startsWith("http")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-xl">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <p className="font-mono text-xs text-primary">tkryce.ready = true</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-16 max-w-5xl lg:hidden"
        >
          <div className="glass glow overflow-hidden rounded-2xl p-1">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={siteConfig.images.workspace}
                alt="Developer workspace"
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized={siteConfig.images.workspace.startsWith("http")}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
