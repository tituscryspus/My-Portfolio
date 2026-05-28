"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function parseStatValue(value: string) {
  const match = value.trim().match(/^(\d+)(.*)$/);
  if (!match) {
    return { number: 0, suffix: value };
  }
  return { number: Number.parseInt(match[1], 10), suffix: match[2] };
}

export default function AnimatedStat({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { number, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || number <= 0) {
      if (isInView && number <= 0) {
        setDisplay(0);
      }
      return;
    }

    let frame = 0;
    const duration = 1400;
    const start = performance.now() + delay;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * number));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, number, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass rounded-xl p-6 text-center transition-shadow hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="text-3xl font-bold gradient-text">
        {number > 0 ? display : value}
        {number > 0 ? suffix : ""}
      </div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </motion.div>
  );
}
