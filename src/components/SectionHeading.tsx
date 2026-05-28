"use client";

import { motion } from "framer-motion";
import type { SectionIntro } from "@/data/sections";

export default function SectionHeading({
  section,
  className = "mx-auto max-w-2xl text-center",
  showDescription = true,
}: {
  section: SectionIntro;
  className?: string;
  showDescription?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">
        {section.eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {section.heading}{" "}
        <span className="gradient-text">{section.headingHighlight}</span>
      </h2>
      {showDescription && (
        <p className="mt-4 text-lg text-muted">{section.description}</p>
      )}
    </motion.div>
  );
}
