import {
  DEFAULT_OUTPUT_LANGUAGE,
  type OutputLanguage,
} from "@/src/lib/i18n/language";

import type { OutputPack } from "./output-pack-types";
import { outputPackRegistry } from "./output-pack-registry";

export function getOutputPack(language?: OutputLanguage): OutputPack {
  if (!language) {
    return outputPackRegistry[DEFAULT_OUTPUT_LANGUAGE];
  }

  return (
    outputPackRegistry[language] ?? outputPackRegistry[DEFAULT_OUTPUT_LANGUAGE]
  );
}
