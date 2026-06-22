import { evaluateBrandIntelligence } from "./intelligence/index";
import type { StrategicEvaluation } from "./intelligence/types";
import type {
  BrandOperatingState,
  BrandScore,
  ScoreDimension,
  ScoreDimensionResult,
  ScoreSnapshot,
} from "./types";

const DIMENSIONS: ScoreDimension[] = [
  "clarity",
  "audienceFit",
  "differentiation",
  "trust",
  "authority",
  "consistency",
  "growthReadiness",
];

export function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function mergeUnique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.trim().length > 0)));
}

function dimensionFromEvaluations(
  evaluations: StrategicEvaluation[],
): ScoreDimensionResult {
  const averageScore =
    evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0) /
    evaluations.length;
  const riskPenalty = evaluations.reduce(
    (sum, evaluation) =>
      sum + evaluation.risks.length * 3 + evaluation.weaknesses.length * 2,
    0,
  );

  return {
    score: clampScore(averageScore - riskPenalty),
    reasons: mergeUnique(
      evaluations.flatMap((evaluation) => evaluation.strengths),
    ),
    missingInputs: mergeUnique(
      evaluations.flatMap((evaluation) => evaluation.missingEvidence),
    ),
    evidence: mergeUnique(
      evaluations.flatMap((evaluation) => evaluation.strengths),
    ),
    penalties: mergeUnique([
      ...evaluations.flatMap((evaluation) => evaluation.weaknesses),
      ...evaluations.flatMap((evaluation) => evaluation.risks),
    ]),
  };
}

function fallbackDimension(
  score: number,
  reasons: string[],
  missingInputs: string[],
  penalties: string[] = [],
): ScoreDimensionResult {
  return {
    score: clampScore(score - penalties.length * 3),
    reasons,
    missingInputs,
    evidence: reasons,
    penalties,
  };
}

function calculateFallbackBrandScore(
  state: Omit<
    BrandOperatingState,
    "score" | "missionControl" | "lifecycleStage"
  >,
): BrandScore {
  return {
    clarity: fallbackDimension(
      state.brand.idea.trim().length > 12 ? 30 : 5,
      state.brand.idea.trim().length > 12 ? ["Brand idea is present."] : [],
      ["positioning category", "brand promise", "core offer"],
    ),
    audienceFit: fallbackDimension(
      state.audience.primary ? 35 : 5,
      state.audience.primary ? ["Primary audience is present."] : [],
      state.audience.primary ? [] : ["primary audience"],
    ),
    differentiation: fallbackDimension(
      state.positioning.differentiators.length > 0 ? 35 : 5,
      state.positioning.differentiators.length > 0
        ? ["Differentiators are present."]
        : [],
      state.positioning.differentiators.length > 0 ? [] : ["differentiators"],
    ),
    trust: fallbackDimension(
      state.trust.signals.length > 0 ? 35 : 5,
      state.trust.signals.length > 0 ? ["Trust signals are present."] : [],
      state.trust.signals.length > 0 ? [] : ["trust signals"],
    ),
    authority: fallbackDimension(
      state.authority.themes.length > 0 ? 35 : 5,
      state.authority.themes.length > 0
        ? ["Authority themes are present."]
        : [],
      state.authority.themes.length > 0 ? [] : ["authority themes"],
    ),
    consistency: fallbackDimension(
      state.memory.decisions.some((decision) => decision.status === "accepted")
        ? 35
        : 5,
      state.memory.decisions.some((decision) => decision.status === "accepted")
        ? ["Accepted decision is present."]
        : [],
      ["accepted decisions"],
    ),
    growthReadiness: fallbackDimension(
      state.growth.objectives.length > 0 ? 35 : 5,
      state.growth.objectives.length > 0
        ? ["Growth objective is present."]
        : [],
      state.growth.objectives.length > 0 ? [] : ["growth objective"],
    ),
  };
}

function isScoreDimension(value: string): value is ScoreDimension {
  return DIMENSIONS.includes(value as ScoreDimension);
}

