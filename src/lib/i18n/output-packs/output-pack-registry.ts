import type { OutputLanguage } from "@/src/lib/i18n/language";
import type { OutputPack } from "./output-pack-types";

import { enOutputPack } from "./packs/en";
import { trOutputPack } from "./packs/tr";
import { deOutputPack } from "./packs/de";

export const outputPackRegistry: Record<OutputLanguage, OutputPack> = {
  en: enOutputPack,
  tr: trOutputPack,
  de: deOutputPack,
};

export function getAvailableOutputPacks(): OutputPack[] {
  return Object.values(outputPackRegistry).filter(
    (pack) => pack.meta.status !== "disabled",
  );
}

export function hasOutputPack(language: OutputLanguage): boolean {
  return Boolean(outputPackRegistry[language]);
}
