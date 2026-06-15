import type {
  User,
  Workspace,
  Membership,
  Session,
  MarketplaceEntitlement,
} from "./auth-types";

import type { AuthStorageAdapter } from "./auth-storage-adapter";

import {
  loadJsonAuthStorageState,
  saveJsonAuthStorageState,
} from "./json-auth-storage";

export const jsonAuthStorageAdapter: AuthStorageAdapter = {
  getUsers() {
    return loadJsonAuthStorageState().users;
  },

  saveUser(user: User) {
    const state = loadJsonAuthStorageState();

    state.users = [
      ...state.users.filter((item) => item.id !== user.id),
      user,
    ];

    saveJsonAuthStorageState(state);
  },

  getUserByEmail(email: string) {
    return loadJsonAuthStorageState().users.find(
      (user) => user.email === email,
    );
  },

  saveWorkspace(workspace: Workspace) {
    const state = loadJsonAuthStorageState();

    state.workspaces = [
      ...state.workspaces.filter(
        (item) => item.id !== workspace.id,
      ),
      workspace,
    ];

    saveJsonAuthStorageState(state);
  },

  getWorkspace(workspaceId: string) {
    return loadJsonAuthStorageState().workspaces.find(
      (workspace) => workspace.id === workspaceId,
    );
  },

  addMembership(membership: Membership) {
    const state = loadJsonAuthStorageState();

    const exists = state.memberships.some(
      (item) =>
        item.workspaceId === membership.workspaceId &&
        item.userId === membership.userId,
    );

    if (!exists) {
      state.memberships.push(membership);
    }

    saveJsonAuthStorageState(state);
  },

  getMemberships(userId: string) {
    return loadJsonAuthStorageState().memberships.filter(
      (item) => item.userId === userId,
    );
  },

  saveSession(session: Session) {
    const state = loadJsonAuthStorageState();

    state.sessions = [
      ...state.sessions.filter(
        (item) => item.token !== session.token,
      ),
      session,
    ];

    saveJsonAuthStorageState(state);
  },

  getSession(token: string) {
    return loadJsonAuthStorageState().sessions.find(
      (session) => session.token === token,
    );
  },

  grantEntitlement(
    entitlement: MarketplaceEntitlement,
  ) {
    const state = loadJsonAuthStorageState();

    const exists = state.entitlements.some(
      (item) =>
        item.workspaceId === entitlement.workspaceId &&
        item.packageId === entitlement.packageId,
    );

    if (!exists) {
      state.entitlements.push(entitlement);
    }

    saveJsonAuthStorageState(state);
  },

  getWorkspaceEntitlements(workspaceId: string) {
    return loadJsonAuthStorageState().entitlements.filter(
      (item) => item.workspaceId === workspaceId,
    );
  },
};