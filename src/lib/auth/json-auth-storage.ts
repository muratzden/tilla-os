import fs from "fs";
import path from "path";

import type { AuthStorageState } from "./auth-storage-types";

const storagePath = path.join(process.cwd(), ".data", "auth-storage.json");

export function createDefaultAuthStorageState(): AuthStorageState {
  return {
    users: [],
    workspaces: [],
    memberships: [],
    sessions: [],
    entitlements: [],
  };
}

export function ensureJsonAuthStorageFile() {
  const dir = path.dirname(storagePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(storagePath)) {
    fs.writeFileSync(
      storagePath,
      JSON.stringify(createDefaultAuthStorageState(), null, 2),
    );
  }
}

export function loadJsonAuthStorageState(): AuthStorageState {
  ensureJsonAuthStorageFile();

  const raw = fs.readFileSync(storagePath, "utf8");

  if (!raw.trim()) {
    return createDefaultAuthStorageState();
  }

  return JSON.parse(raw) as AuthStorageState;
}

export function saveJsonAuthStorageState(state: AuthStorageState) {
  ensureJsonAuthStorageFile();

  fs.writeFileSync(storagePath, JSON.stringify(state, null, 2));
}
