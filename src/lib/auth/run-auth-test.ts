import {
  ensureOwnerAccount,
  login,
  validateSession,
} from "./auth-service";

const owner = ensureOwnerAccount(
  "owner@tilla.test",
  "123456",
  "Tilla Workspace",
);

const session = login("owner@tilla.test", "123456");

const validated = validateSession(session.token);

console.log("Auth Test");

console.log({
  userId: owner.user.id,
  workspaceId: owner.workspace.id,
  role: owner.membership.role,
  sessionValid: Boolean(validated),
});