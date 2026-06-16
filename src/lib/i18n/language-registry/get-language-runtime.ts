import type {
  LanguageRuntime,
  LanguageRuntimeInput,
} from "./language-runtime-types";
import type { OutputLanguage } from "@/src/lib/i18n/language";
import type { SystemLanguage } from "@/src/lib/i18n/system-languages";

import {
  DEFAULT_OUTPUT_LANGUAGE,
  resolveOutputLanguage,
} from "@/src/lib/i18n/language";
import { DEFAULT_SYSTEM_LANGUAGE } from "@/src/lib/i18n/system-languages";
import { getLanguagePack } from "@/src/lib/i18n/get-language-pack";
import { getOutputPack } from "@/src/lib/i18n/output-packs/get-output-pack";
import { getWorkspaceLanguageState } from "@/src/lib/i18n/marketplace/language-pack-storage";

function resolveUiLanguage(language?: SystemLanguage): SystemLanguage {
  return language ?? DEFAULT_SYSTEM_LANGUAGE;
}

function resolveMarketplaceOutputLanguage(
  brandId: string,
): OutputLanguage | undefined {
  try {
    const state = getWorkspaceLanguageState(brandId);

    const active = state?.active;

    return active ? resolveOutputLanguage(active) : undefined;
  } catch {
    return undefined;
  }
}

export function getLanguageRuntime(
  input: LanguageRuntimeInput,
): LanguageRuntime {
  const brandId = input.brandId ?? "tilla-leather";

  const uiLanguage = resolveUiLanguage(input.uiLanguage);

  const requestedOutputLanguage = resolveOutputLanguage(
    input.requestedOutputLanguage ?? DEFAULT_OUTPUT_LANGUAGE,
  );

  const marketplaceOutputLanguage = resolveMarketplaceOutputLanguage(brandId);

  const activeOutputLanguage =
    marketplaceOutputLanguage ??
    requestedOutputLanguage ??
    DEFAULT_OUTPUT_LANGUAGE;

  return {
    ui: getLanguagePack(uiLanguage),
    output: getOutputPack(activeOutputLanguage),
    activeOutputLanguage,
    meta: {
      brandId,
      uiLanguage,
      requestedOutputLanguage,
      marketplaceOutputLanguage,
      source: marketplaceOutputLanguage ? "marketplace" : "requested",
    },
  };
}
