"use client";

import dynamic from "next/dynamic";
import ServiceCard from "@/components/ServiceCard";
import { motion, type Transition, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react"; // Importamos un icono para el badge
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
 * Skeleton mejorado para imitar la estructura real (2 columnas)
 * ============================================================ */
const PriceCalculatorUSD = dynamic(
  () => import("@/components/PriceCalculatorUSD"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-12 gap-8 animate-pulse">
        {/* Skeleton Columna Izquierda */}
        <div className="xl:col-span-8 space-y-8">
          <div className="h-64 w-full rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] opacity-60" />
          <div className="h-40 w-full rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] opacity-60" />
        </div>
        {/* Skeleton Columna Derecha (Sticky) */}
        <div className="xl:col-span-4">
          <div className="h-[500px] w-full rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] opacity-80" />
        </div>
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
    <section className="space-y-20 py-8 md:py-12">
      {/* ==================== Hero de sección ==================== */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-sm isolate">
        {/* PATRÓN DE FONDO (Dot Pattern) - Sutil y técnico */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Gradiente de luz superior */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--primary)]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="p-8 md:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3" />
              Servicios Digitales
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-balance text-[var(--foreground)]">
              Soluciones front-end enfocadas en resultados
            </h1>

            <p className="text-lg md:text-xl opacity-70 leading-relaxed max-w-2xl text-balance">
              Trabajo con negocios que valoran el detalle. Un equilibrio
              milimétrico entre estética visual, velocidad de carga y claridad
              técnica.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ==================== Grilla de servicios ==================== */}
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((s) => (
          <motion.div
            key={s.title}
            variants={item}
            transition={spring}
            className="h-full"
          >
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

      {/* ==================== Separador Visual ==================== */}
      <div className="relative py-8 flex items-center justify-center opacity-20">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
        <div className="absolute w-2 h-2 rounded-full bg-[var(--border)]" />
      </div>

      {/* ==================== Calculadora ==================== */}
      <div id="calculator" className="scroll-mt-24">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-[var(--foreground)]">
            Estimador de Proyecto
          </h2>
          <p className="text-lg opacity-70 max-w-2xl text-[var(--muted)] text-balance">
            Obtén una previsión de inversión transparente en tiempo real.
            <br className="hidden md:block" />
            <span className="inline-flex items-center gap-2 mt-2 bg-[var(--surface)] border border-[var(--border)] px-3 py-1 rounded-lg text-sm">
              <span>Tu código de bienvenida:</span>
              <code className="font-mono text-[var(--primary)] font-black tracking-wider bg-[var(--primary)]/10 px-1.5 rounded">
                FIRST20
              </code>
            </span>
          </p>
        </div>

        {/* Componente Calculadora */}
        <PriceCalculatorUSD />
      </div>
    </section>
  );
}
