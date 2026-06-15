import { getInstalledPack } from "./get-installed-pack";
import { marketplaceCatalog } from "./marketplace-catalog";
import { packageRegistry } from "./package-registry";

export function checkLanguagePackUpdate(
  language: string
) {
  const installedPack = getInstalledPack(language);

  if (!installedPack) {
    return {
      installed: false,
      updateAvailable: false,
    };
  }

  const catalogEntry = marketplaceCatalog.find(
    (item) => item.languageCode === language
  );

  if (!catalogEntry) {
    return {
      installed: true,
      updateAvailable: false,
      installedVersion:
        installedPack.manifest.version.packVersion,
    };
  }

  const installedVersion =
    installedPack.manifest.version.packVersion;

    const registryEntry =
    packageRegistry[catalogEntry.id];

  const latestVersion =
    registryEntry?.latestVersion ?? catalogEntry.version;

  return {
    installed: true,
    installedVersion,
    latestVersion,
    updateAvailable:
      installedVersion !== latestVersion,
  };
}