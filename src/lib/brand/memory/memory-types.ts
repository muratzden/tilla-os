export type BrandMemoryRecord = {
  id: string;
  timestamp: string;

  brandId: string;

  productType?: string;
  material?: string;
  color?: string;
  size?: string;
  channel?: string;

  archetype?: string;
  selectedWorld?: string;

  confidence?: number;
  confidenceLevel?: string;
  decisionMargin?: number;
};

export type DecisionMemorySummary = {
  totalDecisions: number;
  averageConfidence: number | null;
};

export type DistributionItem = {
  key: string;
  count: number;
  percentage: number;
};

export type BrandMemorySummary = {
  decisionMemory: DecisionMemorySummary;
  archetypeMemory: DistributionItem[];
  worldMemory: DistributionItem[];
  recentDecisions: BrandMemoryRecord[];
};
