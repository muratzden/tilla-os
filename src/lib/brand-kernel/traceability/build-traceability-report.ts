import type {
  ManifestoTrace,
  TraceabilityReport,
} from "./traceability-types";

export function buildTraceabilityReport(
  traces: ManifestoTrace[],
): TraceabilityReport {
  return {
    traces,
  };
}