import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
import { executeSql } from "../src/lib/database/database-client";

async function run() {
  await executeSql(`
    CREATE TABLE IF NOT EXISTS brand_os_states (
      workspace_id TEXT PRIMARY KEY,
      state_json JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  console.log("Brand OS schema applied");
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
