import type { BrandSignal } from "../signals/types";
import type { BrandTension } from "../contradictions/types";
import type {
  ConfidenceFactor,
  KernelConfidenceReport,
} from "./confidence-types";

export function calculateKernelConfidence(
  signals: BrandSignal[],
  tensions: BrandTension[]
): KernelConfidenceReport {
  let score = 100;

  const factors: ConfidenceFactor[] = [];

  const strongSignals = signals.filter((signal) => signal.strength >= 0.8);
  const weakSignals = signals.filter((signal) => signal.strength < 0.5);

  for (const tension of tensions) {
    const impact = Math.round(tension.tension * -20);

    score += impact;

    factors.push({
      id: `tension-${tension.type}`,
      label: tension.reason,
      impact,
    });
  }

  for (const signal of weakSignals) {
    score -= 5;

    factors.push({
      id: `weak-${signal.id}`,
      label: `Weak ${signal.category} signal`,
      impact: -5,
    });
  }

  for (const signal of strongSignals) {
    score += 2;

    factors.push({
      id: `strong-${signal.id}`,
      label: `Strong ${signal.category} signal`,
      impact: 2,
    });
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    signalCount: signals.length,
    contradictionCount: tensions.length,
    strongSignals,
    weakSignals,
    tensions,
    factors,
  };
}