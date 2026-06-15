import type { BrandType } from "../setup/brand-type";

export type ForbiddenDirectionKey =
  | "fast_fashion"
  | "mass_production"
  | "trend_chasing"
  | "clickbait"
  | "shallow_content"
  | "feature_bloat"
  | "growth_at_any_cost"
  | "generic_positioning"
  | "low_trust_behavior"
  | "extractive_impact";

export type ForbiddenDirectionDefinition = {
  key: ForbiddenDirectionKey;
  title: string;
  description: string;
  supportedBrandTypes: BrandType[];
  signals: string[];
};

export const forbiddenDirectionRegistry: ForbiddenDirectionDefinition[] = [
  {
    key: "fast_fashion",
    title: "Fast Fashion",
    description:
      "The brand must avoid short-lived, disposable, trend-dependent product behavior.",
    supportedBrandTypes: ["product"],
    signals: [
      "fast fashion",
      "seasonal trend",
      "cheap trend",
      "disposable",
      "hızlı moda",
      "sezon trendi",
      "kullan at",
    ],
  },
  {
    key: "mass_production",
    title: "Mass Production",
    description:
      "The brand must avoid industrial sameness, anonymous output, and scale-first production logic.",
    supportedBrandTypes: ["product"],
    signals: [
      "mass production",
      "factory perfect",
      "identical",
      "industrial perfection",
      "seri üretim",
      "fabrika kusursuzluğu",
      "birebir aynı",
    ],
  },
  {
    key: "trend_chasing",
    title: "Trend Chasing",
    description:
      "The brand must avoid following temporary popularity at the cost of its own principles.",
    supportedBrandTypes: [
      "product",
      "service",
      "personal",
      "media",
      "software",
      "hospitality",
      "nonprofit",
    ],
    signals: [
      "trend",
      "viral",
      "hype",
      "popular now",
      "moda olan",
      "trend peşinde",
      "viral olsun",
    ],
  },
  {
    key: "clickbait",
    title: "Clickbait",
    description:
      "The brand must avoid manipulating attention with misleading, exaggerated, or empty hooks.",
    supportedBrandTypes: ["media", "personal", "nonprofit"],
    signals: [
      "clickbait",
      "shock title",
      "misleading headline",
      "rage bait",
      "tık tuzağı",
      "abartılı başlık",
      "yanıltıcı başlık",
    ],
  },
  {
    key: "shallow_content",
    title: "Shallow Content",
    description:
      "The brand must avoid publishing empty, repetitive, or low-substance content just to stay visible.",
    supportedBrandTypes: ["media", "personal", "nonprofit"],
    signals: [
      "empty content",
      "post for posting",
      "low effort",
      "surface level",
      "boş içerik",
      "göstermelik içerik",
      "yüzeysel",
    ],
  },
  {
    key: "feature_bloat",
    title: "Feature Bloat",
    description:
      "The brand must avoid adding complexity that weakens clarity, usability, or purpose.",
    supportedBrandTypes: ["software", "service"],
    signals: [
      "too many features",
      "complex",
      "bloated",
      "unnecessary feature",
      "fazla özellik",
      "karmaşık",
      "gereksiz özellik",
    ],
  },
  {
    key: "growth_at_any_cost",
    title: "Growth At Any Cost",
    description:
      "The brand must avoid sacrificing trust, quality, or mission for aggressive growth.",
    supportedBrandTypes: ["software", "service", "media", "nonprofit"],
    signals: [
      "growth at any cost",
      "scale first",
      "aggressive growth",
      "engagement above all",
      "ne pahasına olursa olsun büyüme",
      "önce büyüme",
      "her şey etkileşim",
    ],
  },
  {
    key: "generic_positioning",
    title: "Generic Positioning",
    description:
      "The brand must avoid becoming vague, interchangeable, or indistinguishable from competitors.",
    supportedBrandTypes: [
      "product",
      "service",
      "personal",
      "media",
      "software",
      "hospitality",
      "nonprofit",
    ],
    signals: [
      "generic",
      "like everyone else",
      "standard brand",
      "ordinary",
      "sıradan",
      "herkes gibi",
      "genel geçer",
    ],
  },
  {
    key: "low_trust_behavior",
    title: "Low Trust Behavior",
    description:
      "The brand must avoid dishonest, manipulative, inconsistent, or irresponsible behavior.",
    supportedBrandTypes: [
      "product",
      "service",
      "personal",
      "media",
      "software",
      "hospitality",
      "nonprofit",
    ],
    signals: [
      "misleading",
      "dishonest",
      "manipulative",
      "hidden terms",
      "yanıltıcı",
      "dürüst olmayan",
      "manipülatif",
      "gizli şart",
    ],
  },
  {
    key: "extractive_impact",
    title: "Extractive Impact",
    description:
      "The brand must avoid taking value from people, communities, or culture without responsibility.",
    supportedBrandTypes: ["nonprofit", "media", "hospitality", "personal"],
    signals: [
      "exploit",
      "extract",
      "take advantage",
      "use people",
      "sömürü",
      "istismar",
      "insanları kullanmak",
    ],
  },
];

export function getForbiddenDirectionsForBrandType(
  brandType: BrandType,
): ForbiddenDirectionDefinition[] {
  return forbiddenDirectionRegistry.filter((direction) =>
    direction.supportedBrandTypes.includes(brandType),
  );
}
