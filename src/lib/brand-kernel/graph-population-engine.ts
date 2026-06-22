import { BrandGraph, GraphNode } from "./brand-graph";
import { createEmptyBrandGraph } from "./create-empty-graph";
import type { BrandSignal, BrandSignalCategory } from "./signals/types";

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

function addSignalToNode(node: GraphNode, signal: BrandSignal): GraphNode {
  const signalText = signal.evidence.join(" ");
  const nextSignals = Array.from(new Set([...node.signals, signalText]));

  return {
    ...node,
    signals: nextSignals,
    summary: nextSignals.slice(0, 3).join(" "),
  };
}

const CATEGORY_TO_GRAPH_AREAS: Record<
  BrandSignalCategory,
  (keyof BrandGraph)[]
> = {
  identity: ["identity"],
  audience: ["audience"],
  belief: ["beliefs"],
  transformation: ["transformation"],
  principles: ["beliefs"],
  positioning: ["positioning", "differentiators"],
  values: ["beliefs"],
  direction: ["objectives"],
  quality: ["trustSignals", "differentiators"],
  trust: ["trustSignals"],
  growth: ["growth", "objectives"],
  constraint: ["constraints"],
};

function calculateAllNodeConfidence(graph: BrandGraph): void {
  graph.identity.confidence = calculateNodeConfidence(graph.identity);
  graph.audience.confidence = calculateNodeConfidence(graph.audience);
  graph.transformation.confidence = calculateNodeConfidence(
    graph.transformation,
  );
  graph.positioning.confidence = calculateNodeConfidence(graph.positioning);
  graph.beliefs.confidence = calculateNodeConfidence(graph.beliefs);
  graph.tensions.confidence = calculateNodeConfidence(graph.tensions);
  graph.differentiators.confidence = calculateNodeConfidence(
    graph.differentiators,
  );
  graph.trustSignals.confidence = calculateNodeConfidence(graph.trustSignals);
  graph.objectives.confidence = calculateNodeConfidence(graph.objectives);
  graph.growth.confidence = calculateNodeConfidence(graph.growth);
  graph.constraints.confidence = calculateNodeConfidence(graph.constraints);
}

export function populateBrandGraph(signals: BrandSignal[]): BrandGraph {
  const graph = createEmptyBrandGraph();

  for (const signal of signals) {
    const areas = CATEGORY_TO_GRAPH_AREAS[signal.category] ?? [];

    for (const area of areas) {
      if (area === "overallConfidence") {
        continue;
      }

      graph[area] = addSignalToNode(graph[area], signal);
    }
  }

  calculateAllNodeConfidence(graph);

  graph.overallConfidence = calculateOverallConfidence(graph);

  return graph;
}
