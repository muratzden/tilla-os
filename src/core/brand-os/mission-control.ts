import { evaluateBrandIntelligence } from "./intelligence/index";
import { getLifecycleFocus } from "./lifecycle";
import { calculateReadinessScore, findLowestScoreDimension, getScoreDimensions } from "./scoring";
import type { BrandOperatingState, MissionControlState, ScoreDimension, StudioId } from "./types";

const ACTION_BY_BOTTLENECK: Record<ScoreDimension, string> = {
  clarity: "Define the core audience, category, promise, and offer in one concise foundation pass.",
  audienceFit: "Identify the primary audience, their urgent needs, barriers, and desired outcome.",
  differentiation: "Choose clear differentiators and connect each one to proof.",
  trust: "Add trust signals that reduce perceived risk and make the promise believable.",
  authority: "Select authority themes and attach evidence to each theme.",
  consistency: "Align the offer, channels, and decisions around one strategic direction.",
  growthReadiness: "Choose one measurable growth objective and one repeatable channel loop."
};

const STUDIO_BY_BOTTLENECK: Record<ScoreDimension, StudioId> = {
  clarity: "foundation",
  audienceFit: "foundation",
  differentiation: "positioning",
  trust: "authority",
  authority: "authority",
  consistency: "campaign",
  growthReadiness: "growth"
};

const STUDIO_BY_INTELLIGENCE_AREA: Record<string, StudioId> = {
  audience: "foundation",
  positioning: "positioning",
  trust: "authority",
  authority: "authority",
  channels: "campaign",
  growth: "growth"
};

function collectMissingInputs(state: BrandOperatingState): string[] {
  const missing: string[] = [];

  if (!state.audience.primary) missing.push("primary audience");
  if (!state.audience.desiredOutcome) missing.push("audience desired outcome");
  if (!state.positioning.category) missing.push("positioning category");
  if (!state.positioning.promise) missing.push("brand promise");
  if (state.positioning.differentiators.length === 0) missing.push("differentiators");
  if (!state.offer.core) missing.push("core offer");
  if (state.trust.signals.length === 0) missing.push("trust signals");
  if (state.authority.themes.length === 0) missing.push("authority themes");
  if (state.channels.primary.length === 0) missing.push("primary channel");
  if (state.growth.objectives.length === 0) missing.push("growth objective");

  return missing;
}

export function createMissionControlState(state: BrandOperatingState): MissionControlState {
  const readinessScore = calculateReadinessScore(state.score);
  const bottleneck = findLowestScoreDimension(state.score);
  const intelligence = (() => {
    try {
      return evaluateBrandIntelligence(state);
    } catch {
      return undefined;
    }
  })();
  const weakestIntelligenceArea = intelligence
    ? Object.entries({
        audience: intelligence.audience,
        positioning: intelligence.positioning,
        trust: intelligence.trust,
        authority: intelligence.authority,
        channels: intelligence.channels,
        growth: intelligence.growth
      }).sort((left, right) => left[1].score - right[1].score)[0]
    : undefined;
  const recommendedStudio =
    weakestIntelligenceArea && weakestIntelligenceArea[1].score <= state.score[bottleneck].score + 10
      ? STUDIO_BY_INTELLIGENCE_AREA[weakestIntelligenceArea[0]]
      : STUDIO_BY_BOTTLENECK[bottleneck];
  const weakestEvaluations = intelligence?.dimensionMap[bottleneck]
    ? [...intelligence.dimensionMap[bottleneck]].sort((left, right) => left.score - right.score)
    : [];
  const weakestEvaluation = weakestEvaluations[0];
  const rankedBottlenecks = getScoreDimensions()
    .map((dimension) => ({
      dimension,
      score: state.score[dimension].score,
      reasons: state.score[dimension].reasons,
      missingInputs: state.score[dimension].missingInputs
    }))
    .sort((left, right) => left.score - right.score);
  const missingInputs = collectMissingInputs(state);
  const stageFocus = getLifecycleFocus(state.lifecycleStage);
  const primaryMissingInputs = state.score[bottleneck].missingInputs;
  const pendingOutcomes = state.memory.decisionOutcomes.filter((outcome) => outcome.status === "pending" || outcome.status === "in_progress");
  const failedOutcomes = state.memory.decisionOutcomes.filter((outcome) => outcome.status === "failed");
  const validatedOutcomes = state.memory.decisionOutcomes.filter((outcome) => outcome.status === "validated");

  const baseDiagnosis =
    readinessScore < 35
      ? "The brand has a usable seed, but needs foundation inputs before reliable strategic choices can be made."
      : readinessScore < 65
        ? "The brand has a partial foundation and should resolve its weakest strategic dimension next."
        : "The brand foundation is usable and ready for focused improvement.";
  const diagnosis = [
    baseDiagnosis,
    pendingOutcomes.length > 0 ? `${pendingOutcomes.length} strategic decision outcome is awaiting validation.` : "",
    failedOutcomes.length > 0 ? `${failedOutcomes.length} strategic decision outcome failed and should be treated as risk.` : "",
    validatedOutcomes.length > 0 ? `${validatedOutcomes.length} strategic decision outcome is validated evidence.` : ""
  ]
    .filter(Boolean)
    .join(" ");

  return {
    readinessScore,
    diagnosis,
    rankedBottlenecks,
    bottleneck,
    nextBestAction: weakestEvaluation?.recommendations[0] ?? ACTION_BY_BOTTLENECK[bottleneck],
    recommendedStudio,
    strategicFocus: stageFocus,
    missingInputs,
    actionPlan: [
      `Open the ${recommendedStudio} studio.`,
      primaryMissingInputs.length > 0
        ? `Resolve: ${primaryMissingInputs.slice(0, 3).join(", ")}.`
        : "Review the weakest score dimension and add supporting evidence.",
      ...(weakestEvaluation?.recommendations.slice(0, 2) ?? []),
      ...(pendingOutcomes.length > 0 ? ["Validate pending strategic decision outcomes before scaling the next move."] : []),
      ...(failedOutcomes.length > 0 ? ["Review failed decision outcomes and adjust the related strategic assumption."] : []),
      "Recalculate Brand OS after the update."
    ],
    expectedImpact: [
      `Raises ${bottleneck} if the strategic signal improves.`,
      ...(weakestEvaluation?.weaknesses.slice(0, 2).map((weakness) => `Improves weakness: ${weakness}`) ?? []),
      ...(weakestEvaluation?.risks.slice(0, 2).map((risk) => `Reduces risk: ${risk}`) ?? []),
      ...validatedOutcomes
        .slice(0, 2)
        .map((outcome) => `Uses validated decision evidence: ${(outcome.actualImpact ?? outcome.expectedImpact).rationale}`),
      ...failedOutcomes
        .slice(0, 2)
        .map((outcome) => `Accounts for failed decision risk: ${(outcome.actualImpact ?? outcome.expectedImpact).rationale}`),
      "Improves lifecycle readiness through explicit state change history."
    ]
  };
}
