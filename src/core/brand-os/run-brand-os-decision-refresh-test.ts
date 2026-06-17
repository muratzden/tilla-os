import {
  acceptDecision,
  applyBrandInput,
  completeStudioStep,
  initializeBrandOS,
  recalculateBrandOS,
  recordObservation
} from "./index";
import type { BrandOSUpdateInput, DecisionRecord, StudioId } from "./types";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

interface Scenario {
  name: string;
  seed: {
    idea: string;
    brandType: string;
  };
  input: BrandOSUpdateInput;
  studioId: StudioId;
  studioOutput: BrandOSUpdateInput;
  observation: string;
}

const scenarios: Scenario[] = [
  {
    name: "SaaS startup",
    seed: { idea: "AI operations assistant for consulting teams", brandType: "saas" },
    input: {
      audience: {
        primary: "Small consulting teams losing billable time to operations",
        needs: ["Reduce admin drag", "Coordinate client work"],
        barriers: ["Teams distrust generic automation"],
        desiredOutcome: "Recover time without heavier process"
      },
      offer: { core: "AI operations workspace", outcomes: ["Clear weekly priorities"] },
      channels: { primary: ["Website"], experiments: ["Partner briefing"] }
    },
    studioId: "positioning",
    studioOutput: {
      positioning: {
        category: "AI operations assistant",
        promise: "Help consulting teams recover billable time without heavier process",
        differentiators: ["Service-team workflow memory", "Weekly operating rhythm"],
        proofPoints: ["Workflow prototype", "Interview synthesis"]
      },
      authority: { themes: ["Operational clarity"], evidence: ["Interview synthesis"] },
      growth: { objectives: ["Increase qualified pilot requests"], loops: ["Publish operational teardown notes"] }
    },
    observation: "Teams said the weekly rhythm sounded easier than their current process."
  },
  {
    name: "Coffee brand",
    seed: { idea: "Coffee for better mornings", brandType: "coffee" },
    input: {
      audience: { primary: "People who drink coffee", needs: ["Better mornings"], barriers: [], desiredOutcome: "Enjoy coffee" },
      offer: { core: "Coffee experience", outcomes: [] },
      channels: { primary: [], experiments: [] }
    },
    studioId: "positioning",
    studioOutput: {
      positioning: { category: "Coffee brand", promise: "Make mornings better", differentiators: [], proofPoints: [] }
    },
    observation: "People liked the idea but could not explain what makes it different."
  },
  {
    name: "Dental clinic",
    seed: { idea: "A clinic that makes preventive care less intimidating", brandType: "dental clinic" },
    input: {
      audience: {
        primary: "Adults who delay dental visits because of anxiety",
        needs: ["Trust before booking", "Clear visit steps"],
        barriers: ["Fear of judgment"],
        desiredOutcome: "Book preventive care with confidence"
      },
      offer: { core: "Clear preventive care plan", outcomes: ["Lower booking anxiety"] },
      channels: { primary: ["Website"], experiments: ["Local referral briefing"] }
    },
    studioId: "authority",
    studioOutput: {
      positioning: {
        category: "Anxiety-aware preventive clinic",
        promise: "Make preventive care easier to understand before the appointment",
        differentiators: ["Plain-language visit steps"],
        proofPoints: ["Patient explanation framework"]
      },
      trust: { signals: ["Transparent care steps"] },
      authority: { themes: ["Preventive care clarity"], evidence: ["Care planning method"] },
      growth: { objectives: ["Increase preventive appointment requests"], loops: [] }
    },
    observation: "A patient said the visit-plan language made booking feel less intimidating."
  },
  {
    name: "Boutique hotel",
    seed: { idea: "A quiet city stay for restorative short breaks", brandType: "boutique hotel" },
    input: {
      audience: {
        primary: "Couples planning quiet short city breaks without itinerary overload",
        needs: ["Restful stay", "Clear atmosphere"],
        barriers: ["Hotels look interchangeable"],
        desiredOutcome: "Choose a restorative stay before arrival"
      },
      offer: { core: "Restorative short-stay experience", outcomes: ["Calmer weekend planning"] },
      channels: { primary: ["Website"], secondary: ["Partner guide", "Travel listing"], experiments: ["Local guide partnership"] }
    },
    studioId: "growth",
    studioOutput: {
      positioning: {
        category: "Restorative boutique city stay",
        promise: "Help guests feel the calm of the stay before they book",
        differentiators: ["Quiet-stay promise", "Neighborhood rhythm guide"],
        proofPoints: ["Guest review themes", "Curated local guide"]
      },
      authority: { themes: ["Restorative travel"], evidence: ["Guest feedback pattern"] },
      growth: { objectives: ["Increase direct booking inquiries"], loops: ["Publish quiet weekend itineraries"] }
    },
    observation: "Guests described the stay as quiet and easy to imagine before booking."
  },
  {
    name: "Personal brand",
    seed: { idea: "A leadership advisor helping founders make calmer decisions", brandType: "personal brand" },
    input: {
      audience: {
        primary: "Founders facing high-stakes leadership decisions without a trusted thinking partner",
        needs: ["Clearer thinking", "Lower decision noise"],
        barriers: ["Too many generic advisors"],
        desiredOutcome: "Make important decisions with more calm and clarity"
      },
      offer: { core: "Founder decision clarity advisory", outcomes: ["Better decision framing"] },
      channels: { primary: ["Website"], experiments: ["Founder roundtable"] }
    },
    studioId: "authority",
    studioOutput: {
      positioning: {
        category: "Founder decision clarity advisor",
        promise: "Help founders make high-stakes decisions without spiraling",
        differentiators: ["Decision framing method", "Calm operating cadence"],
        proofPoints: ["Advisor case notes", "Founder testimonials"]
      },
      trust: { signals: ["Founder testimonials"] },
      authority: { themes: ["Decision quality", "Founder calm"], evidence: ["Decision framework", "Advisor case notes"] },
      growth: { objectives: ["Increase advisory inquiries"], loops: ["Publish decision breakdowns"] }
    },
    observation: "A founder said the decision framing method made the next move obvious."
  }
];

