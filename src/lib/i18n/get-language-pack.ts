import {
  DEFAULT_SYSTEM_LANGUAGE,
  type SystemLanguage,
} from "./system-languages";
import type { LanguagePack } from "./language-pack-types";
import { systemLanguagePacks } from "./packs";

export function getLanguagePack(language?: SystemLanguage): LanguagePack {
  const fallbackPack = systemLanguagePacks[DEFAULT_SYSTEM_LANGUAGE];

  if (!fallbackPack) {
    throw new Error(
      `Default system language pack not found: ${DEFAULT_SYSTEM_LANGUAGE}`,
    );
  }

  if (!language) return fallbackPack;

  return systemLanguagePacks[language] ?? fallbackPack;
}
