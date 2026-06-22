import { aggregateSignals } from "./aggregation";
import { generateConstitution } from "./constitution-generator";
import { generateDecisionPolicies } from "./decision-policy-generator";
import { extractSignals } from "./extraction-engine";
import { populateBrandGraph } from "./graph-population-engine";
import type { KernelInput, KernelOutput } from "./kernel-types";
import { evaluateManifestoGate } from "./manifesto-gate/evaluate-manifesto-gate";
import { discoverManifesto } from "./manifesto-discovery-engine";
import { runKernelMissionControl } from "./mission-control-engine";
import { buildMissionControlIntelligence } from "./mission-control-intelligence/mission-control-intelligence";
import { adaptFounderSignalsToBrandSignals } from "./signals/adapt-founder-signals";
import type { BrandSignal } from "./signals/types";
import { validateSignals } from "./validation";

function flattenApprovedSignals(
  validation: ReturnType<typeof validateSignals>,
): BrandSignal[] {
  const signalsById = new Map<string, BrandSignal>();

  for (const result of validation.approved) {
    for (const signal of result.signal.signals) {
      const existing = signalsById.get(signal.id);

      if (existing) {
        existing.strength = Math.max(existing.strength, signal.strength);
        existing.evidence = Array.from(
          new Set([...existing.evidence, ...signal.evidence]),
        );
        continue;
      }

      signalsById.set(signal.id, {
        ...signal,
        evidence: [...signal.evidence],
      });
    }
  }

  return Array.from(signalsById.values());
}

export async function runBrandKernel(
  input: KernelInput,
): Promise<KernelOutput> {
  const signals = await extractSignals(input.rawAnswers);

  const brandSignals = adaptFounderSignalsToBrandSignals(signals);

  const aggregation = aggregateSignals(
    brandSignals.map((signal) => ({
      signal,
      evidence: signal.evidence.map((text, index) => ({
        answerId: `legacy-founder-signal-${signal.id}-${index}`,
        excerpt: text,
      })),
      rationale: `Adapted from founder signal evidence for ${signal.id}.`,
    })),
  );

  const validation = validateSignals(aggregation.aggregatedSignals);

  const approvedSignals = flattenApprovedSignals(validation);

  const manifestoGate = evaluateManifestoGate(approvedSignals);

  const graph = populateBrandGraph(approvedSignals);

  const manifesto =
    manifestoGate.readiness.status === "READY"
      ? discoverManifesto(approvedSignals)
      : null;

  const constitution = manifesto ? generateConstitution(manifesto) : null;

  const policies = constitution ? generateDecisionPolicies(constitution) : [];

  const missionControl = runKernelMissionControl(graph);

  const missionControlIntelligence =
    buildMissionControlIntelligence(approvedSignals);

  return {
    signals,
    brandSignals,
    approvedSignals,
    aggregation,
    validation,
    manifestoGate,
    missionControlIntelligence,
    graph,
    manifesto,
    constitution,
    policies,
    missionControl,
  };
}
