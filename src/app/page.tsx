"use client";

/**
 * HomePage
 * ------------------------------------------------------------
 * - Toda la página entra con una animación suave (sin depender del scroll).
 * - Sección de colaboración como socio tecnológico conectada a /socios.
 * - Secciones de Servicios y Proyectos con layout original.
 * - JSON-LD para SEO técnico (Person).
 */

import Link from "next/link";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";

// Curva de easing suave (equivalente a un easeOut bonito)
const EASE_OUT = [0.16, 0.84, 0.44, 1] as const;

// Variantes para el contenedor principal y las secciones
const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE_OUT,
    },
  },
};

function PartnerCollabSection(): React.JSX.Element {
  return (
    <motion.section className="py-10 md:py-16" variants={sectionVariants}>
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
        {/* Texto principal */}
        <div>
          <span className="badge mb-3">Nuevo · Socio tecnológico</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            ¿Tienes una idea de negocio{" "}
            <span className="text-[rgb(var(--primary))]">
              y quieres un socio tech
            </span>
            ?
          </h2>
          <p className="mt-4 text-base md:text-lg opacity-90">
            Además de desarrollar productos digitales como servicio, también me
            asocio con personas que quieran construir negocios reales: proyectos
            físicos (cafeterías, gimnasios, tiendas, servicios), iniciativas
            100% digitales (SaaS, marketplaces) o duplas donde tú lleves
            contenido y comunidad, y yo toda la parte tecnológica.
          </p>
          <p className="mt-3 text-sm md:text-base opacity-80">
            No es “te hago una web y listo”. Entramos como proyecto conjunto:
            definimos responsabilidades, objetivos y un modelo de participación
            claro para que ambos tengamos skin in the game.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/socios" className="btn-primary">
              Ver cómo funciona la colaboración
            </Link>
            <Link href="/contact" className="btn-ghost text-sm md:text-base">
              Proponer un proyecto o negocio
            </Link>
          </div>

          <p className="mt-3 text-xs md:text-sm opacity-70 max-w-xl">
            En la página de <span className="font-medium">Socios</span> explico
            en detalle los tipos de proyectos que busco, el proceso de trabajo y
            los modelos de colaboración posibles.
          </p>
        </div>

        {/* Card lateral con bullets */}
        <div className="rounded-2xl border p-6 md:p-7 text-left">
          <h3 className="text-lg md:text-xl font-semibold">
            ¿Qué pongo yo sobre la mesa?
          </h3>
          <ul className="mt-4 space-y-2 text-sm md:text-base opacity-90">
            <li>
              🔹 Diseño y desarrollo completo de la parte digital: landing/app,
              panel interno, sistemas de reservas o ventas, dashboards.
            </li>
            <li>
              🔹 Integración de pagos, analítica y automatizaciones para que el
              negocio no dependa de procesos manuales ni planillas infinitas.
            </li>
            <li>
              🔹 Visión de producto: priorizar features, construir MVPs
              realistas y medir tracción desde el día uno.
            </li>
            <li>
              🔹 Modelo de colaboración flexible: participación en utilidades y
              roadmap claro para crecer juntos en el largo plazo.
            </li>
          </ul>
          <p className="mt-4 text-xs md:text-sm opacity-70">
            Busco pocos proyectos, pero muy serios. Si tienes una idea con
            potencial real y estás dispuesto a comprometerte, podemos ver si
            tiene sentido construirlo en equipo.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

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
    >
      {/* SEO técnico: schema Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <motion.section className="py-8 md:py-16" variants={sectionVariants}>
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge mb-4">Disponible para proyectos selectos</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Diseño y desarrollo{" "}
            <span className="text-[rgb(var(--primary))]">web moderno</span> que
            impulsa resultados
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
      </motion.section>

      {/* SECCIÓN: Socio tecnológico conectada con /socios */}
      <PartnerCollabSection />

      {/* SERVICIOS */}
      <motion.section className="py-10 md:py-16" variants={sectionVariants}>
        <h2 className="text-2xl font-bold mb-6">Servicios</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div key={s.title} variants={sectionVariants}>
              <ServiceCard {...s} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PROYECTOS */}
      <motion.section className="py-10 md:py-16" variants={sectionVariants}>
        <h2 className="text-2xl font-bold mb-6">Proyectos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <motion.div key={p.title} variants={sectionVariants}>
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services" className="btn-primary">
            Ver lista completa de servicios
          </Link>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section className="py-10 md:py-16" variants={sectionVariants}>
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
      </motion.section>
    </motion.main>
  );
}
