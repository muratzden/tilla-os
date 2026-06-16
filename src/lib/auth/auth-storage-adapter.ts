import type {
  User,
  Workspace,
  Membership,
  Session,
  MarketplaceEntitlement,
} from "./auth-types";

export interface AuthStorageAdapter {
  getUsers(): Promise<User[]>;
  saveUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;

  saveWorkspace(workspace: Workspace): Promise<void>;
  getWorkspace(workspaceId: string): Promise<Workspace | undefined>;

  addMembership(membership: Membership): Promise<void>;
  getMemberships(userId: string): Promise<Membership[]>;

  saveSession(session: Session): Promise<void>;
  getSession(token: string): Promise<Session | undefined>;

  grantEntitlement(entitlement: MarketplaceEntitlement): Promise<void>;

  getWorkspaceEntitlements(
    workspaceId: string,
  ): Promise<MarketplaceEntitlement[]>;
}
