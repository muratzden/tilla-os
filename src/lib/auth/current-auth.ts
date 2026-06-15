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

export function getCurrentAuthContext(
  sessionToken: string,
): CurrentAuthContext | null {
  const session = getSession(sessionToken);

  if (!session) {
    return null;
  }

  if (
    new Date(session.expiresAt).getTime() <
    Date.now()
  ) {
    return null;
  }

  const user = getUsers().find(
    (item) => item.id === session.userId,
  );

  if (!user) {
    return null;
  }

  const membership = getMemberships(user.id)[0];

  if (!membership) {
    return null;
  }

  const workspace = getWorkspace(
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