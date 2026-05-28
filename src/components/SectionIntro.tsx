"use client";

import { motion } from "framer-motion";
import type { SectionIntro as SectionIntroContent } from "@/types/content";

type SectionIntroProps = {
  section: SectionIntroContent;
  centered?: boolean;
};

export default function SectionIntro({
  section,
  centered = true,
}: SectionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={centered ? "mx-auto max-w-2xl text-center" : ""}
    >
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">
        {section.eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {section.title}{" "}
        <span className="gradient-text">{section.titleHighlight}</span>
      </h2>
      <p className="mt-4 text-lg text-muted">{section.description}</p>
    </motion.div>
  );
}
