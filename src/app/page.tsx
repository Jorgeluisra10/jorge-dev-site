"use client";

/**
 * HomePage - Premium Version
 * ------------------------------------------------------------
 * Visualmente enriquecida con patrones, mejor tipografía y estructura
 * de contenedores tipo "Bento" para la sección de socios.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";

// Configuración de Animaciones
const EASE_OUT = [0.16, 0.84, 0.44, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
};

/* =========================================================================
 * SUB-COMPONENTES
 * ========================================================================= */

function PartnerCollabSection(): React.JSX.Element {
  return (
    <motion.section
      variants={sectionVariants}
      className="relative overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12 lg:p-16 isolate"
    >
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Columna Texto */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Socio Tecnológico
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-balance">
            ¿Tienes una idea de negocio y buscas un{" "}
            <br className="hidden md:block" />
            <span className="text-[var(--primary)]">CTO / Socio Tech</span>?
          </h2>

          <div className="prose prose-lg text-[var(--muted)] text-balance leading-relaxed">
            <p>
              Más allá de proveer servicios, me asocio con emprendedores que
              quieren construir negocios reales. Tú pones la visión, el
              marketing y la operación; yo pongo la tecnología robusta y
              escalable.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/socios" className="btn-primary group">
              <span>Ver modelo de colaboración</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="btn-ghost text-sm font-medium">
              Proponer idea
            </Link>
          </div>
        </div>

        {/* Columna Beneficios (Card visual) */}
        <div className="bg-[var(--background)] rounded-3xl p-8 border border-[var(--border)] shadow-sm relative">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[var(--primary)]" />
            ¿Qué pongo sobre la mesa?
          </h3>

          <ul className="space-y-5">
            {[
              {
                text: "Desarrollo integral (Web, App, Dashboards)",
                icon: CodeIcon,
              },
              { text: "Automatización de procesos y pagos", icon: TrendingUp },
              { text: "Estrategia de producto y MVP", icon: Users },
              {
                text: "Compromiso a largo plazo (Skin in the game)",
                icon: CheckCircle2,
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm md:text-base opacity-90"
              >
                <item.icon className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

// Icono auxiliar para el map
const CodeIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

/* =========================================================================
 * COMPONENTE PRINCIPAL
 * ========================================================================= */

export default function HomePage(): React.JSX.Element {
  const services = [
    {
      title: "Landing pages de alto rendimiento",
      description:
        "Diseño pixel-perfect con Next.js, SEO listo y tiempos de carga excelentes.",
      points: [
        "Lighthouse 95+",
        "Animaciones sutiles",
        "Integración Analytics",
      ],
      icon: "rocket",
    },
    {
      title: "Dashboards & paneles a medida",
      description:
        "UI limpia y productiva con tablas, filtros, gráficos y estados complejos.",
      points: ["Rendimiento en listas", "Accesibilidad", "Dark/Light mode"],
      icon: "gauge",
    },
    {
      title: "SEO & optimización técnica",
      description:
        "Estructura, metaetiquetas y JSON-LD para ganar visibilidad orgánica.",
      points: ["Core Web Vitals", "Sitemaps automáticos", "OpenGraph"],
      icon: "search",
    },
  ] as const;

  const projects = [
    {
      title: "Imnoba (Propiedades & Autos)",
      description:
        "Marketplace con filtros avanzados, paneles multi-rol y RLS en Supabase.",
      tags: ["Next.js", "Tailwind", "Supabase", "RLS"],
      href: "https://www.imnoba.com",
    },
    {
      title: "RA WebStudio",
      description:
        "Estudio web con estética profesional y componentes animados.",
      tags: ["Next.js", "Tailwind", "Framer Motion"],
      href: "#",
    },
  ] as const;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jorge Luis Rodríguez",
    jobTitle: "Front-End & Product Engineer",
    url: "https://tu-dominio.com",
    sameAs: ["https://www.linkedin.com/", "https://github.com/"],
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-24 md:space-y-32 pb-20"
    >
      {/* SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <motion.section
        variants={sectionVariants}
        className="relative pt-12 md:pt-20 pb-12 text-center isolate"
      >
        {/* Patrón de fondo sutil */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary)]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm font-medium text-[var(--muted)] shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Disponible para proyectos selectos
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-balance mb-6 text-[var(--foreground)]">
            Diseño y desarrollo web <br className="hidden md:block" />
            <span className="text-[var(--primary)] relative">
              moderno
              {/* Subrayado decorativo */}
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-[var(--primary)] opacity-30"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>{" "}
            que impulsa resultados.
          </h1>

          <p className="mt-6 text-xl text-[var(--muted)] max-w-2xl mx-auto text-balance leading-relaxed">
            Soy Jorge. Construyo interfaces hermosas, rápidas y accesibles con
            Next.js, obsesionado con el detalle y la experiencia de usuario.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary w-full sm:w-auto h-12 px-8 text-base"
            >
              Agenda una llamada
            </Link>
            <Link
              href="/portfolio"
              className="btn-ghost w-full sm:w-auto h-12 px-8 text-base bg-[var(--surface)] shadow-sm border-[var(--border)]"
            >
              Ver portafolio
            </Link>
          </div>
        </div>
      </motion.section>

      {/* SECCIÓN SOCIO (Contenedor limitado al ancho del sitio) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnerCollabSection />
      </div>

      {/* SERVICIOS */}
      <motion.section
        variants={sectionVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Servicios Especializados
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Soluciones técnicas para cada etapa de crecimiento.
            </p>
          </div>
          <Link
            href="/services"
            className="text-sm font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s) => (
            <div key={s.title} className="h-full">
              <ServiceCard {...s} />
            </div>
          ))}
        </div>
      </motion.section>

      {/* PROYECTOS */}
      <motion.section
        variants={sectionVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Proyectos Destacados
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Productos reales construidos desde cero.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            Explorar portafolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section
        variants={sectionVariants}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--foreground)] text-[var(--background)] p-10 md:p-16 text-center">
          {/* Decoración CTA */}
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.05)_50%,transparent_55%)] bg-[length:200%_200%] animate-[shimmer_4s_infinite]" />

          <h3 className="relative z-10 text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            ¿Listo para elevar tu producto?
          </h3>
          <p className="relative z-10 text-lg opacity-80 mb-8 max-w-xl mx-auto">
            Hagamos una sesión de descubrimiento de 30 minutos. Sin compromiso,
            solo para entender tu reto técnico.
          </p>
          <Link
            href="/contact"
            className="relative z-10 inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-[var(--background)] text-[var(--foreground)] font-bold text-lg hover:scale-105 transition-transform"
          >
            Iniciar Conversación
          </Link>
        </div>
      </motion.section>
    </motion.main>
  );
}
