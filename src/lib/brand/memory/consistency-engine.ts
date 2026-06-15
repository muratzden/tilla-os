import { BrandMemoryRecord } from "./memory-types";
import {
  BrandConsistencyResult,
  ConsistencyLevel,
  TrendDirection,
} from "./consistency-types";
import {
  getArchetypeDistribution,
  getDominantValue,
  getWorldDistribution,
} from "./consistency-memory";

function getTopPercentage(distribution: Record<string, number>, total: number) {
  if (total === 0) return 0;

  const values = Object.values(distribution);

  if (values.length === 0) return 0;

  const topCount = Math.max(...values);

  return Math.round((topCount / total) * 100);
}

function getConsistencyLevel(score: number): ConsistencyLevel {
  if (score >= 75) return "high";
  if (score >= 50) return "medium";

  return "low";
}

function getTrendDirection(
  archetypeConsistency: number,
  worldConsistency: number,
): TrendDirection {
  const average = (archetypeConsistency + worldConsistency) / 2;

  if (average >= 70) return "stable";
  if (average >= 45) return "shifting";

  return "fragmenting";
}

export function calculateBrandConsistency(
  decisions: BrandMemoryRecord[],
): BrandConsistencyResult {
  const total = decisions.length;

  const archetypeDistribution = getArchetypeDistribution(decisions);

  const worldDistribution = getWorldDistribution(decisions);

  const archetypeConsistency = getTopPercentage(archetypeDistribution, total);

  const worldConsistency = getTopPercentage(worldDistribution, total);

  const consistencyScore = Math.round(
    (archetypeConsistency + worldConsistency) / 2,
  );

  return {
    consistencyScore,

    archetypeConsistency,
    worldConsistency,

    dominantArchetype: getDominantValue(archetypeDistribution),

    dominantWorld: getDominantValue(worldDistribution),

    consistencyLevel: getConsistencyLevel(consistencyScore),

    trendDirection: getTrendDirection(archetypeConsistency, worldConsistency),
  };
}
