import {
  createEvaluation,
  type BrandIntelligenceInput,
  type StrategicEvaluation,
} from "./types";

export function evaluateGrowth(
  input: BrandIntelligenceInput,
): StrategicEvaluation {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const risks: string[] = [];
  const missingEvidence: string[] = [];
  const recommendations: string[] = [];
  let score = 6;

  if (input.growth.objectives.length > 0) {
    score += 18;
    strengths.push("Growth objective clarity is present.");
  } else {
    weaknesses.push("Growth objective is unclear.");
    missingEvidence.push("growth objective");
    recommendations.push(
      "Define one growth objective before choosing more activity.",
    );
  }

  if (input.growth.loops.length > 0) {
    score += 18;
    strengths.push("Growth loop quality can be evaluated.");
  } else {
    weaknesses.push("Growth loop is missing.");
    missingEvidence.push("growth loop");
  }

  if (input.growth.loops.length > 0 && input.channels.primary.length > 0) {
    score += 14;
    strengths.push(
      "Repeatability is plausible because loop and channel are both present.",
    );
  } else {
    risks.push("Growth may not be repeatable yet.");
    missingEvidence.push("repeatability evidence");
  }

  if (input.offer.outcomes.length > 0 || input.growth.objectives.length > 0) {
    score += 12;
    strengths.push("Measurable outcome has an initial anchor.");
  } else {
    missingEvidence.push("measurable outcome");
  }

  if (
    input.audience.primary &&
    input.positioning.promise &&
    input.trust.signals.length > 0
  ) {
    score += 14;
    strengths.push("Readiness before scaling is improving.");
  } else {
    risks.push(
      "Scaling may be premature before audience, positioning, and trust are stronger.",
    );
    recommendations.push(
      "Improve audience, positioning, and trust before scaling channel activity.",
    );
  }

  return createEvaluation({
    score,
    strengths,
    weaknesses,
    risks,
    missingEvidence,
    recommendations,
  });
}
