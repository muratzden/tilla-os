import { NextResponse } from "next/server";
import { createAdminCompositionRoot } from "@/src/core/admin/admin-composition-root";

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
      {
        workspace: null,
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    workspace,
  });
}