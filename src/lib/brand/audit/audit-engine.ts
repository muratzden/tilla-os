import {
  AuditRecommendation,
  AuditViolation,
  BrandAuditInput,
  BrandAuditResult,
} from "./audit-types";

import { getLanguageRuntime } from "@/src/lib/i18n/language-registry";

function normalizeText(value: string) {
  return value.toLowerCase().replaceAll("_", " ");
}

function applyTemplate(template: string, value: string) {
  return template.replaceAll("{{value}}", value);
}

function includesAny(content: string, values: string[]) {
  const normalizedContent = normalizeText(content);

  return values.some((value) =>
    normalizedContent.includes(normalizeText(value)),
  );
}

function calculateConstitutionAlignment(input: BrandAuditInput) {
  const { content, sourceContext } = input;

  let score = 60;

  if (includesAny(content, sourceContext.constitution.principles)) {
    score += 20;
  }

  if (includesAny(content, sourceContext.constitution.forbiddenDirections)) {
    score -= 35;
  }

  return Math.max(0, Math.min(100, score));
}

function calculateMemoryAlignment(input: BrandAuditInput) {
  const { content, sourceContext } = input;

  let score = 60;

  const dominantArchetype = sourceContext.memory.dominantArchetype;
  const dominantWorld = sourceContext.memory.dominantWorld;

  if (
    dominantArchetype &&
    normalizeText(content).includes(normalizeText(dominantArchetype))
  ) {
    score += 15;
  }

  if (
    dominantWorld &&
    normalizeText(content).includes(normalizeText(dominantWorld))
  ) {
    score += 15;
  }

  if (sourceContext.memory.totalDecisions === 0) {
    score = 50;
  }

  return Math.max(0, Math.min(100, score));
}

function calculateConsistencyAlignment(input: BrandAuditInput) {
  const { sourceContext } = input;

  return Math.max(0, Math.min(100, sourceContext.consistency.consistencyScore));
}

function detectViolations(input: BrandAuditInput): AuditViolation[] {
  const { content, sourceContext } = input;
  
  const runtime = getLanguageRuntime({
  brandId: input.brandId,
  uiLanguage: input.uiLanguage,
  requestedOutputLanguage: input.outputLanguage,
});

const outputPack = runtime.output;

  return sourceContext.manifesto.forbiddenDirections
    .filter((direction: string) =>
      normalizeText(content).includes(normalizeText(direction)),
    )
    .map((direction: string) => ({
      key: direction,
      severity: "high",
      message: applyTemplate(
  outputPack.auditText.violations.forbiddenDirection,
  direction,
),
    }));
}

function calculateDriftLevel(
  alignmentScore: number,
  violations: AuditViolation[],
): BrandAuditResult["driftLevel"] {
  if (violations.some((violation) => violation.severity === "high")) {
    return "high";
  }

  if (alignmentScore >= 75) {
    return "healthy";
  }

  if (alignmentScore >= 65) {
    return "low";
  }

  if (alignmentScore >= 45) {
    return "medium";
  }

  return "high";
}

function generateRecommendations(
  input: BrandAuditInput,
): AuditRecommendation[] {
  const { sourceContext } = input;
  const runtime = getLanguageRuntime({
  brandId: input.brandId,
  uiLanguage: input.uiLanguage,
  requestedOutputLanguage: input.outputLanguage,
});

const outputPack = runtime.output;
  const violations = detectViolations(input);

  if (violations.length > 0) {
    return violations.map((violation) => ({
      key: `fix_${violation.key}`,
      message: applyTemplate(
  outputPack.auditText.recommendations.removeOrReframe,
  violation.key,
),
    }));
  }

  return sourceContext.manifesto.principles.slice(0, 3).map((principle) => ({
    key: `strengthen_${principle}`,
    message: applyTemplate(
  outputPack.auditText.recommendations.strengthenBrandSignal,
  principle,
),
  }));
}


