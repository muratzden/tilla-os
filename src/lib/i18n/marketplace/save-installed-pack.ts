import type { ImportedLanguagePack } from "./marketplace-types";

import {
  loadInstalledLanguagePacks,
  saveInstalledLanguagePacks,
} from "./installed-pack-storage";

export function saveInstalledPack(pack: ImportedLanguagePack) {
  const repository = loadInstalledLanguagePacks();

  const language = pack.manifest.languageCode;
  const version = pack.manifest.version.packVersion;

  repository[language] = {
    latestVersion: version,
    versions: {
      ...(repository[language]?.versions ?? {}),
      [version]: {
        manifest: pack.manifest,
        outputPack: pack.outputPack,
      },
    },
  };

  saveInstalledLanguagePacks(repository);

  return repository[language];
}
