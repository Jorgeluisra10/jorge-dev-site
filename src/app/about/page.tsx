"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  type Variants,
  type TargetAndTransition,
} from "framer-motion";
import {
  Sparkles,
  Rocket,
  Gauge,
  Accessibility,
  Code2,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Github,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Download,
  Cpu,
  Database,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

/* ==================== CONFIG & ANIMATIONS ==================== */

const fade = (d = 0): Variants => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: "easeOut" },
  },
});

const slide: {
  initial: (dir: number) => TargetAndTransition;
  animate: TargetAndTransition;
  exit: (dir: number) => TargetAndTransition;
} = {
  initial: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-20%" : "20%",
    opacity: 0,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  }),
};

/* ==================== COMPONENT ==================== */

export default function AboutPage() {
  // 🖼️ Carrusel IMNOBA
  const gallery = useMemo(
    () => [
      { src: "/images/imnoba.png", alt: "Imnoba — Home Principal" },
      { src: "/images/imnobaAgent.png", alt: "Imnoba — Panel de Agente" },
      { src: "/images/ImnobaDetail.png", alt: "Imnoba — Detalle de Propiedad" },
      { src: "/images/ImnobaAdmin.png", alt: "Imnoba — Panel Administrativo" },
      { src: "/images/imnobaLogin.png", alt: "Imnoba — Pantalla de Acceso" },
    ],
    []
  );

  const [idx, setIdx] = useState<number>(0);
  const [dir, setDir] = useState<number>(1);

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx((prev) => (next + gallery.length) % gallery.length);
  };

  // Stack organizado para mejor lectura
  const stack = {
    core: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
    backend: ["Supabase", "Node.js", "PostgreSQL", "Edge Functions"],
    tools: ["Framer Motion", "Zod", "Playwright", "Figma"],
  };

  return (
    <section className="relative max-w-5xl mx-auto px-4 py-12 md:py-20 overflow-hidden">
      {/* BACKGROUND PATTERN (Coherencia con Home/Services) */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ==================== HERO PROFILE ==================== */}
      <motion.div
        {...fade(0)}
        className="flex flex-col items-center text-center"
      >
        {/* Avatar con anillo y glow */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--primary)] to-[var(--border)] rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500" />
          <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-[var(--surface)] shadow-xl">
            <Image
              src="/images/perfil.jpg"
              alt="Jorge Luis Rodríguez"
              fill
              priority
              quality={95}
              className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div
            className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-[var(--surface)]"
            title="Disponible"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-balance">
          Jorge Luis Rodríguez
        </h1>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-bold mb-6">
          <Code2 className="w-4 h-4" />
          Front-End & Product Engineer
        </div>

        <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl text-balance leading-relaxed">
          Especializado en{" "}
          <strong className="text-[var(--foreground)]">
            experiencias pulidas
          </strong>
          , accesibilidad y performance. Construyo productos con Next.js
          cuidando el detalle desde la arquitectura hasta la micro-interacción.
        </p>

        {/* Social Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn-primary shadow-lg shadow-[var(--primary)]/20"
          >
            Iniciar conversación
          </Link>
          <a
            href="/cv-jorge-rodriguez.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost border-[var(--border)] bg-[var(--surface)]"
          >
            <Download className="w-4 h-4" /> Descargar CV
          </a>
          <div className="flex gap-2 pl-2 md:border-l border-[var(--border)]">
            {[
              {
                icon: Github,
                href: "https://github.com/Jorgeluisra10",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/jorgeluisra10/",
                label: "LinkedIn",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-[var(--border)]/50 transition-colors text-[var(--muted)] hover:text-[var(--foreground)]"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ==================== VALUE PILLARS ==================== */}
      <motion.div {...fade(0.15)} className="mt-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-sm font-bold uppercase tracking-widest text-[var(--muted)]">
            Filosofía de Trabajo
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Rocket,
              title: "Entrega tangible",
              desc: "Resultados medibles y listos para negocio.",
            },
            {
              icon: Gauge,
              title: "Performance",
              desc: "CWV, tiempos bajos y UX fluida.",
            },
            {
              icon: Accessibility,
              title: "Accesibilidad",
              desc: "Buenas prácticas WCAG desde el diseño.",
            },
            {
              icon: Sparkles,
              title: "Detalle Visual",
              desc: "Animaciones que elevan la percepción.",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--background)] flex items-center justify-center text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ==================== TECH STACK (Bento Grid) ==================== */}
      <motion.div {...fade(0.2)} className="mt-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-[var(--primary)]" />
          Stack Tecnológico
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Core */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-4 text-[var(--primary)]">
              <Code2 className="w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-wide">
                Core Frontend
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.core.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-4 text-purple-500">
              <Database className="w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-wide">
                Backend & Data
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.backend.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-4 text-orange-500">
              <Wrench className="w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-wide">
                Tools & Quality
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.tools.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== FEATURED CASE (Imnoba) ==================== */}
      <motion.section
        {...fade(0.25)}
        className="mt-20 pt-10 border-t border-[var(--border)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[var(--primary)]">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">
                Proyecto Destacado
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight">Imnoba</h2>
            <p className="text-[var(--muted)]">
              Marketplace de Propiedades & Autos
            </p>
          </div>
          <Link
            href="/portfolio"
            className="btn-ghost text-sm font-medium group"
          >
            Ver caso de estudio completo{" "}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
          {/* Texto y Stats */}
          <div className="space-y-6">
            <p className="text-[var(--muted)] leading-relaxed">
              Diseñé e implementé este producto end-to-end. Un marketplace
              complejo con
              <strong className="text-[var(--foreground)]">
                {" "}
                filtros facetados instantáneos
              </strong>
              , paneles multi-rol y autenticación robusta.
            </p>

            <div className="flex flex-col gap-3">
              {[
                "Búsquedas facetadas en milisegundos.",
                "Paneles de administración y moderación.",
                "Optimización extrema (Lighthouse 95+).",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="https://www.imnoba.com"
                target="_blank"
                className="btn-primary w-full justify-center md:w-auto"
              >
                Visitar sitio en vivo
              </Link>
            </div>
          </div>

          {/* Carrusel (Estilo Browser Window) */}
          <div className="relative group rounded-xl overflow-hidden shadow-2xl bg-[var(--surface)] border border-[var(--border)]">
            {/* Browser Header Decor */}
            <div className="h-8 bg-[var(--background)] border-b border-[var(--border)] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <div className="ml-4 flex-1 h-4 rounded-full bg-[var(--surface)] opacity-50 max-w-[200px]" />
            </div>

            <div className="relative aspect-video bg-[var(--background)] overflow-hidden">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={idx}
                  custom={dir}
                  variants={slide}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={gallery[idx]?.src}
                    alt={gallery[idx]?.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 600px, 100vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => go(idx - 1)}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur transition-all"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => go(idx + 1)}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur transition-all"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur">
                {gallery.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </section>
  );
}
