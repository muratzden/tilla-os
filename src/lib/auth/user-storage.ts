import type {
  User,
  Workspace,
  Membership,
  Session,
  MarketplaceEntitlement,
} from "./auth-types";

import type { AuthStorageAdapter } from "./auth-storage-adapter";

import { jsonAuthStorageAdapter } from "./json-auth-storage-adapter";
import { memoryAuthStorageAdapter } from "./memory-auth-storage-adapter";

let authStorage: AuthStorageAdapter | null = null;

async function getAuthStorage() {
  if (authStorage) {
    return authStorage;
  }

  if (process.env.AUTH_STORAGE_ADAPTER === "postgres") {
    const { postgresAuthStorageAdapter } =
      await import("./postgres-auth-storage-adapter");

    authStorage = postgresAuthStorageAdapter;
    return authStorage;
  }

  authStorage =
    process.env.VERCEL === "1"
      ? memoryAuthStorageAdapter
      : jsonAuthStorageAdapter;

  return authStorage;
}

export async function getUsers() {
  return (await getAuthStorage()).getUsers();
}

export async function saveUser(user: User) {
  return (await getAuthStorage()).saveUser(user);
}

export async function getUserByEmail(email: string) {
  return (await getAuthStorage()).getUserByEmail(email);
}

export async function saveWorkspace(workspace: Workspace) {
  return (await getAuthStorage()).saveWorkspace(workspace);
}

export async function getWorkspace(workspaceId: string) {
  return (await getAuthStorage()).getWorkspace(workspaceId);
}

export async function addMembership(membership: Membership) {
  return (await getAuthStorage()).addMembership(membership);
}

export async function getMemberships(userId: string) {
  return (await getAuthStorage()).getMemberships(userId);
}

export async function saveSession(session: Session) {
  return (await getAuthStorage()).saveSession(session);
}

export async function getSession(token: string) {
  return (await getAuthStorage()).getSession(token);
}

export async function grantEntitlement(entitlement: MarketplaceEntitlement) {
  return (await getAuthStorage()).grantEntitlement(entitlement);
}

export async function getWorkspaceEntitlements(workspaceId: string) {
  return (await getAuthStorage()).getWorkspaceEntitlements(workspaceId);
}
