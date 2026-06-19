import type { EvidenceGraph } from "../evidence/evidence-graph-types";
import type { SignalRegistry } from "../signal-registry/signal-registry-types";
import type { TraceabilityReport } from "../traceability/traceability-types";

export type KnowledgeGraph = {
  registry: SignalRegistry;
  evidence: EvidenceGraph;
  traceability: TraceabilityReport;
};