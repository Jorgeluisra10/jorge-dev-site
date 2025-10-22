"use client";

/**
 * Servicios — Página de oferta
 * ------------------------------------------------------------
 * - Animaciones de entrada al montar (sin onScroll ni bucles infinitos).
 * - Stagger limpio para las cards.
 * - Tipado estricto de Framer Motion (Transition / Variants) para evitar
 *   errores de TS en `transition` y `variants`.
 * - Import dinámico de la calculadora con skeleton SSR-safe.
 */

import dynamic from "next/dynamic";
import ServiceCard from "@/components/ServiceCard";
import { motion, type Transition, type Variants } from "framer-motion";
import type React from "react";

/* ============================================================
 * Tipos de dominio
 * ============================================================ */

/** Claves de icono admitidas por <ServiceCard /> */
type IconKey =
  | "rocket"
  | "gauge"
  | "search"
  | "code"
  | "wrench"
  | "shield"
  | "sparkles";

/** Modelo de un servicio mostrado en la grilla */
type ServiceItem = {
  title: string;
  description: string;
  points: string[];
  icon: IconKey;
  href?: string;
  ctaLabel?: string;
  highlight?: string;
};

/* ============================================================
 * Import dinámico de la calculadora (usa APIs del navegador)
 * - SSR desactivado
 * - Fallback ligero para no bloquear la interacción
 * ============================================================ */
const PriceCalculatorUSD = dynamic(
  () => import("@/components/PriceCalculatorUSD"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 rounded-2xl border p-6 text-sm opacity-70">
        Cargando calculadora de precios…
      </div>
    ),
  }
);

/* ============================================================
 * Animaciones — estrictamente tipadas
 * - Evita errores de TS en `transition`/`variants`
 * - Solo animaciones de entrada (nada infinito)
 * ============================================================ */

/** Micro-elasticidad para hover/entrada. */
const spring: Transition = { type: "spring", stiffness: 350, damping: 28 };

/** Contenedor que coordina el stagger de los hijos. */
const container: Variants = {
  initial: {}, // requerido por el tipo Variants aunque no cambiemos nada aquí
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Animación base de cada card (entrada suave). */
const item: Variants = {
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45 }, // transición local (válida para Variants)
  },
};

/* ============================================================
 * Página
 * ============================================================ */

export default function ServicesPage(): React.JSX.Element {
  // Fuente de datos (readonly para evitar mutaciones accidentales)
  const items: Readonly<ServiceItem[]> = [
    {
      title: "Landing pages de alto rendimiento",
      description:
        "Desde la idea al deploy: arquitectura, UI/UX y performance.",
      points: ["Diseño responsive", "Animaciones pro", "Contenido SEO"],
      icon: "rocket",
      highlight: "Top pick",
    },
    {
      title: "Dashboards & paneles a medida",
      description: "Listas, filtros y tablas complejas con UX fluida.",
      points: [
        "Estados vacíos, loading, error",
        "Gráficas y KPIs",
        "Dark/Light mode",
      ],
      icon: "gauge",
      ctaLabel: "Ver ejemplos",
      href: "/portfolio",
    },
    {
      title: "SEO técnico y analítica",
      description: "Metas, JSON-LD y sitemaps para mayor visibilidad.",
      points: ["Core Web Vitals", "Search Console & GA4", "A/B testing básico"],
      icon: "search",
      ctaLabel: "Auditar sitio",
      href: "/contact",
    },
  ];

  return (
    <section className="space-y-12">
      {/* ==================== Hero de sección ==================== */}
      <div className="relative overflow-hidden rounded-2xl border p-6 md:p-8 bg-[var(--surface)]">
        <motion.div
          // Animación de entrada única (sin bucles)
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <span className="badge mb-3 inline-block">Servicios</span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Soluciones front-end enfocadas en resultados
          </h1>
          <p className="opacity-90 mt-3">
            Trabajo con negocios que valoran el detalle. Equilibrio entre
            estética, velocidad y claridad.
          </p>
        </motion.div>

        {/* Línea decorativa estática y sutil (sin animación continua) */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in_oklab,var(--primary),transparent_20%), transparent)",
          }}
        />
      </div>

      {/* ==================== Grilla de servicios ==================== */}
      <motion.div
        // Variants tipados: no hay `whileInView`, las cards salen al montar
        variants={container}
        initial="initial"
        animate="animate"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((s) => (
          <motion.div key={s.title} variants={item} transition={spring}>
            <ServiceCard
              title={s.title}
              description={s.description}
              points={s.points}
              icon={s.icon}
              href={s.href}
              ctaLabel={s.ctaLabel}
              highlight={s.highlight}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ==================== Calculadora ==================== */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">
          Calcula tu proyecto en USD
        </h2>
        <p className="opacity-80 mb-4">
          Precios competitivos, desglose claro y{" "}
          <strong>20% de descuento</strong> en tu primer proyecto (o con el
          cupón
          <code className="mx-1 rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/10">
            FIRST20
          </code>
          ).
        </p>
        <PriceCalculatorUSD />
      </div>
    </section>
  );
}
