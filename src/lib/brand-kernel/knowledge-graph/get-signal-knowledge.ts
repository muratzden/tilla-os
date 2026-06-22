import type { KnowledgeGraph } from "./knowledge-graph-types";

export function getSignalKnowledge(graph: KnowledgeGraph, signalId: string) {
  const signal = graph.registry.byId[signalId];

  if (!signal) {
    return undefined;
  }

  const evidence = graph.evidence.nodes.find(
    (node) => node.signalId === signalId,
  );

  const traces = graph.traceability.traces.filter((trace) =>
    trace.signalIds.includes(signalId),
  );

  return {
    signal,
    evidence,
    traces,
  };
}
