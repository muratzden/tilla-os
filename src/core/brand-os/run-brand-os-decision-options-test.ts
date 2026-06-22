import {
  acceptDecision,
  applyBrandInput,
  completeStudioStep,
  initializeBrandOS,
  recalculateBrandOS,
  recordObservation,
} from "./index";
import type {
  BrandOperatingState,
  BrandOSUpdateInput,
  DecisionOption,
  DecisionRecord,
  StudioId,
} from "./types";

function assert(condition: unknown, message: string): asserts condition {
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
    seed: {
      idea: "AI bookkeeping assistant for freelancers",
      brandType: "saas",
    },
    input: {
      audience: {
        primary:
          "Freelancers who avoid bookkeeping until deadlines create stress",
        needs: ["Reduce finance anxiety", "Understand what needs attention"],
        barriers: ["They do not trust generic finance automation"],
        desiredOutcome: "Feel in control without becoming accounting experts",
      },
      offer: {
        core: "Bookkeeping clarity assistant",
        outcomes: ["Weekly finance priorities"],
      },
      channels: {
        primary: ["Website"],
        experiments: ["Advisor referral briefing"],
      },
    },
    studioId: "positioning",
    studioOutput: {
      positioning: {
        category: "AI bookkeeping clarity assistant",
        promise:
          "Help freelancers know what to fix before bookkeeping becomes stressful",
        differentiators: [
          "Weekly issue detection",
          "Plain-language finance tasks",
        ],
        proofPoints: ["Prototype review notes"],
      },
      authority: {
        themes: ["Financial clarity"],
        evidence: ["Freelancer interview synthesis"],
      },
      growth: {
        objectives: ["Increase qualified pilot requests"],
        loops: ["Publish finance clarity teardown"],
      },
    },
    observation:
      "Freelancers said the weekly issue view made finances feel less intimidating.",
  },
  {
    name: "Coffee brand",
    seed: { idea: "Coffee for better mornings", brandType: "coffee" },
    input: {
      audience: {
        primary: "Busy people who want a calmer morning ritual",
        needs: ["A simple routine", "Reliable taste"],
        barriers: ["Most brands sound interchangeable"],
        desiredOutcome: "Start the day with a small moment of control",
      },
      offer: {
        core: "Morning coffee ritual",
        outcomes: ["More consistent mornings"],
      },
      channels: { primary: ["Website"], experiments: ["Neighborhood tasting"] },
    },
    studioId: "positioning",
    studioOutput: {
      positioning: {
        category: "Morning ritual coffee brand",
        promise: "Make the first cup feel calmer and more intentional",
        differentiators: ["Ritual-first guidance"],
        proofPoints: [],
      },
      trust: { signals: [] },
      growth: { objectives: ["Increase repeat trial"], loops: [] },
    },
    observation:
      "People liked the calmer morning idea but asked what proves the taste promise.",
  },
  {
    name: "Dental clinic",
    seed: {
      idea: "A clinic that makes preventive care less intimidating",
      brandType: "dental clinic",
    },
    input: {
      audience: {
        primary:
          "Adults delaying preventive dental visits because they expect judgment",
        needs: ["Trust before booking", "Clear visit steps"],
        barriers: ["Fear of embarrassment"],
        desiredOutcome: "Book preventive care with confidence",
      },
      offer: {
        core: "Anxiety-aware preventive care plan",
        outcomes: ["Lower booking anxiety"],
      },
      channels: {
        primary: ["Website"],
        experiments: ["Local referral briefing"],
      },
    },
    studioId: "authority",
    studioOutput: {
      positioning: {
        category: "Anxiety-aware preventive clinic",
        promise:
          "Make preventive care easier to understand before the appointment",
        differentiators: ["Plain-language visit steps"],
        proofPoints: ["Patient explanation framework"],
      },
      trust: { signals: ["Transparent care steps"] },
      authority: {
        themes: ["Preventive care clarity"],
        evidence: ["Care planning method"],
      },
      growth: {
        objectives: ["Increase preventive appointment requests"],
        loops: [],
      },
    },
    observation:
      "A patient said the visit-plan language made booking feel less intimidating.",
  },
  {
    name: "Boutique hotel",
    seed: {
      idea: "A quiet city stay for restorative short breaks",
      brandType: "boutique hotel",
    },
    input: {
      audience: {
        primary:
          "Couples planning quiet short city breaks without itinerary overload",
        needs: ["Restful stay", "Clear atmosphere"],
        barriers: ["Hotels look interchangeable"],
        desiredOutcome: "Choose a restorative stay before arrival",
      },
      offer: {
        core: "Restorative short-stay experience",
        outcomes: ["Calmer weekend planning"],
      },
      channels: {
        primary: ["Website"],
        secondary: ["Partner guide"],
        experiments: ["Local guide partnership"],
      },
    },
    studioId: "growth",
    studioOutput: {
      positioning: {
        category: "Restorative boutique city stay",
        promise: "Help guests feel the calm of the stay before they book",
        differentiators: ["Quiet-stay promise", "Neighborhood rhythm guide"],
        proofPoints: ["Guest review themes", "Curated local guide"],
      },
      authority: {
        themes: ["Restorative travel"],
        evidence: ["Guest feedback pattern"],
      },
      growth: {
        objectives: ["Increase direct booking inquiries"],
        loops: ["Publish quiet weekend itineraries"],
      },
    },
    observation:
      "Guests described the stay as quiet and easy to imagine before booking.",
  },
  {
    name: "Personal brand",
    seed: {
      idea: "A leadership advisor helping founders make calmer decisions",
      brandType: "personal brand",
    },
    input: {
      audience: {
        primary:
          "Founders facing high-stakes leadership decisions without a trusted thinking partner",
        needs: ["Clearer thinking", "Lower decision noise"],
        barriers: ["Too many generic advisors"],
        desiredOutcome: "Make important decisions with more calm and clarity",
      },
      offer: {
        core: "Founder decision clarity advisory",
        outcomes: ["Better decision framing"],
      },
      channels: { primary: ["Website"], experiments: ["Founder roundtable"] },
    },
    studioId: "authority",
    studioOutput: {
      positioning: {
        category: "Founder decision clarity advisor",
        promise: "Help founders make high-stakes decisions without spiraling",
        differentiators: ["Decision framing method", "Calm operating cadence"],
        proofPoints: ["Advisor case notes", "Founder testimonials"],
      },
      trust: { signals: ["Founder testimonials"] },
      authority: {
        themes: ["Decision quality", "Founder calm"],
        evidence: ["Decision framework", "Advisor case notes"],
      },
      growth: {
        objectives: ["Increase advisory inquiries"],
        loops: ["Publish decision breakdowns"],
      },
    },
    observation:
      "A founder said the decision framing method made the next move obvious.",
  },
];

