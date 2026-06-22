import type { ScoreDimension, StudioId } from "../types";
import { evaluateAudience } from "./evaluate-audience";
import { evaluateAuthority } from "./evaluate-authority";
import { evaluateChannels } from "./evaluate-channels";
import { evaluateGrowth } from "./evaluate-growth";
import { evaluatePositioning } from "./evaluate-positioning";
import { evaluateTrust } from "./evaluate-trust";
import type {
  BrandIntelligenceInput,
  BrandIntelligenceReport,
  StrategicEvaluation,
} from "./types";

const STUDIO_BY_DIMENSION: Record<ScoreDimension, StudioId> = {
  clarity: "foundation",
  audienceFit: "foundation",
  differentiation: "positioning",
  trust: "authority",
  authority: "authority",
  consistency: "campaign",
  growthReadiness: "growth",
};

function average(evaluations: StrategicEvaluation[]): number {
  return Math.round(
    evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0) /
      evaluations.length,
  );
}

export function evaluateBrandIntelligence(
  input: BrandIntelligenceInput,
): BrandIntelligenceReport {
  const audience = evaluateAudience(input);
  const positioning = evaluatePositioning(input);
  const trust = evaluateTrust(input);
  const authority = evaluateAuthority(input);
  const channels = evaluateChannels(input);
  const growth = evaluateGrowth(input);

  const dimensionMap: BrandIntelligenceReport["dimensionMap"] = {
    clarity: [audience, positioning],
    audienceFit: [audience],
    differentiation: [positioning],
    trust: [trust, positioning],
    authority: [authority],
    consistency: [audience, positioning, channels],
    growthReadiness: [growth, channels],
  };

  const rankedDimensions = (Object.keys(dimensionMap) as ScoreDimension[])
    .map((dimension) => ({
      dimension,
      score: average(dimensionMap[dimension]),
    }))
    .sort((left, right) => left.score - right.score);
  const weakest = rankedDimensions[0];

  return {
    audience,
    positioning,
    trust,
    authority,
    channels,
    growth,
    dimensionMap,
    recommendedFocus: {
      dimension: weakest.dimension,
      studio: STUDIO_BY_DIMENSION[weakest.dimension],
      reason: `${weakest.dimension} has the weakest strategic signal score.`,
    },
  };
}
