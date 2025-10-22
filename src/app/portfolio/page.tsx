"use client";

/**
 * PortfolioPage
 * ------------------------------------------------------------
 * - Carrusel accesible con controles y puntos.
 * - Modal con resumen del proyecto (Imnoba).
 * - Framer Motion tipado: Transition / TargetAndTransition.
 * - Compatible con tsconfig `jsx: "react-jsx"`.
 */

import type React from "react"; // ✅ para usar React.JSX.Element en el return type
import {
  useMemo,
  useState,
  useCallback,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  type Transition,
  type Variants,
  type TargetAndTransition,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

/* ==================== Animations (tipadas) ==================== */

/** Muelles rápidos y naturales (evita warnings de tipos) */
const spring: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 40,
  mass: 0.9,
};

/** Fade-up simple parametrizable */
const fade = (d = 0): Variants => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, delay: d } },
});

/** Slide con `custom` para dirección (prev/next). Tipamos retornos. */
const slide = {
  initial: (dir: number): TargetAndTransition => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1, transition: { duration: 0.35 } },
  exit: (dir: number): TargetAndTransition => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.25 },
  }),
} as const;

/* ==================== Page ==================== */

export default function PortfolioPage(): React.JSX.Element {
  // Galería (rutas en /public/images)
  const gallery = useMemo(
    () => [
      { src: "/images/imnoba.png", alt: "Imnoba — home" },
      { src: "/images/imnobaAgent.png", alt: "Imnoba — panel de agente" },
      {
        src: "/images/ImnobaDetail.png",
        alt: "Imnoba — detalle de publicación",
      },
      { src: "/images/ImnobaAdmin.png", alt: "Imnoba — panel administrativo" },
      { src: "/images/imnobaLogin.png", alt: "Imnoba — pantalla de acceso" },
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
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <motion.h1
        {...fade(0)}
        className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
      >
        Portafolio
      </motion.h1>

      {/* === Único proyecto: Imnoba === */}
      <motion.article
        {...fade(0.05)}
        className="group grid lg:grid-cols-2 gap-6 items-stretch"
      >
        {/* Card interactiva (DIV accesible, no <button> para evitar anidar botones) */}
        <div
          role="button"
          tabIndex={0}
          onClick={openModal}
          onKeyDown={onCardKey}
          className="text-left card p-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] cursor-pointer"
          aria-label="Abrir resumen del proyecto Imnoba"
        >
          <div className="relative aspect-video bg-[var(--surface)]">
            <AnimatePresence mode="sync">
              <motion.div
                key={gallery[idx]?.src ?? String(idx)}
                custom={dir}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={gallery[idx]?.src ?? "/images/imnobaAgent.png"}
                  alt={gallery[idx]?.alt ?? "Imnoba — pantalla"}
                  fill
                  quality={100}
                  sizes="(min-width:1024px) 720px, 100vw"
                  className="object-contain"
                  priority={idx <= 1}
                />
              </motion.div>
            </AnimatePresence>

            {/* Dots + controles */}
            <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between">
              <div className="flex gap-2">
                {gallery.map((_, i) => (
                  <span
                    key={`dot-${i}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === idx
                        ? "w-6 bg-[var(--primary)]"
                        : "w-3 bg-[var(--border)]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center">
              <CarouselBtn
                ariaLabel="Anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  go((idx - 1 + gallery.length) % gallery.length);
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </CarouselBtn>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <CarouselBtn
                ariaLabel="Siguiente"
                onClick={(e) => {
                  e.stopPropagation();
                  go((idx + 1) % gallery.length);
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </CarouselBtn>
            </div>
          </div>

          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                  Imnoba
                </h2>
                <p className="mt-1 text-sm opacity-80">
                  Marketplace inmobiliario y de vehículos.
                </p>
              </div>
              <Link
                href="https://www.imnoba.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e: MouseEvent<HTMLAnchorElement>) =>
                  e.stopPropagation()
                }
                className="btn-ghost text-sm"
                aria-label="Abrir imnoba.com"
              >
                Visitar
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Next.js",
                "Supabase",
                "Tailwind",
                "Framer Motion",
                "Vercel",
                "React Native",
              ].map((t) => (
                <span key={t} className="badge">
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm opacity-80">
              Click en la card para ver el resumen.
            </p>
          </div>
        </div>

        {/* Lateral con highlights */}
        <div className="card p-6 md:p-7 flex flex-col justify-center">
          <h3 className="text-lg font-semibold tracking-tight">Highlights</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>🔹 Filtros facetados en ms y estados de carga sólidos.</li>
            <li>🔹 Paneles multi-rol (admin, agentes, usuarios).</li>
            <li>🔹 Dark/Light theme, accesibilidad y micro-interacciones.</li>
            <li>🔹 App móvil (en desarrollo) para operación en campo.</li>
          </ul>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { k: "CWV", v: "Lighthouse 95+" },
              { k: "Listados", v: "Rendimiento alto" },
              { k: "Arquitectura", v: "Escalable" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl border border-[var(--border)] p-3"
              >
                <div className="text-xs opacity-70">{s.k}</div>
                <div className="font-semibold">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.article>

      {/* ===== Modal de resumen ===== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Resumen del proyecto Imnoba"
              className="fixed inset-0 z-50 grid place-items-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-3xl card overflow-hidden"
                initial={{ y: 20, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 10, scale: 0.98 }}
                transition={spring}
              >
                <div className="p-4 md:p-6 border-b">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                      Imnoba — Resumen del proyecto
                    </h3>
                    <button
                      className="btn-ghost px-3 py-2 rounded-xl"
                      onClick={closeModal}
                      aria-label="Cerrar resumen"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 md:p-6 grid gap-5 md:grid-cols-5">
                  {/* Imagen grande */}
                  <div className="md:col-span-2">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-[var(--border)] bg-[var(--surface)]">
                      <Image
                        src={gallery[idx]?.src ?? "/images/imnoba.png"}
                        alt={gallery[idx]?.alt ?? "Imnoba — pantalla"}
                        fill
                        quality={100}
                        sizes="(min-width:768px) 480px, 100vw"
                        className="object-contain"
                        priority
                      />
                    </div>
                    {/* Thumbs */}
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {gallery.map((g, i) => (
                        <button
                          key={g.src}
                          onClick={() => setIdx(i)}
                          className={`relative aspect-square rounded-lg overflow-hidden ring-1 transition ${
                            i === idx
                              ? "ring-[var(--primary)]"
                              : "ring-[var(--border)]"
                          }`}
                          aria-label={`Cambiar a captura ${i + 1}`}
                        >
                          <Image
                            src={g.src}
                            alt={g.alt}
                            fill
                            quality={90}
                            sizes="100px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="md:col-span-3">
                    <div className="prose dark:prose-invert max-w-none">
                      <p>
                        <strong>Imnoba</strong> es un marketplace para
                        propiedades y vehículos con
                        <em> filtros avanzados</em>, <em>paneles multi-rol</em>,
                        autenticación y experiencia refinada de rendimiento (CWV
                        altos). Arquitectura modular (App Router) y Supabase.
                      </p>
                      <ul>
                        <li>
                          Listados con filtros facetados y estados de
                          carga/errores claros.
                        </li>
                        <li>
                          Panel admin para moderación, métricas y flujos de
                          publicación.
                        </li>
                        <li>
                          UI consistente con dark/light, accesibilidad y
                          micro-interacciones.
                        </li>
                        <li>
                          App móvil (React Native) en desarrollo para operación
                          en campo.
                        </li>
                      </ul>
                      <p>
                        <strong>Stack:</strong> Next.js, TypeScript, Tailwind,
                        Framer Motion, Supabase, Vercel y React Native.
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        "Next.js",
                        "TypeScript",
                        "Tailwind",
                        "Framer Motion",
                        "Supabase",
                        "Vercel",
                        "React Native",
                      ].map((t) => (
                        <span key={t} className="badge">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href="https://www.imnoba.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Visitar Imnoba
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <button className="btn-ghost" onClick={closeModal}>
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ==================== UI bits ==================== */
function CarouselBtn({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="m-2 btn-ghost p-2 rounded-full ring-1 ring-[var(--border)] bg-[var(--surface)]/90 backdrop-blur hover:translate-x-0.5 transition"
    >
      {children}
    </button>
  );
}