function assertDecisionOptions(
  decision: DecisionRecord,
  scenarioName: string,
): DecisionOption[] {
  assert(
    decision.source === "intelligence",
    `${scenarioName} should inspect intelligence decisions only.`,
  );
  assert(
    Array.isArray(decision.decisionOptions),
    `${scenarioName} decision should include decisionOptions.`,
  );
  assert(
    decision.decisionOptions!.length >= 2 &&
      decision.decisionOptions!.length <= 3,
    `${scenarioName} decision should include 2-3 strategic options.`,
  );

  const strategies = new Set(
    decision.decisionOptions!.map((option) => option.strategy),
  );
  assert(
    strategies.size === decision.decisionOptions!.length,
    `${scenarioName} options should differ by strategy.`,
  );

  for (const option of decision.decisionOptions!) {
    assert(option.id.length > 0, `${scenarioName} option should have id.`);
    assert(
      option.label.length > 0,
      `${scenarioName} option should have label.`,
    );
    assert(
      option.strategy.length > 0,
      `${scenarioName} option should have strategy.`,
    );
    assert(
      option.tradeoffs.length > 0,
      `${scenarioName} option should include tradeoffs.`,
    );
    assert(
      option.risks.length > 0,
      `${scenarioName} option should include risks.`,
    );
    assert(
      option.expectedImpact.dimension.length > 0,
      `${scenarioName} option should include impact dimension.`,
    );
    assert(
      ["increase", "decrease", "neutral"].includes(
        option.expectedImpact.direction,
      ),
      `${scenarioName} impact direction is invalid.`,
    );
    assert(
      ["low", "medium", "high"].includes(option.expectedImpact.magnitude),
      `${scenarioName} impact magnitude is invalid.`,
    );
    assert(
      option.expectedImpact.rationale.length > 0,
      `${scenarioName} option should explain expected impact.`,
    );
  }

  return decision.decisionOptions!;
}

function assertNoDuplicateActiveDecisions(
  state: BrandOperatingState,
  scenarioName: string,
): void {
  const keys = state.decisions
    .filter((decision) => decision.status === "proposed")
    .map(
      (decision) =>
        `${decision.area}:${decision.relatedBottleneck ?? "general"}`,
    );
  assert(
    keys.length === new Set(keys).size,
    `${scenarioName} should not have duplicate active decisions.`,
  );

  const optionSets = state.decisions
    .filter(
      (decision) =>
        decision.status === "proposed" && decision.source === "intelligence",
    )
    .map((decision) =>
      (decision.decisionOptions ?? []).map((option) => option.id).join("|"),
    );
  assert(
    optionSets.length === new Set(optionSets).size,
    `${scenarioName} should not duplicate active option sets.`,
  );
}

