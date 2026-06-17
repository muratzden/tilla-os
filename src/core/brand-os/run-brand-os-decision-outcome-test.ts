import { POST } from "../../../app/api/core/brand-os/route";
import {
  acceptDecision,
  applyBrandInput,
  completeStudioStep,
  initializeBrandOS,
  recordDecisionOutcome
} from "./index";
import type { BrandOperatingState, DecisionImpact, DecisionRecord, StateChangeResult } from "./types";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

interface ApiSuccess {
  ok: true;
  operation: string;
  mode: "repository" | "stateless";
  result: StateChangeResult;
}

interface ApiFailure {
  ok: false;
  error: string;
}

async function callApi(body: unknown): Promise<{ status: number; body: ApiSuccess | ApiFailure }> {
  const response = await POST(
    new Request("http://localhost/api/core/brand-os", {
      method: "POST",
      body: JSON.stringify(body)
    })
  );

  return {
    status: response.status,
    body: (await response.json()) as ApiSuccess | ApiFailure
  };
}

function findProposedIntelligenceDecision(state: BrandOperatingState, excludeId?: string): DecisionRecord {
  const decision = state.decisions.find(
    (item) => item.status === "proposed" && item.source === "intelligence" && item.decisionOptions?.length && item.id !== excludeId
  );

  assert(!!decision, "Expected a proposed intelligence decision with options.");
  return decision;
}

function assertNoForbiddenTerms(state: BrandOperatingState): void {
  const forbiddenTerms = ["Til" + "la", "lea" + "ther", "hand" + "made", "work" + "shop", "catalog", "e-com" + "merce"];
  const serialized = JSON.stringify(state).toLowerCase();
  const found = forbiddenTerms.find((term) => serialized.includes(term.toLowerCase()));
  assert(!found, `State should not include forbidden legacy or domain term: ${found}`);
}