function activeDecisionKeys(decisions: DecisionRecord[]): string[] {
  return decisions
    .filter((decision) => decision.status === "proposed")
    .map((decision) => `${decision.area}:${decision.relatedBottleneck ?? "general"}`);
}

function runScenario(scenario: Scenario) {
  let result = initializeBrandOS(scenario.seed);
  const initialDecisionCount = result.state.decisions.length;
  const firstDecision = result.state.decisions.find((decision) => decision.status === "proposed");
  assert(!!firstDecision, `${scenario.name} should start with proposed decisions.`);

  result = applyBrandInput(result.state, scenario.input);
  const afterInputCount = result.state.decisions.length;

  result = completeStudioStep(result.state, scenario.studioId, scenario.studioOutput);
  const afterStudioCount = result.state.decisions.length;
  const decisionToAccept = result.state.decisions.find((decision) => decision.status === "proposed" && decision.source === "intelligence");
  assert(!!decisionToAccept, `${scenario.name} should have an intelligence decision to accept.`);

  result = acceptDecision(result.state, decisionToAccept!.id);
  const acceptedId = decisionToAccept!.id;

  result = recordObservation(result.state, scenario.observation, "trust", ["Decision refresh test"]);
  result = recalculateBrandOS(result.state);
  const onceRefreshedCount = result.state.decisions.length;
  const keys = activeDecisionKeys(result.state.decisions);
  const uniqueKeys = new Set(keys);
  assert(keys.length === uniqueKeys.size, `${scenario.name} should not create duplicate active proposed decisions.`);

  result = recalculateBrandOS(result.state);
  assert(result.state.decisions.length === onceRefreshedCount, `${scenario.name} repeated refresh should not create duplicates.`);

  const acceptedDecision = result.state.decisions.find((decision) => decision.id === acceptedId);
  assert(acceptedDecision?.status === "accepted", `${scenario.name} accepted decision should remain accepted.`);
  assert(result.state.memory.decisions.length === result.state.decisions.length, `${scenario.name} memory decisions should stay in sync.`);
  assert(result.state.memory.decisions.some((decision) => decision.status === "accepted"), `${scenario.name} memory should include accepted decision.`);

  return {
    name: scenario.name,
    state: result.state,
    initialDecisionCount,
    afterInputCount,
    afterStudioCount,
    finalDecisionCount: result.state.decisions.length,
    recommendations: result.state.decisions
      .filter((decision) => decision.source === "intelligence")
      .map((decision) => `${decision.area}:${decision.status}:${decision.recommendation}`),
    superseded: result.state.decisions.filter((decision) => decision.status === "superseded").length
  };
}

const results = scenarios.map(runScenario);
const recommendationSets = new Set(results.map((result) => result.recommendations.join("|")));
const totalSuperseded = results.reduce((sum, result) => sum + result.superseded, 0);

assert(recommendationSets.size > 1, "Decision recommendations should differ across brands.");
assert(results.every((result) => result.afterInputCount > result.initialDecisionCount), "New decisions should be created after input changes.");
assert(results.some((result) => result.finalDecisionCount > result.afterStudioCount), "Decision count should grow after later state changes.");
assert(totalSuperseded > 0, "At least one proposed decision should be superseded when bottlenecks change.");

console.log(
  JSON.stringify(
    results.map((result) => ({
      brand: result.name,
      counts: {
        initial: result.initialDecisionCount,
        afterInput: result.afterInputCount,
        afterStudio: result.afterStudioCount,
        final: result.finalDecisionCount,
        superseded: result.superseded
      },
      finalBottleneck: result.state.missionControl.bottleneck,
      finalStudio: result.state.missionControl.recommendedStudio,
      recommendations: result.recommendations.slice(-4)
    })),
    null,
    2
  )
);
