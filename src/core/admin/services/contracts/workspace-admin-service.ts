import type {
  AdminWorkspace,
  AdminWorkspaceSummary,
} from "../../domain/workspace/workspace-types";

export interface WorkspaceAdminService {
  getWorkspace(workspaceId: string): Promise<AdminWorkspace | null>;

  listWorkspaces(): Promise<AdminWorkspaceSummary[]>;

  suspendWorkspace(workspaceId: string): Promise<void>;

  archiveWorkspace(workspaceId: string): Promise<void>;
}
