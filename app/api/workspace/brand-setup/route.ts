import { cookies } from "next/headers";
import { NextResponse } from "next/server";


import { getCurrentAuthContext } from "@/src/lib/auth/current-auth";


import {
  getWorkspaceBrandSetup,
  saveWorkspaceBrandSetup,
} from "@/src/lib/workspace/workspace-brand-setup-service";


import { createBrandOSStateFromBrandSetup } from "@/src/lib/brand-os/brand-setup-to-brand-os-state";
import { saveBrandOSState } from "@/src/lib/brand-os/brand-os-state-storage";


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
      { status: 401 },
    );
  }

  const brandSetup = getWorkspaceBrandSetup(auth.workspace.id);

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
      { status: 401 },
    );
  }

  const brandSetup = await request.json();

  saveWorkspaceBrandSetup(auth.workspace.id, brandSetup);
  
  const brandOSState = createBrandOSStateFromBrandSetup(brandSetup);

await saveBrandOSState(auth.workspace.id, brandOSState);

  return NextResponse.json({
    success: true,
  });
}
