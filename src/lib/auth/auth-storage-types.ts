import type {
  User,
  Workspace,
  Membership,
  Session,
  MarketplaceEntitlement,
} from "./auth-types";

export type AuthStorageState = {
  users: User[];
  workspaces: Workspace[];
  memberships: Membership[];
  sessions: Session[];
  entitlements: MarketplaceEntitlement[];
};