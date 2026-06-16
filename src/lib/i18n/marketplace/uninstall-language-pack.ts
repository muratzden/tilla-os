import {
  getWorkspaceLanguageState,
  setWorkspaceLanguageState,
} from "./language-pack-storage";

export function uninstallLanguagePack(workspaceId: string, language: string) {
  if (language === "en") {
    throw new Error("Default language pack 'en' cannot be uninstalled");
  }

  const workspaceState = getWorkspaceLanguageState(workspaceId);

  workspaceState.installed = workspaceState.installed.filter(
    (installedLanguage) => installedLanguage !== language,
  );

  if (workspaceState.active === language) {
    workspaceState.active = "en";
  }

  setWorkspaceLanguageState(workspaceId, workspaceState);

  return workspaceState;
}
