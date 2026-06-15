import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "brand", "manifest.json");

  const manifest = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return Response.json(manifest);
}
