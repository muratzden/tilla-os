import type { OutputLanguage } from "@/src/lib/i18n/language";

export interface LanguagePackState {
  installed: OutputLanguage[];

  active: OutputLanguage;
}
