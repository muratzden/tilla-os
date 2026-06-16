import { getMarketplacePack } from "./get-marketplace-pack";
import { installImportedLanguagePack } from "./language-pack-installer";
import { marketplaceCatalog } from "./marketplace-catalog";
import { packageRegistry } from "./package-registry";

export function updateLanguagePack(workspaceId: string, language: string) {
  const catalogEntry = marketplaceCatalog.find(
    (item) => item.languageCode === language,
  );

  if (!catalogEntry) {
    throw new Error(`Marketplace language '${language}' was not found`);
  }

  const registryEntry = packageRegistry[catalogEntry.id];

  if (!registryEntry) {
    throw new Error(
      `Package registry entry '${catalogEntry.id}' was not found`,
    );
  }

  const latestVersion = registryEntry.latestVersion;

  const pack = getMarketplacePack(catalogEntry.id, latestVersion);

  return installImportedLanguagePack(workspaceId, pack);
}
