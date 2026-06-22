import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  BrandOSJsonStorageError,
  createBrandOSRepository,
  createJsonBrandOSStorageAdapter,
} from "./index";
import type { BrandOSRepositoryResult, BrandOSSuccess } from "./types";

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

const forbiddenTerms = [
  ["Til", "la Le", "ather"].join(""),
  ["Til", "la"].join(""),
  ["lea", "ther"].join(""),
  ["hand", "made"].join(""),
  ["cra", "ft"].join(""),
  ["work", "shop"].join(""),
  ["product", " photography"].join(""),
  ["product", " catalog"].join(""),
  ["Insta", "gram"].join(""),
  ["e-", "commerce"].join(""),
  ["existing", " customer"].join(""),
];

const testFolder = join(
  process.cwd(),
  "work",
  "brand-os-json-storage-test",
  String(Date.now()),
);
const filePath = join(testFolder, "brand-os-store.json");
const workspaceId = "workspace_json_storage_test";

await mkdir(testFolder, { recursive: true });

let adapter = createJsonBrandOSStorageAdapter({ filePath });
let repository = createBrandOSRepository(adapter);

let result = await repository.initializeWorkspaceState(workspaceId, {
  idea: "A file backed state boundary for brand operations",
  brandType: "consultant",
});

let success = expectSuccess(
  result,
  "Repository should initialize state with JSON adapter.",
);
const initialState = success.result.state;
const initialReadiness = initialState.missionControl.readinessScore;

adapter = createJsonBrandOSStorageAdapter({ filePath });
let reloadedState = await adapter.getState(workspaceId);
assert(
  reloadedState?.id === initialState.id,
  "State should persist after adapter recreation.",
);

if (reloadedState) {
  reloadedState.brand.idea = "Mutated local copy";
}

const reloadedAgain = await adapter.getState(workspaceId);
assert(
  reloadedAgain?.brand.idea === initialState.brand.idea,
  "Returned state should be cloned and safe to mutate locally.",
);

const initialEvents = await adapter.getEvents(workspaceId);
assert(
  initialEvents.length === success.result.events.length,
  "Initial events should persist.",
);

repository = createBrandOSRepository(adapter);
result = await repository.applyWorkspaceInput(workspaceId, {
  audience: {
    primary: "Independent consultants",
    needs: ["More durable strategic memory", "Clearer operating rhythm"],
    barriers: ["Scattered notes"],
    desiredOutcome: "Keep strategy reusable between sessions",
  },
  offer: {
    core: "Brand state review",
    outcomes: ["Clear next action", "Reusable state"],
  },
  channels: {
    primary: ["Website"],
  },
});

success = expectSuccess(
  result,
  "Repository should update state with JSON adapter.",
);
const updatedReadiness = success.result.state.missionControl.readinessScore;
assert(
  updatedReadiness > initialReadiness,
  "Updated state should improve readiness.",
);

const eventsAfterUpdate = await adapter.getEvents(workspaceId);
assert(
  eventsAfterUpdate.length > initialEvents.length,
  "Events should append and persist.",
);

adapter = createJsonBrandOSStorageAdapter({ filePath });
const updatedReloadedState = await adapter.getState(workspaceId);
assert(
  !!updatedReloadedState,
  "Updated state should reload from JSON storage.",
);
assert(
  updatedReloadedState?.missionControl.readinessScore === updatedReadiness,
  "Updated score should persist after reload.",
);
assert(
  updatedReloadedState!.memory.scoreSnapshots.length >
    initialState.memory.scoreSnapshots.length,
  "Score snapshots should persist.",
);

const serializedFile = await readFile(filePath, "utf8");
for (const term of forbiddenTerms) {
  assert(
    !serializedFile.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
    `Forbidden term found: ${term}`,
  );
}

const corruptPath = join(testFolder, "corrupt-brand-os-store.json");
await writeFile(corruptPath, "{", "utf8");

let corruptError: unknown;
try {
  await createJsonBrandOSStorageAdapter({ filePath: corruptPath }).getState(
    workspaceId,
  );
} catch (error) {
  corruptError = error;
}

assert(
  corruptError instanceof BrandOSJsonStorageError,
  "Corrupted JSON should fail with BrandOSJsonStorageError.",
);
assert(
  corruptError instanceof BrandOSJsonStorageError &&
    corruptError.code === "malformed_json",
  "Corrupted JSON should report malformed_json.",
);

console.log(
  JSON.stringify(
    {
      filePath,
      initialReadiness,
      updatedReadiness,
      persisted: updatedReloadedState?.id === initialState.id,
      events: eventsAfterUpdate.length,
      scoreSnapshots: updatedReloadedState!.memory.scoreSnapshots.length,
      corruptedJsonError:
        corruptError instanceof BrandOSJsonStorageError
          ? corruptError.code
          : "missing",
    },
    null,
    2,
  ),
);
