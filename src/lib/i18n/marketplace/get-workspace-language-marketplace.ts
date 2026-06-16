import { getWorkspaceLanguageState } from "./language-pack-storage";

export function getWorkspaceLanguageMarketplace(workspaceId: string) {
  return getWorkspaceLanguageState(workspaceId);
}
