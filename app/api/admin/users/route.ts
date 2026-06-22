import { NextResponse } from "next/server";

import { createAdminCompositionRoot } from "@/src/core/admin/admin-composition-root";
import { adminApiSuccess } from "@/src/core/admin/application/responses/admin-api-response";
import { toAdminUserDto } from "@/src/core/admin/application/mappers/admin-user-mapper";

export async function GET() {
  const admin = createAdminCompositionRoot();

  const users = await admin.services.userAdminService.listUsers();

  return NextResponse.json(
    adminApiSuccess(users.map(toAdminUserDto)),
  );
}