import { initializeBrandOS } from "./index";

const result = initializeBrandOS({
  idea: "A calmer way for independent experts to explain their value",
  brandType: "consultant"
});
const { state } = result;

const requiredMissionKeys = [
  "readinessScore",
  "diagnosis",
  "bottleneck",
  "nextBestAction",
  "strategicFocus",
  "missingInputs"
] as const;

for (const key of requiredMissionKeys) {
  if (!(key in state.missionControl)) {
    throw new Error(`Missing mission control key: ${key}`);
  }
}

if (state.brand.idea.length === 0 || state.brand.brandType.length === 0) {
  throw new Error("Seed input was not preserved.");
}

if (state.studios.length !== 8) {
  throw new Error(`Expected 8 studios, received ${state.studios.length}.`);
}

if (state.intelligencePacks.some((pack) => pack.status !== "metadata_only")) {
  throw new Error("Core intelligence packs must be metadata only.");
}

if (result.events.length === 0 || state.memory.scoreSnapshots.length === 0) {
  throw new Error("Initialization must create events and a score snapshot.");
}

console.log(
  JSON.stringify(
    {
      id: state.id,
      lifecycleStage: state.lifecycleStage,
      readinessScore: state.missionControl.readinessScore,
      bottleneck: state.missionControl.bottleneck,
      nextBestAction: state.missionControl.nextBestAction,
      recommendedStudio: state.missionControl.recommendedStudio,
      studioCount: state.studios.length,
      intelligencePackCount: state.intelligencePacks.length,
      eventCount: state.memory.events.length,
      scoreSnapshotCount: state.memory.scoreSnapshots.length,
      missingInputs: state.missionControl.missingInputs
    },
    null,
    2
  )
);
