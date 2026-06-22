import { NextResponse } from "next/server";
import { createAdminCompositionRoot } from "@/src/core/admin/admin-composition-root";

export async function GET() {
  const admin = createAdminCompositionRoot();

  const settings = await admin.services.settingsAdminService.getSystemSettings();

  return NextResponse.json({
    settings,
  });
}