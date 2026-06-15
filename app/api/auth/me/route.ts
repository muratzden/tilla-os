import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getCurrentAuthContext } from "@/src/lib/auth/current-auth";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const sessionToken = cookieStore.get("tilla_session")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        {
          authenticated: false,
          reason: "missing_session",
        },
        {
          status: 401,
        },
      );
    }

    const context = await getCurrentAuthContext(sessionToken);

    if (!context) {
      return NextResponse.json(
        {
          authenticated: false,
          reason: "invalid_session",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({
      authenticated: true,

      user: {
        id: context.user.id,
        email: context.user.email,
      },

      workspace: {
        id: context.workspace.id,
        name: context.workspace.name,
      },

      membership: {
        role: context.membership.role,
      },
    });
  } catch (error) {
    console.error("Auth context load failed", error);

    return NextResponse.json(
      {
        authenticated: false,
        reason: "auth_context_error",
      },
      {
        status: 500,
      },
    );
  }
}