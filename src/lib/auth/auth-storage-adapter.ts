import type {
  User,
  Workspace,
  Membership,
  Session,
  MarketplaceEntitlement,
} from "./auth-types";

export interface AuthStorageAdapter {
  getUsers(): User[];
  saveUser(user: User): void;
  getUserByEmail(email: string): User | undefined;

  saveWorkspace(workspace: Workspace): void;
  getWorkspace(workspaceId: string): Workspace | undefined;

  addMembership(membership: Membership): void;
  getMemberships(userId: string): Membership[];

  saveSession(session: Session): void;
  getSession(token: string): Session | undefined;

  grantEntitlement(
    entitlement: MarketplaceEntitlement,
  ): void;

  getWorkspaceEntitlements(
    workspaceId: string,
  ): MarketplaceEntitlement[];
}