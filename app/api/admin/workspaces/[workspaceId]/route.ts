import { NextResponse } from "next/server";

import { createAdminCompositionRoot } from "@/src/core/admin/admin-composition-root";
import {
  adminApiError,
  adminApiSuccess,
} from "@/src/core/admin/application/responses/admin-api-response";
import { getAdminWorkspaceQuery } from "@/src/core/admin/queries";

type RouteContext = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { workspaceId } = await params;

  const admin = createAdminCompositionRoot();

  const dto = await getAdminWorkspaceQuery(admin, workspaceId);

  if (!dto) {
    return NextResponse.json(
      adminApiError("ADMIN_WORKSPACE_NOT_FOUND", "Workspace not found."),
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(adminApiSuccess(dto));
}