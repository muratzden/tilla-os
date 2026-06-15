import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "brand", "profile.json");

export function getBrandProfile() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
