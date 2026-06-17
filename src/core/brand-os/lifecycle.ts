import type { BrandLifecycleStage, BrandOperatingState, LifecycleRequirement, LifecycleTransition } from "./types";

export const BRAND_LIFECYCLE: BrandLifecycleStage[] = [
  "idea",
  "foundation",
  "positioning",
  "trust_building",
  "authority_building",
  "growth",
  "optimization"
];

function hasText(value: string | null): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function getLifecycleRequirements(state: BrandOperatingState, stage: BrandLifecycleStage): LifecycleRequirement[] {
  const requirements: Record<BrandLifecycleStage, LifecycleRequirement[]> = {
    idea: [
      { field: "brand.idea", met: hasText(state.brand.idea), description: "Brand idea exists." },
      { field: "brand.brandType", met: hasText(state.brand.brandType), description: "Brand type exists." }
    ],
    foundation: [
      { field: "audience.primary", met: hasText(state.audience.primary), description: "Primary audience is defined." },
      { field: "audience.desiredOutcome", met: hasText(state.audience.desiredOutcome), description: "Audience outcome is defined." },
      { field: "offer.core", met: hasText(state.offer.core), description: "Core offer is defined." }
    ],
    positioning: [
      { field: "positioning.category", met: hasText(state.positioning.category), description: "Category is defined." },
      { field: "positioning.promise", met: hasText(state.positioning.promise), description: "Promise is defined." },
      { field: "positioning.differentiators", met: state.positioning.differentiators.length > 0, description: "Differentiators exist." }
    ],
    trust_building: [
      { field: "trust.signals", met: state.trust.signals.length > 0, description: "Trust signals exist." },
      { field: "positioning.proofPoints", met: state.positioning.proofPoints.length > 0, description: "Proof points exist." }
    ],
    authority_building: [
      { field: "authority.themes", met: state.authority.themes.length > 0, description: "Authority themes exist." },
      { field: "authority.evidence", met: state.authority.evidence.length > 0, description: "Authority evidence exists." }
    ],
    growth: [
      { field: "channels.primary", met: state.channels.primary.length > 0, description: "Primary channel exists." },
      { field: "growth.objectives", met: state.growth.objectives.length > 0, description: "Growth objective exists." },
      { field: "growth.loops", met: state.growth.loops.length > 0, description: "Growth loop exists." }
    ],
    optimization: [
      {
        field: "memory.scoreSnapshots",
        met: state.memory.scoreSnapshots.length >= 3,
        description: "At least three score snapshots exist for optimization."
      },
      {
        field: "memory.decisions",
        met: state.memory.decisions.some((decision) => decision.status === "accepted"),
        description: "At least one decision has been accepted."
      },
      {
        field: "memory.observations",
        met: state.memory.observations.length >= 2,
        description: "At least two observations exist before optimization."
      },
      {
        field: "score.clarity",
        met: state.score.clarity.score >= 70,
        description: "Clarity score is strong enough for optimization."
      },
      {
        field: "score.audienceFit",
        met: state.score.audienceFit.score >= 70,
        description: "Audience fit score is strong enough for optimization."
      },
      {
        field: "score.differentiation",
        met: state.score.differentiation.score >= 70,
        description: "Differentiation score is strong enough for optimization."
      },
      {
        field: "score.trust",
        met: state.score.trust.score >= 65,
        description: "Trust score is strong enough for optimization."
      },
      {
        field: "score.growthReadiness",
        met: state.score.growthReadiness.score >= 65,
        description: "Growth readiness is strong enough for optimization."
      }
    ]
  };

  return requirements[stage];
}

export function getLifecycleBlockers(state: BrandOperatingState, stage: BrandLifecycleStage): string[] {
  return getLifecycleRequirements(state, stage)
    .filter((requirement) => !requirement.met)
    .map((requirement) => requirement.field);
}

function stageIsMet(state: BrandOperatingState, stage: BrandLifecycleStage): boolean {
  return getLifecycleRequirements(state, stage).every((requirement) => requirement.met);
}

export function determineLifecycleStage(state: BrandOperatingState): BrandLifecycleStage {
  let current: BrandLifecycleStage = "idea";

  for (const stage of BRAND_LIFECYCLE) {
    if (!stageIsMet(state, stage)) {
      return current;
    }

    current = stage;
  }

  return current;
}

export function getLifecycleFocus(stage: BrandLifecycleStage): string {
  const focusByStage: Record<BrandLifecycleStage, string> = {
    idea: "Turn the initial idea into a usable brand foundation.",
    foundation: "Clarify audience, outcome, category, and basic offer.",
    positioning: "Make the brand easier to understand, choose, and remember.",
    trust_building: "Build credibility through proof, consistency, and reduced risk.",
    authority_building: "Create a recognizable point of view and evidence base.",
    growth: "Choose repeatable channels and measurable growth loops.",
    optimization: "Improve what already works and remove strategic drag."
  };

  return focusByStage[stage];
}

export function createLifecycleTransition(
  from: BrandLifecycleStage,
  to: BrandLifecycleStage,
  state: BrandOperatingState,
  now = new Date().toISOString()
): LifecycleTransition | undefined {
  if (from === to) return undefined;

  const blockers = getLifecycleBlockers(state, to);

  return {
    id: `lifecycle_${now.replace(/[^0-9]/g, "")}`,
    from,
    to,
    reason:
      blockers.length === 0
        ? `Lifecycle moved from ${from} to ${to} because stage requirements were met.`
        : `Lifecycle moved from ${from} to ${to}; remaining blockers are tracked for the new stage.`,
    createdAt: now,
    blockers
  };
}
