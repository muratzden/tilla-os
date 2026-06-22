import {
  createEvaluation,
  type BrandIntelligenceInput,
  type StrategicEvaluation,
} from "./types";

export function evaluateTrust(
  input: BrandIntelligenceInput,
): StrategicEvaluation {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const risks: string[] = [];
  const missingEvidence: string[] = [];
  const recommendations: string[] = [];
  let score = 6;

  const proofCount =
    input.positioning.proofPoints.length + input.authority.evidence.length;

  if (proofCount > 0) {
    score += 18;
    strengths.push("Proof presence is visible.");
  } else {
    weaknesses.push("Proof is missing.");
    missingEvidence.push("proof presence");
    recommendations.push(
      "Add concrete proof points before asking the audience to believe the promise.",
    );
  }

  if (proofCount >= 3 || input.memory.observations.length >= 2) {
    score += 18;
    strengths.push(
      "Proof quality is stronger because it has multiple support points or observations.",
    );
  } else {
    weaknesses.push("Proof quality is thin.");
    missingEvidence.push("proof quality");
  }

  if (input.audience.barriers.length > 0 && input.trust.signals.length > 0) {
    score += 16;
    strengths.push("Risk reduction is connected to audience barriers.");
  } else {
    risks.push("Trust work is not clearly tied to audience risk.");
    missingEvidence.push("risk-reducing trust signal");
  }

  if (input.trust.signals.length > 0) {
    score += 14;
    strengths.push("Credibility signals are present.");
  } else {
    weaknesses.push("Credibility signals are absent.");
    missingEvidence.push("credibility signals");
  }

  if (input.memory.observations.length > 0) {
    score += 12;
    strengths.push("External validation exists in memory.");
  } else {
    missingEvidence.push("external validation");
    recommendations.push(
      "Record external validation from audience feedback, usage, expert review, or market response.",
    );
  }

  if (input.trust.gaps.length > 0) {
    risks.push(...input.trust.gaps.map((gap) => `Open trust gap: ${gap}`));
    score -= input.trust.gaps.length * 5;
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
