import { getMarketplacePack } from "./get-marketplace-pack";
import { installImportedLanguagePack } from "./language-pack-installer";
import { getLatestPackageVersion } from "./package-registry";

export function installMarketplacePack(
  workspaceId: string,
  packId: string,
  version?: string,
) {
  const resolvedVersion = version ?? getLatestPackageVersion(packId);

  const pack = getMarketplacePack(packId, resolvedVersion);

  return installImportedLanguagePack(workspaceId, pack);
}
