export type MarketplaceLanguagePack = {
  id: string;
  language: string;
  name: string;
  nativeName: string;
  priceUsd: number;
  status: "included" | "available" | "installed" | "active";
};

export const includedLanguagePacks: MarketplaceLanguagePack[] = [
  {
    id: "tr",
    language: "tr",
    name: "Turkish",
    nativeName: "TÃ¼rkÃ§e",
    priceUsd: 0,
    status: "included",
  },
  {
    id: "en",
    language: "en",
    name: "English",
    nativeName: "English",
    priceUsd: 0,
    status: "included",
  },
];

export const marketplaceLanguagePacks: MarketplaceLanguagePack[] = [
  {
    id: "de",
    language: "de",
    name: "German",
    nativeName: "Deutsch",
    priceUsd: 4.99,
    status: "available",
  },
  {
    id: "ru",
    language: "ru",
    name: "Russian",
    nativeName: "Ğ ÑƒÑÑĞºĞ¸Ğ¹",
    priceUsd: 4.99,
    status: "available",
  },
  {
    id: "fr",
    language: "fr",
    name: "French",
    nativeName: "FranÃ§ais",
    priceUsd: 4.99,
    status: "available",
  },
  {
    id: "es",
    language: "es",
    name: "Spanish",
    nativeName: "EspaÃ±ol",
    priceUsd: 4.99,
    status: "available",
  },
  {
    id: "ar",
    language: "ar",
    name: "Arabic",
    nativeName: "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©",
    priceUsd: 6.99,
    status: "available",
  },
];




