import { NextResponse } from "next/server";

import { registerOwner, login } from "@/src/lib/auth/auth-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(body.password ?? "");
    const workspaceName = String(body.workspaceName ?? "").trim();

    if (!email || !password || !workspaceName) {
      return NextResponse.json(
        {
          success: false,
          error: "Email, password and workspace name are required",
        },
        { status: 400 },
      );
    }

    const registration = await registerOwner(email, password, workspaceName);

    const session = await login(email, password);

    const response = NextResponse.json({
      success: true,
      user: {
        id: registration.user.id,
        email: registration.user.email,
      },
      workspace: registration.workspace,
      membership: registration.membership,
    });

    response.cookies.set("tilla_session", session.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(session.expiresAt),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      },
      { status: 400 },
    );
  }
}
