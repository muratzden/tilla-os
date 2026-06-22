import { evaluateBrandIntelligence } from "./intelligence/index";
import type { StrategicEvaluation } from "./intelligence/types";
import type {
  BrandOperatingState,
  DecisionArea,
  DecisionInput,
  DecisionOption,
  DecisionRecommendation,
  DecisionRecord,
  ScoreDimension,
} from "./types";

const FALLBACK_INPUTS: Record<DecisionArea, string[]> = {
  positioning: ["positioning category", "brand promise", "differentiators"],
  audience: ["primary audience", "needs", "barriers"],
  offer: ["core offer", "outcomes", "constraints"],
  trust: ["trust signals", "proof points"],
  authority: ["authority themes", "evidence"],
  content: ["audience needs", "authority themes", "primary channel"],
  channel: ["primary audience", "channel fit", "growth objective"],
  growth: ["growth objective", "repeatable loop", "measurement"],
};

const RECOMMENDATIONS: Record<DecisionArea, string> = {
  positioning:
    "Prioritize a simple position that connects the audience, outcome, and proof.",
  audience:
    "Narrow the audience before expanding use cases or channel activity.",
  offer:
    "Define one core offer around a clear outcome and a visible next step.",
  trust: "Add credibility signals where the promise currently asks for belief.",
  authority:
    "Build authority around a small set of themes the brand can defend repeatedly.",
  content:
    "Create content from audience questions, barriers, and authority themes.",
  channel:
    "Choose channels by audience behavior, message fit, and repeatability.",
  growth:
    "Focus growth around one objective and one loop before adding experiments.",
};

const DECISION_AREA_BY_DIMENSION: Record<ScoreDimension, DecisionArea> = {
  clarity: "positioning",
  audienceFit: "audience",
  differentiation: "positioning",
  trust: "trust",
  authority: "authority",
  consistency: "channel",
  growthReadiness: "growth",
};

const DIMENSION_BY_INTELLIGENCE_AREA: Record<string, ScoreDimension> = {
  audience: "audienceFit",
  positioning: "differentiation",
  trust: "trust",
  authority: "authority",
  channels: "consistency",
  growth: "growthReadiness",
};

function getEvaluationForDecision(
  state: BrandOperatingState,
  area: DecisionArea,
): StrategicEvaluation | undefined {
  try {
    const intelligence = evaluateBrandIntelligence(state);
    const evaluationByArea: Partial<Record<DecisionArea, StrategicEvaluation>> =
      {
        audience: intelligence.audience,
        positioning: intelligence.positioning,
        offer: intelligence.positioning,
        trust: intelligence.trust,
        authority: intelligence.authority,
        content: intelligence.authority,
        channel: intelligence.channels,
        growth: intelligence.growth,
      };

    return evaluationByArea[area];
  } catch {
    return undefined;
  }
}

function knownInputsForArea(
  state: BrandOperatingState,
  area: DecisionArea,
): string[] {
  const known: Partial<Record<DecisionArea, string[]>> = {
    positioning: [
      state.positioning.category ? "positioning category" : "",
      state.positioning.promise ? "brand promise" : "",
      ...state.positioning.differentiators.map(() => "differentiator"),
    ],
    audience: [
      state.audience.primary ? "primary audience" : "",
      state.audience.desiredOutcome ? "desired outcome" : "",
      ...state.audience.needs.map(() => "need"),
    ],
    offer: [
      state.offer.core ? "core offer" : "",
      ...state.offer.outcomes.map(() => "outcome"),
    ],
    trust: [
      ...state.trust.signals.map(() => "trust signal"),
      ...state.positioning.proofPoints.map(() => "proof point"),
    ],
    authority: [
      ...state.authority.themes.map(() => "authority theme"),
      ...state.authority.evidence.map(() => "evidence"),
    ],
    content: [...state.authority.themes, ...state.audience.needs],
    channel: [...state.channels.primary, ...state.channels.secondary],
    growth: [...state.growth.objectives, ...state.growth.loops],
  };

  return (known[area] ?? []).filter(Boolean);
}

