import type { OutputLanguage } from "../language";

export type LanguagePackEntitlements = Record<string, OutputLanguage[]>;

const entitlements: LanguagePackEntitlements = {};

export function getLanguagePackEntitlements(workspaceId: string) {
  return {
    purchased: entitlements[workspaceId] ?? [],
  };
}

export function purchaseLanguagePack(
  workspaceId: string,
  language: OutputLanguage,
) {
  const current = entitlements[workspaceId] ?? [];

  if (!current.includes(language)) {
    current.push(language);
  }

  entitlements[workspaceId] = current;

  return {
    workspaceId,
    purchased: current,
  };
}
