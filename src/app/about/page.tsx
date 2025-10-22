"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { useMemo, useState } from "react";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay: d } },
});

const slide = {
  initial: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  animate: { x: 0, opacity: 1, transition: { duration: 0.35 } },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.25 },
  }),
};

export default function AboutPage() {
  // 🖼️ Carrusel IMNOBA (rutas string desde /public/images)
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

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx((prev) => (next + gallery.length) % gallery.length);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* HERO CENTRADO */}
      <motion.div
        {...fade(0)}
        className="flex flex-col items-center text-center gap-5"
      >
        <div className="relative h-32 w-32 md:h-36 md:w-36 rounded-2xl overflow-hidden ring-1 ring-[var(--border)]">
          <Image
            src="/images/perfil.jpg"
            alt="Jorge Luis Rodríguez"
            fill
            priority
            quality={95}
            sizes="144px"
            className="object-cover object-center"
          />
        </div>

        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Jorge Luis Rodríguez
          </h1>
          <p className="mt-2 leading-relaxed opacity-90">
            <strong>Front-End & Product Engineer</strong> con foco en{" "}
            <em>experiencias pulidas</em>, <em>accesibilidad</em> y{" "}
            <em>performance</em>. Construyo productos con{" "}
            <strong>Next.js</strong>, <strong>Tailwind</strong> y{" "}
            <strong>Framer Motion</strong>, cuidando el detalle desde la
            arquitectura hasta la micro-interacción.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Iniciar conversación
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/portfolio" className="btn-ghost">
              Ver portafolio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-3 text-sm opacity-80">
              <a
                href="https://github.com/Jorgeluisra10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jorgeluisra10/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* VALUE PILLARS */}
      <motion.div
        {...fade(0.1)}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          {
            icon: <Rocket className="h-5 w-5" />,
            title: "Entrega tangible",
            desc: "Resultados medibles y listos para negocio.",
          },
          {
            icon: <Gauge className="h-5 w-5" />,
            title: "Performance",
            desc: "CWV, tiempos bajos y UX fluida.",
          },
          {
            icon: <Accessibility className="h-5 w-5" />,
            title: "Accesibilidad",
            desc: "Buenas prácticas WCAG desde el diseño.",
          },
          {
            icon: <Sparkles className="h-5 w-5" />,
            title: "Micro-interacciones",
            desc: "Animaciones sutiles que elevan la percepción.",
          },
        ].map((p, i) => (
          <div
            key={i}
            className="card p-4 md:p-5 flex items-start gap-3 card-accent"
          >
            <div className="badge">{p.icon} Pilar</div>
            <div>
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm opacity-80">{p.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* FEATURED CASE: IMNOBA (un solo carrusel, sin blur) */}
      <motion.section {...fade(0.2)} className="mt-14">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-5 w-5" />
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Caso destacado: Imnoba (Propiedades & Autos)
          </h2>
        </div>

        <div className="card p-6 md:p-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="leading-relaxed">
              <strong>Imnoba</strong> es un marketplace con{" "}
              <em>filtros avanzados</em>, paneles multi-rol y autenticación.
              Diseñé e implementé el producto end-to-end con foco en{" "}
              <em>claridad</em>, <em>rendimiento</em> y <em>escalabilidad</em>.
              Actualmente está en desarrollo la{" "}
              <strong>app móvil con React Native</strong>.
            </p>

            <ul className="space-y-2 text-sm">
              {[
                "Búsquedas facetadas y estados de carga/errores cuidados.",
                "Paneles para administración y moderación de contenido.",
                "UI consistente, dark/light mode y componentes accesibles.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { k: "CWV", v: "Lighthouse 95+" },
                { k: "Listados", v: "Filtros en ms" },
                { k: "Arquitectura", v: "Mantenible y escalable" },
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

            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Next.js",
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

            <div className="pt-2 flex gap-3">
              <Link href="/portfolio" className="btn-ghost">
                Ver proyecto
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-primary">
                Solicitar propuesta
              </Link>
            </div>
          </div>

          {/* Carrusel único, nítido */}
          <div className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-[var(--border)] bg-[color-mix(in_oklab,var(--card),transparent_0%)]">
              <AnimatePresence custom={dir} mode="popLayout">
                <motion.div
                  key={gallery[idx]?.src ?? idx}
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
                    sizes="(min-width:1280px) 768px, (min-width:1024px) 640px, (min-width:768px) 700px, 100vw"
                    className="object-contain"
                    priority={idx <= 1}
                    fetchPriority={idx <= 1 ? "high" : "auto"}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controles flotantes */}
            <button
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 btn-ghost rounded-full p-2"
              onClick={() => go((idx - 1 + gallery.length) % gallery.length)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 btn-ghost rounded-full p-2"
              onClick={() => go((idx + 1) % gallery.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir a slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === idx
                      ? "w-6 bg-[color:var(--primary-2)]"
                      : "w-2.5 bg-[color:var(--border)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* PRINCIPIOS + STACK */}
      <motion.section
        {...fade(0.25)}
        className="mt-14 grid gap-6 lg:grid-cols-2"
      >
        <div className="card p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Principios de trabajo
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            <li>
              <strong>Diseño orientado a resultados:</strong> la UI cuenta si
              impulsa métricas (conversión, retención, claridad).
            </li>
            <li>
              <strong>Micro-interacciones con intención:</strong> animaciones
              sutiles para guiar atención sin distraer.
            </li>
            <li>
              <strong>Arquitectura simple y sostenible:</strong> componentes
              reutilizables, tipado sólido y DX cuidada.
            </li>
            <li>
              <strong>Accesibilidad por defecto:</strong> semántica, foco,
              contraste y navegación por teclado.
            </li>
          </ul>
        </div>

        <div className="card p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Stack preferido
          </h3>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Next.js",
              "TypeScript",
              "Tailwind",
              "Framer Motion",
              "Supabase",
              "Vercel",
              "Zod + RHF",
              "Playwright",
              "PNPM/NPM",
            ].map((s) => (
              <div
                key={s}
                className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm flex items-center justify-center"
              >
                {s}
              </div>
            ))}
          </div>
          <p className="text-xs opacity-70 mt-4">
            También trabajo con CMS headless (Sanity/Contentful), analytics y
            SEO técnico.
          </p>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.div {...fade(0.3)} className="mt-14">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold tracking-tight">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="opacity-80">
              Te propongo una demo rápida con estimaciones claras y primeras
              ideas de valor.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/contact" className="btn-primary">
              Iniciar conversación
            </Link>
            <a
              href="/cv-jorge-rodriguez.pdf"
              className="btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar CV
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
