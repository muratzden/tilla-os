import { BrandConsistencyResult } from "./consistency-types";

export function createMemoryInsights(consistency: BrandConsistencyResult) {
  const insights: string[] = [];

  if (consistency.dominantArchetype) {
    insights.push(
      `Brand decisions currently favor ${consistency.dominantArchetype}.`,
    );
  }

  if (consistency.dominantWorld) {
    insights.push(`${consistency.dominantWorld} is the dominant brand world.`);
  }

  if (consistency.trendDirection === "stable") {
    insights.push("Brand behavior appears stable across recent decisions.");
  }

  if (consistency.trendDirection === "shifting") {
    insights.push("Brand behavior may be shifting toward a new direction.");
  }

  if (consistency.trendDirection === "fragmenting") {
    insights.push(
      "Brand behavior appears fragmented and may need strategic correction.",
    );
  }

  return insights;
}