function runDirectStateEngineFlow() {
  let result = initializeBrandOS({
    idea: "A strategy workspace that helps consultants turn scattered client knowledge into clearer offers",
    brandType: "saas"
  });

  result = applyBrandInput(result.state, {
    audience: {
      primary: "Independent consultants with scattered client notes and unclear offer focus",
      needs: ["Clarify repeatable client value", "Reduce strategy rework"],
      barriers: ["They distrust generic planning tools"],
      desiredOutcome: "Turn messy client learning into a sharper advisory offer"
    },
    offer: { core: "Consultant strategy workspace", outcomes: ["Sharper offer focus"] },
    channels: { primary: ["Website"], experiments: ["Partner briefing"] }
  });

  result = completeStudioStep(result.state, "positioning", {
    positioning: {
      category: "Consultant strategy workspace",
      promise: "Help consultants turn scattered client knowledge into sharper offers",
      differentiators: ["Client knowledge synthesis", "Offer clarity workflow"],
      proofPoints: ["Pilot notes"]
    },
    trust: { signals: ["Pilot notes"] },
    authority: { themes: ["Offer clarity"], evidence: ["Consultant interviews"] },
    growth: { objectives: ["Increase qualified pilot requests"], loops: ["Publish offer clarity teardown"] }
  });

  const decision = findProposedIntelligenceDecision(result.state);
  const selectedOption = decision.decisionOptions![0]!;
  result = acceptDecision(result.state, decision.id, selectedOption.id);

  const pendingOutcome = result.state.memory.decisionOutcomes.find((outcome) => outcome.decisionId === decision.id);
  assert(!!pendingOutcome, "Accepted decision should create a pending decision outcome.");
  assert(pendingOutcome.status === "pending", "Decision outcome should start as pending.");
  assert(pendingOutcome.selectedOptionId === selectedOption.id, "Decision outcome should store selected option id.");
  assert(
    pendingOutcome.expectedImpact.rationale === selectedOption.expectedImpact.rationale,
    "Decision outcome should store selected option expected impact."
  );
  assert(
    result.state.memory.events.some((event) => event.type === "decision_outcome_created" && event.payload?.decisionId === decision.id),
    "Memory should include decision_outcome_created event."
  );

  result = recordDecisionOutcome(result.state, {
    decisionId: decision.id,
    status: "in_progress",
    evidence: "Pilot validation plan started with three consultant interviews."
  });

  const inProgressOutcome = result.state.memory.decisionOutcomes.find((outcome) => outcome.decisionId === decision.id);
  assert(inProgressOutcome?.status === "in_progress", "Decision outcome should update to in_progress.");
  assert(
    inProgressOutcome.validationEvidence.includes("Pilot validation plan started with three consultant interviews."),
    "Decision outcome should append in-progress evidence."
  );
  assert(
    result.state.missionControl.diagnosis.includes("awaiting validation"),
    "Mission Control should mention pending or in-progress outcome validation."
  );

  const validatedImpact: DecisionImpact = {
    dimension: selectedOption.expectedImpact.dimension,
    direction: "increase",
    magnitude: "high",
    rationale: "Consultants confirmed the selected proof strategy made the offer easier to trust."
  };
  const scoreBeforeValidated = result.scoreSnapshot.readinessScore;
  result = recordDecisionOutcome(result.state, {
    decisionId: decision.id,
    status: "validated",
    evidence: "Three consultants said the proof-backed offer was easier to evaluate.",
    actualImpact: validatedImpact
  });

  const validatedOutcome = result.state.memory.decisionOutcomes.find((outcome) => outcome.decisionId === decision.id);
  assert(validatedOutcome?.status === "validated", "Decision outcome should update to validated.");
  assert(validatedOutcome.actualImpact?.rationale === validatedImpact.rationale, "Validated outcome should store actual impact.");
  assert(
    result.scoreSnapshot.readinessScore >= scoreBeforeValidated,
    "Validated positive outcome should not reduce readiness score."
  );
  assert(
    result.state.score[validatedImpact.dimension as keyof BrandOperatingState["score"]].evidence.some((item) =>
      item.includes("Consultants confirmed")
    ),
    "Validated positive outcome should become score evidence."
  );
  assert(
    result.state.missionControl.expectedImpact.some((item) => item.includes("validated decision evidence")),
    "Mission Control should use validated outcome as evidence."
  );

  const failedDecision = findProposedIntelligenceDecision(result.state, decision.id);
  result = acceptDecision(result.state, failedDecision.id);
  const failedImpact: DecisionImpact = {
    dimension: failedDecision.relatedBottleneck ?? "growthReadiness",
    direction: "decrease",
    magnitude: "medium",
    rationale: "The selected strategic assumption did not produce useful validation evidence."
  };
  result = recordDecisionOutcome(result.state, {
    decisionId: failedDecision.id,
    status: "failed",
    evidence: "The test produced no meaningful signal.",
    actualImpact: failedImpact
  });

  const failedOutcome = result.state.memory.decisionOutcomes.find((outcome) => outcome.decisionId === failedDecision.id);
  assert(failedOutcome?.status === "failed", "A failed decision outcome should be stored.");
  assert(
    result.state.score[failedImpact.dimension as keyof BrandOperatingState["score"]].penalties.some((item) =>
      item.includes("Failed decision outcome")
    ),
    "Failed outcome should add a score penalty."
  );
  assert(
    result.state.missionControl.diagnosis.includes("failed") ||
      result.state.missionControl.expectedImpact.some((item) => item.includes("failed decision risk")),
    "Mission Control should surface failed decision outcome risk."
  );
  assertNoForbiddenTerms(result.state);

  return {
    readinessScore: result.scoreSnapshot.readinessScore,
    lifecycleStage: result.state.lifecycleStage,
    outcomes: result.state.memory.decisionOutcomes.map((outcome) => ({
      decisionId: outcome.decisionId,
      status: outcome.status,
      dimension: (outcome.actualImpact ?? outcome.expectedImpact).dimension
    })),
    missionControl: {
      diagnosis: result.state.missionControl.diagnosis,
      bottleneck: result.state.missionControl.bottleneck,
      recommendedStudio: result.state.missionControl.recommendedStudio
    }
  };
}

