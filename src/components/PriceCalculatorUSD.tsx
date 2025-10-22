"use client";

/**
 * PriceCalculatorUSDRegional
 * ------------------------------------------------------------
 * - Calculadora con desglose y ajustes por región.
 * - Sin dependencias externas (solo lucide + framer para micro-entradas).
 * - Helper para descargar JSON de cotización.
 */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Percent,
  Clock,
  Settings2,
  Download,
  Mail,
  Globe2,
  Info,
  HelpCircle,
} from "lucide-react";

/* =================== REGIONES + overrides =================== */
const REGIONS = {
  global: {
    label: "Internacional",
    multiplier: 1.0,
    note: "Referencia global competitiva.",
  },
  co: {
    label: "Colombia",
    multiplier: 0.8,
    note: "Ajuste al mercado local en USD.",
  },
  ar: {
    label: "Argentina",
    multiplier: 0.75,
    note: "Ajuste al mercado local en USD.",
  },
  es: {
    label: "España",
    multiplier: 1.1,
    note: "Mercado UE, exigencias y fiscalidad.",
  },
} as const;

const REGIONAL_BASE_OVERRIDES: Partial<
  Record<
    keyof typeof REGIONS,
    Partial<Record<"landing" | "corporate" | "ecommerce" | "saas", number>>
  >
> = {
  co: { landing: 160 },
  ar: { landing: 180 },
  es: { landing: 650 },
};

/* =================== CONFIG BASE =================== */
const BASES = {
  landing: { label: "Landing Page", base: 600, basePages: 1 },
  corporate: { label: "Web Corporativa", base: 1200, basePages: 5 },
  ecommerce: { label: "E-commerce", base: 2200, basePages: 8 },
  saas: { label: "SaaS MVP", base: 3200, basePages: 10 },
} as const;

const COMPLEXITY = {
  basic: {
    label: "Básica",
    multiplier: 1.0,
    tip: "UI simple, sin microinteracciones complejas.",
  },
  pro: {
    label: "Pro",
    multiplier: 1.15,
    tip: "Microinteracciones y estados sólidos.",
  },
  premium: {
    label: "Premium (detalle alto)",
    multiplier: 1.3,
    tip: "Animaciones avanzadas y performance fina.",
  },
} as const;

const CMS = {
  none: { label: "Sin CMS", add: 0, tip: "Contenido estático." },
  headless: {
    label: "Headless CMS",
    add: 400,
    tip: "Sanity/Contentful con API.",
  },
  fullcms: {
    label: "CMS completo",
    add: 700,
    tip: "Roles, workflows y colecciones complejas.",
  },
} as const;

const COMMERCE = {
  none: { label: "Sin e-commerce", add: 0, tip: "Sin carrito/checkout." },
  lite: {
    label: "E-commerce lite",
    add: 800,
    tip: "Catálogo y checkout básico.",
  },
  pro: {
    label: "E-commerce pro",
    add: 1500,
    tip: "Variantes, cupones y reportes.",
  },
} as const;

const SEO = {
  none: { label: "Sin SEO", add: 0, tip: "Sin configuración técnica." },
  basic: {
    label: "SEO básico",
    add: 200,
    tip: "Metas, OG, sitemap y estructura.",
  },
  advanced: {
    label: "SEO avanzado",
    add: 450,
    tip: "CWV, JSON-LD y mejoras técnicas.",
  },
} as const;

const COPY = {
  none: {
    label: "Sin copywriting",
    add: 0,
    tip: "Textos provistos por el cliente.",
  },
  basic: { label: "Copy básico", add: 150, tip: "2–3 secciones." },
  full: {
    label: "Copy completo",
    add: 400,
    tip: "Home, about, servicios y CTAs.",
  },
} as const;

const ANIM = {
  none: { label: "Sin animaciones", add: 0, tip: "Transiciones mínimas." },
  subtle: { label: "Sutiles", add: 150, tip: "Hover y reveal suaves." },
  advanced: {
    label: "Avanzadas",
    add: 350,
    tip: "Secuencias, parallax o Lottie.",
  },
} as const;

