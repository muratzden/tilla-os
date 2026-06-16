import "dotenv/config";

import { ensureOwnerAccount, login, validateSession } from "./auth-service";

async function runAuthTest() {
  const owner = await ensureOwnerAccount(
    "owner@tilla.test",
    "123456",
    "Tilla Workspace",
  );

  const session = await login("owner@tilla.test", "123456");

  const validated = await validateSession(session.token);

  console.log("Auth Test");

  console.log({
    userId: owner.user.id,
    workspaceId: owner.workspace.id,
    role: owner.membership.role,
    sessionValid: Boolean(validated),
  });
}

runAuthTest();
