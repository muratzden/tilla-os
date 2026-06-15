import { readMemory, saveDecision } from "./brand-memory";

export function recordFeedback(entry: {
  input: any;
  decision: any;
  rating: number; // -1 / 0 / 1
}) {
  const memory = readMemory();

  memory.feedback.push({
    ...entry,
    timestamp: Date.now(),
  });

  // ⚠️ learning signal generation
  const signal = generateSignal(memory.feedback);

  return signal;
}

function generateSignal(feedback: any[]) {
  const positive = feedback.filter((f) => f.rating > 0).length;
  const negative = feedback.filter((f) => f.rating < 0).length;

  const ratio = positive / (positive + negative || 1);

  return {
    biasAdjustment: ratio,
    learningMode: ratio > 0.6 ? "reinforce_executive" : "rebalance",
  };
}
