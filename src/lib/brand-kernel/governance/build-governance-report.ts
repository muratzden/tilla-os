import { calculateKernelConfidence } from "../confidence/calculate-kernel-confidence";
import { detectContradictions } from "../contradictions/detect-contradictions";
import { evaluateCoverage } from "../coverage/evaluate-coverage";
import { detectMissingInformation } from "../missing-information/detect-missing-information";
import { evaluateManifestoReadiness } from "../readiness/evaluate-manifesto-readiness";
import type { BrandSignal } from "../signals/types";
import type { GovernanceReport } from "./governance-types";

export function buildGovernanceReport(
  approvedSignals: BrandSignal[],
): GovernanceReport {
  const contradictions = detectContradictions(approvedSignals);

  const confidence = calculateKernelConfidence(approvedSignals, contradictions);

  const coverage = evaluateCoverage(approvedSignals);

  const missingInformation = detectMissingInformation(confidence, coverage);

  const readiness = evaluateManifestoReadiness(confidence, coverage);

  return {
    readinessScore: readiness.status === "READY" ? 100 : 50,
    confidenceScore: confidence.score,
    coverageScore: coverage.coverageScore,
    contradictionCount: contradictions.length,
    missingAreas: coverage.missing,
    approvedSignalCount: approvedSignals.length,
    recommendations: [...readiness.reasons, ...missingInformation.questions],
  };
}
