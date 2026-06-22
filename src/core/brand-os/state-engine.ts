import {
  DEFAULT_AUDIENCE,
  DEFAULT_AUTHORITY,
  DEFAULT_CHANNELS,
  DEFAULT_GROWTH,
  DEFAULT_OFFER,
  DEFAULT_POSITIONING,
  DEFAULT_TRUST,
  createDefaultMemory,
} from "./defaults";
import {
  acceptDecisionRecord,
  createInitialDecisions,
  refreshDecisions,
} from "./decision-engine";
import { INTELLIGENCE_PACKS } from "./intelligence-packs";
import {
  createLifecycleTransition,
  determineLifecycleStage,
} from "./lifecycle";
import { createMissionControlState } from "./mission-control";
import {
  addLifecycleTransition,
  addMemoryDecision,
  addMemoryDecisionOutcome,
  addMemoryEntry,
  addMemoryEvent,
  addMemoryObservation,
  addScoreSnapshot,
  createMemoryEntry,
  syncMemoryDecisions,
} from "./memory";
import { normalizeBrandOSInput, normalizeBrandOSUpdate } from "./normalization";
import { CURRENT_BRAND_OS_SCHEMA_VERSION } from "./schema";
import { calculateBrandScore, createScoreSnapshot } from "./scoring";
import { STUDIOS } from "./studios";
import type {
  BrandEvent,
  BrandObservation,
  BrandOperatingState,
  BrandOSUpdateInput,
  BrandSeedInput,
  DecisionArea,
  DecisionImpact,
  DecisionOutcome,
  DecisionRecord,
  ScoreSnapshot,
  StateChangeResult,
  StudioId,
} from "./types";
import type { MissionControlIntelligenceReport } from "@/src/lib/brand-kernel/mission-control-intelligence/mission-control-types";

export interface RecordDecisionOutcomePayload {
  decisionId: string;
  status: "in_progress" | "validated" | "failed" | "cancelled";
  evidence?: string;
  actualImpact?: DecisionImpact;
}

