"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Tu nombre"),
  email: z.string().email("Email inválido"),
  budget: z.string().optional(),
  message: z.string().min(10, "Cuéntame más del proyecto"),
  honeypot: z.string().max(0).optional(),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [ok, setOk] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    if (data.honeypot) return;
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setOk(res.ok);
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      <p className="opacity-90 mb-6">
        Proyectos con enfoque en valor real. Respondo en 24-48h.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
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
            placeholder="Qué quieres construir"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* hCaptcha opcional (agrega tu sitekey y descomenta)
        <div className="h-captcha" data-sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}></div>
        */}

        <button disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
        {ok && (
          <p className="text-green-600 mt-2">
            ¡Gracias! Te responderé muy pronto.
          </p>
        )}
      </form>
    </section>
  );
}
