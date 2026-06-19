import { describe, expect, it } from "vitest";

import { buildEvidenceGraph } from "../build-evidence-graph";
import { findSignalEvidence } from "../find-signal-evidence";

describe("findSignalEvidence", () => {
  it("returns evidence for a signal", () => {
    const graph = buildEvidenceGraph([
      {
        signalId: "belief_01",
        references: [
          {
            answerId: "a1",
            excerpt:
              "I refuse mass production.",
          },
          {
            answerId: "a2",
            excerpt:
              "Every product should age with its owner.",
          },
        ],
      },
    ]);

    const result = findSignalEvidence(
      graph,
      "belief_01",
    );

    expect(result).toBeDefined();
    expect(result?.references).toHaveLength(2);
  });

  it("returns undefined when signal does not exist", () => {
    const graph = buildEvidenceGraph([]);

    const result = findSignalEvidence(
      graph,
      "missing_signal",
    );

    expect(result).toBeUndefined();
  });
});