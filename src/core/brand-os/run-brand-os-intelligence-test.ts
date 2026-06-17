import {
  acceptDecision,
  applyBrandInput,
  completeStudioStep,
  evaluateBrandIntelligence,
  initializeBrandOS,
  recalculateBrandOS,
  recordObservation
} from "./index";
import type { BrandOperatingState, BrandOSUpdateInput, StudioId } from "./types";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
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
  ["existing", " customer"].join("")
];

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
      idea: "AI operations assistant for small consulting teams",
      brandType: "saas"
    },
    input: {
      audience: {
        primary: "Small consulting teams losing billable time to operations",
        needs: ["Reduce admin drag", "See operational priorities", "Coordinate recurring client work"],
        barriers: ["Teams distrust generic automation", "Existing tools feel heavy"],
        desiredOutcome: "Recover time without adding operational complexity"
      },
      offer: {
        core: "AI operations workspace",
        outcomes: ["Clear weekly priorities", "Less manual coordination"]
      },
      channels: {
        primary: ["Website"],
        experiments: ["Partner briefing"]
      }
    },
    studioId: "positioning",
    studioOutput: {
      positioning: {
        category: "AI operations assistant",
        promise: "Help consulting teams recover billable time without heavier process",
        differentiators: ["Service-team workflow memory", "Weekly operating rhythm", "Plain-language automation"],
        proofPoints: ["Workflow prototype", "Interview synthesis", "Time-loss pattern map"]
      },
      authority: {
        themes: ["Operational clarity", "Service team rhythm"],
        evidence: ["Interview synthesis", "Workflow prototype"]
      },
      growth: {
        objectives: ["Increase qualified pilot requests"],
        loops: ["Publish operational teardown notes"]
      }
    },
    observation: "Three teams described the weekly rhythm as easier than their current process."
  },
  {
    name: "Coffee brand",
    seed: {
      idea: "Coffee for better mornings",
      brandType: "coffee"
    },
    input: {
      audience: {
        primary: "People who drink coffee",
        needs: ["Better mornings"],
        barriers: [],
        desiredOutcome: "Enjoy coffee"
      },
      offer: {
        core: "Coffee experience",
        outcomes: []
      },
      channels: {
        primary: [],
        experiments: []
      }
    },
    studioId: "positioning",
    studioOutput: {
      positioning: {
        category: "Coffee brand",
        promise: "Make mornings better",
        differentiators: [],
        proofPoints: []
      },
      growth: {
        objectives: [],
        loops: []
      }
    },
    observation: "A few people liked the morning idea but could not explain what makes it different."
  },
  {
    name: "Dental clinic",
    seed: {
      idea: "A clinic that makes preventive care less intimidating",
      brandType: "dental clinic"
    },
    input: {
      audience: {
        primary: "Adults who delay dental visits because of anxiety",
        needs: ["Trust before booking", "Clear visit steps", "Less fear"],
        barriers: ["Fear of judgment", "Unclear treatment path"],
        desiredOutcome: "Book preventive care with confidence"
      },
      offer: {
        core: "Clear preventive care plan",
        outcomes: ["Lower booking anxiety", "Better visit consistency"]
      },
      channels: {
        primary: ["Website"],
        experiments: ["Local referral briefing"]
      }
    },
    studioId: "authority",
    studioOutput: {
      positioning: {
        category: "Anxiety-aware preventive clinic",
        promise: "Make preventive care easier to understand before the appointment",
        differentiators: ["Plain-language visit steps", "Judgment-free intake"],
        proofPoints: ["Patient explanation framework"]
      },
      trust: {
        signals: ["Transparent care steps"]
      },
      authority: {
        themes: ["Preventive care clarity"],
        evidence: ["Care planning method"]
      },
      growth: {
        objectives: ["Increase preventive appointment requests"],
        loops: []
      }
    },
    observation: "A prospective patient said the visit-plan language made booking feel less intimidating."
  },
  {
    name: "Boutique hotel",
    seed: {
      idea: "A quiet city stay for restorative short breaks",
      brandType: "boutique hotel"
    },
    input: {
      audience: {
        primary: "Couples planning quiet short city breaks without itinerary overload",
        needs: ["Restful stay", "Clear atmosphere", "Easy planning"],
        barriers: ["Hotels look interchangeable", "Neighborhood fit is unclear"],
        desiredOutcome: "Choose a restorative stay before arrival"
      },
      offer: {
        core: "Restorative short-stay experience",
        outcomes: ["Calmer weekend planning", "More memorable stay"]
      },
      channels: {
        primary: ["Website"],
        secondary: ["Partner guide", "Travel listing"],
        experiments: ["Local guide partnership", "Seasonal itinerary"]
      }
    },
    studioId: "growth",
    studioOutput: {
      positioning: {
        category: "Restorative boutique city stay",
        promise: "Help guests feel the calm of the stay before they book",
        differentiators: ["Quiet-stay promise", "Neighborhood rhythm guide"],
        proofPoints: ["Guest review themes", "Curated local guide"]
      },
      authority: {
        themes: ["Restorative travel"],
        evidence: ["Guest feedback pattern"]
      },
      growth: {
        objectives: ["Increase direct booking inquiries"],
        loops: ["Publish quiet weekend itineraries"]
      }
    },
    observation: "Guests described the stay as quiet and easy to imagine before booking."
  },
  {
    name: "Personal brand",
    seed: {
      idea: "A leadership advisor helping founders make calmer high-stakes decisions",
      brandType: "personal brand"
    },
    input: {
      audience: {
        primary: "Founders facing high-stakes leadership decisions without a trusted thinking partner",
        needs: ["Clearer thinking", "Lower decision noise", "Trusted perspective"],
        barriers: ["Too many generic advisors", "Hard to judge credibility"],
        desiredOutcome: "Make important decisions with more calm and clarity"
      },
      offer: {
        core: "Founder decision clarity advisory",
        outcomes: ["Better decision framing", "Calmer execution"]
      },
      channels: {
        primary: ["Website"],
        experiments: ["Founder roundtable"]
      }
    },
    studioId: "authority",
    studioOutput: {
      positioning: {
        category: "Founder decision clarity advisor",
        promise: "Help founders make high-stakes decisions without spiraling",
        differentiators: ["Decision framing method", "Calm operating cadence", "Founder-specific judgment support"],
        proofPoints: ["Advisor case notes", "Founder testimonials"]
      },
      trust: {
        signals: ["Founder testimonials"]
      },
      authority: {
        themes: ["Decision quality", "Founder calm"],
        evidence: ["Decision framework", "Advisor case notes"]
      },
      growth: {
        objectives: ["Increase advisory inquiries"],
        loops: ["Publish decision breakdowns"]
      }
    },
    observation: "A founder said the decision framing method made the next move obvious."
  }
];

