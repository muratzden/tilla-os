import { describe, expect, it } from "vitest";

import { buildMissionControlIntelligence } from "../mission-control-intelligence";

describe("Mission Control Intelligence", () => {
  it("builds diagnosis, risks, opportunities and priorities", () => {
    const report =
      buildMissionControlIntelligence([
        {
          id: "1",
          category: "identity",
          strength: 0.9,
          evidence: [],
        },
        {
          id: "2",
          category: "positioning",
          strength: 0.8,
          evidence: [],
        },
        {
          id: "3",
          category: "trust",
          strength: 0.7,
          evidence: [],
        },
      ]);

    expect(report.score).toBeGreaterThan(0);

    expect(
      report.diagnosis.length
    ).toBeGreaterThan(0);

    expect(
      report.risks.length
    ).toBeGreaterThan(0);

    expect(
      report.opportunities.length
    ).toBeGreaterThan(0);

    expect(
      report.priorities.length
    ).toBeGreaterThan(0);

    expect(
      report.nextBestAction.length
    ).toBeGreaterThan(0);
  });
});