import { POST } from "../../../app/api/core/brand-os/route";
import type { BrandOperatingState, StateChangeResult } from "./types";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

async function postJson(
  body: unknown,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const response = await POST(
    new Request("http://localhost/api/core/brand-os", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    }),
  );

  return {
    status: response.status,
    body: (await response.json()) as Record<string, unknown>,
  };
}

async function postRaw(
  body: string,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const response = await POST(
    new Request("http://localhost/api/core/brand-os", {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json",
      },
    }),
  );

  return {
    status: response.status,
    body: (await response.json()) as Record<string, unknown>,
  };
}

function getResult(
  body: Record<string, unknown>,
  expectedMode: "repository" | "stateless",
): StateChangeResult {
  assert(body.ok === true, "Expected successful API response.");
  assert(body.mode === expectedMode, `Expected ${expectedMode} mode.`);
  assert(
    typeof body.result === "object" && body.result !== null,
    "Expected result object.",
  );
  return body.result as StateChangeResult;
}

function memorySize(state: BrandOperatingState): number {
  return (
    state.memory.events.length +
    state.memory.entries.length +
    state.memory.observations.length +
    state.memory.decisions.length +
    state.memory.scoreSnapshots.length +
    state.memory.lifecycleTransitions.length
  );
}

const invalidJson = await postRaw("{");
assert(invalidJson.status === 400, "Invalid JSON should return 400.");
assert(invalidJson.body.ok === false, "Invalid JSON should return ok false.");

const invalidOperation = await postJson({
  operation: "unknownOperation",
  workspaceId: "workspace_api_repo_invalid",
  payload: {},
});
assert(invalidOperation.status === 400, "Invalid operation should return 400.");
assert(
  invalidOperation.body.ok === false,
  "Invalid operation should return ok false.",
);

const missingWorkspaceUpdate = await postJson({
  operation: "applyBrandInput",
  workspaceId: "workspace_api_repo_missing",
  payload: {
    audience: {
      primary: "Independent experts",
    },
  },
});
assert(
  missingWorkspaceUpdate.status === 400,
  "Missing workspace update should return 400.",
);
assert(
  missingWorkspaceUpdate.body.ok === false,
  "Missing workspace update should return ok false.",
);
assert(
  Array.isArray(missingWorkspaceUpdate.body.validationErrors),
  "Missing workspace should include structured errors.",
);

const workspaceId = `workspace_api_repo_${Date.now()}`;

let response = await postJson({
  operation: "initialize",
  workspaceId,
  payload: {
    idea: "A reliable workspace state layer for expert-led brands",
    brandType: "consultant",
  },
});
assert(response.status === 200, "Repository initialize should succeed.");
let result = getResult(response.body, "repository");
let state = result.state;
const initialReadiness = state.missionControl.readinessScore;
const initialMemorySize = memorySize(state);
const initialEventCount = state.memory.events.length;

response = await postJson({
  operation: "applyBrandInput",
  workspaceId,
  payload: {
    audience: {
      primary: "Independent consultants",
      needs: ["Clear positioning", "Reusable decision history"],
      barriers: ["Scattered strategic inputs"],
      desiredOutcome: "Keep brand progress visible",
    },
    offer: {
      core: "Brand operating state review",
      outcomes: ["Clear next action", "Better strategic memory"],
    },
    channels: {
      primary: ["Website"],
    },
  },
});
assert(
  response.status === 200,
  "Repository applyBrandInput should succeed without state.",
);
result = getResult(response.body, "repository");
state = result.state;

response = await postJson({
  operation: "completeStudioStep",
  workspaceId,
  payload: {
    studioId: "positioning",
    output: {
      positioning: {
        category: "Brand operating system",
        promise: "Turn brand decisions into a persistent operating state",
        differentiators: [
          "Repository mode",
          "Schema version",
          "Event append boundary",
        ],
        proofPoints: [
          "Workspace state persists",
          "Events append across operations",
        ],
      },
      authority: {
        themes: ["State quality"],
        evidence: ["Repository contract test"],
      },
      growth: {
        objectives: ["Improve qualified conversations"],
        loops: ["Review state after each operation"],
      },
    },
  },
});
assert(
  response.status === 200,
  "Repository completeStudioStep should succeed without state.",
);
result = getResult(response.body, "repository");
state = result.state;

const decision = state.decisions.find((item) => item.status === "proposed");
assert(!!decision, "Expected proposed decision.");

response = await postJson({
  operation: "acceptDecision",
  workspaceId,
  payload: {
    decisionId: decision!.id,
  },
});
assert(
  response.status === 200,
  "Repository acceptDecision should succeed without state.",
);
result = getResult(response.body, "repository");
state = result.state;

response = await postJson({
  operation: "recordObservation",
  workspaceId,
  payload: {
    observation:
      "The team could continue strategy work without resending client-side state.",
    source: "Repository mode test",
  },
});
assert(
  response.status === 200,
  "Repository recordObservation should succeed without state.",
);
result = getResult(response.body, "repository");
state = result.state;

response = await postJson({
  operation: "recalculate",
  workspaceId,
});
assert(
  response.status === 200,
  "Repository recalculate should succeed without state.",
);
result = getResult(response.body, "repository");
state = result.state;

assert(
  state.missionControl.readinessScore !== initialReadiness,
  "Repository flow should change readiness.",
);
assert(
  memorySize(state) > initialMemorySize,
  "Repository flow should grow memory.",
);
assert(
  state.memory.events.length > initialEventCount,
  "Repository flow should append events.",
);
assert(
  state.memory.scoreSnapshots.length > 0,
  "Repository flow should keep score snapshots.",
);
assert(
  state.memory.decisions.some((item) => item.status === "accepted"),
  "Repository flow should persist accepted decision.",
);
assert(
  state.memory.observations.length > 0,
  "Repository flow should persist observation.",
);

const statelessInitialize = await postJson({
  operation: "initialize",
  payload: {
    idea: "A stateless compatibility check for Brand OS",
    brandType: "consultant",
  },
});
assert(
  statelessInitialize.status === 200,
  "Stateless initialize should still succeed.",
);
const statelessResult = getResult(statelessInitialize.body, "stateless");
assert(
  statelessResult.state.id.length > 0,
  "Stateless result should include state.",
);

console.log(
  JSON.stringify(
    {
      repository: {
        workspaceId,
        initialReadiness,
        finalReadiness: state.missionControl.readinessScore,
        lifecycleStage: state.lifecycleStage,
        memory: {
          events: state.memory.events.length,
          observations: state.memory.observations.length,
          decisions: state.memory.decisions.length,
          scoreSnapshots: state.memory.scoreSnapshots.length,
        },
      },
      stateless: {
        mode: statelessInitialize.body.mode,
        stateId: statelessResult.state.id,
      },
      failures: {
        invalidJson: invalidJson.status,
        invalidOperation: invalidOperation.status,
        missingWorkspaceUpdate: missingWorkspaceUpdate.status,
      },
    },
    null,
    2,
  ),
);
