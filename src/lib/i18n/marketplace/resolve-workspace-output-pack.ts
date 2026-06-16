import { getOutputPack } from "../output-packs";
import { getInstalledPack } from "./get-installed-pack";
import { getWorkspaceLanguageState } from "./language-pack-storage";

export function resolveWorkspaceOutputPack(workspaceId: string) {
  const workspaceState = getWorkspaceLanguageState(workspaceId);

  const activeLanguage = workspaceState.active;

  const installedPack = getInstalledPack(activeLanguage);

  if (installedPack) {
    return installedPack.outputPack;
  }

  return getOutputPack(activeLanguage as any);
}
