import {
  CURRENT_BRAND_OS_SCHEMA_VERSION,
  createBrandOSRepository,
  createMemoryBrandOSPersistenceAdapter,
  initializeBrandOS,
} from "./index";
import type {
  BrandOSFailure,
  BrandOSRepositoryResult,
  BrandOSSuccess,
  DecisionRecord,
} from "./types";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function expectSuccess(
  result: BrandOSRepositoryResult,
  message: string,
): BrandOSSuccess {
  assert(result.ok, message);
  return result as BrandOSSuccess;
}

function expectFailure(
  result: BrandOSRepositoryResult,
  message: string,
): BrandOSFailure {
  assert(!result.ok, message);
  return result as BrandOSFailure;
}

const adapter = createMemoryBrandOSPersistenceAdapter();
const repository = createBrandOSRepository(adapter);
const workspaceId = "workspace_repository_test";

let result = await repository.initializeWorkspaceState(workspaceId, {
  idea: "A durable workspace state layer for brand operations",
  brandType: "consultant",
});
let success = expectSuccess(result, "Workspace initialize should succeed.");

assert(
  success.result.state.schemaVersion === CURRENT_BRAND_OS_SCHEMA_VERSION,
  "Initialized state should include schemaVersion.",
);

const initializedReadiness = success.result.state.missionControl.readinessScore;
const initializedEventCount = (await adapter.getEvents(workspaceId)).length;

let getResult = await repository.getWorkspaceState(workspaceId);
let getSuccess = expectSuccess(
  getResult,
  "getWorkspaceState should succeed after initialize.",
);
assert(
  getSuccess.result.state.id === success.result.state.id,
  "getWorkspaceState should return persisted state.",
);

result = await repository.applyWorkspaceInput(workspaceId, {
  audience: {
    primary: "Independent consultants",
    needs: ["Clearer strategy", "Better operating rhythm"],
    barriers: ["Scattered decisions"],
    desiredOutcome: "Run brand strategy from a coherent state",
  },
  offer: {
    core: "Brand operating state review",
    outcomes: ["Clear next action", "Better decision memory"],
  },
  channels: {
    primary: ["Website"],
  },
});
success = expectSuccess(result, "applyWorkspaceInput should succeed.");

result = await repository.completeWorkspaceStudioStep(workspaceId, {
  studioId: "positioning",
  output: {
    positioning: {
      category: "Brand operating system",
      promise: "Keep strategic progress visible and reusable",
      differentiators: [
        "Workspace repository",
        "Schema version",
        "Event stream",
      ],
      proofPoints: ["Persistence adapter", "State validation"],
    },
    authority: {
      themes: ["State quality"],
      evidence: ["Validated state shape"],
    },
    growth: {
      objectives: ["Improve qualified conversations"],
      loops: ["Review state after every strategic action"],
    },
  },
});
success = expectSuccess(result, "completeWorkspaceStudioStep should succeed.");

const decision = success.result.state.decisions.find(
  (item: DecisionRecord) => item.status === "proposed",
);
assert(!!decision, "Expected proposed decision before accept.");

result = await repository.acceptWorkspaceDecision(workspaceId, decision!.id);
success = expectSuccess(result, "acceptWorkspaceDecision should succeed.");

result = await repository.recordWorkspaceObservation(workspaceId, {
  observation:
    "A stakeholder could trace why the current positioning was chosen.",
  source: "Strategy review note",
});
success = expectSuccess(result, "recordWorkspaceObservation should succeed.");

result = await repository.recalculateWorkspaceState(workspaceId);
success = expectSuccess(result, "recalculateWorkspaceState should succeed.");

const finalState = success.result.state;
const persistedState = await adapter.getState(workspaceId);
const finalEvents = await adapter.getEvents(workspaceId);

assert(!!persistedState, "Persisted state should exist after operations.");
assert(
  persistedState!.id === finalState.id,
  "Persisted state should match final state.",
);
assert(
  finalState.missionControl.readinessScore !== initializedReadiness,
  "Readiness should change after repository operations.",
);
assert(
  finalEvents.length > initializedEventCount,
  "Repository should append events across operations.",
);
assert(
  finalState.schemaVersion === CURRENT_BRAND_OS_SCHEMA_VERSION,
  "Final state should keep schemaVersion.",
);
assert(
  finalState.memory.decisions.some(
    (item: DecisionRecord) => item.status === "accepted",
  ),
  "Accepted decision should persist.",
);
assert(
  finalState.memory.observations.length > 0,
  "Observation should persist.",
);

const missingWorkspace = await repository.applyWorkspaceInput(
  "missing_workspace",
  {
    audience: {
      primary: "Independent experts",
    },
  },
);
const missingWorkspaceFailure = expectFailure(
  missingWorkspace,
  "Missing workspace update should fail cleanly.",
);
assert(
  missingWorkspaceFailure.errors?.some((error) => error.code === "not_found") ??
    false,
  "Missing workspace should include not_found error.",
);

const unsupported = initializeBrandOS({
  idea: "A state with an unsupported schema version",
  brandType: "consultant",
}).state;
await adapter.saveState("unsupported_workspace", {
  ...unsupported,
  schemaVersion: "brand-os-state-v0",
});

const unsupportedResult = await repository.recalculateWorkspaceState(
  "unsupported_workspace",
);
const unsupportedFailure = expectFailure(
  unsupportedResult,
  "Unsupported schema version should fail cleanly.",
);
assert(
  unsupportedFailure.errors?.some(
    (error) => error.code === "unsupported_schema_version",
  ) ?? false,
  "Unsupported schema version should include structured error.",
);

console.log(
  JSON.stringify(
    {
      schemaVersion: finalState.schemaVersion,
      initializedReadiness,
      finalReadiness: finalState.missionControl.readinessScore,
      persisted: persistedState?.id === finalState.id,
      events: finalEvents.length,
      memory: {
        observations: finalState.memory.observations.length,
        decisions: finalState.memory.decisions.length,
        scoreSnapshots: finalState.memory.scoreSnapshots.length,
      },
      failures: {
        missingWorkspace: missingWorkspace.ok,
        unsupportedSchema: unsupportedResult.ok,
      },
    },
    null,
    2,
  ),
);