export function makeDecision(
  state: BrandOperatingState,
  input: DecisionInput,
): DecisionRecommendation {
  const known = knownInputsForArea(state, input.area);
  const evaluation = getEvaluationForDecision(state, input.area);
  const requiredInputs = evaluation?.missingEvidence.length
    ? evaluation.missingEvidence
    : known.length === 0
      ? FALLBACK_INPUTS[input.area]
      : [];
  const confidence = Math.min(90, 35 + known.length * 12);
  const now = new Date().toISOString();
  const question =
    input.question ?? `What should the brand decide about ${input.area}?`;
  const recommendation =
    evaluation?.recommendations[0] ?? RECOMMENDATIONS[input.area];
  const weaknesses = evaluation?.weaknesses.slice(0, 2) ?? [];
  const risks = evaluation?.risks.slice(0, 2) ?? [];

  return {
    id: `decision_${input.area}_${now.replace(/[^0-9]/g, "")}`,
    type: input.area,
    area: input.area,
    question,
    options: input.options ?? [
      "Clarify the missing inputs first",
      "Proceed with the current strategic direction",
      "Defer until more evidence exists",
    ],
    recommendation,
    status: "proposed",
    reasoning:
      evaluation && (weaknesses.length > 0 || risks.length > 0)
        ? `The current intelligence signal shows ${[...weaknesses, ...risks].join(" ")}`
        : input.question
          ? `The decision question is "${input.question}". The current state supports a generic recommendation without industry assumptions.`
          : "The current state supports a generic recommendation without industry assumptions.",
    requiredInputs,
    confidence: evaluation
      ? Math.min(90, Math.max(35, evaluation.score))
      : confidence,
    createdAt: now,
    impact: [
      `Improves ${input.area} direction.`,
      requiredInputs.length > 0
        ? "Clarifies missing evidence before stronger execution."
        : "Supports the current operating state.",
      ...risks.map((risk) => `Reduces risk: ${risk}`),
    ],
    source: "initial",
    relatedBottleneck: input.area === "audience" ? "audienceFit" : undefined,
  };
}

export function createInitialDecisions(
  state: BrandOperatingState,
): DecisionRecord[] {
  return [
    makeDecision(state, { area: "audience" }),
    makeDecision(state, { area: "positioning" }),
    makeDecision(state, { area: "offer" }),
    makeDecision(state, { area: "trust" }),
    makeDecision(state, { area: "authority" }),
    makeDecision(state, { area: "channel" }),
    makeDecision(state, { area: "growth" }),
    makeDecision(state, { area: "content" }),
  ];
}

export function acceptDecisionRecord(
  decision: DecisionRecord,
  now = new Date().toISOString(),
  selectedOptionId?: string,
): DecisionRecord {
  const selectedOption = selectedOptionId
    ? decision.decisionOptions?.find((option) => option.id === selectedOptionId)
    : undefined;

  return {
    ...decision,
    status: "accepted",
    resolvedAt: now,
    ...(selectedOptionId ? { selectedOptionId } : {}),
    ...(selectedOption
      ? {
          selectedOption,
          impact: [
            `Selected option: ${selectedOption.label}`,
            selectedOption.expectedImpact.rationale,
          ],
        }
      : {}),
  };
}

function decisionKey(
  area: DecisionArea,
  relatedBottleneck?: ScoreDimension,
): string {
  return `${area}:${relatedBottleneck ?? "general"}`;
}

function makeOption(
  id: string,
  label: string,
  strategy: string,
  dimension: ScoreDimension,
  magnitude: DecisionOption["expectedImpact"]["magnitude"],
  rationale: string,
  tradeoffs: string[],
  risks: string[],
): DecisionOption {
  return {
    id,
    label,
    strategy,
    tradeoffs,
    risks,
    expectedImpact: {
      dimension,
      direction: "increase",
      magnitude,
      rationale,
    },
  };
}

