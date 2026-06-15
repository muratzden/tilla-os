import type {
  User,
  Workspace,
  Membership,
} from "./auth-types";

import {
  getSession,
  getUsers,
  getMemberships,
  getWorkspace,
} from "./user-storage";

export type CurrentAuthContext = {
  user: User;
  workspace: Workspace;
  membership: Membership;
};

export async function getCurrentAuthContext(
  sessionToken: string,
): Promise<CurrentAuthContext | null> {
  const session = await getSession(sessionToken);

  if (!session) {
    return null;
  }

  if (
    new Date(session.expiresAt).getTime() < Date.now()
  ) {
    return null;
  }

  const users = await getUsers();

  const user = users.find(
    (item) => item.id === session.userId,
  );

  if (!user) {
    return null;
  }

  const memberships = await getMemberships(user.id);
  const membership = memberships[0];

  if (!membership) {
    return null;
  }

  const workspace = await getWorkspace(
    membership.workspaceId,
  );

  if (!workspace) {
    return null;
  }

  return {
    user,
    workspace,
    membership,
  };
}