import type {
  ImportedLanguagePack,
  InstalledLanguagePackRecord,
} from "./marketplace-types";

import { assertValidLanguagePack } from "./language-pack-validator";
import { assertValidLanguagePackEncoding } from "./language-pack-encoding-validator";
import { assertValidLanguagePackSignature } from "./language-pack-signature-validator";
import { saveInstalledPack } from "./save-installed-pack";

import {
  recordWorkspaceLanguageInstall,
  recordWorkspaceLanguageVersionActivation,
} from "./language-pack-storage";

export function installImportedLanguagePack(
  workspaceId: string,
  pack: unknown,
) {
  assertValidLanguagePack(pack);
  assertValidLanguagePackEncoding(pack);
  assertValidLanguagePackSignature(pack);

  const languagePack = pack as ImportedLanguagePack;

  const language = languagePack.manifest.languageCode;

  saveInstalledPack(languagePack);

  const installedRecord: InstalledLanguagePackRecord = {
    language,
    source: languagePack.manifest.source,
    version: languagePack.manifest.version.packVersion,
    installedAt: new Date().toISOString(),
  };

  recordWorkspaceLanguageInstall(workspaceId, {
    language,
    packageId: languagePack.manifest.id,
    version: languagePack.manifest.version.packVersion,
    source: languagePack.manifest.source,
    installedAt: installedRecord.installedAt,
  });

  recordWorkspaceLanguageVersionActivation(workspaceId, {
    language,
    packageId: languagePack.manifest.id,
    version: languagePack.manifest.version.packVersion,
    activatedAt: installedRecord.installedAt,
  });

  return installedRecord;
}
