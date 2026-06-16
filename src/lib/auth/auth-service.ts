import crypto from "crypto";

import {
  hashPassword,
  verifyPassword,
  isPasswordHashed,
} from "./password-hashing";

import type { User, Workspace, Membership, Session } from "./auth-types";

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

export async function registerOwner(
  email: string,
  password: string,
  workspaceName: string,
) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  if (!/[A-Za-z]/.test(password)) {
    throw new Error("Password must contain at least one letter");
  }

  if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain at least one number");
  }
  const existing = await getUserByEmail(email);

  if (existing) {
    throw new Error("User already exists");
  }

  const user: User = {
    id: generateId(),
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  await saveUser(user);

  const workspace: Workspace = {
    id: generateId(),
    name: workspaceName,
    ownerUserId: user.id,
    createdAt: new Date().toISOString(),
  };

  await saveWorkspace(workspace);

  const membership: Membership = {
    workspaceId: workspace.id,
    userId: user.id,
    role: "owner",
  };

  await addMembership(membership);

  return {
    user,
    workspace,
    membership,
  };
}

export async function ensureOwnerAccount(
  email: string,
  password: string,
  workspaceName: string,
) {
  const existing = await getUserByEmail(email);

  if (!existing) {
    return registerOwner(email, password, workspaceName);
  }

  const memberships = await getMemberships(existing.id);
  const existingMembership = memberships[0];

  if (!existingMembership) {
    throw new Error(`Existing user '${email}' has no workspace membership`);
  }

  const existingWorkspace = await getWorkspace(existingMembership.workspaceId);

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

export async function login(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const passwordAlreadyHashed = isPasswordHashed(user.passwordHash);

  const passwordMatches = passwordAlreadyHashed
    ? verifyPassword(password, user.passwordHash)
    : user.passwordHash === password;

  if (!passwordMatches) {
    throw new Error("Invalid password");
  }

  if (!passwordAlreadyHashed) {
    await saveUser({
      ...user,
      passwordHash: hashPassword(password),
    });
  }

  const memberships = await getMemberships(user.id);
  const activeMembership = memberships[0];

  if (!activeMembership) {
    throw new Error("User has no workspace membership");
  }

  const session: Session = {
    token: generateToken(),
    userId: user.id,
    activeWorkspaceId: activeMembership.workspaceId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  };

  await saveSession(session);

  return session;
}

export async function validateSession(token: string) {
  const session = await getSession(token);

  if (!session) {
    return null;
  }

  if (new Date(session.expiresAt).getTime() < Date.now()) {
    return null;
  }

  return session;
}

export async function ensureDemoAccount() {
  return ensureOwnerAccount(
    "demo@tilla-os.dev",
    "demo123",
    "TILLA-OS Demo Workspace",
  );
}
