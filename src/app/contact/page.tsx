"use client";

/**
 * ContactPage → Redirección a WhatsApp
 * ------------------------------------------------------------
 * - Validación con zod + react-hook-form (sin API).
 * - Honeypot anti-bot.
 * - Al enviar: construye un texto con los datos y abre WhatsApp
 *   en una nueva pestaña/pantalla con el mensaje prellenado.
 *
 *  Nota:
 *  - WhatsApp Web/App interpreta saltos de línea correctamente
 *    cuando se usa encodeURIComponent (no conviertas manualmente a %0A).
 */

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

/* ===================== Validación ===================== */
const schema = z.object({
  name: z.string().min(2, "Tu nombre"),
  email: z.string().email("Email inválido"),
  budget: z.string().optional(),
  message: z.string().min(10, "Cuéntame más del proyecto"),
  honeypot: z.string().max(0).optional(), // campo oculto anti-bot
});
type FormData = z.infer<typeof schema>;

/* ===================== Config WhatsApp ===================== */
/** Tu número en E.164 SIN el "+" para la URL */
const WHATSAPP_PHONE = "541150230176";

/** Arma el texto bonito para el mensaje de WhatsApp */
function buildWhatsAppMessage(data: FormData): string {
  const nameLine = data.name ? `Nombre: ${data.name}\n` : "";
  const budgetLine = data.budget
    ? `Presupuesto: ${data.budget}\n`
    : `Presupuesto: —\n`;
  const emailLine = `Email: ${data.email}\n`;
  const msgLine = `\nMensaje:\n${data.message}`;

  return (
    `Hola Jorge, te escribo desde tu web.\n` +
    nameLine +
    emailLine +
    budgetLine +
    msgLine
  );
}

/** Devuelve el deep link para abrir WhatsApp con el texto prellenado */
function getWhatsAppLink(phone: string, text: string): string {
  // Formato recomendado por WhatsApp: https://wa.me/{phone}?text={text}
  // `phone` debe ir sin '+' y sin espacios.
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export default function ContactPage(): React.JSX.Element {
  const [opened, setOpened] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    // Si el honeypot trae contenido, ignoramos (probable bot)
    if (data.honeypot) return;

    const text = buildWhatsAppMessage(data);
    const url = getWhatsAppLink(WHATSAPP_PHONE, text);

    // Abrimos en nueva pestaña; en móvil abrirá la app de WhatsApp
    window.open(url, "_blank", "noopener,noreferrer");
    setOpened(true);

    // Limpia el formulario para UX más pulida
    reset();
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      <p className="opacity-90 mb-6">
        Proyectos con enfoque en valor real. Te redirigiré a WhatsApp para que
        confirmes el envío.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
        {/* Honeypot oculto */}
        <input
          type="text"
          {...register("honeypot")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            className="w-full rounded-xl border bg-transparent px-4 py-3"
            placeholder="Tu nombre"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="w-full rounded-xl border bg-transparent px-4 py-3"
            placeholder="tucorreo@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Presupuesto</label>
          <input
            className="w-full rounded-xl border bg-transparent px-4 py-3"
            placeholder="USD 1,500 - 5,000"
            {...register("budget")}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Mensaje</label>
          <textarea
            rows={5}
            className="w-full rounded-xl border bg-transparent px-4 py-3"
            placeholder="¿Qué quieres construir?"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
        </button>

        {opened && (
          <p className="text-green-600 mt-2">
            Abrí WhatsApp en otra pestaña/ventana. Si no se abrió,{" "}
            <a
              className="underline"
              href={getWhatsAppLink(
                WHATSAPP_PHONE,
                buildWhatsAppMessage({
                  name: "",
                  email: "",
                  budget: "",
                  message: "Hola, Jorge. Vengo desde tu web.",
                  honeypot: "",
                })
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              haz clic aquí
            </a>
            .
          </p>
        )}
      </form>
    </section>
  );
}
