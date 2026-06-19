import { describe, expect, it } from "vitest";

import { evaluateManifestoGate } from "../evaluate-manifesto-gate";
import type { BrandSignal } from "../../signals/types";

describe("evaluateManifestoGate", () => {
  it("returns a complete manifesto gate report", () => {
    const signals: BrandSignal[] = [
      {
        id: "s1",
        category: "identity",
        strength: 0.9,
        evidence: "The brand has a clear identity.",
      },
      {
        id: "s2",
        category: "audience",
        strength: 0.85,
        evidence: "The brand knows who it serves.",
      },
      {
        id: "s3",
        category: "belief",
        strength: 0.8,
        evidence: "The brand has a clear belief.",
      },
      {
        id: "s4",
        category: "transformation",
        strength: 0.8,
        evidence: "The brand promises a clear transformation.",
      },
      {
        id: "s5",
        category: "principles",
        strength: 0.8,
        evidence: "The brand has non-negotiable principles.",
      },
    ];

    const result = evaluateManifestoGate(signals);

    expect(result.coverage.coverageScore).toBe(100);
    expect(result.confidence.signalCount).toBe(5);
    expect(result.readiness.status).toBe("READY");
    expect(result.missingInformation.questions).toHaveLength(0);
  });

  it("blocks manifesto readiness when coverage is incomplete", () => {
    const signals: BrandSignal[] = [
      {
        id: "s1",
        category: "identity",
        strength: 0.9,
        evidence: "The brand has a clear identity.",
      },
    ];

    const result = evaluateManifestoGate(signals);

    expect(result.coverage.missing).toContain("audience");
    expect(result.readiness.status).toBe("NEED_MORE_INFORMATION");
    expect(result.missingInformation.questions.length).toBeGreaterThan(0);
  });
});