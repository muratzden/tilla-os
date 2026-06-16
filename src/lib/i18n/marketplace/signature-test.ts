import { sampleGermanMarketplacePack } from "./sample-german-pack";
import { assertValidLanguagePackSignature } from "./language-pack-signature-validator";

export function runSignatureTest() {
  assertValidLanguagePackSignature(sampleGermanMarketplacePack);

  const tamperedPack = {
    ...sampleGermanMarketplacePack,
    outputPack: {
      ...sampleGermanMarketplacePack.outputPack,
      meta: {
        ...sampleGermanMarketplacePack.outputPack.meta,
        name: "Tampered German Output Pack",
      },
    },
  };

  let blockedTamperedPack = false;

  try {
    assertValidLanguagePackSignature(tamperedPack);
  } catch {
    blockedTamperedPack = true;
  }

  return {
    passed: blockedTamperedPack,
    blockedTamperedPack,
  };
}