function createBrandId(input: BrandSeedInput, now: string): string {
  const base = `${input.brandType}-${input.idea}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  const stamp = now.replace(/[^0-9]/g, "").slice(0, 14);
  return `brand_${base || "seed"}_${stamp}`;
}

function createEvent(
  type: BrandEvent["type"],
  summary: string,
  now: string,
  payload?: Record<string, unknown>,
): BrandEvent {
  return {
    id: `event_${type}_${now.replace(/[^0-9]/g, "")}`,
    type,
    summary,
    createdAt: now,
    ...(payload ? { payload } : {}),
  };
}

function createEmptyMissionControl(): BrandOperatingState["missionControl"] {
  return {
    readinessScore: 0,
    diagnosis: "",
    rankedBottlenecks: [],
    bottleneck: "clarity",
    nextBestAction: "",
    recommendedStudio: "foundation",
    strategicFocus: "",
    missingInputs: [],
    actionPlan: [],
    expectedImpact: [],
  };
}

function createExpectedImpact(decision: DecisionRecord): DecisionImpact {
  if (decision.selectedOption) {
    return decision.selectedOption.expectedImpact;
  }

  return {
    dimension: decision.relatedBottleneck ?? decision.area,
    direction: "neutral",
    magnitude: "medium",
    rationale: decision.impact.join(" "),
  };
}

function createDecisionOutcome(
  decision: DecisionRecord,
  now: string,
): DecisionOutcome {
  return {
    decisionId: decision.id,
    ...(decision.selectedOptionId
      ? { selectedOptionId: decision.selectedOptionId }
      : {}),
    expectedImpact: createExpectedImpact(decision),
    status: "pending",
    createdAt: now,
    updatedAt: now,
    validationEvidence: [],
  };
}

function storeEvents(
  state: BrandOperatingState,
  events: BrandEvent[],
): BrandOperatingState {
  return {
    ...state,
    memory: events.reduce(
      (memory, event) => addMemoryEvent(memory, event),
      state.memory,
    ),
  };
}

function finalizeStateChange(
  state: BrandOperatingState,
  events: BrandEvent[],
  now = new Date().toISOString(),
  kernelIntelligence?: MissionControlIntelligenceReport,
): StateChangeResult {
  const score = calculateBrandScore(state);
  const scoreSnapshot = createScoreSnapshot(score, now);
  const stateWithScore: BrandOperatingState = {
    ...state,
    score,
    memory: addScoreSnapshot(state.memory, scoreSnapshot),
  };
  const lifecycleStage = determineLifecycleStage(stateWithScore);
  const stateWithLifecycle: BrandOperatingState = {
    ...stateWithScore,
    lifecycleStage,
  };
  const lifecycleTransition = createLifecycleTransition(
    state.lifecycleStage,
    lifecycleStage,
    stateWithLifecycle,
    now,
  );
  const recalculatedEvent = createEvent(
    "score_recalculated",
    "Brand OS score was recalculated.",
    now,
    {
      readinessScore: scoreSnapshot.readinessScore,
    },
  );
  const transitionEvents = lifecycleTransition
    ? [
        createEvent("lifecycle_transitioned", lifecycleTransition.reason, now, {
          from: lifecycleTransition.from,
          to: lifecycleTransition.to,
        }),
      ]
    : [];
  const allEvents = [...events, recalculatedEvent, ...transitionEvents];
  const memoryWithTransition = lifecycleTransition
    ? addLifecycleTransition(stateWithLifecycle.memory, lifecycleTransition)
    : stateWithLifecycle.memory;
  const stateBeforeMissionControl = storeEvents(
    {
      ...stateWithLifecycle,
      memory: memoryWithTransition,
    },
    allEvents,
  );
  const stateWithMissionControl: BrandOperatingState = {
    ...stateBeforeMissionControl,
    missionControl: createMissionControlState(
      stateBeforeMissionControl,
      kernelIntelligence,
    ),
  };
  const refreshedDecisions = refreshDecisions(stateWithMissionControl, now);
  const decisionRefreshEvents = refreshedDecisions
    .filter(
      (decision) =>
        !stateWithMissionControl.decisions.some(
          (existingDecision) => existingDecision.id === decision.id,
        ),
    )
    .map((decision) =>
      createEvent(
        "decision_proposed",
        `Decision proposed: ${decision.question}`,
        decision.createdAt,
        {
          decisionId: decision.id,
          area: decision.area,
          source: decision.source,
        },
      ),
    );
  const supersededEvents = refreshedDecisions
    .filter((decision) => {
      const previousDecision = stateWithMissionControl.decisions.find(
        (existingDecision) => existingDecision.id === decision.id,
      );
      return (
        previousDecision?.status === "proposed" &&
        decision.status === "superseded"
      );
    })
    .map((decision) =>
      createEvent(
        "decision_rejected",
        `Decision superseded: ${decision.question}`,
        decision.resolvedAt ?? now,
        {
          decisionId: decision.id,
          area: decision.area,
          status: "superseded",
        },
      ),
    );
  const finalEvents = [
    ...allEvents,
    ...decisionRefreshEvents,
    ...supersededEvents,
  ];
  const finalStateBeforeEventStore: BrandOperatingState = {
    ...stateWithMissionControl,
    decisions: refreshedDecisions,
    memory: syncMemoryDecisions(
      stateWithMissionControl.memory,
      refreshedDecisions,
      now,
    ),
  };
  const finalState = storeEvents(finalStateBeforeEventStore, [
    ...decisionRefreshEvents,
    ...supersededEvents,
  ]);

  return {
    state: finalState,
    events: finalEvents,
    scoreSnapshot,
    ...(lifecycleTransition ? { lifecycleTransition } : {}),
  };
}

export function initializeBrandOS(
  input: BrandSeedInput,
  now = new Date().toISOString(),
): StateChangeResult {
  const normalizedInput = normalizeBrandOSInput(input);
  const initializedEvent = createEvent(
    "initialized",
    "Brand OS was initialized from a seed input.",
    now,
    {
      brandType: normalizedInput.brandType,
    },
  );
  const seedMemory = addMemoryEntry(
    createDefaultMemory(now),
    createMemoryEntry(
      {
        type: "input",
        summary: `Initialized from idea "${normalizedInput.idea}" and brand type "${normalizedInput.brandType}".`,
        tags: ["seed", "foundation"],
      },
      now,
    ),
  );
  const partialState = {
    schemaVersion: CURRENT_BRAND_OS_SCHEMA_VERSION,
    id: createBrandId(normalizedInput, now),
    createdAt: now,
    lifecycleStage: "idea" as const,
    brand: normalizedInput,
    audience: { ...DEFAULT_AUDIENCE },
    positioning: { ...DEFAULT_POSITIONING },
    trust: { ...DEFAULT_TRUST },
    authority: { ...DEFAULT_AUTHORITY },
    offer: { ...DEFAULT_OFFER },
    channels: { ...DEFAULT_CHANNELS },
    growth: { ...DEFAULT_GROWTH },
    memory: seedMemory,
    studios: STUDIOS,
    intelligencePacks: INTELLIGENCE_PACKS,
    decisions: [],
    score: calculateBrandScore({
      schemaVersion: CURRENT_BRAND_OS_SCHEMA_VERSION,
      id: createBrandId(normalizedInput, now),
      createdAt: now,
      brand: normalizedInput,
      audience: { ...DEFAULT_AUDIENCE },
      positioning: { ...DEFAULT_POSITIONING },
      trust: { ...DEFAULT_TRUST },
      authority: { ...DEFAULT_AUTHORITY },
      offer: { ...DEFAULT_OFFER },
      channels: { ...DEFAULT_CHANNELS },
      growth: { ...DEFAULT_GROWTH },
      memory: seedMemory,
      studios: STUDIOS,
      intelligencePacks: INTELLIGENCE_PACKS,
      decisions: [],
    }),
    missionControl: createEmptyMissionControl(),
  };
  const initialDecisions = createInitialDecisions(partialState);
  const memoryWithDecisions = initialDecisions.reduce(
    (memory, decision) => addMemoryDecision(memory, decision),
    partialState.memory,
  );

  return finalizeStateChange(
    {
      ...partialState,
      memory: memoryWithDecisions,
      decisions: initialDecisions,
    },
    [
      initializedEvent,
      ...initialDecisions.map((decision) =>
        createEvent(
          "decision_proposed",
          `Decision proposed: ${decision.question}`,
          decision.createdAt,
          {
            decisionId: decision.id,
            area: decision.area,
          },
        ),
      ),
    ],
    now,
  );
}

export function applyBrandInput(
  state: BrandOperatingState,
  input: BrandOSUpdateInput,
  now = new Date().toISOString(),
  kernelIntelligence?: MissionControlIntelligenceReport,
): StateChangeResult {
  const normalizedInput = normalizeBrandOSUpdate(input);
  const event = createEvent(
    "input_applied",
    "Brand input was applied to the operating state.",
    now,
    {
      groups: Object.keys(normalizedInput),
    },
  );

  return finalizeStateChange(
    {
      ...state,
      audience: { ...state.audience, ...normalizedInput.audience },
      positioning: { ...state.positioning, ...normalizedInput.positioning },
      trust: { ...state.trust, ...normalizedInput.trust },
      authority: { ...state.authority, ...normalizedInput.authority },
      offer: { ...state.offer, ...normalizedInput.offer },
      channels: { ...state.channels, ...normalizedInput.channels },
      growth: { ...state.growth, ...normalizedInput.growth },
      memory: addMemoryEntry(
        state.memory,
        createMemoryEntry(
          {
            type: "input",
            summary: `Applied brand input groups: ${Object.keys(normalizedInput).join(", ")}.`,
            tags: ["input", "progress"],
          },
          now,
        ),
      ),
    },
    [event],
    now,
    kernelIntelligence,
  );
}

export function completeStudioStep(
  state: BrandOperatingState,
  studioId: StudioId,
  output: BrandOSUpdateInput,
  now = new Date().toISOString(),
): StateChangeResult {
  const inputResult = applyBrandInput(state, output, now);
  const event = createEvent(
    "studio_completed",
    `Studio step completed: ${studioId}.`,
    now,
    { studioId },
  );

  return finalizeStateChange(
    storeEvents(inputResult.state, [event]),
    [event],
    now,
  );
}

export function acceptDecision(
  state: BrandOperatingState,
  decisionId: string,
  selectedOptionId?: string,
  now = new Date().toISOString(),
): StateChangeResult {
  const existingDecision = state.decisions.find(
    (decision) => decision.id === decisionId,
  );

  if (!existingDecision) {
    const event = createEvent(
      "decision_rejected",
      `Decision not found: ${decisionId}.`,
      now,
      { decisionId },
    );
    return finalizeStateChange(state, [event], now);
  }

  const acceptedDecision = acceptDecisionRecord(
    existingDecision,
    now,
    selectedOptionId,
  );
  const decisions = state.decisions.map((decision) =>
    decision.id === decisionId ? acceptedDecision : decision,
  );
  const event = createEvent(
    "decision_accepted",
    `Decision accepted: ${acceptedDecision.question}`,
    now,
    {
      decisionId,
      area: acceptedDecision.area,
      ...(acceptedDecision.selectedOption
        ? {
            selectedOptionId: acceptedDecision.selectedOption.id,
            selectedOptionLabel: acceptedDecision.selectedOption.label,
            selectedOptionStrategy: acceptedDecision.selectedOption.strategy,
          }
        : {}),
    },
  );
  const outcome = createDecisionOutcome(acceptedDecision, now);
  const outcomeEvent = createEvent(
    "decision_outcome_created",
    `Decision outcome created: ${acceptedDecision.question}`,
    now,
    {
      decisionId,
      status: outcome.status,
      expectedImpact: outcome.expectedImpact,
      ...(outcome.selectedOptionId
        ? { selectedOptionId: outcome.selectedOptionId }
        : {}),
    },
  );
  const selectedOptionSummary = acceptedDecision.selectedOption
    ? ` Selected option: ${acceptedDecision.selectedOption.label}.`
    : "";

  return finalizeStateChange(
    {
      ...state,
      decisions,
      memory: addMemoryDecisionOutcome(
        addMemoryDecision(
          addMemoryEntry(
            state.memory,
            createMemoryEntry(
              {
                type: "decision",
                summary: `Accepted decision: ${acceptedDecision.question}.${selectedOptionSummary}`,
                tags: ["decision", acceptedDecision.area],
              },
              now,
            ),
          ),
          acceptedDecision,
        ),
        outcome,
      ),
    },
    [event, outcomeEvent],
    now,
  );
}

export function recordDecisionOutcome(
  state: BrandOperatingState,
  payload: RecordDecisionOutcomePayload,
  now = new Date().toISOString(),
): StateChangeResult {
  const existingOutcome = state.memory.decisionOutcomes.find(
    (outcome) => outcome.decisionId === payload.decisionId,
  );

  if (!existingOutcome) {
    const event = createEvent(
      "decision_rejected",
      `Decision outcome not found: ${payload.decisionId}.`,
      now,
      {
        decisionId: payload.decisionId,
      },
    );
    return finalizeStateChange(state, [event], now);
  }

  const evidence = payload.evidence?.replace(/\s+/g, " ").trim();
  const updatedOutcome: DecisionOutcome = {
    ...existingOutcome,
    status: payload.status,
    updatedAt: now,
    validationEvidence: evidence
      ? Array.from(new Set([...existingOutcome.validationEvidence, evidence]))
      : existingOutcome.validationEvidence,
    ...(payload.actualImpact ? { actualImpact: payload.actualImpact } : {}),
  };
  const event = createEvent(
    "decision_outcome_updated",
    `Decision outcome updated: ${payload.status}.`,
    now,
    {
      decisionId: payload.decisionId,
      status: payload.status,
      ...(evidence ? { evidence } : {}),
      ...(payload.actualImpact ? { actualImpact: payload.actualImpact } : {}),
    },
  );

  return finalizeStateChange(
    {
      ...state,
      memory: addMemoryDecisionOutcome(
        addMemoryEntry(
          state.memory,
          createMemoryEntry(
            {
              type: "decision",
              summary: `Decision outcome ${payload.status}: ${payload.decisionId}${evidence ? ` Evidence: ${evidence}.` : "."}`,
              tags: ["decision", "outcome", payload.status],
            },
            now,
          ),
        ),
        updatedOutcome,
      ),
    },
    [event],
    now,
  );
}

export function recordObservation(
  state: BrandOperatingState,
  summary: string,
  area?: DecisionArea,
  evidence: string[] = [],
  now = new Date().toISOString(),
): StateChangeResult {
  const observation: BrandObservation = {
    id: `observation_${now.replace(/[^0-9]/g, "")}`,
    summary: summary.replace(/\s+/g, " ").trim(),
    ...(area ? { area } : {}),
    evidence: evidence
      .map((item) => item.replace(/\s+/g, " ").trim())
      .filter(Boolean),
    createdAt: now,
  };
  const event = createEvent(
    "observation_recorded",
    `Observation recorded: ${observation.summary}`,
    now,
    {
      observationId: observation.id,
      area,
    },
  );

  return finalizeStateChange(
    {
      ...state,
      trust:
        area === "trust"
          ? {
              ...state.trust,
              signals: Array.from(
                new Set([...state.trust.signals, observation.summary]),
              ),
            }
          : state.trust,
      memory: addMemoryObservation(
        addMemoryEntry(
          state.memory,
          createMemoryEntry(
            {
              type: "observation",
              summary: observation.summary,
              tags: ["observation", ...(area ? [area] : [])],
            },
            now,
          ),
        ),
        observation,
      ),
    },
    [event],
    now,
  );
}

export function recalculateBrandOS(
  state: BrandOperatingState,
  now = new Date().toISOString(),
): StateChangeResult {
  return finalizeStateChange(state, [], now);
}
