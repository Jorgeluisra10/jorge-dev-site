"use client";

import Link from "next/link";
import Image from "next/image";
import MotionFade from "@/components/MotionFade"; // Asumo que tienes este componente, si no, usa motion.div simple
import {
  Store,
  Laptop2,
  Users,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Briefcase,
  Target,
} from "lucide-react";

export default function SociosPage() {
  const steps = [
    {
      title: "1. Contexto inicial",
      description:
        "Rellenas un formulario corto. No necesito un Business Plan de 100 páginas, solo entender qué quieres construir, qué aportas tú y qué esperas de un socio tech.",
    },
    {
      title: "2. Química y Negocio",
      description:
        "Videollamada para bajar la idea a tierra: modelo de ingresos, riesgos, competencia y, lo más importante, ver si encajamos para trabajar juntos.",
    },
    {
      title: "3. El Acuerdo",
      description:
        "Defino mi aporte (producto, sistemas, automatización) y acordamos un modelo justo de participación (Equity, Revenue Share o Híbrido).",
    },
    {
      title: "4. Construcción",
      description:
        "Sprint de MVP. Nada de meses de desarrollo en la cueva. Lanzamos rápido, medimos tracción y evolucionamos el producto con datos reales.",
    },
  ];

  const projectTypes = [
    {
      icon: Store,
      label: "Negocio Físico + Capa Digital",
      desc: "Llevamos la operación física al siguiente nivel.",
      bullets: [
        "Cafeterías, gimnasios, tiendas.",
        "Sistemas de reservas y fidelización.",
        "Automatización de pedidos y stock.",
      ],
    },
    {
      icon: Laptop2,
      label: "Nativo Digital / SaaS",
      desc: "Productos que viven en internet.",
      bullets: [
        "Micro-SaaS y Marketplaces nicho.",
        "Plataformas de contenido exclusivo.",
        "Herramientas B2B específicas.",
      ],
    },
    {
      icon: Users,
      label: "Dupla Creador + Tech",
      desc: "Tú tienes la audiencia, yo el motor.",
      bullets: [
        "Tú: Contenido, comunidad, ventas.",
        "Yo: Web, funnels, automatizaciones.",
        "Monetización de audiencias.",
      ],
    },
  ];

  const faq = [
    {
      q: "¿Necesito tener capital para aplicar?",
      a: "No es obligatorio, pero ayuda. Lo vital es que la idea tenga tracción potencial y tú aportes valor real (tiempo operativo, local, contactos, proveedores). Busco socios que ejecutan, no solo 'ideas'.",
    },
    {
      q: "¿Siempre trabajas a porcentaje?",
      a: "Es la prioridad de esta página: riesgo compartido. Sin embargo, si tu proyecto requiere mucha carga operativa inicial mía sin validación, podemos plantear un modelo híbrido (fee reducido + % menor).",
    },
    {
      q: "¿En qué porcentaje sueles moverte?",
      a: "Depende radicalmente del proyecto. Desde un 10-15% si soy un socio tecnológico consultivo, hasta un 50% si el producto digital ES el negocio completo.",
    },
    {
      q: "¿Qué pasa si no funciona?",
      a: "Fail fast. Definimos hitos de revisión (3, 6 meses). Si no hay tracción, cerramos ordenadamente. Sin ataduras eternas ni letras chicas. Las relaciones claras conservan amistades.",
    },
  ];

  return (
    <main className="pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 border-b border-[var(--border)] overflow-hidden">
        {/* Dot Pattern Background */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            {/* Texto Hero */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
                <Briefcase className="w-3 h-3" />
                Partnership Program
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-balance leading-[1.1]">
                Co-fundo negocios como <br />
                <span className="text-[var(--primary)] relative inline-block">
                  Socio Tecnológico
                  <svg
                    className="absolute w-full h-2 bottom-1 left-0 text-[var(--primary)] opacity-20"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--muted)] max-w-xl text-balance leading-relaxed">
                Si tienes una visión de negocio y disposición para ejecutar, yo
                pongo la arquitectura digital, el producto y la estrategia
                técnica.
                <strong className="text-[var(--foreground)] font-medium">
                  {" "}
                  Skin in the game real.
                </strong>
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/contact"
                  className="btn-primary h-12 px-8 text-base"
                >
                  Aplicar como socio
                </Link>
                <Link
                  href="#como-funciona"
                  className="btn-ghost h-12 px-6 text-base bg-[var(--surface)] border-[var(--border)]"
                >
                  Ver proceso
                </Link>
              </div>
            </div>

            {/* Ilustración Hero (Card Flotante) */}
            <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent rounded-[2.5rem] blur-2xl -z-10" />
              <div className="relative aspect-[4/5] rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                <Image
                  src="/images/primer.png"
                  alt="Ilustración Jorge Socio"
                  fill
                  className="object-contain p-8 hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TIPOS DE PROYECTOS (Bento Grid) ================= */}
      <section
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        id="tipos"
      >
        <MotionFade>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4 tracking-tight">
                ¿Qué busco exactamente?
              </h2>
              <p className="text-[var(--muted)] text-lg text-balance">
                No busco "ideas millonarias" abstractas. Busco tracción, nichos
                claros y socios operativos.
              </p>
            </div>
            {/* Mini ilustración decorativa */}
            <div className="hidden md:block relative w-24 h-24 opacity-80">
              <Image
                src="/images/segunda.png"
                alt="Icono"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projectTypes.map((type) => (
              <div
                key={type.label}
                className="group relative rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 hover:border-[var(--primary)]/50 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform">
                  <type.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold mb-2">{type.label}</h3>
                <p className="text-sm text-[var(--muted)] mb-6">{type.desc}</p>

                <ul className="space-y-3">
                  {type.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm opacity-80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MotionFade>
      </section>

      {/* ================= CÓMO FUNCIONA ================= */}
      <section
        className="py-16 md:py-24 bg-[var(--surface)] border-y border-[var(--border)]"
        id="como-funciona"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionFade>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">
                El proceso, sin rodeos
              </h2>
              <p className="text-[var(--muted)] text-lg text-balance">
                Transparencia radical desde el día 1. Hablamos de riesgos y
                beneficios antes de escribir código.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Línea conectora (Desktop) */}
              <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-[var(--border)] -z-10" />

              {steps.map((step, idx) => (
                <div key={step.title} className="relative pt-8">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center font-bold text-sm mb-6 border-4 border-[var(--surface)] relative z-10">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </MotionFade>
        </div>
      </section>

      {/* ================= COMPARATIVA DE APORTE ================= */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionFade>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Tarjeta: Lo que yo aporto */}
            <div className="rounded-[2.5rem] bg-[var(--surface)] border border-[var(--border)] p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                  👨‍💻
                </span>
                Mi responsabilidad
              </h3>

              <ul className="space-y-4">
                {[
                  "Desarrollo End-to-End (Web, App, Panel)",
                  "Automatización y pagos (Stripe, MP)",
                  "Arquitectura escalable y seguridad",
                  "Estrategia de Producto & UX",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[var(--muted)]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tarjeta: Lo que tú aportas */}
            <div className="rounded-[2.5rem] bg-[var(--background)] border border-[var(--border)] p-8 md:p-10 relative overflow-hidden">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                  🤝
                </span>
                Tu responsabilidad
              </h3>

              <ul className="space-y-4">
                {[
                  "Conocimiento del sector / nicho",
                  "Operación del negocio y ventas",
                  "Capital inicial (si aplica)",
                  "Compromiso de ejecución real",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[var(--muted)]"
                  >
                    <Target className="w-5 h-5 text-[var(--foreground)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </MotionFade>
      </section>

      {/* ================= MODELOS & FAQ ================= */}
      <section className="py-16 md:py-24 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionFade>
            <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 items-start">
              {/* Columna FAQ */}
              <div>
                <h2 className="text-3xl font-bold mb-8">
                  Preguntas Frecuentes
                </h2>
                <div className="space-y-4">
                  {faq.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-[var(--border)] bg-[var(--background)] open:bg-[var(--surface)] transition-all duration-300"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-medium">
                        <span className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-[var(--muted)] group-open:text-[var(--primary)]" />
                          {item.q}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[var(--muted)] transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-5 pb-5 text-[var(--muted)] text-sm leading-relaxed border-t border-transparent group-open:border-[var(--border)] group-open:pt-4">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Columna Modelos (Ilustración) */}
              <div className="sticky top-24">
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">Modelos flexibles</h3>
                  <p className="text-sm text-[var(--muted)] mb-8">
                    Equity puro, Revenue Share o Híbridos.
                  </p>

                  <div className="relative aspect-square w-full max-w-xs mx-auto">
                    <Image
                      src="/images/tercera.png"
                      alt="Ilustración Partnership"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 text-center">
        <MotionFade>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
            ¿Construimos algo juntos?
          </h3>
          <p className="text-lg text-[var(--muted)] mb-10 max-w-xl mx-auto text-balance">
            Si has llegado hasta aquí y tienes una idea que te quita el sueño,
            veamos si soy la pieza que le falta a tu puzzle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary w-full sm:w-auto h-14 px-10 text-lg shadow-xl shadow-[var(--primary)]/20 hover:scale-105 transition-transform"
            >
              Enviar propuesta ahora
            </Link>
          </div>
        </MotionFade>
      </section>
    </main>
  );
}
