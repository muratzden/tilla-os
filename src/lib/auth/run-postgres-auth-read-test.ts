import "dotenv/config";

import { executeSql } from "../database/database-client";

async function runPostgresAuthReadTest() {
  const users = await executeSql(`
    SELECT id, email, created_at
    FROM users
    ORDER BY created_at DESC
    LIMIT 10
  `);

  const workspaces = await executeSql(`
    SELECT id, name
    FROM workspaces
    ORDER BY created_at DESC
    LIMIT 10
  `);

  const sessions = await executeSql(`
    SELECT token, user_id
    FROM sessions
    LIMIT 10
  `);

  console.log("Postgres Read Test");

  console.log({
    userCount: users.rows.length,
    workspaceCount: workspaces.rows.length,
    sessionCount: sessions.rows.length,
    latestUser: users.rows[0],
  });
}

runPostgresAuthReadTest().catch((error) => {
  console.error(error);
  process.exit(1);
});
