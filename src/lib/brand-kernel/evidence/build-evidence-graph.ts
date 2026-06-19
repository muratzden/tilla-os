import type { EvidenceGraph } from "./evidence-graph-types";
import type { SignalEvidence } from "./evidence-types";

export function buildEvidenceGraph(
  evidence: SignalEvidence[],
): EvidenceGraph {
  return {
    nodes: evidence,
  };
}