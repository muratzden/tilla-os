import type { CoverageReport } from "../coverage/coverage-types";
import type { KernelConfidenceReport } from "../confidence/confidence-types";
import type { ManifestoReadinessReport } from "./manifesto-readiness-types";

const MIN_CONFIDENCE_SCORE = 70;
const MIN_COVERAGE_SCORE = 80;
const MAX_CONTRADICTION_COUNT = 1;

export function evaluateManifestoReadiness(
  report: KernelConfidenceReport,
  coverage: CoverageReport,
): ManifestoReadinessReport {
  const reasons: string[] = [];
  const missingInformation: string[] = [];

  if (report.score < MIN_CONFIDENCE_SCORE) {
    reasons.push("Kernel confidence is below the manifesto generation threshold.");
    missingInformation.push("More reliable founder evidence is needed.");
  }

  if (coverage.coverageScore < MIN_COVERAGE_SCORE) {
    reasons.push("Brand foundation coverage is incomplete.");
    missingInformation.push(...coverage.missing);
  }

  if (report.contradictionCount > MAX_CONTRADICTION_COUNT) {
    reasons.push("Too many contradictions exist in the current brand foundation.");
    missingInformation.push("Contradictory founder signals must be clarified.");
  }

  return {
    status: reasons.length === 0 ? "READY" : "NEED_MORE_INFORMATION",
    confidenceScore: report.score,
    reasons,
    missingInformation,
  };
}