import type { EvidenceGraph } from "./evidence-graph-types";

export function getEvidenceForSignal(
  graph: EvidenceGraph,
  signalId: string,
) {
  return graph.nodes.find(
    (node) => node.signalId === signalId,
  );
}