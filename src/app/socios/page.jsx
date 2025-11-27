"use client";

/**
 * SociosPage
 * ------------------------------------------------------------
 * Página específica para explicar la propuesta de colaboración:
 * - Hero con propuesta clara de co-creación.
 * - Secciones para negocios físicos, proyectos digitales y duplas contenido+tech.
 * - Ilustraciones en /public/images.
 */

import Link from "next/link";
import Image from "next/image";
import MotionFade from "@/components/MotionFade";

export default function SociosPage() {
  const steps = [
    {
      title: "1. Me cuentas tu idea con contexto",
      description:
        "Rellenas un formulario corto donde explicas qué quieres construir, qué aportas tú (experiencia, comunidad, capital, tiempo) y qué esperas de un socio tecnológico.",
    },
    {
      title: "2. Llamada de evaluación",
      description:
        "Agendamos una videollamada para bajar la idea a tierra: modelo de negocio, riesgos, supuestos, roadmap inicial y si realmente encajamos para trabajar juntos.",
    },
    {
      title: "3. Propuesta de colaboración",
      description:
        "Defino qué puedo aportar (producto digital, sistemas, automatización, etc.) y acordamos un modelo justo de participación, hitos y responsabilidades.",
    },
    {
      title: "4. Construcción y evolución",
      description:
        "Creamos un MVP, medimos tracción y vamos iterando. Si el proyecto crece, la relación también: nuevas funcionalidades, procesos más sólidos y visión de largo plazo.",
    },
  ];

  const projectTypes = [
    {
      label: "Negocios físicos con capa digital",
      bullets: [
        "Cafeterías, restaurantes, barberías, gimnasios, tiendas físicas.",
        "Reservas online, pedidos, membresías, programas de fidelización.",
        "Panel interno para manejar clientes, ventas y métricas.",
      ],
    },
    {
      label: "Proyectos 100% digitales",
      bullets: [
        "SaaS pequeños, marketplaces nicho, plataformas de contenido.",
        "Productos para resolver problemas específicos en la vida real.",
        "Sistemas internos para automatizar procesos de negocios existentes.",
      ],
    },
    {
      label: "Duplas: contenido + tecnología",
      bullets: [
        "Tú te encargas de redes, comunidad y ventas.",
        "Yo construyo todo el backoffice digital (web, funnels, automatizaciones).",
        "Ideal para creadores que quieren pasar de audiencia a producto.",
      ],
    },
  ];

  const faq = [
    {
      q: "¿Necesito tener capital para aplicar?",
      a: "No es obligatorio, pero ayuda. Lo importante es que la idea tenga sentido, tú puedas aportar algo real (tiempo, experiencia, comunidad, local, proveedores) y haya compromiso. No estoy buscando solo ideas, sino personas que quieran ejecutar.",
    },
    {
      q: "¿Siempre trabajas a porcentaje o a veces cobras como servicio?",
      a: "Depende del proyecto. La prioridad de esta página son acuerdos de colaboración con participación, pero si tu caso encaja mejor como servicio puntual (ej. solo una web o dashboard), podemos verlo aparte.",
    },
    {
      q: "¿En qué porcentaje sueles moverte?",
      a: "Varía según el tipo de proyecto y el esfuerzo tech que implique. Puede ir desde una participación moderada si solo construyo una parte específica, hasta un rol más fuerte si la capa digital es el corazón del negocio.",
    },
    {
      q: "¿Qué pasa si el proyecto no despega?",
      a: "Intentamos basarnos en datos: definimos hitos, tiempos razonables y puntos de revisión. Si no hay tracción, podemos ajustar la estrategia o cerrar el ciclo con claridad, sin dramas ni sorpresas.",
    },
  ];

  return (
    <main className="py-10 md:py-16">
      {/* HERO (sin MotionFade para que aparezca inmediato) */}
      <section className="pb-12 md:pb-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
          <div>
            <span className="badge mb-4">
              Colaboremos en realidad · No solo una web
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Co-creo{" "}
              <span className="text-[rgb(var(--primary))]">
                negocios y proyectos
              </span>{" "}
              como socio tecnológico, no como proveedor más.
            </h1>
            <p className="mt-4 text-base md:text-lg opacity-90 max-w-xl">
              Si tienes una idea de negocio —físico o digital— y estás dispuesto
              a poner trabajo real, yo me encargo de la parte tecnológica:
              producto, sistemas, automatización y experiencia digital. Podemos
              construir algo juntos donde ambos tengamos skin in the game.
            </p>
            <p className="mt-3 text-sm md:text-base opacity-80 max-w-xl">
              Esto aplica tanto para negocios de calle (cafeterías, tiendas,
              servicios) como para creadores de contenido, proyectos SaaS,
              marketplaces nicho y cualquier iniciativa donde la tecnología sea
              una pieza clave.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Proponer un proyecto
              </Link>
              <Link href="#como-funciona" className="btn-ghost">
                Ver cómo funciona
              </Link>
            </div>
          </div>

          {/* Ilustración principal (avatar caricatura / escena) */}
          <div className="relative mx-auto w-40 sm:w-56 md:w-full max-w-sm">
            <div className="relative aspect-[4/5] rounded-3xl border shadow-sm overflow-hidden">
              <Image
                src="/images/primer.png"
                alt="Ilustración de Jorge como socio tecnológico"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* TIPOS DE PROYECTOS */}
      <section className="py-10 md:py-14 border-t" id="tipos">
        <MotionFade>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                ¿Qué tipo de proyectos estoy buscando?
              </h2>
              <p className="mt-2 text-sm md:text-base opacity-80 max-w-2xl">
                No busco “ideas millonarias” sin base, sino proyectos donde
                puedas aportar algo real y la parte tecnológica marque
                diferencia: desde negocios locales con ambición hasta productos
                digitales que necesiten un socio técnico estable.
              </p>
            </div>
            {/* Mini-ilustración / icono metafórico */}
            <div className="mx-auto w-32 md:w-40">
              <div className="relative aspect-[4/3] rounded-2xl border overflow-hidden">
                <Image
                  src="/images/segunda.png"
                  alt="Ilustración de tipos de proyectos"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {projectTypes.map((type) => (
              <div
                key={type.label}
                className="rounded-2xl border p-6 flex flex-col justify-between"
              >
                <h3 className="text-lg font-semibold mb-3">{type.label}</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  {type.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MotionFade>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-10 md:py-14 border-t" id="como-funciona">
        <MotionFade>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Cómo trabajaremos si encajamos
              </h2>
              <p className="mt-2 text-sm md:text-base opacity-80 max-w-2xl">
                Quiero que el proceso sea transparente desde el principio. Nada
                de promesas vagas: hablamos claro de responsabilidades, tiempos,
                riesgos y posibles escenarios antes de escribir una sola línea
                de código.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, idx) => (
              <div key={step.title} className="rounded-2xl border p-6">
                <span className="text-xs font-medium uppercase tracking-[0.2em] opacity-60">
                  Paso {idx + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm md:text-base opacity-85">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </MotionFade>
      </section>

      {/* APORTE DE CADA PARTE */}
      <section className="py-10 md:py-14 border-t">
        <MotionFade>
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div className="rounded-2xl border p-6 md:p-7">
              <h3 className="text-lg md:text-xl font-semibold">
                ¿Qué pongo yo sobre la mesa?
              </h3>
              <ul className="mt-4 space-y-2 text-sm md:text-base opacity-90">
                <li>
                  🔹 Diseño y desarrollo completo de la parte digital: landing,
                  panel interno, sistemas de reservas o ventas, dashboards.
                </li>
                <li>
                  🔹 Integración de pagos, analítica, CRM ligero y
                  automatizaciones para que el negocio no dependa de planillas
                  infinitas.
                </li>
                <li>
                  🔹 Visión de producto: priorizar features, construir MVPs
                  realistas y evitar quemar tiempo en cosas que no mueven la
                  aguja.
                </li>
                <li>
                  🔹 Acompañamiento a largo plazo mientras el proyecto tenga
                  sentido para ambas partes.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border p-6 md:p-7">
              <h3 className="text-lg md:text-xl font-semibold">
                ¿Qué espero de la otra parte?
              </h3>
              <ul className="mt-4 space-y-2 text-sm md:text-base opacity-90">
                <li>
                  🔹 Compromiso real: tiempo para ejecutar, no solo entusiasmo
                  de fin de semana.
                </li>
                <li>
                  🔹 Aporte concreto: puede ser experiencia en el sector,
                  comunidad, capital, acceso a clientes, contactos o un negocio
                  ya en marcha.
                </li>
                <li>
                  🔹 Comunicación transparente: hablar de números, miedos y
                  expectativas desde el inicio.
                </li>
                <li>
                  🔹 Mentalidad de equipo: esto no va de “el programador que
                  hace magia”, sino de construir algo en conjunto.
                </li>
              </ul>
            </div>
          </div>
        </MotionFade>
      </section>

      {/* MODELOS DE COLABORACIÓN */}
      <section className="py-10 md:py-14 border-t">
        <MotionFade>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Modelos de colaboración posibles
              </h2>
              <p className="mt-2 text-sm md:text-base opacity-80 max-w-2xl">
                Cada proyecto es distinto, pero en general la lógica es simple:
                si la tecnología sostiene gran parte del valor del negocio, mi
                participación también debe reflejarlo. Podemos combinar
                porcentaje, honorarios moderados y objetivos por hitos.
              </p>
              <ul className="mt-4 space-y-2 text-sm md:text-base opacity-90">
                <li>
                  🔹 <strong>Participación en utilidades</strong> a cambio del
                  desarrollo y evolución del producto digital.
                </li>
                <li>
                  🔹 <strong>Parte fija pequeña</strong> para cubrir costos
                  mínimos + porcentaje que crece si el negocio funciona.
                </li>
                <li>
                  🔹 <strong>Acuerdos por fases</strong>: MVP, tracción inicial,
                  expansión. En cada fase revisamos números y ajustes.
                </li>
                <li>
                  🔹 Documentamos todo por escrito para evitar malentendidos a
                  largo plazo.
                </li>
              </ul>
            </div>

            {/* Ilustración de “acuerdo / partnership” */}
            <div className="relative w-40 sm:w-52 md:w-full max-w-sm mx-auto">
              <div className="relative aspect-[4/3] rounded-3xl border overflow-hidden">
                <Image
                  src="/images/tercera.png"
                  alt="Ilustración de colaboración y acuerdos"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </MotionFade>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-14 border-t">
        <MotionFade>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border p-4 md:p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-medium text-sm md:text-base">
                    {item.q}
                  </span>
                  <span className="text-xs opacity-60 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-2 text-sm md:text-base opacity-85">{item.a}</p>
              </details>
            ))}
          </div>
        </MotionFade>
      </section>

      {/* CTA FINAL */}
      <section className="py-10 md:py-16 border-t">
        <MotionFade>
          <div className="rounded-2xl p-8 md:p-10 border text-center max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold">
              ¿Te suena construir algo juntos?
            </h3>
            <p className="mt-2 text-sm md:text-base opacity-85">
              Si tienes una idea con potencial y estás dispuesto a poner
              trabajo, podemos explorar si tiene sentido aliarnos. Prefiero
              pocos proyectos, pero bien hechos.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Enviar mi propuesta
              </Link>
              <Link href="/" className="btn-ghost">
                Volver al inicio
              </Link>
            </div>
          </div>
        </MotionFade>
      </section>
    </main>
  );
}
