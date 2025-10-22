"use client";

/**
 * MotionFade
 * ------------------------------------------------------------
 * - Reveal con fade+translate hacia arriba.
 * - `viewport.once` evita animaciones repetidas al hacer scroll.
 * - Acepta `delay` para stagger manual simple.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MotionFade({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}): React.JSX.Element {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
