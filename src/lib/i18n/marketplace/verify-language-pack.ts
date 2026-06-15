import type { ImportedLanguagePack } from "./marketplace-types";

import {
  createLanguagePackSignaturePayload,
  createSHA256Signature,
} from "./language-pack-signature";

export function verifyLanguagePackSignature(
  pack: ImportedLanguagePack
): boolean {
  const signature = pack.manifest.signature;

  if (!signature) {
    return false;
  }

  const payload = createLanguagePackSignaturePayload(pack);
  const expectedHash = createSHA256Signature(payload);

  return signature.hash === expectedHash;
}