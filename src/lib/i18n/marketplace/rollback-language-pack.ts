import type { OutputLanguage } from "../language";

import {
  getWorkspaceLanguageState,
  getWorkspaceLanguageVersionHistory,
  setWorkspaceLanguageState,
} from "./language-pack-storage";

export function rollbackLanguagePack(
  workspaceId: string,
  language: OutputLanguage,
) {
  const workspaceState = getWorkspaceLanguageState(workspaceId);

  if (!workspaceState.installed.includes(language)) {
    throw new Error(
      `Language pack '${language}' is not installed for workspace '${workspaceId}'`,
    );
  }

  const history = getWorkspaceLanguageVersionHistory(workspaceId).filter(
    (entry) => entry.language === language,
  );

  if (history.length < 2) {
    throw new Error(
      `Language pack '${language}' does not have enough version history to rollback`,
    );
  }

  const previous = history[history.length - 2];

  const currentInstall = workspaceState.installs?.[language];

  setWorkspaceLanguageState(workspaceId, {
    ...workspaceState,
    active: language,
    installs: {
      ...(workspaceState.installs ?? {}),
      [language]: {
        language,
        packageId: previous.packageId,
        version: previous.version,
        source: currentInstall?.source ?? "marketplace",
        installedAt: currentInstall?.installedAt ?? new Date().toISOString(),
      },
    },
    versionHistory: [
      ...(workspaceState.versionHistory ?? []),
      {
        language,
        packageId: previous.packageId,
        version: previous.version,
        activatedAt: new Date().toISOString(),
      },
    ],
  });

  return getWorkspaceLanguageState(workspaceId);
}
