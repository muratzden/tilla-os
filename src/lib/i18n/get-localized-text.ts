import type { OutputLanguage } from "./language";

export type LocalizedText = Partial<Record<OutputLanguage, string>>;

export function getLocalizedText(
  text: LocalizedText,
  language: OutputLanguage = "en",
): string {
  if (language === "tr") {
    return text.tr ?? text.en ?? "";
  }

  if (language === "de") {
    return text.de ?? text.en ?? text.tr ?? "";
  }

  return text.en ?? text.tr ?? "";
}
