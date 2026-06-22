type BrandKnowledgeEntry = {
  positioning: string;
  audience: string;
  context: string[];
  emotionBias: string;
};

const categories: Record<string, BrandKnowledgeEntry> = {
  default: {
    positioning: "clear category-specific positioning",
    audience: "defined target audience",
    context: ["primary use case", "customer motivation", "decision context"],
    emotionBias: "strategic_confidence",
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