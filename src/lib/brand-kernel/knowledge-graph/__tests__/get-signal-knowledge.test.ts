import { describe, expect, it } from "vitest";

import { buildEvidenceGraph } from "../../evidence/build-evidence-graph";
import { buildSignalRegistry } from "../../signal-registry/build-signal-registry";
import { buildTraceabilityReport } from "../../traceability/build-traceability-report";
import { buildKnowledgeGraph } from "../build-knowledge-graph";
import { getSignalKnowledge } from "../get-signal-knowledge";

describe("getSignalKnowledge", () => {
  it("returns signal, evidence and traces", () => {
    const registry = buildSignalRegistry([
      {
        id: "belief_01",
        category: "belief",
        strength: 0.9,
        evidence: "belief",
      },
    ]);

    const evidence = buildEvidenceGraph([
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

    const traceability = buildTraceabilityReport([
      {
        sentenceId: "m1",
        sentence: "We reject mass production.",
        signalIds: ["belief_01"],
      },
    ]);

    const graph = buildKnowledgeGraph(registry, evidence, traceability);

    const result = getSignalKnowledge(graph, "belief_01");

    expect(result).toBeDefined();
    expect(result?.traces).toHaveLength(1);
    expect(result?.evidence?.references).toHaveLength(1);
  });
});
