import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

const ADMIN_USER = "admin";
const ADMIN_PASS = "Admin0900";
const SESSION_SECRET = "hashturn-admin-secret-2025";
const SESSION_COOKIE = "ht_session";

export async function POST(request) {
  try {
    const data = await request.formData();
    const username = data.get("username")?.toString() || "";
    const password = data.get("password")?.toString() || "";

    let valid = false;
    try {
      const userBuf = Buffer.from(username.padEnd(ADMIN_USER.length));
      const passBuf = Buffer.from(password.padEnd(ADMIN_PASS.length));
      const userMatch = timingSafeEqual(
        userBuf,
        Buffer.from(ADMIN_USER.padEnd(ADMIN_USER.length))
      );
      const passMatch = timingSafeEqual(
        passBuf,
        Buffer.from(ADMIN_PASS.padEnd(ADMIN_PASS.length))
      );
      valid =
        userMatch &&
        passMatch &&
        username === ADMIN_USER &&
        password === ADMIN_PASS;
    } catch {
      valid = false;
    }

    if (valid) {
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: SESSION_COOKIE,
        value: SESSION_SECRET,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 8, // 8 hours
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
