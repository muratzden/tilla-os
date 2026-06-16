import type {
  ImportedLanguagePack,
  LanguagePackSignature,
} from "./marketplace-types";

import {
  createLanguagePackSignaturePayload,
  createSHA256Signature,
} from "./language-pack-signature";

export function signLanguagePack(
  pack: ImportedLanguagePack,
): ImportedLanguagePack {
  const payload = createLanguagePackSignaturePayload(pack);

  const signature: LanguagePackSignature = {
    algorithm: "sha256",
    hash: createSHA256Signature(payload),
    signedAt: new Date().toISOString(),
    issuer: "tilla-marketplace",
  };

  return {
    ...pack,
    manifest: {
      ...pack.manifest,
      signature,
    },
  };
}
