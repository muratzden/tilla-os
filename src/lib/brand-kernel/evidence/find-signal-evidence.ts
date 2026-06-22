import type { EvidenceGraph } from "./evidence-graph-types";

export function findSignalEvidence(graph: EvidenceGraph, signalId: string) {
  return graph.nodes.find((node) => node.signalId === signalId);
}
