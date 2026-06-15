import type { ImportedLanguagePack } from "./marketplace-types";

import { verifyLanguagePackSignature } from "./verify-language-pack";

export function assertValidLanguagePackSignature(
  pack: unknown
): asserts pack is ImportedLanguagePack {
  if (!pack || typeof pack !== "object") {
    throw new Error("Invalid language pack signature target");
  }

  const candidate = pack as Partial<ImportedLanguagePack>;

  if (!candidate.manifest || typeof candidate.manifest !== "object") {
    throw new Error("Language pack manifest is required for signature validation");
  }

  const signature = candidate.manifest.signature;

  if (!signature) {
    throw new Error("Language pack signature is missing");
  }

  if (signature.algorithm !== "sha256") {
    throw new Error("Unsupported language pack signature algorithm");
  }

  if (signature.issuer !== "tilla-marketplace") {
    throw new Error("Untrusted language pack signature issuer");
  }

  if (
    typeof signature.hash !== "string" ||
    signature.hash.trim().length === 0
  ) {
    throw new Error("Language pack signature hash is missing");
  }

  if (
    typeof signature.signedAt !== "string" ||
    Number.isNaN(Date.parse(signature.signedAt))
  ) {
    throw new Error("Language pack signature signedAt is invalid");
  }

    if (!verifyLanguagePackSignature(candidate as ImportedLanguagePack)) {
    throw new Error("Language pack signature hash mismatch");
  }
}