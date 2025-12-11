"use client";

import type { JSX } from "react";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image"; // Necesitas: npm install html-to-image
import {
  DollarSign,
  Percent,
  Settings2,
  Download,
  Mail,
  CheckCircle2,
  Layout,
  ShoppingCart,
  Database,
  Globe2,
  Paintbrush,
  Clock,
  Code2,
  ChevronDown,
  Layers,
  MessageCircle,
  ImageIcon,
  Share2,
  Loader2,
} from "lucide-react";

/* =================== CONFIGURACIÓN =================== */
const PHONE_NUMBER = "5491150230176"; // PON AQUÍ TU NÚMERO (Con código país, sin +)

const BASES = {
  landing: {
    label: "Landing Page",
    base: 150,
    basePages: 1,
    icon: Layout,
    desc: "Conversión rápida y captación.",
  },
  corporate: {
    label: "Corporativa",
    base: 350,
    basePages: 5,
    icon: Globe2,
    desc: "Presencia de marca sólida.",
  },
  ecommerce: {
    label: "E-commerce",
    base: 850,
    basePages: 8,
    icon: ShoppingCart,
    desc: "Catálogo y ventas online.",
  },
  saas: {
    label: "Web App / SaaS",
    base: 1500,
    basePages: 10,
    icon: Database,
    desc: "Funcionalidad avanzada.",
  },
} as const;

const COMPLEXITY = {
  basic: { label: "Esencial", multiplier: 1.0, tip: "Limpio y funcional" },
  pro: { label: "Profesional", multiplier: 1.3, tip: "Branding detallado" },
  premium: { label: "Premium", multiplier: 1.6, tip: "Experiencia inmersiva" },
} as const;

const CMS = {
  none: { label: "Sin CMS (Código puro)", add: 0 },
  headless: { label: "Headless CMS (Sanity/Strapi)", add: 250 },
  fullcms: { label: "CMS Completo (WordPress/Webflow)", add: 450 },
} as const;

const COMMERCE = {
  none: { label: "Sin tienda", add: 0 },
  lite: { label: "Checkout Básico (Stripe Link)", add: 300 },
  pro: { label: "Tienda Completa (Shopify/Woo)", add: 900 },
} as const;

const SEO = {
  none: { label: "Básico", add: 0 },
  basic: { label: "SEO Técnico On-page", add: 150 },
  advanced: { label: "SEO Growth Strategy", add: 400 },
} as const;

const COPY = {
  none: { label: "Cliente entrega textos", add: 0 },
  basic: { label: "Revisión UX Writing", add: 100 },
  full: { label: "Redacción Persuasiva", add: 300 },
} as const;

const ANIM = {
  none: { label: "Estándar", add: 0 },
  subtle: { label: "Micro-interacciones", add: 150 },
  advanced: { label: "Scrollytelling / 3D", add: 450 },
} as const;

const URGENCY = {
  normal: { label: "Estándar", multiplier: 1.0, tip: "Plazo regular" },
  fast: { label: "Prioritario", multiplier: 1.25, tip: "-25% tiempo" },
  express: { label: "Express", multiplier: 1.5, tip: "Urgente" },
} as const;

const MAINTENANCE = {
  none: { label: "Sin mantenimiento", monthly: 0 },
  basic: { label: "Hosting + Actualizaciones", monthly: 30 },
  pro: { label: "Growth Partner (Soporte)", monthly: 100 },
} as const;

const ADDITIONAL_PAGE_PRICE = 50;
const INTEGRATION_UNIT = 80;
const FIRST_DISCOUNT_RATE = 0.2;

