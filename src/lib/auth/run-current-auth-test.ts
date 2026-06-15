import {
  ensureOwnerAccount,
  login,
} from "./auth-service";

import {
  getCurrentAuthContext,
} from "./current-auth";

const owner = ensureOwnerAccount(
  "owner@tilla.test",
  "123456",
  "Tilla Workspace",
);

const session = login(
  "owner@tilla.test",
  "123456",
);

const context = getCurrentAuthContext(
  session.token,
);

console.log("Current Auth Test");

console.log({
  passed:
    Boolean(context) &&
    context?.user.id === owner.user.id &&
    context?.workspace.id === owner.workspace.id &&
    context?.membership.role === "owner",
  userId: context?.user.id,
  workspaceId: context?.workspace.id,
  role: context?.membership.role,
});