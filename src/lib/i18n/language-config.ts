import type { OutputLanguage } from "./language";

export type UILanguage = "tr" | "en";
export type ContentLanguage = OutputLanguage;
export type PromptLanguage = "en";

export type LanguageConfig = {
  uiLanguage: UILanguage;
  contentLanguage: ContentLanguage;
  promptLanguage: PromptLanguage;
};

export function createLanguageConfig(
  outputLanguage?: OutputLanguage,
): LanguageConfig {
  return {
    uiLanguage: outputLanguage === "en" ? "en" : "tr",
    contentLanguage: outputLanguage ?? "tr",
    promptLanguage: "en",
  };
}
