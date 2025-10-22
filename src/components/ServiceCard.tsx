"use client";

/**
 * ServiceCard (pro)
 * ------------------------------------------------------------
 * - Animación de entrada + hover-lift suave (spring).
 * - Icono en cápsula con glow sutil (sin bucles infinitos).
 * - Bullets en grid responsive y CTA opcional.
 * - Acepta `points` como ReadonlyArray para convivir con `as const`.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Rocket,
  Gauge,
  Search,
  Wrench,
  Shield,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  code: Code2,
  rocket: Rocket,
  gauge: Gauge,
  search: Search,
  wrench: Wrench,
  shield: Shield,
  sparkles: Sparkles,
};

type IconKey = keyof typeof icons;

type Props = {
  title: string;
  description: string;
  /** Permite arrays readonly (compatibles con `as const`). */
  points?: ReadonlyArray<string>;
  icon?: IconKey;
  href?: string; // CTA link (opcional)
  ctaLabel?: string; // Texto CTA (opcional)
  highlight?: string; // Badge opcional
  className?: string;
};

export default function ServiceCard({
  title,
  description,
  points = [],
  icon = "code",
  href,
  ctaLabel,
  highlight,
  className,
}: Props): React.JSX.Element {
  const Icon = icons[icon] ?? Code2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "relative rounded-2xl border border-[var(--border)]",
        "bg-[color-mix(in_oklab,var(--surface),transparent_0%)]",
        "p-5 sm:p-6 md:p-7",
        "shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35)]",
        className
      )}
      aria-label={`Servicio: ${title}`}
    >
      {/* Glow de borde sutil (no invasivo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in_oklab,var(--primary),transparent_85%), transparent)",
          mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          WebkitMask:
            "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          padding: "1px",
          opacity: 0.7,
        }}
      />

      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Cápsula de icono */}
          <span className="relative inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  "radial-gradient(18px 18px at 50% 50%, var(--primary), transparent)",
                opacity: 0.18,
              }}
            />
            <Icon className="relative h-5 w-5 text-[var(--primary)]" />
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                {title}
              </h3>
              {highlight && <span className="badge">{highlight}</span>}
            </div>
            <p className="mt-1 leading-relaxed opacity-90">{description}</p>
          </div>
        </div>

        {/* CTA pill (opcional) - visible en >= sm */}
        {href && ctaLabel && (
          <Link
            href={href}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium transition hover:bg-[color-mix(in_oklab,var(--primary),transparent_90%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            {ctaLabel}
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="inline-flex"
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </Link>
        )}
      </div>

      {/* Bullets */}
      {points.length > 0 && (
        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          {points.map((p) => (
            <motion.li
              key={p}
              className="flex items-start gap-2"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.25 }}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, var(--primary), var(--primary-2))",
                }}
                aria-hidden
              />
              <span className="opacity-90">{p}</span>
            </motion.li>
          ))}
        </ul>
      )}

      {/* CTA móvil (debajo en pantallas pequeñas) */}
      {href && ctaLabel && (
        <div className="mt-5 sm:hidden">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium transition hover:bg-[color-mix(in_oklab,var(--primary),transparent_90%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </motion.article>
  );
}
