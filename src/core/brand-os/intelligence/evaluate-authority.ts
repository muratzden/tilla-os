import { createEvaluation, type BrandIntelligenceInput, type StrategicEvaluation } from "./types";

export function evaluateAuthority(input: BrandIntelligenceInput): StrategicEvaluation {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const risks: string[] = [];
  const missingEvidence: string[] = [];
  const recommendations: string[] = [];
  let score = 6;

  if (input.authority.themes.length > 0) {
    score += 16;
    strengths.push("Expertise claim is visible through authority themes.");
  } else {
    weaknesses.push("Expertise claim is not defined.");
    missingEvidence.push("expertise claim");
    recommendations.push("Choose the expertise the brand should become known for.");
  }

  if (input.authority.themes.length >= 2 || input.positioning.differentiators.length >= 2) {
    score += 14;
    strengths.push("Point of view has multiple strategic anchors.");
  } else {
    weaknesses.push("Point of view is too thin.");
    missingEvidence.push("point of view");
  }

  if (input.authority.evidence.length > 0 && input.memory.observations.length > 0) {
    score += 16;
    strengths.push("Repeatable insight can be supported by evidence and observation.");
  } else {
    missingEvidence.push("repeatable insight evidence");
    recommendations.push("Turn observations and proof into repeatable insight themes.");
  }

  if (input.authority.evidence.length >= 2 || input.positioning.proofPoints.length >= 2) {
    score += 16;
    strengths.push("Authority assets are emerging.");
  } else {
    weaknesses.push("Authority assets are not strong enough.");
    missingEvidence.push("authority assets");
  }

  if (input.positioning.promise && input.authority.themes.length > 0) {
    score += 10;
    strengths.push("Message consistency exists between positioning and authority.");
  } else {
    risks.push("Authority message may drift because positioning and themes are not aligned.");
    missingEvidence.push("consistent authority message");
  }

  if (input.authority.gaps.length > 0) {
    risks.push(...input.authority.gaps.map((gap) => `Open authority gap: ${gap}`));
    score -= input.authority.gaps.length * 5;
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
