export type UserRole = "owner" | "admin" | "member";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  ownerUserId: string;
  createdAt: string;
}

export interface Membership {
  workspaceId: string;
  userId: string;
  role: UserRole;
}

export interface Session {
  token: string;
  userId: string;
  activeWorkspaceId: string;
  expiresAt: string;
}

export interface MarketplaceEntitlement {
  workspaceId: string;
  packageId: string;
  grantedAt: string;
}
