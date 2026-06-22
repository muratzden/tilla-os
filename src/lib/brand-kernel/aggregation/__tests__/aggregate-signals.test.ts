import { describe, expect, it } from "vitest";

import { aggregateSignals } from "../aggregate-signals";

describe("aggregateSignals", () => {
  it("groups signals by category", () => {
    const report = aggregateSignals([
      {
        signal: {
          id: "1",
          category: "audience",
          strength: 0.8,
          evidence: [],
        },
        evidence: [],
        rationale: "first",
      },
      {
        signal: {
          id: "2",
          category: "audience",
          strength: 0.9,
          evidence: [],
        },
        evidence: [],
        rationale: "second",
      },
    ]);

    expect(report.aggregatedSignals).toHaveLength(1);

    expect(report.aggregatedSignals[0].signals).toHaveLength(2);
  });
});
