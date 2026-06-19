import { describe, expect, it } from "vitest";

import { aggregateSignals } from "../../aggregation";
import { validateSignals } from "../validate-signals";

describe("signal validation pipeline", () => {
  it("approves aggregated signals with enough evidence", () => {
    const aggregationReport = aggregateSignals([
      {
        signal: {
          id: "audience_1",
          category: "audience",
          strength: 0.8,
          evidence: ["We serve makers."],
        },
        evidence: [
          {
            answerId: "answer_1",
            excerpt: "We serve makers.",
          },
        ],
        rationale: "Audience signal.",
      },
      {
        signal: {
          id: "audience_2",
          category: "audience",
          strength: 0.8,
          evidence: ["Our customers value craft."],
        },
        evidence: [
          {
            answerId: "answer_2",
            excerpt: "Our customers value craft.",
          },
        ],
        rationale: "Audience signal.",
      },
    ]);

    const validationReport = validateSignals(
      aggregationReport.aggregatedSignals,
    );

    expect(validationReport.approved).toHaveLength(1);
    expect(validationReport.needsMoreEvidence).toHaveLength(0);
    expect(validationReport.approved[0].evidenceCount).toBe(2);
  });
});