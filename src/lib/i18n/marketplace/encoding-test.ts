import { installImportedLanguagePack } from "./language-pack-installer";
import { sampleGermanMarketplacePack } from "./sample-german-pack";

export function runEncodingTest() {
  const workspaceId = `encoding-test-${Date.now()}`;

  const brokenPack = {
    ...sampleGermanMarketplacePack,
    manifest: {
      ...sampleGermanMarketplacePack.manifest,
      name: "German Ã¼ Output Pack",
    },
  };

  let blockedBrokenEncoding = false;

  try {
    installImportedLanguagePack(workspaceId, brokenPack);
  } catch {
    blockedBrokenEncoding = true;
  }

  return {
    passed: blockedBrokenEncoding,
    blockedBrokenEncoding,
  };
}
