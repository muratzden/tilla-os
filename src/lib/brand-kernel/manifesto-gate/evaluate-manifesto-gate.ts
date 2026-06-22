import { calculateKernelConfidence } from "../confidence/calculate-kernel-confidence";
import { detectContradictions } from "../contradictions/detect-contradictions";
import { evaluateCoverage } from "../coverage/evaluate-coverage";
import { detectMissingInformation } from "../missing-information/detect-missing-information";
import { evaluateManifestoReadiness } from "../readiness/evaluate-manifesto-readiness";
import type { BrandSignal } from "../signals/types";
import type { ManifestoGateReport } from "./manifesto-gate-types";

export function evaluateManifestoGate(
  signals: BrandSignal[],
): ManifestoGateReport {
  const tensions = detectContradictions(signals);
  const confidence = calculateKernelConfidence(signals, tensions);
  const coverage = evaluateCoverage(signals);
  const readiness = evaluateManifestoReadiness(confidence, coverage);
  const missingInformation = detectMissingInformation(confidence, coverage);

  return {
    coverage,
    confidence,
    readiness,
    missingInformation,
  };
}
