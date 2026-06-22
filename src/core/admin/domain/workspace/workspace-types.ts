export type AdminWorkspaceStatus = "active" | "suspended" | "archived";

export type AdminWorkspacePlan = "free" | "pro" | "business" | "enterprise";

export interface AdminWorkspace {
  id: string;
  name: string;
  ownerUserId: string;
  status: AdminWorkspaceStatus;
  plan: AdminWorkspacePlan;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminWorkspaceSummary {
  id: string;
  name: string;
  status: AdminWorkspaceStatus;
  plan: AdminWorkspacePlan;
  memberCount: number;
  activePackageCount: number;
}

export interface AdminWorkspaceMember {
  workspaceId: string;
  userId: string;
  roleId: string;
  joinedAt: string;
}