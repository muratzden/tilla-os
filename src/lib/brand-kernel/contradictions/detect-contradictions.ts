import { conflictRegistry } from "./conflict-registry";
import type { BrandSignal } from "../signals/types";
import type { BrandTension } from "./types";

export function detectContradictions(
  signals: BrandSignal[]
): BrandTension[] {
  const tensions: BrandTension[] = [];

  for (const conflict of conflictRegistry) {
    const signalA = signals.find(
      (signal) => signal.id === conflict.signalA
    );

    const signalB = signals.find(
      (signal) => signal.id === conflict.signalB
    );

    if (!signalA || !signalB) {
      continue;
    }

    tensions.push({
      type: conflict.type,
      signalA,
      signalB,
      tension: signalA.strength * signalB.strength * conflict.weight,
      reason: conflict.reason,
    });
  }

  return tensions;
}