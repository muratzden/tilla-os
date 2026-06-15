import type {
  User,
  Workspace,
  Membership,
  Session,
  MarketplaceEntitlement,
} from "./auth-types";

import type { AuthStorageAdapter } from "./auth-storage-adapter";

const users: User[] = [];
const workspaces: Workspace[] = [];
const memberships: Membership[] = [];
const sessions: Session[] = [];
const entitlements: MarketplaceEntitlement[] = [];

export const memoryAuthStorageAdapter: AuthStorageAdapter = {
  getUsers() {
    return users;
  },

  saveUser(user: User) {
    const index = users.findIndex((item) => item.id === user.id);

    if (index >= 0) {
      users[index] = user;
      return;
    }

    users.push(user);
  },

  getUserByEmail(email: string) {
    return users.find((user) => user.email === email);
  },

  saveWorkspace(workspace: Workspace) {
    const index = workspaces.findIndex(
      (item) => item.id === workspace.id,
    );

    if (index >= 0) {
      workspaces[index] = workspace;
      return;
    }

    workspaces.push(workspace);
  },

  getWorkspace(workspaceId: string) {
    return workspaces.find(
      (workspace) => workspace.id === workspaceId,
    );
  },

  addMembership(membership: Membership) {
    const exists = memberships.some(
      (item) =>
        item.workspaceId === membership.workspaceId &&
        item.userId === membership.userId,
    );

    if (!exists) {
      memberships.push(membership);
    }
  },

  getMemberships(userId: string) {
    return memberships.filter((item) => item.userId === userId);
  },

  saveSession(session: Session) {
    const index = sessions.findIndex(
      (item) => item.token === session.token,
    );

    if (index >= 0) {
      sessions[index] = session;
      return;
    }

    sessions.push(session);
  },

  getSession(token: string) {
    return sessions.find((session) => session.token === token);
  },

  grantEntitlement(entitlement: MarketplaceEntitlement) {
    const exists = entitlements.some(
      (item) =>
        item.workspaceId === entitlement.workspaceId &&
        item.packageId === entitlement.packageId,
    );

    if (!exists) {
      entitlements.push(entitlement);
    }
  },

  getWorkspaceEntitlements(workspaceId: string) {
    return entitlements.filter(
      (item) => item.workspaceId === workspaceId,
    );
  },
};