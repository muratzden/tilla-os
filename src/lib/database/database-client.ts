import { Pool } from "@neondatabase/serverless";

let databasePool: Pool | null = null;

function getDatabasePool() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is missing");
  }

  if (!databasePool) {
    databasePool = new Pool({
      connectionString: databaseUrl,
    });
  }

  return databasePool;
}

export async function executeSql(statement: string, values: unknown[] = []) {
  return getDatabasePool().query(statement, values);
}
