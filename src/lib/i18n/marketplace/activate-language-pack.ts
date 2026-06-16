import type { OutputLanguage } from "../language";

import {
  getWorkspaceLanguageState,
  recordWorkspaceLanguageVersionActivation,
  setWorkspaceLanguageState,
} from "./language-pack-storage";

export function activateLanguagePack(
  workspaceId: string,
  language: OutputLanguage,
) {
  const workspaceState = getWorkspaceLanguageState(workspaceId);

  if (!workspaceState.installed.includes(language)) {
    throw new Error(
      `Language pack '${language}' is not installed for workspace '${workspaceId}'`,
    );
  }

  const installRecord = workspaceState.installs?.[language];

  if (installRecord?.packageId && installRecord.version) {
    recordWorkspaceLanguageVersionActivation(workspaceId, {
      language,
      packageId: installRecord.packageId,
      version: installRecord.version,
      activatedAt: new Date().toISOString(),
    });

    return getWorkspaceLanguageState(workspaceId);
  }

  const nextWorkspaceState = {
    ...workspaceState,
    active: language,
  };

  setWorkspaceLanguageState(workspaceId, nextWorkspaceState);

  return nextWorkspaceState;
}