/* =================== UTILS =================== */
function usd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/* =================== COMPONENTE PRINCIPAL =================== */
export default function PriceCalculatorUSD(): JSX.Element {
  // Referencia para la captura de imagen
  const summaryRef = useRef<HTMLDivElement>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // State initialization
  const [siteType, setSiteType] = useState<keyof typeof BASES>("landing");
  const [pages, setPages] = useState<number>(BASES.landing.basePages);
  const [complexity, setComplexity] =
    useState<keyof typeof COMPLEXITY>("basic");
  const [cms, setCms] = useState<keyof typeof CMS>("none");
  const [commerce, setCommerce] = useState<keyof typeof COMMERCE>("none");
  const [seo, setSeo] = useState<keyof typeof SEO>("none");
  const [copy, setCopy] = useState<keyof typeof COPY>("none");
  const [anim, setAnim] = useState<keyof typeof ANIM>("none");
  const [integrations, setIntegrations] = useState<number>(0);
  const [urgency, setUrgency] = useState<keyof typeof URGENCY>("normal");
  const [maintenance, setMaintenance] =
    useState<keyof typeof MAINTENANCE>("none");
  const [coupon, setCoupon] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. PERSISTENCIA: Cargar datos al montar (Client-side only)
  useEffect(() => {
    const saved = localStorage.getItem("calculator-state-v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validamos que los datos existan para evitar errores si cambiamos la estructura
        if (parsed.siteType) setSiteType(parsed.siteType);
        if (parsed.pages) setPages(parsed.pages);
        if (parsed.complexity) setComplexity(parsed.complexity);
        if (parsed.cms) setCms(parsed.cms);
        if (parsed.commerce) setCommerce(parsed.commerce);
        if (parsed.seo) setSeo(parsed.seo);
        if (parsed.copy) setCopy(parsed.copy);
        if (parsed.anim) setAnim(parsed.anim);
        if (parsed.integrations) setIntegrations(parsed.integrations);
        if (parsed.urgency) setUrgency(parsed.urgency);
        if (parsed.maintenance) setMaintenance(parsed.maintenance);
        if (parsed.coupon) setCoupon(parsed.coupon);
      } catch (e) {
        console.error("Error cargando caché", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. PERSISTENCIA: Guardar datos cuando cambian
  useEffect(() => {
    if (!isLoaded) return; // No guardar hasta que hayamos cargado
    const state = {
      siteType,
      pages,
      complexity,
      cms,
      commerce,
      seo,
      copy,
      anim,
      integrations,
      urgency,
      maintenance,
      coupon,
    };
    localStorage.setItem("calculator-state-v1", JSON.stringify(state));
  }, [
    siteType,
    pages,
    complexity,
    cms,
    commerce,
    seo,
    copy,
    anim,
    integrations,
    urgency,
    maintenance,
    coupon,
    isLoaded,
  ]);

  // Actualizar páginas mínimas al cambiar tipo (lógica de negocio)
  useEffect(() => {
    // Solo si el usuario pone menos páginas de las base, las subimos
    if (pages < BASES[siteType].basePages) {
      setPages(BASES[siteType].basePages);
    }
  }, [siteType]);

  const discountActive = coupon.trim().toUpperCase() === "FIRST20";

  // Calculations
  const breakdown = useMemo(() => {
    const baseConf = BASES[siteType];
    const base = baseConf.base;

    // Costos directos
    const extraPages = Math.max(0, pages - baseConf.basePages);
    const pagesCost = extraPages * ADDITIONAL_PAGE_PRICE;
    const cmsCost = CMS[cms].add;
    const shopCost = COMMERCE[commerce].add;
    const seoCost = SEO[seo].add;
    const copyCost = COPY[copy].add;
    const animCost = ANIM[anim].add;
    const integrationsCost = clamp(integrations, 0, 20) * INTEGRATION_UNIT;

    const preMult =
      base +
      pagesCost +
      cmsCost +
      shopCost +
      seoCost +
      copyCost +
      animCost +
      integrationsCost;

    const withComplexity = preMult * COMPLEXITY[complexity].multiplier;
    const withUrgency = withComplexity * URGENCY[urgency].multiplier;

    const oneTimeSubtotal = Math.round(withUrgency);
    const discount = discountActive
      ? Math.round(oneTimeSubtotal * FIRST_DISCOUNT_RATE)
      : 0;
    const oneTimeTotal = oneTimeSubtotal - discount;

    const monthly = MAINTENANCE[maintenance].monthly;
    const upfront = Math.round(oneTimeTotal * 0.5);
    const delivery = oneTimeTotal - upfront;

    return {
      base,
      pagesCost,
      cmsCost,
      shopCost,
      seoCost,
      copyCost,
      animCost,
      integrationsCost,
      oneTimeSubtotal,
      discount,
      oneTimeTotal,
      monthly,
      upfront,
      delivery,
    };
  }, [
    siteType,
    pages,
    complexity,
    cms,
    commerce,
    seo,
    copy,
    anim,
    integrations,
    urgency,
    maintenance,
    discountActive,
  ]);

  // 3. WHATSAPP HANDLER
  const handleWhatsApp = () => {
    const text = `
*Hola! Me interesa cotizar este proyecto:*
--------------------------------
🚀 *Tipo:* ${BASES[siteType].label}
📄 *Páginas:* ${pages}
🎨 *Diseño:* ${COMPLEXITY[complexity].label}
⚡ *Entrega:* ${URGENCY[urgency].label}
--------------------------------
*Extras:*
• CMS: ${CMS[cms].label}
• Tienda: ${COMMERCE[commerce].label}
• SEO: ${SEO[seo].label}
• Copy: ${COPY[copy].label}
• Mantenimiento: ${MAINTENANCE[maintenance].label}
--------------------------------
💰 *Estimado Total: ${usd(breakdown.oneTimeTotal)}*
${discountActive ? "(Descuento FIRST20 aplicado)" : ""}
`.trim();

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  // 4. IMAGE DOWNLOAD HANDLER
  const handleDownloadImage = useCallback(async () => {
    if (!summaryRef.current) return;
    setIsGeneratingImage(true);

    try {
      // Pequeño delay para asegurar que el usuario vea el loader
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(summaryRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff", // Asegura fondo blanco si es PNG transparente
        style: {
          borderRadius: "32px", // Forzar bordes redondeados en la imagen
        },
        // Ocultar elementos específicos en la foto si es necesario
        filter: (node) => {
          return !node.classList?.contains("exclude-from-image");
        },
      });

      const link = document.createElement("a");
      link.download = `cotizacion-${siteType}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generando imagen", err);
      alert("Hubo un error al generar la imagen. Intenta de nuevo.");
    } finally {
      setIsGeneratingImage(false);
    }
  }, [siteType]);

  const contactHref = `/contact?quote=${encodeURIComponent(
    JSON.stringify({
      project: BASES[siteType].label,
      total: breakdown.oneTimeTotal,
    })
  )}`;

  if (!isLoaded)
    return (
      <div className="p-10 text-center opacity-50">
        Cargando preferencias...
      </div>
    );

  return (
    <div className="w-full relative text-[var(--foreground)]">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 relative">
        {/* LEFT COLUMN: Controls */}
        <div className="xl:col-span-8 space-y-10">
          {/* 1. TIPO DE PROYECTO */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <Layout className="w-5 h-5" />
              </div>
              ¿Qué vamos a construir?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(BASES).map(([key, val]) => {
                const Icon = val.icon;
                const isSelected = siteType === key;
                return (
                  <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    key={key}
                    onClick={() => setSiteType(key as any)}
                    className={`group relative p-5 rounded-2xl text-left border-2 transition-all duration-300 overflow-hidden ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--surface)] shadow-lg ring-1 ring-[var(--primary)]/20"
                        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <div className="relative z-10 flex justify-between items-start mb-4">
                      <div
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          isSelected
                            ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-md"
                            : "bg-[var(--background)] text-[var(--muted)] group-hover:text-[var(--primary)]"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      {isSelected && (
                        <div className="text-[var(--primary)]">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="relative z-10">
                      <h4
                        className={`font-bold text-lg mb-1 ${
                          isSelected
                            ? "text-[var(--primary-strong)]"
                            : "text-[var(--foreground)]"
                        }`}
                      >
                        {val.label}
                      </h4>
                      <p className="text-sm text-[var(--muted)] mb-4 font-medium">
                        {val.desc}
                      </p>
                      <div className="text-xs font-bold px-2 py-1 rounded border inline-block bg-[var(--background)] border-[var(--border)] text-[var(--muted)]">
                        Base {usd(val.base)}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* 2. SLIDERS (Alcance) */}
          <section className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
              <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <Settings2 className="w-5 h-5" />
              </div>
              Alcance y Escala
            </h3>

            <div className="space-y-10 relative z-10">
              {/* Pages Slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-bold text-base flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[var(--muted)]" /> Páginas
                    Totales
                  </label>
                  <div className="text-right bg-[var(--background)] px-3 py-1 rounded-lg border border-[var(--border)]">
                    <span className="text-xl font-black text-[var(--primary)] tabular-nums">
                      {pages}
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={BASES[siteType].basePages}
                  max={50}
                  value={pages}
                  onChange={(e) => setPages(parseInt(e.target.value))}
                  className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)] hover:accent-[var(--primary-strong)] transition-all"
                />
                <div className="flex justify-between mt-2 text-xs font-bold text-[var(--muted)] uppercase tracking-wide">
                  <span>Min: {BASES[siteType].basePages}</span>
                  <span>Max: 50</span>
                </div>
              </div>

              <div className="w-full h-px bg-[var(--border)]"></div>

              {/* Integrations Slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-bold text-base flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[var(--muted)]" />{" "}
                    Integraciones API
                  </label>
                  <div className="text-right bg-[var(--background)] px-3 py-1 rounded-lg border border-[var(--border)]">
                    <span className="text-xl font-black text-[var(--primary)] tabular-nums">
                      {integrations}
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={integrations}
                  onChange={(e) => setIntegrations(parseInt(e.target.value))}
                  className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)] hover:accent-[var(--primary-strong)] transition-all"
                />
                <p className="text-xs text-[var(--muted)] mt-3">
                  Ejemplos: Pasarelas de pago (Stripe), CRMs, Google Maps, Auth,
                  etc.
                </p>
              </div>
            </div>
          </section>

          {/* 3. NIVEL Y VELOCIDAD */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Diseño */}
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Paintbrush className="w-4 h-4 text-[var(--primary)]" /> Nivel
                de Diseño
              </h3>
              <div className="space-y-2">
                {Object.entries(COMPLEXITY).map(([key, val]) => {
                  const isActive = complexity === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setComplexity(key as any)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? "border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)] ring-1 ring-[var(--primary)]/30"
                          : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]/50"
                      }`}
                    >
                      <div className="text-left">
                        <div
                          className={`text-sm font-bold ${
                            isActive ? "text-[var(--primary)]" : ""
                          }`}
                        >
                          {val.label}
                        </div>
                        <div className="text-xs opacity-70">{val.tip}</div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-[var(--primary)] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Velocidad */}
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--primary)]" /> Tiempo de
                Entrega
              </h3>
              <div className="space-y-2">
                {Object.entries(URGENCY).map(([key, val]) => {
                  const isActive = urgency === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setUrgency(key as any)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? "border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)] ring-1 ring-[var(--primary)]/30"
                          : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]/50"
                      }`}
                    >
                      <div className="text-left">
                        <div
                          className={`text-sm font-bold ${
                            isActive ? "text-[var(--primary)]" : ""
                          }`}
                        >
                          {val.label}
                        </div>
                        <div className="text-xs opacity-70">{val.tip}</div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-[var(--primary)] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* 4. EXTRAS TÉCNICOS */}
          <section>
            <h3 className="text-xl font-bold mb-6">
              Especificaciones Técnicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "Gestión de Contenido",
                  val: cms,
                  set: setCms,
                  opts: CMS,
                },
                {
                  label: "Tienda / Pagos",
                  val: commerce,
                  set: setCommerce,
                  opts: COMMERCE,
                },
                { label: "Estrategia SEO", val: seo, set: setSeo, opts: SEO },
                { label: "Copywriting", val: copy, set: setCopy, opts: COPY },
                {
                  label: "Animación Web",
                  val: anim,
                  set: setAnim,
                  opts: ANIM,
                },
                {
                  label: "Mantenimiento Mensual",
                  val: maintenance,
                  set: setMaintenance,
                  opts: MAINTENANCE,
                  monthly: true,
                },
              ].map((field, i) => (
                <div
                  key={i}
                  className="group relative bg-[var(--surface)] rounded-2xl border border-[var(--border)] hover:border-[var(--primary)]/40 transition-all"
                >
                  <label className="absolute top-2.5 left-4 text-[10px] uppercase font-bold text-[var(--muted)] tracking-wider pointer-events-none">
                    {field.label}
                  </label>
                  <div className="relative">
                    <select
                      value={field.val}
                      onChange={(e) => field.set(e.target.value as any)}
                      className="w-full pt-7 pb-3 px-4 rounded-2xl bg-transparent outline-none appearance-none cursor-pointer font-bold text-sm text-[var(--foreground)] focus:ring-0 border-none"
                    >
                      {Object.entries(field.opts).map(([k, v]: any) => {
                        const cost = field.monthly ? v.monthly : v.add;
                        const price =
                          cost === 0
                            ? ""
                            : `(+${usd(cost)}${field.monthly ? "/mes" : ""})`;
                        return (
                          <option key={k} value={k}>
                            {v.label} {price}
                          </option>
                        );
                      })}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-[10%] w-4 h-4 text-[var(--muted)] pointer-events-none group-hover:text-[var(--primary)]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COUPON */}
          <div className="bg-[var(--surface)] p-6 rounded-2xl border border-dashed border-[var(--border)] flex flex-wrap items-center gap-5">
            <div className="w-10 h-10 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
              <Percent className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-sm">¿Tienes un código?</h5>
              <p className="text-xs text-[var(--muted)] mt-1">
                Usa{" "}
                <span className="font-mono font-bold px-1 rounded border border-[var(--border)]">
                  FIRST20
                </span>{" "}
                para un 20% OFF en tu primer pedido.
              </p>
            </div>
            <input
              type="text"
              placeholder="CÓDIGO"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-28 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm font-bold text-center focus:outline-none focus:border-[var(--primary)] uppercase placeholder:text-[var(--muted)]/50"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Floating Summary */}
        <div className="xl:col-span-4">
          <div className="sticky top-24">
            {/* WRAPPER PARA CAPTURA DE IMAGEN */}
            <motion.div
              layout
              ref={summaryRef}
              className="relative rounded-[2rem] overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-xl shadow-black/5"
            >
              {/* Marca de agua que solo aparece en la imagen descargada (opcional) */}
              <div className="absolute top-0 right-0 p-4 opacity-0 pointer-events-none group-[.exporting]:opacity-100">
                <span className="text-xs font-bold text-[var(--muted)]">
                  Calculado en MiAgencia
                </span>
              </div>

              <div className="relative p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black flex items-center gap-3">
                    <div className="p-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    Presupuesto
                  </h2>
                  <div className="text-xs font-bold px-2 py-1 rounded bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]">
                    #DRAFT
                  </div>
                </div>

                {/* Lines */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                    <span className="font-bold text-sm text-[var(--muted)]">
                      Base {BASES[siteType].label}
                    </span>
                    <span className="font-mono font-medium">
                      {usd(breakdown.base)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { l: "Páginas extra", p: breakdown.pagesCost },
                      { l: "CMS / Datos", p: breakdown.cmsCost },
                      { l: "E-commerce", p: breakdown.shopCost },
                      { l: "Integraciones", p: breakdown.integrationsCost },
                      {
                        l: "SEO & Copy",
                        p: breakdown.seoCost + breakdown.copyCost,
                      },
                      { l: "Animación", p: breakdown.animCost },
                    ].map(
                      (item, i) =>
                        item.p > 0 && (
                          <div
                            key={i}
                            className="flex justify-between text-xs text-[var(--muted)]"
                          >
                            <span>+ {item.l}</span>
                            <span className="font-mono font-medium text-[var(--foreground)]">
                              {usd(item.p)}
                            </span>
                          </div>
                        )
                    )}
                  </div>

                  {(complexity !== "basic" || urgency !== "normal") && (
                    <div className="bg-[var(--background)] rounded-lg p-3 text-xs space-y-2 border border-[var(--border)] mt-4">
                      {complexity !== "basic" && (
                        <div className="flex justify-between text-[var(--muted)]">
                          <span>Diseño {COMPLEXITY[complexity].label}</span>
                          <span className="font-bold bg-[var(--surface)] px-1.5 rounded border border-[var(--border)]">
                            x{COMPLEXITY[complexity].multiplier}
                          </span>
                        </div>
                      )}
                      {urgency !== "normal" && (
                        <div className="flex justify-between text-[var(--muted)]">
                          <span>Entrega {URGENCY[urgency].label}</span>
                          <span className="font-bold bg-[var(--surface)] px-1.5 rounded border border-[var(--border)]">
                            x{URGENCY[urgency].multiplier}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* TOTAL BIG */}
                <div className="mb-8 p-5 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                  {breakdown.discount > 0 && (
                    <div className="flex justify-between text-[10px] text-green-600 font-bold uppercase tracking-wider mb-2">
                      <span>Descuento</span>
                      <span>- {usd(breakdown.discount)}</span>
                    </div>
                  )}
                  <div className="text-[var(--muted)] text-[10px] font-black uppercase tracking-widest mb-1">
                    Estimación Total
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight text-[var(--primary)]">
                      {usd(breakdown.oneTimeTotal)}
                    </span>
                    <span className="text-sm font-bold text-[var(--muted)]">
                      USD
                    </span>
                  </div>
                  {maintenance !== "none" && (
                    <div className="text-xs font-bold text-[var(--foreground)] mt-3 pt-3 border-t border-[var(--border)] flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                      + {usd(breakdown.monthly)}/mes soporte
                    </div>
                  )}
                </div>

                {/* Terms */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-[var(--background)] p-3 rounded-xl border border-[var(--border)] text-center">
                    <div className="text-[9px] text-[var(--muted)] uppercase font-black mb-1">
                      Inicio 50%
                    </div>
                    <div className="font-bold text-sm">
                      {usd(breakdown.upfront)}
                    </div>
                  </div>
                  <div className="bg-[var(--background)] p-3 rounded-xl border border-[var(--border)] text-center">
                    <div className="text-[9px] text-[var(--muted)] uppercase font-black mb-1">
                      Final 50%
                    </div>
                    <div className="font-bold text-sm">
                      {usd(breakdown.delivery)}
                    </div>
                  </div>
                </div>

                {/* Actions - Clase 'exclude-from-image' para que no salgan en la foto */}
                <div className="space-y-3 exclude-from-image">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsApp}
                    className="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold text-center shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 text-base hover:brightness-110 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" /> Enviar a WhatsApp
                  </motion.button>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={contactHref}
                      className="w-full py-3 rounded-xl bg-[var(--primary)] text-[var(--on-primary)] font-bold text-center shadow-lg shadow-[var(--primary)]/20 flex items-center justify-center gap-2 text-sm hover:brightness-110 transition-all"
                    >
                      <Mail className="w-4 h-4" /> Email
                    </motion.a>

                    <button
                      onClick={handleDownloadImage}
                      disabled={isGeneratingImage}
                      className="w-full py-3 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)] text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-wait"
                    >
                      {isGeneratingImage ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ImageIcon className="w-4 h-4" />
                      )}
                      {isGeneratingImage ? "Creando..." : "Imagen"}
                    </button>
                  </div>
                </div>

                <p className="text-center text-[10px] text-[var(--muted)] mt-6 opacity-60">
                  * Precios sujetos a revisión final. Impuestos no incluidos.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
