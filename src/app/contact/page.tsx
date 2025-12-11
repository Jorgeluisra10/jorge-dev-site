"use client";

/**
 * ContactPage - Premium Version
 * ------------------------------------------------------------
 * - Detecta parámetros URL (?quote=...) para pre-llenar datos desde la calculadora.
 * - Diseño Split: Información contextual a la izquierda, formulario "Card" a la derecha.
 * - Inputs enriquecidos con iconos Lucide.
 */

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  DollarSign,
  MessageSquare,
  Send,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Loader2,
  MessageCircle,
} from "lucide-react";

/* ===================== Config & Validation ===================== */
const WHATSAPP_PHONE = "541150230176";

const schema = z.object({
  name: z.string().min(2, "Tu nombre es requerido"),
  email: z.string().email("Email inválido"),
  budget: z.string().optional(),
  message: z.string().min(10, "Cuéntame un poco más sobre el proyecto"),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

function buildWhatsAppMessage(data: FormData): string {
  const nameLine = data.name ? `*Nombre:* ${data.name}\n` : "";
  const emailLine = `*Email:* ${data.email}\n`;
  const budgetLine = data.budget ? `*Presupuesto:* ${data.budget}\n` : "";
  const msgLine = `\n*Mensaje:*\n${data.message}`;

  return (
    `Hola Jorge, vengo de tu web.\n\n` +
    nameLine +
    emailLine +
    budgetLine +
    msgLine
  ).trim();
}

function getWhatsAppLink(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/* ===================== Componente del Formulario ===================== */
function ContactForm() {
  const [opened, setOpened] = useState(false);
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // EFECTO: Detectar si venimos del cotizador
  useEffect(() => {
    const quoteParam = searchParams.get("quote");
    if (quoteParam) {
      try {
        const quote = JSON.parse(quoteParam);
        const prefill = `Hola, acabo de usar tu calculadora.\n\nProyecto: ${quote.project}\nEstimado: USD ${quote.total}\n\nMe gustaría agendar una reunión para validar estos números.`;
        setValue("message", prefill);
        setValue("budget", `~${quote.total} USD`);
      } catch (e) {
        console.error("Error parsing quote", e);
      }
    }
  }, [searchParams, setValue]);

  async function onSubmit(data: FormData) {
    if (data.honeypot) return;

    // Simular un pequeño delay para feedback visual
    await new Promise((resolve) => setTimeout(resolve, 800));

    const text = buildWhatsAppMessage(data);
    const url = getWhatsAppLink(WHATSAPP_PHONE, text);

    window.open(url, "_blank", "noopener,noreferrer");
    setOpened(true);
    reset();
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          type="text"
          {...register("honeypot")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid md:grid-cols-2 gap-5">
          {/* Nombre */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] ml-1">
              Nombre
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                placeholder="Tu nombre"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs ml-1 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] ml-1">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                placeholder="nombre@empresa.com"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs ml-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Presupuesto */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] ml-1">
            Rango de Presupuesto (USD)
          </label>
          <div className="relative group">
            <DollarSign className="absolute left-4 top-3.5 w-5 h-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
            <input
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
              placeholder="Ej: 1,500 - 3,000"
              {...register("budget")}
            />
          </div>
        </div>

        {/* Mensaje */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] ml-1">
            Tu Mensaje
          </label>
          <div className="relative group">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
            <textarea
              rows={5}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all resize-none"
              placeholder="Cuéntame sobre el proyecto, tiempos y objetivos..."
              {...register("message")}
            />
          </div>
          {errors.message && (
            <p className="text-red-500 text-xs ml-1 font-medium">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-[var(--primary)] text-[var(--on-primary)] font-bold text-center shadow-lg shadow-[var(--primary)]/20 flex items-center justify-center gap-2 text-base hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          {isSubmitting ? "Preparando..." : "Continuar en WhatsApp"}
        </button>

        {/* Mensaje de éxito post-envío */}
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-sm flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">¡Ventana abierta!</p>
              <p className="opacity-90">
                Si no se abrió WhatsApp automáticamente,{" "}
                <a
                  href={getWhatsAppLink(WHATSAPP_PHONE, "Hola...")}
                  target="_blank"
                  className="underline font-bold hover:text-green-800"
                >
                  haz clic aquí
                </a>
                .
              </p>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}

/* ===================== Página Principal ===================== */
export default function ContactPage(): React.JSX.Element {
  return (
    <section className="relative py-12 md:py-20 min-h-screen flex flex-col justify-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* COLUMNA IZQUIERDA: Contexto */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Disponible para proyectos
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-balance text-[var(--foreground)]">
                Hablemos de tu <br />
                <span className="text-[var(--primary)]">próximo impacto</span>
              </h1>

              <p className="text-lg text-[var(--muted)] leading-relaxed">
                No soy una agencia con intermediarios. Hablarás directamente
                conmigo. Cuéntame tu idea y veamos si podemos construir algo
                sólido.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[var(--surface)] border border-[var(--border)]">
                    <Mail className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase text-[var(--muted)] tracking-wider">
                      Email Directo
                    </p>
                    <a
                      href="mailto:jorgerodriguez1053@gmail.com"
                      className="text-lg font-medium hover:text-[var(--primary)] transition-colors"
                    >
                      jorgerodriguez1053@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[var(--surface)] border border-[var(--border)]">
                    <MessageCircle className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase text-[var(--muted)] tracking-wider">
                      Respuesta Rápida
                    </p>
                    <p className="text-lg font-medium">
                      WhatsApp (Prioritario)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[var(--surface)] border border-[var(--border)]">
                    <MapPin className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase text-[var(--muted)] tracking-wider">
                      Ubicación
                    </p>
                    <p className="text-lg font-medium">
                      Buenos Aires, Argentina (GMT-3)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Formulario */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-[2.5rem] bg-[var(--surface)] border border-[var(--border)] p-8 md:p-10 shadow-xl shadow-black/5 relative overflow-hidden"
            >
              {/* Decoración de fondo en tarjeta */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Enviar Mensaje</h3>
                  <p className="text-[var(--muted)] text-sm">
                    Te responderé en menos de 24 horas.
                  </p>
                </div>

                {/* Suspense es necesario para useSearchParams en Next.js App Router */}
                <Suspense
                  fallback={
                    <div className="h-64 animate-pulse bg-[var(--background)] rounded-xl" />
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