const URGENCY = {
  normal: {
    label: "Normal (2–4 sem.)",
    multiplier: 1.0,
    tip: "Plan estándar.",
  },
  fast: {
    label: "Rápido (1–2 sem.)",
    multiplier: 1.2,
    tip: "Prioridad en agenda.",
  },
  express: {
    label: "Express (< 1 sem.)",
    multiplier: 1.4,
    tip: "Slots reservados.",
  },
} as const;

const ADDITIONAL_PAGE_PRICE = 80;
const INTEGRATION_UNIT = 120;

const MAINTENANCE = {
  none: { label: "Sin mantenimiento", monthly: 0, tip: "Sin soporte." },
  basic: { label: "Básico", monthly: 50, tip: "Soporte y pequeños ajustes." },
  pro: { label: "Pro", monthly: 100, tip: "Soporte prioritario y mejoras." },
} as const;

const MAINTENANCE_OVERRIDES: Partial<
  Record<
    keyof typeof REGIONS,
    Partial<Record<keyof typeof MAINTENANCE, number>>
  >
> = {
  co: { basic: 30, pro: 55 },
  ar: { basic: 30, pro: 55 },
  es: { basic: 60, pro: 110 },
};

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

/* =================== Tooltip minimalista =================== */
function Tip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <span className="relative inline-block group cursor-help align-middle">
      {children}
      <span className="pointer-events-none absolute z-10 mt-1 hidden w-64 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--foreground))] p-3 text-xs shadow group-hover:block">
        {text}
      </span>
    </span>
  );
}

