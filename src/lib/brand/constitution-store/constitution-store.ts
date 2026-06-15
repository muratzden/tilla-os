import fs from "fs";
import path from "path";

import type { BrandConstitution } from "../constitution/constitution-types";

const STORE_PATH = path.join(
  process.cwd(),
  ".data",
  "generated-constitutions.json",
);

function ensureStore() {
  if (!fs.existsSync(".data")) {
    fs.mkdirSync(".data");
  }

  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify({}, null, 2), "utf8");
  }
}

export function loadConstitutionStore(): Record<string, BrandConstitution> {
  ensureStore();

  return JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
}

export function saveConstitution(constitution: BrandConstitution): void {
  const store = loadConstitutionStore();

  store[constitution.brandId] = constitution;

  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export function loadConstitution(brandId: string): BrandConstitution | null {
  const store = loadConstitutionStore();

  return store[brandId] ?? null;
}
