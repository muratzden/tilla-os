type BrandKnowledgeEntry = {
  positioning: string;
  audience: string;
  context: string[];
  emotionBias: string;
};

const categories: Record<string, BrandKnowledgeEntry> = {
  briefcase: {
    positioning: "executive artisan luxury",
    audience: "professional, premium taste, minimal lifestyle",
    context: ["office environment", "business travel", "daily carry prestige"],
    emotionBias: "controlled_confidence",
  },

  default: {
    positioning: "timeless artisan leather goods",
    audience: "premium taste, minimal lifestyle",
    context: ["daily use", "quiet luxury", "craftsmanship"],
    emotionBias: "quiet_confidence",
  },
};

export const brandKnowledge = {
  categories,

  getContext(category?: string): BrandKnowledgeEntry {
    if (!category) {
      return categories.default;
    }

    return categories[category] ?? categories.default;
  },
};
