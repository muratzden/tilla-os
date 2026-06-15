import fs from "node:fs";
import path from "node:path";

import type { BrandMemoryRecord } from "./memory-types";

const memoryFilePath = path.join(process.cwd(), ".data", "brand-memory.json");

let memoryStore: BrandMemoryRecord[] = [];

function loadMemoryFromDisk() {
  if (!fs.existsSync(memoryFilePath)) {
    memoryStore = [];
    return;
  }

  try {
    const raw = fs.readFileSync(memoryFilePath, "utf-8");

    memoryStore = JSON.parse(raw);
  } catch {
    memoryStore = [];
  }
}

function saveMemoryToDisk() {
  const directory = path.dirname(memoryFilePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(
    memoryFilePath,
    JSON.stringify(memoryStore, null, 2),
    "utf-8",
  );
}

loadMemoryFromDisk();

export function addBrandMemoryRecord(record: BrandMemoryRecord) {
  memoryStore.push(record);
  saveMemoryToDisk();
}

export function getBrandMemoryRecords(brandId?: string) {
  if (!brandId) {
    return memoryStore;
  }

  return memoryStore.filter((record) => record.brandId === brandId);
}

export function clearBrandMemoryRecords() {
  memoryStore = [];
  saveMemoryToDisk();
}
