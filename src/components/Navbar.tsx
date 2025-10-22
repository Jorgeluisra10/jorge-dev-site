"use client";

/**
 * Navbar
 * ------------------------------------------------------------
 * - Sticky con blur y sombra al hacer scroll.
 * - Subrayado animado en hover/active (layoutId compartido).
 * - Menú móvil con sheet animado (Framer Motion) + overlay clicable.
 * - Botón “X” fijo y visible en móvil para cerrar.
 * - Toggle de tema accesible (next-themes).
 * - Tipado estricto de Framer Motion (Transition / Variants).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import { Sun, Moon, Rocket, Menu, X } from "lucide-react";

/* ---------- Links ---------- */
type NavLink = { href: string; label: string };

const links: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/services", label: "Servicios" },
  { href: "/portfolio", label: "Portafolio" },
  { href: "/about", label: "Sobre mí" },
  { href: "/contact", label: "Contacto" },
];

/* ---------- Animaciones tipadas ---------- */
const spring: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 40,
  mass: 0.9,
};
const fadeUp = (d = 0): Variants => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, delay: d } },
});

export default function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Ref para enfocar el panel móvil al abrir
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll(); // medir desde el inicio
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el sheet móvil al navegar
  useEffect(() => setOpen(false), [pathname]);

  // Cerrar con ESC cuando el sheet esté abierto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Enfocar el contenido del sheet al abrir (accesibilidad)
  useEffect(() => {
    if (open && sheetRef.current) {
      sheetRef.current.focus();
    }
  }, [open]);

  const activeHref = useMemo<string | null>(
    () => links.find((l) => l.href === pathname)?.href ?? null,
    [pathname]
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "bg-[color-mix(in_oklab,var(--background),transparent_10%)]/80 backdrop-blur-md border-white/10 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.35)]"
          : "bg-[rgb(var(--background))]/80 backdrop-blur border-transparent"
      )}
    >
      <ReadingProgress />

      <div
        className={cn(
          "mx-auto max-w-6xl px-4 flex items-center justify-between gap-4",
          scrolled ? "h-14" : "h-16"
        )}
      >
        {/* Brand */}
        <Link
          href="/"
          className="group relative inline-flex items-center gap-2 font-semibold"
          aria-label="Ir al inicio"
        >
          <motion.span
            className="inline-grid place-items-center rounded-xl"
            initial={{ scale: 0.9, rotate: 0 }}
            animate={{ scale: scrolled ? 0.95 : 1, rotate: scrolled ? -2 : 0 }}
            transition={spring}
          >
            {/* Icono con color por var (tailwind arbitrary value OK) */}
            <Rocket className="h-5 w-5 text-[var(--primary)] group-hover:scale-110 transition" />
          </motion.span>
          <span className="tracking-tight">
            Jorge <span className="opacity-80">Rodríguez</span>
          </span>
          {/* Glow hover sutil */}
          <span
            className="pointer-events-none absolute -inset-x-2 -bottom-2 h-1 rounded-full opacity-0 transition group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(24px 6px at center, color-mix(in_oklab,var(--primary),transparent_0%), transparent 70%)",
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          <div className="relative flex items-center gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-2 py-1">
            {/* Subrayado animado (layoutId compartido) */}
            <div className="relative flex items-center gap-1">
              {links.map((l) => {
                const isActive = activeHref === l.href;
                const isHover = hovered === l.href;
                const showUnderline = isActive || isHover;

                return (
                  <div
                    key={l.href}
                    onMouseEnter={() => setHovered(l.href)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative"
                  >
                    {showUnderline && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--primary) 0%, var(--primary-2) 100%)",
                        }}
                        transition={spring}
                      />
                    )}

                    <Link
                      href={l.href}
                      className={cn(
                        "relative z-10 px-3 py-2 rounded-xl text-sm transition-colors",
                        isActive
                          ? "font-semibold"
                          : "opacity-90 hover:opacity-100"
                      )}
                    >
                      {l.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toggle de tema.
             Nota TS: `setTheme` de next-themes es (t: string) => void.
             Pasamos un wrapper tipado a "light" | "dark" para contentar al prop. */}
          {mounted && (
            <ThemeToggle
              theme={theme as ThemeName}
              setTheme={(t) => setTheme(t)}
              className="ml-1"
            />
          )}

          <Link href="/contact" className="btn-primary text-sm ml-1">
            Empecemos
          </Link>
        </nav>

        {/* Botón móvil (hamburger / X en header) */}
        <button
          className="md:hidden p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-sheet"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {!open ? (
              <motion.span
                key="menu"
                initial={{ rotate: -10, opacity: 0, scale: 0.9 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 10, opacity: 0, scale: 0.9 }}
                transition={spring}
                className="inline-flex"
              >
                <Menu className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="close"
                initial={{ rotate: 10, opacity: 0, scale: 0.9 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -10, opacity: 0, scale: 0.9 }}
                transition={spring}
                className="inline-flex"
              >
                <X className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Sheet móvil */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay clicable para cerrar */}
            <motion.button
              aria-label="Cerrar menú"
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              className="fixed top-[3.5rem] left-0 right-0 z-50 md:hidden outline-none"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={spring}
            >
              <div className="mx-auto max-w-6xl px-4">
                <motion.div
                  ref={sheetRef}
                  tabIndex={-1}
                  className="relative border rounded-2xl bg-[var(--surface)] shadow-2xl overflow-hidden"
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.98 }}
                  transition={spring}
                >
                  {/* Botón “X” SIEMPRE visible dentro del sheet */}
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar menú"
                    className="absolute right-3 top-3 z-[60] grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background)]/60 backdrop-blur hover:opacity-100"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <motion.ul
                    className="flex flex-col divide-y divide-[var(--border)]"
                    initial="initial"
                    animate="animate"
                    variants={{
                      initial: {},
                      animate: { transition: { staggerChildren: 0.05 } },
                    }}
                  >
                    {links.map((l) => (
                      <motion.li
                        key={l.href}
                        variants={{
                          initial: { opacity: 0, y: 8 },
                          animate: { opacity: 1, y: 0 },
                        }}
                      >
                        <Link
                          href={l.href}
                          className={cn(
                            "block px-5 py-4 text-base",
                            pathname === l.href ? "font-semibold" : "opacity-90"
                          )}
                        >
                          {l.label}
                        </Link>
                      </motion.li>
                    ))}
                    <motion.li
                      variants={{
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                      }}
                      className="px-5 py-4 flex items-center gap-3"
                    >
                      {mounted && (
                        <ThemeToggle
                          theme={theme as ThemeName}
                          setTheme={(t) => setTheme(t)}
                        />
                      )}
                      <Link
                        href="/contact"
                        className="btn-primary flex-1 text-center"
                      >
                        Empecemos
                      </Link>
                    </motion.li>
                  </motion.ul>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Toggle de tema ---------- */
