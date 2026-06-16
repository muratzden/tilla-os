import { activateLanguagePack } from "./activate-language-pack";
import { installImportedLanguagePack } from "./language-pack-installer";
import { resolveWorkspaceOutputPack } from "./resolve-workspace-output-pack";
import { sampleGermanMarketplacePack } from "./sample-german-pack";

export function runImportTest() {
  const workspaceId = "marketplace-test";

  installImportedLanguagePack(workspaceId, sampleGermanMarketplacePack);

  activateLanguagePack(workspaceId, "de" as any);

  const pack = resolveWorkspaceOutputPack(workspaceId);

  return {
    language: pack.meta.id,
    name: pack.meta.name,
    source: pack.meta.source,
    version: pack.meta.version,
  };
}
