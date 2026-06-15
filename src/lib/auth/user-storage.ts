import type {
  User,
  Workspace,
  Membership,
  Session,
  MarketplaceEntitlement,
} from "./auth-types";

import { jsonAuthStorageAdapter } from "./json-auth-storage-adapter";
import { memoryAuthStorageAdapter } from "./memory-auth-storage-adapter";
import { postgresAuthStorageAdapter } from "./postgres-auth-storage-adapter";

const authStorage =
  process.env.AUTH_STORAGE_ADAPTER === "postgres"
    ? postgresAuthStorageAdapter
    : process.env.VERCEL === "1"
      ? memoryAuthStorageAdapter
      : jsonAuthStorageAdapter;

export function getUsers() {
  return authStorage.getUsers();
}

export function saveUser(user: User) {
  return authStorage.saveUser(user);
}

export function getUserByEmail(email: string) {
  return authStorage.getUserByEmail(email);
}

export function saveWorkspace(workspace: Workspace) {
  return authStorage.saveWorkspace(workspace);
}

export function getWorkspace(workspaceId: string) {
  return authStorage.getWorkspace(workspaceId);
}

export function addMembership(membership: Membership) {
  return authStorage.addMembership(membership);
}

export function getMemberships(userId: string) {
  return authStorage.getMemberships(userId);
}

export function saveSession(session: Session) {
  return authStorage.saveSession(session);
}

export function getSession(token: string) {
  return authStorage.getSession(token);
}

export function grantEntitlement(
  entitlement: MarketplaceEntitlement,
) {
  return authStorage.grantEntitlement(entitlement);
}

export function getWorkspaceEntitlements(
  workspaceId: string,
) {
  return authStorage.getWorkspaceEntitlements(workspaceId);
}