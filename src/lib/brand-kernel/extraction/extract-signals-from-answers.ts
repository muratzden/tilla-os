import { extractSignalsFromAnswer } from "./extract-signals-from-answer";
import type { FounderAnswer, SignalExtractionReport } from "./extraction-types";

export function extractSignalsFromAnswers(
  answers: FounderAnswer[],
): SignalExtractionReport {
  return {
    extractedSignals: answers.flatMap((answer) =>
      extractSignalsFromAnswer(answer),
    ),
  };
}
