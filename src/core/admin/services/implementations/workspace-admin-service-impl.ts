import type { WorkspaceContract } from "../../domain/workspace/workspace-contract";
import type { WorkspaceAdminService as WorkspaceAdminServiceContract } from "../contracts/workspace-admin-service";

export class WorkspaceAdminServiceImpl implements WorkspaceAdminServiceContract {
  constructor(private readonly workspaceRepository: WorkspaceContract) {}

  async getWorkspace(workspaceId: string) {
    return this.workspaceRepository.getWorkspace(workspaceId);
  }

  async listWorkspaces() {
    return this.workspaceRepository.listWorkspaces();
  }

  async suspendWorkspace(workspaceId: string) {
    return this.workspaceRepository.suspendWorkspace(workspaceId);
  }

  async archiveWorkspace(workspaceId: string) {
    return this.workspaceRepository.archiveWorkspace(workspaceId);
  }
}