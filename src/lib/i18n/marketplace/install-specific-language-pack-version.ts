import type { OutputLanguage } from "../language";

import { getMarketplacePack } from "./get-marketplace-pack";
import { installImportedLanguagePack } from "./language-pack-installer";
import { packageVersionExists } from "./package-registry";

export function installSpecificLanguagePackVersion(
  workspaceId: string,
  packageId: string,
  language: OutputLanguage,
  version: string
) {
  if (!packageVersionExists(packageId, version)) {
    throw new Error(
      `Version '${version}' was not found for package '${packageId}'`
    );
  }

  const pack = getMarketplacePack(packageId, version);

  if (pack.manifest.languageCode !== language) {
    throw new Error(
      `Package '${packageId}' does not match language '${language}'`
    );
  }

  return installImportedLanguagePack(workspaceId, pack);
}