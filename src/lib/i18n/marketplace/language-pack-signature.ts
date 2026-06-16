import crypto from "crypto";

import type { ImportedLanguagePack } from "./marketplace-types";

function sortObjectKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortObjectKeys);
  }

  if (value && typeof value === "object" && value.constructor === Object) {
    const sorted: Record<string, unknown> = {};

    for (const key of Object.keys(value).sort()) {
      sorted[key] = sortObjectKeys((value as Record<string, unknown>)[key]);
    }

    return sorted;
  }

  return value;
}

export function createLanguagePackSignaturePayload(
  pack: ImportedLanguagePack,
): string {
  const unsignedPack: ImportedLanguagePack = {
    ...pack,
    manifest: {
      ...pack.manifest,
      signature: undefined,
    },
  };

  return JSON.stringify(sortObjectKeys(unsignedPack));
}

export function createSHA256Signature(payload: string): string {
  return crypto.createHash("sha256").update(payload, "utf8").digest("hex");
}
