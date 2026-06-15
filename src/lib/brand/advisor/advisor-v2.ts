import type { AdvisorV2Result } from "./advisor-v2-types";
import type { OutputPack } from "@/src/lib/i18n/output-packs/output-pack-types";

type BuildAdvisorV2Input = {
  consistency?: {
    consistencyScore?: number;
    dominantArchetype?: string | null;
    dominantWorld?: string | null;
  };

  currentArchetype?: string;
  currentWorld?: string;
};

export function buildAdvisorV2(
  input: BuildAdvisorV2Input,
  pack: OutputPack,
): AdvisorV2Result {
  const warnings: AdvisorV2Result["warnings"] = [];
  const opportunities: AdvisorV2Result["opportunities"] = [];
  const actions: AdvisorV2Result["actions"] = [];
  const governanceSignals: AdvisorV2Result["governanceSignals"] = [];

  const { consistency, currentArchetype, currentWorld } = input;
  const advisor = pack.advisor;

  if (
    consistency?.dominantArchetype &&
    currentArchetype &&
    consistency.dominantArchetype !== currentArchetype
  ) {
    warnings.push({
      severity: "medium",
      message: advisor.warnings.archetypeConflict,
    });

    governanceSignals.push({
      type: "archetype_drift",
      level: "medium",
    });

    actions.push({
      priority: "high",
      action: advisor.actions.reviewArchetypeDrift,
    });
  }

  if (
    consistency?.dominantWorld &&
    currentWorld &&
    consistency.dominantWorld !== currentWorld
  ) {
    warnings.push({
      severity: "medium",
      message: advisor.warnings.worldConflict,
    });

    governanceSignals.push({
      type: "world_drift",
      level: "medium",
    });

    actions.push({
      priority: "medium",
      action: advisor.actions.compareWorldNarrative,
    });
  }

  if (
    typeof consistency?.consistencyScore === "number" &&
    consistency.consistencyScore < 60
  ) {
    warnings.push({
      severity: "high",
      message: advisor.warnings.consistencyWeakening,
    });

    governanceSignals.push({
      type: "consistency_decline",
      level: "high",
    });

    actions.push({
      priority: "medium",
      action: advisor.actions.expandDominantWorld,
    });
  }

  if (
    consistency?.dominantArchetype &&
    currentArchetype &&
    consistency.dominantArchetype === currentArchetype
  ) {
    opportunities.push({
      priority: "medium",
      message: advisor.opportunities.archetypeReinforced,
    });
  }

  if (
    consistency?.dominantWorld &&
    currentWorld &&
    consistency.dominantWorld === currentWorld
  ) {
    opportunities.push({
      priority: "medium",
      message: advisor.opportunities.worldStrengthened,
    });

    actions.push({
      priority: "medium",
      action: advisor.actions.expandDominantWorld,
    });
  }

  if (warnings.length === 0 && opportunities.length === 0) {
    opportunities.push({
      priority: "low",
      message: advisor.opportunities.insufficientMemory,
    });
  }

  return {
    warnings,
    opportunities,
    actions,
    governanceSignals,
  };
}