function runScenario(scenario: Scenario) {
  let result = initializeBrandOS(scenario.seed);
  const progression = [
    {
      step: "initialize",
      readinessScore: result.state.missionControl.readinessScore,
      lifecycle: result.state.lifecycleStage,
      bottleneck: result.state.missionControl.bottleneck,
      recommendedStudio: result.state.missionControl.recommendedStudio
    }
  ];

  result = applyBrandInput(result.state, scenario.input);
  progression.push({
    step: "applyBrandInput",
    readinessScore: result.state.missionControl.readinessScore,
    lifecycle: result.state.lifecycleStage,
    bottleneck: result.state.missionControl.bottleneck,
    recommendedStudio: result.state.missionControl.recommendedStudio
  });

  result = completeStudioStep(result.state, scenario.studioId, scenario.studioOutput);
  progression.push({
    step: "completeStudioStep",
    readinessScore: result.state.missionControl.readinessScore,
    lifecycle: result.state.lifecycleStage,
    bottleneck: result.state.missionControl.bottleneck,
    recommendedStudio: result.state.missionControl.recommendedStudio
  });

  const decision = result.state.decisions.find((item) => item.status === "proposed");
  assert(!!decision, `${scenario.name} should have a proposed decision.`);

  result = acceptDecision(result.state, decision!.id);
  progression.push({
    step: "acceptDecision",
    readinessScore: result.state.missionControl.readinessScore,
    lifecycle: result.state.lifecycleStage,
    bottleneck: result.state.missionControl.bottleneck,
    recommendedStudio: result.state.missionControl.recommendedStudio
  });

  result = recordObservation(result.state, scenario.observation, "trust", ["Reality test observation"]);
  progression.push({
    step: "recordObservation",
    readinessScore: result.state.missionControl.readinessScore,
    lifecycle: result.state.lifecycleStage,
    bottleneck: result.state.missionControl.bottleneck,
    recommendedStudio: result.state.missionControl.recommendedStudio
  });

  result = recalculateBrandOS(result.state);
  progression.push({
    step: "recalculate",
    readinessScore: result.state.missionControl.readinessScore,
    lifecycle: result.state.lifecycleStage,
    bottleneck: result.state.missionControl.bottleneck,
    recommendedStudio: result.state.missionControl.recommendedStudio
  });

  return {
    name: scenario.name,
    state: result.state,
    progression,
    intelligence: evaluateBrandIntelligence(result.state)
  };
}

