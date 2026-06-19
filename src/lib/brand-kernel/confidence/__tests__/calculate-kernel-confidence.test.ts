import { describe, expect, it } from "vitest";

import { calculateKernelConfidence } from "../calculate-kernel-confidence";
import type { BrandSignal } from "../../signals/types";
import type { BrandTension } from "../../contradictions/types";

describe("calculateKernelConfidence", () => {
  it("reduces confidence when contradictions exist", () => {
    const signals: BrandSignal[] = [
      {
        id: "s1",
        category: "quality",
        strength: 0.9,
        evidence: ["Strong craftsmanship evidence"],
      },
    ];

    const tensions: BrandTension[] = [
      {
        type: "quality_conflict",
        signalA: signals[0],
        signalB: signals[0],
        tension: 0.75,
        reason: "Quality promise conflicts with production reality.",
      },
    ];

    const report = calculateKernelConfidence(signals, tensions);

    expect(report.contradictionCount).toBe(1);
    expect(report.score).toBe(87);
  });

  it("identifies strong and weak signals", () => {
    const signals: BrandSignal[] = [
      {
        id: "strong",
        category: "quality",
        strength: 0.9,
        evidence: ["Strong evidence"],
      },
      {
        id: "weak",
        category: "audience",
        strength: 0.3,
        evidence: ["Weak evidence"],
      },
    ];

    const report = calculateKernelConfidence(signals, []);

    expect(report.strongSignals).toHaveLength(1);
    expect(report.weakSignals).toHaveLength(1);
  });
});
