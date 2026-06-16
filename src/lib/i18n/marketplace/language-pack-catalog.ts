import type { LanguagePackManifest } from "./language-pack-manifest";

export const languagePackCatalog: LanguagePackManifest[] = [
  {
    id: "en",
    name: "English",
    nativeName: "English",
    version: "1.0.0",
    category: "system",
    access: "included",
    price: 0,
    installed: true,
    active: true,
  },

  {
    id: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    version: "1.0.0",
    category: "premium",
    access: "paid",
    price: 19,
    installed: false,
    active: false,
  },

  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    version: "1.0.0",
    category: "premium",
    access: "paid",
    price: 19,
    installed: false,
    active: false,
  },
];

export function getLanguagePackManifest(
  id: LanguagePackManifest["id"],
): LanguagePackManifest | undefined {
  return languagePackCatalog.find((pack) => pack.id === id);
}
