import { NextResponse } from "next/server";

import {
  ensureDemoAccount,
  ensureOwnerAccount,
  login,
} from "@/src/lib/auth/auth-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await ensureDemoAccount();

    const email = String(body.email ?? "");
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 },
      );
    }

    await ensureOwnerAccount(email, password, "Tilla Workspace");

    const session = await login(email, password);

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("tilla_session", session.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Login failed",
      },
      { status: 401 },
    );
  }
}