function createDecisionOptions(
  area: DecisionArea,
  relatedBottleneck: ScoreDimension,
  evaluation: StrategicEvaluation,
): DecisionOption[] {
  const primaryRisk =
    evaluation.risks[0] ??
    evaluation.weaknesses[0] ??
    "The strategic signal remains weak.";
  const missingEvidence = evaluation.missingEvidence[0] ?? "stronger evidence";
  const optionsByArea: Record<DecisionArea, DecisionOption[]> = {
    audience: [
      makeOption(
        "narrow_audience",
        "Narrow audience",
        "Choose a sharper audience segment before expanding offer or channel work.",
        relatedBottleneck,
        "high",
        "Sharper audience definition improves fit, message clarity, and channel decisions.",
        ["May reduce short-term reach.", "Makes positioning easier to judge."],
        ["The segment may still lack urgency evidence."],
      ),
      makeOption(
        "validate_urgency",
        "Validate urgency",
        "Collect evidence of the strongest audience problem before changing positioning.",
        relatedBottleneck,
        "medium",
        "Urgency evidence improves confidence in audience and offer choices.",
        ["Slower execution.", "Reduces risk of solving a weak problem."],
        [primaryRisk],
      ),
    ],
    positioning: [
      makeOption(
        "clarify_category",
        "Clarify category",
        "Make the category and promise easier for the audience to understand quickly.",
        relatedBottleneck,
        "high",
        "Category clarity helps the audience understand what the brand is and why it matters.",
        ["May simplify nuance.", "Improves comparison."],
        ["A clearer category may expose weak differentiation."],
      ),
      makeOption(
        "strengthen_proof",
        "Strengthen proof",
        `Attach ${missingEvidence} to the strongest positioning claim.`,
        relatedBottleneck,
        "medium",
        "Proof-backed positioning reduces skepticism and improves differentiation.",
        ["Requires proof collection.", "Makes claims more defensible."],
        [primaryRisk],
      ),
    ],
    offer: [
      makeOption(
        "clarify_offer_outcome",
        "Clarify offer outcome",
        "Define the offer around a concrete audience outcome.",
        relatedBottleneck,
        "medium",
        "A clearer offer outcome improves clarity and consistency.",
        ["May narrow the offer.", "Improves decision clarity."],
        [primaryRisk],
      ),
      makeOption(
        "delay_offer_expansion",
        "Delay offer expansion",
        "Avoid adding offer variants until the core promise is proven.",
        relatedBottleneck,
        "medium",
        "Focus prevents complexity while evidence improves.",
        ["Less variety in the short term.", "Protects focus."],
        ["The core offer may not cover all audience situations."],
      ),
    ],
    trust: [
      makeOption(
        "strengthen_proof",
        "Strengthen proof",
        "Add visible proof that directly reduces the audience's perceived risk.",
        relatedBottleneck,
        "high",
        "Trust rises when proof addresses the audience's specific risk.",
        [
          "Requires evidence gathering.",
          "Increases credibility before growth.",
        ],
        [primaryRisk],
      ),
      makeOption(
        "record_external_validation",
        "Record external validation",
        "Capture audience feedback, expert validation, or market response before scaling.",
        relatedBottleneck,
        "medium",
        "External validation makes credibility less self-claimed.",
        ["Slower launch rhythm.", "Improves decision confidence."],
        ["Validation may reveal positioning gaps."],
      ),
    ],
    authority: [
      makeOption(
        "build_authority_asset",
        "Build authority asset",
        "Create one reusable asset that proves the brand's point of view.",
        relatedBottleneck,
        "high",
        "Authority improves when expertise becomes visible and reusable.",
        ["Requires focused effort.", "Creates a durable trust asset."],
        [primaryRisk],
      ),
      makeOption(
        "define_repeatable_insight",
        "Define repeatable insight",
        "Turn observations and proof into a repeatable idea the brand can own.",
        relatedBottleneck,
        "medium",
        "Repeatable insight strengthens authority and content quality.",
        ["May delay campaign activity.", "Improves consistency."],
        ["The insight may be too generic without evidence."],
      ),
    ],
    content: [
      makeOption(
        "build_authority_asset",
        "Build authority asset",
        "Use the strongest authority theme as a content asset.",
        relatedBottleneck,
        "medium",
        "Content becomes more useful when it carries an authority idea.",
        ["Less content volume.", "More strategic depth."],
        [primaryRisk],
      ),
      makeOption(
        "answer_audience_barriers",
        "Answer audience barriers",
        "Create content around the strongest audience barrier.",
        relatedBottleneck,
        "medium",
        "Barrier-led content improves trust and clarity.",
        ["Narrower content scope.", "Better trust relevance."],
        ["Barrier may not be the highest priority without validation."],
      ),
    ],
    channel: [
      makeOption(
        "delay_channel_expansion",
        "Delay channel expansion",
        "Keep channel scope narrow until audience-message fit is stronger.",
        relatedBottleneck,
        "medium",
        "Channel focus improves consistency and learning quality.",
        ["Lower short-term reach.", "Reduces execution complexity."],
        [primaryRisk],
      ),
      makeOption(
        "validate_channel_fit",
        "Validate channel fit",
        "Run one small test to confirm the audience responds to the message in this channel.",
        relatedBottleneck,
        "medium",
        "Measured channel fit improves confidence before scaling.",
        ["Requires measurement discipline.", "Prevents premature scaling."],
        ["A weak test may reflect message quality rather than channel fit."],
      ),
    ],
    growth: [
      makeOption(
        "validate_growth_loop",
        "Validate growth loop",
        "Test one repeatable loop before adding more growth activity.",
        relatedBottleneck,
        "high",
        "A validated loop makes growth less activity-driven and more repeatable.",
        ["Slower expansion.", "Improves repeatability."],
        [primaryRisk],
      ),
      makeOption(
        "clarify_measurable_outcome",
        "Clarify measurable outcome",
        "Define the measurable outcome that proves growth quality.",
        relatedBottleneck,
        "medium",
        "Measurement clarity improves readiness before scaling.",
        ["May delay channel execution.", "Improves learning quality."],
        ["The metric may be too indirect if not tied to the offer."],
      ),
    ],
  };

  return optionsByArea[area].slice(0, 3).map((option) => ({
    ...option,
    id: `${area}_${relatedBottleneck}_${option.id}`,
  }));
}

