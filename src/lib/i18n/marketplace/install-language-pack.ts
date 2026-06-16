import type { OutputLanguage } from "../language";
import { getLanguagePackEntitlements } from "./language-pack-entitlements";
import {
  getWorkspaceLanguageState,
  setWorkspaceLanguageState,
} from "./language-pack-storage";

export function installLanguagePack(
  workspaceId: string,
  language: OutputLanguage,
) {
  const entitlements = getLanguagePackEntitlements(workspaceId);

  if (language !== "en" && !entitlements.purchased.includes(language)) {
    throw new Error(
      `Workspace '${workspaceId}' does not have entitlement for language pack '${language}'`,
    );
  }

  const workspaceState = getWorkspaceLanguageState(workspaceId);

  if (!workspaceState.installed.includes(language)) {
    workspaceState.installed.push(language);
  }

  setWorkspaceLanguageState(workspaceId, workspaceState);

  return workspaceState;
}
