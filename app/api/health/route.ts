export async function GET() {
  return Response.json({
    ok: true,
    authStorageAdapter: process.env.AUTH_STORAGE_ADAPTER ?? null,
    vercel: process.env.VERCEL ?? null,
    databaseUrlConfigured: Boolean(process.env.DATABASE_URL),
  });
}