"use client";

/**
 * HomePage
 * ------------------------------------------------------------
 * - Hero con micro-animación (MotionFade) y CTA.
 * - Secciones de Servicios y Proyectos con reveal staggerizado.
 * - JSON-LD para SEO técnico (Person).
 * - Tipado inmutable de data (`as const`) para evitar sorpresas.
 */

import MotionFade from "@/components/MotionFade";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";

export default function HomePage(): React.JSX.Element {
  // Ítems de servicios: tipamos literal para que `icon` sea seguro
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
        "UI limpia y productiva con tablas, filtros, gráficos y estados.",
      points: ["Rendimiento en listas", "Accesibilidad", "Dark/Light mode"],
      icon: "gauge",
    },
    {
      title: "SEO & optimización técnica",
      description:
        "Estructura, metaetiquetas y JSON-LD para ganar visibilidad.",
      points: ["Core Web Vitals", "Sitemaps automáticos", "OpenGraph"],
      icon: "search",
    },
  ] as const;

  // Proyectos destacados
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

  // JSON-LD para rich results (ajusta `url`/`sameAs`)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jorge Luis Rodríguez",
    jobTitle: "Front-End & Product Engineer",
    url: "https://tu-dominio.com",
    sameAs: ["https://www.linkedin.com/", "https://github.com/"],
  };

  return (
    <>
      {/* SEO técnico: schema Person */}
      <script
        type="application/ld+json"
        // Mantener stringify sin formato para ahorrar bytes
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="py-8 md:py-16">
        <MotionFade>
          <div className="text-center max-w-3xl mx-auto">
            <span className="badge mb-4">
              Disponible para proyectos selectos
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Diseño y desarrollo{" "}
              <span className="text-[rgb(var(--primary))]">web moderno</span>{" "}
              que impulsa resultados
            </h1>
            <p className="mt-4 text-lg opacity-90">
              Soy Jorge, construyo interfaces hermosas, rápidas y accesibles con
              Next.js y una obsesión por el detalle.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Agenda una llamada
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                Ver portafolio
              </Link>
            </div>
          </div>
        </MotionFade>
      </section>

      {/* SERVICIOS */}
      <section className="py-10 md:py-16">
        <MotionFade>
          <h2 className="text-2xl font-bold mb-6">Servicios</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <MotionFade key={s.title} delay={i * 0.1}>
                {/* `icon` está tipado con literal union gracias al `as const` */}
                <ServiceCard {...s} />
              </MotionFade>
            ))}
          </div>
        </MotionFade>
      </section>

      {/* PROYECTOS */}
      <section className="py-10 md:py-16">
        <MotionFade>
          <h2 className="text-2xl font-bold mb-6">Proyectos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <MotionFade key={p.title} delay={i * 0.1}>
                <ProjectCard {...p} />
              </MotionFade>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services" className="btn-primary">
              Ver lista completa de servicios
            </Link>
          </div>
        </MotionFade>
      </section>

      {/* CTA FINAL */}
      <section className="py-10 md:py-16">
        <MotionFade>
          <div className="rounded-2xl p-8 border text-center">
            <h3 className="text-xl md:text-2xl font-semibold">
              ¿Listo para elevar tu producto?
            </h3>
            <p className="mt-2 opacity-90">
              Hagamos una primera sesión de 30 minutos para entender tu reto.
            </p>
            <Link href="/contact" className="btn-primary mt-4 inline-flex">
              Contactar
            </Link>
          </div>
        </MotionFade>
      </section>
    </>
  );
}
