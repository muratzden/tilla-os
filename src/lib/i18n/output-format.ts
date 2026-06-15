import type { OutputLanguage } from "./language";

export type OutputMode = "single" | "bilingual";

export type OutputFormatSettings = {
  primaryLanguage: OutputLanguage;
  mode: OutputMode;
  secondaryLanguage?: OutputLanguage;
};

export const DEFAULT_OUTPUT_MODE: OutputMode = "single";

export function resolveOutputMode(mode?: string): OutputMode {
  if (mode === "single" || mode === "bilingual") {
    return mode;
  }

  return DEFAULT_OUTPUT_MODE;
}

export function createOutputFormatSettings(
  primaryLanguage: OutputLanguage,
  mode?: string,
  secondaryLanguage?: OutputLanguage,
): OutputFormatSettings {
  const resolvedMode = resolveOutputMode(mode);

  if (resolvedMode === "single") {
    return {
      primaryLanguage,
      mode: "single",
    };
  }

  return {
    primaryLanguage,
    mode: "bilingual",
    secondaryLanguage:
      secondaryLanguage && secondaryLanguage !== primaryLanguage
        ? secondaryLanguage
        : "en",
  };
}

export function isBilingualOutput(settings: OutputFormatSettings): boolean {
  return settings.mode === "bilingual" && Boolean(settings.secondaryLanguage);
}