/* =================== Componente =================== */
export default function PriceCalculatorUSDRegional(): React.JSX.Element {
  // Estado inicial práctico para demo
  const [region, setRegion] = useState<keyof typeof REGIONS>("co");
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
  const [firstProject, setFirstProject] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");

  // Al cambiar tipo de sitio, resetea páginas a base
  useEffect(() => {
    setPages(BASES[siteType].basePages);
  }, [siteType]);

  // Cupón/primer proyecto
  const discountActive =
    firstProject || coupon.trim().toUpperCase() === "FIRST20";

  // Cálculo memoizado
  const breakdown = useMemo(() => {
    const mult = REGIONS[region].multiplier;
    const baseConf = BASES[siteType];

    const overridden = REGIONAL_BASE_OVERRIDES[region]?.[siteType];
    const base =
      overridden !== undefined ? overridden : Math.round(baseConf.base * mult);

    const extraPages = Math.max(0, pages - baseConf.basePages);
    const pagesCost = Math.round(extraPages * (ADDITIONAL_PAGE_PRICE * mult));

    const cmsCost = Math.round(CMS[cms].add * mult);
    const shopCost = Math.round(COMMERCE[commerce].add * mult);
    const seoCost = Math.round(SEO[seo].add * mult);
    const copyCost = Math.round(COPY[copy].add * mult);
    const animCost = Math.round(ANIM[anim].add * mult);
    const integrationsCost = Math.round(
      clamp(integrations, 0, 50) * (INTEGRATION_UNIT * mult)
    );

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

    const maintenanceBase = MAINTENANCE[maintenance].monthly;
    const maintenanceOverride = MAINTENANCE_OVERRIDES[region]?.[maintenance];
    const monthly =
      maintenance === "none"
        ? 0
        : maintenanceOverride ?? Math.round(maintenanceBase * mult);

    const upfront = Math.round(oneTimeTotal * 0.5);
    const delivery = oneTimeTotal - upfront;

    return {
      mult,
      base,
      pagesCost,
      cmsCost,
      shopCost,
      seoCost,
      copyCost,
      animCost,
      integrationsCost,
      preMult,
      withComplexity,
      withUrgency,
      oneTimeSubtotal,
      discount,
      oneTimeTotal,
      monthly,
      upfront,
      delivery,
    };
  }, [
    region,
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

  // CTA → prellenar mensaje
  const contactHref = useMemo(() => {
    const payload = {
      region: REGIONS[region].label,
      siteType: BASES[siteType].label,
      pages,
      complexity: COMPLEXITY[complexity].label,
      cms: CMS[cms].label,
      commerce: COMMERCE[commerce].label,
      seo: SEO[seo].label,
      copy: COPY[copy].label,
      animations: ANIM[anim].label,
      integrations,
      urgency: URGENCY[urgency].label,
      maintenance: MAINTENANCE[maintenance].label,
      firstProject,
      coupon,
      totals: {
        subtotal: breakdown.oneTimeSubtotal,
        discount: breakdown.discount,
        oneTimeTotal: breakdown.oneTimeTotal,
        monthly: breakdown.monthly,
        upfront: breakdown.upfront,
        delivery: breakdown.delivery,
      },
    };
    const msg =
      `Hola, Jorge. Me interesa este proyecto:\n` +
      JSON.stringify(payload, null, 2);
    return `/contact?quote=${encodeURIComponent(msg)}`;
  }, [
    region,
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
    firstProject,
    coupon,
    breakdown,
  ]);

  // Helper “desde”
  const displayBaseForRegion = (k: keyof typeof BASES) => {
    const overridden = REGIONAL_BASE_OVERRIDES[region]?.[k];
    const mult = REGIONS[region].multiplier;
    const raw =
      overridden !== undefined ? overridden : Math.round(BASES[k].base * mult);
    return usd(raw);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 md:p-8"
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-[rgb(var(--primary))]" />
          <h2 className="text-xl md:text-2xl font-semibold">
            Calculadora de precio (USD)
          </h2>
        </div>
        <Tip text="Selecciona tu país para ver precios ajustados de forma competitiva.">
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 opacity-80" />
            <select
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm"
              value={region}
              onChange={(e) =>
                setRegion(e.target.value as keyof typeof REGIONS)
              }
              aria-label="Seleccionar país"
              title="País / región"
            >
              {Object.entries(REGIONS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </Tip>
      </div>

      <p className="text-xs opacity-80 -mt-3 mb-5">
        Para <strong>{REGIONS[region].label}</strong> — {REGIONS[region].note}.
        Promo <strong>−20%</strong> con cupón{" "}
        <code className="px-1 rounded bg-black/5 dark:bg-white/10">
          FIRST20
        </code>
        .
      </p>

      {/* CONTROLES */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Izquierda */}
        <div className="space-y-4">
          {/* Tipo de sitio */}
          <div>
            <label className="block text-sm font-medium mb-1">
              <Tip text="El tipo de proyecto define el alcance y la complejidad base.">
                <span className="inline-flex items-center gap-1">
                  Tipo de sitio <HelpCircle className="h-4 w-4 opacity-70" />
                </span>
              </Tip>
            </label>
            <select
              className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3"
              value={siteType}
              onChange={(e) =>
                setSiteType(e.target.value as keyof typeof BASES)
              }
            >
              {Object.entries(BASES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label} — desde{" "}
                  {displayBaseForRegion(k as keyof typeof BASES)}
                </option>
              ))}
            </select>
            <p className="text-xs opacity-70 mt-1">
              Incluye {BASES[siteType].basePages} pág. base. Páginas extra{" "}
              {usd(
                Math.round(ADDITIONAL_PAGE_PRICE * REGIONS[region].multiplier)
              )}{" "}
              c/u.
            </p>
          </div>

          {/* Páginas */}
          <div>
            <label className="block text-sm font-medium mb-1">
              <Tip text="Cada página adicional suma maquetación, contenido y QA.">
                <span className="inline-flex items-center gap-1">
                  Páginas totales <Info className="h-4 w-4 opacity-70" />
                </span>
              </Tip>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={BASES[siteType].basePages}
                max={30}
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="number"
                min={BASES[siteType].basePages}
                max={30}
                value={pages}
                onChange={(e) =>
                  setPages(
                    clamp(
                      parseInt(e.target.value || "0"),
                      BASES[siteType].basePages,
                      30
                    )
                  )
                }
                className="w-20 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2"
              />
            </div>
            <p className="text-xs opacity-70 mt-1">
              Extra: {Math.max(0, pages - BASES[siteType].basePages)} ×{" "}
              {usd(
                Math.round(ADDITIONAL_PAGE_PRICE * REGIONS[region].multiplier)
              )}{" "}
              = {usd(breakdown.pagesCost)}
            </p>
          </div>

          {/* Complejidad */}
          <div>
            <label className="block text-sm font-medium mb-1">
              <Tip text="Afecta detalle visual, estados, microinteracciones y esfuerzo de QA.">
                <span className="inline-flex items-center gap-1">
                  Complejidad de diseño <Info className="h-4 w-4 opacity-70" />
                </span>
              </Tip>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(COMPLEXITY).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setComplexity(k as keyof typeof COMPLEXITY)}
                  title={v.tip}
                  className={`rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm ${
                    complexity === k ? "ring-2 ring-[rgb(var(--ring))]" : ""
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* CMS / E-commerce / SEO */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3 md:col-span-1">
              <label className="block text-sm font-medium mb-1">
                <Tip text="Panel para editar contenido sin tocar código.">
                  <span className="inline-flex items-center gap-1">
                    CMS <Info className="h-4 w-4 opacity-70" />
                  </span>
                </Tip>
              </label>
              <select
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3"
                value={cms}
                onChange={(e) => setCms(e.target.value as keyof typeof CMS)}
              >
                {Object.entries(CMS).map(([k, v]) => {
                  const extra = v.add
                    ? `(+${usd(
                        Math.round(v.add * REGIONS[region].multiplier)
                      )})`
                    : "";
                  return (
                    <option key={k} value={k}>
                      {v.label} {extra}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-span-3 md:col-span-1">
              <label className="block text-sm font-medium mb-1">
                <Tip text="Carrito, checkout y catálogo para vender online.">
                  <span className="inline-flex items-center gap-1">
                    E-commerce <Info className="h-4 w-4 opacity-70" />
                  </span>
                </Tip>
              </label>
              <select
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3"
                value={commerce}
                onChange={(e) =>
                  setCommerce(e.target.value as keyof typeof COMMERCE)
                }
              >
                {Object.entries(COMMERCE).map(([k, v]) => {
                  const extra = v.add
                    ? `(+${usd(
                        Math.round(v.add * REGIONS[region].multiplier)
                      )})`
                    : "";
                  return (
                    <option key={k} value={k}>
                      {v.label} {extra}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-span-3 md:col-span-1">
              <label className="block text-sm font-medium mb-1">
                <Tip text="Configuración técnica para mejorar visibilidad en buscadores.">
                  <span className="inline-flex items-center gap-1">
                    SEO <Info className="h-4 w-4 opacity-70" />
                  </span>
                </Tip>
              </label>
              <select
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3"
                value={seo}
                onChange={(e) => setSeo(e.target.value as keyof typeof SEO)}
              >
                {Object.entries(SEO).map(([k, v]) => {
                  const extra = v.add
                    ? `(+${usd(
                        Math.round(v.add * REGIONS[region].multiplier)
                      )})`
                    : "";
                  return (
                    <option key={k} value={k}>
                      {v.label} {extra}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Derecha */}
        <div className="space-y-4">
          {/* Copy / Animaciones */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                <Tip text="Textos claros y persuasivos con tono acorde a tu marca.">
                  <span className="inline-flex items-center gap-1">
                    Copywriting <Info className="h-4 w-4 opacity-70" />
                  </span>
                </Tip>
              </label>
              <select
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3"
                value={copy}
                onChange={(e) => setCopy(e.target.value as keyof typeof COPY)}
              >
                {Object.entries(COPY).map(([k, v]) => {
                  const extra = v.add
                    ? `(+${usd(
                        Math.round(v.add * REGIONS[region].multiplier)
                      )})`
                    : "";
                  return (
                    <option key={k} value={k}>
                      {v.label} {extra}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <Tip text="Movimiento sutil o avanzado para reforzar branding y fluidez.">
                  <span className="inline-flex items-center gap-1">
                    Animaciones <Info className="h-4 w-4 opacity-70" />
                  </span>
                </Tip>
              </label>
              <select
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3"
                value={anim}
                onChange={(e) => setAnim(e.target.value as keyof typeof ANIM)}
              >
                {Object.entries(ANIM).map(([k, v]) => {
                  const extra = v.add
                    ? `(+${usd(
                        Math.round(v.add * REGIONS[region].multiplier)
                      )})`
                    : "";
                  return (
                    <option key={k} value={k}>
                      {v.label} {extra}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Integraciones */}
          <div>
            <label className="block text-sm font-medium mb-1">
              <Tip text="Conexiones con APIs de terceros: pagos, CRM, analytics, etc.">
                <span className="inline-flex items-center gap-1">
                  Integraciones <Info className="h-4 w-4 opacity-70" />
                </span>
              </Tip>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={20}
                value={integrations}
                onChange={(e) => setIntegrations(parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="number"
                min={0}
                max={20}
                value={integrations}
                onChange={(e) =>
                  setIntegrations(clamp(parseInt(e.target.value || "0"), 0, 20))
                }
                className="w-20 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2"
              />
            </div>
            <p className="text-xs opacity-70 mt-1">
              {integrations} ×{" "}
              {usd(Math.round(INTEGRATION_UNIT * REGIONS[region].multiplier))} ={" "}
              {usd(breakdown.integrationsCost)}
            </p>
          </div>

          {/* Urgencia */}
          <div>
            <label className="block text-sm font-medium mb-1">
              <Tip text="Afecta planificación y priorización en agenda.">
                <span className="inline-flex items-center gap-1">
                  Urgencia <Info className="h-4 w-4 opacity-70" />
                </span>
              </Tip>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(URGENCY).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setUrgency(k as keyof typeof URGENCY)}
                  title={v.tip}
                  className={`rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm ${
                    urgency === k ? "ring-2 ring-[rgb(var(--ring))]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {v.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mantenimiento */}
          <div>
            <label className="block text-sm font-medium mb-1">
              <Tip text="Soporte posterior al lanzamiento para ajustes y mejoras.">
                <span className="inline-flex items-center gap-1">
                  Mantenimiento mensual <Info className="h-4 w-4 opacity-70" />
                </span>
              </Tip>
            </label>
            <select
              className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-3"
              value={maintenance}
              onChange={(e) =>
                setMaintenance(e.target.value as keyof typeof MAINTENANCE)
              }
            >
              {Object.entries(MAINTENANCE).map(([k, v]) => {
                const override =
                  MAINTENANCE_OVERRIDES[region]?.[
                    k as keyof typeof MAINTENANCE
                  ];
                const price =
                  k === "none"
                    ? 0
                    : override ??
                      Math.round(v.monthly * REGIONS[region].multiplier);
                return (
                  <option key={k} value={k}>
                    {v.label} {price ? `(${usd(price)}/mes)` : "(—)"}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Descuento */}
          <div className="rounded-xl border border-[rgb(var(--border))] p-4">
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Percent className="h-4 w-4" />
                Aplicar 20% de descuento (primer proyecto)
              </label>
              <input
                type="checkbox"
                checked={firstProject}
                onChange={(e) => setFirstProject(e.target.checked)}
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input
                placeholder="Cupón (ej: FIRST20)"
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-2"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RESUMEN */}
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Settings2 className="h-4 w-4" /> Desglose
          </h3>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between">
              <span className="inline-flex items-center gap-2">
                Base {BASES[siteType].label}
                <Tip text="Incluye diseño, maquetación inicial, setup del proyecto y deploy.">
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>{usd(breakdown.base)}</span>
            </li>
            <li className="flex justify-between">
              <span className="inline-flex items-center gap-2">
                Páginas adicionales
                <Tip text="Costo por cada página extra sobre las incluidas en la base.">
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>{usd(breakdown.pagesCost)}</span>
            </li>
            <li className="flex justify-between">
              <span className="inline-flex items-center gap-2">
                CMS
                <Tip text="Gestión de contenido con panel y flujos de edición.">
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>{usd(breakdown.cmsCost)}</span>
            </li>
            <li className="flex justify-between">
              <span className="inline-flex items-center gap-2">
                E-commerce
                <Tip text="Carrito, checkout y funcionalidades de tienda.">
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>{usd(breakdown.shopCost)}</span>
            </li>
            <li className="flex justify-between">
              <span className="inline-flex items-center gap-2">
                SEO
                <Tip text="Metadatos, OpenGraph, sitemap y mejoras técnicas.">
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>{usd(breakdown.seoCost)}</span>
            </li>
            <li className="flex justify-between">
              <span className="inline-flex items-center gap-2">
                Copywriting
                <Tip text="Redacción persuasiva alineada a negocio.">
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>{usd(breakdown.copyCost)}</span>
            </li>
            <li className="flex justify-between">
              <span className="inline-flex items-center gap-2">
                Animaciones
                <Tip text="Microinteracciones y/o animaciones avanzadas.">
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>{usd(breakdown.animCost)}</span>
            </li>
            <li className="flex justify-between">
              <span className="inline-flex items-center gap-2">
                Integraciones
                <Tip text="Conexiones con APIs: pagos, CRM, auth, analytics, etc.">
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>{usd(breakdown.integrationsCost)}</span>
            </li>
            <li className="flex justify-between opacity-80">
              <span className="inline-flex items-center gap-2">
                × Complejidad
                <Tip text={COMPLEXITY[complexity].tip}>
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>× {COMPLEXITY[complexity].multiplier}</span>
            </li>
            <li className="flex justify-between opacity-80">
              <span className="inline-flex items-center gap-2">
                × Urgencia
                <Tip text={URGENCY[urgency].tip}>
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </Tip>
              </span>
              <span>× {URGENCY[urgency].multiplier}</span>
            </li>
          </ul>

          <div className="border-t border-[rgb(var(--border))] my-3" />
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span>{usd(breakdown.oneTimeSubtotal)}</span>
          </div>
          {breakdown.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Descuento {Math.round(FIRST_DISCOUNT_RATE * 100)}%</span>
              <span>-{usd(breakdown.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold mt-2">
            <span>Total único</span>
            <span>{usd(breakdown.oneTimeTotal)}</span>
          </div>
          {breakdown.monthly > 0 && (
            <div className="flex justify-between text-sm mt-1">
              <span>Mantenimiento</span>
              <span>{usd(breakdown.monthly)}/mes</span>
            </div>
          )}
        </div>

        {/* Hitos + CTA */}
        <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Hitos de pago
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-[rgb(var(--border))] p-3">
              <div className="opacity-70">Reserva (50%)</div>
              <div className="text-lg font-semibold">
                {usd(breakdown.upfront)}
              </div>
              <p className="text-xs opacity-70 mt-1">
                Para asegurar agenda y kick-off.
              </p>
            </div>
            <div className="rounded-xl border border-[rgb(var(--border))] p-3">
              <div className="opacity-70">Entrega (50%)</div>
              <div className="text-lg font-semibold">
                {usd(breakdown.delivery)}
              </div>
              <p className="text-xs opacity-70 mt-1">
                Al aprobar el entregable final.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={contactHref}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" /> Solicitar propuesta
            </a>
            <button
              className="btn-ghost inline-flex items-center gap-2"
              onClick={() => {
                const quote = {
                  region: REGIONS[region].label,
                  siteType: BASES[siteType].label,
                  pages,
                  complexity: COMPLEXITY[complexity].label,
                  cms: CMS[cms].label,
                  commerce: COMMERCE[commerce].label,
                  seo: SEO[seo].label,
                  copy: COPY[copy].label,
                  animations: ANIM[anim].label,
                  integrations,
                  urgency: URGENCY[urgency].label,
                  maintenance: MAINTENANCE[maintenance].label,
                  firstProject,
                  coupon,
                  totals: {
                    subtotal: breakdown.oneTimeSubtotal,
                    discount: breakdown.discount,
                    oneTimeTotal: breakdown.oneTimeTotal,
                    monthly: breakdown.monthly,
                    upfront: breakdown.upfront,
                    delivery: breakdown.delivery,
                  },
                };
                const blob = new Blob([JSON.stringify(quote, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `cotizacion-${BASES[siteType].label
                  .replace(/\s+/g, "-")
                  .toLowerCase()}-${region}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="h-4 w-4" /> Descargar JSON
            </button>
          </div>

          <p className="text-xs opacity-70 mt-3">
            * Precios ajustados a <strong>{REGIONS[region].label}</strong>{" "}
            (USD). * Promo <strong>20%</strong> opcional con cupón{" "}
            <code className="px-1 rounded bg-black/5 dark:bg-white/10">
              FIRST20
            </code>
            . * No incluye costos de terceros (dominio, hosting, pasarelas).
          </p>
        </div>
      </div>
    </motion.section>
  );
}
