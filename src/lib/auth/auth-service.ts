import crypto from "crypto";

import type {
  User,
  Workspace,
  Membership,
  Session,
} from "./auth-types";

import {
  saveUser,
  getUserByEmail,
  saveWorkspace,
  addMembership,
  saveSession,
  getSession,
  getMemberships,
  getWorkspace,
} from "./user-storage";

function generateId() {
  return crypto.randomUUID();
}

function generateToken() {
  return crypto.randomUUID();
}

export function registerOwner(
  email: string,
  password: string,
  workspaceName: string,
) {
  const existing = getUserByEmail(email);

  if (existing) {
    throw new Error("User already exists");
  }

  const user: User = {
    id: generateId(),
    email,
    passwordHash: password,
    createdAt: new Date().toISOString(),
  };

  saveUser(user);

  const workspace: Workspace = {
    id: generateId(),
    name: workspaceName,
    ownerUserId: user.id,
    createdAt: new Date().toISOString(),
  };

  saveWorkspace(workspace);

  const membership: Membership = {
    workspaceId: workspace.id,
    userId: user.id,
    role: "owner",
  };

  addMembership(membership);

  return {
    user,
    workspace,
    membership,
  };
}

export function ensureOwnerAccount(
  email: string,
  password: string,
  workspaceName: string,
) {
  const existing = getUserByEmail(email);

  if (!existing) {
    return registerOwner(
      email,
      password,
      workspaceName,
    );
  }

  const existingMembership =
    getMemberships(existing.id)[0];

  if (!existingMembership) {
    throw new Error(
      `Existing user '${email}' has no workspace membership`,
    );
  }

  const existingWorkspace = getWorkspace(
    existingMembership.workspaceId,
  );

  if (!existingWorkspace) {
    throw new Error(
      `Workspace '${existingMembership.workspaceId}' was not found`,
    );
  }

  return {
    user: existing,
    workspace: existingWorkspace,
    membership: existingMembership,
  };
}

export function login(email: string, password: string) {
  const user = getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.passwordHash !== password) {
    throw new Error("Invalid password");
  }

   const memberships = getMemberships(user.id);
  const activeMembership = memberships[0];

  if (!activeMembership) {
    throw new Error("User has no workspace membership");
  }

  const session: Session = {
    token: generateToken(),
    userId: user.id,
    activeWorkspaceId: activeMembership.workspaceId,
    expiresAt: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30,
    ).toISOString(),
  };

  saveSession(session);

  return session;
}

export function validateSession(token: string) {
  const session = getSession(token);

  if (!session) {
    return null;
  }

  if (
    new Date(session.expiresAt).getTime() <
    Date.now()
  ) {
    return null;
  }

  return session;
}