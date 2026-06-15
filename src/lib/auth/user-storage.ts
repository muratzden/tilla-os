import type {
  User,
  Workspace,
  Membership,
  Session,
  MarketplaceEntitlement,
} from "./auth-types";

import { jsonAuthStorageAdapter } from "./json-auth-storage-adapter";

const authStorage = jsonAuthStorageAdapter;

export function getUsers() {
  return authStorage.getUsers();
}

export function saveUser(user: User) {
  authStorage.saveUser(user);
}

export function getUserByEmail(email: string) {
  return authStorage.getUserByEmail(email);
}

export function saveWorkspace(workspace: Workspace) {
  authStorage.saveWorkspace(workspace);
}

export function getWorkspace(workspaceId: string) {
  return authStorage.getWorkspace(workspaceId);
}

export function addMembership(membership: Membership) {
  authStorage.addMembership(membership);
}

export function getMemberships(userId: string) {
  return authStorage.getMemberships(userId);
}

export function saveSession(session: Session) {
  authStorage.saveSession(session);
}

export function getSession(token: string) {
  return authStorage.getSession(token);
}

export function grantEntitlement(
  entitlement: MarketplaceEntitlement,
) {
  authStorage.grantEntitlement(entitlement);
}

export function getWorkspaceEntitlements(
  workspaceId: string,
) {
  return authStorage.getWorkspaceEntitlements(workspaceId);
}