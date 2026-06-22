import type {
  BrandEvent,
  BrandMemory,
  BrandObservation,
  DecisionOutcome,
  DecisionRecord,
  LifecycleTransition,
  MemoryEntry,
  ScoreSnapshot,
} from "./types";

export function createMemoryEntry(
  input: Omit<MemoryEntry, "id" | "createdAt">,
  now = new Date().toISOString(),
): MemoryEntry {
  return {
    id: `mem_${now.replace(/[^0-9]/g, "")}_${input.type}`,
    createdAt: now,
    ...input,
  };
}

export function addMemoryEntry(
  memory: BrandMemory,
  entry: MemoryEntry,
): BrandMemory {
  return {
    ...memory,
    entries: [...memory.entries, entry],
    lastUpdatedAt: entry.createdAt,
  };
}

export function resolveOpenQuestion(
  memory: BrandMemory,
  question: string,
  now = new Date().toISOString(),
): BrandMemory {
  const unresolvedQuestions = memory.unresolvedQuestions.filter(
    (item) => item !== question,
  );

  return {
    ...memory,
    entries: memory.entries,
    unresolvedQuestions,
    openQuestions: unresolvedQuestions,
    lastUpdatedAt: now,
  };
}

export function addMemoryEvent(
  memory: BrandMemory,
  event: BrandEvent,
): BrandMemory {
  return {
    ...memory,
    events: [...memory.events, event],
    lastUpdatedAt: event.createdAt,
  };
}

export function addMemoryObservation(
  memory: BrandMemory,
  observation: BrandObservation,
): BrandMemory {
  return {
    ...memory,
    observations: [...memory.observations, observation],
    lastUpdatedAt: observation.createdAt,
  };
}

export function addMemoryDecision(
  memory: BrandMemory,
  decision: DecisionRecord,
): BrandMemory {
  const decisions = memory.decisions.some((item) => item.id === decision.id)
    ? memory.decisions.map((item) =>
        item.id === decision.id ? decision : item,
      )
    : [...memory.decisions, decision];

  return {
    ...memory,
    decisions,
    lastUpdatedAt: decision.resolvedAt ?? decision.createdAt,
  };
}

export function addMemoryDecisionOutcome(
  memory: BrandMemory,
  outcome: DecisionOutcome,
): BrandMemory {
  const decisionOutcomes = memory.decisionOutcomes.some(
    (item) => item.decisionId === outcome.decisionId,
  )
    ? memory.decisionOutcomes.map((item) =>
        item.decisionId === outcome.decisionId ? outcome : item,
      )
    : [...memory.decisionOutcomes, outcome];

  return {
    ...memory,
    decisionOutcomes,
    lastUpdatedAt: outcome.updatedAt,
  };
}

export function syncMemoryDecisions(
  memory: BrandMemory,
  decisions: DecisionRecord[],
  now = new Date().toISOString(),
): BrandMemory {
  return {
    ...memory,
    decisions,
    lastUpdatedAt: now,
  };
}

export function addScoreSnapshot(
  memory: BrandMemory,
  scoreSnapshot: ScoreSnapshot,
): BrandMemory {
  return {
    ...memory,
    scoreSnapshots: [...memory.scoreSnapshots, scoreSnapshot],
    lastUpdatedAt: scoreSnapshot.createdAt,
  };
}

export function addLifecycleTransition(
  memory: BrandMemory,
  transition: LifecycleTransition,
): BrandMemory {
  return {
    ...memory,
    lifecycleTransitions: [...memory.lifecycleTransitions, transition],
    lastUpdatedAt: transition.createdAt,
  };
}
