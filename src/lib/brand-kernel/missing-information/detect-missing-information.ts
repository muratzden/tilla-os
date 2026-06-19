import type { CoverageReport } from "../coverage/coverage-types";
import type { KernelConfidenceReport } from "../confidence/confidence-types";
import type { MissingInformationReport } from "./missing-information-types";

const MIN_CONFIDENCE_SCORE = 70;
const MAX_CONTRADICTION_COUNT = 1;

const QUESTIONS_BY_MISSING_AREA: Record<string, string> = {
  identity: "What does the brand stand for at its core?",
  audience: "Who is the brand trying to serve or transform?",
  belief: "What does the brand believe that competitors do not?",
  transformation: "What change should the customer experience after choosing this brand?",
  principles: "What should never be compromised, even for growth?",
};

export function detectMissingInformation(
  report: KernelConfidenceReport,
  coverage: CoverageReport,
): MissingInformationReport {
  const questions = new Set<string>();

  for (const area of coverage.missing) {
    const question = QUESTIONS_BY_MISSING_AREA[area];

    if (question) {
      questions.add(question);
    }
  }

  if (report.score < MIN_CONFIDENCE_SCORE) {
    questions.add("Which evidence best proves the brand direction?");
  }

  if (report.contradictionCount > MAX_CONTRADICTION_COUNT) {
    questions.add("Which direction best represents the brand?");
  }

  return {
    questions: [...questions],
  };
}