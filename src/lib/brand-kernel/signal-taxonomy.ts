import { BrandGraph } from "./brand-graph";

export type GraphArea = keyof Omit<
  BrandGraph,
  "overallConfidence"
>;

export interface SignalDefinition {
  id: string;

  label: string;

  description: string;

  graphAreas: GraphArea[];
}

export const SIGNAL_TAXONOMY: Record<
  string,
  SignalDefinition
> = {
  craftsmanship: {
    id: "craftsmanship",
    label: "Craftsmanship",
    description: "Focus on making quality work",
    graphAreas: [
  "identity",
  "beliefs",
  "differentiators",
],
  },

  durability: {
    id: "durability",
    label: "Durability",
    description: "Long-term product value",
    graphAreas: [
      "trustSignals",
      "positioning",
    ],
  },

  premium: {
    id: "premium",
    label: "Premium",
    description: "Higher market positioning",
    graphAreas: [
      "positioning",
    ],
  },

  trust: {
    id: "trust",
    label: "Trust",
    description: "Customer confidence",
    graphAreas: [
      "trustSignals",
    ],
  },

  transformation: {
    id: "transformation",
    label: "Transformation",
    description: "Customer change",
    graphAreas: [
      "transformation",
    ],
  },

  audience: {
    id: "audience",
    label: "Audience",
    description: "Target audience",
    graphAreas: [
      "audience",
    ],
  },

  differentiation: {
    id: "differentiation",
    label: "Differentiation",
    description: "Competitive distinction",
    graphAreas: [
      "differentiators",
    ],
  },

  growth: {
    id: "growth",
    label: "Growth",
    description: "Expansion ambition",
    graphAreas: [
      "growth",
      "objectives",
    ],
  },

  constraint: {
    id: "constraint",
    label: "Constraint",
    description: "Growth blocker",
    graphAreas: [
      "constraints",
    ],
  },
};