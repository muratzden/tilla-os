import type { OutputLanguage } from "@/src/lib/i18n/language";

export type LanguagePackCategory = "system" | "premium" | "enterprise";

export type LanguagePackAccess = "included" | "paid";

export interface LanguagePackManifest {
  id: OutputLanguage;

  name: string;
  nativeName: string;

  version: string;

  category: LanguagePackCategory;
  access: LanguagePackAccess;

  price: number;

  installed: boolean;
  active: boolean;
}
