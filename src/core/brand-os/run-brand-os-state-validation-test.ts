import { POST } from "../../../app/api/core/brand-os/route";
import {
  createMemoryBrandOSPersistenceAdapter,
  initializeBrandOS,
  validateBrandOperatingState
} from "./index";
import type { BrandOperatingState } from "./types";

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

const initialized = initializeBrandOS({
  idea: "A reliable state layer for brand strategy work",
  brandType: "consultant"
});
const state = initialized.state;

const validStateResult = validateBrandOperatingState(state);
assert(validStateResult.valid, `Initialized state should be valid: ${JSON.stringify(validStateResult.errors)}`);

const corruptedState = {
  ...state,
  brand: {
    ...state.brand,
    idea: " "
  }
};
const corruptedStateResult = validateBrandOperatingState(corruptedState);
assert(!corruptedStateResult.valid, "Corrupted state should fail validation.");
assert(corruptedStateResult.errors.some((error) => error.path === "brand.idea"), "Corrupted state should report brand.idea.");

const missingMissionControl = { ...state } as Partial<BrandOperatingState>;
delete missingMissionControl.missionControl;
const missingMissionControlResult = validateBrandOperatingState(missingMissionControl);
assert(!missingMissionControlResult.valid, "Missing missionControl should fail validation.");
assert(
  missingMissionControlResult.errors.some((error) => error.path === "missionControl"),
  "Missing missionControl should report missionControl."
);

const invalidLifecycleState = {
  ...state,
  lifecycleStage: "invalid_stage"
};
const invalidLifecycleResult = validateBrandOperatingState(invalidLifecycleState);
assert(!invalidLifecycleResult.valid, "Invalid lifecycleStage should fail validation.");
assert(
  invalidLifecycleResult.errors.some((error) => error.path === "lifecycleStage"),
  "Invalid lifecycleStage should report lifecycleStage."
);

const invalidChannelsState = {
  ...state,
  channels: {
    ...state.channels,
    primary: "Website"
  }
};
const invalidChannelsResult = validateBrandOperatingState(invalidChannelsState);
assert(!invalidChannelsResult.valid, "Invalid channels should fail validation.");
assert(
  invalidChannelsResult.errors.some((error) => error.path === "channels.primary"),
  "Invalid channels should report channels.primary."
);

const adapter = createMemoryBrandOSPersistenceAdapter();
await adapter.saveState("workspace_test", state);
const savedState = await adapter.getState("workspace_test");
assert(savedState?.id === state.id, "Persistence adapter should save and return state.");

await adapter.appendEvents("workspace_test", initialized.events);
const savedEvents = await adapter.getEvents("workspace_test");
assert(savedEvents.length === initialized.events.length, "Persistence adapter should append and return events.");

const missingStateResponse = await postJson({
  operation: "recalculate"
});
assert(missingStateResponse.status === 400, "API missing state should return 400.");
assert(missingStateResponse.body.ok === false, "API missing state should return ok false.");
assert(Array.isArray(missingStateResponse.body.validationErrors), "API missing state should include validation errors.");

const corruptedStateResponse = await postJson({
  operation: "recalculate",
  state: corruptedState
});
assert(corruptedStateResponse.status === 400, "API corrupted state should return 400.");
assert(corruptedStateResponse.body.ok === false, "API corrupted state should return ok false.");
assert(Array.isArray(corruptedStateResponse.body.validationErrors), "API corrupted state should include validation errors.");

console.log(
  JSON.stringify(
    {
      validState: validStateResult.valid,
      corruptedErrors: corruptedStateResult.errors.length,
      missingMissionControlErrors: missingMissionControlResult.errors.length,
      invalidLifecycleErrors: invalidLifecycleResult.errors.length,
      invalidChannelsErrors: invalidChannelsResult.errors.length,
      persistence: {
        savedState: savedState?.id,
        eventCount: savedEvents.length
      },
      apiFailures: {
        missingState: missingStateResponse.status,
        corruptedState: corruptedStateResponse.status
      }
    },
    null,
    2
  )
);