function assertNoForbiddenTerms(
  state: BrandOperatingState,
  scenarioName: string,
): void {
  const forbiddenTerms = [
    "Til" + "la",
    "lea" + "ther",
    "hand" + "made",
    "work" + "shop",
    "catalog",
    "e-com" + "merce",
  ];
  const serialized = JSON.stringify(state).toLowerCase();
  const found = forbiddenTerms.find((term) =>
    serialized.includes(term.toLowerCase()),
  );
  assert(
    !found,
    `${scenarioName} should not include forbidden legacy or domain term: ${found}`,
  );
}

function runScenario(scenario: Scenario) {
  let result = initializeBrandOS(scenario.seed);
  result = applyBrandInput(result.state, scenario.input);
  result = completeStudioStep(
    result.state,
    scenario.studioId,
    scenario.studioOutput,
  );

  const proposedIntelligenceDecisions = result.state.decisions.filter(
    (decision) =>
      decision.status === "proposed" && decision.source === "intelligence",
  );
  assert(
    proposedIntelligenceDecisions.length > 0,
    `${scenario.name} should have intelligence decisions.`,
  );

  for (const decision of proposedIntelligenceDecisions) {
    assertDecisionOptions(decision, scenario.name);
  }

  const decisionToAccept = proposedIntelligenceDecisions[0]!;
  const selectedOption = assertDecisionOptions(
    decisionToAccept,
    scenario.name,
  )[0]!;
  result = acceptDecision(result.state, decisionToAccept.id, selectedOption.id);

  const acceptedDecision = result.state.decisions.find(
    (decision) => decision.id === decisionToAccept.id,
  );
  assert(
    !!acceptedDecision,
    `${scenario.name} selected decision should exist.`,
  );
  assert(
    acceptedDecision.status === "accepted",
    `${scenario.name} selected decision should be accepted.`,
  );
  assert(
    acceptedDecision.selectedOptionId === selectedOption.id,
    `${scenario.name} selectedOptionId should be stored.`,
  );
  assert(
    acceptedDecision.selectedOption?.id === selectedOption.id,
    `${scenario.name} selected option should be stored.`,
  );
  assert(
    acceptedDecision.impact.some(
      (item) =>
        item.includes(selectedOption.label) ||
        item.includes(selectedOption.expectedImpact.rationale),
    ),
    `${scenario.name} accepted decision impact should reflect selected option.`,
  );
  assert(
    result.state.memory.decisions.some(
      (decision) =>
        decision.id === acceptedDecision.id &&
        decision.selectedOptionId === selectedOption.id,
    ),
    `${scenario.name} memory decisions should store selected option.`,
  );
  assert(
    result.state.memory.entries.some((entry) =>
      entry.summary.includes(`Selected option: ${selectedOption.label}`),
    ),
    `${scenario.name} memory entries should mention selected option.`,
  );
  assert(
    result.state.memory.events.some(
      (event) =>
        event.type === "decision_accepted" &&
        event.payload?.selectedOptionId === selectedOption.id,
    ),
    `${scenario.name} memory events should record selected option.`,
  );

  result = recordObservation(result.state, scenario.observation, "trust", [
    "Decision option test",
  ]);
  result = recalculateBrandOS(result.state);

  const refreshedIntelligenceDecisions = result.state.decisions.filter(
    (decision) => decision.source === "intelligence",
  );
  assert(
    refreshedIntelligenceDecisions.length >=
      proposedIntelligenceDecisions.length,
    `${scenario.name} should preserve decision history.`,
  );
  assertNoDuplicateActiveDecisions(result.state, scenario.name);
  assertNoForbiddenTerms(result.state, scenario.name);

  return {
    name: scenario.name,
    readinessScore: result.scoreSnapshot.readinessScore,
    lifecycleStage: result.state.lifecycleStage,
    bottleneck: result.state.missionControl.bottleneck,
    recommendedStudio: result.state.missionControl.recommendedStudio,
    acceptedDecision: acceptedDecision.question,
    selectedOption: selectedOption.label,
    selectedStrategy: selectedOption.strategy,
    activeRecommendations: result.state.decisions
      .filter(
        (decision) =>
          decision.status === "proposed" && decision.source === "intelligence",
      )
      .map((decision) => decision.recommendation),
  };
}

const results = scenarios.map(runScenario);
const recommendationSets = new Set(
  results.map((result) => result.activeRecommendations.join("|")),
);

assert(
  recommendationSets.size > 1,
  "Decision recommendations should differ across brands.",
);

console.log(JSON.stringify(results, null, 2));
