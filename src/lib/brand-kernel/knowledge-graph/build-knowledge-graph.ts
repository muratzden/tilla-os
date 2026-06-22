import type { EvidenceGraph } from "../evidence/evidence-graph-types";
import type { SignalRegistry } from "../signal-registry/signal-registry-types";
import type { TraceabilityReport } from "../traceability/traceability-types";
import type { KnowledgeGraph } from "./knowledge-graph-types";

export function buildKnowledgeGraph(
  registry: SignalRegistry,
  evidence: EvidenceGraph,
  traceability: TraceabilityReport,
): KnowledgeGraph {
  return {
    registry,
    evidence,
    traceability,
  };
}
