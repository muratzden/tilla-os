import type { EvidenceGraph } from "./evidence-graph-types";
import type { SignalRegistry } from "../signal-registry/signal-registry-types";
import type { SignalWithEvidence } from "./signal-with-evidence-types";

export function getSignalWithEvidence(
  registry: SignalRegistry,
  graph: EvidenceGraph,
  signalId: string,
): SignalWithEvidence | undefined {
  const signal = registry.byId[signalId];

  if (!signal) {
    return undefined;
  }

  const evidence = graph.nodes.find(
    (node) => node.signalId === signalId,
  );

  return {
    signal,
    evidence,
  };
}