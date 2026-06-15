import "dotenv/config";

import { executeSql } from "./database-client";
import { postgresAuthSchema } from "./database-schema";

async function runAuthSchema() {
  for (const statement of postgresAuthSchema) {
    await executeSql(statement);
  }

  console.log("Auth schema applied");
}

runAuthSchema().catch((error) => {
  console.error("Auth schema failed");
  console.error(error);
  process.exit(1);
});