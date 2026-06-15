export type ConsistencyLevel = "high" | "medium" | "low";

export type TrendDirection = "stable" | "shifting" | "fragmenting";

export type BrandConsistencyResult = {
  consistencyScore: number;

  archetypeConsistency: number;
  worldConsistency: number;

  dominantArchetype: string | null;
  dominantWorld: string | null;

  consistencyLevel: ConsistencyLevel;
  trendDirection: TrendDirection;
};
