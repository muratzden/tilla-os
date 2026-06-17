import {
  createEvaluation,
  hasMeaningfulText,
  hasSpecificPhrase,
  type BrandIntelligenceInput,
  type StrategicEvaluation
} from "./types";

export function evaluatePositioning(input: BrandIntelligenceInput): StrategicEvaluation {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const risks: string[] = [];
  const missingEvidence: string[] = [];
  const recommendations: string[] = [];
  let score = 6;

  if (hasMeaningfulText(input.positioning.category)) {
    score += 15;
    strengths.push("Category clarity is present.");
  } else {
    weaknesses.push("Category is unclear.");
    missingEvidence.push("category clarity");
    recommendations.push("Name the category the audience should use to understand the brand.");
  }

  if (hasSpecificPhrase(input.positioning.promise)) {
    score += 18;
    strengths.push("Promise clarity is strong.");
  } else {
    weaknesses.push("Promise is not concrete enough.");
    missingEvidence.push("clear promise");
    recommendations.push("Make the promise specific, outcome-oriented, and easy to repeat.");
  }

  if (input.positioning.differentiators.length >= 2 && input.positioning.proofPoints.length >= 1) {
    score += 20;
    strengths.push("Differentiation has both claims and proof.");
  } else if (input.positioning.differentiators.length > 0) {
    score += 8;
    weaknesses.push("Differentiation claims are under-proven.");
    missingEvidence.push("proof for differentiators");
  } else {
    weaknesses.push("Differentiation is missing.");
    missingEvidence.push("differentiation claims");
  }

  if (input.authority.themes.length > 0 || input.positioning.differentiators.length >= 3) {
    score += 12;
    strengths.push("Point of view has an initial strategic direction.");
  } else {
    weaknesses.push("Point of view is weak.");
    missingEvidence.push("point of view");
  }

  if (input.positioning.proofPoints.length >= 2 || input.audience.barriers.length > 0) {
    score += 12;
    strengths.push("Alternative awareness is partially visible through proof or audience barriers.");
  } else {
    risks.push("The brand may not be clearly separated from alternatives.");
    missingEvidence.push("alternative awareness");
    recommendations.push("Name what the audience would choose instead and why this brand is different.");
  }

  return createEvaluation({
    score,
    strengths,
    weaknesses,
    risks,
    missingEvidence,
    recommendations
  });
}
