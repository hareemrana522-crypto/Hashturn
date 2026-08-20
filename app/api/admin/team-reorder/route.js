import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { cookies } from "next/headers";
const SESSION_SECRET = "hashturn-admin-secret-2025";
const SESSION_COOKIE = "ht_session";

export async function POST(req) {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token || token !== SESSION_SECRET) {
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
