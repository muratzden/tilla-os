import { NextResponse } from "next/server";

import { createAdminCompositionRoot } from "@/src/core/admin/admin-composition-root";
import { getAdminSystemSettingsQuery } from "@/src/core/admin/queries";
import { adminApiSuccess } from "@/src/core/admin/application/responses/admin-api-response";

export async function GET() {
  const admin = createAdminCompositionRoot();

 const dto =
  await getAdminSystemSettingsQuery(admin);

return NextResponse.json(
  adminApiSuccess(dto),
);
}