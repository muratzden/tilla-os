import { BrandGraph, GraphNode } from "./brand-graph";

type GraphArea = keyof Omit<BrandGraph, "overallConfidence">;

export interface KernelBottleneck {
  area: GraphArea;
  confidence: number;
  reason: string;
}

export interface KernelMissionControl {
  overallHealth: number;
  primaryBottleneck: KernelBottleneck;
  weakAreas: KernelBottleneck[];
  nextBestAction: string;
}

const AREA_LABELS: Record<GraphArea, string> = {
  identity: "Identity",
  audience: "Audience",
  transformation: "Transformation",
  positioning: "Positioning",
  beliefs: "Beliefs",
  tensions: "Tensions",
  differentiators: "Differentiators",
  trustSignals: "Trust signals",
  objectives: "Objectives",
  growth: "Growth",
  constraints: "Constraints",
};

function graphEntries(graph: BrandGraph): [GraphArea, GraphNode][] {
  return [
    ["identity", graph.identity],
    ["audience", graph.audience],
    ["transformation", graph.transformation],
    ["positioning", graph.positioning],
    ["beliefs", graph.beliefs],
    ["tensions", graph.tensions],
    ["differentiators", graph.differentiators],
    ["trustSignals", graph.trustSignals],
    ["objectives", graph.objectives],
    ["growth", graph.growth],
    ["constraints", graph.constraints],
  ];
}

function createReason(area: GraphArea, confidence: number): string {
  if (confidence === 0) {
    return `${AREA_LABELS[area]} has no usable founder signal yet.`;
  }

  if (confidence < 50) {
    return `${AREA_LABELS[area]} is supported by weak or limited signals.`;
  }

  return `${AREA_LABELS[area]} is not the main blocker.`;
}

function createNextBestAction(bottleneck: KernelBottleneck): string {
  const actions: Record<GraphArea, string> = {
    identity: "Clarify what this brand is, who started it, and why it exists.",
    audience:
      "Collect sharper signals about who the brand serves and what they care about.",
    transformation: "Define the change this brand creates for the customer.",
    positioning:
      "Clarify the market position and why this brand should be chosen.",
    beliefs: "Extract the belief system behind the brand’s decisions.",
    tensions:
      "Identify the contradictions, tradeoffs, or conflicts the brand must resolve.",
    differentiators: "Clarify what makes the brand meaningfully different.",
    trustSignals: "Collect proof points that make the brand credible.",
    objectives: "Clarify what the brand is trying to achieve next.",
    growth: "Define the growth path and channels.",
    constraints: "Identify the obstacle currently slowing the brand down.",
  };

  return actions[bottleneck.area];
}

export function runKernelMissionControl(
  graph: BrandGraph,
): KernelMissionControl {
  const weakAreas = graphEntries(graph)
    .map(([area, node]) => ({
      area,
      confidence: node.confidence,
      reason: createReason(area, node.confidence),
    }))
    .filter((item) => item.confidence < 50)
    .sort((a, b) => a.confidence - b.confidence);

  const primaryBottleneck = weakAreas[0] ?? {
    area: "constraints",
    confidence: graph.constraints.confidence,
    reason: "No critical bottleneck detected.",
  };

  return {
    overallHealth: graph.overallConfidence,
    primaryBottleneck,
    weakAreas,
    nextBestAction: createNextBestAction(primaryBottleneck),
  };
}
