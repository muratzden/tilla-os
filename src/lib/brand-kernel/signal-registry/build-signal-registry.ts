import type { BrandSignal } from "../signals/types";
import type { SignalRegistry } from "./signal-registry-types";

const STRONG_SIGNAL_THRESHOLD = 0.7;

export function buildSignalRegistry(signals: BrandSignal[]): SignalRegistry {
  const byId: Record<string, BrandSignal> = {};

  const byCategory: Record<string, BrandSignal[]> = {};

  for (const signal of signals) {
    byId[signal.id] = signal;

    if (!byCategory[signal.category]) {
      byCategory[signal.category] = [];
    }

    byCategory[signal.category].push(signal);
  }

  const strongSignals = signals.filter(
    (signal) => signal.strength >= STRONG_SIGNAL_THRESHOLD,
  );

  const weakSignals = signals.filter(
    (signal) => signal.strength < STRONG_SIGNAL_THRESHOLD,
  );

  return {
    signals,
    byId,
    byCategory,
    strongSignals,
    weakSignals,
  };
}
