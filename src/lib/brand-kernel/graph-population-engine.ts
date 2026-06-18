import { BrandGraph, GraphNode } from "./brand-graph";
import { createEmptyBrandGraph } from "./create-empty-graph";
import { FounderSignal } from "./founder-signals";
import { GraphArea, SIGNAL_TAXONOMY } from "./signal-taxonomy";

function clampConfidence(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function calculateNodeConfidence(node: GraphNode): number {
  if (node.signals.length === 0) {
    return 0;
  }

  const signalScore = Math.min(node.signals.length * 18, 70);
  const summaryScore = node.summary.length > 0 ? 20 : 0;

  return clampConfidence(signalScore + summaryScore);
}

function calculateOverallConfidence(graph: BrandGraph): number {
  const nodes: GraphNode[] = [
    graph.identity,
    graph.audience,
    graph.transformation,
    graph.positioning,
    graph.beliefs,
    graph.tensions,
    graph.differentiators,
    graph.trustSignals,
    graph.objectives,
    graph.growth,
    graph.constraints,
  ];

  const total = nodes.reduce((sum, node) => sum + node.confidence, 0);

  return clampConfidence(total / nodes.length);
}

function addSignalToNode(node: GraphNode, signal: FounderSignal): GraphNode {
  const nextSignals = Array.from(new Set([...node.signals, signal.text]));

  return {
    ...node,
    signals: nextSignals,
    summary: nextSignals.slice(0, 3).join(" "),
  };
}

function resolveGraphAreas(signal: FounderSignal): GraphArea[] {
  const areas = signal.tags.flatMap((tag) => {
    const definition = SIGNAL_TAXONOMY[tag];

    if (!definition) {
      return [];
    }

    return definition.graphAreas;
  });

  return Array.from(new Set(areas));
}

function calculateAllNodeConfidence(graph: BrandGraph): void {
  graph.identity.confidence = calculateNodeConfidence(graph.identity);
  graph.audience.confidence = calculateNodeConfidence(graph.audience);
  graph.transformation.confidence = calculateNodeConfidence(graph.transformation);
  graph.positioning.confidence = calculateNodeConfidence(graph.positioning);
  graph.beliefs.confidence = calculateNodeConfidence(graph.beliefs);
  graph.tensions.confidence = calculateNodeConfidence(graph.tensions);
  graph.differentiators.confidence = calculateNodeConfidence(graph.differentiators);
  graph.trustSignals.confidence = calculateNodeConfidence(graph.trustSignals);
  graph.objectives.confidence = calculateNodeConfidence(graph.objectives);
  graph.growth.confidence = calculateNodeConfidence(graph.growth);
  graph.constraints.confidence = calculateNodeConfidence(graph.constraints);
}

export function populateBrandGraph(signals: FounderSignal[]): BrandGraph {
  const graph = createEmptyBrandGraph();

  for (const signal of signals) {
    const areas = resolveGraphAreas(signal);

    for (const area of areas) {
      graph[area] = addSignalToNode(graph[area], signal);
    }
  }

  calculateAllNodeConfidence(graph);

  graph.overallConfidence = calculateOverallConfidence(graph);

  return graph;
}