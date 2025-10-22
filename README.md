# RA WebStudio — Sitio personal (Next.js + TypeScript)

Sitio profesional de **Jorge Luis Rodríguez** para mostrar servicios, proyectos y una calculadora de precios con un diseño moderno, animaciones sutiles y foco en performance, accesibilidad y SEO.

> Tech stack: **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **next-themes**.

---

## 🧭 Índice

- [Demo local](#-demo-local)
- [Requisitos](#-requisitos)
- [Instalación y scripts](#-instalación-y-scripts)
- [Estructura](#-estructura)
- [Componentes clave](#-componentes-clave)
- [Estándares y calidad](#-estándares-y-calidad)
- [Accesibilidad](#-accesibilidad)
- [SEO y Metadatos](#-seo-y-metadatos)
- [Temas y tokens de diseño](#-temas-y-tokens-de-diseño)
- [Animaciones y Motion](#-animaciones-y-motion)
- [Troubleshooting (TypeScript / Motion / Next)](#-troubleshooting-typescript--motion--next)
- [Despliegue](#-despliegue)
- [Licencia](#-licencia)

---

## 🚀 Demo local

```bash
# 1) Instala dependencias
pnpm install
# o
npm install

# 2) Levanta el dev server
pnpm dev
# o
npm run dev

# 3) Abre
http://localhost:3000
```

---

## 📦 Requisitos

- **Node.js** >= 18
- **pnpm** (recomendado) o **npm**
- No requiere Docker ni bases de datos.

---

## 📜 Instalación y scripts

### Scripts principales
- `dev` — Desarrollo con HMR.
- `build` — Compilación de producción.
- `start` — Servir la build de producción.
- `lint` — Reglas de ESLint (incluye TypeScript + React).
- `typecheck` — Comprobación estricta de tipos.

```jsonc
// package.json (extracto)
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## 🗂 Estructura

```
src/
├─ app/
│  ├─ layout.tsx          # Root layout: tipografías, ThemeProvider, Navbar/Footer, GlobalBackground
│  ├─ globals.css         # Tailwind base + variables CSS
│  ├─ page.tsx            # HomePage (hero + servicios + proyectos + CTA + JSON-LD)
│  ├─ services/page.tsx   # Página de servicios + calculadora
│  └─ portfolio/...       # listado de proyectos
├─ components/
│  ├─ Navbar.tsx          # Sticky, blur, sheet móvil, toggle de tema
│  ├─ Footer.tsx
│  ├─ MotionFade.tsx      # Reveal on view (Framer Motion)
│  ├─ ServiceCard.tsx     # Card pro con bullets y CTA
│  ├─ ProjectCard.tsx     # Tilt 3D + halo + shine
│  ├─ GlobalBackground.tsx# Canvas de partículas/parallax (fixed detrás de todo)
│  └─ PriceCalculatorUSD.tsx # Calculadora de precios (import dinámico en /services)
├─ lib/
│  └─ utils.ts            # utilidades (cn, etc.)
├─ public/
│  ├─ favicon.ico
│  └─ og-image.png
└─ styles/ (si aplica)
```

---

## 🧩 Componentes clave

### `Navbar`
- Sticky con **backdrop-blur** y sombra al hacer scroll.
- Navegación desktop con **subrayado animado** (Framer Motion `layoutId`).
- Menú móvil (**sheet**) accesible con overlay y botón de **cerrar (X)** visible.
- **ThemeToggle** (light/dark) con `next-themes`.

### `GlobalBackground`
- Canvas **fixed** detrás de todo (z-index negativo) con partículas y leve parallax por mouse.
- Eventos `pointer-events: none` para no interferir con el UI.
- Limpieza de listeners y `requestAnimationFrame` en `useEffect`.

### `MotionFade`
- Componente utilitario para reveal al entrar en viewport (`whileInView`) con `viewport={{ once: true }}`.

### `ServiceCard` & `ProjectCard`
- **ServiceCard**: cápsula de icono, bullets en grid, CTA opcional (desktop/móvil).
- **ProjectCard**: efecto **tilt 3D** con `useMotionValue` + `useMotionTemplate`, halo y “shine” diagonal.

### `PriceCalculatorUSD`
- Cálculo de costos por tipo de proyecto, extras y región.
- Se carga **dinámicamente** en `/services` (`ssr: false`) porque usa APIs del navegador.

---

## ✅ Estándares y calidad

- **TypeScript estricto** (`"strict": true`) y `moduleResolution: "bundler"` para Next.js 14.
- **Linting** con ESLint y reglas para React/Next/TS.
- **Convención de estilos** con **Tailwind CSS**.
- Animaciones sutiles que respetan `prefers-reduced-motion` cuando corresponda.

**`tsconfig.json` recomendado (extracto):**
```jsonc
{
  "compilerOptions": {
    "jsx": "preserve",
    "strict": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## ♿ Accesibilidad

- Colores con contraste suficiente en light/dark.
- Roles/labels en CTAs (`aria-label`).
- Navegación por teclado (focus-visible & order lógico).
- Animaciones no intrusivas; reveal único (`once: true`).

---

## 🔎 SEO y Metadatos

- **`app/layout.tsx`** define `metadata` y `openGraph`.
- Home incluye **JSON-LD (`Person`)** con `<script type="application/ld+json">`.
- Meta social listo para compartir (`og-image.png`).

**JSON-LD (extracto en Home):**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

## 🎨 Temas y tokens de diseño

Variables CSS usadas en Tailwind via `text-[rgb(var(--primary))]`, etc.

- `--primary`, `--primary-2`
- `--background`, `--surface`, `--border`, `--ring`, `--foreground`

> Cambia tokens en `globals.css` y Tailwind se actualizará automáticamente.

---

## 🕊 Animaciones y Motion

- **Reveal** con `MotionFade` y `viewport={{ once: true }}`.
- **Stagger** controlado en listas (e.g., services).
- **Tilt** en `ProjectCard` y **hover-lift** en cards.
- Transiciones tipadas con `framer-motion`:
  ```ts
  import { type Transition, type Variants } from "framer-motion";

  const spring: Transition = { type: "spring", stiffness: 350, damping: 28 };
  const item: Variants = {
    initial: { opacity: 0, y: 14, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
  };
  ```

---

## 🛠 Troubleshooting (TypeScript / Motion / Next)

### 1) `Transition` no coincide con el tipo
Asegúrate de **importar** los tipos y tipar el objeto:
```ts
import { type Transition } from "framer-motion";
const spring: Transition = { type: "spring", stiffness: 500, damping: 40, mass: 0.9 };
```

### 2) Error con import dinámico: “solo se admiten cuando la marca --module …”
Usa `moduleResolution: "bundler"` y `target: "ES2022"` en `tsconfig.json`. Evita transpilar a `commonjs`.

### 3) `ThemeToggle` — tipo de `theme`
`useTheme()` puede devolver `undefined` al montar. Tipar como:
```ts
type ThemeName = "light" | "dark" | "system" | undefined;
```

### 4) Tailwind: `text-[var(--primary)]` warning
Usa `text-[rgb(var(--primary))]` cuando la variable es RGB. Para bullets/gradientes usa `linear-gradient(...)` inline-style.

### 5) Ícono de cerrar (X) no visible en móvil
Incluido en el **botón móvil** del `Navbar` con **AnimatePresence**; al abrir el sheet el ícono cambia a `X`. Si no cambia, verifica el estado `open` y que el botón no quede oculto por el overlay/z-index.

---

## ☁️ Despliegue

- Recomendado: **Vercel** (0 config).
- Variables de entorno: **no requeridas**.
- Asegúrate de subir `/public/og-image.png` y favicon.

---

## 📄 Licencia

© 2025 Jorge Luis Rodríguez. Todos los derechos reservados.