function impactMagnitudeValue(magnitude: "low" | "medium" | "high"): number {
  if (magnitude === "high") return 8;
  if (magnitude === "medium") return 5;
  return 3;
}

function applyDecisionOutcomeSignals(
  score: BrandScore,
  state: Omit<
    BrandOperatingState,
    "score" | "missionControl" | "lifecycleStage"
  >,
): BrandScore {
  return state.memory.decisionOutcomes.reduce((nextScore, outcome) => {
    const impact = outcome.actualImpact ?? outcome.expectedImpact;

    if (!isScoreDimension(impact.dimension)) {
      return nextScore;
    }

    const current = nextScore[impact.dimension];

    if (outcome.status === "validated" && impact.direction === "increase") {
      const boost = impactMagnitudeValue(impact.magnitude);
      return {
        ...nextScore,
        [impact.dimension]: {
          ...current,
          score: clampScore(current.score + boost),
          reasons: mergeUnique([
            ...current.reasons,
            `Validated decision outcome: ${impact.rationale}`,
          ]),
          evidence: mergeUnique([
            ...current.evidence,
            ...outcome.validationEvidence,
            impact.rationale,
          ]),
        },
      };
    }

    if (outcome.status === "failed") {
      const penalty = impactMagnitudeValue(impact.magnitude) + 2;
      return {
        ...nextScore,
        [impact.dimension]: {
          ...current,
          score: clampScore(current.score - penalty),
          penalties: mergeUnique([
            ...current.penalties,
            `Failed decision outcome: ${impact.rationale}`,
          ]),
        },
      };
    }

    if (outcome.status === "in_progress") {
      return {
        ...nextScore,
        [impact.dimension]: {
          ...current,
          evidence: mergeUnique([
            ...current.evidence,
            `Decision outcome in progress: ${impact.rationale}`,
          ]),
        },
      };
    }

    return nextScore;
  }, score);
}

export function calculateBrandScore(
  state: Omit<
    BrandOperatingState,
    "score" | "missionControl" | "lifecycleStage"
  >,
): BrandScore {
  let intelligence: ReturnType<typeof evaluateBrandIntelligence>;

  try {
    intelligence = evaluateBrandIntelligence(state);
  } catch {
    return applyDecisionOutcomeSignals(
      calculateFallbackBrandScore(state),
      state,
    );
  }

  return applyDecisionOutcomeSignals(
    {
      clarity: dimensionFromEvaluations(intelligence.dimensionMap.clarity),
      audienceFit: dimensionFromEvaluations(
        intelligence.dimensionMap.audienceFit,
      ),
      differentiation: dimensionFromEvaluations(
        intelligence.dimensionMap.differentiation,
      ),
      trust: dimensionFromEvaluations(intelligence.dimensionMap.trust),
      authority: dimensionFromEvaluations(intelligence.dimensionMap.authority),
      consistency: dimensionFromEvaluations(
        intelligence.dimensionMap.consistency,
      ),
      growthReadiness: dimensionFromEvaluations(
        intelligence.dimensionMap.growthReadiness,
      ),
    },
    state,
  );
}

export function calculateReadinessScore(score: BrandScore): number {
  const total = DIMENSIONS.reduce(
    (sum, dimension) => sum + score[dimension].score,
    0,
  );
  return clampScore(total / DIMENSIONS.length);
}

export function findLowestScoreDimension(score: BrandScore): ScoreDimension {
  return DIMENSIONS.reduce((lowest, dimension) => {
    return score[dimension].score < score[lowest].score ? dimension : lowest;
  }, DIMENSIONS[0]);
}

export function createScoreSnapshot(
  score: BrandScore,
  now = new Date().toISOString(),
): ScoreSnapshot {
  return {
    id: `score_${now.replace(/[^0-9]/g, "")}`,
    createdAt: now,
    readinessScore: calculateReadinessScore(score),
    dimensions: score,
  };
}

export function getScoreDimensions(): ScoreDimension[] {
  return [...DIMENSIONS];
}
