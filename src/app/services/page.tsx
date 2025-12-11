"use client";

import dynamic from "next/dynamic";
import ServiceCard from "@/components/ServiceCard";
import { motion, type Transition, type Variants } from "framer-motion";
import type React from "react";

/* ============================================================
 * Tipos
 * ============================================================ */

type IconKey =
  | "rocket"
  | "gauge"
  | "search"
  | "code"
  | "wrench"
  | "shield"
  | "sparkles";

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
 * Import dinámico del calculador (SSR desactivado)
 * - Esto es CRUCIAL para que localStorage no de error en build
 * ============================================================ */
const PriceCalculatorUSD = dynamic(
  () => import("@/components/PriceCalculatorUSD"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 h-[600px] w-full animate-pulse rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] opacity-50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[var(--border)]" />
        <span className="text-sm font-medium text-[var(--muted)]">
          Cargando calculadora inteligente...
        </span>
      </div>
    ),
  }
);

/* ============================================================
 * Animaciones
 * ============================================================ */
const spring: Transition = { type: "spring", stiffness: 350, damping: 28 };

const container: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45 },
  },
};

/* ============================================================
 * Página
 * ============================================================ */
export default function ServicesPage(): React.JSX.Element {
  const items: Readonly<ServiceItem[]> = [
    {
      title: "Landing pages de alto rendimiento",
      description:
        "Desde la idea al deploy: arquitectura, UI/UX y performance.",
      points: ["Diseño responsive", "Animaciones pro", "Contenido SEO"],
      icon: "rocket",
      highlight: "Recomendado",
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
    <section className="space-y-16 py-8">
      {/* ==================== Hero de sección ==================== */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] p-8 bg-[var(--surface)] shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl relative z-10"
        >
          <span className="badge mb-4 inline-block font-medium">
            Servicios Digitales
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Soluciones front-end enfocadas en resultados
          </h1>
          <p className="text-lg opacity-80 leading-relaxed max-w-2xl">
            Trabajo con negocios que valoran el detalle. Equilibrio entre
            estética, velocidad y claridad técnica.
          </p>
        </motion.div>

        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 blur-3xl rounded-full pointer-events-none -mr-16 -mt-16" />
      </div>

      {/* ==================== Grilla de servicios ==================== */}
      <motion.div
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
      <div id="calculator" className="scroll-mt-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3 tracking-tight">
            Estimador de Proyecto
          </h2>
          <p className="opacity-80 max-w-2xl text-[var(--muted)]">
            Obtén una previsión de inversión transparente. Los datos se guardan
            en tu navegador automáticamente.
            <br />
            Utiliza el código{" "}
            <code className="font-mono text-[var(--primary)] font-bold">
              FIRST20
            </code>{" "}
            para un descuento especial de bienvenida.
          </p>
        </div>

        {/* Componente Calculadora Limpio con SSR Disabled */}
        <PriceCalculatorUSD />
      </div>
    </section>
  );
}
