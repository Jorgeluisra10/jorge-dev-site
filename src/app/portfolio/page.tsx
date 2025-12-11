"use client";

/**
 * PortfolioPage - Premium Case Study View
 * ------------------------------------------------------------
 * - Diseño tipo "Bento" para los stats del proyecto.
 * - Carrusel con UX mejorada (glassmorphism controls).
 * - Modal inmersivo con galería de miniaturas.
 */

import type React from "react";
import { useMemo, useState, useCallback, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  type Transition,
  type Variants,
  type TargetAndTransition,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Zap,
  LayoutTemplate,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

/* ==================== Animations (Strictly Typed) ==================== */

const spring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const fade = (d = 0): Variants => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: "easeOut" },
  },
});

const slide = {
  initial: (dir: number): TargetAndTransition => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (dir: number): TargetAndTransition => ({
    x: dir > 0 ? "-20%" : "20%",
    opacity: 0,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  }),
} as const;

/* ==================== Page ==================== */

export default function PortfolioPage(): React.JSX.Element {
  // Galería
  const gallery = useMemo(
    () => [
      { src: "/images/imnoba.png", alt: "Imnoba — Home Principal" },
      { src: "/images/imnobaAgent.png", alt: "Imnoba — Panel de Agente" },
      { src: "/images/ImnobaDetail.png", alt: "Imnoba — Detalle de Propiedad" },
      { src: "/images/ImnobaAdmin.png", alt: "Imnoba — Backoffice Admin" },
      { src: "/images/imnobaLogin.png", alt: "Imnoba — Sistema de Acceso" },
    ],
    []
  );

  const [idx, setIdx] = useState<number>(0);
  const [dir, setDir] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  const go = useCallback(
    (next: number) => {
      setDir(next > idx ? 1 : -1);
      setIdx((prev) => (next + gallery.length) % gallery.length);
    },
    [idx, gallery.length]
  );

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onCardKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <section className="min-h-screen py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div {...fade(0)} className="mb-12 max-w-2xl">
        <span className="badge mb-4">Case Study Destacado</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Portafolio Selecto
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Una mirada profunda a proyectos reales, complejos y en producción.
        </p>
      </motion.div>

      {/* === FEATURED PROJECT: IMNOBA === */}
      <motion.article
        {...fade(0.1)}
        className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-0">
          {/* COLUMNA IZQUIERDA: VISUAL / CARRUSEL */}
          <div
            className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-[var(--background)] cursor-zoom-in"
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={onCardKey}
          >
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 z-10 transition-colors duration-300 pointer-events-none" />

            {/* Fullscreen Icon Hint */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 p-2 rounded-full shadow-lg">
              <Maximize2 className="w-5 h-5 text-black" />
            </div>

            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={idx}
                custom={dir}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={gallery[idx]?.src ?? "/images/imnoba.png"}
                  alt={gallery[idx]?.alt ?? "Project Screenshot"}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Controls (Bottom Floating) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-lg">
              <CarouselBtn
                onClick={(e) => {
                  e.stopPropagation();
                  go(idx - 1);
                }}
                label="Prev"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </CarouselBtn>

              <div className="flex gap-1.5">
                {gallery.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === idx ? "w-6 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <CarouselBtn
                onClick={(e) => {
                  e.stopPropagation();
                  go(idx + 1);
                }}
                label="Next"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </CarouselBtn>
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO & STATS */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[var(--border)]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  Imnoba
                </h2>
                <p className="text-[var(--muted)] font-medium">
                  Marketplace Inmobiliario & Automotor
                </p>
              </div>
              <Link
                href="https://www.imnoba.com"
                target="_blank"
                className="p-3 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:scale-110 transition-transform"
                aria-label="Visitar Imnoba"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="prose prose-sm text-[var(--muted)] mb-8 leading-relaxed">
              <p>
                Una plataforma robusta construida para escalar. Gestiona miles
                de propiedades y vehículos con filtros instantáneos,
                autenticación segura y roles diferenciados (Administrador,
                Inmobiliaria, Usuario).
              </p>
            </div>

            {/* Grid de Features (Bento Style Mini) */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Zap, label: "Performance", val: "99/100 CWV" },
                { icon: ShieldCheck, label: "Seguridad", val: "RLS + Auth" },
                { icon: LayoutTemplate, label: "UI Kit", val: "Custom System" },
                { icon: Smartphone, label: "Mobile", val: "Responsive" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex flex-col gap-1"
                >
                  <stat.icon className="w-4 h-4 text-[var(--primary)] mb-1" />
                  <span className="text-[10px] uppercase font-bold text-[var(--muted)] tracking-wider">
                    {stat.label}
                  </span>
                  <span className="text-sm font-semibold">{stat.val}</span>
                </div>
              ))}
            </div>

            {/* Stack Tags */}
            <div>
              <span className="text-xs font-bold uppercase text-[var(--muted)] tracking-wider mb-3 block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js 14",
                  "Supabase",
                  "TypeScript",
                  "Tailwind",
                  "Framer Motion",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md bg-[var(--background)] border border-[var(--border)] text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={openModal}
              className="mt-10 w-full py-4 rounded-xl border border-[var(--border)] text-sm font-bold hover:bg-[var(--background)] transition-colors flex items-center justify-center gap-2 group-hover:border-[var(--primary)]/50"
            >
              <Maximize2 className="w-4 h-4" />
              Ver detalles y galería completa
            </button>
          </div>
        </div>
      </motion.article>

      {/* === MODAL (Full Screen Overlay) === */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop Blur */}
            <div
              className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-xl"
              onClick={closeModal}
            />

            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-2xl overflow-hidden flex flex-col"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={spring}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify_between px-6 py-4 border-b border-[var(--border)] bg-[var(--surface)] z-10">
                <div>
                  <h3 className="text-lg font-bold">Galería del Proyecto</h3>
                  <p className="text-xs text-[var(--muted)]">Esc para cerrar</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-[var(--background)] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
                <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
                  {/* Main Image in Modal */}
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--background)] shadow-sm">
                      <Image
                        src={gallery[idx]?.src}
                        alt={gallery[idx]?.alt}
                        fill
                        className="object-contain"
                        sizes="80vw"
                        priority
                      />
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setIdx(i)}
                          className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            i === idx
                              ? "border-[var(--primary)] opacity-100"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Narrative */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold mb-2">Imnoba</h4>
                      <p className="text-[var(--muted)] leading-relaxed text-sm">
                        Una plataforma diseñada para simplificar la búsqueda y
                        publicación de activos de alto valor. El desafío
                        principal fue mantener una velocidad de carga
                        prácticamente instantánea, por debajo de los 100&nbsp;ms
                        en transiciones, mientras se manejan grandes volúmenes
                        de imágenes y filtros complejos en tiempo real.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
                        Desafíos Superados
                      </h5>
                      <ul className="space-y-2 text-sm text-[var(--muted)]">
                        <li className="flex gap-2">
                          <span className="text-[var(--primary)]">•</span>
                          Sincronización en tiempo real de estados de
                          publicación.
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[var(--primary)]">•</span>
                          Optimización de imágenes on-the-fly con Next/Image.
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[var(--primary)]">•</span>
                          Sistema de roles con Row Level Security (RLS).
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[var(--border)]">
                      <Link
                        href="https://www.imnoba.com"
                        target="_blank"
                        className="btn-primary w-full justify-center"
                      >
                        Visitar Sitio en Vivo
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ==================== Helper ==================== */

function CarouselBtn({
  onClick,
  children,
  label,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="p-2 rounded-full hover:bg-white/20 transition-colors active:scale-95"
    >
      {children}
    </button>
  );
}
