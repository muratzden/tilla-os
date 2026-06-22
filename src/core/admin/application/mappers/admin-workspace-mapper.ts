import type { AdminWorkspace } from "../../domain/workspace/workspace-types";
import type { AdminWorkspaceDto } from "../dto/admin-workspace-dto";

export function toAdminWorkspaceDto(
  workspace: AdminWorkspace,
): AdminWorkspaceDto {
  return {
    id: workspace.id,
    name: workspace.name,
    ownerUserId: workspace.ownerUserId,
    status: workspace.status,
    plan: workspace.plan,
    createdAt: workspace.createdAt,
    updatedAt: workspace.updatedAt ?? null,
  };
}