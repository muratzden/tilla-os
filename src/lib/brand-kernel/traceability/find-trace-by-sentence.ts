import type { TraceabilityReport } from "./traceability-types";

export function findTraceBySentence(
  report: TraceabilityReport,
  sentenceId: string,
) {
  return report.traces.find((trace) => trace.sentenceId === sentenceId);
}
