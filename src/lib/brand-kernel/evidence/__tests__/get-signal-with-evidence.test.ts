import { describe, expect, it } from "vitest";

import { buildEvidenceGraph } from "../build-evidence-graph";
import { getSignalWithEvidence } from "../get-signal-with-evidence";
import { buildSignalRegistry } from "../../signal-registry/build-signal-registry";

describe("getSignalWithEvidence", () => {
  it("returns signal and evidence together", () => {
    const registry = buildSignalRegistry([
      {
        id: "belief_01",
        category: "belief",
        strength: 0.9,
        evidence: "belief",
      },
    ]);

    const graph = buildEvidenceGraph([
      {
        signalId: "belief_01",
        references: [
          {
            answerId: "a1",
            excerpt:
              "I refuse mass production.",
          },
        ],
      },
    ]);

    const result = getSignalWithEvidence(
      registry,
      graph,
      "belief_01",
    );

    expect(result).toBeDefined();

    expect(result?.signal.id).toBe(
      "belief_01",
    );

    expect(
      result?.evidence?.references,
    ).toHaveLength(1);
  });

  it("returns undefined for unknown signal", () => {
    const registry =
      buildSignalRegistry([]);

    const graph =
      buildEvidenceGraph([]);

    const result = getSignalWithEvidence(
      registry,
      graph,
      "missing",
    );

    expect(result).toBeUndefined();
  });
});