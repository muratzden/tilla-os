import { NextResponse } from "next/server";
import { createAdminCompositionRoot } from "@/src/core/admin/admin-composition-root";

export async function GET() {
  const admin = createAdminCompositionRoot();

  const users = await admin.services.userAdminService.listUsers();

  return NextResponse.json({
    users,
  });
}