function generateBrandDriftAnalysis(
  alignmentScore: number,
  input: BrandAuditInput,
) {
	const runtime = getLanguageRuntime({
  brandId: input.brandId,
  uiLanguage: input.uiLanguage,
  requestedOutputLanguage: input.outputLanguage,
});

const outputPack = runtime.output;
  const trendDirection = input.sourceContext.consistency.trendDirection;

  if (alignmentScore >= 70) {
    return outputPack.auditText.driftAnalysis.aligned;
  }

  if (trendDirection === "fragmenting") {
   return outputPack.auditText.driftAnalysis.fragmenting;
  }

  if (trendDirection === "shifting") {
    return outputPack.auditText.driftAnalysis.shifting;
  }

  return outputPack.auditText.driftAnalysis.partialDrift;
}

function generateGovernanceSignals(
  input: BrandAuditInput,
  alignmentScore: number,
  violations: AuditViolation[],
) {
  const signals: BrandAuditResult["governanceSignals"] = [];
const runtime = getLanguageRuntime({
  brandId: input.brandId,
  uiLanguage: input.uiLanguage,
  requestedOutputLanguage: input.outputLanguage,
});

const outputPack = runtime.output;

  if (violations.length > 0) {
    signals.push({
      key: "forbidden_direction_detected",
      level: "critical",
      message: outputPack.auditText.governanceSignals.forbiddenDirectionDetected,
    });
  }

  if (alignmentScore < 60) {
    signals.push({
      key: "low_alignment",
      level: "warning",
      message: outputPack.auditText.governanceSignals.lowAlignment,
    });
  }

  if (input.sourceContext.consistency.trendDirection !== "stable") {
    signals.push({
      key: "consistency_not_stable",
      level: "warning",
      message: applyTemplate(
  outputPack.auditText.governanceSignals.consistencyNotStable,
  input.sourceContext.consistency.trendDirection,
),
    });
  }

  return signals;
}

export function auditEngine(input: BrandAuditInput): BrandAuditResult {
	const runtime = getLanguageRuntime({
  brandId: input.brandId,
  uiLanguage: input.uiLanguage,
  requestedOutputLanguage: input.outputLanguage,
});

const outputPack = runtime.output;
  const constitutionAlignment = calculateConstitutionAlignment(input);
  const memoryAlignment = calculateMemoryAlignment(input);
  const consistencyAlignment = calculateConsistencyAlignment(input);

  const violations = detectViolations(input);

  const alignmentScore = Math.round(
    constitutionAlignment * 0.45 +
      memoryAlignment * 0.25 +
      consistencyAlignment * 0.3,
  );

  const calculatedDriftLevel = calculateDriftLevel(alignmentScore, violations);

  const recommendations = generateRecommendations(input);

  const governanceSignals = generateGovernanceSignals(
    input,
    alignmentScore,
    violations,
  );

  const hasHighSeverityViolation = violations.some(
    (violation) => violation.severity === "high",
  );

  const governanceHealth =
    calculatedDriftLevel === "critical" || hasHighSeverityViolation
      ? "critical"
      : violations.length > 0 || alignmentScore < 60
        ? "warning"
        : "healthy";

  const driftLevel =
    governanceHealth === "critical" ? "critical" : calculatedDriftLevel;

  const brandDriftAnalysis =
    governanceHealth === "critical"
      ? outputPack.auditText.driftAnalysis.critical
      : generateBrandDriftAnalysis(alignmentScore, input);

  const decisionVetoRisk =
    governanceHealth === "critical"
      ? "high"
      : governanceHealth === "warning"
        ? "medium"
        : "low";

  const forbiddenDirectionExposure = violations.length;

  const corePrincipleConflicts = violations.map((violation) => violation.key);
  return {
    brandId: input.brandId,
    channel: input.channel,

    alignmentScore,
    constitutionAlignment,
    memoryAlignment,
    consistencyAlignment,

    driftLevel,
    brandDriftAnalysis,

    violations,
    recommendations,
    channelScores: [
      {
        channel: input.channel,
        score: alignmentScore,
      },
    ],
    governanceSignals,
    governance: {
      governanceHealth,
      decisionVetoRisk,
      forbiddenDirectionExposure,
      corePrincipleConflicts,
      governanceSignals: governanceSignals.map((signal) => signal.message),
      recommendations: recommendations.map(
        (recommendation) => recommendation.message,
      ),
    },

    alignment: {
      alignmentScore,
      constitutionAlignment,
      memoryAlignment,
      consistencyAlignment,
      driftLevel,
      brandDriftAnalysis,
    },
  };
}
