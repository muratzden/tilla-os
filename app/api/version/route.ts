import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "brand", "version.json");

  const version = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return Response.json(version);
}
