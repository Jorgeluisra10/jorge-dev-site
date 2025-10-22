/**
 * Footer
 * ------------------------------------------------------------
 * - Layout responsive con enlaces legales y sociales.
 * - Usa el año dinámico del cliente (no bloquea SSR).
 */

import Link from "next/link";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Jorge Rodríguez. Todos los derechos
          reservados.
        </p>
        <nav className="flex gap-4 text-sm">
          <Link className="hover:underline" href="/privacy">
            Privacidad
          </Link>
          <Link className="hover:underline" href="/terms">
            Términos
          </Link>
          <a
            className="hover:underline"
            href="https://github.com/Jorgeluisra10"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:underline"
            href="https://www.linkedin.com/in/jorgeluisra10/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
