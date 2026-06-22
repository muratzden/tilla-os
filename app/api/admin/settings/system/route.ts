import { NextResponse } from "next/server";

import { createAdminCompositionRoot } from "@/src/core/admin/admin-composition-root";
import { toAdminSystemSettingsDto } from "@/src/core/admin/application/mappers/admin-system-settings-mapper";
import { adminApiSuccess } from "@/src/core/admin/application/responses/admin-api-response";

export async function GET() {
  const admin = createAdminCompositionRoot();

  const settings =
    await admin.services.settingsAdminService.getSystemSettings();

  return NextResponse.json(
    adminApiSuccess(
      toAdminSystemSettingsDto(settings),
    ),
  );
}