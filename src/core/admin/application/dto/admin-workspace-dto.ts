import type {
  AdminWorkspacePlan,
  AdminWorkspaceStatus,
} from "../../domain/workspace/workspace-types";

export interface AdminWorkspaceDto {
  id: string;
  name: string;
  ownerUserId: string;
  status: AdminWorkspaceStatus;
  plan: AdminWorkspacePlan;
  createdAt: string;
  updatedAt: string | null;
}