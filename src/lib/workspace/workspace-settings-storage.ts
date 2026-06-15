import fs from "fs";
import path from "path";
import type { WorkspaceSettings } from "./workspace-settings-types";

const storagePath = path.join(
  process.cwd(),
  ".data",
  "workspace-settings-storage.json"
);

type WorkspaceSettingsStorage = {
  workspaces: WorkspaceSettings[];
};

function ensureStorageFile() {
  const dir = path.dirname(storagePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(storagePath)) {
    fs.writeFileSync(
      storagePath,
      JSON.stringify({ workspaces: [] }, null, 2),
      "utf-8"
    );
  }
}

export function loadWorkspaceSettingsStorage(): WorkspaceSettingsStorage {
  ensureStorageFile();

  const raw = fs.readFileSync(storagePath, "utf-8");

  return JSON.parse(raw) as WorkspaceSettingsStorage;
}

export function saveWorkspaceSettingsStorage(
  storage: WorkspaceSettingsStorage
) {
  ensureStorageFile();

  fs.writeFileSync(storagePath, JSON.stringify(storage, null, 2), "utf-8");
}

export function getWorkspaceSettings(
  workspaceId: string
): WorkspaceSettings | null {
  const storage = loadWorkspaceSettingsStorage();

  return (
    storage.workspaces.find(
      (workspace) => workspace.workspaceId === workspaceId
    ) ?? null
  );
}

export function upsertWorkspaceSettings(
  settings: WorkspaceSettings
): WorkspaceSettings {
  const storage = loadWorkspaceSettingsStorage();

  const existingIndex = storage.workspaces.findIndex(
    (workspace) => workspace.workspaceId === settings.workspaceId
  );

  if (existingIndex >= 0) {
    storage.workspaces[existingIndex] = settings;
  } else {
    storage.workspaces.push(settings);
  }

  saveWorkspaceSettingsStorage(storage);

  return settings;
}
