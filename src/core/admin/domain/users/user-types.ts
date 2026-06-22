export type AdminUserStatus = "active" | "suspended" | "invited";

export interface AdminUser {
  id: string;
  email: string;
  status: AdminUserStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminUserWorkspaceMembership {
  userId: string;
  workspaceId: string;
  roleId: string;
}