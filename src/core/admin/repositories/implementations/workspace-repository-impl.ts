import type { WorkspaceContract } from "../../domain/workspace/workspace-contract";
import type {
  AdminWorkspace,
  AdminWorkspaceSummary,
} from "../../domain/workspace/workspace-types";
import { getWorkspace } from "@/src/lib/auth/user-storage";

export class WorkspaceRepositoryImpl implements WorkspaceContract {
  async getWorkspace(workspaceId: string): Promise<AdminWorkspace | null> {
    const workspace = await getWorkspace(workspaceId);

    return workspace as AdminWorkspace | null;
  }

  async listWorkspaces(): Promise<AdminWorkspaceSummary[]> {
    return [];
  }

  async suspendWorkspace(_workspaceId: string): Promise<void> {
    throw new Error("Workspace suspension is not implemented yet.");
  }

  async archiveWorkspace(_workspaceId: string): Promise<void> {
    throw new Error("Workspace archive is not implemented yet.");
  }
}