import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  getCurrentAuthContext,
} from "@/src/lib/auth/current-auth";

export async function GET() {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("tilla_session")?.value;

  if (!sessionToken) {
    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 401,
      },
    );
  }

  const context =
    getCurrentAuthContext(sessionToken);

  if (!context) {
    return NextResponse.json(
      {
        authenticated: false,
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
}