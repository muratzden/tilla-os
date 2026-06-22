import { NextResponse } from "next/server";

import { createAdminCompositionRoot } from "@/src/core/admin/admin-composition-root";
import {
  adminApiError,
  adminApiSuccess,
} from "@/src/core/admin/application/responses/admin-api-response";
import { toAdminWorkspaceDto } from "@/src/core/admin/application/mappers/admin-workspace-mapper";

type RouteContext = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { workspaceId } = await params;

  const admin = createAdminCompositionRoot();

  const workspace = await admin.services.workspaceAdminService.getWorkspace(
    workspaceId,
  );

  if (!workspace) {
    return NextResponse.json(
      adminApiError("ADMIN_WORKSPACE_NOT_FOUND", "Workspace not found."),
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(adminApiSuccess(toAdminWorkspaceDto(workspace)));
}