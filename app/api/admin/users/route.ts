import { NextResponse } from "next/server";

import { createAdminCompositionRoot } from "@/src/core/admin/admin-composition-root";
import { adminApiSuccess } from "@/src/core/admin/application/responses/admin-api-response";
import { getAdminUsersQuery } from "@/src/core/admin/queries";

export async function GET() {
  const admin = createAdminCompositionRoot();

  const dto = await getAdminUsersQuery(admin);

  return NextResponse.json(
    adminApiSuccess(dto),
  );
}