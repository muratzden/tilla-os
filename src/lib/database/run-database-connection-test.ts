import "dotenv/config";

import { executeSql } from "./database-client";

async function runDatabaseConnectionTest() {
  const result = await executeSql(
    "SELECT NOW() AS server_time",
  );

  console.log("Database Connection Test");
  console.log(result.rows);
}

runDatabaseConnectionTest().catch((error) => {
  console.error(
    "Database Connection Test Failed",
  );

  console.error(error);

  process.exit(1);
});