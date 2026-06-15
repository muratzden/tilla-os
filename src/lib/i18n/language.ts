import type { SystemLanguage } from "./system-languages";

export type OutputLanguage = "tr" | "en" | "de";

export type LanguagePackSource = "system" | "imported" | "marketplace";

export const DEFAULT_OUTPUT_LANGUAGE: OutputLanguage = "en";

export type { SystemLanguage };

export function resolveOutputLanguage(language?: string): OutputLanguage {
  if (language === "tr" || language === "en" || language === "de") {
    return language;
  }

  return DEFAULT_OUTPUT_LANGUAGE;
}
