import fs from "fs";
import path from "path";

export type DecisionRecord = {
  input: string;
  intent?: string;
  approved: boolean;
  reason: string;
  timestamp: number;
};

const filePath = path.join(process.cwd(), "data", "memory.json");

export function getMemory(): DecisionRecord[] {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveDecision(record: DecisionRecord) {
  const current = getMemory();

  current.push(record);

  fs.writeFileSync(filePath, JSON.stringify(current, null, 2));
}
