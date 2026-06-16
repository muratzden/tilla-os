import type { SystemLanguage } from "@/src/lib/i18n/system-languages";
import type { OutputLanguage } from "@/src/lib/i18n/language";
import type { LanguagePack } from "@/src/lib/i18n/language-pack-types";
import type { OutputPack } from "@/src/lib/i18n/output-packs/output-pack-types";

export type LanguageRuntimeInput = {
  brandId?: string;
  uiLanguage?: SystemLanguage;
  requestedOutputLanguage?: OutputLanguage;
};

export type LanguageRuntime = {
  ui: LanguagePack;
  output: OutputPack;
  meta: {
    brandId: string;
    uiLanguage: SystemLanguage;
    requestedOutputLanguage: OutputLanguage;
    marketplaceOutputLanguage?: OutputLanguage;
    source: "marketplace" | "requested" | "fallback";
  };
  activeOutputLanguage: OutputLanguage;
};
