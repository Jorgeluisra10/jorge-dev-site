// src/app/api/contact/route.ts
/**
 * Contact API (App Router)
 * ------------------------------------------------------------
 * - Importar SIEMPRE desde "next/server" (no "next") en app/.
 * - Runtime Node (necesario si usarás SDKs que no soportan Edge).
 * - Manejo de CORS básico y método OPTIONS (preflight).
 * - Validación mínima del body y respuestas tipadas.
 */

import { NextResponse, type NextRequest } from "next/server";

// Usa Node.js runtime (Netlify/Funciones). Cambia a "edge" si lo prefieres.
export const runtime = "nodejs";
// Fuerza dinámico (no cachea la ruta).
export const dynamic = "force-dynamic";

// Whitelist opcional (ajústalo o elimina si no haces cross-origin)
const ALLOWED_ORIGINS = ["https://tu-dominio.com", "http://localhost:3000"];

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

// Responder preflight CORS
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const headers = corsHeaders(req);

    const body = (await req.json()) as ContactPayload;

    // Validación mínima
    if (!body?.email || !body?.message) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos requeridos." },
        { status: 400, headers }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200, headers });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Bad Request" },
      { status: 400, headers: corsHeaders(req) }
    );
  }
}
