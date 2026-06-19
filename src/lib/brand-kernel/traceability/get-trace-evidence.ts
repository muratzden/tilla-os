import type { EvidenceGraph } from "../evidence/evidence-graph-types";
import type { TraceabilityReport } from "./traceability-types";

export function getTraceEvidence(
  report: TraceabilityReport,
  graph: EvidenceGraph,
  sentenceId: string,
) {
  const trace = report.traces.find(
    (item) => item.sentenceId === sentenceId,
  );

  if (!trace) {
    return [];
  }

  return trace.signalIds
    .map((signalId) =>
      graph.nodes.find(
        (node) => node.signalId === signalId,
      ),
    )
    .filter(Boolean);
}