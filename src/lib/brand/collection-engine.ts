type CollectionKey = "executive" | "heritage" | "travel" | "daily" | "atelier";

type CollectionResult = {
  key: CollectionKey;
  label: string;
  mood: string;
  names: string[];
};

const collections: Record<CollectionKey, CollectionResult> = {
  executive: {
    key: "executive",
    label: "Executive Collection",
    mood: "controlled confidence",
    names: ["Valen", "Auren", "Elian", "Soren"],
  },

  heritage: {
    key: "heritage",
    label: "Heritage Collection",
    mood: "timeless craftsmanship",
    names: ["Arden", "Marlow", "Nero", "Elden"],
  },

  travel: {
    key: "travel",
    label: "Travel Collection",
    mood: "quiet movement",
    names: ["Atlas", "Vega", "Orion", "Lior"],
  },

  daily: {
    key: "daily",
    label: "Daily Collection",
    mood: "calm utility",
    names: ["Mira", "Arel", "Korin", "Elen"],
  },

  atelier: {
    key: "atelier",
    label: "Atelier Collection",
    mood: "material honesty",
    names: ["Tilla Atelier Piece"],
  },
};

export function collectionEngine(input: {
  category?: string;
  positioning?: string;
  context?: string[];
}) {
  const category = input.category ?? "accessory";
  const positioning = input.positioning ?? "";
  const context = input.context ?? [];

  if (
    category === "briefcase" ||
    category === "laptop_bag" ||
    positioning.includes("executive") ||
    context.includes("office environment") ||
    context.includes("business travel")
  ) {
    return collections.executive;
  }

  if (
    category === "travel_bag" ||
    category === "passport_holder" ||
    context.includes("travel")
  ) {
    return collections.travel;
  }

  if (
    category === "wallet" ||
    category === "cardholder" ||
    category === "card_holder" ||
    category === "belt"
  ) {
    return collections.heritage;
  }

  if (
    category === "tote" ||
    category === "daily_bag" ||
    context.includes("daily carry")
  ) {
    return collections.daily;
  }

  return collections.atelier;
}
