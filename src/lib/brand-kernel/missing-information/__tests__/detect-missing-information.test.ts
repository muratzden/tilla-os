import { describe, expect, it } from "vitest";

import type { CoverageReport } from "../../coverage/coverage-types";
import type { KernelConfidenceReport } from "../../confidence/confidence-types";
import { detectMissingInformation } from "../detect-missing-information";

function createReport(
  overrides: Partial<KernelConfidenceReport> = {},
): KernelConfidenceReport {
  return {
    score: 85,
    signalCount: 6,
    contradictionCount: 0,
    strongSignals: [
      {
        id: "s1",
        category: "identity",
        strength: 0.9,
        evidence: "identity",
      },
      {
        id: "s2",
        category: "audience",
        strength: 0.8,
        evidence: "audience",
      },
      {
        id: "s3",
        category: "belief",
        strength: 0.85,
        evidence: "belief",
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
    covered: [
      "identity",
      "audience",
      "belief",
      "transformation",
      "principles",
    ],
    missing: [],
    coverageScore: 100,
    ...overrides,
  };
}

describe("detectMissingInformation", () => {
  it("returns no questions when evidence and coverage are sufficient", () => {
    const result = detectMissingInformation(
      createReport(),
      createCoverage(),
    );

    expect(result.questions).toHaveLength(0);
  });

  it("asks targeted questions for missing coverage areas", () => {
    const result = detectMissingInformation(
      createReport(),
      createCoverage({
        covered: ["identity", "belief"],
        missing: ["audience", "transformation", "principles"],
        coverageScore: 40,
      }),
    );

    expect(result.questions).toContain(
      "Who is the brand trying to serve or transform?",
    );
    expect(result.questions).toContain(
      "What change should the customer experience after choosing this brand?",
    );
    expect(result.questions).toContain(
      "What should never be compromised, even for growth?",
    );
  });

  it("asks for evidence when confidence is low", () => {
    const result = detectMissingInformation(
      createReport({
        score: 40,
      }),
      createCoverage(),
    );

    expect(result.questions).toContain(
      "Which evidence best proves the brand direction?",
    );
  });

  it("asks for clarification when contradictions are high", () => {
    const result = detectMissingInformation(
      createReport({
        contradictionCount: 3,
      }),
      createCoverage(),
    );

    expect(result.questions).toContain(
      "Which direction best represents the brand?",
    );
  });
});