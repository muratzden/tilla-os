import { describe, expect, it } from "vitest";

import type { CoverageReport } from "../../coverage/coverage-types";
import type { KernelConfidenceReport } from "../../confidence/confidence-types";
import { evaluateManifestoReadiness } from "../evaluate-manifesto-readiness";

function createReport(
  overrides: Partial<KernelConfidenceReport> = {},
): KernelConfidenceReport {
  return {
    score: 85,
    signalCount: 6,
    contradictionCount: 0,
    strongSignals: [
      {
        id: "signal-1",
        category: "identity",
        strength: 0.9,
        evidence: "Clear identity signal.",
      },
      {
        id: "signal-2",
        category: "audience",
        strength: 0.85,
        evidence: "Clear audience signal.",
      },
      {
        id: "signal-3",
        category: "belief",
        strength: 0.8,
        evidence: "Clear belief signal.",
      },
    ],
    weakSignals: [],
    tensions: [],
    factors: [],
    ...overrides,
  };
}

function createCoverage(
  overrides: Partial<CoverageReport> = {},
): CoverageReport {
  return {
    covered: ["identity", "audience", "belief", "transformation", "principles"],
    missing: [],
    coverageScore: 100,
    ...overrides,
  };
}

describe("evaluateManifestoReadiness", () => {
  it("returns READY when confidence and coverage are sufficient", () => {
    const result = evaluateManifestoReadiness(createReport(), createCoverage());

    expect(result.status).toBe("READY");
    expect(result.confidenceScore).toBe(85);
    expect(result.reasons).toEqual([]);
    expect(result.missingInformation).toEqual([]);
  });

  it("returns NEED_MORE_INFORMATION when confidence is too low", () => {
    const result = evaluateManifestoReadiness(
      createReport({
        score: 55,
      }),
      createCoverage(),
    );

    expect(result.status).toBe("NEED_MORE_INFORMATION");
    expect(result.confidenceScore).toBe(55);
    expect(result.reasons).toContain(
      "Kernel confidence is below the manifesto generation threshold.",
    );
  });

  it("returns NEED_MORE_INFORMATION when coverage is incomplete", () => {
    const result = evaluateManifestoReadiness(
      createReport(),
      createCoverage({
        covered: ["identity", "belief"],
        missing: ["audience", "transformation", "principles"],
        coverageScore: 40,
      }),
    );

    expect(result.status).toBe("NEED_MORE_INFORMATION");
    expect(result.reasons).toContain(
      "Brand foundation coverage is incomplete.",
    );
    expect(result.missingInformation).toContain("audience");
    expect(result.missingInformation).toContain("transformation");
    expect(result.missingInformation).toContain("principles");
  });

  it("returns NEED_MORE_INFORMATION when contradictions are too high", () => {
    const result = evaluateManifestoReadiness(
      createReport({
        contradictionCount: 3,
      }),
      createCoverage(),
    );

    expect(result.status).toBe("NEED_MORE_INFORMATION");
    expect(result.reasons).toContain(
      "Too many contradictions exist in the current brand foundation.",
    );
  });
});
