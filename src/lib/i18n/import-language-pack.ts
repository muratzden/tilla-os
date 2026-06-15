import type { LanguagePack } from "./language-pack-types";
import { validateLanguagePack } from "./language-pack-validator";

export function importLanguagePack(rawJson: string): {
  success: boolean;
  pack?: LanguagePack;
  error?: string;
  missing?: string[];
} {
  try {
    const parsed = JSON.parse(rawJson);
    const result = validateLanguagePack(parsed);

    if (!result.valid || !result.pack) {
      return {
        success: false,
        error: "INVALID_LANGUAGE_PACK",
        missing: result.missing,
      };
    }

    return {
      success: true,
      pack: {
        ...result.pack,
        meta: {
          ...result.pack.meta,
          source: "imported",
        },
      },
    };
  } catch {
    return {
      success: false,
      error: "INVALID_JSON",
    };
  }
}
