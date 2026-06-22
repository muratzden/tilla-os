import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getCurrentAuthContext } from "@/src/lib/auth/current-auth";
import { getBrandOSState } from "@/src/lib/brand-os/brand-os-state-storage";

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
      {
        success: false,
        error: "Unauthorized",
        state: null,
        missionControl: null,
      },
      { status: 401 },
    );
  }

  const state = await getBrandOSState(auth.workspace.id);

  if (!state) {
    return NextResponse.json({
      success: true,
      state: null,
      missionControl: null,
    });
  }

  return NextResponse.json({
    success: true,
    state,
    missionControl: state.missionControl ?? null,
  });
}
