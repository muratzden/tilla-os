import {
  acceptDecision,
  applyBrandInput,
  initializeBrandOS,
  recalculateBrandOS,
  recordObservation
} from "./index";

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
  ["existing", " customer"].join("")
];

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

let result = initializeBrandOS({
  idea: "A calm operating system for expert-led service brands",
  brandType: "consultant"
});

const initialReadiness = result.state.missionControl.readinessScore;
const initialMemorySize =
  result.state.memory.events.length +
  result.state.memory.entries.length +
  result.state.memory.scoreSnapshots.length +
  result.state.memory.decisions.length;

result = applyBrandInput(result.state, {
  audience: {
    primary: "Independent consultants with unclear market positioning",
    needs: ["Sharper positioning", "Clearer trust signals", "Repeatable growth focus"],
    barriers: ["Generic messaging", "Unclear proof"],
    desiredOutcome: "Become easier to understand and choose"
  },
  offer: {
    core: "Brand strategy operating session",
    outcomes: ["Clear positioning", "Prioritized next actions"]
  }
});

const afterAudienceReadiness = result.state.missionControl.readinessScore;

result = applyBrandInput(result.state, {
  positioning: {
    category: "Brand operating system",
    promise: "Turn scattered expertise into a clear operating state",
    differentiators: ["State-based strategy", "Decision history", "Mission control"],
    proofPoints: ["Progression model", "Structured memory", "Score snapshots"]
  },
  channels: {
    primary: ["Website"],
    experiments: ["Referral partner briefing"]
  },
  growth: {
    objectives: ["Increase qualified discovery calls"],
    loops: ["Publish proof-backed strategic notes"]
  },
  authority: {
    themes: ["Positioning clarity", "Decision quality"],
    evidence: ["Structured operating model"]
  }
});

const decisionToAccept = result.state.decisions.find((decision) => decision.status === "proposed");
assert(!!decisionToAccept, "Expected at least one proposed decision.");

result = acceptDecision(result.state, decisionToAccept!.id);
result = recordObservation(result.state, "Two independent experts confirmed the positioning language is easier to explain.", "trust", [
  "Qualitative validation"
]);
result = recalculateBrandOS(result.state);

const finalReadiness = result.state.missionControl.readinessScore;
const finalMemorySize =
  result.state.memory.events.length +
  result.state.memory.entries.length +
  result.state.memory.scoreSnapshots.length +
  result.state.memory.decisions.length;

assert(afterAudienceReadiness > initialReadiness, "Audience input should improve readiness.");
assert(finalReadiness > initialReadiness, "Progression should improve readiness.");
assert(finalMemorySize > initialMemorySize, "Memory should grow during progression.");
assert(result.state.memory.observations.length > 0, "Observation should be stored in memory.");
assert(result.state.memory.decisions.some((decision) => decision.status === "accepted"), "Accepted decision should be stored.");
assert(result.state.missionControl.actionPlan.length > 0, "Mission Control should provide an action plan.");
assert(result.state.missionControl.readinessScore !== initialReadiness, "Mission Control should change after progression.");

const serializedState = JSON.stringify(result.state);
for (const term of forbiddenTerms) {
  assert(!serializedState.toLocaleLowerCase().includes(term.toLocaleLowerCase()), `Forbidden term found: ${term}`);
}

console.log(
  JSON.stringify(
    {
      initialReadiness,
      afterAudienceReadiness,
      finalReadiness,
      lifecycleStage: result.state.lifecycleStage,
      memory: {
        events: result.state.memory.events.length,
        entries: result.state.memory.entries.length,
        observations: result.state.memory.observations.length,
        decisions: result.state.memory.decisions.length,
        scoreSnapshots: result.state.memory.scoreSnapshots.length,
        lifecycleTransitions: result.state.memory.lifecycleTransitions.length
      },
      missionControl: {
        bottleneck: result.state.missionControl.bottleneck,
        recommendedStudio: result.state.missionControl.recommendedStudio,
        actionPlan: result.state.missionControl.actionPlan
      }
    },
    null,
    2
  )
);
