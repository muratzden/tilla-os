export const principleSignalGroups = {
  human_craft: [
    "handmade",
    "handcraft",
    "artisan",
    "craft",
    "craftsmanship",
    "maker",
    "made by hand",
    "human made",
    "ustalık",
    "zanaat",
    "el yapımı",
    "insan emeği",
  ],

  material_truth: [
    "real material",
    "natural material",
    "honest material",
    "patina",
    "texture",
    "material character",
    "hakiki",
    "doğal malzeme",
    "malzeme karakteri",
  ],

  longevity: [
    "long lasting",
    "durable",
    "timeless",
    "built to last",
    "heirloom",
    "long term value",
    "gain character through use",
    "develop character",
    "age beautifully",
    "gets better with time",
    "patina",
    "ownership marks",
    "uzun ömür",
    "zamansız",
    "kalıcı değer",
    "zamanla karakter kazanır",
    "kullandıkça güzelleşir",
  ],

  individuality: [
    "unique",
    "personal",
    "individual",
    "custom",
    "one of a kind",
    "becomes yours",
    "marks of ownership",
    "personal character",
    "individual character",
    "controlled variation",
    "human touch",
    "kişisel",
    "benzersiz",
    "özel üretim",
    "sana ait olur",
    "kişisel izler",
    "kontrollü farklılık",
    "insan dokunuşu",
  ],
} as const;

export const forbiddenSignalGroups = {
  fast_fashion: [
    "fast fashion",
    "disposable",
    "trend product",
    "seasonal trend",
    "hızlı moda",
    "kullan at",
  ],

  mass_production: [
    "mass production",
    "factory perfect",
    "industrial perfection",
    "identical products",
    "seri üretim",
    "fabrika kusursuzluğu",
  ],

  trend_chasing: [
    "trend chasing",
    "viral",
    "hype",
    "popular now",
    "trend peşinde",
    "viral olsun",
  ],
} as const;

export function getPrincipleGroupSignals(key: string): readonly string[] {
  return principleSignalGroups[key as keyof typeof principleSignalGroups] ?? [];
}

export function getForbiddenGroupSignals(key: string): readonly string[] {
  return forbiddenSignalGroups[key as keyof typeof forbiddenSignalGroups] ?? [];
}