async function runApiFlow() {
  const initialize = await callApi({
    operation: "initialize",
    payload: {
      idea: "A calm decision system for expert consultants",
      brandType: "consultant"
    }
  });
  assert(initialize.status === 200 && initialize.body.ok, "Stateless initialize should pass.");

  const input = await callApi({
    operation: "applyBrandInput",
    state: initialize.body.result.state,
    payload: {
      audience: {
        primary: "Expert consultants who need clearer advisory positioning",
        needs: ["Clarify value", "Reduce confusing choices"],
        barriers: ["They have too many possible offers"],
        desiredOutcome: "Choose a sharper advisory direction"
      }
    }
  });
  assert(input.status === 200 && input.body.ok, "Stateless applyBrandInput should pass.");

  const completed = await callApi({
    operation: "completeStudioStep",
    state: input.body.result.state,
    payload: {
      studioId: "positioning",
      output: {
        positioning: {
          category: "Consultant decision system",
          promise: "Help expert consultants choose a sharper advisory direction",
          differentiators: ["Decision clarity method"],
          proofPoints: ["Advisor feedback"]
        }
      }
    }
  });
  assert(completed.status === 200 && completed.body.ok, "Stateless completeStudioStep should pass.");

  const decision = findProposedIntelligenceDecision(completed.body.result.state);
  const option = decision.decisionOptions![0]!;
  const accepted = await callApi({
    operation: "acceptDecision",
    state: completed.body.result.state,
    payload: {
      decisionId: decision.id,
      selectedOptionId: option.id
    }
  });
  assert(accepted.status === 200 && accepted.body.ok, "Stateless acceptDecision should pass with selectedOptionId.");

  const recorded = await callApi({
    operation: "recordDecisionOutcome",
    state: accepted.body.result.state,
    payload: {
      decisionId: decision.id,
      status: "validated",
      evidence: "Advisor feedback confirmed the option improved strategic clarity.",
      actualImpact: {
        dimension: option.expectedImpact.dimension,
        direction: "increase",
        magnitude: "medium",
        rationale: "Advisor feedback validated the selected option."
      }
    }
  });
  assert(recorded.status === 200 && recorded.body.ok, "Stateless recordDecisionOutcome should pass.");
  assert(
    recorded.body.result.state.memory.decisionOutcomes.some((outcome) => outcome.status === "validated"),
    "Stateless API should store validated outcome."
  );

  const workspaceId = `workspace_outcome_${Date.now()}`;
  const repoInitialize = await callApi({
    operation: "initialize",
    workspaceId,
    payload: {
      idea: "A workspace that helps local service teams clarify their promise",
      brandType: "local service business"
    }
  });
  assert(repoInitialize.status === 200 && repoInitialize.body.ok, "Repository initialize should pass.");

  const repoApply = await callApi({
    operation: "applyBrandInput",
    workspaceId,
    payload: {
      audience: {
        primary: "Local service teams with unclear customer promise",
        needs: ["Clarify what customers can expect"],
        barriers: ["They rely on generic claims"],
        desiredOutcome: "Explain the promise clearly before prospects compare options"
      }
    }
  });
  assert(repoApply.status === 200 && repoApply.body.ok, "Repository applyBrandInput should pass.");

  const repoDecision = findProposedIntelligenceDecision(repoApply.body.result.state);
  const repoOption = repoDecision.decisionOptions![0]!;
  const repoAccept = await callApi({
    operation: "acceptDecision",
    workspaceId,
    payload: {
      decisionId: repoDecision.id,
      selectedOptionId: repoOption.id
    }
  });
  assert(repoAccept.status === 200 && repoAccept.body.ok, "Repository acceptDecision should pass without client state.");

  const repoOutcome = await callApi({
    operation: "recordDecisionOutcome",
    workspaceId,
    payload: {
      decisionId: repoDecision.id,
      status: "in_progress",
      evidence: "The team started collecting customer proof."
    }
  });
  assert(repoOutcome.status === 200 && repoOutcome.body.ok, "Repository recordDecisionOutcome should pass without client state.");
  assert(
    repoOutcome.body.result.state.memory.decisionOutcomes.some((outcome) => outcome.status === "in_progress"),
    "Repository API should persist outcome update."
  );

  return {
    statelessMode: recorded.body.mode,
    repositoryMode: repoOutcome.body.mode,
    statelessOutcomes: recorded.body.result.state.memory.decisionOutcomes.length,
    repositoryOutcomes: repoOutcome.body.result.state.memory.decisionOutcomes.length
  };
}

const direct = runDirectStateEngineFlow();
const api = await runApiFlow();

console.log(
  JSON.stringify(
    {
      direct,
      api
    },
    null,
    2
  )
);