function createIntelligenceDecision(
  area: DecisionArea,
  relatedBottleneck: ScoreDimension,
  evaluation: StrategicEvaluation,
  now: string,
): DecisionRecord {
  const recommendation = evaluation.recommendations[0] ?? RECOMMENDATIONS[area];
  const missingEvidence = evaluation.missingEvidence.slice(0, 3);
  const weaknesses = evaluation.weaknesses.slice(0, 2);
  const risks = evaluation.risks.slice(0, 2);
  const decisionOptions = createDecisionOptions(
    area,
    relatedBottleneck,
    evaluation,
  );

  return {
    id: `decision_intelligence_${area}_${relatedBottleneck}_${now.replace(/[^0-9]/g, "")}`,
    type: area,
    area,
    question: `What decision would improve ${relatedBottleneck}?`,
    options: decisionOptions.map((option) => option.label),
    decisionOptions,
    recommendation,
    status: "proposed",
    reasoning: `Intelligence refresh found ${[...weaknesses, ...risks, ...missingEvidence].join(" ") || "a weak strategic signal."}`,
    requiredInputs: missingEvidence,
    confidence: Math.min(90, Math.max(35, evaluation.score)),
    createdAt: now,
    impact: [
      `Improves ${relatedBottleneck}.`,
      ...weaknesses.map((weakness) => `Addresses weakness: ${weakness}`),
      ...risks.map((risk) => `Reduces risk: ${risk}`),
    ],
    source: "intelligence",
    relatedBottleneck,
  };
}

export function refreshDecisions(
  state: BrandOperatingState,
  now = new Date().toISOString(),
): DecisionRecord[] {
  let intelligence: ReturnType<typeof evaluateBrandIntelligence>;

  try {
    intelligence = evaluateBrandIntelligence(state);
  } catch {
    return state.decisions;
  }

  const evaluations = {
    audience: intelligence.audience,
    positioning: intelligence.positioning,
    trust: intelligence.trust,
    authority: intelligence.authority,
    channels: intelligence.channels,
    growth: intelligence.growth,
  };
  const candidates = Object.entries(evaluations)
    .map(([area, evaluation]) => ({
      area,
      evaluation,
      relatedBottleneck: DIMENSION_BY_INTELLIGENCE_AREA[area],
      need:
        evaluation.score < 70 ||
        evaluation.weaknesses.length > 0 ||
        evaluation.risks.length > 0 ||
        evaluation.missingEvidence.length > 0,
    }))
    .filter((candidate) => candidate.need)
    .sort((left, right) => left.evaluation.score - right.evaluation.score)
    .slice(0, 3);
  const neededKeys = new Set(
    candidates.map((candidate) =>
      decisionKey(
        DECISION_AREA_BY_DIMENSION[candidate.relatedBottleneck],
        candidate.relatedBottleneck,
      ),
    ),
  );
  const activeKeys = new Set(
    state.decisions
      .filter((decision) => decision.status === "proposed")
      .map((decision) =>
        decisionKey(decision.area, decision.relatedBottleneck),
      ),
  );
  const nextDecisions = state.decisions.map((decision) => {
    if (
      decision.status === "proposed" &&
      decision.source === "intelligence" &&
      !neededKeys.has(decisionKey(decision.area, decision.relatedBottleneck))
    ) {
      return {
        ...decision,
        status: "superseded" as const,
        resolvedAt: now,
      };
    }

    return decision;
  });

  for (const candidate of candidates) {
    const area = DECISION_AREA_BY_DIMENSION[candidate.relatedBottleneck];
    const key = decisionKey(area, candidate.relatedBottleneck);

    if (!activeKeys.has(key)) {
      const decision = createIntelligenceDecision(
        area,
        candidate.relatedBottleneck,
        candidate.evaluation,
        now,
      );
      nextDecisions.push(decision);
      activeKeys.add(key);
    }
  }

  return nextDecisions;
}
