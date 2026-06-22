import { describe, expect, it } from "vitest";

import { buildEvidenceGraph } from "../../evidence/build-evidence-graph";
import { buildTraceabilityReport } from "../build-traceability-report";
import { getTraceEvidence } from "../get-trace-evidence";

describe("getTraceEvidence", () => {
  it("returns evidence connected to a manifesto sentence", () => {
    const report = buildTraceabilityReport([
      {
        sentenceId: "m1",
        sentence: "We reject mass production.",
        signalIds: ["belief_01"],
      },
    ]);

    const graph = buildEvidenceGraph([
      {
        signalId: "belief_01",
        references: [
          {
            answerId: "a1",
            excerpt: "I refuse mass production.",
          },
        ],
      },
    ]);

    const result = getTraceEvidence(report, graph, "m1");

    expect(result).toHaveLength(1);
  });

  it("returns empty array when sentence does not exist", () => {
    const report = buildTraceabilityReport([]);

    const graph = buildEvidenceGraph([]);

    const result = getTraceEvidence(report, graph, "missing");

    expect(result).toEqual([]);
  });
});
