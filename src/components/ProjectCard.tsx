"use client";

/**
 * ProjectCard
 * ------------------------------------------------------------
 * - Tilt 3D ligero con MotionValue (sin casts a string).
 * - Halo con conic-gradient + shine diagonal en hover.
 * - CTA accesible (target + rel) y foco visible.
 * - Acepta `tags` como ReadonlyArray para convivir con `as const`.
 */

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  /** Permite arrays readonly (compatibles con `as const`). */
  tags?: ReadonlyArray<string>;
  href?: string;
  className?: string;
};

export default function ProjectCard({
  title,
  description,
  tags = [],
  href = "#",
  className,
}: Props): React.JSX.Element {
  /** Tilt 3D: usamos rotateX/rotateY directamente (mejor tipado). */
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>): void {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Oscilación ±6°
    rY.set(((x - rect.width / 2) / rect.width) * 6);
    rX.set(((rect.height / 2 - y) / rect.height) * 6);
  }

  function resetTilt(): void {
    rX.set(0);
    rY.set(0);
  }

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={resetTilt}
      /* En lugar de "transform: rotateX() rotateY()", damos style a cada eje: */
      style={{ rotateX: rX, rotateY: rY }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn("relative", className)}
      aria-label={`Proyecto ${title}`}
    >
      {/* Glow de borde (blur) */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, var(--primary) 0deg, var(--primary-2) 120deg, transparent 200deg, transparent 360deg)",
          filter: "blur(18px)",
          opacity: 0.35,
        }}
      />

      {/* Contenedor principal */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface),transparent_0%)]">
        {/* Shine diagonal */}
        <motion.div
          aria-hidden
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
        />

        <div className="relative p-6 md:p-7">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
              {title}
            </h3>

            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[color-mix(in_oklab,var(--primary),transparent_90%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              aria-label={`Abrir ${title} en nueva pestaña`}
            >
              Ver
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="inline-flex"
              >
                <ExternalLink className="h-4 w-4" />
              </motion.span>
            </Link>
          </div>

          <p className="opacity-90 leading-relaxed">{description}</p>

          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <motion.span
                  key={t} // clave estable si el tag puede repetirse, concatena el índice
                  className="badge"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
