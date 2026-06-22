import type { AdminCompositionRoot } from "../../admin-composition-root";
import { toAdminWorkspaceDto } from "../../application/mappers/admin-workspace-mapper";
import type { AdminWorkspaceDto } from "../../application/dto/admin-workspace-dto";

export async function getAdminWorkspaceQuery(
  admin: AdminCompositionRoot,
  workspaceId: string,
): Promise<AdminWorkspaceDto | null> {
  const workspace =
    await admin.services.workspaceAdminService.getWorkspace(workspaceId);

  if (!workspace) {
    return null;
  }

  return toAdminWorkspaceDto(workspace);
}