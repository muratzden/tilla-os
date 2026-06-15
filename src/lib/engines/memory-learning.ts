import { readMemory } from "./brand-memory";

export function memoryLearningEngine() {
  const memory = readMemory();

  const stats = analyze(memory.decisions);

  return {
    weights: stats.weights,
    biasShift: stats.biasShift,
    confidenceBoost: stats.confidenceBoost,
  };
}

function analyze(decisions: any[]) {
  let executiveBias = 0;
  let total = decisions.length || 1;

  for (const d of decisions) {
    if (d.decision?.finalDecision?.label === "executive") {
      executiveBias++;
    }
  }

  const ratio = executiveBias / total;

  return {
    weights: {
      executive: 0.4 + ratio * 0.4,
      daily: 0.3,
      casual: 0.2,
    },

    biasShift: ratio > 0.7 ? "strong_executive_brand" : "balanced_brand",

    confidenceBoost: Math.min(0.2 + ratio, 1),
  };
}
