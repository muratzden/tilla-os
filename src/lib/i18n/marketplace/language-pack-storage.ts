import fs from "fs";
import path from "path";

import type {
  LanguagePackStorage,
  WorkspaceLanguageState,
  WorkspaceLanguageInstallRecord,
  WorkspaceLanguageVersionHistoryEntry,
} from "./marketplace-types";

const STORAGE_PATH = path.join(
  process.cwd(),
  ".data",
  "language-pack-state.json"
);

function ensureStorage() {
  const dir = path.dirname(STORAGE_PATH);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(STORAGE_PATH)) {
    fs.writeFileSync(
      STORAGE_PATH,
      JSON.stringify({}, null, 2),
      "utf8"
    );
  }
}

function createDefaultWorkspaceLanguageState(): WorkspaceLanguageState {
  return {
    installed: ["en"],
    active: "en",
    installs: {
      en: {
        language: "en",
        source: "system",
        installedAt: new Date().toISOString(),
      },
    },
    versionHistory: [],
  };
}

export function loadLanguagePackState(): LanguagePackStorage {
  ensureStorage();

  try {
    const raw = fs.readFileSync(STORAGE_PATH, "utf8");

    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveLanguagePackState(
  state: LanguagePackStorage
) {
  ensureStorage();

  fs.writeFileSync(
    STORAGE_PATH,
    JSON.stringify(state, null, 2),
    "utf8"
  );
}

export function getWorkspaceLanguageState(
  workspaceId: string
): WorkspaceLanguageState {
  const state = loadLanguagePackState();

  return (
    state[workspaceId]?.workspace ??
    createDefaultWorkspaceLanguageState()
  );
}

export function setWorkspaceLanguageState(
  workspaceId: string,
  workspaceState: WorkspaceLanguageState
) {
  const state = loadLanguagePackState();

  state[workspaceId] = {
    workspace: workspaceState,
  };

  saveLanguagePackState(state);
}

export function recordWorkspaceLanguageInstall(
  workspaceId: string,
  installRecord: WorkspaceLanguageInstallRecord
) {
  const workspaceState = getWorkspaceLanguageState(workspaceId);

  const installs = {
    ...(workspaceState.installs ?? {}),
    [installRecord.language]: installRecord,
  };

  const installed = workspaceState.installed.includes(
    installRecord.language
  )
    ? workspaceState.installed
    : [...workspaceState.installed, installRecord.language];

  setWorkspaceLanguageState(workspaceId, {
    ...workspaceState,
    installed,
    installs,
  });
}

export function recordWorkspaceLanguageVersionActivation(
  workspaceId: string,
  historyEntry: WorkspaceLanguageVersionHistoryEntry
) {
  const workspaceState = getWorkspaceLanguageState(workspaceId);

  setWorkspaceLanguageState(workspaceId, {
    ...workspaceState,
    active: historyEntry.language,
    versionHistory: [
      ...(workspaceState.versionHistory ?? []),
      historyEntry,
    ],
  });
}

export function getWorkspaceLanguageVersionHistory(
  workspaceId: string
): WorkspaceLanguageVersionHistoryEntry[] {
  return [
    ...(getWorkspaceLanguageState(workspaceId).versionHistory ?? []),
  ];
}