import type { ContradictionRule } from "./types";

export const conflictRegistry: ContradictionRule[] = [
  {
    signalA: "premium_positioning",
    signalB: "lowest_price_positioning",
    type: "pricing_conflict",
    weight: 0.95,
    reason: "Premium positioning conflicts with lowest-price positioning.",
  },
  {
    signalA: "handcrafted_quality",
    signalB: "mass_production",
    type: "quality_conflict",
    weight: 0.98,
    reason: "Handcrafted quality conflicts with mass production.",
  },
  {
    signalA: "long_term_trust",
    signalB: "aggressive_discounting",
    type: "trust_conflict",
    weight: 0.92,
    reason: "Long-term trust conflicts with aggressive discounting.",
  },
];
