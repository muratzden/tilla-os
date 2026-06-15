import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getCurrentAuthContext } from "@/src/lib/auth/current-auth";

import {
  getWorkspaceBrandSetup,
  saveWorkspaceBrandSetup,
} from "@/src/lib/workspace/workspace-brand-setup-service";

async function getAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("tilla_session")?.value;

  if (!sessionToken) {
    return null;
  }

  return getCurrentAuthContext(sessionToken);
}

export async function GET() {
  const auth = await getAuth();

  if (!auth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const brandSetup = getWorkspaceBrandSetup(
    auth.workspace.id
  );

  return NextResponse.json({
    success: true,
    brandSetup,
  });
}

export async function POST(request: Request) {
  const auth = await getAuth();

  if (!auth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const brandSetup = await request.json();

  saveWorkspaceBrandSetup(
    auth.workspace.id,
    brandSetup
  );

  return NextResponse.json({
    success: true,
  });
}