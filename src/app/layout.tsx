// app/layout.tsx
/**
 * RootLayout
 * ------------------------------------------------------------
 * - Monta el ThemeProvider (next-themes) en <body>.
 * - Inserta <GlobalBackground /> en z-index negativo para ir detrás de TODO.
 * - Usa Poppins con CSS variable para Tailwind.
 */

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import GlobalBackground from "@/components/GlobalBackground";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Jorge Rodríguez · Front-End & Product Engineer",
  description:
    "Sitio profesional de Jorge Luis Rodríguez: desarrollo web moderno con Next.js, UI/UX y performance.",
  metadataBase: new URL("https://tu-dominio.com"),
  openGraph: {
    title: "Jorge Rodríguez · Front-End & Product Engineer",
    description: "UI moderna, performance y SEO para tu negocio.",
    images: ["/og-image.png"],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = { themeColor: "#2196F3" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          poppins.variable,
          // `relative` permite que el canvas del fondo se ubique correctamente detrás.
          "min-h-screen relative font-sans antialiased"
        )}
      >
        {/* 🎆 FONDO GLOBAL detrás de todo (z-[-10]) */}
        <GlobalBackground />

        {/* Contenido por encima del fondo */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto max-w-6xl px-4 py-10">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
