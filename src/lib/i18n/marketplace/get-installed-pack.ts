import { loadInstalledLanguagePacks } from "./installed-pack-storage";

export function getInstalledPack(language: string) {
  const repository = loadInstalledLanguagePacks();

  const registryRecord = repository[language];

  if (!registryRecord) {
    return undefined;
  }

  return registryRecord.versions[registryRecord.latestVersion];
}
