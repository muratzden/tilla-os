export type MarketplaceCatalogItem = {
  id: string;
  languageCode: string;
  name: string;
  nativeName: string;
  description: string;
  version: string;
  source: "marketplace";
  price: number;
  currency: "USD" | "EUR" | "TRY";
  installed?: boolean;
  purchased?: boolean;
};

export const marketplaceCatalog: MarketplaceCatalogItem[] = [
  {
    id: "de-marketplace",
    languageCode: "de",
    name: "German Language Pack",
    nativeName: "Deutsch",
    description: "German output language pack for TILLA-OS.",
    version: "1.0.0",
    source: "marketplace",
    price: 19,
    currency: "USD",
  },
];