type ThemeName = "light" | "dark" | "system" | undefined;

function ThemeToggle({
  theme,
  setTheme,
  className,
}: {
  theme: ThemeName;
  setTheme: (t: "light" | "dark") => void; // wrapper ya tipado al usarlo
  className?: string;
}): React.JSX.Element {
  const isDark = theme === "dark";

  return (
    <motion.button
      aria-label="Cambiar tema"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2",
        "shadow-[0_8px_16px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.30)]",
        "transition-all",
        className
      )}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
    >
      {/* Glow de foco condicional (sin animación infinita) */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        initial={false}
        animate={{
          boxShadow: isDark
            ? "0 0 0 0 rgba(56,189,248,0.0)"
            : "0 0 0 6px rgba(37,99,235,0.06)",
        }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      />
      <div className="relative w-5 h-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="absolute inset-0 grid place-items-center"
            >
              <Sun className="h-5 w-5 text-amber-400" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="absolute inset-0 grid place-items-center"
            >
              <Moon className="h-5 w-5 text-sky-400" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <motion.span
        className="text-sm font-medium"
        initial={false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? "Claro" : "Oscuro"}
      </motion.span>

      <motion.span
        layout
        className={cn(
          "ml-1 inline-flex h-5 w-9 items-center rounded-full border border-[var(--border)]",
          isDark
            ? "bg-[color-mix(in_oklab,var(--primary),transparent_80%)]"
            : "bg-[#e2e8f0]"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "h-4 w-4 rounded-full bg-white shadow",
            isDark ? "translate-x-4" : "translate-x-1"
          )}
        />
      </motion.span>
    </motion.button>
  );
}

/* ---------- Barra de progreso de lectura ---------- */
function ReadingProgress(): React.JSX.Element {
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const st = h.scrollTop || document.body.scrollTop;
      const sh = h.scrollHeight - h.clientHeight;
      const p = sh > 0 ? (st / sh) * 100 : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="relative h-[3px]">
      <motion.div
        className="absolute left-0 top-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, var(--primary) 0%, var(--primary-2) 100%)",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0.1 }}
      />
    </div>
  );
}