const results = scenarios.map(runScenario);
const progressionSignatures = new Set(results.map((result) => result.progression.map((step) => step.readinessScore).join(">")));
const bottlenecks = new Set(results.map((result) => result.state.missionControl.bottleneck));
const recommendedStudios = new Set(results.map((result) => result.state.missionControl.recommendedStudio));

assert(progressionSignatures.size > 1, "Readiness score progression should differ across brands.");
assert(bottlenecks.size > 1, "Bottlenecks should not be identical for all brands.");
assert(recommendedStudios.size > 1, "Recommended studios should not be identical for all brands.");

for (const result of results) {
  const earlyStages = result.progression.filter((step) => step.step !== "recalculate");
  assert(
    earlyStages.every((step) => step.lifecycle !== "optimization"),
    `${result.name} should not jump to optimization too early.`
  );

  assert(!!result.intelligence, `${result.name} should have an intelligence report.`);

  for (const dimension of ["audience", "positioning", "trust", "authority", "channels", "growth"] as const) {
    const evaluation = result.intelligence[dimension];
    assert(typeof evaluation.score === "number", `${result.name} ${dimension} should have a score.`);
    assert(Array.isArray(evaluation.strengths), `${result.name} ${dimension} should have strengths.`);
    assert(Array.isArray(evaluation.weaknesses), `${result.name} ${dimension} should have weaknesses.`);
    assert(Array.isArray(evaluation.risks), `${result.name} ${dimension} should have risks.`);
    assert(Array.isArray(evaluation.missingEvidence), `${result.name} ${dimension} should have missingEvidence.`);
    assert(Array.isArray(evaluation.recommendations), `${result.name} ${dimension} should have recommendations.`);
  }

  const serialized = JSON.stringify({
    state: result.state,
    intelligence: result.intelligence
  });

  for (const term of forbiddenTerms) {
    assert(!serialized.toLocaleLowerCase().includes(term.toLocaleLowerCase()), `Forbidden term found: ${term}`);
  }
}

console.log(
  JSON.stringify(
    results.map((result) => ({
      brand: result.name,
      progression: result.progression,
      final: {
        readinessScore: result.state.missionControl.readinessScore,
        lifecycle: result.state.lifecycleStage,
        bottleneck: result.state.missionControl.bottleneck,
        recommendedStudio: result.state.missionControl.recommendedStudio
      },
      intelligence: {
        audience: result.intelligence.audience.score,
        positioning: result.intelligence.positioning.score,
        trust: result.intelligence.trust.score,
        authority: result.intelligence.authority.score,
        channels: result.intelligence.channels.score,
        growth: result.intelligence.growth.score
      },
      acceptedDecision: result.state.decisions.find((decision) => decision.status === "accepted")?.recommendation
    })),
    null,
    2
  )
);
