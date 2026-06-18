import { BrandGraph } from "./brand-graph";

function emptyNode() {
  return {
    confidence: 0,
    signals: [],
    summary: "",
  };
}

export function createEmptyBrandGraph(): BrandGraph {
  return {
    identity: emptyNode(),

    audience: emptyNode(),

    transformation: emptyNode(),

    positioning: emptyNode(),

    beliefs: emptyNode(),

    tensions: emptyNode(),

    differentiators: emptyNode(),

    trustSignals: emptyNode(),

    objectives: emptyNode(),

    growth: emptyNode(),

    constraints: emptyNode(),

    overallConfidence: 0,
  };
}