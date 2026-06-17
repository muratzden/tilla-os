import { POST } from "../../../app/api/core/brand-os/route";
import type { BrandOperatingState, StateChangeResult } from "./types";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

async function postJson(body: unknown): Promise<{ status: number; body: Record<string, unknown> }> {
  const response = await POST(
    new Request("http://localhost/api/core/brand-os", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json"
      }
    })
  );

  return {
    status: response.status,
    body: (await response.json()) as Record<string, unknown>
  };
}

async function postRaw(body: string): Promise<{ status: number; body: Record<string, unknown> }> {
  const response = await POST(
    new Request("http://localhost/api/core/brand-os", {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json"
      }
    })
  );

  return {
    status: response.status,
    body: (await response.json()) as Record<string, unknown>
  };
}

function getResult(body: Record<string, unknown>): StateChangeResult {
  assert(body.ok === true, "Expected successful API response.");
  assert(typeof body.result === "object" && body.result !== null, "Expected result object.");
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

const invalidOperation = await postJson({ operation: "unknownOperation", payload: {} });
assert(invalidOperation.status === 400, "Unknown operation should return 400.");
assert(invalidOperation.body.ok === false, "Unknown operation should return ok false.");
assert(Array.isArray(invalidOperation.body.supportedOperations), "Unknown operation should include supported operations.");

const invalidInitialize = await postJson({
  operation: "initialize",
  payload: {
    idea: "   ",
    brandType: ""
  }
});
assert(invalidInitialize.status === 400, "Invalid initialize payload should return 400.");
assert(invalidInitialize.body.ok === false, "Invalid initialize payload should return ok false.");
assert(Array.isArray(invalidInitialize.body.validationErrors), "Invalid initialize should include validation errors.");

const missingState = await postJson({
  operation: "applyBrandInput",
  payload: {
    audience: {
      primary: "Independent experts"
    }
  }
});
assert(missingState.status === 400, "Missing state should return 400.");
assert(missingState.body.ok === false, "Missing state should return ok false.");

let response = await postJson({
  operation: "initialize",
  payload: {
    idea: "A calm operating layer for expert-led brands",
    brandType: "consultant"
  }
});
assert(response.status === 200, "Initialize should succeed.");
let result = getResult(response.body);
let state = result.state;
const initialReadiness = state.missionControl.readinessScore;
const initialMemorySize = memorySize(state);

response = await postJson({
  operation: "applyBrandInput",
  state,
  payload: {
    audience: {
      primary: "Independent consultants",
      needs: ["Sharper positioning", "Clearer offer language"],
      barriers: ["Generic category language"],
      desiredOutcome: "Become easier to understand and choose"
    },
    offer: {
      core: "Brand operating session",
      outcomes: ["Clear strategic foundation"]
    },
    channels: {
      primary: ["Website"]
    }
  }
});
assert(response.status === 200, "applyBrandInput should succeed.");
result = getResult(response.body);
state = result.state;

response = await postJson({
  operation: "completeStudioStep",
  state,
  payload: {
    studioId: "positioning",
    output: {
      positioning: {
        category: "Brand operating system",
        promise: "Turn scattered brand inputs into a clear operating state",
        differentiators: ["State engine", "Decision history", "Mission control"],
        proofPoints: ["Score snapshots", "Lifecycle transitions"]
      },
      authority: {
        themes: ["Positioning clarity"],
        evidence: ["Structured progression model"]
      },
      growth: {
        objectives: ["Increase qualified discovery calls"],
        loops: ["Publish proof-backed notes"]
      }
    }
  }
});
assert(response.status === 200, "completeStudioStep should succeed.");
result = getResult(response.body);
state = result.state;

const decision = state.decisions.find((item) => item.status === "proposed");
assert(!!decision, "Expected a proposed decision.");

response = await postJson({
  operation: "acceptDecision",
  state,
  payload: {
    decisionId: decision!.id
  }
});
assert(response.status === 200, "acceptDecision should succeed.");
result = getResult(response.body);
state = result.state;

response = await postJson({
  operation: "recordObservation",
  state,
  payload: {
    observation: "A prospect repeated the positioning back clearly after one explanation.",
    source: "Sales conversation note"
  }
});
assert(response.status === 200, "recordObservation should succeed.");
result = getResult(response.body);
state = result.state;

response = await postJson({
  operation: "recalculate",
  state
});
assert(response.status === 200, "recalculate should succeed.");
result = getResult(response.body);
state = result.state;

assert(state.missionControl.readinessScore !== initialReadiness, "Readiness should change through API flow.");
assert(memorySize(state) > initialMemorySize, "Memory should grow through API flow.");
assert(state.memory.scoreSnapshots.length > 0, "Score snapshots should exist.");
assert(state.memory.lifecycleTransitions.length > 0, "Lifecycle transitions should exist.");
assert(state.memory.observations.length > 0, "Observation should be stored.");
assert(state.memory.decisions.some((item) => item.status === "accepted"), "Accepted decision should be stored.");

console.log(
  JSON.stringify(
    {
      initialReadiness,
      finalReadiness: state.missionControl.readinessScore,
      lifecycleStage: state.lifecycleStage,
      memory: {
        events: state.memory.events.length,
        observations: state.memory.observations.length,
        decisions: state.memory.decisions.length,
        scoreSnapshots: state.memory.scoreSnapshots.length,
        lifecycleTransitions: state.memory.lifecycleTransitions.length
      },
      failures: {
        invalidJson: invalidJson.status,
        invalidOperation: invalidOperation.status,
        missingState: missingState.status,
        invalidInitialize: invalidInitialize.status
      }
    },
    null,
    2
  )
);
