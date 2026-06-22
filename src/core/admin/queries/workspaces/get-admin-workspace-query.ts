import type { AdminCompositionRoot } from "../../admin-composition-root";
import type { AdminWorkspaceDto } from "../../application/dto/admin-workspace-dto";
import { toAdminWorkspaceDto } from "../../application/mappers/admin-workspace-mapper";
import type { AdminQueryHandler } from "../contracts/admin-query-handler";

export const getAdminWorkspaceQuery: AdminQueryHandler<
  AdminCompositionRoot,
  AdminWorkspaceDto | null,
  string
> = async (admin, workspaceId) => {
  const workspace =
    await admin.services.workspaceAdminService.getWorkspace(workspaceId);

  if (!workspace) {
    return null;
  }

  return toAdminWorkspaceDto(workspace);
};