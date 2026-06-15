import { Pool } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL environment variable is missing",
  );
}

export const databasePool = new Pool({
  connectionString: databaseUrl,
});

export async function executeSql(
  statement: string,
  values: unknown[] = [],
) {
  return databasePool.query(statement, values);
}