import { NextRequest, NextResponse } from "next";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO: Integra tu proveedor de email (Resend/SendGrid/etc.)
    // console.log("Nuevo lead:", body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return new NextResponse("Bad Request", { status: 400 });
  }
}
