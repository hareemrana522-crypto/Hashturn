import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    await jwtVerify(token, secret);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { order } = await req.json();
    
    if (!Array.isArray(order)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    for (let i = 0; i < order.length; i++) {
      await sql`UPDATE team_members SET display_order = ${i + 1} WHERE id = ${order[i]}`;
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Failed to reorder team members", err);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
